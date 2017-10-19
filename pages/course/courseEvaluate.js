// pages/register/register.js
var app = getApp();
var util = require('../../utils/util.js');
//var lodash = require('../../utils/lodash.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        object: [{ name: '患者本人', Id: '0' }, { name: '患者家属', Id: '1' }],
        mode: [{ name: '门诊', Id: '1' }, { name: '电话', Id: '2' }, { name: '线上', Id: '3' }, { name: '线下', Id: '4' }],
        duty: [{ UserName: '医生', Id: '2' }, { UserName: '护士', Id: '3' }],
        cognition: [{ name: '完全了解能做到', Id: '1' }, { name: '完全了解做不到', Id: '2' }, { name: '部分了解', Id: '3' }, { name: '完全不了解', Id: '4' }],
        behavior: [{ name: '不愿接受', Id: '1' }, { name: '愿意接受', Id: '2' }, { name: '已改变中', Id: '3' }, { name: '维持持续', Id: '4' }],
        objectIndex: -1,
        dutyIndex: -1,
        behaviorIndex: -1,
        cognitionIndex: -1,
        birthday: '2017-01-01',
        multiIndex: [0, 0, 0],
        userInfo: {},
        patientId:"",
        date: util.getNowFormatDate(),
        courseId: "",
        courseName:"",
    },
    //需要查找原始对象,id,对应的选项索引值
    getIndexValue: function (orgValue, collect) {
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
    bindCognitionChange: function (e) {
        this.setData({
            cognitionIndex: e.detail.value
        });
    },
    onContentTap: function(e) {
        wx.navigateTo({
            url: "/pages/evaluate/content?patientId=" + this.data.patientId
    })
    },
    bindBehaviorChange: function (e) {
        this.setData({
            behaviorIndex: e.detail.value
        });
    },
    bindModeChange: function (e) {
        this.setData({
            modeIndex: e.detail.value
        });
    },
    bindDutyChange: function (e) {

        this.setData({
            dutyIndex: e.detail.value
        });
    },
    bindObjectChange: function (e) {
        this.setData({
            objectIndex: e.detail.value
        });
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            courseId: options.courseId,
            courseName: options.courseName,
        });
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        console.log(e.detail.value.phoneNum);
        //UserName Password UserType BelongToHospital Sex MobilePhone Birthday OpenId Status BelongToNurse BelongToDoctor


        if (this.data.objectIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择患教对象',
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

        if (this.data.cognitionIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择认知评估',
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

        if (this.data.behaviorIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择行为评估',
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
            AttendingDates: this.data.date,
            BehaviorCode: this.data.behavior[this.data.behaviorIndex].Id,
            BehaviorName: this.data.behavior[this.data.behaviorIndex].name,
            CognitionCode: this.data.cognition[this.data.cognitionIndex].Id,
            CognitionName: this.data.cognition[this.data.cognitionIndex].name,
            CoursName: this.data.courseName,
            Mark: e.detail.value.mark,
            ModeCode: this.data.mode[3].Id,
            ModeName: this.data.mode[3].name,
            ObjectCode: this.data.object[this.data.objectIndex].Id,
            ObjectName: this.data.object[this.data.objectIndex].name,
            PatientId: app.globalData.user.Patient.Id,
            OfflineCourseId: this.data.courseId
        };
        util.httpPost(app.globalData.urls.user.addPatientCourseEvaluate, postData, res => {
            //返回上一个页面
            wx.showModal({
                title: '提示',
                content: '评估提交成功',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                    wx.navigateBack({
                        delta: 1
                    });
                }
            });

        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {


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