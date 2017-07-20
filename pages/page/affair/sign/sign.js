var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');
var QQMapWX = require('../../../../common/qqmap-wx-jssdk.min.js');

// 实例化API核心类
var mapWx = new QQMapWX({
  key: 'DIUBZ-CL4H6-HPSS7-MN6OS-2KUB7-PMF5Q' // 必填
});

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
    common.request(api.interface.signlist.url, {}, function (res) {
      var list = res.result;
      var arr = [];
      for (var i = 0; i < list.length;i++){
        var obj = {};
        obj.date = list[i].time.split(" ")[0];
        obj.time = list[i].time.split(" ")[1];
        obj.address = list[i].address;
        arr.push(obj);
      }
      that.setData({
        content_list: arr
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
    list: data.nav.navList
  },
  navToggle: function () {
    console.log(wx.getStorageInfoSync());
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
  sign : function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;

        // common.request(api.interface.map.url, {
        //   request_url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '7490&key=454BZ-7NAR3-W6B3Q-3UWJR-MD3EF-ADBL4&get_poi=0'
        // }, function (res) {
        //     console.log(JSON.stringify(res));
        // })         

        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude +'7490&key=454BZ-7NAR3-W6B3Q-3UWJR-MD3EF-ADBL4&get_poi=0',
          data: {}, method: "get",
          header: { 'Content-Type': 'application/json' },
          success : function(res){
            common.request(api.interface.addsign.url, {
              coordinate: latitude + ',' + longitude,
              address : res.data.result.address
            }, function (res) {
             
              common.showToast(res.info);
              //初始化table
              common.request(api.interface.signlist.url, {}, function (res) {
                var list = res.result;
                var arr = [];
                for (var i = 0; i < list.length; i++) {
                  var obj = {};
                  obj.date = list[i].time.split(" ")[0];
                  obj.time = list[i].time.split(" ")[1];
                  obj.address = list[i].address;
                  arr.push(obj);
                }
                that.setData({
                  content_list: arr
                })
              }) 
            });   


          }
        })

      },
      fail : function(){
        common.showToast('请先开启手机定位','loading');
      }
    });        
  }
})