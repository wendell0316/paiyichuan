// edit_inputs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputs_array: ['农家肥', '2', '3', '4'],
    index: 0,
    use_quantity_unit: ['斤', '亩'],
    index1: 0,
    input:'',
    input1:''
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