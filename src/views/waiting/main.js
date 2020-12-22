import React from "react";

import "./main.css";

class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

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
    return (
      <div id="waitingRoom">

          <div>
              <p>People Connected:</p>

               
          </div>

        <h1>Waiting room</h1>

        <div id="roomCodeContainer">
            <p>{this.state.roomID}</p>
        </div>
      </div>
    );
  }
}

export default WaitingRoom;
