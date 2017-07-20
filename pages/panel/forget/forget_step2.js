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

  data:{},
  formSubmit : function(e){
    var that = this; 
    var password = e.detail.value.password;
    var repassword = e.detail.value.repassword;

    if (!judge("" == common.trim(password), "密码不能为空", that)) return;
    if (!judge("" == common.checkLength(password), "密码长度必须大于等于6位", that)) return;

    if (!judge("" == common.trim(repassword), "确认密码不能为空", that)) return;

    if (!judge("" == common.checkLength(repassword), "确认密码长度必须大于等于6位", that)) return;

    if (!judge(password != repassword, "输入密码不一致", that)) return;

    common.request(api.interface.updatePassword.url, {
      password: password,
      repassword: repassword,
    }, function (res) {

      common.resCallback(res, that,function () {
        common.redirect("../success/success?type=modify");
      });   
     
    })
    
  } 
})