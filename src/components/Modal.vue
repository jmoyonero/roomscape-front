<template>
  <div class="main_container_modal">
    <b-alert
        :show="timeToShow"
        @dismissed="timeToShow=0"
        @dismiss-count-down="timeToShow"
        :variant="variant">
      <h4 class="alert-heading">{{ this.title }}</h4>
      <p>
        {{ this.message }}
      </p>
      <hr>
      <p class="mb-0">
        Identificador: {{ this.id }}.
      </p>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: true,
    }
  },
  props: {
    timeToShow: Number,
    message: String,
    title: String,
    variant: String,
    id: Number
  }
}
</script>

<style scoped>
.main_container_modal {
  width: 100%;
  height: 100px;
}
</style>