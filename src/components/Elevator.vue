<template>
  <div class="elevator">
    <div class="elevator__mine">
      <div
        class="elevator__cabin"
        :class="{ elevator__cabin_resting: isRestng }"
        :style="{
          bottom: `${target * percentPerFloor}%`,
          transition: `bottom ${Math.abs(state - target)}s linear`,
          height: `${percentPerFloor}%`,
        }"
      >
        <div class="elevator__indicator">
          <div
            :style="{ '-webkit-mask': `url(${imageUrl})` }"
            class="elevator__icon"
          />
          <span class="elevator__floor">{{ nextFloor + 1 }}</span>
        </div>
      </div>
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
      isRestng: false,
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
      percentPerFloor: () => 100 / config.floorsCount,
      imageUrl() {
        let name
        if (this.state === this.nextFloor || this.isRestng) {
          name = 'circle'
        } else if (this.state > this.nextFloor) {
          name = 'arrow-down'
        } else {
          name = 'arrow-up'
        }
        return require(`../assets/${name}.svg`)
      },
    }),
  },
  watch: {
    async nextFloor(nextFloor) {
      this.target = nextFloor
      await delay(Math.abs(this.state - this.target) * 1000)
      this.$store.commit(mutationTypes.deactivateFloor, nextFloor)
      this.isRestng = true
      await delay(3000)
      this.isRestng = false
      this.$store.commit(mutationTypes.elevatorReady, this.number)
    },
  },
}
</script>
<style scoped>
.elevator__mine {
  height: 100%;
  width: 100px;
  border-left: 3px solid #dfdfdf;
  border-right: 3px solid #dfdfdf;
  position: relative;
}

.elevator__cabin {
  background-color: #9efcfb;
  position: absolute;
  left: 0;
  right: 0;
  animation: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes rest {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

.elevator__cabin_resting {
  animation: rest 1s linear infinite;
}

.elevator__icon {
  width: 20px;
  height: 20px;
  background-color: white;
}

.elevator__indicator {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
  margin-top: 7px;
}
</style>
