<script>
    import { RouterView } from 'vue-router';
    import AOS from 'aos';
    import 'aos/dist/aos.css'; // You can also use <link> for styles
    export default {
        components:{
            RouterView
        },
        mounted() {
            AOS.init({
                duration: 1000,
                once: false,
            });
        },
    }
</script>

<template>
    <RouterView></RouterView>
</template>



