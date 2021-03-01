/* eslint-disable */
import Mock, { Random } from 'mockjs'
import moment from 'moment'
import { host } from '@/plugins/axios'
import { api } from '@/api'
import { sessionModule } from '@/store/modules/session'

Mock.mock(host + api.session.login, () => {
  return {
    status: 200,
    uri: host + api.session.login,
    auth: {
      id_user: 2,
      access_token: 'access_token_value',
      expire_at: moment().add(2, 'minutes').format("YYYY-MM-DD HH:mm:ss")
    }
  }
})

Mock.mock(host + api.session.infos(), () => {
  return {
    status: 200,
    uri: host + api.session.infos(),
    data: {
      id: 2,
      firstname: Random.first(),
      lastname: Random.last().toUpperCase(),
      email: Random.email(),
      created_at: Random.datetime(),
      updated_at: Random.datetime()
    }
  }
})

Mock.mock(host + api.mailer.sendMail, () => {
  return {
    status: 200,
    uri: host + api.mailer.sendMail,
    data: email(20)
  }
})

Mock.mock(host + api.mailer.loadReceivedMails(), () => {
  return {
    status: 200,
    uri: host + api.mailer.loadReceivedMails(),
    data: emails(undefined, sessionModule.infos?.email, sessionModule.infos?.email)
  }
})

Mock.mock(host + api.mailer.loadSentMails(), () => {
  return {
    status: 200,
    uri: host + api.mailer.loadSentMails(),
    data: emails(sessionModule.infos?.email)
  }
})

Mock.mock(host + api.mailer.loadArchiveMails(), () => {
  return {
    status: 200,
    uri: host + api.mailer.loadArchiveMails(),
    data: emails()
  }
})

function emails(from?: string, to?: string, cc?: string): any[] {
  const items: any[] = []
  for (let i = 0; i < Random.integer(10, 100); i++) {
    items.push(email(i, from, to, cc))
  }

  return items.sort((a, b) => moment(a.created_at).milliseconds() - moment(b.created_at).milliseconds());
}

function email(i: number, from?: string, to?: string, cc?: string): any {
  const date = moment().subtract(Random.integer(1, 10000000))
  return {
    idmail: Random.guid(),
    from: from || Random.email(),
    to: to || Random.email(),
    cc: cc || Random.email(),
    subject: Random.word(),
    content: Random.paragraph(),
    content_type: 'html',
    has_files: 1,
    created_at: date,
    updated_at: date,
    files_attached: files(Random.integer(10, 40)),
  }
}

function files(count: number) {
  const files: any[] = [];
  for (let i = 0; i < count; i++) {
    files.push({
      filepath: 'https://picsum.photos/200/300?random='+(i+1),
      filename: Random.word(100)
    })
  }
  return files
}
