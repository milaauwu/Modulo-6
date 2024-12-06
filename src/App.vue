<template>
  <div>
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/NavbarPage.vue';

export default {
  name: 'App',
  components: {
    Navbar, 
  },
};
</script>

<style>
body {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.pinimg.com/736x/32/31/e2/3231e25e0a79cd8526bf645df349c3ef.jpg');
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
}
::-webkit-scrollbar{
    width: 25px;
}
::-webkit-scrollbar-track{
    background: #d38686;
}
::-webkit-scrollbar-thumb{
    background: #ca5959;
    border-radius: 30px;
    border: 3px solid rgba(255, 255, 255, 0.687);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
