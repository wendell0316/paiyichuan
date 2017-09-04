var app = getApp();
Page({
  date: {
    userName:'',
    userNo:'',
    mobileNumble:''
  },
  onLoad:function(){
    var that=this;
    var sessionId = app.data.session;
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/system/account/getUserInfo',
      method:'POST',
      data:{
        sessionId:sessionId,
      },
      success:function(res){
        that.setData({
          userName:res.data.contents.userName,
          userNo:res.data.contents.userNo,
          mobileNumber:res.data.contents.mobileNumber
        })
      }
      
    })
  },
  logout:function(){
    var that=this;
    var sessionId = app.data.session;
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success:function(res){
        if(res.confirm){
          wx.clearStorage();
          wx.request({
            url: 'https://www.inteliagpf.cn/api/1.0/ll/system/account/logout',
            data: {
              sessionId: sessionId
            },
            header: {},
            method: 'POST',
            dataType: '',
            success: function (res) {
              console.log(res.data.message)
              wx.redirectTo({
                url: '../login/login',
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
        else{
          console.log('用户点击取消')
        }
      }
    })
  }
  
})