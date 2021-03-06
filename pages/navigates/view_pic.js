// view_pic.js
var app=getApp()
var src=[]
var farmWorkSid=''
var writeName=''
var writeNo;
var allPic=false;
var photoInfSid=[];
var photoAddress=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    farmWorkSid:'',
    src:'',
    allPic:'',
    display:'none',
    display2:'block',
    height:'',
    photoAddress:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    farmWorkSid=options.farmWorkSid;
    writeName=options.writeName;
    writeNo=options.writeNo
    var that=this;
    var sessionId=app.data.session
    var companySid=app.data.companySid
    console.log(farmWorkSid)
    console.log(sessionId)
    console.log(companySid)
    this.setData({
      farmWorkSid:farmWorkSid
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height:res.windowHeight
        })
      },
    }),
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/system/photo/getPhotoByParams',
      data: {
        sessionId:sessionId,
        companySid:companySid,
        farmWorkSid:farmWorkSid,
        type:'farmWork'
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function(res) {
        src=res.data.contents
        photoInfSid = src.map(function (value) { return value.photoInfSid })
        photoAddress = src.map(function (value) { return value.photoAddress })
        console.log(res.data.message)
        console.log(src)
        that.setData({
          src:src,
          photoAddress:photoAddress
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
        var companySid=app.data.companySid; 
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
                    icon:'success',
                    duration:2000
                  })
                  src = res.data.contents;
                  photoAddress = src.map(function (value) { return value.photoAddress })
                  photoInfSid=src.map(function(value){ return value.photoInfSid})
                  console.log(res.data.message)
                  console.log(src)
                  _this.setData({
                    src: src,
                    photoAddress:photoAddress
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
  }  ,
  bigPic:function(){
    allPic=!allPic;
    this.setData({
      allPic:allPic
    })
    if(allPic){
      this.setData({
        display:'block',
        display2:'none'

      })
    }
    else{
      this.setData({
        display:'none',
        display:'block'
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
  delete:function(e){
    var id=e.currentTarget.dataset.id;
    var sessionId = app.data.session;
    var that=this
    console.log(id)
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗',
      success:function(res){
        if(res.confirm){
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
             
              
              photoAddress.splice(id,1);
              console.log(photoAddress)
              that.setData({
                photoAddress:photoAddress
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              var pages = getCurrentPages();
              var currPage = pages[pages.length - 1];  //当前页面
              var prevPage = pages[pages.length - 2]; //上一个页面

              //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
              prevPage.setData({
                photoAddress: photoAddress
              })

             
            },
            
          })
        }
        else if(res.cancel){
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