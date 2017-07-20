var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

/*
  * 公共判断
  * @condition 判断条件
  * @tips 错误提示
  * @context 执行上下文
  */
function judge(condition, tips, context) {
  if (condition) {
    common.isError(tips, context);
    return false;
  } else {
    common.clearError(context);
    return true;
  }
}



Page({
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      that.setData({
        staffName: result.name
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
  },
  bindSexChange: function (e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindProvinceChange: function (e) {
    console.log(e);
    this.setData({
      provinceIndex: e.detail.value
    })
  },
  //相关条款
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //修改手机号码
  submitInfo : function(e){

    var that = this;
    var mobile = e.detail.value.mobile;
    var password = e.detail.value.password;   

    if (!judge("" == common.trim(mobile), "手机号码不能为空", that)) return;

    if (!judge("" == common.trim(password), "密码不能为空", that)) return;    

    if (!judge("" == common.checkLength(password), "密码长度必须大于等于6位", that)) return;
    
    common.request(api.interface.submitInfo.url, {
      password: password,
      mobile: mobile
    }, function (res) {
      console.log(JSON.stringify(res));
      common.resCallback(res, that, function () {
        wx.setStorageSync("STAFF_MOBILE", mobile);
        common.showToast("修改成功");
        setTimeout(function(){
          common.redirect("../index/index");
        },1000)
      })
    }, true) 
  },
  submitpassword: function (e){
    var that = this;
    var old = e.detail.value.old;
    var password = e.detail.value.password;       
    var repassword = e.detail.value.repassword; 

    if (!judge("" == common.trim(old), "旧密码不能为空", that)) return;

    if (!judge("" == common.trim(password), "新密码不能为空", that)) return;

    if (!judge("" == common.checkLength(password), "密码长度必须大于等于6位", that)) return;

    if (!judge("" == common.trim(password), "确认新密码不能为空", that)) return;

    if (!judge("" == common.checkLength(password), "确认新密码长度必须大于等于6位", that)) return;    

    if (!judge(password != repassword, "输入密码不一致", that)) return;

    common.request(api.interface.submitpassword.url, {
      password: password,
      repassword: repassword,
      old: old
    }, function (res) {
      console.log(JSON.stringify(res));
      common.resCallback(res, that, function () {
        common.showToast("修改成功");
        setTimeout(function () {
          common.redirect("../index/index");
        },1000)
      })
    }, true)     

  }   
})