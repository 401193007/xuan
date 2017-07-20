// pages/canvas/canvas.js
Page({

  //默认数据
  data :  {
    pen: 3, //画笔粗细默认值
    color: '#cc0033', //画笔颜色默认值
    path : ''   
  },
  startX: 0, //保存X坐标轴变量
  startY: 0, //保存Y坐标轴变量
  //手指触摸动作开始
  touchStart : function(e){
    //获取触摸点的坐标
    this.startX = e.changedTouches[0].x;
    this.startY = e.changedTouches[0].y ;

    //获取绘画执行上下文
    this.context = wx.createCanvasContext('myCanvas'); 


    // 在canvas绘制前填充白色背景   
    this.context.setFillStyle("white"); 
    this.context.fillRect(0, 0, 375, 212);

    this.context.setStrokeStyle(this.data.color);
    this.context.setLineWidth(this.data.pen);
    this.context.setLineCap('round');  //笔触圆滑
    


    this.context.beginPath();
  },
  //手指触摸后移动
  touchMove : function(e){

    var startX1 = e.changedTouches[0].x;
    var startY1 = e.changedTouches[0].y;

    this.context.moveTo(this.startX, this.startY);
    this.context.lineTo(startX1, startY1);
    this.context.stroke();

    this.startX = startX1;
    this.startY = startY1;    


    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions() // 获取绘图动作
    })

  },
  //手指触摸动作结束
  touchEnd: function () {

  },  
  saveImage : function(e){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {

        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            that.setData({
              path: savedFilePath
            });

          }
        })
        console.log(res.tempFilePath)
      }
    });

  },
  reset : function(e){
    var that = this;

    if(that.data.path == ''){
      wx.drawCanvas({
        canvasId: 'myCanvas',
        reserve: false,
        actions: [],
        // actions: this.context.clearActions() // 获取绘图动作数组
      });
    }else{
      wx.getSavedFileList({
        success: function (res) {
          console.log(res.fileList[0].filePath);
          if (res.fileList.length > 0) {
            wx.removeSavedFile({
              filePath: res.fileList[0].filePath,
              success: function (res) {
                that.setData({
                  path: ''
                });
                wx.drawCanvas({
                  canvasId: 'myCanvas',
                  reserve: false,
                  actions: [],
                  // actions: this.context.clearActions() // 获取绘图动作数组
                });
              }
            })
          }
        }
      })
    }



    // wx.removeSavedFile({
    //   filePath: this.data.path,
    //   success: function (res) {
    //     that.setData({
    //       path : ''
    //     });
    //   },
    //   fail : function(){
    //     console.log("我进来失败了！！！");
    //   }
    // })
    // wx.drawCanvas({
    //   canvasId: 'myCanvas',
    //   reserve: false,
    //   actions: [],
    //   // actions: this.context.clearActions() // 获取绘图动作数组
    // });    
    
  }
})