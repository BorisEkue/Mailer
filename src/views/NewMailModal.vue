<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="80%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" fab fixed bottom right ripple color="primary">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar color="primary" dense dark >
          <span class="headline">New Mail</span>
          <v-spacer/>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="9">
                <v-row>
                  <v-col cols="12">
                    <vue-tags-input v-model="to" :tags="toRecipients" :max-tags="1" @tags-changed="newTags => toRecipients = newTags" :allow-edit-tags="true" placeholder="To" />
                  </v-col>
                  <v-col cols="12">
                    <vue-tags-input v-model="cc" :tags="ccRecipients" :max-tags="1" @tags-changed="newTags => ccRecipients = newTags" :allow-edit-tags="true" placeholder="Cc" />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="subject" label="Subject" outlined flat dense clearable hide-details ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <vue-editor v-model="content"></vue-editor>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-file-pond name="tickets"
                             ref="pond"
                             style="max-height: 50vh"
                             class-name="my-pond"
                             :label-idle="fileHint"
                             :allow-multiple="true"
                             v-on:init="handleFilePondInit"
                             v-on:addfile="onAddAttachment"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" small class="mx-3" text @click="dialog = false">
            Abort
          </v-btn>
          <v-btn color="primary" class="px-4" @click="onSave" small >
            <span>Send</span>
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import { VueEditor } from 'vue2-editor'
import { mailerModule } from '@/store/modules/mails'

export default {
  name: 'NewMailModal',
  components: { VueTagsInput, VueEditor },

  data: () => ({
    fileHint: 'Drag drop file \nor\nclick to select files',
    dialog: false,

    to: '',
    toRecipients: [],
    cc: '',
    ccRecipients: [],
    attachments: [],
    subject: '',
    content: ''
  }),
  methods: {
    onAddAttachment (source, options) {
      const { file, filename } = options
      this.attachments.push({
        file,
        name: filename,
        downloading: false
      })
    },

    handleFilePondInit: () => {
      console.log('FilePond has initialized')

      // FilePond instance methods are available on \`this.\$refs.pond\`
    },

    onSave () {
      // console.log('attachments = ', this.attachments)
      mailerModule.sendMail({
        toRecipients: this.toRecipients,
        ccRecipients: this.ccRecipients,
        attachments: this.attachments,
        subject: this.subject,
        content: this.content
      }).then(() => {
        this.$toast.success('Email sent')
        this.dialog = false
      }).catch(error => {
        this.$toast.error(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
