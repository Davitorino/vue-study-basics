import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../pages/EventList.vue'
import EventDetails from '../pages/EventDetails.vue'
import About from '../pages/About.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: EventDetails,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
