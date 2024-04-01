const ampqlib = require('amqplib')

const queueName = "aslam"
const message = "Hello"

const sendMsg = (async () => {
    const connect = await ampqlib.connect('amqp://localhost')
    const channel = await connect.createChannel()
    await channel.assertQueue(queueName, { durable: false })
    console.log(`waiting for the message from queue ${queueName}`)
    channel.consume(queueName, msg => {
        console.log(`message ${msg.content.toString()}`)
    }, { noAck: true })
})
sendMsg()