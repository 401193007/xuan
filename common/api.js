// var admin = "https://api.xinyiqiguan.test.olaoban.com/";
var admin = "https://api.wx.xinyiqiguan.com/";

var interFace = {
  /*
   * 注册
   * @mobile 电话号码
   * @password 密码
   * @smsCode 验证码
   * @repassword 二次密码
   */
  register : {
    url: admin +　'?s=/wechat/register',
  },
  /*
   * 获取验证码
   * @mobile 电话号码
   */
  sendSMSCode: {
    url: admin + 　'?s=/wechat/sendSMSCode',
  },  
  /*
   * 登录
   * @mobile 电话号码
   * @password 密码
   */
  login: {
    url: admin + "?s=/wechat/login",
  },  
  /*
   * 验证手机验证码
   * @mobile 电话号码
   * @smsCode 验证码
   */
  checkCode: {
    url: admin + "?s=/wechat/checkCode",
  },    
  /*
   * 修改密码
   * @repassword 二次密码
   * @password 密码
   */
  updatePassword : {
    url: admin + "?s=/wechat/updatePassword",
  },  
  /*
   * 获取地区信息
   * @url 请求地址
   */
  getAreaAjax: {
    url: admin + "/index.php?s=/entry/getAreaAjax.html",
  }, 
  /*
   * 招商申请第一步
   * @url 请求地址
   */
  apply1: {
    url: admin + "?s=/investment/apply1.html",
  },   
  /*
   * 招商申请第二步
   * @url 请求地址
   */
  apply2: {
    url: admin + "?s=/investment/apply2.html",
  },  
  /*
   * 招商申请第三步
   * @url 请求地址
   */
  apply3: {
    url: admin + "?s=/investment/apply3.html",
  },    
  /*
   * 上传营业执照
   * @url 请求地址
   */
  blUpload: {
    url: admin + "?s=/investment/blUpload.html",
  },  
  /*
   * 公共上传
   * @url 请求地址
   */
  picUpload: {
    url: admin + "?s=/entry/picUpload.html",
  },   
  /*
   * 清除图片上传
   * @url 请求地址
   */
  picUploadRemove: {
    url: admin + "?s=/entry/picUploadRemove.html",
  },     
  /*
   * 招商信息列表
   * @url 请求地址
   */
  getInvestmentList: {
    url: admin + "?s=/investment/getInvestmentList.html",
  },  
  /*
   * 招商信息详情
   * @url 请求地址
   */
  getInvestInfo: {
    url: admin + "?s=/investment/getInvestInfo.html",
  },   
  /*
   * 入职申请第一步
   * @name 姓名
   * @mobile 手机号码
   * @id_number 身份证号码
   */
  step1: {
    url: admin + "?s=/entry/step1.html",
  },     
  /*
   * 入职申请第二步
   * @url 请求地址
   */
  step2: {
    url: admin + "?s=/entry/step2.html",
  },   
  /*
   * 入职申请第三步
   * @url 请求地址
   */
  step3 :  {
    url: admin + "?s=/entry/step3.html",
  },  
  /*
   * 入职申请第三步
   * @url 请求地址
   */
  step4: {
    url: admin + "?s=/entry/step4.html",
  },    
  /*
  * 获取职位信息
  * @url 请求地址
  */
  getPosition: {
    url: admin + "?s=/entry/getPosition.html",
  }, 
  /*
  * 员工分组
  * @url 请求地址
  */
  getGroups: {
    url: admin + "?s=/entry/getGroups.html",
  },  
  /*
  * 合同
  * @url 请求地址
  */
  getContract: {
    url: admin + "?s=/entry/getContract.html",
  },      
  /*
   * 获取验证码图片
   * @url 请求地址
   */
  verify: {
    url: admin + "?s=/entry/verify.html",
  },   
  /*
   * 员工详细资料
   * @url 请求地址
   */
  getEmployeeInfo: {
    url: admin + "?s=/public/getEmployeeInfo.html",
  },   
  /*
   * 员工首次登陆第一步
   * @url 请求地址
   */
  resetPasswordStep1: {
    url: admin + "?s=/public/resetPasswordStep1.html",
  }, 
  /*
   * 员工首次登陆第二步
   * @url 请求地址
   */
  resetpasswordStep2: {
    url: admin + "?s=/public/resetpasswordStep2.html",
  },  
  /*
   * 员工首次登陆第三步
   * @url 请求地址
   */
  resetpasswordStep3: {
    url: admin + "?s=/public/resetpasswordStep3.html",
  },        
  /*
   * 获取验证码
   * @mobile 电话号码
   */
  sendSMSCode1: {
    url: admin + '?s=/public/sendSMSCode',
  },      
  /*
   * 员工登录接口
   */
  login2: {
    url: admin + '?s=/public/login.html',
  },
  /*
   * 员工首页获取合同
   */
  downloadContractPdf: {
    url: admin + '?s=/ucp/downloadContractPdf.html',
  },  
  /*
   * 员工详细资料
   */
  getEmployeeInfo: {
    url: admin + '?s=/public/getEmployeeInfo.html',
  }, 
  /*
   * 退出登录
   */
  logout: {
    url: admin + '?s=/public/logout.html',
  },  
  /*
   * 员工修改手机号码
   */
  submitInfo: {
    url: admin + '?s=/ucp/submitInfo.html',
  },   
  /*
   * 员工修改密码
   */
  submitpassword: {
    url: admin + '?s=/ucp/submitpassword.html',
  },  
  /*
   * 医疗报备记录
   */
  medicalreportrecord: {
    url: admin + '?s=/SocialSecurity/medicalreportrecord.html',
  },     
  /*
   * 医疗报备记录
   */
  medicalreportrecord: {
    url: admin + '?s=/SocialSecurity/medicalreportrecord.html',
  },   
  /*
   * 医疗报备记录
   */
  medicalReport: {
    url: admin + '?s=/SocialSecurity/medicalReport.html',
  },   
  /*
   * 生育报备
   */
  parturitionreport: {
    url: admin + '?s=/SocialSecurity/parturitionreport.html',
  },  
  /*
   * 生育报备列表
   */
  parturitionreportrecord: {
    url: admin + '?s=/SocialSecurity/parturitionreportrecord.html',
  },
  /*
   * 上传身份证复印件
   */
  idCardUpload: {
    url: admin + '?s=/SocialSecurity/idCardUpload.html',
  },  
  /*
   * 社保申请
   */
  socialsecuritycardapplication: {
    url: admin + '?s=/SocialSecurity/socialsecuritycardapplication.html',
  },   
  /*
   * 社保申请
   */
  socialsecuritycardapplicationrecord: {
    url: admin + '?s=/SocialSecurity/socialsecuritycardapplicationrecord.html',
  },  
  /*
   * 签到
   */
  addsign: {
    url: admin + '?s=/attendance/addsign.html',
  },     
  /*
   * 签到列表
   */
  signlist: {
    url: admin + '?s=/attendance/signlist.html',
  },    
  /*
   * 请假类型
   */
  leavetype: {
    url: admin + '?s=/attendance/leavetype.html',
  },   
  /*
   * 请假申请
   */
  addleave: {
    url: admin + '?s=/attendance/addleave.html',
  }, 
  /*
   * 请假申请列表
   */
  leavelist: {
    url: admin + '?s=/attendance/leavelist.html',
  },    
  /*
   * 签名上传
   */
  qmUpload: {
    url: admin + '?s=/entry/qmUpload.html',
  },    
  /*
   * 完善资料
   */
  fillinfo: {
    url: admin + '?s=/profile/fillinfo.html',
  },  
  /*
   * 修改资料
   */
  editInfo: {
    url: admin + '?s=/profile/editInfo.html',
  },    
  /*
   * 工伤报告
   */
  occupationalinjuryreportrecord : {
    url: admin + '?s=/socialSecurity/occupationalinjuryreportrecord.html',
  },     
  /*
   * 地图转换
   */
  map: {
    url: admin + '?s=/public/request',
  },                                                 
}

module.exports = {
  interface: interFace
}