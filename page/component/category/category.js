const db = wx.cloud.database();
Page({
    data: {
        category: [
            {name:'蔬菜',id:'shucai'},
            {name:'肉类',id:'roulei'},
            {name:'主食',id:'zhushi'},
            
        ],
        goods:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onReady(){
      var that = this;
      wx.cloud.callFunction({
        name: 'getgoodslist',
        complete: res => {
          console.log('成功: ', res);
          let listdata=res.result.data;
          for(let i=0;i<listdata.length;i++){
            if(!listdata[i].num){
            listdata[i].num=0;
            }
          }
          that.setData({
            goods: listdata,
          })
          console.log('result: ', that.data);
        }
      })
        
        
    },
    onShow(){
      // var that = this;
      // try {
      //   var value = wx.getStorageSync('goods')
      //   if (value) {
      //     console.log(value)
      //     // Do something with return value
      //     that.setData({
      //       goods: value,
      //     })
         
      //   }
      // } catch (e) {
      //   // Do something when catch error
      // }
    },
  /**
 * 绑定加数量事件
 */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let goods = this.data.goods;
    let num = goods[index].num;
    num = num + 1;
    goods[index].num = num;
    this.setData({
     goods: goods
    });
  },

  /**
   * 绑定减数量事件
   */
  addToCart(){ 
    let cart=[];
    for(let i of this.data.goods){
     
      if(i.num>0){
        i.selected=true;
        cart.push(i);
      }
    }
  console.log('cart',cart)
    wx.setStorage({
      key: 'goods',
      data: cart,
    })
  },
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let goods = this.data.goods;
    let num = goods[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    goods[index].num = num;
    this.setData({
      goods: goods
    });
  },

    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
        
    }
    
})