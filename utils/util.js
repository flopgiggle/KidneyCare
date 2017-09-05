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
        duration: 1000
    });
    wx.request({
        url: url,
        method: 'GET',
        header: {
            "Content-Type": "json"
        },
        success: function(res) {
            callBack(res.data);

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

function httpPost(url,data,callBack) {
    wx.showToast({
        title: '',
        icon: 'loading',
        duration: 1000
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

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  httpPost: httpPost,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}