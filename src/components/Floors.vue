<template>
  <div class="floors">
    <div class="floors__floor" v-for="floor in floorCount" :key="floor">
      <span class="floors__title">{{ floor }}</span>
      <button class="floors__button" @click="addToQueue(floor)">⏺</button>
    </div>
  </div>
</template>
<script>
import config from '@/config'
import { mutationTypes } from '@/store/modules/elevators'

export default {
  name: 'AppFloors',
  methods: {
    addToQueue(floor) {
      this.$store.commit(mutationTypes.addToQueue, floor)
    },
  },
  data() {
    return {
      floorCount: config.floorsCount,
    }
  },
}
</script>
<style scoped>
.floors {
  display: flex;
  flex-direction: column-reverse;
}

.floors__floor {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
