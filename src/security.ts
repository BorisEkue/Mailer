// @ts-ignore
import NProgress from 'nprogress'
import router from '@/router'
import { Route } from 'vue-router'
import { sessionModule } from '@/store/modules/session'

NProgress.configure({ showSpinner: false })

const whiteList: string[] = ['/auth/login', '/auth/register', '/auth/lock']

function isWhileListRoute (route: Route): boolean {
  return whiteList.find(path => route.path.startsWith(path)) !== undefined
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (isWhileListRoute(to)) {
    next()
  } else {
    if (!sessionModule.isConnected) sessionModule.reloadCredentials()
    if (sessionModule.isConnected) next()
    else next(`/auth/login?redirect=${to.name}`)
  }
})

router.afterEach(to => {
  NProgress.done()
})
