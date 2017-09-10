// pages/contactUs/contactUs.js
// pages/consulting/consulting.js
var app = getApp();
var util = require('../../utils/util.js');
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
  
  },
  formSubmit: function (e) {
      var postData = {
          Message: e.detail.value.Message,
          FromUser: app.globalData.user.Id,
      };


      if (postData.Message.length < 5) {
          wx.showModal({
              title: '提示',
              content: '反馈信息描述不能少于5个字符',
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

      util.httpPost(app.globalData.urls.message.sendfeedback, postData, res => {
          wx.showModal({
              title: '提示',
              content: '反馈提交成功',
              success: function (res) {
                  if (res.confirm) {
                      console.log('用户点击确定');
                  } else if (res.cancel) {
                      console.log('用户点击取消');
                  }
                  wx.switchTab({
                      url: "/pages/currentDayInfo/currentDayInfo"
                  });
              }
          });


      });

  },
})