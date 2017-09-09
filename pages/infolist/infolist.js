// pages/infolist/infolist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onAddHospitalRecordTap: function (event) {
    wx.navigateTo({
      url: "/pages/uploadReport/uploadReport"
    })
  },
  onMyselfRecordTap: function (event) {
    wx.navigateTo({
      url: "/pages/record/add"
    })
  },
  onReportTap: function () {
    wx.navigateTo({
        url: "/pages/uploadReport/uploadReport"
    })
  },
  onRecordTap: function () {
    wx.navigateTo({
        url: "/pages/chart/chart"
    })
  },
  onDialogueTap: function () {
    wx.navigateTo({
        url: "/pages/dialogue/dialogue"
    })
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
      if (app.globalData.user.Patient.BindStatus !== app.globalData.patientAlreadyBind) {
          wx.showToast({
              title: '尚未认证,将跳转到认证页面',
              icon: 'success',
              duration: 20000,
              complete: () => {
                  //wx.navigateTo({
                  //    url: "/pages/register/register"
                  //})
              }
          })

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