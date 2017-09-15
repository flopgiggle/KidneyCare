// pages/register/register.js
var app = getApp();
var util = require('../../utils/util.js');
//var lodash = require('../../utils/lodash.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        sex: [{ UserName: '男', Id: '0' }, { UserName: '女', Id: '1' }],
        docter: [{ UserName: '张医生', Id: '1' }, { UserName: '王医生', Id: '1' }, { UserName: '未收录', Id: '1' }],
        nurse: [{ UserName: '张护士', Id: '1' }, { UserName: '王护士', Id: '1' }, { UserName: '未收录', Id: '1' }],
        disease: [{ Name: '肾衰竭', Id: '1' }, { Name: '肾小球肾炎', Id: '2' }],
        CKD: [
            { Name: 'I期', Id: '1' }, { Name: 'II期', Id: '2' }, { Name: 'III期', Id: '3' }, { Name: 'IV期', Id: '4' },
            { Name: 'V期', Id: '5' }
        ],
        sexIndex: -1,
        docterIndex: -1,
        nurseIndex: -1,
        CKDIndex: -1,
        diseaseIndex: -1,
        birthday: '2017-01-01',
        multiArray: [['四川省', '云南省'], ['成都市', '绵阳市', '德阳市', '攀枝花市', '宜宾市'], ['四川大学华西医院', '省医院']],
        multiIndex: [0, 0, 0],
        userInfo: {},
        hospital: [{ UserName: '四川大学华西医院', Id: '1' }, { UserName: '省医院', Id: '2' }],
        showDiseaseInfo: "",
    },
    //需要查找原始对象,id,对应的选项索引值
    getIndexValue: function(orgValue, collect) {
        if (orgValue) {
            var index = 0;
            for (var item of collect) {
                if (item.Id == orgValue) {
                    return index;
                }
                index++;
            }

            //var index = lodash.findIndex(collect, [id = orgValue]);

            //return index;
        } else {
            return -1;
        }
    },
    bindDiseaseChange: function(e) {
        this.setData({
            diseaseIndex: e.detail.value
        });
    },
    bindCKDChange: function(e) {
        this.setData({
            CKDIndex: e.detail.value
        });
    },
    bindDocterChange: function(e) {
        this.setData({
            docterIndex: e.detail.value
        });
    },
    bindNurseChange: function(e) {

        this.setData({
            nurseIndex: e.detail.value
        });
    },
    bindSexChange: function(e) {
        this.setData({
            sexIndex: e.detail.value
        });
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            birthday: e.detail.value
        })
    },
    getStaffsByHosptalId: function (hospitalId) {
        var url = app.globalData.urls.user.getStaffsByHosptalId + hospitalId;
        util.http(url,
            res => {
                var result = JSON.parse(res.Result);
                result.allDoctors.push({ UserName: '未收录', Id: '-100' });
                result.allNurses.push({ UserName: '未收录', Id: '-100' });
                this.setData({
                    docter: result.allDoctors,
                    nurse: result.allNurses,
                    docterIndex: this.getIndexValue(app.globalData.user.Patient.BelongToDoctor, result.allDoctors),
                    nurseIndex: this.getIndexValue(app.globalData.user.Patient.BelongToNurse, result.allNurses),
                });
            });
    },
    getHospitalSelectInfo: function (province, city) {
        var url = app.globalData.urls.user.getHospitalSelectInfo + province + "/" + city;
        util.http(url,
            res => {
                var result = JSON.parse(res.Result);
                //result.allDoctors.push({ UserName: '未收录', Id: '-100' });
                //result.allNurses.push({ UserName: '未收录', Id: '-100' });
                this.setData({
                    multiArray: [result.provinces, result.citys, result.hospital],
                });
            });
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        var hospitalId = this.data.multiArray[2][e.detail.value[2]].Id;
        this.getStaffsByHosptalId(hospitalId);
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        var provice = this.data.multiIndex[0];
        var city = this.data.multiIndex[1];
        var hospital = this.data.multiIndex[2];
        if (e.detail.column == 0) {
            provice = e.detail.value;
        }

        if (e.detail.column == 1) {
            city = e.detail.value;
        }

        if (e.detail.column == 2) {
            hospital = e.detail.value;
        }

        var provicesIndex =  this.data.multiArray[0][provice].Id;
        var cityIndex = this.data.multiArray[1][city].Id;
        if (e.detail.column != 2) {
            this.getHospitalSelectInfo(provicesIndex, cityIndex);
        }
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiIndex: [provice,city,hospital]
        };
        this.setData(data);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //默认查询四川成都地区的医院
        this.getHospitalSelectInfo("510000", "510100");
        //默认查询华西的医生
        this.getStaffsByHosptalId("1");
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        console.log(e.detail.value.phoneNum);
        //UserName Password UserType BelongToHospital Sex MobilePhone Birthday OpenId Status BelongToNurse BelongToDoctor


        if (this.data.sexIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择性别',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
            return;
        }

        if (this.data.docterIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择医生',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
            return;
        }

        if (this.data.nurseIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择护士',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
            return;
        }


        var postData = {
            UserName: e.detail.value.name,
            MobilePhone: e.detail.value.phoneNum,
            Birthday: this.data.birthday,
            BelongToHospital: 1,
            Sex: this.data.sex[this.data.sexIndex].Id,
            UserType: 1,
            BelongToNurse: this.data.nurse[this.data.nurseIndex].Id,
            BelongToDoctor: this.data.docter[this.data.docterIndex].Id,
            IdCard: e.detail.value.idCard,
            OpenId: app.globalData.openId,
            CKDLeave: app.globalData.showDiseaseInfo.CDKLeave,
            Disease: app.globalData.showDiseaseInfo.Disease
            //DiseaseType: this.data.disease[this.data.diseaseIndex].Id,
            //:,
            //BelongToDoctor:,
        };


        if (postData.MobilePhone.length>0 && postData.MobilePhone.length !== 11) {
            wx.showModal({
                title: '提示',
                content: '手机号格式不正确',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
            return;
        }

        if (postData.IdCard.length !== 18) {
            wx.showModal({
                title: '提示',
                content: '身份证号不正确',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
            return;
        }

        if (postData.UserName.length < 2) {
            wx.showModal({
                title: '提示',
                content: '用户名不正确',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
            return;
        }





        util.httpPost(app.globalData.urls.user.update, postData, res => {
            wx.switchTab({
                url: "/pages/currentDayInfo/currentDayInfo"
            });
        });


        //e.detail.value.name;
        //e.detail.value.illInfo;
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    onDiseaseDiagnosisTap: function (e) {
        wx.navigateTo({
            url: "/pages/diseaseDiagnosis/diseaseDiagnosis?patientId=" + app.globalData.user.Patient.Id
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            sexIndex: this.getIndexValue(app.globalData.user.Sex,this.data.sex),
            CKDIndex: this.getIndexValue(app.globalData.user.Patient.CKDLeave, this.data.CKD),
            diseaseIndex: this.getIndexValue(app.globalData.user.Patient.DiseaseType, this.data.disease),
            birthday: app.globalData.user.Birthday ? app.globalData.user.Birthday : '2017-01-01',
            userInfo: app.globalData.user,
            showDiseaseInfo: wx.getStorageSync("showDiseaseInfo")
         });
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})