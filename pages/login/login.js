var app=getApp();

Page({

  data: {
    h:app.winHeight,
    msg:'',
    user:'',
    password:''
  },

  onLoad:function(){
    wx.login({
      success: function (res) {
        var code = res.code;
        var name = wx.getStorageSync("name")
        var pwd = wx.getStorageSync("pwd")
        wx.getUserInfo({
          success: function (res) {
            wx.request({

              url: 'https://www.inteliagpf.cn/api/1.0/ll/system/account/login',
              method: "POST",
              data: {
                userNo: name,
                password: pwd
              },
              fail: function (res) {
              },
              success: function (res) {
                console.log(res.data.message)
                var sessionId = res.data.contents.sessionId;
                var companySid = res.data.contents.companySid;
                app.data.session = sessionId;
                app.data.companySid = companySid;

                wx.switchTab({
                  url: '../index/index'
                })
              }
            })
          }
        })
      }
    })
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          h:res.windowHeight
        })
        
      }
     
    })
    var userName = wx.getStorageSync('name');
    var userPassword = wx.getStorageSync('pwd');

    console.log(userName);
    console.log(userPassword);
    if (userName) {
      this.setData({ user: userName });
    }
    if (userPassword) {
      this.setData({ password: userPassword });
    }
  },
  onLaunch: function () {
   
  },
  formBindSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/system/account/login',
      method: 'POST',
      data: {
        userNo: e.detail.value.user,
        password: e.detail.value.password
      },

      success: function (res) {
        console.log("请求成功！");
        var sessionId=res.data.contents.sessionId;
        var companySid=res.data.contents.companySid;
        app.data.session=sessionId;
        app.data.companySid=companySid;
        console.log(res.data.contents.sessionId);
        that.setData({
          msg: res.data.message
        })
        console.log(res.data)
        if (res.data.message == '登录成功') {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          wx.setStorage({
            key: 'name',
            data: e.detail.value.user,
          })
          
          wx.setStorage({
            key: 'pwd',
            data: e.detail.value.password,
          })
         wx.switchTab({
           url: '../index/index'
         })
        }
        else{
          wx.showModal({
            title: '提示',
            content: '对不起，您暂时没有权限',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        }
      }

    })
  },
  listenerInput: function () {
    
   
    
  },
  


  onShow: function () {
    
  },

  onLaunch:function(){
    wx.login({
      success: function (res) {
        var code = res.code;
        var name = wx.getStorageSync("name")
        var pwd = wx.getStorageSync("pwd")
        wx.getUserInfo({
          success: function (res) {
            wx.request({

              url: 'https://www.inteliagpf.cn/api/1.0/ll/system/account/login',
              method: "POST",
              data: {
                userNo: name,
                password: pwd
              },
              fail: function (res) {
              },
              success: function (res) {
                console.log(res.data.message)


                wx.switchTab({
                  url: 'pages/index/index'
                })
              }
            })
          }
        })
      }
    })
  },
  onHide: function () {
    
  },

  onUnload: function () {
    
  },


  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },


  onShareAppMessage: function () {
    
  }
})