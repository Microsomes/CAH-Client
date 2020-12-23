import React from "react";

import "./main.css";

class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);

 

    var roomID = props.roomData.roomID;

    function pad(n, width, z) {
      z = z || "0";
      n = n + "";
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join(z) + n;
    }

    var paddingzero = pad(parseInt(roomID), 3);

    this.state = {
      roomID: paddingzero,
    };
  }

  render() {
    const connectedUsers = this.props.connectedUsers

    const connectedUsersList = connectedUsers.map((person) =>
        <div id="connectedUserList">
        <h2>{person.nickName}</h2>
        </div>
        );


    const messages= this.props.waitingMessagesArr;

    const messagesList= messages.map((messages)=>
    <p> ({messages.senderData}) {messages.value}</p>
    ); 


    return (
      <div style={{backgroundColor:this.props.backgroundColor}}  id="waitingRoom">

          <div  id="peopleConnectedCont">
              <p>People Connected:</p>
              {connectedUsersList}

              ---------------------------
              {messagesList}
           </div>

        <h1>{this.props.waitingRoomTVTitle}</h1>

        <div id="roomCodeContainer">
            <p>{this.state.roomID}</p>
        </div>
      </div>
    );
  }
}

export default WaitingRoom;
