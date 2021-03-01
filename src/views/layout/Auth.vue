<template>
  <v-main height="100vh" >
    <div style="position: fixed" >
      <v-img :src="background" style="background-size: cover; filter: blur(5px);" />
    </div>

    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs10 sm8 md5>
          <router-view />
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'av-ts'

@Component
export default class Auth extends Vue {
  background = require('../../assets/background_1.jpg')
}

</script>

<style lang="scss">
</style>
