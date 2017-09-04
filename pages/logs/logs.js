var app=getApp();

Page({
  data:{
    src: '../../images/more.png',
    sessionId:''
  },
  onShow:function(){
    var session=app.data.session;
    this.setData({
      sessionId:session
    })
  }
})