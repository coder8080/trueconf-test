import config from '@/config'
const elevators = []
for (let i = 0; i < config.elevatorsCount; i++)
  elevators.push({ state: 1, queue: [], sum: 0 })

const state = {
  elevators,
  queueSet: new Set(),
}
export const mutationTypes = {
  addToQueue: '[ELEVATORS] ADD TO QUEUE',
  elevatorReady: '[ELEVATORS] ELEVATOR READY',
}
const mutations = {
  [mutationTypes.addToQueue](floor) {
    if (config.elevatorsCount < 1) return
    if (state.queueSet.has(floor)) return

    let minElevator = { sum: Infinity }
    for (let elevator of state.elevators)
      if (elevator.sum < minElevator.sum) minElevator = elevator
    let plus
    if (minElevator.queue.length > 0) {
      plus = Math.abs(minElevator.queue[minElevator.queue.length - 1] - floor)
    } else {
      plus = Math.abs(minElevator.state - floor)
    }
    minElevator.queue.push(floor)
    minElevator.sum += plus

    state.queueSet.add(floor)
  },
  [mutationTypes.elevatorReady](i) {
    const elevator = state.elevators[i]
    if (!elevator || !elevator.queue) return

    const floor = elevator.queue.shift()
    elevator.sum -= Math.abs(floor - elevator.state)
    elevator.state = floor

    state.queueSet.delete(floor)
  },
}

export default { state, mutations }
