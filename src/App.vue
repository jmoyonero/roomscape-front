<template>
  <div id="app">
    <Header/>
    <div id="main_container">
      <div class="view_container">
        <router-view class="views"/>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');

body {
  margin: 0;
}

#app {
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
}

#main_container {
  display: flex;
}

.view_container {
  width: 100%;
  height: auto;
}

.views {
  min-height: calc(100vh - 150px);
}
</style>
