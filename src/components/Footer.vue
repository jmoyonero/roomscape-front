<template>
  <footer>
    <section>&copy; 2021 Copyright:</section>
    <a href="https://www.roomscape.es"> www.roomscape.es </a>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
footer {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: fixed; */
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #232323;
  color: aliceblue;
}
section{
  padding-right: 10px;
}
</style>