import { Axios } from '@/plugins/axios'
import moment from 'moment'
import { isNil } from 'lodash'
import { Credentials, UserInfos } from '@/model'
import { api } from '@/api'
import { sessionModule } from '@/store/modules/session'

export function login (email: string, password: string): Promise<Credentials> {
  return new Promise<Credentials>((resolve, reject) => {
    Axios.post(api.session.login, {
      email, password
    }).then(response => {
      const { data } = response
      console.log(data)
      if (data.auth) {
        const { auth } = data
        resolve({
          id: auth.id_user,
          accessToken: auth.access_token,
          expiresAt: moment(auth.expire_at)
        })
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('')
      }
    }).catch(error => reject(error))
  })
}

export function userInfos (): Promise<UserInfos> {
  return new Promise<UserInfos>((resolve, reject) => {
    Axios.get(api.session.infos(sessionModule.id)).then(response => {
      const { data } = response.data
      console.log(response.data)
      resolve({
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        createdAt: isNil(data.created_at) ? undefined : moment(data.created_at),
        updatedAt: isNil(data.updated_at) ? undefined : moment(data.updated_at)
      })
    }).catch(error => reject(error))
  })
}
