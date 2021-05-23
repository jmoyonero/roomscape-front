<template>

  <div>
    <Spinner v-if="showSpinner"></Spinner>
    <div id="escape_rooms_list" v-if="showView">
      <h1 class="escape_rooms_list_title">Escape Rooms</h1>
      <div class="escape_rooms_list_container">
        <div class="card_container" v-for="(item) in items" v-bind:key="item.id">
          <b-card
              :title=item.nombre
              :img-src='"https://picsum.photos/100/200/?image="+Math.floor(Math.random() * 50) + 1'
              img-alt="Image"
              img-left
              tag="article"
              style="max-width: 30rem; min-width: 30rem;"
              class="mb-2"
          >
            <b-card-text>
              Capacidad Máxima: <b>{{ item.capacidadPersonas }} personas</b>
            </b-card-text>
            <b-card-text>
              Duración: <b>{{ item.duracion }} minutos</b>
            </b-card-text>
            <b-card-text>
              Precio: <b>{{ item.precio }} €</b>
            </b-card-text>

            <b-button v-bind:href="reservationUrl(item.id)" variant="primary">Reservar</b-button>
          </b-card>
        </div>
        <p class="empty_msg" v-if="showEmptyMsg">En este momento no hay escape rooms disponibles.</p>
      </div>
    </div>
  </div>

</template>

<script>

import axios from "axios";
import Spinner from "@/components/Spinner";

export default {
  name: "ListEscapeRooms",
  components: {Spinner},
  data() {
    return {
      items: [],
      showEmptyMsg: false,
      logged: false,
      showView: false,
      showSpinner: true
    }
  },
  methods: {
    reservationUrl(id) {
      return this.$cookies.get("Session") ? '/reservas/alta/' + id : '/login'
    }
  },
  created() {

    let test = axios
        .get('https://backend-dev.roomscape.es/escape-room/list')
        .then(response => {
          this.items = response.data.filter(escapeRoom => escapeRoom.activo)
              .sort((a, b) => a.nombre.localeCompare(b.nombre))
          this.showEmptyMsg = this.items.length == 0
        })
    Promise.all([test])
        .then(() => {
          this.showView = true
          this.showSpinner = false
        })

  }
}
</script>

<style scoped>

.escape_rooms_list_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card_container {
  margin: 20px;
}

.escape_rooms_list_title {
  padding: 50px 0px;
}

img {
  height: 238px;
  width: 100px;
}
</style>