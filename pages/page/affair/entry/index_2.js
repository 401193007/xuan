var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');
var data = require('../common/data.js');

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
  onLoad: function () {
    var that = this;
  },
  /**
   * 页面的初始数据
   */
  data: {
    //手持身份证照片
    id_pic_path : '',
    id_pic : '',
    id_front_path : '',
    id_front : '',
    id_back_path : '',
    id_back : '',


    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    bank_card_path : "",  //银行卡路径

    //添加银行卡方式
    type: [{
      id: 1,
      name: "统一制卡"
    }, {
      id: 2,
      name: "自行添加"
    }],
    typeIndex: 0,
    typeID: 1,
    showBank : false,

    //银行
    bank: [{
      id: 1,
      name: "中国工商银行"
    }, {
      id: 2,
      name: "中国建设银行"
      }, {
        id: 3,
        name: "中国银行"
    }, {
      id: 4,
      name: "中国农业银行"
      }, {
        id: 5,
        name: "中信银行"
    }, {
      id: 6,
      name: "招商银行"
      }, {
        id: 7,
        name: "交通银行"
    }, {
      id: 8,
      name: "邮政储蓄银行"
    }],
    bankIndex: 0,
    bankID: 1,    
    bank_card_id : ''  //银行图片
  },
  // 添加银行卡方式
  bindTypeChange: function (e) {
    var that = this;
    var index = e.detail.value;   //当前选择的值
    var id = that.data.type[index].id;
    id === 1 && that.setData({
      typeIndex: index,
      typeID: id,
      showBank: false
    });
    id === 2 && that.setData({
      typeIndex: index,
      typeID: id,      
      showBank : true
    });
  },
  // 银行类型
  bindBankChange: function (e) {
    var that = this;
    var index = e.detail.value;   //当前选择的值
    var id = that.data.bank[index].id;
    that.setData({
      bankIndex: index,
      bankID: id
    })
  },
  //上传银行卡照片
  uploadBank : function(){
    var that = this;

    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(res);
        common.showLoading("上传中")

        common.uploadImg(api.interface.picUpload.url, 'bank_card_pic' ,tempFilePaths[0], {}, function (res) {
          console.log("上传的返回：" + JSON.stringify(res));
          //显示本地路径
          that.setData({
            bank_card_path: tempFilePaths,
            bank_card_id: res.data.id 
          });

          wx.hideLoading();
        });
      }
    })
  },
  //删除银行图片
  deleteBank : function(){
    var that = this;
    console.log("我进来了");
    common.request(api.interface.picUploadRemove.url, {
      name: 'bank_card_pic'
    }, function (res) {
      console.log("删除图片的返回：" + JSON.stringify(res));
      //显示本地路径
      that.setData({
        bank_card_path: ''
      });
    });

  },
  //上传手持身份照片
  uploadIdCard : function(){
    var that = this;

    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        common.showLoading("上传中")

        common.uploadImg(api.interface.picUpload.url, 'id_pic' ,tempFilePaths[0],{}, function (res) {
          console.log("上传的返回："+JSON.stringify(res));

          //显示本地路径
          that.setData({
            id_pic_path: tempFilePaths,
            id_pic: res.data.id 
          });

          wx.hideLoading();
        });
      }
    })    
  },
  //删除手持身份照片
  deleteIdCard: function () {
    var that = this;

    common.request(api.interface.picUploadRemove.url, {
      name: 'id_pic'
    }, function (res) {
      //显示本地路径
      that.setData({
        id_pic_path: ''
      });
    });

  },  
  //上传身份证正面照片
  uploadIdFront: function () {
    var that = this;

    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(res);
        common.showLoading("上传中")

        common.uploadImg(api.interface.picUpload.url, 'id_front_pic', tempFilePaths[0], {}, function (res) {
          console.log(res);

          //显示本地路径
          that.setData({
            id_front_path: tempFilePaths,
            id_front: res.data.id 
          });

          wx.hideLoading();
        });
      }
    })
  },
  //删除身份证正面照片
  deleteIdFront: function () {
    var that = this;

    common.request(api.interface.picUploadRemove.url, {
      name: 'id_front_pic'
    }, function (res) {
      console.log(JSON.stringify(res));
      //显示本地路径
      that.setData({
        id_front_path: ''
      });
    });

  },  
  //上传身份证背面照片
  uploadIdBack: function () {
    var that = this;

    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        common.showLoading("上传中")

        common.uploadImg(api.interface.picUpload.url, 'id_back_pic',tempFilePaths[0], {}, function (res) {
          console.log(res);

          //显示本地路径
          that.setData({
            id_back_path: tempFilePaths,
            id_back: res.data.id 
          });

          wx.hideLoading();
        });
      }
    })
  },
  //删除身份证背面照片
  deleteIdBack: function () {
    var that = this;

    common.request(api.interface.picUploadRemove.url, {
      name: 'id_back_pic'
    }, function (res) {
      console.log(JSON.stringify(res));
      //显示本地路径
      that.setData({
        id_back_path: ''
      });
    });

  },    
  formSubmit: function (e) {
    console.log("我进来了！！！！" + JSON.stringify(e));
    var that = this;
    var bind_bank_card_way = that.data.typeID;  //银行卡方式
    var bank_id = that.data.bankID; //银行id
    var bank_card_number = e.detail.value.bank_card_number; //银行卡号
    var bank_card_pic = that.data.bank_card_id; //银行卡照片
    var id_pic = that.data.id_pic;   //手持身份证照片
    var id_front_pic = that.data.id_front;
    var id_back_pic = that.data.id_back;
    

    if (!judge(typeof (id_pic) == 'undefined' || "" == common.trim(id_pic), "请上传手持身份证照片", that)) return;
    if (!judge(typeof (id_front_pic) == 'undefined' || "" == common.trim(id_front_pic), "请上传身份证正面照片", that)) return;
    if (!judge(typeof (id_back_pic) == 'undefined' || "" == common.trim(id_back_pic), "请上传身份证背面照片", that)) return;

    common.request(api.interface.step3.url, {
      bind_bank_card_way: bind_bank_card_way,
      bank_id: bank_id,
      bank_card_number: bank_card_number,
      bank_card_pic: bank_card_pic,
      id_pic: id_pic,
      id_front_pic: id_front_pic,
      id_back_pic: id_back_pic,
    }, function (res) {
      console.log("这个是第三部：" + JSON.stringify(res));
      common.resCallback(res, that, function () {
        console.log("我进来第三部的了：" + JSON.stringify(res));
        common.redirect("index_3");
      });

    });
  }
})