const addMinutes = require('date-fns/addMinutes');

module.exports = (() => {
    // schedules logic
    let schedules = []
    const schedulesLength = 24
    const capacity = process.env.NUMBER_OF_RESOURCES || 8

    const init = () => {
        schedules = []
        const initialDate = new Date(2021, 1, 19, 8, 0)
        for (let i = 0; i < schedulesLength; i++) {
            schedules.push({
                id: i + 1,
                start: addMinutes(initialDate, 30 * i),
                end: addMinutes(initialDate, 30 * (i + 1)),
                isAvailable: true,
                user: null
            })
        }
    }

    const generateData = () => {
        const isFull = schedules.filter(schedule => !schedule.isAvailable).length >= capacity
        return {
            schedules,
            isFull
        }
    }

    return {
        getStatus: () => {
            if (schedules.length === 0)
                init()
            return generateData()
        },

        update: (schedule, user) => {
            const { id, isAvailable } = schedule
            const scheduleToUpdate = schedules.filter(p => p.id === id)[0]

            scheduleToUpdate.isAvailable = isAvailable
            scheduleToUpdate.user = isAvailable ? null : user
        },

        cleanAll: () => {
            init()
        }
    }

})()