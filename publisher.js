const amqplib = require('amqplib')
// const uuid = require('uuid')
const uuid = require('uuid')

const message = {
  id: uuid.v4(),
  description: 'Created product!' 
}
const queueName = process.argv[2] || "jobsQueue"


async function connect(){
  try{
    const connection = await amqplib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName)

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
    console.log("Gönderilen mesaj : ",message)
  }catch(error){
    console.log("Errorrr!!11",error )
  } 
}

// let id = uuid.v1()
// console.log(id)
connect();