<script>
    import { RouterView, RouterLink } from 'vue-router'
    import { mapActions, mapState } from 'pinia'; 
    import cartStore from '../stores/cart';
    export default {
      components:{ 
        RouterView,
        RouterLink,
      },
      computed:{
        ...mapState(cartStore,['totalQty']),
      },
      methods: {
        ...mapActions(cartStore,['getCart']),
        toggleFormVisibility() {
          const formCollapse = this.$refs.formCollapse;
          if (formCollapse.classList.contains("show")) {
            formCollapse.classList.remove("show");
          } else {
            formCollapse.classList.add("show");
          }
        },
        scrollToTop() {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      },
      mounted() {
        this.getCart()
      },
    }
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
        <div class="container">
          <!-- logo -->
          <RouterLink to="/" class="navbar-brand text-primary" @click="toggleFormVisibility"><img src="../assets/images/navbar/logo.png" class="w-50 " alt=""></RouterLink>
          <!-- menu-btn for mobile -->
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- menu content -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="formCollapse">
            <!-- menu List -->
            <!-- ms-auto : 列表向右靠 -->
            <ul class="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
              <li class="nav-item mx-3">
                <RouterLink to="/" class="nav-link fs-3" @click="toggleFormVisibility">首頁</RouterLink>
              </li>
              <li class="nav-item mx-3">
                <RouterLink to="/category/全部" class="nav-link fs-3" @click="toggleFormVisibility">產品列表</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/cart" class="btn btn-outline-primary border-0 " @click="toggleFormVisibility">
                  <i class="bi bi-cart-fill fs-2 position-relative">
                    <span class="position-absolute top-50 start-50 translate-middle  badge rounded-pill fs-5">
                    {{ totalQty }}
                  </span>
                  </i>
                  <span class="d-lg-none">購物車</span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
    </nav>
    <a href="#" class="btn btn-primary rounded-circle position-fixed" style="bottom: 1rem; right: 2rem;" data-aos="fade-up" data-aos-offset="200" data-aos-duration="200"  data-aos-easing="ease-in-out" @click="scrollToTop">
      <i class="bi bi-arrow-up"></i>
    </a>
    <RouterView></RouterView>

    <footer>
      <div class="container pt-5">
        <div class="row">
          <div class="col-12 col-lg-6" data-aos="zoom-in">
            <h2 class="text-primary text-center mb-4">\ 鬆餅專賣店 /</h2>
            <div class="text-center">
              <img src="/images/navbar/logo.png" class="img-fluid" alt="" />
            </div>
          </div>
          <div class="col-12 col-lg-6" data-aos="zoom-in">
            <div class="my-3">
              <ul class="list-unstyled">
                <li class="mb-2">聯絡專線 : <span>0800-123-456</span></li>
                <li class="mb-2">服務店址 : <span>XX市XX區XX路XX巷</span></li>
                <li class="mb-2">
                  營業時間 : <span>10: 30～21:00（每週四公休）</span>
                </li>
              </ul>
              <div class="row row-cols-1">
                <div class="col">
                  <ul class="list-unstyled d-flex">
                    <li><span class="me-2">Follow Us</span></li>
                    <li><i class="bi bi-instagram p-1"></i></li>
                    <li><i class="bi bi-facebook p-1"></i></li>
                    <li><i class="bi bi-envelope p-1"></i></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- copyright -->
          <div class="col-12 text-center mt-3" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
            <h5>Copyright © 2023 僅個人作品使用，無任何商業用途</h5>
          </div>
        </div>
      </div>
    </footer>
</template>

<style>
  .overlay {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s;
  }

  .card:hover .overlay {
    opacity: 1;
  }
</style>
                