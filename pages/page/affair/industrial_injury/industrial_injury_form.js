var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');
Page({
  onLoad: function () {
    var that = this;
    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      console.log("工伤报告" + JSON.stringify(result.name));
      that.setData({
        staffName: result.name,
        id_number: result.id_number
      });
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    navHide: true,
    dropdownHide: true,
    showModal: false,
    list: data.nav.navList,

    id_pic_path: '',
    id_pic: '',
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
  //上传手持身份照片
  uploadIdCard: function () {
    var that = this;

    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        common.showLoading("上传中")

        common.uploadImg(api.interface.picUpload.url, 'id_pic', tempFilePaths[0], {}, function (res) {
          console.log("上传的返回：" + JSON.stringify(res));

          //显示本地路径
          that.setData({
            id_pic_path: tempFilePaths,
            id_pic: res.data.id
          });

          wx.hideLoading();
        });
      }
    })
  },
  //删除手持身份照片
  deleteIdCard: function () {
    var that = this;

    common.request(api.interface.picUploadRemove.url, {
      name: 'id_pic'
    }, function (res) {
      //显示本地路径
      that.setData({
        id_pic_path: ''
      });
    });

  },  
  downFile : function(){
    //请求
    wx.downloadFile({
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')
      },
      url: 'https://api.wx.xinyiqiguan.com/Uploads/Download/Common/occupational_injury_report.doc',
      success: function (res) {
        console.log("是否请求成功：" + JSON.stringify(res));
        var filePath = res.tempFilePath;

        //打开文件
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log("我进来失败了！！！" + JSON.stringify(res));
          }
        });
      },

    })       
  }
})