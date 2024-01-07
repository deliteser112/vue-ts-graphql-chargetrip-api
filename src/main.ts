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
      'x-client-id': '659ac739c8403358b02cdbb5',
      'x-app-id': '659ac739c8403358b02cdbb7',
    },
  },
})

initializeRouter(app)

app.mount('#app')
