import { isNil } from 'lodash'
import moment, { Moment } from 'moment'

export class Mail {
  public static parse (data: any): Mail {
    const mail = new Mail()
    mail.id = data.idmail
    mail.from = data.from
    mail.to = data.to
    mail.cc = data.cc
    mail.subject = data.subject
    mail.message = data.content
    mail.contentType = data.content_type
    mail.hasFiles = data.has_files === 1
    mail.createdAt = isNil(data.created_at) ? undefined : moment(data.created_at)
    mail.updatedAt = isNil(data.updated_at) ? undefined : moment(data.updated_at)
    mail.attachments = isNil(data.files_attached) ? [] : (data.files_attached as any[]).map((element: any) => ({
      file: element.filepath,
      name: element.filename,
      downloading: false
    }))
    return mail
  }

  id = ''
  from = ''
  to = ''
  cc = ''
  subject = ''
  attachments: Attachment[] = []
  message = ''
  contentType?: string
  hasFiles = false
  createdAt?: Moment = moment()
  updatedAt?: Moment = moment()

  addAttachment (filename: string, file: string | Blob): boolean {
    if (!isNil(this.attachments.find(item => item.name === filename))) {
      this.attachments.push({
        name: filename,
        file,
        downloading: false
      })
      return true
    } else return false
  }

  get toNow (): string {
    return this.createdAt?.toNow() || ''
  }

  get fromNow (): string {
    return this.createdAt?.fromNow() || ''
  }
}

export interface Attachment {
  name: string;
  file: string | Blob;
  downloading: boolean;
}
