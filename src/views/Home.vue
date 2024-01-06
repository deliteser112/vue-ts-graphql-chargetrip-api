<template>
  <div
    v-if="fetching"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <VehicleCardSkeleton v-for="i in 20" v-bind:key="i" />
  </div>
  <div v-else-if="error">Oh no... {{ error }}</div>
  <div v-else class="flex justify-center">
    <div
      v-if="vehicleList.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <VehicleCard
        v-for="vehicle in vehicleList"
        v-bind:key="vehicle.id"
        v-bind:vehicle="vehicle"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <VehicleCard
        v-for="vehicle in data.vehicleList"
        v-bind:key="vehicle.id"
        v-bind:vehicle="vehicle"
      />
    </div>
  </div>
  <LoadMoreButton v-on:load-more="loadMore" />
</template>

<script lang="ts">
import { Ref, ref, watch } from 'vue'
import { useQuery } from '@urql/vue'

// components
import LoadMoreButton from '../components/common/LoadMoreButton.vue'
import VehicleCard from '../components/vehicle-list/VehicleCard.vue'
import VehicleCardSkeleton from '../components/vehicle-list/VehicleCardSkeleton.vue'

// queries
import { VEHICLE_LIST_QUERY } from '../queries'

// types
import { Vehicle } from '../types/vehicleList'

// utils
import { useToast } from '../utils/useToast'

export default {
  components: {
    VehicleCard,
    LoadMoreButton,
    VehicleCardSkeleton,
  },
  setup() {
    const page: Ref<number> = ref(0)
    const size = 20
    const vehicleList: Ref<Vehicle[]> = ref([])

    const toast = useToast()

    const result = useQuery({
      query: VEHICLE_LIST_QUERY,
      variables: { page, size },
    })

    // Watch for changes in the data and append new data to the list
    watch(result.data, (newData) => {
      if (newData) {
        vehicleList.value = [...vehicleList.value, ...newData.vehicleList]
        if (page.value === 0) {
          toast.show(
            `Exciting news! |  A brand new model has just arrived in our showroom. Don't miss out on the chance to be the first to check out its amazing features and capabilities. Hurry up, it's waiting for you!`,
          )
        }
      }
    })

    const loadMore = () => {
      page.value += 1
    }

    return {
      fetching: result.fetching,
      data: result.data,
      error: result.error,
      vehicleList,
      loadMore,
    }
  },
}
</script>
