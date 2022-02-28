import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Davi Vitorino',
    events: [],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then((res) => {
          commit('SET_EVENTS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  modules: {},
})
