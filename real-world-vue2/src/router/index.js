import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '../pages/EventCreate.vue'
import EventList from '../pages/EventList.vue'
import EventShow from '../pages/EventShow.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
