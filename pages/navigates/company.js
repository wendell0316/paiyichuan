var app=getApp();
Page({
  data: {
    companyAddress:'',
    companyFullName:'',
    companyNo:'',
    companyShortName:'',
    companyPhone:'',
    companyRegisterNo:'',
    companyRegisterDate:'',
    companyIndustry:'',
    companyIndustryCode:'',
    companyZipCode:'',
    companyWebsite:'',
    message:''
  },
  onLoad:function(){
    var that=this;
    var sessionId=app.data.session;
    console.log("hello");
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprise/information/getCompanyExpand',
      method: 'POST',
      data: {
        "sessionId":sessionId ,
        "companySid": "34"
      },
      header: { "Content-Type": "application/json" },
      success: function (res) {
        
        that.setData({
          message:res.data.message,
          companyAddress: res.data.contents.companyAddress,
          companyFullName: res.data.contents.companyFullName,
          companyShortName: res.data.contents.companyShortName,
          companyNo: res.data.contents.companyNo,
          companyPhone: res.data.contents.companyPhone,
          companyRegisterNo: res.data.contents.companyRegisterNo,
          companyRegisterDate: new Date(parseInt(res.data.contents.companyRegisterDate)),
          companyIndustry: res.data.contents.companyIndustry,
          companyIndustryCode: res.data.contents.companyIndustryCode,
          companyZipCode: res.data.contents.companyZipCode,
          companyWebsite: res.data.contents.companyWebsite,

          
        })
        
      }

    })
  }
})