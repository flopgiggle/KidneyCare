// pages/infolist/infolist.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchDate: util.getNowFormatDate(),
        myRecord: [],
        myReport: [],
        app: {},
        patientId: "",
    },
    onGoToBindTap: function (e) {
        //wx.navigateTo({
        //    url: "/pages/register/register"
        //});
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            searchDate: e.detail.value
        });
        this.loadList();
    },
    onAddHospitalRecordTap: function (event) {
        //wx.navigateTo({
        //    url: "/pages/uploadReport/uploadReport"
        //});
    },
    onMyselfRecordTap: function (event) {
        //wx.navigateTo({
        //    url: "/pages/record/add"
        //});
    },
    //onReportTap: function () {
    //    wx.navigateTo({
    //        url: "/pages/uploadReport/uploadReport"
    //    });
    //},
    onRecordTap: function () {
        //wx.navigateTo({
        //    url: "/pages/chart/chart"
        //});
    },
    onDialogueTap: function () {
        //wx.navigateTo({
        //    url: "/pages/dialogue/dialogue"
        //});
    },
    onReportTap: function () {
        //wx.navigateTo({
        //    url: "/pages/chart/reportchart"
        //});
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            patientId: options.patientId
        });
        this.loadList();
        
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
        this.setData({
            searchDate: util.getNowFormatDate(),
        });
        var theApp = app;

    },

    
    loadList: function () {
        debugger;
        if (app.globalData.openId === "") {
            console.log("openId获取失败");
            return;
        }
        var endDate = util.getNowFormatDate();
        var startDate = util.getPreMonth(endDate);

        var url = app.globalData.urls.user.getExcpetRecordInfoList + startDate + "/" + endDate + "/" + app.globalData.user.Patient.Id;
        util.http(url,
            res => {
                //合并收缩压舒张压数据
                //var recordListGroup = res.Result.MyRecord;
                this.setData({
                    myRecord: res.Result.MyRecord,
                    myReport: res.Result.MyReport
                });
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