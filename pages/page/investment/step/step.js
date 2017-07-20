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
/*
  * 公共跳转
  * @route 路由
  * @context 执行上下文
  */
function goNext(route, context) {
  wx.setStorageSync('investment_step', route);
  context.setData({
    route: wx.getStorageSync('investment_step')
  });   
}

// 路由列表
const ROUTES = {
  step_1: 'step_1',
  step_2: 'step_2',
  step_3: 'step_3',
  step_4: 'step_4'
};
//上传图片参数
var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];


// pages/page/investment/step/step.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //公共提示
    showTopTips: false,
    errorMsg: "",

    bl_id: '',

    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 0,
    count: [1]       

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首次进入缓存
    wx.setStorageSync('investment_step', ROUTES.step_1);
    this.setData({
      route: wx.getStorageSync('investment_step')
    }); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _route = wx.getStorageSync('investment_step');
    this.setData({
      route: _route
    });  
  },
  /**
   * 第一步提交
   */
  step_1: function (e) {
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
      common.resCallback(res, that, function () {
        //模拟跳转
        goNext(ROUTES.step_2,that);         
      });
    })
  },
  /** 
   * 第二步提交
   */  
  step_2 : function (e) {
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
        //模拟跳转
        goNext(ROUTES.step_3, that);  
      });
    })
  },
  /** 
   * 第三步提交
   */
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;

        common.showLoading("上传中")

        common.uploadImg(api.interface.blUpload.url, '',tempFilePaths[0], {
          name: 'bl_pic'
        }, function (res) {
          console.log(res);
          that.setData({
            imageList: tempFilePaths,
            bl_id: res.result.file.pid
          });
          wx.hideLoading();
        });
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  step_3: function (e) {
    var that = this;
    var bl_id = that.data.bl_id;  //图片ID

    if (!judge("" == common.trim(bl_id), "请先上传营业执照", that)) return;

    common.request(api.interface.apply3.url, {
      bl_id: bl_id
    }, function (res) {
      common.resCallback(res, that, function () {
        //模拟跳转
        goNext(ROUTES.step_4, that);    
      });
    })
  },
  /**
   * 第四步返回 
   * @delta 堆栈
   */   
  return: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})