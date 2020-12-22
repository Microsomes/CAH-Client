import react from "react";

import "./main.css";


class NewGameView extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomNickName: "",
    };
  }

  processNewRoom = (e) => {
    //sends a request to socket to create a new room
    e.preventDefault();

    if(this.state.roomNickName.length==0){
        alert("Enter a room nickname bruh")
        return;
    }

    var genid= localStorage.getItem("genid")


    this.props.sendMessageToSocket({
      action: "CREATEROOM",
      data: {
        roomName: this.state.roomNickName
       },
    });

   };

  handleRoomTextChange = (e) => {
    this.setState({
      roomNickName: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <h1>So lets create a room...</h1>
        <h2>Please have a phone handy to play alongside the this webpage</h2>
        <li>Use a desktop to play this</li>
        <li>All players connect via their mobile devices</li>
        <li>Lets have some fun...</li>

        <form onSubmit={this.processNewRoom}>
          <input
            value={this.state.roomNickName}
            onChange={this.handleRoomTextChange}
            placeholder="room nickname"
            type="text"
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

export default NewGameView;
