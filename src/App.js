import logo from './logo.svg';
import './App.css';

import react from 'react';

import NewGame from './views/newGame/main'


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
      categories:[]
    }
  }

  componentDidMount() { 
    //establish connection to socket

  // client-side
      const io = require("socket.io-client");
      const socket = io("192.168.0.20:3000", {
        withCredentials: false,
        extraHeaders: {
          "my-custom-header": "abcd"
        }
      });

      socket.on("init",(msg)=>{
        this.setState({
          categories:msg
        })
      })
   

  }



  sendMessageToSocket=()=>{
    alert("sending message")
  }


  render(){
  return (
   <Router>

    <Switch>
     <Route path="/">
        <NewGame sendMessageToSocket={this.sendMessageToSocket} id="app"></NewGame>
     </Route>

      

     </Switch>

   </Router>
  );
  }
}

export default App;
