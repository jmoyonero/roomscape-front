<template>
  <div id="login_form" v-if="showLogin">
    <div id="title"><h1>Login</h1></div>
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

      <div id="buttons" class="d-flex justify-content-between">
        <b-button :disabled="!enabledButton" class="button-success-login" type="submit" variant="primary">Iniciar Sesión</b-button>
        <b-button class="button-cancel-login" type="reset" variant="danger">Cancelar</b-button>
      </div>

      <br>

      <p>¿No estás registrado? <a href="/registro">Registrate</a></p>
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
  name: "Login",
  components: {ModalMessage},
  data() {
    return {
      form: {
        user: '',
        password: '',
      },
      show: true,
      modal: {
        title: '',
        message: '',
        variant: '',
      },
      showLogin: false
    }
  },
  computed: {
    enabledButton() {
      return this.userValidator && this.passwordValidator;
    },
    userValidator() {
      if (this.form.user == '') return null
      return !/[^a-zA-Z0-9-_]/.test(this.form.user);
    },
    passwordValidator() {
      if (this.form.password == '') return null
      return /^(?=\w*\d)(?=\w*[a-z])\S{8,}$/.test(this.form.password) && this.form.password.length >= 8;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()

      let newForm = {}
      newForm.user = this.form.user
      newForm.password = window.btoa(unescape(encodeURIComponent(this.form.password + "roomscape")));

      axios
          .post('https://backend-dev.roomscape.es/login', newForm)
          .then(response => {
            let d = new Date();
            d.setTime(d.getTime() + 1 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();
            document.cookie =
                "Session=" + response.data + ";" + expires + ";path=/";
            this.showSuccessModal(response.data)
            this.resetForm()
            window.location.href = '/'
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
    },
    showSuccessModal() {
      this.$bvModal.show("modal")
      this.modal.title = "¡Operación Exitosa!"
      this.modal.message = "Has iniciado sesión correctamente"
      this.modal.variant = 'success'
    },
    showWarningModal(message) {
      this.$bvModal.show("modal")
      this.modal.message = message
      this.modal.title = "¡Operación Fallida!"
      this.modal.variant = 'warning'
    }
  },
  created() {
    if(this.$cookies.get("Session")) {
      window.location.href = '/'
    }
    else {
      this.showLogin = true
    }
  }
}
</script>

<style scoped>
#login_form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.button-success-login {
  width: 150px;
  margin-right: 15px;
}

.button-cancel-login {
  width: 150px;
  margin-left: 15px;
}

#title {
  width: 500px;
}

@media (max-width: 768px) {
  #title {
    font-size: x-large;
    margin-bottom: 30px;
  }
}

</style>