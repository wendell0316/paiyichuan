// add.js
var app=getApp();
var bases=[];
var baseSid=[];
var lands=[];
var landSid=[]
var varietys=[];
var varietyCode=[]
var works=[];
var worksNo=[];
var varietyCode=[];
var userName='';
var userNo=''
var index0=0
var index1 = 0
var index2 = 0
var index3 = 0
Page({
  data:{
    base:'',
    land:'',
    variety:'',
    work:'',
    index0:'0',
    index1:'0',
    index2:'0',
    index3:'0',
    baseName:'',
    baseSid:'',
    landName:'',
    landSid:'',
    userName:'',
    userId:'',
    workName:'',
    workNo:'',
    varietyName:'',
    varietyCode:'',
  },
  onLoad:function(){
    var that=this
    var sessionId=app.data.session
    var companySid=app.data.companySid
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/system/account/getUserInfo',
      data:{
        sessionId:sessionId
      },
      method:'POST',
      success:function(res){
        userName=res.data.contents.userName;
        userNo = res.data.contents.userNo;
        that.setData({
          userName:userName,
          userNo:userNo
        })

      }
    })
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/base/getBases',
      data: {
        sessionId:sessionId,
        companySid:companySid,
        page:'1',
        number:10000
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function(res) {
        baseSid=res.data.contents.list.map(function(value){return value.baseSid})
        bases=res.data.contents.list.map(function(value){return value.baseName})

        app.data.base=bases;
        that.setData({
          base:bases,
          baseName: bases[index0],
          baseSid: baseSid[index0]
        }),
        wx.request({
          url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/land/getLands',
          data: {
            sessionId: sessionId,
            companySid: companySid,
            page: '1',
            baseSid:'-1',
            number: 10000
          },
          header: {},
          method: 'POST',
          dataType: '',
          success: function (res) {
            landSid=res.data.contents.list.map(function(value){return value.landSid})
            lands = res.data.contents.list.map(function (value) { return value.landName })
            app.data.land=lands
            that.setData({
              land: lands,
              landName: lands[index1],
              landSid: landSid[index1]
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
            app.data.variety=varietys
            app.data.varietyCode=varietyCode
            that.setData({
              variety: varietys,
              varietyName: varietys[index2],
              varietyCode: varietyCode[index2]
            })
            wx.request({
              url: 'https://www.inteliagpf.cn/api/1.0/ll/dic/getFarmworkoperate',
              data: {
                sessionId: sessionId,
                farmworkvarietycode: varietyCode[0]
              },
              header: {},
              method: 'POST',
              dataType: '',
              success: function (res) {
                works = res.data.contents.map(function (value) { return value.farmworkoperatename })
                worksNo = res.data.contents.map(function (value) { return value.farmworkoperatecode})
                console.log(works)
                that.setData({
                  work: works,
                  workName: works[index3],
                  workNo: worksNo[index3]

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
    
  },
  onReady:function(){

  },
  onShow:function(){
    
  },
  bindPickerChange: function (e) {
    console.log('投入品名称发送选择改变，携带值为', e.detail.value)
    index0=e.detail.value
    this.setData({
      index0: e.detail.value,
      baseName:bases[index0],
      baseNo:baseSid[index0]
    })
  },
  bindPickerChange1: function (e) {
    console.log('投入品名称发送选择改变，携带值为', e.detail.value)
    index1 = e.detail.value
    this.setData({
      index1: e.detail.value,
      landName:lands[index1],
      landNo:landSid[index1]
    })
  },
  bindPickerChange2: function (e) {
    var that=this
    var sessionId=app.data.session
    console.log('投入品名称发送选择改变，携带值为', e.detail.value)
    index2 = e.detail.value
    this.setData({
      index2: e.detail.value,
      varietyName:varietys[index2],
      varietyCode:varietyCode[index2]
    })
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/dic/getFarmworkoperate',
      data: {
        sessionId:sessionId,
        farmworkvarietycode:varietyCode[index2]
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function(res) {
        works = res.data.contents.map(function (value) { return value.farmworkoperatename})
        worksNo = res.data.contents.map(function (value) { return value.farmworkoperatecode})
        console.log(works)
        that.setData({
          work:works,
          workName: works[index3],
          workNo: worksNo[index3]
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindPickerChange3: function (e) {
    console.log('投入品名称发送选择改变，携带值为', e.detail.value)
    index3 = e.detail.value
    this.setData({
      index3: e.detail.value,
      workName: works[index3],
      workNo: worksNo[index3]
    })
  },
  
})