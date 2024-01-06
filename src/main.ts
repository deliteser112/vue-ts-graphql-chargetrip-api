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
      'x-client-id': '6596187814cf192fba0cae08',
      'x-app-id': '6596187814cf192fba0cae0a',
    },
  },
})

initializeRouter(app)

app.mount('#app')
