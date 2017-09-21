// pages/diseaseDiagnosis/diseaseDiagnosis.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        patientId: "",
        checkedList: [],
        patientInfo: {},
        items: [
            { name: 'USA', value: '美国23232' },
            { name: 'CHN', value: '中国sdfsdfsdf', checked: 'true' },
            { name: 'BRA', value: '巴西ffffffffffffffffffffff' },
            { name: 'JPN', value: '日本ssdf' },
            { name: 'ENG', value: '英国asddddddd' },
            { name: 'TUR', value: '法国dddddddddddddd' },
        ],
        disease: [
            { diseaseCode: '1', checked: false, type: 'protopathy', name: '慢性肾小球肾炎' },
            { diseaseCode: '2', checked: false, type: 'protopathy', name: '肾病综合征(未活检)' },
            { diseaseCode: '3', checked: false, type: 'protopathy', name: '慢性肾盂肾炎' },
            { diseaseCode: '4', checked: false, type: 'protopathy', name: '梗阻性肾病' },
            { diseaseCode: '5', checked: false, type: 'protopathy', name: '多囊肾' },
            { diseaseCode: '6', checked: false, type: 'protopathy', name: '糖尿病肾病' },
            { diseaseCode: '7', checked: false, type: 'protopathy', name: '高血压肾损害' },
            { diseaseCode: '8', checked: false, type: 'protopathy', name: '痛风性肾病' },
            { diseaseCode: '9', checked: false, type: 'protopathy', name: '淀粉样变' },
            { diseaseCode: '10', checked: false, type: 'protopathy', name: '多发性骨髓瘤' },
            { diseaseCode: '11', checked: false, type: 'protopathy', name: '紫癜性肾病' },
            { diseaseCode: '12', checked: false, type: 'protopathy', name: '狼疮肾炎' },
            { diseaseCode: '13', checked: false, type: 'protopathy', name: '血管炎' },
            { diseaseCode: '14', checked: false, type: 'protopathy', name: 'IgA肾病' },
            { diseaseCode: '15', checked: false, type: 'protopathy', name: '乙肝相关肾' },
            { diseaseCode: '16', checked: false, type: 'protopathy', name: '遗传性肾病' },
            { diseaseCode: '17', checked: false, type: 'protopathy', name: '药物性肾损' },
            { diseaseCode: '18', checked: false, type: 'protopathy', name: '间质性肾炎' },
            { diseaseCode: '19', checked: false, type: 'complication', name: '肾性高血压' },
            { diseaseCode: '20', checked: false, type: 'complication', name: '肾性贫血' },
            { diseaseCode: '21', checked: false, type: 'complication', name: '肾性骨病' },
            { diseaseCode: '22', checked: false, type: 'complication', name: '心衰' },
            { diseaseCode: '23', checked: false, type: 'complication', name: '消化道出血' },
            { diseaseCode: '24', checked: false, type: 'complication', name: '周围神经病变' },
            { diseaseCode: '25', checked: false, type: 'complication', name: '浆膜腔积液' },
            { diseaseCode: '26', checked: false, type: 'alongDisease', name: '冠心病' },
            { diseaseCode: '27', checked: false, type: 'alongDisease', name: 'COPD' },
            { diseaseCode: '28', checked: false, type: 'alongDisease', name: '肝硬化' },
            { diseaseCode: '29', checked: false, type: 'alongDisease', name: '脑梗塞' },
            { diseaseCode: '30', checked: false, type: 'alongDisease', name: '高血压' },
            { diseaseCode: '31', checked: false, type: 'alongDisease', name: '糖尿病' },
            { diseaseCode: '32', checked: false, type: 'alongDisease', name: '痛风' },
            { diseaseCode: '33', checked: false, type: 'alongDisease', name: '肿瘤' },
            { diseaseCode: '34', checked: false, type: 'alongDisease', name: '传染性疾病' },
            { diseaseCode: '35', checked: false, type: 'alongDisease', name: '高脂血症' },
            { diseaseCode: '36', checked: false, type: 'other', name: '其他' },
        ],
        CKD: [
            { Name: '1期', Id: '1' }, { Name: '2期', Id: '2' }, { Name: '3期', Id: '3' }, { Name: '4期', Id: '4' },
            { Name: '5期', Id: '5' }
        ],
        CKDIndex: -1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        var allDiease = this.data.disease;
        var appData = getApp().globalData;
        var disease = appData.user.Disease;
        var selectedDisease = app.globalData.showDiseaseInfo;
        var ckd = appData.user.Patient.CKDLeave;

        //设置选中的疾病
        if ((!!!disease || disease.length == 0) && !!!selectedDisease) {
            return;
        }
        if (selectedDisease) {
            disease = selectedDisease.Disease;
            ckd = selectedDisease.CDKLeave;
        }


        for (var dataItem of allDiease) {
            for (var item of disease) {
                if (item.DiseaseCode == dataItem.diseaseCode) {
                    dataItem.checked = true;
                    break;;
                } else {
                    dataItem.checked = false;
                }
            }
        }
        this.setData({
            //patientInfo: patientInfo,
            disease: allDiease,
            CKDIndex: util.getIndexValue(ckd, this.data.CKD),
        });
    },
    onSaveTap: function(e) {
        var diseaseList = [];

       
        if (this.data.CKDIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择CKD分期',
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
        var term = Number.parseInt(this.data.CKDIndex) + 1;
        var showDiseaseInfo = util.getLeave(term);
        
        for (var code of wx.getStorageSync("diseaseCheckedList")) {
            for (var dataItem of this.data.disease) {
                if (code == dataItem.diseaseCode) {
                    diseaseList.push({
                        DiseaseCode:dataItem.diseaseCode,
                        DiseaseName: dataItem.name,
                        DiseaseType: dataItem.type
                    });
                    showDiseaseInfo += (dataItem.name + ";");
                }
            }
        }
        wx.setStorageSync("showDiseaseInfo", showDiseaseInfo);
        //if (diseaseList.length <= 0) {
        //    wx.showModal({
        //        title: '提示',
        //        content: '请选择疾病类型',
        //        success: function (res) {
        //            if (res.confirm) {
        //                console.log('用户点击确定');
        //            } else if (res.cancel) {
        //                console.log('用户点击取消');
        //            }
        //        }
        //    });
        //    return;
        //}

        

        var postData = {
            CDKLeave : this.data.CKD[this.data.CKDIndex].Id,
            Disease: diseaseList,
            Profile:showDiseaseInfo
        }

        app.globalData.showDiseaseInfo = postData;
        wx.navigateBack({
            delta: 1
        });

        //util.httpPost(url,postData,
        //    res => {
        //        wx.navigateBack({
        //            delta: 1
        //        });
        //    });
    },
    yfCheckboxChange: function (e) {
        //var allDisease = e.detail.value;
        ////设置选中的疾病
        var allDiease = this.data.disease;
        if (e.detail.value.length == 0) {
            for (var dataItem of allDiease) {
                dataItem.checked = false;
            }
        } else {
            for (var dataItem of allDiease) {
                for (var item of e.detail.value) {
                    if (item == dataItem.diseaseCode) {
                        dataItem.checked = true;
                        break;;
                    } else {
                        dataItem.checked = false;
                    }
                }
            }
        }

        this.setData({
            disease: allDiease,
        });
        wx.setStorageSync("diseaseCheckedList", e.detail.value);
        //this.setData({ checkedList: e.detail.value});
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    },
    bindCKDChange: function (e) {
        this.setData({
            CKDIndex: e.detail.value
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