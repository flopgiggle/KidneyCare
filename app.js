var util = require('utils/util.js');
var _ = require('utils/undercore.js');
var host = "https://30861365.qcloud.la";
//var host = "http://localhost:11662";
var baseUri = host+"/api/";
App({
    globalData: {
        g_isPlayingMusic: false,
        g_currentMusicPostId: null,
        doubanBase: "https://api.douban.com",
        host: host,
        picUrl: host + "/upload/",
        openId: "",
        //openId: "o8_AP0RGpMa0czU1-gwndOD7H58U",//"1234586888912",
        patientAlreadyBind:"111",
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
            }

        }
    },
    onLaunch: function () {
        //debugger;
        //var that = this;

        //var lines = [];

        //lines.push("_.map([1, 2, 3], function(num){ return num * 3; });");
        //lines.push(_.map([1, 2, 3], function (num) { return num * 3; }));

        //lines.push("var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);");
        //lines.push(_.reduce([1, 2, 3], function (memo, num) { return memo + num; }, 0));

        //lines.push("var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });");
        //lines.push(_.find([1, 2, 3, 4, 5, 6], function (num) { return num % 2 == 0; }));

        //lines.push("_.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });");
        //lines.push(_.sortBy([1, 2, 3, 4, 5, 6], function (num) { return Math.sin(num); }));

        //lines.push("_.indexOf([1, 2, 3], 2);");
        //lines.push(_.indexOf([1, 2, 3], 2));

        //this.setData({
        //    text: lines.join('\n')
        //})
    }
});

