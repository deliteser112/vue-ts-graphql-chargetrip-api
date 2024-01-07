<template>
  <div class="flex justify-end">
    <BackButton />
  </div>

  <div v-if="fetching" class="w-full">
    <VehicleDetailSkeleton />
  </div>
  <div v-else-if="error">Oh no... {{ error }}</div>
  <div v-if="data">
    <div v-if="data.vehicle" class="p-4 border rounded grid grid-cols-12 gap-4">
      <VehicleImage v-bind:vehicle="data.vehicle" />
      <VehicleDetails
        v-bind:vehicle="data.vehicle"
        v-bind:render-general-data="renderGeneralData"
        v-bind:render-range-data="renderRangeData"
        v-bind:render-performance-data="renderPerformanceData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@urql/vue'
import { useRouter } from 'vue-router'

// components
import BackButton from '../components/common/BackButton.vue'
import VehicleDetailSkeleton from '../components/vehicle-details/VehicleDetailSkeleton.vue'
import VehicleImage from '../components/vehicle-details/VehicleImage.vue'
import VehicleDetails from '../components/vehicle-details/VehicleDetails.vue'

// queries
import { VEHICLE_QUERY } from '../queries'

// types
import { VehicleDetail } from '../types/vehicleDetails'

export default {
  name: 'VehicleDetail',
  components: {
    VehicleDetailSkeleton,
    BackButton,
    VehicleImage,
    VehicleDetails,
  },
  setup() {
    const router = useRouter()
    const { id } = router.currentRoute.value.params
    const result = useQuery({ query: VEHICLE_QUERY, variables: { id } })
    const { data, fetching, error } = result

    const renderGeneralData = (vehicle: VehicleDetail) => {
      if (!vehicle || !vehicle.range) {
        return {}
      }
      const generalData = {
        'Chargetrip real range™': `${vehicle.range.chargetrip_range.worst} - ${vehicle.range.chargetrip_range.best} km`,
        'Usable battery': `${vehicle.battery.usable_kwh} kWh`,
        'Fast charging support': vehicle.routing.fast_charging_support,
        'Plug Type': vehicle.connectors[0].standard,
      }

      return generalData
    }

    const renderRangeData = (vehicle: VehicleDetail) => {
      if (!vehicle || !vehicle.range) {
        return {}
      }
      const rangeData = {
        City: {
          best: `${vehicle.range.best.city} km`,
          worst: `${vehicle.range.worst.city} km`,
        },
        Highway: {
          best: `${vehicle.range.best.highway} km`,
          worst: `${vehicle.range.worst.highway} km`,
        },
        Combined: {
          best: `${vehicle.range.best.combined} km`,
          worst: `${vehicle.range.worst.combined} km`,
        },
      }

      return rangeData
    }

    const renderPerformanceData = (vehicle: VehicleDetail) => {
      if (!vehicle || !vehicle.performance) {
        return {}
      }
      const performanceData = {
        'Top speed': `${
          vehicle.performance.top_speed ? vehicle.performance.top_speed : '-'
        } km / u`,
        Acceleration: `${
          vehicle.performance.acceleration
            ? vehicle.performance.acceleration
            : '-'
        } s`,
      }

      return performanceData
    }

    return {
      fetching,
      error,
      data,
      renderGeneralData,
      renderRangeData,
      renderPerformanceData,
    }
  },
}
</script>
