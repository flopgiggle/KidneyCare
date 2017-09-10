// pages/my/my.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(111);
  },
  onConsultingTap: function (e) {
      wx.navigateTo({
          url: "/pages/consulting/consulting"
      })
  },
  onMessageTap: function (e) {
      wx.navigateTo({
          url: "/pages/dialogue/dialogue"
      })
  },
  onPersonlTap: function (e) {
      wx.navigateTo({
          url: "/pages/register/register"
      })
  },
  onContactUsTap: function (e) {
      wx.navigateTo({
          url: "/pages/contactUs/contactUs"
      })
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
      this.setData({ userInfo: app.globalData.user });
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