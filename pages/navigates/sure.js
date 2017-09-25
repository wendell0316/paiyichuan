// sure.js
var app=getApp();
var date='';
var userName=''
var userNo=''
var landName =''
var landSid=''
var lands=[]
var baseName =''
var baseSid =''
var varietyName =''
var varietyCode =''
var workName =''
var workNo =''
var userName=''
var index = 0;
var allPic = false;
var photoInfSid = [];
var photoAddress = [];

var imgFilePaths=[]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseName:'',
    landName:'',
    varietyName:'',
    workName:'',
    userName:'',
    userNo:'',
    workDate:'',
    src: '',
    allPic: '',
    display: 'none',
    display2: 'block',
    photoAddress: '',
    tempFilePaths:'',
    height:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(JSON.parse(options.imgFilePaths));
    userName=options.userName;
    userNo=options.userNo;
    landName=options.landName;
    landSid=options.landSid;
    baseName=options.baseName;
    baseSid=options.baseSid;
    varietyName=options.varietyName;
    varietyCode=options.varietyCode;
    workName=options.workName;
    workNo=options.workNo;
    imgFilePaths = app.data.imgFilePaths
    date = Date.parse(new Date())/1000;
    var d = new Date(parseInt(date) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    console.log(date)
    var workDate = d.substring(0, d.length - 8);
    console.log(imgFilePaths)
    var that=this
    this.setData({
      baseName:baseName,
      landName:landName,
      varietyName:varietyName,
      workName:workName,
      userName:userName,
      userNo:userNo,
      workDate: workDate.replace(/\//g, '-'),
      imgFilePaths:imgFilePaths
    }),
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      },
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var workDate=e.detail.value;
    var str = workDate.replace(/-/g, '/')
    date = Date.parse(new Date(str))/1000;
    console.log(date)
    this.setData({
      workDate: e.detail.value
    })
  },
  addFarmWork:function(){
    var that = this;
    var sessionId=app.data.session;
    var companySid=app.data.companySid;
    var land=[];
    
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/land/getLands',
      data: {
        sessionId:sessionId,
        companySid:companySid,
        number:100000,
        page:1,
        baseSid:-1,

      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function(res) {
        lands=res.data.contents.list.map(function(value){return value.landNo})
        land = res.data.contents.list.map(function (value) { return value.landSid })
        for(var i=0;i<land.length;i++){
          if(land[i]==landSid){
            index=i;
            console.log(index)
          }
        }
        var landNo=lands[index];
        
        console.log(sessionId);
        
        console.log(landNo);
        console.log(companySid);
        
        console.log(landSid);
        console.log(baseSid);
        console.log(varietyCode),
        console.log(varietyName),
        console.log(workNo),
        console.log(workName),
          console.log(date),
          console.log(userNo),
          console.log(userName),
          console.log(userNo),
          console.log(userName),
       
        wx.request({
          url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/farmwork/addFarmwork',
          data: {
            sessionId:sessionId,
            landNo:landNo,
            companySid:companySid,
            landSid:landSid,
            baseSid:baseSid,
            farmWorkVarietyCode:varietyCode,
            farmWorkVarietyName:varietyName,
            farmWorkOperateCode:workNo,
            farmWorkOperateName:workName,
            executeDatetime:date,
            executorWorkno:userNo,
            executorName:userName,
            updateWriterName:userName,
            updateWriterNo:userNo,
            note:'无',
          },
          header: {},
          method: 'POST',
          dataType: '',
          success: function(res) {
            console.log(res.data.message)
            
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            wx.reLaunch({
              url: '../index/index',
            })
          },
          fail: function(res) {
            console.log("失败！")
            wx.showToast({
              title: '添加失败',
              icon: 'warn',
              duration: 2000
            })
          },
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
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
        var tempFilePaths = res.tempFilePaths
        var sessionId = app.data.session;
        var companySid = app.data.companySid;
        console.log(tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        }),
          wx.uploadFile({

            url: 'https://www.inteliagpf.cn/api/1.0/ll/system/photo/uploadPhotoByParams',
            method: 'POST',
            formData: {
              'sessionId': sessionId,
              'companySid': companySid,
              'farmWorkSid': farmWorkSid,
              'updateWriterNo': writeNo,
              'updateWriterName': writeName,
              'type': 'farmWork',
              'note': '测试',


            },
            header: {

            },
            filePath: tempFilePaths[0],
            name: 'file',

            success: function (res) {
              var data = res.data
              console.log(res.data)
              wx.request({
                url: 'https://www.inteliagpf.cn/api/1.0/ll/system/photo/getPhotoByParams',
                data: {
                  sessionId: sessionId,
                  companySid: companySid,
                  farmWorkSid: farmWorkSid,
                  type: 'farmWork'
                },
                header: {},
                method: 'POST',
                dataType: '',
                success: function (res) {
                  wx.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                  })
                  src = res.data.contents;
                  photoAddress = src.map(function (value) { return value.photoAddress })
                  photoInfSid = src.map(function (value) { return value.photoInfSid })
                  console.log(res.data.message)
                  console.log(src)
                  _this.setData({
                    src: src,
                    photoAddress: photoAddress
                  })
                },
                fail: function (res) {
                  wx.showToast({
                    title: '上传成功',
                    icon: 'warn',
                    duration: 2000
                  })
                },
                complete: function (res) { },
              })
            }
          })

      }

    })
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