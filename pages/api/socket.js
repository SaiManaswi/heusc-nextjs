import {Server} from 'socket.io'

var gpos = 0
const SocketHandel = (req,res)=>{
    if(res.socket.server.io){
        console.log("Already Exits")
    }
    else{
        console.log(`Creating new Server`)
        const io = new Server(res.socket.server)
        res.socket.server = io
        io.on('connection',socket =>{
            socket.on('player_move', (pos) => {
                pos = (pos+1) % 40
                console.log(pos)
                socket.broadcast.emit('setpos',pos) //--> is it called everytime??
            })
        })
    }
    res.end()
}


export default SocketHandel