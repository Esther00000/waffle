import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
const cartStore = defineStore("cart", {
  state: () => ({
    carts: [],
    totalQty: 0,
    totalPrice: 0,
  }),
  actions: {
    // 取得購物車
    getCart() {
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/cart`;
      axios
        .get(url)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.productAmount();
          this.total();
        })
        .catch((err) => {
          alert(err);
        });
    },
    // 加入購物車
    addToCart(dataId, qty = 1) {
      // 要更新的資源的 URL
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/cart`;
      // 要傳遞的資料,更新的屬性和值
      const cart = {
        product_id: dataId,
        qty: qty,
      };
      axios
        .post(url, { data: cart })
        .then((res) => {
          Swal.fire({
            title: "已加入購物車",
            icon: "success",
            timer: 1500,

            timerProgressBar: true,
            confirmButtonText: "確認",
          });
          this.getCart();
          console.log("this.carts:" + this.carts);
          console.log("addToCart" + res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 更新購物車
    updatedCart(id, qty = 1) {
      console.log(id, qty);
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`;
      const cart = {
        product_id: id,
        qty: qty,
      };
      axios
        .put(url, { data: cart })
        .then((res) => {
          console.log(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          console.log(err.data.message);
        });
    },
    // 總商品數量
    productAmount() {
      //加總購買數量
      return (this.totalQty = this.carts.reduce((total, item) => {
        return total + item.qty;
      }, 0));
    },
    // 總金額
    total() {
      return (this.totalPrice = this.carts.reduce((total, item) => {
        return total + item.qty * item.product.price;
      }, 0));
    },
    // 刪除單一產品
    deletProduct(id) {
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`;
      Swal.fire({
        title: "確定刪除此商品?",
        width: "20rem",
        icon: "question",
        confirmButtonText: "確認",
        showDenyButton: true,
        denyButtonText: "取消",
      }).then((res) => {
        if (res.isConfirmed) {
          axios
            .delete(url)
            .then((res) => {
              this.getCart();
              console.log("deletProduct" + res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    // 清除購物車
    deletAllProducts() {
      const url = `${VITE_URL}/v2/api/${VITE_PATH}/carts`;
      axios
        .delete(url)
        .then((res) => {
          this.getCart();
          console.log("deletAllProduct" + res.data.data);
        })
        .catch((err) => {
          console.log(err.data.message);
        });
    },
  },
});

export default cartStore;
