var common = require('../../../common/common.js');
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    common.getScreen(that);
  },
  /**
   * 页面跳转
   */
  navigate : function(e){
    var id = e.currentTarget.id;
    if (id == 'login'){
      common.redirect(id);
    } else if (id == 'apply'){
      common.redirect('entry/index');
    }
    
  }
})