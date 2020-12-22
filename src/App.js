import logo from './logo.svg';
import './App.css';

import react from 'react';

import NewGame from './views/newGame/main'

import WaitingRoom from './views/waiting/main'



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

 

class App extends react.Component {
  

  constructor(props){
    super(props)
    this.state={
      categories:[],
      roomData:null,
      connectedUsers:123
    }
  }

  componentDidMount() { 
    //establish connection to socket


    //lets generate a rootid

    let guid = () => {
      let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }
      //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

    

    if(localStorage.getItem("genid")==null){
      var rid=guid()
      localStorage.setItem("genid",rid)
    }else{
      var genid= localStorage.getItem("genid")

      console.log(genid)
    }



  // client-side
      const io = require("socket.io-client");
      const socket = io("192.168.0.20:3000", {
        withCredentials: false,
        extraHeaders: {
          "my-custom-header": "abcd"
        }
      });

      this.socket=socket;


      socket.on("playerConnected",(msg)=>{

        if(this.state.roomData==null){
          //were not waiting so lets ignore the connected user
        }else{
          //update connection list
          var roomID= this.state.roomData.roomID;
          if(roomID== msg.roomID){
            this.setState({
              connectedUsers:msg.connectedUsers
            })
          }
        }
        console.log(msg)
      })
 
      socket.on("joinRoomResponse",(msg)=>{
        if(msg.status=="ERR"){
          alert(msg.msg)
        }
      })

      socket.on("roomCreated",(msg)=>{
       this.setState({
         roomData:msg
       })
 
      })
   

  }



  sendMessageToSocket=(msg)=>{
    
    if(msg.action=="JOINROOM"){
      this.socket.emit("joinRoom",msg)
    }

    if(msg.action=="CREATEROOM"){
    this.socket.emit("createRoom",msg)
    }
  }


  render(){

    //let
    let renderComp=null

    if(this.state.roomData==null){
      renderComp= <NewGame sendMessageToSocket={this.sendMessageToSocket} id="app"></NewGame>
    }else{
      renderComp= <WaitingRoom connectedUsers={this.props.connectedUsers} roomData={this.state.roomData} ></WaitingRoom>
    }

  return (
   <Router>

    <Switch>
   


     <Route path="/">
       
        {renderComp}
     </Route>
      

     </Switch>

   </Router>
  );
  }
}

export default App;
