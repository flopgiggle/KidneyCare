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
        isBindInfo: null
    },
    onGoToBindTap: function(e) {
        wx.navigateTo({
            url: "/pages/register/register"
        });
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            searchDate: e.detail.value
        });
        this.loadList();
    },
    onAddHospitalRecordTap: function (event) {
        wx.navigateTo({
            url: "/pages/uploadReport/uploadReport"
        });
    },
    onMyselfRecordTap: function (event) {
        wx.navigateTo({
            url: "/pages/record/add"
        });
    },
    //onReportTap: function () {
    //    wx.navigateTo({
    //        url: "/pages/uploadReport/uploadReport"
    //    });
    //},
    onRecordTap: function () {
        wx.navigateTo({
            url: "/pages/chart/chart"
        });
    },
    onDialogueTap: function () {
        wx.navigateTo({
            url: "/pages/dialogue/dialogue"
        });
    },
    onReportTap: function () {
        wx.navigateTo({
            url: "/pages/chart/reportchart"
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //this.wxLoginProcess.bind(this);
        //this.loadList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        //this.loadPage();
    },
    loadPage: function () {
        this.setData({
            searchDate: util.getNowFormatDate(),
        });
        //var theApp = app;


        //wx.getUserInfo({
        //    success: res => {
        //        // 可以将 res 发送给后台解码出 unionId
        //        theApp.globalData.wxUserInfo = res.userInfo;

        //        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //        // 所以此处加入 callback 以防止这种情况
        //        if (this.userInfoReadyCallback) {
        //            this.userInfoReadyCallback(res);
        //        }
        //    }
        //});

        //this.loadList();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //this.loadPage();
        this.loadList();
    },
    loadList: function () {
        var start = new Date();
        //while (new Date() - start < 10000) { // 延迟一秒
        //    if (app.globalData.openId && app.globalData.user && app.globalData.user.Patient) {
        //        break;
        //    }
        //}
        if (app.globalData.openId === "") {
            console.log("openId获取失败");
            return;
        }
       var url = app.globalData.urls.user.getCurrentDayInfoList + this.data.searchDate + "/" + app.globalData.openId;
       util.http(url,
           res => {
               //合并收缩压舒张压数据
               //var recordListGroup = res.Result.MyRecord;
               this.setData({
                   myRecord: res.Result.MyRecord,
                   myReport: res.Result.MyReport,
                   isBindInfo: app.isBindInfo()
               });
           });
    },
    checkOpenId: function() {
        if (app.globalData.openId === "") {
            console.log("openId获取失败");
            return;
        }
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
        this.loadPage();
        wx.stopPullDownRefresh();
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

    },
    onDelete: function (e) {
        debugger;
        wx.showModal({
            title: '提示',
            content: '是否要删除该组记录',
            success: res=> {
                if (res.confirm) {
                    debugger;
                    var url = app.globalData.urls.record.delete + "/" + e.currentTarget.dataset.itemid;
                    util.http(url, res => {
                        debugger;
                        this.loadList();
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    }
})