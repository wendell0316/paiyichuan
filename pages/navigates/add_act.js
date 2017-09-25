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
var allPic = false;
var photoInfSid = [];
var photoAddress = [];
var tempFilePaths=[];
var imgFilePaths=[]
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
    allPic: '',
    display: 'none',
    display2: 'block',
    photoAddress: '',
    tempFilePaths:'',
    imgFilePaths:'',
    height:''
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
    }),
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            height: res.windowHeight
          })
        },
      }),
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
      landSid:landSid[index1]
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
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseImage('camera')
          }
        }
      }
    })
  },
  chooseImage: function (type) {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        if(tempFilePaths.length<2){
          tempFilePaths.unshift(res.tempFilePaths)
          
          // imgFilePaths = JSON.stringify(imgFilePaths)
          app.data.imgFilePaths=tempFilePaths
          console.log(imgFilePaths)
          _this.setData({
            imgFilePaths:imgFilePaths
          })
        }
        else{
           tempFilePaths=[tempFilePaths[0],tempFilePaths[1]]
          wx.showModal({
            title: '提示',
            content: '创建农事活动时，仅可上传两张图片！',
            success: function(res) {

            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
        var sessionId = app.data.session;
        var companySid = app.data.companySid;
        
        console.log("temp:",tempFilePaths)
        // console.log(imgFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: tempFilePaths
        })
          

      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bigPic: function () {
    allPic = !allPic;
    this.setData({
      allPic: allPic
    })
    if (allPic) {
      this.setData({
        display: 'block',
        display2: 'none'

      })
    }
    else {
      this.setData({
        display: 'none',
        display2: 'block'
      })
    }
  }
  ,
  littlePic: function () {
    allPic = !allPic;
    this.setData({
      allPic: allPic
    })
    if (!allPic) {
      this.setData({
        display: 'none',
        display2: 'block'

      })
    }
    else {
      this.setData({
        display: 'block',
        display: 'none'
      })
    }
  }
  ,
  delete: function (e) {
    var id = e.currentTarget.dataset.id;
    var sessionId = app.data.session;
    var that = this
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗',
      
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          tempFilePaths.splice(id, 1);
          console.log(photoAddress)
          wx.request({
            url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/base/deleteBasePhotosBySid',
            data: {
              sessionId: sessionId,
              photoInfSid: photoInfSid[id]
            },
            header: {},
            method: 'POST',
            dataType: '',
            success: function (res) {
              console.log(res.data.message)


              photoAddress.splice(id, 1);
              console.log(photoAddress)
              that.setData({
                photoAddress: photoAddress
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            },

          })
        }
        else if (res.cancel) {
          console.log('点击取消')
        }

      }
    })
  },
  
})