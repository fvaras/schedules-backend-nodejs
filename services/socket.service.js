module.exports.connection = (socket, io) => (schedulesService) => {

    console.log('connected', socket.id)

    socket.emit('update', schedulesService.getStatus())

    socket.on('setSchedule', schedule => {
        schedulesService.update(schedule, socket.id)
        io.emit('update', schedulesService.getStatus())
    })

    socket.on('disconnect', () => {
        console.log('disconnected', socket.id)
        schedulesService.cleanDisconnected(socket.id)
        io.emit('update', schedulesService.getStatus())
    })
}