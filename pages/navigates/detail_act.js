// detail_act.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base:'',
    land:'',
    variety:'',
    operateName:'',
    worker:'',
    workerId:'',
    workDate:'',
    farmWorkSid:'',
    writerName:'',
    writerNo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var base=options.base;
    var land=options.land;
    var variety=options.variety;
    var operateName=options.operateName;
    var worker=options.worker;
    var workerId=options.workerId;
    var baseSid=options.baseSid;
    var operateCode = options.operateCode;
    var farmWorkSid = options.farmWorkSid;
    var landSid=options.landSid;
    var writerName=options.writerName;
    var writerNo=options.writerNo;
    var varietyCode=options.varietyCode;
    this.setData({
      base:options.base,
      land:options.land,
      variety:options.variety,
      operateName:options.operateName,
      worker:options.worker,
      workerId:options.workerId,
      workDate:options.workDate,
      farmWorkSid: farmWorkSid,
      writerName: writerName,
      writerNo: writerNo
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