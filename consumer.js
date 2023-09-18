const amqplib = require('amqplib')
const uuid = require('uuid')
const queueName = process.argv[2] || "jobsQueue"

async function connect(){
  try{
    const connection = await amqplib.connect("amqp://localhost:5672")
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName)

    console.log("Waiting message...")
    channel.consume(queueName, message=>{
      console.log("Response Message : ", message.content.toString())
      channel.ack(message)
    }) 

  }catch(error){
    console.log("Errorrr!!11", error )
  } 
}


connect();