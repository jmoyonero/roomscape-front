<template>
  <div></div>
</template>

<script>
export default {
  name: "UserLogOut",
  created() {
    this.$cookies.remove("Session")
    window.location.href = '/'
  }
}
</script>

<style scoped>

</style>