var common = require('../../../common/common.js');
var api = require('../../../common/api.js');


// var mobile;

//验证码倒计时
function countdown(obj) {  
  var s = obj.data.code.second;
    if(s == 0){
      obj.setData({
            code : {
                name : "获取验证码",
                second : 60,
                disabled : false
            }
        });
        return;
    }
    var time = setTimeout(function(){
      obj.setData({
            code : {
                name : s + "秒后重新获取",
                second : s -1 ,
                disabled : true
            }
        });
      countdown(obj);
    },1000);
}  

/*
  * 公共判断
  * @condition 判断条件
  * @tips 错误提示
  * @context 执行上下文
  */
function judge(condition,tips,context){
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
    code : {
        name : "获取验证码",
        second : 60,
        disabled : false
    },
    mobile : ''
  },
  input_mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },  
    getCode : function(){

    var that = this;
    var mobile = that.data.mobile;

    if (!judge(typeof (mobile) == 'undefined' || "" == common.trim(mobile),"手机号码不能为空",that)) return;

    if (!judge(!common.validatemobile(mobile), "手机号码格式错误", that)) return;    
    
    countdown(that);   //倒计时

    common.request(api.interface.sendSMSCode.url, { mobile　: mobile},function(res){
      res.status == 1 && common.showToast("验证码发送成功")
    })
  },

  formSubmit : function(e){
    
    var that = this; 
    var mobile = e.detail.value.mobile;
    var smsCode = e.detail.value.smsCode;
    var password = e.detail.value.password;
    var repassword = e.detail.value.repassword;

    if (!judge("" == common.trim(mobile), "手机号码不能为空", that)) return;

    if (!judge(!common.validatemobile(mobile), "手机号码格式错误", that)) return;

    if (!judge("" == common.trim(smsCode), "验证码不能为空", that)) return;

    if (!judge("" == common.trim(password), "密码不能为空", that)) return;

    if (!judge("" == common.checkLength(password), "密码长度必须大于等于6位", that)) return;    

    if (!judge("" == common.trim(repassword), "确认密码不能为空", that)) return;

    if (!judge("" == common.checkLength(repassword), "确认密码长度必须大于等于6位", that)) return;

    if (!judge(password != repassword, "输入密码不一致", that)) return;

    common.request(api.interface.register.url, { 
      mobile : mobile,
      smsCode: smsCode,
      password: password,
      repassword: repassword,
    }, function (res) {

      common.resCallback(res,that,function () {
        common.redirect("../success/success?type=register");
      });
    })
  }  
})