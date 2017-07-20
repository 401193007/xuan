var common = require('../../../common/common.js');
var api = require('../../../common/api.js');


//获取应用实例
var app = getApp()
Page({
  data: {
    background: [      
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
    circular : true,
    nav : [
      {
        id: "affair",
        text : "人事",
        desc : "文字描述文字描述",
        src: "../affair/choose",
      },
      {
        id: "investment",
        text : "招商",
        desc: "文字描述文字描述",
        src: "../investment/investment",
      },
      // {
      //   text : "财务",
      //   desc: "文字描述文字描述",
      //   src: "",
      // },
      // {
      //   text : "法律咨询",
      //   desc : "文字描述文字描述",
      //   src: "",
      // }                  
    ]
  },
  goAffair : function(e){
    var url = e.currentTarget.dataset.src;    

    if (wx.getStorageSync('STAFF_LOGIN')) {
      common.navigate('../affair/index/index');
    } else {
      common.navigate('../affair/choose');
    }    
  },  
  goInvestment: function (e) {
      var url = e.currentTarget.dataset.src;
      var isLogin = wx.getStorageSync('ISLOGIN');

      if (isLogin &&  isLogin !=null) {
        common.navigate(url);     
      }else{
        common.navigate('../../panel/login/login');    
      }
  }  

})
