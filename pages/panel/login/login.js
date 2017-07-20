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
    showTopTips : false,
    errorMsg : ""
  },
  formSubmit : function(e){
    var that = this; 
    var mobile = e.detail.value.mobile;
    var password = e.detail.value.password;

    if (!judge("" == common.trim(mobile), "手机号码不能为空", that)) return;
    if (!judge(!common.validatemobile(mobile), "手机号码格式错误", that)) return;

    if (!judge("" == common.trim(password), "密码不能为空", that)) return;

    common.request(api.interface.login.url, {
      mobile: mobile,
      password: password,
    }, function (res) {
      common.resCallback(res,that,function(){
        wx.setStorageSync("ISLOGIN", true);
        wx.setStorageSync("MOBILE", mobile);
        wx.switchTab({
          url: '../../page/index/index'
        });
      });
    })     
  }
})
