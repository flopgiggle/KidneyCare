var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var app = getApp();
var util = require('../../utils/util.js');
// pages/uploadReport/uploadReport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reportType: [{ name: '血常规', Id: '1' }, { name: '尿常规', Id: '2' }, { name: '泌尿系统彩超', Id: '3' }, { name: '尿蛋白定量检查', Id: '4' }, { name: '生化', Id: '5' }, { name: '肾活检', Id: '6' }, { name: '甲状旁腺激素(PTH)', Id: '7' }, { name: '铁代谢', Id: '8' }, { name: '其他', Id: '9' }],
        reportTypeIndex: -1,
        reportTypeId: -1,
        reportDate: '2017-03-05',
        count: [1, 2, 3],
        countIndex: 2,
        imageList: [],
    },
    bindReportTypeChange: function (e) {
        this.setData({
            reportTypeIndex: e.detail.value,
            reportTypeId: this.data.reportType[e.detail.value].Id
        });
    },
    chooseImage: function () {
        wx.chooseImage({
            sourceType: sourceType[this.data.sourceTypeIndex],
            sizeType: sizeType[this.data.sizeTypeIndex],
            count: 2,
            success: function (res) {
                console.log(res)
                that.setData({
                    imageList: res.tempFilePaths
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(), 
                "h+": this.getHours(), 
                "m+": this.getMinutes(), 
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3), 
                "S": this.getMilliseconds() 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        var postData = {
            ReportDate: this.data.reportDate,
            RecordTime: this.data.bloodPressureTime,
            ReportType: this.data.reportTypeId,
            MedicalIndicators: {
                BW: e.detail.value.BW,
                Pro: e.detail.value.Pro,
                Upr: e.detail.value.Upr,
                ProICr: e.detail.value.ProICr,
                BUN: e.detail.value.BUN,
                UA: e.detail.value.UA,
                SCr: e.detail.value.SCr,
                eGFR: e.detail.value.eGFR,
                Hb: e.detail.value.Hb,
                Alb: e.detail.value.Alb,
                TG: e.detail.value.TG,
                Chol: e.detail.value.Chol,
                Na: e.detail.value.Na,
                K: e.detail.value.K,
                P: e.detail.value.P,
                Ca: e.detail.value.Ca,
                PTH: e.detail.value.PTH,
                Weight: e.detail.value.Weight
            },
            OpenId: app.globalData.openId
        };
        util.httpPost(app.globalData.urls.addReport.add, postData, res => {
            debugger;
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