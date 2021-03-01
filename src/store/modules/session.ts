import { getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '../index'
import { Axios } from '@/plugins/axios'
import { isNil } from 'lodash'
import { storeSession, clearSession, readSession } from '../storage'
import { SessionProvider } from '@/api'
import { Credentials, UserInfos } from '@/model'

export interface SessionState {
  credentials: Credentials | null;
  infos: UserInfos | null;
}

@Module({
  name: 'session',
  dynamic: true,
  namespaced: true,
  store
})
export class SessionModule extends VuexModule {
  credentials: SessionState['credentials'] = null
  infos: SessionState['infos'] = null

  get isConnected (): boolean {
    return !isNil(this.credentials)
  }

  get id (): number {
    console.log('this.credentials = ', this.credentials)
    return this.credentials?.id || -1
  }

  @Mutation
  reloadCredentials () {
    this.credentials = readSession()
  }

  @Mutation
  logout () {
    this.credentials = null
    this.infos = null
    Axios.defaults.headers.common.Authorization = undefined
    clearSession()
  }

  @MutationAction({
    mutate: ['credentials']
  })
  async login (data: {email: string; password: string}): Promise<{credentials: Credentials}> {
    const response = await SessionProvider.login(data.email, data.password)
    Axios.defaults.headers.common.Authorization = 'Bearer ' + response.accessToken
    storeSession(response)
    return {
      credentials: response
    }
  }

  @MutationAction({
    mutate: ['infos']
  })
  async refreshUserInfos (): Promise<{infos: UserInfos}> {
    return {
      infos: await SessionProvider.userInfos()
    }
  }
}

export const sessionModule = getModule(SessionModule)
