//program run mode
//1.product for onlie product environment 
//2.test for onlie test environment
//3.local for local debug enviromnet
var runMode = "product";
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
        picUrl: host + "/upload/",
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
    isBindInfo: function () {
        var status = this.globalData.user.Patient.BindStatus;
        
        if (status == "110" || status == "111" || status == "101") {
            return true;
        } else {
            return false;
        }
    },
    onLaunch: function () {
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

