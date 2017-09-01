Page({
    onTap: function (event) {
        // wx.navigateTo({
        //     url:"../posts/post"
        // });
        
        wx.switchTab({
            url: "../posts/post"
        });
        
    },
    onRigisterTap:function(event){
      wx.navigateTo({
        url: "/pages/register/register"
      })
    },
    onChartTap:function(event){
        wx.navigateTo({
          url: "/pages/chart/chart"
        })
    },
    onUploadReportTap: function (event) {
        wx.navigateTo({
            url: "/pages/uploadReport/uploadReport"
        })
    },
    onInfolistTap: function (event) {
      wx.navigateTo({
        url: "/pages/infolist/infolist"
      })
    }

})