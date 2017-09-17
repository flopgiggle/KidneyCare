function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

function http(url, callBack) {
    wx.showToast({
        title: '',
        icon: 'loading',
        duration: 100000
    });
    wx.request({
        url: url,
        method: 'GET',
        header: {
            "Content-Type": "json"
        },
        success: function(res) {
            callBack(res.data);
            wx.hideToast();
        },
        fail: function(error) {
            wx.showToast({
                title: '获取信息失败',
                icon: 'loading',
                duration: 1000
            });
            console.log(error);
        }
    });
}

function app() {
    return getApp();
}

function httpPost(url,data,callBack) {
    wx.showToast({
        title: '',
        icon: 'loading',
        duration: 10000
});
    wx.request({
        url: url,
        method: 'POST',
        data:data,
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            callBack(res.data);
            wx.hideToast();
        },
        fail: function (error) {
            wx.showToast({
                title: '获取信息失败',
                icon: 'loading',
                duration: 1000
            });
            console.log(error);
        }
    });
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

//需要查找原始对象,id,对应的选项索引值
function getIndexValue(orgValue, collect) {
    if (orgValue) {
        var index = 0;
        for (var item of collect) {
            if (item.Id == orgValue) {
                return index;
            }
            index++;
        }

        //var index = lodash.findIndex(collect, [id = orgValue]);

        //return index;
    } else {
        return -1;
    }
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        //+ " " + date.getHours() + seperator2 + date.getMinutes()
        //+ seperator2 + date.getSeconds();
    return currentdate;
}

function getNowFormatTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getHours() + seperator2 + date.getMinutes();
        
    return currentdate;
}

function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数  
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

/** 
 * 获取下一个月 
 * 
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
 */
function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
} 

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  httpPost: httpPost,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  getNowFormatDate: getNowFormatDate,
  app: app,
  getIndexValue: getIndexValue,
  getPreMonth: getPreMonth,
  getNowFormatTime: getNowFormatTime
}