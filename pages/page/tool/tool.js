Page({
  data: {
    grids: [
      {
        id: "sign",
        text : "签到",
        url : "../affair/sign/sign",
        cls: "icon-iconfontqiandao"
      },
      {
        id: "leave",
        text: "请假",
        url: "../affair/leave/leave",
        cls: "icon-qingjia"
      },       
      {
        id: "repassword",
        text: "修改密码",
        url: "../../panel/forget/forget",
        cls: "icon-xiugaimima"
      },
      {
        id: "expect",
        text: "敬请期待",
        url: "",
        cls: "icon-gengduo"
      }        
    ]
  },
  turnTo : function(e){
    console.log(e);
    var target = e.currentTarget;
    var id = target.id;
    var url = target.dataset.url;
    if (id == "sign" && !wx.getStorageSync('STAFF_LOGIN')){
      wx.navigateTo({ url: "../affair/login?param=sign" });
      return;
    }

    if (id == "leave" && !wx.getStorageSync('STAFF_LOGIN')) {
      wx.navigateTo({ url: "../affair/login?param=leave" });
      return;
    }    

    wx.navigateTo({url : url});
  }
});