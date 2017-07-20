var common = require('../../../common/common.js');

Page({
  data: {
    title : "",

  },
  onLoad : function(options){
    console.log("跳转过来的参数：" + options.type);
    var that = this;
    switch (options.type)
    {
      case "register" : 
        that.setData({
          title: "注册成功",
          index: "../index/index",
          next: "../login/login"
        });
        break;   
      case "modify":  
        that.setData({
          title: "操作成功",
          index: "../index/index",
          next: "../login/login"          
        });  
        break;   
      case "staffModify" : 
        that.setData({
          title: "修改密码成功",
          index: "../../page/affair/choose",
          next: "../../page/affair/login"              
        });  
        break;    
      case "submitAudit" :
        that.setData({
          title: "资料已提交审核，请注意查收短信通知",
          index: "../../page/affair/choose",
          next: "../../page/affair/login"    
        });  
       break;                    
    }

    // if(options.type == "register"){
    //     this.setData({
    //         title : "注册成功"
    //     });
    // }else if(options.type == "modify"){
    //     this.setData({
    //         title : "操作成功"
    //     });      
    // }
  },
  goIndex : function(){
      common.redirect(this.data.index);
  },
  goLogin : function(){
    common.redirect(this.data.next);
  }
})
