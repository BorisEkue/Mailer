<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'av-ts'

@Component
export default class Application extends Vue {
}

</script>
