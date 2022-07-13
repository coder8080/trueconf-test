import { createStore } from 'vuex'
import elevators from '@/store/modules/elevators'

const store = createStore({ modules: { elevators } })
export default store
