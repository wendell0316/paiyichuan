// inputs_message.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:'',
    chemicalName:'',
    chemicalVariety:'',
    fun:'',
    producerName:'',
    producerNo:'',
    usageAmountDenominator:'',
    usageUnit:'',
    safeInterval:'',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var farmWorkSid=options.farmWorkSid
    var that = this;
    var sessionId=app.data.session;
    var companySid=app.data.companySid;
    var chemicalName=[];
    var chemicalVariety=[];
    var effectiveConstituent=[];
    var fun=[];
    var producerName=[];
    var producerNo;
    var usageAmountDenominator=[]
    var usageUnit=[];
    var safeInterval=[];
    var contents=[]
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/input/getInputs',
      data: {
        sessionId:sessionId,
        farmWorkSid:farmWorkSid
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function(res) {
        contents=res.data.contents;
        console.log(contents)
        chemicalName=res.data.contents.map(function(value){return value.chemicalName});
        chemicalVariety = res.data.contents.map(function (value) { return value.chemicalVariety })
        effectiveConstituent = res.data.contents.map(function (value) { return value.effectiveConsituent })
        fun = res.data.contents.map(function (value) { return value.function })
        producerName = res.data.contents.map(function (value) { return value.producerName })
        producerNo = res.data.contents.map(function (value) { return value.producerNo })
        usageAmountDenominator = res.data.contents.map(function (value) { return value.usageAmountDenominator })
        usageUnit = res.data.contents.map(function (value) { return value.usageUnit })
        safeInterval = res.data.contents.map(function (value) { return value.safeInterval })
        that.setData({
          contents:contents
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
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