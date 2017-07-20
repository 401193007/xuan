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
  back : function(){
    common.redirect("step_1");
  },
  formSubmit: function (e) {
    var that = this;
    var added_tat = e.detail.value.added_tat;
    var income_tax = e.detail.value.income_tax;
    var total = e.detail.value.total;
    var will_added_tat = e.detail.value.will_added_tat;
    var will_income_tax = e.detail.value.will_income_tax;
    var will_total = e.detail.value.will_total;

    if (!judge("" == common.trim(added_tat), "请输入增值税", that)) return;

    if (!judge("" == common.trim(income_tax), "请输入所得税", that)) return;

    if (!judge("" == common.trim(total), "总计", that)) return;

    if (!judge("" == common.trim(will_added_tat), "请输入意向增值税", that)) return;

    if (!judge("" == common.trim(will_income_tax), "请输入意向所得税", that)) return;

    if (!judge("" == common.trim(will_total), "请输入意向总计", that)) return;


    common.request(api.interface.apply2.url, {
      added_tat: added_tat,
      income_tax: income_tax,
      total: total,
      will_added_tat: will_added_tat,
      will_income_tax: will_income_tax,
      will_total: will_total,
    }, function (res) {
      common.resCallback(res, that, function () {
        common.navigate("step?route=step_3");
      });
    })
  }
})
