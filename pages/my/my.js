// pages/my/my.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      age: "",
      wxUserInfo: "",
      hasNewCourse: false,
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
  onExceptTap: function () {
      wx.navigateTo({
          url: "/pages/exceptInfo/exceptInfo"
      });
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
  onCourseTap: function (e) {
      util.readPushMessage(10, res => {
      });
      wx.navigateTo({
          url: "/pages/course/manageCourse"
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
      this.setData({
          userInfo: app.globalData.user,
          age: this.jsGetAge(app.globalData.user.Birthday),
          wxUserInfo: app.globalData.wxUserInfo,
      });
      this.loadPushMessage();
  },

  loadPushMessage: function () {
      util.hasPushMessage(10, res => {
          if (res.Result) {
              this.setData({
                  hasNewCourse: true
              })
          } else {
              this.setData({
                  hasNewCourse: false
              })
          }
      });
  },

  jsGetAge: function (strBirthday) {
      if (!!!strBirthday) {
          return "";
      }

      var returnAge;
      var strBirthdayArr= strBirthday.split("-");  
      var birthYear = strBirthdayArr[0];  
      var birthMonth = strBirthdayArr[1];  
      var birthDay = strBirthdayArr[2];  
      
      var d = new Date();  
      var nowYear = d.getFullYear();  
      var nowMonth = d.getMonth() + 1;  
      var nowDay = d.getDate();  
      
      if(nowYear == birthYear) {
          returnAge = 0;//同年 则为0岁  
      }  
      else{  
          var ageDiff = nowYear - birthYear ; //年之差  
          if(ageDiff > 0) {
              if (nowMonth == birthMonth) {
                  var dayDiff = nowDay - birthDay;//日之差  
                  if (dayDiff < 0) {
                      returnAge = ageDiff - 1;
                  }
                  else {
                      returnAge = ageDiff;
                  }
              }
              else {
                  var monthDiff = nowMonth - birthMonth;//月之差  
                  if (monthDiff < 0) {
                      returnAge = ageDiff - 1;
                  }
                  else {
                      returnAge = ageDiff;
                  }
              }
          }  
          else  
          {  
              returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
          }
      }  
      
      return returnAge;//返回周岁年龄  

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