<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
      dense
      clipped-left
    >
      <v-app-bar-nav-icon @click="onDrawerToggle" />

      <v-spacer></v-spacer>

      <v-btn text @click="logout">
        <v-icon>mdi-logout</v-icon>
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :mini-variant="mini" fixed app clipped >
      <v-sheet v-show="!mini" color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="72" />

        <div>{{ email }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="link in links" :key="link.label" link :to="link.path" >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div style="position: fixed" >
        <v-img :src="background" style="background-size: cover; filter: blur(5px);" />
      </div>

      <v-container class="pt-6 px-6">
        <v-row justify="center" >
          <v-col v-for="(statistic, index) in statistics" cols="4" :key="index" >
            <v-card elevation="12" >
              <v-list-item>
                <v-list-item-avatar size="96" tile >
                  <v-img :aspect-ratio="1" width="84" :src="require('../../assets/'+statistic.img)" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <span :style="{color: 'black', fontSize: '1.5em', fontWeight: 'bolder'}" > {{ statistic.label }}</span>
                  </v-list-item-title>

                  <v-list-item-subtitle :style="{color: 'grey', fontSize: '2.5em', fontWeight: 'bolder'}" v-text="statistic.value()" />
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <router-view />

      <new-mail-modal />
    </v-main>
  </div>
</template>

<script lang="ts">
import { Component, Lifecycle, Vue } from 'av-ts'
import NewMailModal from '../NewMailModal.vue'
import { sessionModule } from '@/store/modules/session'
import { UserInfos } from '@/model'
import { mailerModule } from '@/store/modules/mails'

@Component({
  components: { NewMailModal }
})
export default class Main extends Vue {
  drawer = true
  mini = false
  links: Link[] = [{
    icon: 'mdi-email',
    label: 'Inbox',
    path: '/inbox'
  }, {
    icon: 'mdi-email',
    label: 'Outbox',
    path: '/outbox'
  }]

  statistics = [{
    label: 'Total Received',
    value: () => mailerModule.receivedCollection.length,
    img: 'received.png'
  }, {
    label: 'Total Sent',
    value: () => mailerModule.sentCollection.length,
    img: 'sent.png'
  }]

  background = require('../../assets/background_1.jpg')

  get infos (): UserInfos | null {
    return sessionModule.infos
  }

  get email (): string {
    return this.infos?.email || ''
  }

  @Lifecycle
  mounted () {
    sessionModule.refreshUserInfos()
  }

  onDrawerToggle () {
    this.drawer = !this.drawer
  }

  logout () {
    sessionModule.logout()
    location.reload()
  }
}

interface Link {
  icon: string;
  label: string;
  path: string;
}

</script>

<style lang="scss">
main {
  background: url("../../assets/background_1.jpg");
  background-size: cover;
}

overlay {
  background: #32fe2e55;
  /* Add the blur effect */
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
</style>
