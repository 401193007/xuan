var common = require('../../../common/common.js');
var api = require('../../../common/api.js');
// pages/page/investment/investment_details.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("我请求详细页的ID："+options.thisId);

    var that = this;
    common.showLoading("请稍等...")
    common.request(api.interface.getInvestInfo.url, {
      invest_id: options.thisId
    }, function (res) {
      common.resCallback(res, that, function () {
        console.log("我请求回来的！！！" + JSON.stringify(res));
        var result = res.result;
        result.add_time = common.formatTime(result.add_time);
        result.bl_link = 'https://api.xinyiqiguan.test.olaoban.com' + result.bl_link;
        that.setData({
          result: res.result
        });
        wx.hideLoading()
      });
    }) 

  },
  return: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})