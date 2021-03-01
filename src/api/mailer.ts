import { Attachment, Mail } from '@/model/mail'
import { Axios } from '@/plugins/axios'
import axios from 'axios'
import { api } from '@/api'
import { sessionModule } from '@/store/modules/session'

export function send (toRecipients: {text: string}[] = [], ccRecipients: {text: string}[] = [], attachments: Attachment[] = [], subject = '', content = ''): Promise<Mail> {
  return new Promise<Mail>((resolve, reject) => {
    const data = new FormData()
    data.set('from', sessionModule.infos?.email || '')
    data.set('to', toRecipients[0].text)
    data.set('cc', ccRecipients[0].text)
    data.set('subject', subject)
    data.set('content', content)
    data.set('content-type', 'html')
    attachments.forEach((attachment, index) => {
      data.set('attachment_' + index, attachment.file, attachment.name)
    })
    Axios.post(api.mailer.sendMail, data).then(response => {
      const { data } = response.data
      console.log(Mail.parse(data))
      resolve(Mail.parse(data))
    }).catch(error => reject(error))
  })
}

export function loadSentMails (offset = 0, size = 50): Promise<Mail[]> {
  return new Promise<Mail[]>((resolve, reject) => {
    Axios.get(api.mailer.loadSentMails(sessionModule.infos?.email, offset, size)).then(response => {
      const { data } = response.data
      console.log(data)
      resolve((data as any[]).map((element: any) => Mail.parse(element)))
    }).catch(error => reject(error))
  })
}

export function loadReceivedMails (offset = 0, size = 50): Promise<Mail[]> {
  return new Promise<Mail[]>((resolve, reject) => {
    Axios.get(api.mailer.loadReceivedMails(sessionModule.infos?.email, offset, size)).then(response => {
      const { data } = response.data
      console.log(data)
      resolve((data as any[]).map((element: any) => Mail.parse(element)))
    }).catch(error => reject(error))
  })
}

export function loadArchiveMails (offset = 0, size = 50): Promise<Mail[]> {
  return new Promise<Mail[]>((resolve, reject) => {
    Axios.get(api.mailer.loadArchiveMails(sessionModule.infos?.email, offset, size)).then(response => {
      const { data } = response.data
      console.log(data)
      resolve((data as any[]).map((element: any) => Mail.parse(element)))
    }).catch(error => reject(error))
  })
}

export function download (file: Attachment): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    axios.get(file.file as string, {
      responseType: 'blob'
    }).then(response => {
      const { data } = response
      // const file: Blob = new Blob([response.data], { type: dataType })
      const blob: Blob = new Blob([response.data])
      const fileURL = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = fileURL
      link.setAttribute('download', file.name)
      document.body.appendChild(link)
      link.click()
      if (link.parentNode) link.parentNode.removeChild(link)
      resolve()
    }).catch(error => reject(error))
  })
}
