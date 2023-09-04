import { Server } from 'socket.io';
import { DefaultEventsMap } from "socket.io/dist/typed-events";


const socketConfig = async(io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    
    let activeUsers : {userId:string,socketId:string}[] = []
    
    io.on('connection', (socket) => {
        console.log('socket io connected'.bg_magenta.bold);
        

        //add new user
        socket.on('new-user-add',(userId)=>{
            if(!activeUsers.some((user)=>user?.userId ===userId)){
                activeUsers.push({
                    userId:userId,
                    socketId:socket.id
                })
            }
            io.emit('get-users',activeUsers)
        })

        //send message
        socket.on("send-message", (data) => {
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId);
            if (user) {
              io.to(user.socketId).emit("receive-message", data);
            }
        });

        socket.on('send-notification',(data) => {
            const {receiver} = data;
            const user = activeUsers.find((user) => user.userId === receiver);
            if(user){
                io.to(user.socketId).emit('get-notification',data)
            }
        })

        socket.on('typing',(room)=>socket.in(room).emit('typing'))
        socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'))


        //remove disconnected users
        socket.on('disconnect',()=>{
            activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id)
            io.emit('get-users',activeUsers)
        })
    });
}
export default socketConfig