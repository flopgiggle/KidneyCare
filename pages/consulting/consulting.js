// pages/consulting/consulting.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
    data: {
        consultingType: ['医生', '护士'],
        consultingTypeIndex: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    },

  bindConsultingTypeChange: function (e) {
      this.setData({
          consultingTypeIndex: e.detail.value
      })
  },
  onConsutingTap: function() {
      if (app.globalData.user.Patient.BindStatus !== app.globalData.patientAlreadyBind) {
          wx.showModal({
              title: '尚未绑定医患关系',
              content: '您目前还未关联医护，请先完善您的个人档案',
              confirmText: '马上完善',
              cancelText: '暂不处理',
              success: function (res) {
                  if (res.confirm) {
                      wx.navigateTo({
                          url: "/pages/register/register"
                      });
                  } else if (res.cancel) {
                      wx.switchTab({
                          url: "/pages/currentDayInfo/currentDayInfo"
                      });
                  }
              }
          });
      }  
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