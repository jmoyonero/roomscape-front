<template>
  <header>
    <a class="link" href="/">
      <div class="name">RoomScape</div>
    </a>
    <a class="link" href="/">
      <img href="/" class="logo" src="../../public/images/roomscape_logo.png">
    </a>

    <b-avatar id="avatar" href="/registro" size="5rem" variant="dark" class="ml-auto"></b-avatar>
  </header>
</template>


<script>
export default {
  name: "Header"
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

</style>