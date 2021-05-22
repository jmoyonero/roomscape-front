<template>
  <div id="new_escape_room_form">
    <h1>Reserva de {{ escapeRoom.nombre }}</h1>
    <b-form v-if="show" @submit="showSelectedValues">

      <b-form-group
          id="input-group-duration"
          label="Duración:"
          label-for="input-duration"
      >
        <b-form-input
            id="input-duration"
            v-bind:value="escapeRoom.duracion + ' minutos'"
            placeholder=""
            class="text-center"
            disabled
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-price"
          label="Precio:"
          label-for="input-price"
      >
        <b-form-input
            id="input-price"
            v-bind:value="escapeRoom.precio + ' €'"
            placeholder=""
            class="text-center"
            disabled
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-capacity"
          label="Capacidad de personas:"
          label-for="input-capacity"
          :description="'La capacidad máxima es: ' + escapeRoom.capacidadPersonas"
      >
        <b-form-input
            id="input-capacity"
            v-model="form.capacidadPersonas"
            type="number"
            min="1"
            :max="escapeRoom.capacidadPersonas"
            :state="capacityValidator"
            aria-describedby="input-live-help input-live-feedback"
            class="text-center"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-date"
          label="Selecciona la fecha y hora:"
          label-for="datepicker-start-date"
      >
        <b-form-datepicker
            id="datepicker-start-date"
            v-model="date"
            :min="minDate"
            class="mb-2"
            @context="onContext"
        ></b-form-datepicker>
        <b-form-select
            :disabled="this.date==null"
            v-model="time"
            :options="timeOptions"
            class="text-center"
        ></b-form-select>
      </b-form-group>

      <div id="buttons" class="d-flex justify-content-between">
        <b-button class="button" type="submit" variant="primary" :disabled="this.time==null || !capacityValidator">
          Reservar
        </b-button>
        <b-button class="button" type="reset" variant="danger">Cancelar</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewReservation",
  data() {
    return {
      form: {
        id: '',
        nombre: '',
        capacidadPersonas: '',
        duracion: '',
        precio: ''
      },
      escapeRoom: {},
      reservas: [
        {
          id: '1',
          fechaInicio: '2021-05-16 13:00:00'
        },
        {
          id: '1',
          fechaInicio: '2021-05-16 13:30:00'
        }
      ],
      date: null,
      time: null,
      timeOptions: [],

      minDate: new Date(),

      show: true,
      showSearchButton: true,
      selected: null,
    }
  },
  created() {
    this.getEscapeRoom()
  },
  mounted() {
    this.generateTimes()
  },
  computed: {
    capacityValidator() {
      if (this.form.capacidadPersonas == '') return null
      return this.form.capacidadPersonas <= this.escapeRoom.capacidadPersonas;
    },
    dateSelectedValidator() {
      return true
    }
  },
  methods: {
    getEscapeRoom() {
      axios
          .get('http://localhost:8080/escape-room/' + this.$route.params.id)
          .then(response => {
            this.escapeRoom = response.data
          })
      axios
          .get('http://localhost:8080/reservation/list?escapeRoomId=' + this.$route.params.id)
          .then(response => {
            this.reservas = response.data
          })
    },
    createReservation() {
      axios
          .get('http://localhost:8080/reservation/create' + this.$route.params.id)
          .then(response => {
            this.escapeRoom = response.data
          })
    },

    showSelectedValues() {
      alert(this.time + '  ' + this.date)
    },
    onContext() {
      this.generateTimes()
    },
    generateTimes() {

      let times = []

      let openingHours = new Date(this.date)
      openingHours.setHours(9, 0, 0)

      let closingHours = new Date(this.date)
      closingHours.setHours(22, 0, 0)

      while (openingHours.getTime() + this.escapeRoom.duracion * 60000 <= closingHours.getTime()) {
        let endDate = new Date(openingHours.getTime() + this.escapeRoom.duracion * 60000)

        let reservations = this.reservas.filter(r => new Date(r.fechaInicio).getTime() >= openingHours.getTime() && new Date(r.fechaInicio).getTime() < endDate.getTime())
        times.push(
            {
              value: openingHours,
              text: openingHours.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}),
              disabled: reservations.length > 0
            }
        )
        openingHours = endDate
      }

      this.timeOptions = times
      this.reservas.filter(reservation => reservation.activo)
    }
  }
}
</script>

<style scoped>
#new_escape_room_form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button {
  width: 100px;
}

select {
  text-align-last: center;
  padding-left: 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: center;
}

</style>