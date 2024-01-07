import { createApp } from 'vue'
import urql, { cacheExchange, fetchExchange } from '@urql/vue'
import Root from './App.vue'
import initializeRouter from './router'
import './styles/main.css'

const app = createApp(Root)

app.use(urql, {
  url: 'https://api.chargetrip.io/graphql',
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      'x-client-id': '659a8df0c8403358b02cdb63',
      'x-app-id': '659a8df0c8403358b02cdb65',
    },
  },
})

initializeRouter(app)

app.mount('#app')
