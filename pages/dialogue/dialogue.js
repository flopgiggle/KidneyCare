// pages/dialogue/dialogue.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allData: [],
        user: {},
        wxUserInfo: "",
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
      this.loadList();
  },
  loadList: function () {
      //if (app.globalData.openId === "") {
      //    console.log("openId获取失败");
      //    return;
      //}
      var url = app.globalData.urls.message.getMessage;

      var postData = {
          Index: 1,
          PageSize: 1000,
          UserId: app.globalData.user.Id
      }

      util.httpPost(url, postData, res => {
          this.setData({
              allData:res.Result,
              user: app.globalData.user,
              wxUserInfo: app.globalData.wxUserInfo,
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