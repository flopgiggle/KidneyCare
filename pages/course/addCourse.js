var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var app = getApp();
var util = require('../../utils/util.js');
// pages/uploadReport/uploadReport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startTime: "14:00",
        endTime: "16:00",
        date: util.getNowFormatDate(),
        picList: [],
        pptList: [],
        appUrlName: null,
        pptUrlName: null,
        courseId: "",
        orgCourseDetail: {},
    },
    bindReportTypeChange: function (e) {
        this.setData({
            reportTypeIndex: e.detail.value,
            reportTypeId: this.data.reportType[e.detail.value].Id
        });
    },
    choosePic: function () {
        var that = this;
        wx.chooseImage({
            sourceType: sourceType[this.data.sourceTypeIndex],
            sizeType: sizeType[this.data.sizeTypeIndex],
            count: 1,
            success: response => {
                this.uploadImage(response.tempFilePaths[0], res => {
                    res = JSON.parse(res.data);
                    that.setData({
                        picList: response.tempFilePaths,
                        appUrlName: res.name
                    });
                });
                
            }
        })
    },
    choosePPT: function () {
        var that = this;
        wx.chooseImage({
            sourceType: sourceType[this.data.sourceTypeIndex],
            sizeType: sizeType[this.data.sizeTypeIndex],
            count: 1,
            success: response=>{
                this.uploadImage(response.tempFilePaths[0], res => {
                    res = JSON.parse(res.data);
                    that.setData({
                        pptList: response.tempFilePaths,
                        pptUrlName: res.name
                    });
                });
                
            }
        })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            courseId: options.courseId,
        });
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(), 
                "h+": this.getHours(), 
                "m+": this.getMinutes(), 
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3), 
                "S": this.getMilliseconds() 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        var postData = {
            Id: this.data.courseId,
            CourseName: e.detail.value.CourseName,
            Address: e.detail.value.Address,
            Date: this.data.date,
            StartTime: this.data.startTime,
            EndTime: this.data.endTime,
            Speaker: e.detail.value.Speaker,
            SpeakerInfo: e.detail.value.SpeakerInfo,
            CourseContent: e.detail.value.CourseContent,
            Type: 0,
            PicUrl: this.data.appUrlName,
            PPTUrl: this.data.pptUrlName,
        };

        if (postData.CourseName < 2) {
            wx.showModal({
                title: '提示',
                content: '请填写课程名称',
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

        if (postData.Address < 2) {
            wx.showModal({
                title: '提示',
                content: '请填写课程地址',
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

        if (postData.Speaker < 2) {
            wx.showModal({
                title: '提示',
                content: '请填写主讲人',
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

        this.saveMainData(postData);
    },
    saveMainData: function (postData) {
        util.httpPost(app.globalData.urls.course.createCourse, postData, res => {
            wx.redirectTo({
                url: "/pages/course/manageCourse"
            })
        });
    },
    uploadImage: function (filePath, callback) {
        wx.showLoading({
            title: '加载中',
        });
        wx.uploadFile({
            url: app.globalData.host + "/UploadImages.ashx",
            filePath: filePath,
            name: 'fileData',
            formData: {},
            success: (res) => {
                callback(res);
                wx.hideLoading();
            }
        });
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            date: e.detail.value
        });
    },
    bindStartTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            startTime: e.detail.value
        });
    },
    bindEndTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            endTime: e.detail.value
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
        if (this.data.courseId) {
            var url = app.globalData.urls.course.getCourseDetailById + this.data.courseId;
            util.http(url,
                res => {
                    var courseDetail = JSON.parse(res.Result);
                    courseDetail.StartTimeString = util.formatDate("hh:mm", new Date(courseDetail.StartTime));
                    courseDetail.EndTimeString = util.formatDate("hh:mm", new Date(courseDetail.EndTime));
                    this.setData({
                        startTime: courseDetail.StartTimeString,
                        endTime: courseDetail.EndTimeString,
                        date: courseDetail.Date,
                        picList: [app.globalData.courseFileUrl + courseDetail.PicUrl],
                        pptList: [app.globalData.courseFileUrl + courseDetail.PPTUrl],
                        appUrlName: courseDetail.PicUrl,
                        pptUrlName: courseDetail.PPTUrl,
                        orgCourseDetail: courseDetail,

                    });
                });
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