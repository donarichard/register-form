<template>
  <div class="container center justify-content-center  align-items-center">
    <div
      class="justify-content-center text-center"
      style="text-align: -webkit-center !important;"
    >
      <v-card class="p-3 justify-content-center" elevation="2" width="500">
        <v-alert v-if="errorMessage" :type="errorType">{{
          errorMessage
        }}</v-alert>
        <v-progress-linear
          v-if="loading"
          :active="loading"
          :indeterminate="loading"
          absolute
          bottom
          color="primary"
        ></v-progress-linear>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            :rules="[rules.required]"
            label="Name"
            v-model="name"
            required
          ></v-text-field>
          <v-text-field
            :rules="[rules.required, rules.email]"
            label="Email"
            v-model="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="rePassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[
              rules.required,
              rules.min,
              rules.confirmPassword(password),
            ]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Re-Password"
            hint="At least 8 characters"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn :disabled="!valid" @click="register" rounded color="primary">
            Register
          </v-btn>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
import { register_API } from "../services";
export default {
  name: "Register",

  data() {
    return {
      valid: true,
      show1: false,
      name: "",
      email: "",
      password: "",
      rePassword: "",
      validPassword: "",
      loading: false,
      errorType: "",
      errorMessage: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        confirmPassword(password) {
          return (v) => v === password || "Password doesn't match";
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Must be a valid e-mail.";
        },
      },
    };
  },
  methods: {
    async register() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.loading = true
       await register_API({
          name: this.name,
          email: this.email,
          password: this.password,
        })
          .then(() => {
            this.loading = false
            this.$router.push('success')
          })
          .catch((errorResponse) => {
            this.loading = false
            this.errorMessage = errorResponse.error;
            this.errorType = "error ";
          });
      }
    },
  },
};
</script>
