var wxCharts = require('../../utils/wxcharts.js')
var radarChart = null;
var lineChart = null;
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
      categories: ['25', '26', '27', '28', '29', '30','31'],
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