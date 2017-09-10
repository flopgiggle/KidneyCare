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
    formSubmit: function (e) {
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

        //根据选择的类型，获取发送消息的医生或护士的Id
        var touser = "";
        if (this.data.consultingTypeIndex == 0) {
            touser = app.globalData.user.BelongToDoctorId;
        }
        if (this.data.consultingTypeIndex == 1) {
            touser = app.globalData.user.BelongToNurseId;
        }

        var postData = {
            Message: e.detail.value.message,
            FromUser: app.globalData.user.Id,
            ToUser: touser
        };


        if (postData.Message.length < 5) {
            wx.showModal({
                title: '提示',
                content: '咨询问题描述不能少于5个字符',
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

        util.httpPost(app.globalData.urls.message.sendMessage, postData, res => {
            wx.showModal({
                title: '提示',
                content: '咨询提交成功',
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