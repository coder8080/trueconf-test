import config from '@/config'
const elevators = []
for (let i = 0; i < config.elevatorsCount; i++)
  elevators.push({ state: 0, nextFloor: 0 })

const state = {
  elevators,
  queue: [],
  queueSet: new Set(),
  waitingFloors: new Set(),
  workingFloors: new Set(),
}

export const mutationTypes = {
  addToQueue: '[ELEVATORS] ADD TO QUEUE',
  deactivateFloor: '[ELEVATORS] DEACTIVATE FLOOR',
  elevatorReady: '[ELEVATORS] ELEVATOR READY',
}

const mutations = {
  [mutationTypes.addToQueue](state, floor) {
    floor -= 1
    if (state.queueSet.has(floor)) return

    let freeElevator = null
    let distance = Infinity

    for (let elevator of state.elevators) {
      if (elevator.nextFloor === floor) return
      console.log(elevator.nextFloor)
      if (elevator.state === elevator.nextFloor) {
        if (
          freeElevator === null ||
          Math.abs(elevator.state - floor) < distance
        ) {
          freeElevator = elevator
          distance = Math.abs(elevator.state - floor)
        }
      }
    }
    state.waitingFloors.add(floor + 1)

    if (!freeElevator) {
      state.queue.push(floor)
      state.queueSet.add(floor)
      return
    }

    freeElevator.nextFloor = floor
    state.workingFloors.add(floor + 1)
  },

  [mutationTypes.elevatorReady](state, i) {
    state.elevators[i].state = state.elevators[i].nextFloor
    state.queueSet.delete(state.elevators[i].nextFloor)
    state.workingFloors.delete(state.elevators[i].nextFloor + 1)
    if (state.queue.length > 0) {
      const floor = state.queue.shift()
      state.elevators[i].nextFloor = floor
      state.workingFloors.add(floor + 1)
    }
  },

  [mutationTypes.deactivateFloor](state, floor) {
    state.waitingFloors.delete(floor + 1)
  },
}

export default { state, mutations }
