<template>
  <div id="spinner" class="text-center">
    <b-spinner variant="primary" label="Spinning" style="width: 5rem; height: 5rem;"></b-spinner>
  </div>
</template>

<script>
export default {
  name: "Spinner"
}
</script>

<style scoped>

#spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 206px);
}
</style>