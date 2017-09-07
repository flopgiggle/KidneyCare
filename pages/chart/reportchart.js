var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var util = require('../../utils/util.js');
var radarChart = null;
var lineChart = null;
var bloodSugarLineChart = null;
var heartRateChart = null;
var chartInstance = {};
// pages/chart/chart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        year: "2017",
        result: [],
        report: [],
        picurl: app.globalData.picUrl,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var windowWidth = 320;

        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        var url = app.globalData.urls.user.reportChart + this.data.year + "/" + app.globalData.openId;
        util.http(url,
        res => {
            this.setData({
                result: res.Result.ReportHistory,
                report: res.Result.ReportItem
        });
            for (var item of res.Result.ReportHistory) {
                
                    lineChart = new wxCharts({
                        canvasId: item.DataCode,
                        type: 'line',
                        categories: item.Xdata,//item.Values, //['25', '26', '27', '28', '29', '30', '31'],//
                        series: [{
                            name: item.Name,
                            data: item.Values,//item.Xdata, //[93, 100, 120, 160, 150, 110],//
                            format: function (val) {
                                return val;//return val.toFixed(2);
                            }
                        }],
                        yAxis: {
                            title: item.UnitName,
                            format: function (val) {
                                return val;//return val.toFixed(2);
                            },
                            min: 0
                        },
                        width: windowWidth,
                        height: 150
                    });
                
            }

        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /*查看图片*/
    viewMoviePostImg: function (e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
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