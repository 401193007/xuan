var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');
Page({
  onLoad: function () {
    var that = this;

    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      that.setData({
        staffName: result.name,
      });
    });

    //初始化table
    common.request(api.interface.occupationalinjuryreportrecord.url, {}, function (res) {
      var list = res.result;
      console.log("工伤报告" + JSON.stringify(res));
      for (var i = 0; i < list.length; i++) {
        list[i].create_time = common.formatTime(list[i].create_time).split(" ")[0];

        // list[i].end_time = common.formatTime(list[i].end_time).split(" ")[0];

        // list[i].actual_time = getActual_time(list[i].actual_time);
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

    sex: ["男", "女"],
    sexIndex: 0,

    education: ["小学及以下", "初中", "中专", "高职/高中", "大专", "本科及以上"],
    educationIndex: 0,

    marriage: [],
    date: '2016-09-01',

    isAgree: false
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
  }
})