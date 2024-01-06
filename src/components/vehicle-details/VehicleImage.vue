<template>
  <div v-if="vehicle" class="col-span-12 lg:col-span-8">
    <img v-bind:src="vehicle.media.brand.thumbnail_url" alt="Brand Logo" />
    <img v-bind:src="vehicle.media.image.url" alt="Car Image" />
  </div>
</template>

<script>
export default {
  name: 'VehicleImage',
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
}
</script>
