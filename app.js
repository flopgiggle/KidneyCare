//program run mode
//1.product for onlie product environment 
//2.test for onlie test environment
//3.local for local debug enviromnet
var runMode = "local";
var util = require('utils/util.js');
var _ = require('utils/undercore.js');
var host = {
    product:"https://30861365.qcloud.la",
    test:"https://77964003.qcloud.la",
    local:"http://localhost:11662"
}
var openId = {
    product:"",
    test:"",
    local: "oSqUB0XRxeZzn-iTpaXkenjXV0hE"
}
var baseUri = host[runMode] + "/api/";
App({
    globalData: {
        g_isPlayingMusic: false,
        g_currentMusicPostId: null,
        doubanBase: "https://api.douban.com",
        host: host[runMode],
        picUrl: host[runMode] + "/upload/",
        courseFileUrl: host[runMode] + "/uploadcoursefile/",
        openId: openId[runMode],
        patientAlreadyBind:"true",
        user: "",
        showDiseaseInfo: "",
        wxUserInfo:"",
        urls: {
            user: {
                regist: baseUri + "user/regist",
                update: baseUri + "user/updateUserInfo",
                getCurrentDayInfoList: baseUri + "user/getCurrentDayInfoList/",
                reportChart: baseUri + "user/getReportHistory/",
                recordChart: baseUri + "user/getMyRecordHistory/",
                getUserInfo: baseUri + "user/getUserInfo", 
                updatePatientDisease: baseUri + "user/updatePatientDisease",
                getMyRecordHistoryByPatientId: baseUri + "user/getMyRecordHistoryByPatientId/",
                getStaffsByHosptalId: baseUri + "user/getStaffsByHosptalId/",
                getHospitalSelectInfo: baseUri + "user/getHospitalSelectInfo/",
                getExcpetRecordInfoList: baseUri + "user/getExcpetRecordInfoList/", 
                addPatientCourseEvaluate: baseUri + "user/addPatientCourseEvaluate/",
            },
            record: {
                add: baseUri + "record/add",
            },
            addReport: {
                add: baseUri + "record/addReport",
            },
            message: {
                sendMessage: baseUri + "message/sendMessage",
                getMessage: baseUri + "message/getMessage",
                sendfeedback: baseUri + "message/sendfeedback",
                getPushMessage: baseUri + "message/getPushMessage/",
                readPushMessage: baseUri + "message/readPushMessage/",
            },
            course: {
                createCourse: baseUri + "course/createCourse",
                uploadPic: baseUri + "course/uploadPic",
                uploadPPT: baseUri + "course/uploadPPT",
                getCourseListForDisease: baseUri + "course/getCourseListForDisease/",
                getTakePartInCourseListForDisease: baseUri + "course/getTakePartInCourseListForDisease/",
                getCourseDetailById: baseUri + "course/getCourseDetailById/",
                appointmentCourse: baseUri + "course/appointmentCourse/",
                signInCourse: baseUri + "course/signInCourse/",
                getCourseTakeInStatus: baseUri + "course/getCourseTakeInStatus/",
                getCourseTakeInData: baseUri + "course/getCourseTakeInData/",
            }

        }
    },
    isBindInfo: function () {
        var status = this.globalData.user.Patient.BindStatus;
        
        if (status == "110" || status == "111" || status == "101") {
            return true;
        } else {
            return false;
        }
    },
    onLaunch: function () {
        wx.login({
            success: this.wxLoginProcess
        });
        wx.getUserInfo({
            success: res => {
                this.globalData.wxUserInfo = res.userInfo;
            }
        });
    },
    wxLoginProcess: function (res) {
        var url = this.globalData.urls.user.getUserInfo;
        var postData = {
            Code: res?res.code:"",
            OpenId: this.globalData.openId
        }
        util.httpPost(url, postData,
            res => {
                this.globalData.user = res.Result;
                this.globalData.openId = res.Result.OpenId;
                wx.setStorage({
                    key: "userId",
                    data: res.Result.Id
                });
                wx.setStorage({
                    key: "userOpenId",
                    data: res.Result.OpenId
                });

                wx.setStorage({
                    key: "userToken",
                    data: res.Result.Token
                });
                wx.switchTab({
                    url: "/pages/currentDayInfo/currentDayInfo"
                });
            });
    }
});

