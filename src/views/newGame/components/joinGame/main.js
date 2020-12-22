import React from 'react'

import "./main.css"

class JoinGame extends React.Component{
    constructor(props){
        super(props)

        this.state={
            nickName:"",
            roomCode:''
        }
    }

    

    
    joinGame= ()=>{

        if(this.state.roomCode.length==0 ||
            this.state.nickName.length==0
            ){
                alert("Nickname or code not entered")
                return;
            }
            
            var genid= localStorage.getItem("genid")


                this.props.sendMessageToSocket({

                    action: "JOINROOM",
                    data: {
                      roomCode:this.state.roomCode,
                      nickName:this.state.nickName,
                      genid: genid
                    },
                })
            

        }
    

    handleNickName=(e)=>{
        this.setState({
            nickName:e.target.value
        })
    }

    handleCode=(e)=>{
        this.setState({
            roomCode:e.target.value
        })
    }

    render(){
        return (
            <div id="joinGameContainer">
            <h1>Join Game</h1>
            <div>
            <input onChange={this.handleNickName} value={this.state.nickName} type="text" placeholder="nickName"></input>
            </div>

            <div>
            <input onChange={this.handleCode}  value={this.state.roomCode} type="number" placeholder="Enter room code"></input>
            </div>


            <div id="joinRoomBtnContianer">
            <button onClick={this.joinGame}>
                Join Room
            </button>
            </div>


            </div>
        )
    }
}


export default JoinGame