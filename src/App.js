import logo from "./logo.svg";
import "./App.css";

import react,{useState} from "react";

import NewGame from "./views/newGame/main";

import WaitingRoom from "./views/waiting/main";

import ConnectedWaiting from "./views/connectedWaiting/main";


import VideoWatching from "./views/videoWatching/main"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



//hook example

 import Example from './hooks/Example/main'

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'black',
      categories: [],
      roomData: null,
      connectedUsers: [
        {
          nickName: "annon",
          socketIDs: [1, 2],
        },
      ],
      isConnected: false,
      connectedRoom: null,

      waitingMessagesArr: [{
        value: "hello world"
      }],

      waitingRoomTVTitle: "Waiting Room:",

      tvWaiting: 'main',
      videoVal: '',
      isPlaying: false,
    };
  }

  componentDidMount() {
    //establish connection to socket

    //lets generate a rootid

    let guid = () => {
      let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    };

    if (localStorage.getItem("genid") == null) {
      var rid = guid();
      localStorage.setItem("genid", rid);
    } else {
      var genid = localStorage.getItem("genid");

      console.log(genid);
    }

    // client-side
    const io = require("socket.io-client");
    const socket = io("192.168.0.31:3001", {
      withCredentials: false,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });

    this.socket = socket;

    socket.on("WAITINGMESSAGEres", (msg) => {


      if (this.state.roomData == undefined) {
        console.log("messenger");
      } else {
        //the tv
        console.log(this.state.roomData);
        console.log(msg);

        if (this.state.roomData.roomID == msg.roomID) {
          var allMessages = this.state.waitingMessagesArr;


          if (msg.data.msg[0] == ">") {
            var command = msg.data.msg.split(">");

            if (command[1] == "video") {
              this.setState({
                tvWaiting: "video",
                videoVal: command[2]
              })
            } else if (command[1] == "play") {
              this.setState({
                isPlaying: true
              })
            } else if (command[1] == "pause") {
              this.setState({
                isPlaying: false
              })
            }
          }

          if (msg.data.msg[0] == ":") {
            var command = msg.data.msg.split(":");
            if (command[1] == "bg") {
              var val = command[2];
              this.setState({
                backgroundColor: val
              })
            }

            if (command[1] == "main") {
              this.setState({
                tvWaiting: "main"
              })
            }


          }

          allMessages.push({
            value: msg.data.msg,
            data: msg,
            senderData: msg.senderData.playerData.nickName
          });

          this.setState({
            waitingMessagesArr: allMessages.reverse(),
          });
          console.log("message received on room");
          console.log(msg.data.msg);
        }
        console.log("reciever");
      }
    });

    socket.on("playerConnected", (msg) => {
      if (this.state.roomData == null) {
        //were not waiting so lets ignore the connected user
      } else {
        //update connection list
        var roomID = this.state.roomData.roomID;
        if (roomID == msg.roomID) {
          var connectedUsers = [];

          for (var user in msg.user.connectedUsers) {
            var data = msg.user.connectedUsers[user].playerData;
            connectedUsers.push({
              nickName: data.nickName,
              socketIDs: data.socketIDs,
            });
          }
          this.setState({
            connectedUsers: connectedUsers,
          });
        }
      }
      console.log(msg);
    });

    socket.on("joinRoomResponse", (msg) => {
      console.log("--->", msg);
      if (msg.status == "SUCCESS") {
        console.log("connected to room lets wait");
        this.setState({
          isConnected: true,
          connectedRoom: msg.data.roomID,
        });
        return;
      }
      if (msg.status == "ERR") {
        alert(msg.msg);
      }
    });

    socket.on("roomCreated", (msg) => {
      this.setState({
        roomData: msg,
      });
    });
  }

  sendMessageToSocket = (msg) => {
    console.log(msg);

    var genid = localStorage.getItem("genid");

    if (msg.action == "WAIITNGMESSAGE") {
      console.log("send message", msg.data);
      this.socket.emit("WAITINGMESSAGE", {
        data: msg.data,
        roomID: this.state.connectedRoom,
        genid: genid,
      });
    }

    if (msg.action == "JOINROOM") {
      this.socket.emit("joinRoom", msg);
    }

    if (msg.action == "CREATEROOM") {
      this.socket.emit("createRoom", msg);
    }
  };



  render() {
    //let
    let renderComp = null;

    if (this.state.roomData == null) {
      if (this.state.isConnected) {
        renderComp = (
          <ConnectedWaiting
            connectedRoom={this.state.connectedRoom}
            sendMessageToSocket={this.sendMessageToSocket}
          ></ConnectedWaiting>
        );
      } else {
        renderComp = (
          <div>
            <Example></Example>
          <NewGame
            sendMessageToSocket={this.sendMessageToSocket}
            id="app"
          ></NewGame>
          </div>
        );
      }
    } else {

      if (this.state.tvWaiting == "main") {
        renderComp = (
          <WaitingRoom
            waitingRoomTVTitle={this.state.waitingRoomTVTitle}
            waitingMessagesArr={this.state.waitingMessagesArr}
            backgroundColor={this.state.backgroundColor}
            connectedUsers={this.state.connectedUsers}
            roomData={this.state.roomData}
          ></WaitingRoom>
        );
      } else {
        renderComp = (
          <VideoWatching
            backgroundColor={this.state.backgroundColor}
            isPlaying={this.state.isPlaying}
            videoVal={this.state.videoVal}
          ></VideoWatching>
        );
      }

    }

    return (
      <Router>
        <Switch>
          <Route path="/">{renderComp}</Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
