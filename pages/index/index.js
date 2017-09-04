 var app=getApp();

Page({
  data: {
    icon:'../../images/more.png',
   
    content:'',
    result: [],
    value:'',
    companyAddress:'',
    session: '',
    tempFilePaths:'',
    list:'',
    src:''
  },
  onShow:function(){
   var sessionId=app.data.session;
   var companySid=app.data.companySid;
   console.log(sessionId);
   this.setData({
     session:sessionId
   })
  },
  onLoad:function(){
    var sessionId = app.data.session;
    var companySid = app.data.companySid;
    var farmWorkid=[];
    var photo = [];
    var that =this;
    var list=[];
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/farmwork/getFarmworks',
      data: {
        sessionId: sessionId,
        companySid: companySid,
        landSid: '-1',
        number: '100000',
        page: '1',
        baseSid:'-1'
      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function(res) {
        console.log(res.data.contents.list)
        list=res.data.contents.list;
        farmWorkid=list.map(function(value){return value.farmWorkSid})
        console.log(farmWorkid)
        that.setData({
          list:list
        })
        for (var i = 0; i < farmWorkid.length; i++) {
          console.log("123")
          wx.request({
            url: 'https://www.inteliagpf.cn/api/1.0/ll/system/photo/getPhotoByParams',
            data: {
              sessionId: sessionId,
              companySid: companySid,
              farmWorkSid: farmWorkid[i],
              type: 'farmWork'

            },
            method: 'POST',
            success: function (res) {
              
              var add=[];
              add = res.data.contents.map(function (value) { return value.photoAddress })
              photo = photo.concat(add.shift());
              //console.log(add.shift())

              console.log(photo)
              photo.push()
              that.setData({
                src:photo
              })
            }
          })
        } 
        
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    
  },
  addAction:function(){
    wx.navigateTo({
      url: '../navigates/add_act',
    })
  },
  chooseImageTap:function(){
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
          console.log(tempFilePaths)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          _this.setData({
            tempFilePaths: res.tempFilePaths
          }),
          wx.uploadFile({
            
            url: 'https://www.inteliagpf.cn/api/1.0/ll/system/photo/uploadPhotoByParams', 
            method:'POST',
            formData:{
              'sessionId': sessionId,
              'companySid':'34',
              'farmWorkSid':'494',
              'updateWriterNo':'80000005@1.com',
              'updateWriterName': '测试用户5',
              'type':'farmWork',
              'note':'测试',
              

            },
            header:{

            },
            filePath: tempFilePaths[0],
            name:'file' ,
            
            success: function (res) {
              var data = res.data
              console.log(res.data)
              //do something  
            }
          })

        }
       
      })
  }  
  
  
})
