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
      image: '',
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
  onLoad : function(){
    var that = this;
    //初始化数据
    data.initData(common, api.interface.getEmployeeInfo.url, function (result) {
      if (result.allow_edit == 0){
        common.showToast("你已经完善过资料",'loading');
        setTimeout(function () {
          common.redirect("../index/index");
        }, 1000);
        return;        
      }
      console.log("员工信息:" +　JSON.stringify(result));
      that.setData({
        staffName: result.name,
        mobile: result.mobile,
        id_number: result.id_number
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
    isAgree: false,

    sex: [
      {
        id: 1,
        text: "男",
      },
      {
        id: 2,
        text: "女",
      }
    ],
    sexIndex: 0,
    sexID: 1,

    //学历
    education: [
      {
        id: 1,
        text: "小学及以下"
      },
      {
        id: 2,
        text: "初中"
      },
      {
        id: 3,
        text: "中专"
      },
      {
        id: 4,
        text: "高职/高中"
      },
      {
        id: 5,
        text: "大专"
      },
      {
        id: 6,
        text: "本科及以上"
      },
    ],
    educationIndex: 0,
    educationID: 1,   

    marital: [
      {
        id: 1,
        text: "未婚",
      },
      {
        id: 2,
        text: "已婚",
      }
    ],
    maritalIndex: 0,
    maritalID: 1,  

    anmelden_nature: [
      {
        id: 1,
        text: "外地城镇",
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
    anmelden_natureID: 1,       

    //上一家工作时间
    date1: common.getNowFormatDate(),
    date2: common.getNowFormatDate(),
    //教育起止时间
    education_start: common.getNowFormatDate(),
    education_end: common.getNowFormatDate(),    

    health_info_1: [
      {
        id: 0,
        text: "否",
      },
      {
        id: 1,
        text: "是",
      }
    ],
    health_info_1Index: 0,
    health_info_1ID: 0,  

    health_info_2: [
      {
        id: 0,
        text: "否",
      },
      {
        id: 1,
        text: "是",
      }
    ],
    health_info_2Index: 0,
    health_info_2ID: 0,  

    health_info_3: [
      {
        id: 0,
        text: "否",
      },
      {
        id: 1,
        text: "是",
      }
    ],
    health_info_3Index: 0,
    health_info_3ID: 0,          

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
  bindSexChange : function(e){
    var index = e.detail.value
    this.setData({
      sexIndex: index,
      sexID :　sex[index].id
    })    
  },
  bindEducationChange : function(e){
    var index = e.detail.value
    this.setData({
      educationIndex: index,
      educationID: 　education[index].id
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
  bindMaritalChange: function (e) {
    var index = e.detail.value;
    this.setData({
      maritalIndex: index,
      maritalID: 　marital[index].id
    })
  },  
  bindanMelden_natureIndexlChange: function (e) {
    var index = e.detail.value;
    this.setData({
      anmelden_natureIndex: index,
      anmelden_natureID : anmelden_nature[index].id
    })
  },    
  bindDateChange1: function (e) {
    this.setData({
      date1: e.detail.value
    });
  },
  bindDateChange2: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },  
  education_start: function (e) {
    this.setData({
      education_start: e.detail.value
    });
  },
  education_end: function (e) {
    this.setData({
      education_end: e.detail.value
    })
  },  
  //相关条款
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  formSubmit: function (e) {
    console.log("我进来了");
    var that = this;
    var sex = that.data.sexID; console.log("sex:" + sex);
    var email = e.detail.value.email; console.log("email:" + email);
    var education = that.data.educationID; console.log("education:" + education);
    var major = e.detail.value.major; console.log("major:" + major);
    var provinceID = that.data.provinceID; console.log("provinceID:" + provinceID);
    var cityID = that.data.cityID; console.log("cityID:" + cityID);
    var marital = that.data.maritalID; console.log("marital:" + marital);
    var anmelden_nature = that.data.anmelden_natureID; console.log("anmelden_nature:" + anmelden_nature);
    var anmelden_address = e.detail.value.anmelden_address; console.log("anmelden_address:" + anmelden_address);
    var residential_address = e.detail.value.residential_address; console.log("residential_address:" + residential_address);    

    var ecp_name = e.detail.value.ecp_name; console.log("ecp_name:" + ecp_name);
    var ecp_relation = e.detail.value.ecp_relation; console.log("ecp_relation:" + ecp_relation);
    var ecp_mobile = e.detail.value.ecp_mobile; console.log("ecp_mobile:" + ecp_mobile);


    var last_work_unit_name = e.detail.value.last_work_unit_name; console.log("last_work_unit_name:" + last_work_unit_name);
    var last_work_start = e.detail.value.last_work_start; console.log("last_work_start:" + last_work_start);
    var last_work_end = e.detail.value.last_work_end; console.log("last_work_end:" + last_work_end);  
    var last_work_position = e.detail.value.last_work_position; console.log("last_work_position:" + last_work_position);     
    var last_work_dimission_reason = e.detail.value.last_work_dimission_reason; console.log("last_work_dimission_reason:" + last_work_dimission_reason);   
    var last_work_certifier_name = e.detail.value.last_work_certifier_name; console.log("last_work_certifier_name:" + last_work_certifier_name);  
    var last_work_certifier_phone = e.detail.value.last_work_certifier_phone; console.log("last_work_certifier_phone:" + last_work_certifier_phone);    

    var health_info_1 = e.detail.value.health_info_1; console.log("health_info_1:" + health_info_1);  
    var health_info_2 = e.detail.value.health_info_2; console.log("health_info_2:" + health_info_2);   
    var health_info_3 = e.detail.value.health_info_3; console.log("health_info_3:" + health_info_3);   

    var family_member_name = e.detail.value.family_member_name; console.log("family_member_name:" + family_member_name);
    var family_member_relation = e.detail.value.family_member_relation; console.log("family_member_relation:" + family_member_relation);
    var family_member_job = e.detail.value.family_member_job; console.log("family_member_job:" + family_member_job);  
    var family_member_mobile = e.detail.value.family_member_mobile; console.log("family_member_mobile:" + family_member_mobile);    

    var education_start = e.detail.value.education_start; console.log("education_start:" + education_start);
    var education_end = e.detail.value.education_end; console.log("education_end:" + education_end);
    var education_ = e.detail.value.education_; console.log("education_:" + education_);
    var education_maior = e.detail.value.education_maior; console.log("education_maior:" + education_maior);   
    var education_school = e.detail.value.education_school; console.log("education_school:" + education_school);    

    var promise = that.data.isAgree; console.log("promise:" + promise);   


    common.request(api.interface.fillinfo.url, {
      sex: sex,
      email: email,
      education: education,
      major: major,
      provinceID: provinceID,
      cityID: cityID,
      marital: marital,
      anmelden_nature: anmelden_nature,
      anmelden_address: anmelden_address,
      residential_address: residential_address ,

      ecp_name: ecp_name,
      ecp_relation: ecp_relation,
      ecp_mobile: ecp_mobile,

      last_work_unit_name: last_work_unit_name,
      last_work_start: last_work_start,
      last_work_end: last_work_end,
      last_work_position: last_work_position,
      last_work_dimission_reason: last_work_dimission_reason,
      last_work_certifier_name: last_work_certifier_name,
      last_work_certifier_phone: last_work_certifier_phone,

      health_info_1: health_info_1,
      health_info_2: health_info_2,
      health_info_3: health_info_3,

      family_member_name: family_member_name,
      family_member_relation: family_member_relation,
      family_member_job: family_member_job,    
      family_member_mobile: family_member_mobile, 

      education_start: education_start,   
      education_end: education_end, 
      education_: education_,
      education_maior: education_maior,
      education_school: education_school,

      promise: promise ? 1 : 0

    }, function (res) {
      console.log("这个是第三部：" + JSON.stringify(res));

      if (res.status == 1) {
        common.showToast("提交成功，等待相关人员审核");
        setTimeout(function () {
          common.redirect("../index/index");
        }, 1000)
      } else {
        wx.showToast({
          title: res.info,
          icon: 'loading',
          image: '',
          duration: 2000
        })
      }      
    },true);
  }      
})