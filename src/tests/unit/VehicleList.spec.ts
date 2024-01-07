import { ref } from 'vue'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import VehicleList from '@/views/VehicleList.vue'
import VehicleCard from '@/components/vehicle-list/VehicleCard.vue'
import LoadMoreButton from '@/components/common/LoadMoreButton.vue'
import VehicleCardSkeleton from '@/components/vehicle-list/VehicleCardSkeleton.vue'

import { vehicleList } from '../../mock'

jest.mock('../../utils/useToast', () => ({
  useToast: () => ({
    show: jest.fn(),
    close: jest.fn(),
    state: {
      message: '',
      type: '',
    },
  }),
}))

jest.mock('@urql/vue', () => {
  return {
    useQuery: () => ({
      fetching: false,
      data: ref({
        vehicleList,
      }),
      error: null,
    }),
  }
})

describe('VehicleList.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = shallowMount(VehicleList)
  })

  it('renders VehicleCard for each vehicle in the list', () => {
    const vehicleCards = wrapper.findAllComponents(VehicleCard)
    expect(vehicleCards).toHaveLength(2)
  })

  it('renders LoadMoreButton', () => {
    expect(wrapper.findComponent(LoadMoreButton).exists()).toBe(true)
  })

  it('does not render VehicleCardSkeleton when not fetching', () => {
    expect(wrapper.findComponent(VehicleCardSkeleton).exists()).toBe(false)
  })
})
