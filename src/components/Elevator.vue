<template>
  <div class="elevator">
    <div class="elevator__mine">
      <div
        class="elevator__cabin"
        :style="{
          bottom: `${target * percentPerFloor}%`,
          transition: `bottom ${Math.abs(state - target)}s linear`,
          height: `${percentPerFloor}%`,
        }"
      ></div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import config from '@/config'
import delay from '@/utilities/delay'
import { mutationTypes } from '@/store/modules/elevators'

export default {
  name: 'AppElevator',
  props: {
    number: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      target: 0,
    }
  },
  computed: {
    ...mapState({
      thisElevator: (state) => state.elevators.elevators[this.number],
      nextFloor: function (state) {
        return state.elevators.elevators[this.number].nextFloor
      },
      state: function (state) {
        return state.elevators.elevators[this.number].state
      },

      percentPerFloor: () => Math.floor(100 / config.floorsCount),
    }),
  },
  watch: {
    async nextFloor(nextFloor) {
      this.target = nextFloor
      await delay(Math.abs(this.state - this.target) * 1000 + 3000)
      this.$store.commit(mutationTypes.elevatorReady, this.number)
    },
  },
}
</script>
<style scoped>
.elevator__mine {
  height: 100%;
  width: 70px;
  border-left: 3px solid gray;
  border-right: 3px solid gray;
  position: relative;
}

.elevator__cabin {
  width: 100%;
  background-color: teal;
  position: absolute;
  left: 0;
}
</style>
