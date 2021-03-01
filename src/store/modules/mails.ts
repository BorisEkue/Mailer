import { Attachment, Mail } from '@/model/mail'
import { Action, getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { sessionModule } from './session'
import { MailerProvider } from '@/api'

export interface MailerState {
  sentCollection: Mail[];
  receivedCollection: Mail[];
  archiveCollection: Mail[];
}

@Module({
  name: 'mailer',
  dynamic: true,
  namespaced: true,
  store
})
export class MailerModule extends VuexModule {
  sentCollection: MailerState['sentCollection'] = []
  receivedCollection: MailerState['receivedCollection'] = []
  archiveCollection: MailerState['archiveCollection'] = []

  @Mutation
  onMailSent (mail: Mail) {
    this.sentCollection.push(mail)
  }

  @Action({ commit: 'onMailSent' })
  async sendMail (data: {toRecipients: {text: string}[]; ccRecipients: {text: string}[]; attachments: Attachment[]; subject: string; content: string}) {
    return await MailerProvider.send(data.toRecipients, data.ccRecipients, data.attachments, data.subject, data.content)
  }

  @Action
  async deleteMail (mail: Mail) {
    //
  }

  @MutationAction({
    mutate: ['sentCollection']
  })
  async loadSentMails () {
    return {
      sentCollection: await MailerProvider.loadSentMails()
    }
  }

  @MutationAction({
    mutate: ['receivedCollection']
  })
  async loadReceivedMails () {
    return {
      receivedCollection: await MailerProvider.loadReceivedMails()
    }
  }

  @MutationAction({
    mutate: ['archiveCollection']
  })
  async loadArchiveMails () {
    return {
      archiveCollection: await MailerProvider.loadArchiveMails()
    }
  }
}

export const mailerModule = getModule(MailerModule)
