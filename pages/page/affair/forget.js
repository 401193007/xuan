

var common = require('../../../common/common.js');
var api = require('../../../common/api.js');
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
  data: {
    showTopTips: false,
    errorMsg: ""
  },    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    common.getScreen(that);

    common.request(api.interface.verify.url, {}, function (res) {
      console.log(JSON.stringify(res));
      common.resCallback(res, that, function () {
        that.setData({
          verify: res.result.code
        })
      });

    })

  },
  //改变验证码
  changeVerify: function () {
    var that = this;

    common.request(api.interface.verify.url, {}, function (res) {
      common.resCallback(res, that, function () {
        that.setData({
          verify: res.result.code
        })
      });

    })
  },  
  formSubmit: function (e) {
    var that = this;
    var id_number = e.detail.value.id_number;
    var captcha = e.detail.value.captcha;

    if (!judge("" == common.trim(id_number), "身份证号码不能为空", that)) return;

    if (!judge("" == common.trim(captcha), "验证码不能为空", that)) return;

    common.request(api.interface.resetPasswordStep1.url, {
      id_number: id_number,
      captcha: captcha,
    }, function (res) {
      console.log(JSON.stringify(res));
      common.resCallback(res, that, function () {
        wx.setStorageSync("STAFF_MOBILE", res.result.mobile);
        wx.setStorageSync("IDNUMBER", res.result.id_number);
        common.redirect("forget_step2");
      });

    },true)         

  }    
})