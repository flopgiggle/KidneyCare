var wxCharts = require('../../utils/wxcharts.js')
var app = getApp();
var util = require('../../utils/util.js');
var radarChart = null;
var lineChart = null;
var bloodSugarLineChart = null;
var heartRateChart = null;
// pages/chart/chart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        windowWidthdata: 320,
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
        this.setData({
            windowWidthdata:windowWidth
        });

       

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var url = app.globalData.urls.user.recordChart + "7/" + app.globalData.openId;
        util.http(url,
            res => {
                //this.setData({
                //    result: res.Result.ReportHistory,
                //    report: res.Result.ReportItem
                //});
                lineChart = new wxCharts({
                    canvasId: 'lineCanvas',
                    type: 'line',
                    categories: res.Result.Date,
                    series: [
                        {
                            name: '收缩压',
                            data: res.Result.SystolicPressure,
                            format: function(val) {
                                return val; //return val.toFixed(2);
                            }
                        }, {
                            name: '舒张压',
                            data: res.Result.DiastolicPressure,
                            format: function(val) {
                                return val; //return val.toFixed(2);
                            }
                        }
                    ],
                    yAxis: {
                        title: '血压mmhg',
                        format: function(val) {
                            return val; //return val.toFixed(2);
                        },
                        min: 0
                    },
                    width: this.data.windowWidthdata,
                    height: 150
                });

                heartRateChart = new wxCharts({
                    canvasId: 'heartRateCanvas',
                    type: 'line',
                    categories: res.Result.Date,
                    series: [{
                        name: '心率',
                        data: res.Result.HeartRate,
                        format: function (val) {
                            return val;//return val.toFixed(2);
                        }
                    }],
                    yAxis: {
                        title: '次数',
                        format: function (val) {
                            return val;//return val.toFixed(2);
                        },
                        min: 0
                    },
                    width: this.data.windowWidthdata,
                    height: 150
                });

                bloodSugarLineChart = new wxCharts({
                    canvasId: 'bloodSugarLineCanvas',
                    type: 'line',
                    categories: res.Result.Date,
                    series: [
                        {
                            name: '空腹血糖',
                            data: res.Result.FastingBloodGlucose,
                            format: function (val) {
                                return val;//return val.toFixed(2);
                            }
                        },{
                        name: '早餐后',
                        data: res.Result.BreakfastBloodGlucose,
                        format: function (val) {
                            return val;//return val.toFixed(2);
                        }
                    }, {
                        name: '午餐后',
                        data: res.Result.LunchBloodGlucose,
                        format: function (val) {
                            return val;//return val.toFixed(2);
                        }
                    }, {
                        name: '晚餐后',
                        data: res.Result.DinnerBloodGlucose,
                        format: function (val) {
                            return val;//return val.toFixed(2);
                        }
                    }, {
                            name: '随机',
                            data: res.Result.RandomBloodGlucose,
                            format: function (val) {
                                return val;//return val.toFixed(2);
                            }
                        }],
                    yAxis: {
                        title: 'mol',
                        format: function (val) {
                            return val;//return val.toFixed(2);
                        },
                        min: 0
                    },
                    width: this.data.windowWidthdata,
                    height: 150
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