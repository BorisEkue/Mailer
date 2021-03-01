<template>
  <v-card>
    <v-card-title class="justify-center" >Login</v-card-title>
    <v-card-text>
      <v-form rel="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field v-model="email.value" :rules="email.rules" :loading="loading"
                      prepend-icon="mdi-email" color="primary" name="login" label="Nom d'utilisateur" type="text"
                      clearable/>
        <v-text-field v-model="password.value" :rules="password.rules" :loading="loading"
                      prepend-icon="mdi-lock" color="primary" name="password" label="Mot de passe" type="password"
                      clearable/>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn rounded color="primary" :loading="loading" :disabled="!valid" @click="submitLogin">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" >
import { Component, Vue } from 'av-ts'
import { isNil } from 'lodash'
import { sessionModule } from '@/store/modules/session'

@Component
export default class Login extends Vue {
  valid = false
  lazy = true
  email = {
    value: '',
    rules: [
      (v: any) => !!v || 'veuillez entrer votre login'
    ]
  }

  password = {
    value: '',
    rules: [
      (v: any) => !!v || 'veuillez entrer votre mot de passe'
    ]
  }

  loading = false

  submitLogin () {
    this.loading = true
    sessionModule.login({
      email: this.email.value,
      password: this.password.value
    }).then(() => {
      if (sessionModule.isConnected) {
        this.$toast.success('Login successful')
        const redirect = this.$route.query.redirect as string | undefined
        console.log('redirect = ' + redirect)
        this.$router.replace({
          name: isNil(redirect) ? 'Inbox' : redirect
        })
      } else this.$toast.error('Login failed, please retry')
    }).catch(error => {
      this.$toast.error(error)
    }).finally(() => {
      this.loading = false
    })
  }
}

</script>

<style scoped>

</style>
