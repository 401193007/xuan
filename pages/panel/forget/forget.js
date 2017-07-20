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

var mobile;

function countdown(that) {  
    var s = that.data.code.second;
    if(s == 0){
        that.setData({
            code : {
                name : "获取验证码",
                second : 60,
                disabled : false
            }
        });
        return;
    }
    var time = setTimeout(function(){
        that.setData({
            code : {
                name : s + "秒后重新获取",
                second : s -1 ,
                disabled : true
            }
        });
        countdown(that);
    },1000);
}  

Page({
  data: {
    code : {
        name : "获取验证码",
        second : 60,
        disabled : false
    }
  },
  countdown : function(){
    var that = this;

    if (!judge(typeof (mobile) == 'undefined' || "" == common.trim(mobile), "手机号码不能为空", that)) return;

    if (!judge(!common.validatemobile(mobile), "手机号码格式错误", that)) return;

    countdown(this);   //倒计时

    common.request(api.interface.sendSMSCode.url, { mobile　: mobile }, function (res) {
      res.status == 1 && common.showToast("验证码发送成功")
    })
  },
  input_mobile: function (e) {
    mobile = e.detail.value;   //全局赋值
  },  
  formSubmit : function(e){
    var that = this; 
    var mobile = e.detail.value.mobile;
    var smsCode = e.detail.value.smsCode;

    if (!judge("" == common.trim(mobile), "手机号码不能为空", that)) return;

    if (!judge(!common.validatemobile(mobile), "手机号码格式错误", that)) return;

    if (!judge("" == common.trim(smsCode), "验证码不能为空", that)) return;

    common.request(api.interface.checkCode.url, {
      mobile: mobile,
      smsCode: smsCode,
    }, function (res) {
      
      common.resCallback(res,that,function () {
        common.navigate("forget_step2?mobile=mobile&password=password");
      });   
      
    })     

    
  }  
})