var common = require('../../../../common/common.js');
var api = require('../../../../common/api.js');

var sourceType = [ ['camera'], ['album'], ['camera', 'album'] ]
var sizeType = [ ['compressed'], ['original'], ['compressed', 'original'] ];


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
    bl_id : '',

    showTopTips: false,
    errorMsg: "",

    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 0,
    count: [1]
  },
  chooseImage: function () {
    var that = this;

    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;

        common.showLoading("上传中")

        common.uploadImg(api.interface.blUpload.url, '',tempFilePaths[0],{
          name: 'bl_pic'
        },function(res){
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
      bl_id: 　bl_id
    }, function (res) {
      common.resCallback(res, that, function () {
        common.navigate("step?route=step_4");
      });
    })
  }
})
