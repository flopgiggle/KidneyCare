// pages/register/register.js
var app = getApp();
var util = require('../../utils/util.js');
var baseUrl = app.globalData.baseUri;
Page({

  /**
   * 页面的初始数据
   */
    data: {
    sex: [{ UserName: '男', Id: '0' }, { UserName: '女', Id: '1' }],
    docter: [{ UserName: '张医生', Id: '1' }, { UserName: '王医生', Id: '1' }],
    nurse: [{ UserName: '张护士', Id: '1' }, { UserName: '王护士', Id: '1' }],
    sexIndex:-1,
    docterIndex: -1,
    nurseIndex: -1,
    birthday: '2017-01-01',
    multiArray: [['四川省', '云南省'], ['成都市', '绵阳市', '德阳市', '攀枝花市', '宜宾市'], ['四川大学华西医院', '省医院']],
    multiIndex: [0, 0, 0],
  },
  bindDocterChange:function(e) {
      this.setData({
          docterIndex: e.detail.value
      });
  },
  bindNurseChange: function (e) {
     
      this.setData({
          nurseIndex: e.detail.value
      });
  },
  bindSexChange: function (e) {
      debugger;
      this.setData({
      sexIndex: e.detail.value
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        birthday: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['成都市', '绵阳市', '德阳市', '攀枝花市', '宜宾市'];
            data.multiArray[2] = ['四川大学华西医院','省医院'];
            break;
          case 1:
            data.multiArray[1] = ['昆明市', '玉溪市'];
            data.multiArray[2] = ['昆明市医院', '昆明儿童医院', '昆明中心医院'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['四川大学华西医院', '省医院'];
                break;
              case 1:
                data.multiArray[2] = ['绵阳医院'];
                break;
              case 2:
                data.multiArray[2] = ['德阳医院', '德阳医院1'];
                break;
              case 3:
                data.multiArray[2] = ['攀枝花医院', '攀枝花医院2', '攀枝花医院3'];
                break;
              case 4:
                data.multiArray[2] = ['宜宾医院1', '宜宾医院2', '宜宾医院3', '宜宾医院4'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['昆明市医院', '昆明儿童医院', '昆明中心医院'];
                break;
              case 1:
                data.multiArray[2] = ['玉溪市医院', '玉溪儿童医院'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  formSubmit: function (e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
      console.log(e.detail.value.phoneNum);
      //UserName Password UserType BelongToHospital Sex MobilePhone Birthday OpenId Status BelongToNurse BelongToDoctor
      debugger;
      var postData = {
          UserName: e.detail.value.name,
          MobilePhone: e.detail.value.phoneNum,
          Birthday: this.data.birthday,
          BelongToHospital: 1,
          Sex: this.data.sex[this.data.sexIndex].Id,
          UserType: 1,
          BelongToNurse: this.data.nurse[this.data.nurseIndex].Id,
          BelongToDoctor: this.data.docter[this.data.docterIndex].Id,
          OpenId: app.globalData.openId
          //:,
          //BelongToDoctor:,
      };

      util.httpPost(app.globalData.urls.user.regist, postData, res => {
          debugger;
          wx.switchTab({
              url: "/pages/currentDayInfo/currentDayInfo"
          });
      });


      //e.detail.value.name;
      //e.detail.value.illInfo;
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