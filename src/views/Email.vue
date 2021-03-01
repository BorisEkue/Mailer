<template>
  <v-container class="py-8 px-6" fluid>
    <v-card style="background-color: #FFFFFF99" >
      <v-toolbar dense >
        <v-btn small fab icon @click="$router.back()" >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-subheader>Email</v-subheader>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="1">
              <v-subheader> From </v-subheader>
            </v-col>
            <v-col cols="11">
              <v-text-field :value="from" flat solo dense hide-details append-icon="mdi-email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-subheader> To </v-subheader>
            </v-col>
            <v-col cols="11">
              <v-text-field :value="to" flat solo dense hide-details readonly append-icon="mdi-email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-subheader> Cc </v-subheader>
            </v-col>
            <v-col cols="11">
              <v-text-field :value="cc" flat solo dense hide-details readonly append-icon="mdi-email" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-subheader> Subject </v-subheader>
            </v-col>
            <v-col cols="11">
              <v-text-field :value="subject" flat solo dense hide-details readonly />
            </v-col>
          </v-row>
          <v-row v-if="true" style="max-height: 240px; overflow-y: auto" >
            <v-col cols="4" v-for="(attachment, index) in attachments" :key="index" >
              <v-card flat :loading="attachment.downloading" >
                <v-toolbar dense>
                  <v-toolbar-title style="font-size: 1em" >{{attachment.name}}</v-toolbar-title>
                  <v-spacer />
                  <v-btn fab icon @click="download(attachment)" >
                    <v-icon>mdi-file-download</v-icon>
                  </v-btn>
                </v-toolbar>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-html="message" flat solo dense hide-details readonly height="500" style="background-color: white; padding: 12px; max-height: 512px" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" >
import { Component, Vue } from 'av-ts'
import { mailerModule } from '@/store/modules/mails'
import { Attachment, Mail } from '@/model'
import { MailerProvider } from '@/api'

@Component({
})
export default class Email extends Vue {
  options = {
    responsive: [
      { end: 576, size: 1 },
      { start: 576, end: 768, size: 2 },
      { start: 768, end: 992, size: 3 },
      { size: 4 }
    ]
  }

  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
    return { title: `Item ${i}`, content: `🚀 Simple content ${i}` }
  })

  get email (): Mail | undefined {
    const type = this.$route.params.type
    if (type === 'in') {
      return mailerModule.receivedCollection.find((email: Mail) => email.id === this.$route.params.id)
    } else if (type === 'out') {
      return mailerModule.sentCollection.find((email: Mail) => email.id === this.$route.params.id)
    } else return undefined
  }

  get from (): string {
    return this.email?.from || ''
  }

  get to (): string {
    return this.email?.to || ''
  }

  get cc (): string {
    return this.email?.cc || ''
  }

  get subject (): string {
    return this.email?.subject || ''
  }

  get attachments (): Attachment[] {
    return this.email?.attachments || []
  }

  get files (): (string | Blob)[] {
    return this.attachments.map(attachment => attachment.file)
  }

  get message (): string {
    return this.email?.message || ''
  }

  handleFilePondInit () {
    console.log('FilePond has initialized')

    // FilePond instance methods are available on \`this.\$refs.pond\`
  }

  download (file: Attachment) {
    file.downloading = true
    MailerProvider.download(file).finally(() => {
      file.downloading = false
    })
  }
}

</script>

<style scoped>
.container4 {
  display: flex;
  overflow-x: auto;
}
.container4 img {
  margin-right: 15px;
}
</style>
