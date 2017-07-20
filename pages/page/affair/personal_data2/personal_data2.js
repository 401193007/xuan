var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');

/*
  * 公共判断
  * @condition 判断条件
  * @tips 错误提示
  * @context 执行上下文
  */
function judge(condition, tips, context) {
  if (condition) {
    wx.showToast({
      title: tips,
      icon: 'success',
      image: '',
      duration: 2000
    })
    // common.isError(tips, context);
    return false;
  } else {
    // wx.showToast({
    //   title: tips,
    //   icon: 'success',
    //   image: '',
    //   duration: 2000
    // })     
    // common.clearError(context);
    return true;
  }
}

Page({
  onLoad: function () {
    var that = this;
    if (result.allow_edit == 1) {
      common.showToast("请先完善过资料", 'loading');
      setTimeout(function () {
        common.redirect("../index/index");
      }, 1000)
      return;
    }

    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      console.log("员工信息:" + 　JSON.stringify(result));
      that.setData({
        staffName: result.name,
        mobile: result.mobile,
        id_number: result.id_number,
        email: result.email,
        educationIndex: parseInt(result.education) - 1, 
        major: result.major,
        provice: result.provice,
        city: result.city,
        maritalIndex: parseInt(result.marital) - 1,  
        anmelden_natureIndex: parseInt(result.anmelden_nature) - 1 
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
    isAgree: false,

    sex: [
      {
        id: 1,
        text: "男",
      },
      {
        id: 2,
        text: "女",
      }
    ],
    sexIndex: 0,
    sexID: 1,

    //学历
    education: [
      {
        id: 1,
        text: "小学及以下"
      },
      {
        id: 2,
        text: "初中"
      },
      {
        id: 3,
        text: "中专"
      },
      {
        id: 4,
        text: "高职/高中"
      },
      {
        id: 5,
        text: "大专"
      },
      {
        id: 6,
        text: "本科及以上"
      },
    ],

    marital: [
      {
        id: 1,
        text: "未婚",
      },
      {
        id: 2,
        text: "已婚",
      }
    ],
    maritalIndex: 0,
    maritalID: 1,

    anmelden_nature: [
      {
        id: 1,
        text: "外地城镇",
      },
      {
        id: 2,
        text: "外地农村",
      },
      {
        id: 3,
        text: "本地城镇",
      },
      {
        id: 4,
        text: "本地农村",
      }
    ],
    anmelden_natureID: 1,

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
  formSubmit: function (e) {
    console.log("我进来了");
    var that = this;
    var mobile = e.detail.value.mobile; 
    var residential_address = e.detail.value.residential_address; console.log("residential_address:" + residential_address);

    common.request(api.interface.editInfo.url, {
      mobile: mobile,
      residential_address: residential_address
    }, function (res) {
      console.log("这个是第三部：" + JSON.stringify(res));

      if (res.status == 1) {
        common.showToast("修改成功");
        setTimeout(function () {
          common.redirect("../index/index");
        }, 1000)
      } else {
        wx.showToast({
          title: res.info,
          icon: 'loading',
          image: '',
          duration: 2000
        })
      }
    }, true);
  }
})