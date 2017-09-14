// edit_inputs.js
var app = getApp();
var index=0;
var index1=0;
var index2=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputs_array: ['农家肥', '2', '3', '4'],
    index: '',
    use_quantity_unit: ['斤', '亩'],
    index1: 0,
    input:'',
    input1:'',
    inputsName: ''
  },
  bindPickerChange: function(e) {
    console.log('投入品名称发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function(e) {
    console.log('使用量单位发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindinputChange:function(){
    console.log('使用量输入改变，携带值为', e.detail.value)
    this.setData({
      input: e.detail.value
    })
  },
  bindinputChange1: function () {
    console.log('使用量输入改变，携带值为', e.detail.value)
    this.setData({
      input1 : e.detail.value
    })
  },
  submit:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inputsName = ['茶力士微量元素水溶肥', '石硫合剂', '波尔多液', '复合肥', '多菌灵', '吡虫啉', '保倍硼', '保倍钙', '联苯菊酯', '嘧菌酯', '硫酸钾', '抑菌唑', '生物有机肥']

    var sessionId=app.data.session;
    var farmWorkSid=options.farmWorkSid;
    var chemicalName=options.chemicalName;
    var chemicalVariety = options.chemicalVariety;
    var effectiveConstituent = options.effectiveConstituent;
    var fun=options.fun;
    var producerNo = options.producerNo;
    var producerName = options.producerName;
    var safeInterval = options.safeInterval;
    var usageAmountDenominator = options.usageAmountDenominator;
    var usageUnit = options.usageUnit
    for(i=0;i<inputsName.length;i++){
      if(inputsName[i]==chemicalName){
        index=i
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})