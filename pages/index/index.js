 var app=getApp();
 var farmWorkid = [];
var photo = [];
 var allPic = false;
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
    src:'',
    workdate:'',
    allPic: '',
    display: 'none',
    display2: 'block',
  },
  onShow:function(){
   var sessionId=app.data.session;
   var companySid=app.data.companySid;
   console.log(sessionId);
   this.setData({
     session:sessionId
   })
  },
  onLoad:function(options){
    var sessionId = app.data.session;
    var companySid = app.data.companySid;
    var executeDatetime=[]
    var that =this;
    photo=[]
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
        executeDatetime = list.map(function (value) { return value.executeDatetime})
        for (var i=0 ;i<farmWorkid.length;i++) {
          that.getPhoto(farmWorkid[i])
        }
        for(var j=0;j<executeDatetime.length;j++){
          executeDatetime[j] = new Date(executeDatetime[j] * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
          executeDatetime[j] = executeDatetime[j].substring(0, executeDatetime[j].length - 8);
        }
        console.log(farmWorkid)
        that.setData({
          list:list,
          workdate:executeDatetime
        })
        

        
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    
    
  },
  getPhoto:function(farmWorkSid){
    var that=this;
    
    var sessionId = app.data.session;
    var companySid = app.data.companySid;
    console.log('farmWorkSid:',farmWorkid)
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/system/photo/getPhotoByParams',
      data: {
        sessionId: sessionId,
        companySid: companySid,
        farmWorkSid: farmWorkSid,
        type: 'farmWork'

      },
      method: 'POST',
      success: function (res) {
       
        var add = [];
        console.log("farmWorkSid[i]:",farmWorkid)
        console.log(farmWorkSid)
        add = res.data.contents.map(function (value) { return value.photoAddress })
        console.log(add)
        photo = photo.concat(add.shift());
        app.data.photourl=photo
        console.log(add.shift())
        var photourl=app.data.photourl
        console.log(photo)
        photo.push()
        that.setData({
          src: photourl
        })
      }
    })
  },
  addAction:function(){
    wx.navigateTo({
      url: '../navigates/add_act',
    })
  }
})
