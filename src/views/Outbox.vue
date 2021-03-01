<template>
  <v-container class="pb-8 px-6" fluid>
    <v-toolbar dense flat rounded class="mb-1" >
      <v-toolbar-title>Sent messages</v-toolbar-title>
      <v-spacer />
      <v-btn fab icon @click="loadContent">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card style="background-color: #FFFFFFDD; margin-bottom: 72px" flat :loading="loading" >
      <v-list dense style="background-color: #FFFFFF00" >
        <template v-for="email in mails">
          <v-list-item :key="email.id" dense selectable @click="openEmail(email)"  >
            <template>
              <v-list-item-avatar color="grey lighten-3">
                <v-icon color="grey lighten-6" >mdi-account-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span :style="{color: primaryColor, fontSize: 'small', fontWeight: 'bolder'}" >{{ email.from }} :</span>
                  <span :style="{color: 'black', fontSize: 'small', fontWeight: 'bolder'}" > {{ email.subject }}</span>
                </v-list-item-title>

                <v-list-item-subtitle :style="{color: 'grey'}" v-text="email.message"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-row class="px-3">
                  <v-list-item-action-text v-text="email.fromNow" class="pr-3"></v-list-item-action-text>
                </v-row>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts" >
import { Component, Lifecycle, Vue } from 'av-ts'
import { mailerModule } from '@/store/modules/mails'
import { Mail } from '@/model/mail'
import VuetifyOptions from '@/plugins/vuetify'

@Component
export default class Outbox extends Vue {
  loading = false

  get mails (): Mail[] {
    return mailerModule.sentCollection
  }

  get primaryColor () {
    return VuetifyOptions?.userPreset?.theme?.themes?.light?.primary || 'black'
  }

  @Lifecycle
  mounted () {
    this.loadContent()
  }

  loadContent () {
    this.loading = true
    mailerModule.loadSentMails().finally(() => {
      this.loading = false
    })
  }

  openEmail (email: Mail) {
    this.$router.push({
      path: '/email/' + 'out' + '/' + email.id
    })
  }
}
</script>

<style scoped>

</style>
