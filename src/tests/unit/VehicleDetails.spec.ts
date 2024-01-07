import { shallowMount } from '@vue/test-utils'
import VehicleDetails from '@/components/vehicle-details/VehicleDetails.vue'

describe('VehicleDetails.vue', () => {
  it('renders vehicle details correctly', () => {
    const vehicle = {
      naming: {
        make: 'Tesla',
        model: 'Model S',
        chargetrip_version: '1.0',
      },
    }

    const renderGeneralData = jest.fn().mockReturnValue({})
    const renderRangeData = jest.fn().mockReturnValue({})
    const renderPerformanceData = jest.fn().mockReturnValue({})

    const wrapper = shallowMount(VehicleDetails, {
      propsData: {
        vehicle,
        renderGeneralData,
        renderRangeData,
        renderPerformanceData,
      },
    })

    const makeModel = wrapper.find('.text-2xl.text-left.font-bold')
    expect(makeModel.text()).toBe('Tesla - Model S')

    const version = wrapper.find('.text-sm.text-left')
    expect(version.text()).toBe('1.0')
  })
})
