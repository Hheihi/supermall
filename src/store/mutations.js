const mutations = {
    // 购物车中已有的商品数量加1
    addCount(state, payload) {
        payload.count++
    },
    //购物车中添加新的商品
    addPro(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}
export default mutations