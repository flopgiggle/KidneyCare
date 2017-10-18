// pages/diseaseDiagnosis/diseaseDiagnosis.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseId: "",
        courseDetail: {},
        picUrl: "",
        pptUrl:"",
        checkedList: [],
        patientInfo: {},
        CKD: [{ Name: '1期', Id: '1' }, { Name: '2期', Id: '2' }, { Name: '3期', Id: '3' }, { Name: '4期', Id: '4' }, { Name: '5期', Id: '5' }],
        CKDIndex: -1
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            courseId: options.courseId,
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
        var url = app.globalData.urls.course.getCourseDetailById + this.data.courseId;
        util.http(url,
            res => {
                var courseDetail = JSON.parse(res.Result);
                debugger;
                courseDetail.StartTimeString = util.formatDate("hh:mm", new Date(courseDetail.StartTime));
                courseDetail.EndTimeString = util.formatDate("hh:mm", new Date(courseDetail.EndTime));
                debugger;
                this.setData({
                    courseDetail: courseDetail,
                    picUrl: app.globalData.courseFileUrl + courseDetail.PicUrl,
                    pptUrl: app.globalData.courseFileUrl + courseDetail.PPTUrl
                });
        });
    },
    onDeleteTap: function () {
        var url = app.globalData.urls.course.deleteCorese + this.data.courseId;
        wx.showModal({
            title: '提示',
            content: '是否要删除该课程',
            success: function (res) {
                if (res.confirm) {
                    util.http(url,
                        res => {
                            wx.redirectTo({
                                url: "/pages/course/manageCourse"
                            });
                        });
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    },
    onFinishTap: function () {
        var url = app.globalData.urls.course.finishCourse + this.data.courseId;
        wx.showModal({
            title: '提示',
            content: '是否要结束该课程',
            success: function (res) {
                if (res.confirm) {
                    util.http(url,
                        res => {
                            wx.redirectTo({
                                url: "/pages/course/manageCourse"
                            });
                        });
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    },
    onModifyTap: function () {
        wx.redirectTo({
            url: "/pages/course/addCourse?courseId=" + this.data.courseId
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