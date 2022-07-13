<template>
  <div class="elevators">
    <app-elevator v-for="i in elevatorCount" :number="i - 1" :key="i" />
  </div>
</template>
<script>
import AppElevator from '@/components/Elevator.vue'
import config from '@/config'

export default {
  name: 'AppElevatorManager',
  components: {
    AppElevator,
  },
  data() {
    return {
      elevatorCount: config.elevatorsCount,
    }
  },
}
</script>
<style scoped>
.elevators {
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 100%;
}
</style>
