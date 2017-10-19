// pages/diseaseDiagnosis/diseaseDiagnosis.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        patientId: "",
        checkedList: [],
        patientInfo: {},
        CKD: [{ Name: '1期', Id: '1' }, { Name: '2期', Id: '2' }, { Name: '3期', Id: '3' }, { Name: '4期', Id: '4' }, { Name: '5期', Id: '5' }],
        CKDIndex: -1,
        items: [
            { name: 'USA', value: '美国' },
            { name: 'CHN', value: '中国', checked: 'true' },
        ],
        isCheckedNew: true,
        checkedClass:"selected"
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            patientId: options.patientId,
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    onCourseTap: function (e) {
        wx.navigateTo({
            url: "/pages/course/courseDetail?courseId=" + e.currentTarget.dataset.course.Id
        });
    },
    onNewCourseTap: function () {
        this.setData({ isCheckedNew: true });
        this.loadAllCourse();
    },
    onJoinCourseTap: function () {
        this.setData({ isCheckedNew: false });
        this.loadMyCourse();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.loadAllCourse();
    },
    loadAllCourse: function () {
        var url = app.globalData.urls.course.getCourseListForDisease;
        util.http(url,
            res => {
                debugger;
                var patientInfo = JSON.parse(res.Result);
                this.setData({ patientInfo: patientInfo });
            });
    },
    loadMyCourse: function () {
        var url = app.globalData.urls.course.getTakePartInCourseListForDisease;
        util.http(url,
            res => {
                debugger;
                var patientInfo = JSON.parse(res.Result);
                this.setData({ patientInfo: patientInfo });
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

    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    }
})