<script setup>
import { menuStore } from "../stores/counter";
import { useCartStore } from "../stores/counter";
import { computed } from "vue";
import { ref } from "vue";

const Cart = ref(0);

const menu = menuStore();
const shop_food = menu.menu;

const cartStore = useCartStore();
const Store = cartStore.cartList;

// สร้างคำนวณราคาสินค้าทั้งหมด
const totalPrice = computed(() => {
 
  return cartStore.cartList.reduce((total, item) => total + item.price, 0);
});

function addCart(name, img, price) {
  Cart.value++;

  // ตรวจสอบว่าสินค้ามีอยู่ในตระกร้าแล้วหรือไม่
  const existingItem = cartStore.cartList.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
    existingItem.price += price;
  } else {
    // InCart.value.push({ name, img, price, quantity: 1 });
    cartStore.addToCart({ name, img, price, quantity: 1 });
  }
}
function removeFromCart(item) {
  Cart.value -= item.quantity; //ทำการ ลบตัวเลขสินค้าจากตระกร้า
  totalPrice.value -= item.price; //ทำการลบ ราคารวม กับ ราคาสินค้าที่กดลบไป

  const itemIndex = Store.findIndex((cartItem) => cartItem.name === item.name); //หาชื่อสินค้าที่มันซ้ำกัน
  if (itemIndex !== -1) {
    const removedItem = Store.splice(itemIndex, 1)[0]; //ใช้ splice เพื่อลบออกจากอาร์เรย์ Store
    cartStore.removeFromCart(removedItem);
  }
}
function addOrderListz() {
  cartStore.addOrderList();
  Cart.value = 0;
}

</script>

<template>
  <div class="menu d-flex justify-content-between m-5">
    <h3 class="mx-5">♡ Bellazhop</h3>

    <div class="box-menu d-flex">
      <h3
        class="cart mx-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Cart[{{ Cart }}]
      </h3>
      <h3
        class="cart mx-2"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        
      </h3>
    </div>
  </div>

  <div class="container">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="(item, index) in shop_food" :key="index">
        <div class="card">
          <img :src="item.img" class="card-img-top" alt="Menu Image" />
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">price {{ item.price }} Baht</p>
          </div>
          <button @click="addCart(item.name, item.img, item.price)">
            Add ➕
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog w-50">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Product {{ Cart }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body w-75"
          v-for="(item, index) in cartStore.cartList"
          :key="index"
        >
          <div class="card mb-3" style="max-width: 540px">
            <div class="row-text g-0 m-2">
              <div class="col-md-4">
                <img
                  :src="item.img"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <p class="card-text">quantity {{ item.quantity }}</p>
                  <p class="card-text">
                    <small class="text-body-secondary">{{ item.price }}</small>
                  </p>
                </div>
              </div>
            </div>
            <button @click="removeFromCart(item)">Delete</button>
          </div>
        </div>

        <!-- แสดงราคารวมทั้งหมด -->
        <div class="row g-0 m-2">
          <div class="col-md-12">
            <div class="card-body">
              <h5 class="card-title">All prices</h5>
              <p class="card-text">{{ totalPrice }} Baht</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="addOrderListz()"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">รายการสั่งซื้อ</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
  

      <div class="row">
        <div
          class="col-sm-6 mb-3 mb-sm-0"
          v-for="(chosenItem, index) in cartStore.orderList"
          :key="index"
        >
          <div class="card">
            <img :src="chosenItem.img" alt="" srcset="" />
            <div class="card-body">
              <h5 class="card-title">{{ chosenItem.name }}</h5>
              <p class="card-text">ราคา {{ chosenItem.price }}</p>
              <p class="card-text">จำนวน {{ chosenItem.quantity }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Mali:wght@400;600&display=swap');

.menu {
  display: flex;
  border-radius: 30px;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background-color: #FFCCCC;
  color: rgb(5, 10, 3);
}

.menu h3 {
  margin: 0;
  font-size: 24px;
  font-family: 'Mali', cursive;
}

.box-menu {
  display: flex;
  align-items: center;
}

.cart {
  cursor: pointer;
  margin-right: 10px;
  font-weight: bold;
  text-decoration: underline;
}

.cart:hover {
  color: #fa510e;
  text-decoration: none;
}



.modal-content {
  max-height: 500px; 
  overflow-y: auto;
  font-family: 'Mali', cursive;
}
.cart {
  cursor: pointer;
  font-family: 'Mali', cursive;
  
}
.container {
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  font-family: 'Mali', cursive;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.25rem;
  font-family: 'Mali', cursive;
}

.card-text {
  font-weight: bold;
  font-family: 'Mali', cursive;
}
</style>
