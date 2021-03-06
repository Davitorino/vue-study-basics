import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '@/pages/EventCreate.vue'
import EventList from '@/pages/EventList.vue'
import EventShow from '@/pages/EventShow.vue'
import NotFound from '@/pages/NotFound.vue'
import NetworkIssue from '@/pages/NetworkIssue.vue'
import Example from '@/pages/Example.vue'
import NProgress from 'nprogress'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/example',
    component: Example,
  },
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then((event) => {
          routeTo.params.event = event
          next()
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    },
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue,
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach((routeTo, routeFrom) => {
  NProgress.done()
})

export default router
