import logo from './logo.svg';
import './App.css';

import react from 'react';

 

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

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <p>
         {this.state.categories}
        </p>
        
           
      </header>
    </div>
  );
  }
}

export default App;
