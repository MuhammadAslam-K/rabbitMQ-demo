const ampqlib = require('amqplib')

const queueName = "aslam"

const sendMsg = (async () => {
    const connect = await ampqlib.connect('amqp://localhost')
    const channel = await connect.createChannel()
    await channel.assertQueue(queueName, { durable: false })
    for (let i = 0; i < 1000; i++) {

        const message = `Msg no ${i}`
        channel.sendToQueue(queueName, Buffer.from(message))
    }
    console.log("send data to queue")
    setTimeout(() => {
        connect.close()
        process.exit(0)
    }, [500])
})
sendMsg()