import { ref } from 'vue';
import { defineStore } from 'pinia'

export const menuStore = defineStore('menu', () => {

  const menu = ref([
    { name: 'Cakekikcy ', img: 'https://i.pinimg.com/564x/d7/75/a9/d775a90e73fc827ef3b0dd0308ab05d6.jpg', price: 70 },
    { name: ' Orange Cake ', img: 'https://i.pinimg.com/564x/3f/66/df/3f66df4ba7d142bcd4c8995982613169.jpg', price: 45 },
    { name: ' pancakee ', img: 'https://i.pinimg.com/564x/99/c0/96/99c0965018ee6880edd6aebd267309d4.jpg', price: 60 },
    { name: 'st punt ', img: 'https://i.pinimg.com/564x/65/a3/53/65a353e65f0a48a4e1303380f673c7c4.jpg', price: 50 },
    { name: ' BingBing ', img: 'https://i.pinimg.com/564x/75/74/f3/7574f3f9f31c7738d4eae290dd1e7c67.jpg', price: 120 },
    { name: ' rainbow ', img: 'https://i.pinimg.com/564x/17/8b/e8/178be8b48a6ea8c97bf972c5e55154ad.jpg', price: 75 },
    { name: ' aloi ', img: 'https://i.pinimg.com/564x/4f/a8/95/4fa895e07e074a423187947f9cac4c0e.jpg', price: 45 },
    { name: ' Green tea Ice ', img: 'https://i.pinimg.com/564x/8d/cc/dd/8dccddc2276a390fd42b2a952b77230c.jpg', price: 80 },
  ])
    
  
  
  return { menu}
})
export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cartList: [], 
    orderList:[],
  }),
  actions: {
    addToCart(item) {
      this.cartList.push(item);
    },
    addOrderList() {
      // เพิ่มค่าลงไปใน orderList
      this.orderList.push(...this.cartList);
    
     this.cartList = [];
    },

  },
});
