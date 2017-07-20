var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');
Page({
  onLoad: function () {
    var that = this;

    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      that.setData({
        staffName: result.name
      });
    });
    //初始化table
    common.request(api.interface.medicalreportrecord.url, {}, function (res) {
      console.log(JSON.stringify(res));
      that.setData({
        content_list: res.result
      })      

    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    navHide: true,
    dropdownHide: true,
    showModal: false,
    list: data.nav.navList,

    showTopTips: false,
    errorMsg: "",

    STAFF_MOBILE: wx.getStorageSync('STAFF_MOBILE'),

    tabs: ["修改信息", "修改密码"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  navToggle: function () {
    data.navToggle(this);
  },
  dropdownToggle: function () {
    data.dropdownToggle(this);
  },
  itemToggle: function (e) {
    var id = e.currentTarget.id,
      list = this.data.list;

    data.itemToggle(id, list, this);
  },
  logout: function () {
    var that = this;
    data.logout(common, api.interface.logout.url, that);
  }
})