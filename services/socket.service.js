module.exports.connection = (socket, io) => (schedulesService) => {


    socket.emit('update', schedulesService.getStatus())

    socket.on('setSchedule', schedule => {
        schedulesService.update(schedule, socket.id)
        io.emit('update', schedulesService.getStatus())
    })

    socket.on('disconnect', () => { })
}