var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]

// pages/uploadReport/uploadReport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reportType: ['血常规', '尿常规', '泌尿系统彩超', '尿蛋白定量检查', '生化', '肾活检', '甲状旁腺激素(PTH)', '铁代谢', '其他'],
        reportTypeIndex: -1,
        reportDate: '2017-03-05',
        count: [1, 2, 3],
        countIndex: 2,
        imageList: [],
    },
    bindReportTypeChange: function (e) {
        this.setData({
            reportTypeIndex: e.detail.value
        })
    },
    chooseImage: function () {
        var that = this
        wx.chooseImage({
            sourceType: sourceType[this.data.sourceTypeIndex],
            sizeType: sizeType[this.data.sizeTypeIndex],
            count: 2,
            success: function (res) {
                console.log(res)
                that.setData({
                    imageList: res.tempFilePaths
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //�·�
                "d+": this.getDate(), //��
                "h+": this.getHours(), //Сʱ
                "m+": this.getMinutes(), //��
                "s+": this.getSeconds(), //��
                "q+": Math.floor((this.getMonth() + 3) / 3), //����
                "S": this.getMilliseconds() //����
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
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