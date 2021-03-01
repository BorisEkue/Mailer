import Vue from 'vue'
import Vuex from 'vuex'
import { SessionState } from '@/store/modules/session'
import { MailerState } from '@/store/modules/mails'

Vue.use(Vuex)

export interface RouteState {
  session: SessionState;
  mailer: MailerState;
}

const store = new Vuex.Store<RouteState>({})

export default store
