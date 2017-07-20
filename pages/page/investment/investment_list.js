var common = require('../../../common/common.js');
var api = require('../../../common/api.js');

// pages/page/investment/investment_list.js
Page({
  onLoad : function(options){
    var that = this;
    common.showLoading("请稍等...")
    common.request(api.interface.getInvestmentList.url, {
      page : '',
      limit : ''
    }, function (res) {
      common.resCallback(res, that, function () {
        console.log("我请求回来的！！！"+JSON.stringify(res));
        var list = res.result.data;
        list.map(function(item){
          item.add_time = common.formatTime(item.add_time);
          return item;
        });
        that.setData({
          len : list.length,
          list: list
        });
        wx.hideLoading()
      });
    })    
  },
  data:{

  },
  goDetails : function(event){
    var thisId = event;
    console.log("我拿到了ID：" + JSON.stringify(thisId));
    // wx.navigateTo({
    //   url: 'investment_details?thisId=' + thisId
    // })    
  }
})