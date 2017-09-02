// pages/register/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sex: ['男', '女'],
        docter: ['张医生', '王医生', '李医生', '赵医生'],
        nurse: ['张护士', '王护士', '李护士', '赵护士'],
        sex: ['男', '女'],
        sexIndex: -1,
        docterIndex: -1,
        nurseIndex: -1,
        regDate: '2017-01-01',
        multiArray: [['四川省', '云南省'], ['成都市', '绵阳市', '德阳市', '攀枝花市', '宜宾市'], ['四川大学华西医院', '省医院']],
        multiIndex: [0, 0, 0],
        reportDate: '2017-03-05',
        bloodPressureTime: '00:00',
    },
    bindDocterChange: function (e) {
        this.setData({
            docterIndex: e.detail.value
        })
    },
    bindNurseChange: function (e) {
        this.setData({
            nurseIndex: e.detail.value
        })
    },
    bindSexChange: function (e) {
        this.setData({
            sexIndex: e.detail.value
        })
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            regDate: e.detail.value
        })
    },
    bindBloodPressureTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            bloodPressureTime: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['成都市', '绵阳市', '德阳市', '攀枝花市', '宜宾市'];
                        data.multiArray[2] = ['四川大学华西医院', '省医院'];
                        break;
                    case 1:
                        data.multiArray[1] = ['昆明市', '玉溪市'];
                        data.multiArray[2] = ['昆明市医院', '昆明儿童医院', '昆明中心医院'];
                        break;
                }
                data.multiIndex[1] = 0;
                data.multiIndex[2] = 0;
                break;
            case 1:
                switch (data.multiIndex[0]) {
                    case 0:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['四川大学华西医院', '省医院'];
                                break;
                            case 1:
                                data.multiArray[2] = ['绵阳医院'];
                                break;
                            case 2:
                                data.multiArray[2] = ['德阳医院', '德阳医院1'];
                                break;
                            case 3:
                                data.multiArray[2] = ['攀枝花医院', '攀枝花医院2', '攀枝花医院3'];
                                break;
                            case 4:
                                data.multiArray[2] = ['宜宾医院1', '宜宾医院2', '宜宾医院3', '宜宾医院4'];
                                break;
                        }
                        break;
                    case 1:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['昆明市医院', '昆明儿童医院', '昆明中心医院'];
                                break;
                            case 1:
                                data.multiArray[2] = ['玉溪市医院', '玉溪儿童医院'];
                                break;
                        }
                        break;
                }
                data.multiIndex[2] = 0;
                console.log(data.multiIndex);
                break;
        }
        this.setData(data);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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