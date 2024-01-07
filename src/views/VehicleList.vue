<template>
  <SearchBox v-on:filter="applyFilter" />
  <div
    v-if="fetching"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <VehicleCardSkeleton v-for="i in 20" v-bind:key="i" />
  </div>
  <div v-else-if="error">Oh no... {{ error }}</div>
  <div v-else class="flex justify-center">
    <div
      v-if="vehicleList && vehicleList.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <VehicleCard
        v-for="vehicle in vehicleList"
        v-bind:key="vehicle.id"
        v-bind:vehicle="vehicle"
      />
    </div>

    <div
      v-else-if="data && data.vehicleList.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <VehicleCard
        v-for="vehicle in data.vehicleList"
        v-bind:key="vehicle.id"
        v-bind:vehicle="vehicle"
      />
    </div>
    <div v-else>
      <NoData />
    </div>
  </div>
  <LoadMoreButton
    v-if="
      (vehicleList && vehicleList.length) ||
      (data && data.vehicleList.length > 0)
    "
    v-on:load-more="loadMore"
  />
</template>

<script lang="ts">
import { Ref, ref, watch } from 'vue'
import { useQuery } from '@urql/vue'

// components
import NoData from '../components/common/NoData.vue'
import SearchBox from '../components/common/SearchBox.vue'
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
  name: 'VehicleList',
  components: {
    NoData,
    SearchBox,
    LoadMoreButton,
    VehicleCard,
    VehicleCardSkeleton,
  },
  setup() {
    const size = 20
    const page: Ref<number> = ref(0)
    const vehicleList: Ref<Vehicle[]> = ref([])
    const search: Ref<string> = ref('')

    const toast = useToast()

    const result = useQuery({
      query: VEHICLE_LIST_QUERY,
      variables: { page, size, search },
    })

    // Watch for changes in the data and append new data to the list
    watch(result.data, (newData) => {
      if (newData) {
        vehicleList.value = [...vehicleList.value, ...newData.vehicleList]
      }
    })

    const loadMore = () => {
      page.value += 1
    }

    const applyFilter = (searchText: string) => {
      // reset page count and vehicle list
      search.value = searchText
      page.value = 0
      vehicleList.value = []

      if (!searchText) {
        toast.show(
          'Please type any text to search for make, model or version.',
          'info',
        )
      }
    }

    return {
      fetching: result.fetching,
      data: result.data,
      error: result.error,
      vehicleList,
      applyFilter,
      loadMore,
    }
  },
}
</script>
