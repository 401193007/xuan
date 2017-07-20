var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
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
  formSubmit: function (e) {
    var that = this;
    var name = e.detail.value.name;
    var uscc = e.detail.value.uscc;
    var leading = e.detail.value.leading;
    var contact_phone = e.detail.value.contact_phone;
    var email = e.detail.value.email;

    if (!judge("" == common.trim(name), "请输入单位名称", that)) return;

    if (!judge("" == common.trim(uscc), "请输入统一社会信用代码", that)) return;

    if (!judge("" == common.trim(leading), "请输入项目负责人", that)) return;

    if (!judge("" == common.trim(contact_phone), "请输入联系电话", that)) return;

    if (!judge("" == common.trim(email), "请输入联系邮箱", that)) return;


    common.request(api.interface.apply1.url, {
      name: name,
      uscc: uscc,
      leading: leading,
      contact_phone: contact_phone,
      email: email,
    }, function (res) {
      common.resCallback(res, that,function (){
        common.navigate("step?route=step_2");
      });
    })
  }
})
