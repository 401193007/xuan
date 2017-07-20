// 去前后空格  
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}
//公共loading
function showLoading(title){
  wx.showLoading && wx.showLoading({
        title : title?title : "加载中..."
    });    
}
//公共报错提示 （注意在上方提示）
function isError(msg,that){
    that.setData({
        showTopTips : true,
        errorMsg : msg
    });
}

// 清空错误信息  
function clearError(that) {  
    that.setData({  
        showTopTips: false,  
        errorMsg: ""  
    })  
}  
//关闭当前页面跳转
function redirect(url){
    wx.redirectTo({
        url: url
    })    
}
//不关闭当前页面跳转
function navigate(url){
    wx.navigateTo({
        url: url
    })    
}
//验证手机号码
function validatemobile(mobile) {
    if (mobile.length == 0) {
        return false;
    }
    if (mobile.length != 11) {
        return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
        return false;
    }
    return true;
}
//验证长度
function checkLength(value){
  if (value.length < 6) {
    return false;
  }  
}
// 清缓存
function clearStorage(status,storageArr,callback){
  if (status && status == "404"){
    for (var i = 0; i < storageArr.length;i++){
      wx.removeStorageSync(storageArr[i]);
    }
    callback();
  }
}

//公共请求
function request(url,data,callback,hasLoading,method){
  hasLoading && showLoading();
    //本地取存储的sessionID  
  var session_id = wx.getStorageSync('PHPSESSID');
    if (session_id != "" && session_id != null) {
      var header = { 
        'X-Requested-With': 'XMLHttpRequest',
        'content-type':    'application/x-www-form-urlencoded',                 'Cookie': 'PHPSESSID=' + session_id 
      }
    } else {
      var header = { 
        'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/x-www-form-urlencoded'
      }
    }  

    wx.request({
        url: url, //仅为示例，并非真实的接口地址
        data: data,
        method: method ? 'GET' : 'POST',
        header: header,
        success: function(res) {
          hasLoading && (wx.hideLoading && wx.hideLoading());
          wx.setStorageSync('PHPSESSID', res.data.token);      
          typeof callback == "function" && callback(res.data);
        },
        fail : function(){

        }
    })
}
//获取设备信息
function getScreen(that) {
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth
      })
    }
  });
}
// 公共弹窗提示
function showToast(text, icon, duration){
  wx.showToast && wx.showToast({
    title: text,
    icon: icon ? icon : 'success',
    duration: duration ? duration : 2000
  })
}
//公共模态弹窗
function showModal(content, confirm, cancel,title){
  var confirmFn = confirm && typeof confirm === "function" ? confirm : '';
  var cancelFn = cancel && typeof cancel === "function" ? cancel : '';
  wx.showModal({
    title: title? title : '提示',
    content: content,
    success: function (res) {
      if (res.confirm) {
        confirmFn && confirmFn();
      } else if (res.cancel) {
        cancelFn && cancelFn();        
      }
    }
  })  
}

//公共请求回调
function resCallback(res,context,Fn){
  if (res.status == 1) {
    typeof Fn === 'function' && Fn();
  } else {
    isError(res.info, context);
  }  
}

function uploadImg(url,name,filePath, formData,success){
  //本地取存储的sessionID  
  var session_id = wx.getStorageSync('PHPSESSID');
  if (session_id != "" && session_id != null) {
    var header = {
      'X-Requested-With': 'XMLHttpRequest',
      'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
    }
  }

  wx.uploadFile({
    url: url, //上传图片接口
    filePath: filePath,
    name: name?name:'file',
    header: header,
    formData: formData,
    success: function (res) {
      if (res.statusCode == "200"){
        var str = JSON.parse(res.data);   //先转码
        wx.setStorageSync('PHPSESSID', str.token);
        typeof success === "function" && success(str);        
      }else{
        showToast("图片上传失败");
      }
    }
  });
}

//公共时间戳
function formatTime(time){
  Date.prototype.toLocaleString = function(){
    return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();    
  }

  var unixTimestamp = new Date(time * 1000);
  return unixTimestamp.toLocaleString();
}

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

//对外暴露
module.exports = {
  validatemobile : validatemobile,
  request: request,
  redirect : redirect,
  navigate : navigate,
  trim : trim,
  isError : isError,
  clearError : clearError,
  showLoading : showLoading,
  getScreen: getScreen,
  showToast: showToast,
  checkLength: checkLength,
  showModal: showModal,
  resCallback: resCallback,
  uploadImg: uploadImg,
  formatTime: formatTime,
  getNowFormatDate: getNowFormatDate,
  clearStorage: clearStorage
}