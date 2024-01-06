<template>
  <div class="flex justify-end">
    <button
      class="mb-4 inline-flex items-center text-white bg-[#1f2937] hover:bg-[#2b3a4a] py-2 px-4 rounded"
      v-on:click="$router.back()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-6 w-6 mr-1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>
  </div>

  <div v-if="fetching" class="w-full">
    <VehicleDetailSkeleton />
  </div>
  <div v-else-if="error">Oh no... {{ error }}</div>
  <div v-if="data">
    <div v-if="data.vehicle" class="p-4 border rounded grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-8">
        <img
          v-bind:src="data.vehicle.media.brand.thumbnail_url"
          alt="Brand Logo"
        />
        <img v-bind:src="data.vehicle.media.image.url" alt="Car Image" />
      </div>
      <div class="col-span-12 lg:col-span-4">
        <div class="text-2xl text-left font-bold">
          {{ data.vehicle.naming.make }} - {{ data.vehicle.naming.model }}
        </div>
        <div class="text-sm text-left">
          {{ data.vehicle.naming.chargetrip_version }}
        </div>
        <hr class="border-t-1 border-gray-300 mt-5" />
        <div class="text-xl text-left font-bold mb-2">General</div>
        <div
          v-for="(value, key) in renderGeneralData(data)"
          v-bind:key="key"
          class="w-full flex justify-between"
        >
          <span>{{ key }}</span>
          <span class="font-bold">{{ value }}</span>
        </div>
        <hr class="border-t-1 border-gray-300 mt-5" />
        <div class="text-xl text-left font-bold mb-2">Range</div>
        <table class="w-full">
          <thead>
            <tr class="text-left">
              <th>Situation</th>
              <th>Mild 23 ºC</th>
              <th>Cold -10 ºC</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, key) in renderRangeData(data)"
              v-bind:key="key"
              class="text-left"
            >
              <td>{{ key }}</td>
              <td>{{ value.best }}</td>
              <td>{{ value.worst }}</td>
            </tr>
          </tbody>
        </table>
        <hr class="border-t-1 border-gray-300 mt-5" />
        <div class="text-xl text-left font-bold mb-2">Performance</div>
        <ul>
          <li
            v-for="(value, key) in renderPerformanceData(data)"
            v-bind:key="key"
            class="w-full flex justify-between"
          >
            <span>{{ key }}</span>
            <span class="font-bold">{{ value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@urql/vue'
import { useRouter } from 'vue-router'

// components
import VehicleDetailSkeleton from '../components/VehicleDetailSkeleton.vue'

// queries
import { VEHICLE_QUERY } from '../queries'

export default {
  components: {
    VehicleDetailSkeleton,
  },
  setup() {
    const router = useRouter()
    const { id } = router.currentRoute.value.params
    const result = useQuery({ query: VEHICLE_QUERY, variables: { id } })
    const { data, fetching, error } = result

    const renderGeneralData = (data: any) => {
      const generalData = {
        'Chargetrip real range™': `${data.vehicle.range.chargetrip_range.worst} - ${data.vehicle.range.chargetrip_range.best} km`,
        'Usable battery': `${data.vehicle.battery.usable_kwh} kWh`,
        'Fast charging support': data.vehicle.routing.fast_charging_support,
        'Plug Type': data.vehicle.connectors[0].standard,
      }

      return generalData
    }

    const renderRangeData = (data: any) => {
      const rangeData = {
        City: {
          best: `${data.vehicle.range.best.city} km`,
          worst: `${data.vehicle.range.worst.city} km`,
        },
        Highway: {
          best: `${data.vehicle.range.best.highway} km`,
          worst: `${data.vehicle.range.worst.highway} km`,
        },
        Combined: {
          best: `${data.vehicle.range.best.combined} km`,
          worst: `${data.vehicle.range.worst.combined} km`,
        },
      }

      return rangeData
    }

    const renderPerformanceData = (data: any) => {
      const performanceData = {
        'Top speed': `${
          data.vehicle.performance.top_speed
            ? data.vehicle.performance.top_speed
            : '-'
        } km / u`,
        Acceleration: `${
          data.vehicle.performance.acceleration
            ? data.vehicle.performance.acceleration
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
