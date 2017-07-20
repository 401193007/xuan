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

//验证码倒计时
function countdown(that) {
  var s = that.data.code.second;
  if (s == 0) {
    that.setData({
      code: {
        name: "获取验证码",
        second: 60,
        disabled: false
      }
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      code: {
        name: s + "秒后重新获取",
        second: s - 1,
        disabled: true
      }
    });
    countdown(that);
  }, 1000);
}  

Page({
  data: {
    showTopTips: false,
    errorMsg: "",
    code: {
      name: "获取验证码",
      second: 60,
      disabled: false
    }    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id_number =  wx.getStorageSync("IDNUMBER");
    var mobile = wx.getStorageSync("STAFF_MOBILE");
    common.getScreen(that);
    that.setData({
      id_number: id_number,
      mobile: mobile
    });
  },
  countdown : function(){
    var that = this;
    var mobile = that.data.mobile;

    if (!judge("" == common.trim(mobile), "手机号码不能为空", that)) return;

    if (!judge(!common.validatemobile(mobile), "手机号码格式错误", that)) return;

    countdown(this);   //倒计时

    common.request(api.interface.sendSMSCode1.url, { id_number: that.data.id_number }, function (res) {
      console.log(JSON.stringify(res));
      res.status == 1 && common.showToast("验证码发送成功")
    })    
  },
  formSubmit: function (e) {
    var that = this;
    var id_number = e.detail.value.id_number;
    var mobile = e.detail.value.mobile;
    var validate = e.detail.value.validate;

    if (!judge("" == common.trim(validate), "手机验证码不能为空", that)) return;


    common.request(api.interface.resetpasswordStep2.url, {
      id_number: id_number,
      mobile: mobile,
      validate: validate
    }, function (res) {
      console.log(JSON.stringify(res));
      common.resCallback(res, that, function () {
        common.redirect("forget_step3");
      });

    }, true) 

  }
})