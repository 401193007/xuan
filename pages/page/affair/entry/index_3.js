var WxParse = require('../../../../common/wxParse/wxParse.js');
// var contract = require('../../../../common/contract.js');
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
//获取验证码
function countdown(that) {
  var s = that.data.code.second;
  if (s == 0) {
    that.setData({
      code: {
        name: "获取验证码",
        second: 60,
        disabled: false
      }
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      code: {
        name: s + "秒后重新获取",
        second: s - 1,
        disabled: true
      }
    });
    countdown(that);
  }, 1000);
}  

// pages/test/index_3.js
Page({
  data:{
    dropdownShow : false,
    code: {
      name: "获取验证码",
      second: 60,
      disabled: false
    },
    showTopTips: false,
    errorMsg: "",

    pen : 3, //"画笔粗细默认值"
    color: "#000000",   //画笔颜色

    path : '',
    signatureData : '' //签名ID
  },
  startX: 0, //保存X坐标轴变量
  startY: 0, //保存Y坐标轴变量  
  onLoad:function(options){
    var that = this;
    var mobile = wx.getStorageSync('STAFF_MOBILE');

    common.request(api.interface.verify.url, {}, function (res) {
      console.log(JSON.stringify(res));
      common.resCallback(res, that, function () {
        that.setData({
          mobile: mobile,
          verify: res.result.code
        })  
      });

    })
  },
  dropdownToggle : function(){
    var that = this;
    
    var dropdownShow = this.data.dropdownShow;
    if(that.data.hasCotract){
      that.setData({
        dropdownShow: !dropdownShow
      });
    }else{
      common.showLoading("合同加载中请稍等...");
      common.request(api.interface.getContract.url,{}, function (res) {
        console.log(JSON.stringify(res));
        //载入合同模板
        var article = res.result.contract_content;
        WxParse.wxParse('article', 'html', article, that, 5);  
        that.setData({
          dropdownShow: !dropdownShow,
          hasCotract : true
        });   
        wx.hideLoading();
      })    
    }
  },
  countdown: function () {
    var that = this;
    var mobile = that.data.mobile;

    countdown(this);   //倒计时

    common.request(api.interface.sendSMSCode.url, { mobile　: mobile }, function (res) {
      res.status == 1 && common.showToast("验证码发送成功")
    })
  },  
  changeVerify : function(){
    var that = this;

    common.request(api.interface.verify.url, {}, function (res) {
      common.resCallback(res, that, function () {
        that.setData({
          verify: res.result.code
        })
      });

    })
  },
  formSubmit: function (e) {
    var that = this;

    var captcha = e.detail.value.captcha;
    var validate = e.detail.value.validate;
    var signatureData = that.data.signatureData;

    if (!judge("" == common.trim(captcha), "手机验证码不能为空", that)) return;

    if (!judge("" == common.trim(validate), "验证码不能为空", that)) return;
    
    if (!judge("" == signatureData, "请先在白色区域内签名", that)) return;

    common.request(api.interface.step4.url, {
      captcha: captcha,
      validate: validate,
      signatureData: signatureData
    }, function (res) {
      console.log(JSON.stringify(res));
      common.resCallback(res, that, function () {
        common.redirect("../../../panel/success/success?type=submitAudit");
      });

    },true);


  },
  onReady : function(){
    //获取画布执行上下文
    this.context = wx.createCanvasContext('myCanvas');

    // 在canvas绘制前填充白色背景   
    this.context.setFillStyle('white');
    this.context.fillRect(0, 0, 343, 80);
    this.context.draw();
  },
  //手指触摸动作开始
  touchStart : function(e){

    //获取触摸点的坐标
    this.startX = e.changedTouches[0].x;
    this.startY = e.changedTouches[0].y;

    this.context.setStrokeStyle(this.data.color);
    this.context.setLineWidth(this.data.pen);
    this.context.setLineCap('round');

    this.context.beginPath();
  },
  //手指触摸后移动
  touchMove : function(e){

    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y

    //设置绘制起点
    this.context.moveTo(this.startX, this.startY);
    //链接触摸点
    this.context.lineTo(startX1, startY1);
    //填充
    this.context.stroke();

    this.startX = startX1;
    this.startY = startY1;

    

    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions() // 获取绘图动作数组
    })        
  },
  //手指触摸动作结束
  touchEnd: function () {

  },
  reset : function(){
    var that = this;

    if (that.data.path == '') {
      wx.drawCanvas({
        canvasId: 'myCanvas',
        // reserve: false,
        actions: [],
        // actions: this.context.clearActions() // 获取绘图动作数组
      });
      // 在canvas绘制前填充白色背景   
      that.context = wx.createCanvasContext('myCanvas');
      that.context.setFillStyle('white');
      that.context.fillRect(0, 0, 343, 80);
      that.context.draw();  
    } else {
      wx.getSavedFileList({
        success: function (res) {
          console.log(res.fileList[0].filePath);
          if (res.fileList.length > 0) {
            wx.removeSavedFile({
              filePath: res.fileList[0].filePath,
              success: function (res) {
                console.log("删除图片成功！！！");
                that.setData({
                  path: '',
                  signatureData : ''
                });
                wx.drawCanvas({
                  canvasId: 'myCanvas',
                  // reserve: false,
                  actions: [],
                  // actions: this.context.clearActions() // 获取绘图动作数组
                });
                // 在canvas绘制前填充白色背景   
                that.context = wx.createCanvasContext('myCanvas');
                that.context.setFillStyle('white');
                that.context.fillRect(0, 0, 343, 80);
                that.context.draw();  
              }
            })
          }
        }
      })
    }   
    
  
    console.log("我跑步到这里来！");
  },
  //保存图片
  save: function (e) {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {

        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            common.uploadImg(api.interface.qmUpload.url, 'qm_pic', res.savedFilePath, {}, function (res) {
              console.log("我成功进来保存图片了！！！！");
              that.setData({
                signatureData: res.data.id,
                path: savedFilePath
              });
              common.showToast("保存成功");
              console.log(savedFilePath);
            });            


          }
        })

      }
    });

  },    
})