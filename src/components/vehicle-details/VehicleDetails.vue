<template>
  <div v-if="vehicle" class="col-span-12 lg:col-span-4">
    <div class="text-2xl text-left font-bold">
      {{ vehicle.naming.make }} - {{ vehicle.naming.model }}
    </div>
    <div class="text-sm text-left">
      {{ vehicle.naming.chargetrip_version }}
    </div>
    <hr class="border-t-1 border-gray-300 mt-5" />
    <div class="text-xl text-left font-bold mb-2">General</div>
    <div
      v-for="(value, key) in renderGeneralData(vehicle)"
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
          v-for="(value, key) in renderRangeData(vehicle)"
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
        v-for="(value, key) in renderPerformanceData(vehicle)"
        v-bind:key="key"
        class="w-full flex justify-between"
      >
        <span>{{ key }}</span>
        <span class="font-bold">{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VehicleDetails',
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
    renderGeneralData: {
      type: Function,
      required: true,
    },
    renderRangeData: {
      type: Function,
      required: true,
    },
    renderPerformanceData: {
      type: Function,
      required: true,
    },
  },
}
</script>
