// page/component/orders/orders.js
const db = wx.cloud.database();
Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    orders:[
        
      ]
  },

  onReady() {
    this.getTotalPrice();
  },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
    wx.getStorage({
      key: 'goods',
      success(res) {
        self.setData({
          orders: res.data,
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    if (!this.data.hasAddress){
      wx.showModal({
        title: '提示',
        content: '请填写地址',
        text: 'center',
        complete() {
          wx.switchTab({
            url: '/page/component/order/order'
          })
        }
      })
    }
    
  },
  dingdan:function(){
    var that=this;
    db.collection('maicai-dingdan').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        shijian: (new Date()).Format("yyyy-MM-dd hh:mm"),
        dizhi: that.data.address,
        dindan: that.data.orders,
        shijiancuo:Date.parse(new Date())/1000,
        fahuo: '否',
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  }
})