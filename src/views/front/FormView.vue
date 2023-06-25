
<script>
  const {VITE_URL,VITE_PATH} = import.meta.env
  import Swal from "sweetalert2";
  import cartStore from "../../stores/cart";
  import { mapActions } from "pinia";
  export default {
    data() {
      return {
          form: {
            user:{
              name: "",
              tel: "",
              email: "",
              payment: "",
              delivery: "",
              address: "",
            }
        },
      }
    },
    methods: {
      ...mapActions(cartStore,['deletAllProducts']),
      createOrder() {
        const url = `${VITE_URL}/v2/api/${VITE_PATH}/order`;
        const order = this.form;
        Swal.fire({
        title: "確認送出表單",
        icon: "question",
        confirmButtonText: "確認",
        showDenyButton: true,
        denyButtonText: "取消",
      }).then((res) => {
        if (res.isConfirmed) {
          this.$http
          .post(url, { data: order })
          .then((res) => {
            this.deletAllProducts()
            this.$router.push('/ordered'); //跳轉至其他頁面
          })
          .catch((err) => {
            // alert(err.response.data.message);
            this.$refs.form.resetForm();
          });
        }
      });

      },
    },
  }

</script>

<template>
    <header
        class="d-flex align-items-center justify-content-center position-relative py-5"
        style="top: 56px"
      >
        <div class="text-primary m-auto">
          <h3 class="fw-bold text-center">訂購資料</h3>
        </div>
      </header>
    <div class="container p-4 my-4 shadow" style="max-width: 500px">
        <v-form ref="form" v-slot="{errors}" @submit="createOrder">
          <!-- 姓名 -->
          <div class="mb-3">
            <label for="name" class="form-label">姓名</label>
            <v-field type="text" class="form-control" id="name" name="姓名" :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"></v-field>
                <error-message
                name="姓名"
                class="invalid-feedback"
              ></error-message>
          </div>
          <!-- 電子信箱 -->
          <div class="mb-3">
              <label for="email" class="form-label">電子信箱</label>
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="form.user.email"
              ></v-field>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
          </div>
          <!-- 電話  -->
          <div class="mb-3">
            <label for="tel" class="form-label">電話</label>
            <v-field
              type="text"
              id="tel"
              name="電話"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required"
              v-model="form.user.tel"
            ></v-field>
            <error-message
              name="電話"
              class="invalid-feedback"
            ></error-message>
          </div>
          <!-- 支付方式 -->
          <div class="mb-3">
            <label for="payment" class="form-label">支付方式</label>
            <v-field
              as="select"
              id="payment"
              name="payment"
              class="form-select"
              :class="{ 'is-invalid': errors['payment'] }"
              rules="required"
              v-model="form.user.payment"
            >
              <option value="">選擇支付方式</option>
              <option value="credit">現金</option>
              <option value="debit">LINE PAY</option>
              <option value="paypal">信用卡</option>
            </v-field>
            <error-message name="payment" class="invalid-feedback">請選擇支付方式</error-message>
          </div>
         <!-- 配送方式 -->
          <div class="mb-3">
            <label for="delivery" class="form-label">配送方式</label>
            <v-field
              as="select"
              id="delivery"
              name="delivery"
              class="form-select"
              :class="{ 'is-invalid': errors['delivery'] }"
              rules="required"
              v-model="form.user.delivery"
            >
              <option value="">選擇配送方式</option>
              <option value="pickup">自取</option>
              <option value="delivery">外送</option>
            </v-field>
            <error-message name="delivery" class="invalid-feedback">請選擇配送方式</error-message>
          </div>
          <div v-if="form.user.delivery === 'delivery'" class="mb-3">
            <label for="address" class="form-label">送貨地址</label>
            <v-field
              type="text"
              id="address"
              name="address"
              class="form-control"
              placeholder="請輸入送貨地址"
              v-model="form.user.address"
            ></v-field>
           
          </div>

          <button type="submit" class="btn btn-primary w-100">提交</button>
        </v-form>
      </div>
</template>

