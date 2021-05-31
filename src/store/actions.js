const actions = {
    addCart(context,payload){
        // 1.查看是否添加过
        const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    
        // 2.+1或者新添加
        if (oldProduct) {
          context.commit("addCount",oldProduct)
        } else {
          payload.count = 1 //新商品添加属性 数量为一
          context.commit("addPro",payload)
        }
      }
}

export default actions