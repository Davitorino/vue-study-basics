import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../pages/EventList.vue'
import EventCreate from '../pages/EventCreate.vue'
import EventLayout from '../pages/event/Layout.vue'
import EventDetails from '../pages/event/Details.vue'
import EventRegister from '../pages/event/Register.vue'
import EventEdit from '../pages/event/Edit.vue'
import About from '../pages/About.vue'
import NotFound from '../pages/NotFound.vue'
import NetworkError from '../pages/NetworkError.vue'
import EventService from '@/services/EventService.js'
import GStore from '@/store/GStore.js'
import NProgress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((res) => {
          GStore.event = res.data
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            return {
              name: '404',
              params: { resource: 'event' },
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    component: EventLayout,
    props: true,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
    ],
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: EventCreate,
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: `/events/${to.params.afterEvent}` }
    },
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    alias: '/about',
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
