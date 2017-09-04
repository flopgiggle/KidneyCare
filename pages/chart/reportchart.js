var wxCharts = require('../../utils/wxcharts.js')
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

        radarChart = new wxCharts({
            canvasId: 'radarCanvas',
            type: 'radar',
            categories: ['心率', '收缩压', '舒张压', '空腹血糖', '餐后血糖', '体重'],
            series: [{
                name: '当日数据',
                data: [90, 110, 125, 95, 87, 122]
            }],
            width: windowWidth,
            height: 200,
            extra: {
                radar: {
                    max: 150
                }
            }
        });

        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: ['25', '26', '27', '28', '29', '30', '31'],
            series: [{
                name: '收缩压',
                data: [93, 100, 120, 160, 150, 110],
                format: function (val) {
                    return val;//return val.toFixed(2);
                }
            }, {
                name: '舒张压',
                data: [60, 80, 90, 120, 110, 80],
                format: function (val) {
                    return val;//return val.toFixed(2);
                }
            }],
            yAxis: {
                title: '血压mmhg',
                format: function (val) {
                    return val;//return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 150
        });

        bloodSugarLineChart = new wxCharts({
            canvasId: 'bloodSugarLineCanvas',
            type: 'line',
            categories: ['25', '26', '27', '28', '29', '30', '31'],
            series: [{
                name: '早餐后',
                data: [4.3, 5.5, 6.9, 8.2, 3.5, 5.8],
                format: function (val) {
                    return val;//return val.toFixed(2);
                }
            }, {
                name: '午餐后',
                data: [2.3, 3.5, 3.9, 5.2, 9.5, 2.8],
                format: function (val) {
                    return val;//return val.toFixed(2);
                }
            }, {
                name: '晚餐后',
                data: [1.3, 6.5, 5.9, 2.2, 8.5, 3.8],
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
            width: windowWidth,
            height: 150
        });

        heartRateChart = new wxCharts({
            canvasId: 'heartRateCanvas',
            type: 'line',
            categories: ['25', '26', '27', '28', '29', '30', '31'],
            series: [{
                name: '早餐后',
                data: [80, 70, 110, 160, 60, 80],
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
            width: windowWidth,
            height: 150
        });
        heartRateChart = new wxCharts({
            canvasId: 'weightCanvas',
            type: 'line',
            categories: ['70', '72', '71', '70', '69', '68', '67'],
            series: [{
                name: '体重',
                data: [80, 70, 110, 160, 60, 80],
                format: function (val) {
                    return val;//return val.toFixed(2);
                }
            }],
            yAxis: {
                title: 'KG',
                format: function (val) {
                    return val;//return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 150
        });
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