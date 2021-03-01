import { mockEnabled } from '@/main'

export * as SessionProvider from './session'
export * as MailerProvider from './mailer'

// interface API {
//   session: SessionApi;
//   mailer: MailerApi;
// }
//
// interface SessionApi {
//   login: string;
//   infos: (userId: number) => string;
// }
//
// interface MailerApi {
//   sendMail: string;
//   loadSentMails: (user: string, offset: number, size: number) => string;
//   loadReceivedMails: (user: string, offset: number, size: number) => string;
//   loadArchiveMails: (user: string, offset: number, size: number) => string;
// }

export const api = {
  session: {
    login: '/customers/login',
    infos: (userId = -1) => '/customers/' + userId
  },
  mailer: {
    sendMail: '/emails',
    loadSentMails: (user = '', offset = 0, size = 50) => '/emails/by/customer?email=' + user + '&offset=' + offset + '&size=' + size,
    loadReceivedMails: (user = '', offset = 0, size = 50) => '/emails/to/customer?email=' + user + '&offset=' + offset + '&size=' + size,
    loadArchiveMails: (user = '', offset = 0, size = 50) => '/emails/by/customer?email=' + user + '&offset=' + offset + '&size=' + size
  }
}

// const mockApi: API = {
//   session: {
//     login: '/customers/login',
//     infos: (userId: number) => '/customers' + userId
//   },
//   mailer: {
//     sendMail: '/emails',
//     loadSentMails: (user = '', offset = 0, size = 50) => '/emails/by/customer?email=' + user + '&offset=' + offset + '&size=' + size,
//     loadReceivedMails: (user = '', offset = 0, size = 50) => '/emails/by/customer?email=' + user + '&offset=' + offset + '&size=' + size,
//     loadArchiveMails: (user = '', offset = 0, size = 50) => '/emails/by/customer?email=' + user + '&offset=' + offset + '&size=' + size
//   }
// }
//
// export const api = mockEnabled ? mockApi : httpApi
