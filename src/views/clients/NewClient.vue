<template>
  <div id="new_client_form">
    <h1 id="title">Formulario de Registro</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
          id="input-group-user"
          label="Usuario:"
          label-for="input-user"
      >
        <b-form-input
            id="input-user"
            v-model="form.user"
            type="text"
            :state="userValidator"
            placeholder=""
            class="text-center"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-password"
          label="Contraseña:"
          label-for="input-password"
          description="min. 8 caracteres, al menos 1 letra y 1 número"
      >
        <b-form-input
            id="input-password"
            v-model="form.password"
            type="password"
            placeholder=""
            :state="passwordValidator"
            aria-describedby="input-live-help input-live-feedback"
            class="text-center"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-dni"
          label="DNI:"
          label-for="input-dni"
      >
        <b-form-input
            id="input-dni"
            v-model="form.dni"
            type="text"
            placeholder=""
            :state="dniValidator"
            class="text-center"
            required
        ></b-form-input>
      </b-form-group>

      <div id="buttons" class="d-flex justify-content-between">
        <b-button :disabled="!enabledButton" class="button-success" type="submit" variant="primary">Registrarte
        </b-button>
        <b-button class="button-cancel" type="reset" variant="danger">Cancelar</b-button>
      </div>
    </b-form>

    <b-modal id="modal-1" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>

    <ModalMessage
        :message="modal.message"
        :title="modal.title"
        :variant="modal.variant"
        class="custom-modal"
    ></ModalMessage>
  </div>
</template>

<script>
import axios from "axios";
import ModalMessage from "@/components/Modal";

export default {
  name: "NewClient",
  components: {ModalMessage},
  data() {
    return {
      form: {
        user: '',
        password: '',
        dni: ''
      },
      show: true,
      modal: {
        title: '',
        message: '',
        variant: '',
      }
    }
  },
  computed: {
    enabledButton() {
      return this.userValidator && this.passwordValidator && this.dniValidator;
    },
    userValidator() {
      if (this.form.user == '') return null
      return !/[^a-zA-Z0-9-_]/.test(this.form.user);
    },
    passwordValidator() {
      if (this.form.password == '') return null
      return /^(?=\w*\d)(?=\w*[a-z])\S{8,}$/.test(this.form.password) && this.form.password.length >= 8;
    },
    dniValidator() {
      if (this.form.dni == '') return null
      return this.validateDni(this.form.dni)
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()

      let newForm = {}
      newForm.user = this.form.user
      newForm.password = window.btoa(unescape(encodeURIComponent(this.form.password + "roomscape")));
      newForm.dni = this.form.dni

      axios
          .post('https://dev.roomscape.es/client/create', newForm)
          .then(response => {
            this.showSuccessModal(response.data)
            this.resetForm()
            window.location.href = '/login'
          })
          .catch(err => {
            this.showWarningModal(err.response.data)
          })
    },
    onReset(event) {
      event.preventDefault()
      this.resetForm()
    },
    resetForm() {
      this.form.user = ''
      this.form.password = ''
      this.form.dni = ''
    },
    showSuccessModal(client) {
      this.$bvModal.show("modal")
      this.modal.title = "¡Operación Exitosa!"
      this.modal.message = "Te has registrado correctamente: " + client.user
      this.modal.variant = 'success'
    },
    showWarningModal(message) {
      this.$bvModal.show("modal")
      this.modal.message = message
      this.modal.title = "¡Operación Fallida!"
      this.modal.variant = 'warning'
    },
    validateDni(dni) {
      let regExpDni = /^\d{8}[A-Z]$/;

      if (regExpDni.test(dni) == true) {
        let number = dni.substr(0, dni.length - 1);
        let letterId = dni.substr(dni.length - 1, 1);
        let letter = 'TRWAGMYFPDXBNJZSQVHLCKET';
        number = number % 23;
        return letter.substring(number, number + 1) == letterId.toUpperCase()
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
#new_client_form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-success {
  width: 120px;
  margin-right: 15px;
}

.button-cancel {
  width: 120px;
  margin-left: 15px;
}

@media (max-width: 768px) {
  #title {
    font-size: x-large;
    margin-bottom: 30px;
  }
}

</style>