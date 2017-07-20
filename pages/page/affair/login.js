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
    errorMsg: "",
    STAFF_IDNUMBER: wx.getStorageSync('STAFF_IDNUMBER') ? wx.getStorageSync('STAFF_IDNUMBER') : '',
    STAFF_PASSWORD: wx.getStorageSync('STAFF_PASSWORD') ? wx.getStorageSync('STAFF_PASSWORD') : '',
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("跳转的参数：" + JSON.stringify(options));
    common.getScreen(that);
    that.setData({
      param: options.param ? options.param : ''
    });
    console.log("跳转的参数：" + that.data.param);
  },
  formSubmit: function (e) {
    var that = this;
    var id_number = e.detail.value.id_number;
    var password = e.detail.value.password;
    var param = that.data.param;

    if (!judge("" == common.trim(id_number), "身份证号码不能为空", that)) return;

    if (!judge("" == common.trim(password), "密码不能为空", that)) return;

    common.request(api.interface.login2.url, {
      id_number: id_number,
      password: password
    }, function (res) {

      common.resCallback(res, that, function () {
        wx.setStorageSync("STAFF_IDNUMBER", id_number);
        wx.setStorageSync("STAFF_PASSWORD", password);
        wx.setStorageSync("STAFF_LOGIN", true);       

        if (param == "sign" || param == "leave") {
          common.redirect(param + '/' + param);
        }else{
          common.redirect("index/index");
        }
        
      });

    }, true) 
  }  
})