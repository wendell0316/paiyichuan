// edit_act.js
var app = getApp();
var works=[];
var baseSid=[];
var landSid=[];
var landNo=[];
var varietys = [];
var varietyCode = [];
var operateCode=[];
var farmWorkSid='';
var time = '';
var updateWriterName='';
var updateWriterNo='';
var index = 0;
var index1 = 0;
var index3 = 0;

var index2 = 0;
var worker='';
var workerId=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base: '',
    land: '',
    variety: '',
    operateName: '',
    worker: '',
    workerId: '',
    workDate: '',
    index: '',
    index1: '',
    index2: '',
    index3: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bases = [];
    console.log(bases)
    var lands = [];
    worker=options.worker;
    workerId=options.workerId;
    farmWorkSid=options.farmWorkSid;
    updateWriterName = options.writerName;
    updateWriterNo = options.writerNo;
    var base=options.base;
    var land=options.land;
    var variety=options.variety;
    var operateName=options.operateName;
    time=options.workDate
    var d = new Date(parseInt(options.workDate) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    var date=d.substring(0,d.length-8);
    console.log(date)
    console.log(updateWriterName);
    console.log(updateWriterNo)
    console.log(farmWorkSid)
    var that = this;
    var sessionId = app.data.session;
    var companySid = app.data.companySid;
    this.setData({
      worker: options.worker,
      workerId: options.workerId,
      workDate: date,
      farmWorkSid:options.farmWorkSid
    })
   
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/base/getBases',
      data: {
        sessionId: sessionId,
        companySid: companySid,
        page: '1',
        number: 10000
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function (res) {

        bases = res.data.contents.list.map(function (value) { return value.baseName })
        for(var i=0;i<bases.length;i++){
          if(bases[i]==base){
            index=i
          }
        }
        that.setData({
          base: bases,
          index:index
        }),
          wx.request({
            url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/land/getLands',
            data: {
              sessionId: sessionId,
              companySid: companySid,
              page: '1',
              baseSid: '-1',
              number: 10000
            },
            header: {},
            method: 'POST',
            dataType: '',
            success: function (res) {

              lands = res.data.contents.list.map(function (value) { return value.landName })
             
              for (var i = 0; i < lands.length; i++) {
                if (lands[i] == land) {
                  index1 = i
                }
              }
              that.setData({
                land: lands,
                index1:index1
              })


            }
          })

      }
    })
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/trace/getindustryCode',
      data: {
        sessionId: sessionId,
        companySid: companySid
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function (res) {

        var industryCode = res.data.contents.industryCode;
        wx.request({
          url: 'https://www.inteliagpf.cn/api/1.0/ll/dic/getFarmworkvarietys',
          data: {
            sessionId: sessionId,
            industrycode: industryCode
          },
          header: {},
          method: 'POST',
          dataType: '',
          success: function (res) {
            varietys = res.data.contents.map(function (value) { return value.farmworkvarietname })
            varietyCode = res.data.contents.map(function (value) { return value.farmworkvarietycode })
            console.log(varietys)
            console.log(varietyCode)
            for (var i = 0; i < varietys.length; i++) {
              if (varietys[i] == variety) {
                index2 = i
              }
            }
            that.setData({
              variety: varietys,
              index2:index2
            })
            wx.request({
              url: 'https://www.inteliagpf.cn/api/1.0/ll/dic/getFarmworkoperate',
              data: {
                sessionId: sessionId,
                farmworkvarietycode: varietyCode[index2]
              },
              header: {},
              method: 'POST',
              dataType: '',
              success: function (res) {
                works = res.data.contents.map(function (value) { return value.farmworkoperatename })
                operateCode = res.data.contents.map(function (value) { return value.farmworkoperatecode })
                console.log(works)
                for (var i = 0; i < works.length; i++) {
                  if (works[i] == operateName) {
                    index3 = i
                  }
                }
                that.setData({
                  operateName: works,
                  index3:index3
                })
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        })
          ``
      }
    })
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/base/getBases',
      data: {
        sessionId:sessionId,
        companySid:companySid,
        page:1,
        number:10000
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function(res) {
        
        baseSid = res.data.contents.list.map(function (value) { return value.baseSid })
        console.log(baseSid)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/land/getLands',
      data: {
        sessionId: sessionId,
        companySid: companySid,
        page: 1,
        number: 10000,
        baseSid:-1
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function(res) {
        // console.log(res.data.contents.list)
        landSid = res.data.contents.list.map(function (value) { return value.landSid })
        landNo = res.data.contents.list.map(function (value) { return value.landNo })
        console.log(landNo)
        console.log(landSid)
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  bindPickerChange: function (e) {
    console.log('投入品名称发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    index=e.detail.value
  },
  bindPickerChange1: function (e) {
    console.log('投入品名称发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    index1=e.detail.value
  },
  bindPickerChange2: function (e) {
    console.log('投入品名称发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
    var sessionId = app.data.session
    var companySid = app.data.companySid
    var that=this;
    index2=e.detail.value
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/dic/getFarmworkoperate',
      data: {
        sessionId: sessionId,
        farmworkvarietycode: varietyCode[index2]
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function (res) {
        works = res.data.contents.map(function (value) { return value.farmworkoperatename })
        operateCode = res.data.contents.map(function (value) { return value.farmworkoperatecode })
        console.log(works)
        that.setData({
          operateName: works,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindPickerChange3: function (e) {
    console.log('投入品名称发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
    index3=e.detail.value
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      workDate: e.detail.value
    })
  },
  formSubmit:function(e){
    var that=this
    var sessionId=app.data.session;
    var companySid=app.data.companySid;
    
    console.log(e.detail.value)
    if(!e.detail.value.workerId){
      workerId=workerId;
    }
    else{
      workerId=e.detail.value.workerId
    }
   
    console.log(baseSid[index])
    console.log(companySid)
    console.log(sessionId)
    
    console.log(workerId)
    console.log(landSid[index1])
    console.log(landNo[index1])
    console.log(varietyCode[index2]),
    console.log(varietys[index2])
    console.log(updateWriterName)
    console.log(works[index3])
    console.log(farmWorkSid)
    console.log(updateWriterNo)
    console.log(operateCode[index3])
    if (!e.detail.value.worker) {
      worker = worker;
    }
    else {
      worker = e.detail.value.worker
    }
    console.log(worker)
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/farmwork/updateFarmwork',
      data: {
        sessionId: sessionId, 
        companySid:companySid,
        baseSid: baseSid[index],
        landSid: landSid[index1],
        landNo: landNo[index1],
        farmWorkVarietyName: varietys[index2],
        farmWorkVarietyCode: varietyCode[index2],
        farmWorkOperateCode: operateCode[index3],
        farmWorkOperateName: works[index3],
        farmWorkSid: farmWorkSid,
        executorName: worker,
        executorWorkno: workerId,
        executeDatetime: time,
        note: '无',
        updateWriterName: updateWriterName,
        updateWriterNo: updateWriterNo

      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: '',
      success: function(res) {
        console.log(res.data.message)
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