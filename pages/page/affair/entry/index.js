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

// pages/test/index.js
Page({
  data:{
    showTopTips: false,
    errorMsg: ""    
  },
  formSubmit: function (e) {
    var that = this;
    var name = e.detail.value.name;
    var mobile = e.detail.value.mobile;
    var id_number = e.detail.value.id_number;

    if (!judge("" == common.trim(name), "姓名不能为空", that)) return;

    if (!judge("" == common.trim(mobile), "手机号码不能为空", that)) return;
    if (!judge(!common.validatemobile(mobile), "手机号码格式错误", that)) return;

    if (!judge("" == common.trim(id_number), "身份证号码不能为空", that)) return;

    common.request(api.interface.step1.url, {
      name: name,
      mobile: mobile,
      id_number: id_number,
    }, function (res) {

      console.log(JSON.stringify(res));

      common.resCallback(res,that ,function () {
        wx.setStorageSync("STAFF_MOBILE", mobile);
        common.redirect("index_1");
      });
    }) 

  }
})