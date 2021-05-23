<template>
  <div>
    <Spinner v-if="showSpinner"></Spinner>

    <div id="new_escape_room_form" v-if="showView">
      <h1 class="new_reservation_title"> Reserva de {{ escapeRoom.nombre }}</h1>
      <b-form id="form_reservation" v-if="show" @submit="onSubmit" @reset="onReset">

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
              v-model="form.participantes"
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
            label="Elige la fecha:"
            label-for="datepicker-start-date"
        >
          <b-form-datepicker
              id="datepicker-start-date"
              v-model="date"
              :min="minDate"
              class="mb-2"
              @context="onContext"
              label-no-date-selected=""
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group
            id="input-group-time"
            label="Elige la hora:"
            label-for="select-time"
        >
          <b-form-select
              id="select-time"
              :disabled="this.date==null"
              v-model="form.fechaIni"
              :options="timeOptions"
              class="text-center"
          ></b-form-select>
        </b-form-group>

        <div id="buttons" class="d-flex justify-content-between">
          <b-button class="button" type="submit" variant="primary"
                    :disabled="this.form.fechaIni==null || !capacityValidator">
            Reservar
          </b-button>
          <b-button class="button" type="reset" variant="danger">Cancelar</b-button>
        </div>
      </b-form>
      <ModalMessage
          :message="modal.message"
          :title="modal.title"
          :variant="modal.variant"
          class="custom-modal"
      ></ModalMessage>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import ModalMessage from "@/components/Modal";
import Spinner from "@/components/Spinner";

export default {
  name: "NewReservation",
  components: {Spinner, ModalMessage},
  data() {
    return {
      form: {
        participantes: '',
        precio: '',
        duracion: '',
        cliente: '',
        nombreEscapeRoom: '',
        fechaIni: ''
      },
      showView: false,
      showSpinner: true,
      escapeRoom: {},
      reservas: [],
      date: null,
      time: null,
      timeOptions: [],

      minDate: new Date(),

      show: true,
      showSearchButton: true,
      selected: null,
      modal: {
        title: '',
        message: '',
        variant: '',
      }
    }
  },
  created() {
    let escapeRoom = axios
        .get('http://localhost:8080/escape-room/' + this.$route.params.id)
        .then(response => {
          /*return {
            success: true,
            data: response.data
          };*/
          this.escapeRoom = response.data
          this.showSpinner = false

        })
    let reservations = axios
        .get('http://localhost:8080/reservation/list?escapeRoomId=' + this.$route.params.id)
        .then(response => {
          /* return {
             success: true,
             data: response.data
           };*/
          this.reservas = response.data
        })
    Promise.all([escapeRoom, reservations])
        .then(() => {
          this.showView = true
          this.showSpinner = false
          if (!this.$cookies.get("Session")) window.location.href = '/login'
          else this.showView = true
        })
  },
  computed: {
    capacityValidator() {
      if (this.form.participantes == '') return null
      return this.form.participantes <= this.escapeRoom.capacidadPersonas;
    },
    dateSelectedValidator() {
      return true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.createReservation()
    },
    onReset(event) {
      event.preventDefault()

    },
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
      let reservation = this.form
      reservation.duracion = this.escapeRoom.duracion
      reservation.precio = this.escapeRoom.precio
      reservation.nombreEscapeRoom = this.escapeRoom.nombre
      reservation.cliente = atob(this.$cookies.get("Session")).split("-")[0]

      axios
          .post('http://localhost:8080/reservation/create', reservation)
          .then(response => {
            this.showSuccessModal(response.data)
            this.resetForm()
          })
          .catch(err => {
            this.showWarningModal(err.response.data)
          })
    },
    showSuccessModal(reservation) {
      this.$bvModal.show("modal")
      this.modal.title = "¡Operación Exitosa!"
      this.modal.message = "Se ha registrado correctamente el escape room: " + reservation.nombreEscapeRoom + " con la fecha " + reservation.fechaIni
      this.modal.variant = 'success'
    },
    showWarningModal(message) {
      this.$bvModal.show("modal")
      this.modal.message = message
      this.modal.title = "¡Operación Fallida!"
      this.modal.variant = 'warning'
    },

    resetForm() {
      this.form.fechaIni = ''
      this.form.participantes = ''
      this.date = null
    },
    showSelectedValues() {
      alert(this.time + '  ' + this.date)
    },
    onContext() {
      this.generateTimes()
    },

    convertCustomStringToDate(dateString) {
      let aux = dateString.split(" ")
      let auxDate = aux[0].split("/")
      let auxTime = aux[1].split(":")
      return new Date(auxDate[2], auxDate[1] - 1, auxDate[0], auxTime[0], auxTime[1], 0, 0)
    },

    generateTimes() {

      let times = []

      let openingHours = new Date(this.date)
      openingHours.setHours(9, 0, 0)

      let closingHours = new Date(this.date)
      closingHours.setHours(22, 0, 0)

      this.reservas.filter(reservation => reservation.activo)

      while (openingHours.getTime() + this.escapeRoom.duracion * 60000 <= closingHours.getTime()) {
        let endDate = new Date(openingHours.getTime() + this.escapeRoom.duracion * 60000)

        let reservations = this.reservas.filter(r => this.convertCustomStringToDate(r.fechaIni).getTime() >= openingHours.getTime() && this.convertCustomStringToDate(r.fechaIni).getTime() < endDate.getTime())
        times.push(
            {
              value: moment(openingHours).format('DD/MM/YYYY hh:mm'),
              text: openingHours.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}),
              disabled: reservations.length > 0
            }
        )
        openingHours = endDate
      }

      this.timeOptions = times
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

.new_reservation_title {
  padding: 50px 0px;
}

#form_reservation {
  min-width: 300px;
}

</style>