// page/component/addgoods/addgoods.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  name:'',
  price:'',
  goodsid:'',
  onsale: true,
  img:'',
    array: ['蔬菜', '肉类', '主食1'],
    index:0,
  },
  onLoad(e) {
    var that=this;
    if(e.id){
      db.collection('goods').doc(e.id).get({
        success: function (res) {
          // res.data 包含该记录的数据
          console.log(res.data)
          that.setData({
            //将id信息写入data
            goodsid: e.id,
            name:res.data.name,
            img:res.data.img,
            onsale: res.data.onsale,
            price:res.data.price,
            index:res.data.index,
            
          })
        }
      })
    
    }

  },
  bindPickerChange: function (e) {
    console.log('类型为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  selectList() {
    let onsale = this.data.onsale;
    onsale = !onsale;
    this.setData({
      onsale: onsale,
    });
    
  },
  savedata(e){
    var that=this;
    
    //如果是新加商品
    if(!this.data.goodsid){
      db.collection('goods').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          name: e.detail.value.name,
          price: e.detail.value.price,
          img:that.data.img,
          onsale:that.data.onsale,
          index:that.data.index,
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res);
          wx.showModal({
            title: '提示',
            content: '保存成功',
            showCancel: false
          })
        }
      })
    }
  else{
    //如果是修改商品信息。。
      db.collection('goods').doc(this.data.goodsid).update({
        // data 传入需要局部更新的数据
        data: {
          name: e.detail.value.name,
          price: e.detail.value.price,
          img: that.data.img,
          onsale: that.data.onsale,
          index:that.data.index,
        },
        success: function (res) {
          
          wx.showModal({
            title: '提示',
            content: '保存成功',
            showCancel: false
          })
        }
      })
  }

  },
  uploadimg(){
    var that=this;
    var count=0;
    
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          
          cloudPath: new Date().getTime()+'.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            count++;
            console.log(count)
            console.log('上传成功', res)
            that.setData({
              img:res.fileID,
            })
          },
        })
      },
    })
  },
})