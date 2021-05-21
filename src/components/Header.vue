<template>
  <header>
    <a class="link" href="/">
      <div class="name">RoomScape</div>
    </a>
    <a class="link" href="/">
      <img href="/" class="logo" src="../../public/images/roomscape_logo.png">
    </a>
    <div class="ml-auto">
      <b-button class="logout-button btn btn-dark" href="/logout" v-if="showLogoutButton">Cerrar Sesión</b-button>
      <b-avatar id="avatar" href="/login" size="5rem" variant="dark"></b-avatar>
    </div>
  </header>
</template>


<script>
export default {
  name: "Header",
  computed: {
    showLogoutButton(){
      return (this.$cookies.get("Session")) ? true : false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chango&display=swap');

header {
  display: flex;
  align-items: center;
  background-color: #007bff;
  color: black;
  padding: 0 15px;
}

@media (max-width: 768px) {
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
  }
}

@media (max-width: 768px) {
  #avatar {
    display: none;
  }
}


.name {
  font-family: 'Chango', cursive;
  font-size: 40px;
  line-height: 100px;
  height: 100px;
}

@media (max-width: 768px) {
  .name {
    display: none;
  }
}

.logo {
  height: 80px;
}

.link {
  color: black;
  text-decoration: none;
}

.logout-button {
  margin-right: 20px;
}

</style>