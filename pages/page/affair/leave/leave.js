var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');

function getActual_time(time){
  var actual_time = parseInt(time/(60*60))
  return actual_time;
}

Page({
  onLoad: function () {
    var that = this;

    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      common.clearStorage(result.status, ["STAFF_IDNUMBER", "STAFF_PASSWORD", "STAFF_LOGIN"], function () {
        common.redirect("../login");
      });      
      that.setData({
        staffName: result.name,
      });
    });

    //初始化table
    common.request(api.interface.leavelist.url, {}, function (res) {
      var list = res.result.data;
      console.log(JSON.stringify(list));
      for (var i = 0; i < list.length; i++) {
        list[i].start_time = common.formatTime(list[i].start_time).split(" ")[0];

        list[i].end_time = common.formatTime(list[i].end_time).split(" ")[0];

        list[i].actual_time = getActual_time(list[i].actual_time);
      }
      that.setData({
        content_list: list
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

  },
  navToggle: function () {
    var navHide = this.data.navHide;
    this.setData({
      navHide: !navHide
    });
  },
  dropdownToggle: function () {
    var dropdownHide = this.data.dropdownHide;
    this.setData({
      dropdownHide: !dropdownHide
    });
  },
  itemToggle: function (e) {
    var id = e.currentTarget.id,
      list = this.data.list;

    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }

    this.setData({
      list: list
    });
  },
  logout: function () {
    var that = this;
    data.logout(common, api.interface.logout.url, that);
  },
})