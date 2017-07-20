var common = require('../../../common/common.js');
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    common.getScreen(that);
  }
})