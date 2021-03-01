import { Credentials } from '@/model'
import { isNil } from 'lodash'
import moment, { Moment } from 'moment'

const SESSION_ID_KEY = 'Credentials/id'
const SESSION_TOKEN_KEY = 'Credentials/token'
const SESSION_EXPIRE_ID_KEY = 'Credentials/expire'

export function storeSession (credentials: Credentials) {
  sessionStorage.setItem(SESSION_ID_KEY, credentials.id.toString())
  sessionStorage.setItem(SESSION_TOKEN_KEY, credentials.accessToken)
  sessionStorage.setItem(SESSION_EXPIRE_ID_KEY, credentials.expiresAt.toISOString())
}

export function readSession (): Credentials | null {
  const expireStr = sessionStorage.getItem(SESSION_EXPIRE_ID_KEY)
  const expireAt: Moment | undefined = isNil(expireStr) ? undefined : moment(expireStr)
  if (expireAt?.isAfter(moment())) {
    return {
      id: (sessionStorage.getItem(SESSION_ID_KEY) || -1) as number,
      expiresAt: expireAt,
      accessToken: sessionStorage.getItem(SESSION_TOKEN_KEY) || ''
    }
  } else return null
}

export function clearSession () {
  sessionStorage.clear()
}
