<template>
  <div class="px-4 py-4">
    <h1>{{$route.fullPath}}</h1>
  </div>
</template>

<script lang="ts" >
import { Component, Vue } from 'av-ts'

@Component
export default class Dashboard extends Vue {}

</script>

<style scoped>

</style>
