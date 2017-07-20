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
    wx.showToast({
      title: tips,
      icon: 'success',
      image : '',
      duration: 2000
    })    
    // common.isError(tips, context);
    return false;
  } else {
    // wx.showToast({
    //   title: tips,
    //   icon: 'success',
    //   image: '',
    //   duration: 2000
    // })     
    // common.clearError(context);
    return true;
  }
}


Page({
  onLoad: function () {
    var that = this;
    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      that.setData({
        staffName: result.name,
        id_number: result.id_number,
        mobile: result.mobile
      });
    });

    common.request(api.interface.getAreaAjax.url, {}, function (res) {
      console.log(JSON.stringify(res));
      that.setData({
        province: res.data,
        provinceID: res.data[0].id,
        provinceIndex: 0   //省份ID
      });

      common.request(api.interface.getAreaAjax.url, {
        id: res.data[0].id
      }, function (res) {
        that.setData({
          city: res.data,
          cityID: res.data[0].id,
          cityIndex: 0   //城市ID
        });
      });

    });

  },
  /**
   * 页面的初始数据
   */
  data: {
    navHide: true,
    dropdownHide: true,
    showModal: false,
    list: data.nav.navList,

    idCard_path: "",  //身份证路径

    checkboxItems: [
      { name: 'id_card_expiry_date_long', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],    

    //证件类型
    certificates: [{
      id : 0,
      text: "身份证"
    }],
    certificatesID : 0,
    certificatesIndex: 0,

    anmelden_nature: [
      {
        id : 1,
        text : "外地城镇",
      },
      {
        id: 2,
        text: "外地农村",
      },
      {
        id: 3,
        text: "本地城镇",
      },
      {
        id: 4,
        text: "本地农村",
      }
    ],
    anmelden_natureIndex: 0,
    anmelden_natureID :0,

    marital: [
      {
        id : 1,
        text : "未婚",
      },
      {
        id: 2,
        text: "已婚",
      }
    ],
    maritalIndex : 0,
    maritalID : 0,


    //学历
    education : [
      {
        id : 0,
        text : "小学及以下"
      },
      {
        id: 1,
        text: "初中"
      },
      {
        id: 2,
        text: "中专"
      },
      {
        id: 3,
        text: "高职/高中"
      },
      {
        id: 4,
        text: "大专"
      },
      {
        id: 5,
        text: "本科及以上"
      },
    ],
    educationIndex : 0,
    educationID : 0,

    //身份证起止日期
    date1: '2016-09-01',
    date2: '2016-09-01',

    id_card_expiry_date_long: 0,

    filePath : '',
    id_pic_id : ''
  },
  navToggle: function () {
    var navHide = this.data.navHide;
    this.setData({
      navHide: !navHide
    });
  },
  dropdownToggle: function () {
    var dropdownHide = this.data.dropdownHide;
    this.setData({
      dropdownHide: !dropdownHide
    });
  },
  itemToggle: function (e) {
    var id = e.currentTarget.id,
      list = this.data.list;

    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }

    this.setData({
      list: list
    });
  },
  bindDateChange1: function (e) {
    this.setData({
      date1: e.detail.value
    })
  },  
  bindDateChange2: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },   
  bindProvinceChange: function (e) {
    var that = this;
    var val = e.detail.value;   //当前选择的值
    var provinceID = that.data.province[val].id;   //省份ID
    that.setData({
      provinceIndex: val,
      provinceID: provinceID
    });
    common.request(api.interface.getAreaAjax.url, {
      id: provinceID
    }, function (res) {
      that.setData({
        city: res.data,
        cityID: res.data[0].id,
        cityIndex: 0   //城市ID
      });
    });
  },
  bindCityChange: function (e) {
    var that = this;
    var index = e.detail.value;   //当前选择的值
    var id = that.data.city[index].id;
    that.setData({
      cityIndex: index,
      cityID: id
    })
  },
  bindanMelden_natureIndexlChange: function (e) {
    this.setData({
      anmelden_natureIndex: e.detail.value
    })
  },  
  bindMaritalChange : function(e){
    this.setData({
      maritalIndex: e.detail.value
    })
  },
  bindEducationChange : function(e){
    this.setData({
      educationIndex: e.detail.value
    })    
  },
  //上传身份证复印件
  uploadIdCard: function () {
    var that = this;

    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(res);
        common.showLoading("上传中")

        common.uploadImg(api.interface.idCardUpload.url, '', tempFilePaths[0], {}, function (res) {
          console.log("上传的返回：" + JSON.stringify(res));
          //显示本地路径
          that.setData({
            idCard_path: tempFilePaths,
            id_pic_id: res.result.file.id
          });

          wx.hideLoading();
        });
      }
    })
  },
  //相关条款
  bindAgreeChange: function (e) {
    console.log("我去选的时候:" + e.detail.value.length);
    this.setData({
      id_card_expiry_date_long: !!e.detail.value.length
    });
  },  
  formSubmit: function (e) {
    console.log("我进来了！！！！" + JSON.stringify(e));
    var that = this;
    //银行卡号
    var mobile = e.detail.value.mobile;   console.log("mobile：" + mobile);
    var id_card_effective_date = e.detail.value.id_card_effective_date; console.log("id_card_effective_date：" + id_card_effective_date);
    var id_card_expiry_date = e.detail.value.id_card_expiry_date; console.log("id_card_expiry_date" + id_card_expiry_date);
    var id_card_organ = e.detail.value.id_card_organ; console.log("id_card_organ" + id_card_organ);

    var contact_address = e.detail.value.contact_address; console.log("contact_address" + contact_address);
    var nation = e.detail.value.nation; console.log("nation" + nation);
    var anmelden_nature = e.detail.value.anmelden_nature; console.log("anmelden_nature" + anmelden_nature);

    var domicile_pid = that.data.provinceID; console.log("domicile_pid" + domicile_pid);
    var domicile_cid = that.data.cityID; console.log("domicile_cid" + domicile_cid);
    var marital = e.detail.value.marital; console.log("marital" + marital);

    var education = e.detail.value.education; console.log("education" + education);
    var id_pic_id = that.data.id_pic_id; console.log("id_pic_id：" + id_pic_id);
    var id_card_expiry_date_long = that.data.cityID; console.log("id_card_expiry_date_long：" + id_card_expiry_date_long); console.log(e.detail.value);


    if (!judge("" == common.trim(id_card_organ), "请输入发证机关", that)) return;

    if (!judge("" == common.trim(contact_address), "请输入联系地址", that)) return;
    if (!judge("" == common.trim(nation), "请输入民族", that)) return;
    if (!judge("" == common.trim(id_pic_id), "请上传身份证复印件", that)) return;



    common.request(api.interface.socialsecuritycardapplication.url, {
      mobile: mobile,
      id_card_effective_date: id_card_effective_date,
      id_card_expiry_date: id_card_expiry_date,
      id_card_organ: id_card_organ,
      contact_address: contact_address,
      nation: nation,
      anmelden_nature: anmelden_nature,
      domicile_pid: domicile_pid,
      domicile_cid: domicile_cid,
      marital: marital,
      education: education,
      id_pic_id: id_pic_id,
      id_card_expiry_date_long: id_card_expiry_date_long,
    }, function (res) {
      console.log("这个是第三部：" + JSON.stringify(res));
      common.showToast("提交成功，等待相关人员审核");
      setTimeout(function () {
        common.redirect("social_security");
      }, 1000)

    });
  }  
})