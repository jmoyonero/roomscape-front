<template>
  <div id="app">
    <Header/>
    <NavigationMenu/>
    <div id="main_container">
      <div class="view_container">
        <div id="view">
          <router-view class="views"/>
        </div>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import NavigationMenu from "./components/NavigationMenu";

export default {
  name: 'App',
  components: {
    NavigationMenu,
    Header,
    Footer
  },
  data() {
    return {
      showSpinnerRoot: true
    }
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
  min-height: calc(100vh - 206px);
}

#view {
  min-height: calc(100vh - 206px);
}
</style>
