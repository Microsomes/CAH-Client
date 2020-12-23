import React from 'react';

import "./main.css"


class ConnectedCoponent extends React.Component{

    constructor(props){
        super(props)

        this.state={
            waitingMessage:'',
            allColors:
                ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
                'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
                'silver', 'teal', 'white', 'yellow'
            ],
            allPresetMessages:[
                "LETS BEGIN",
                "COMMMON",
                "IM WAITING BRUHHHH",
                "FUCKING BEGIN"
            ]
        }
    }

    handleWaitingMessage=(e)=>{
        this.setState({
            waitingMessage:e.target.value
        })
    }

    sendMessage= (e)=>{
        if(e.key=="Enter"){
            this.props.sendMessageToSocket({
                action:"WAIITNGMESSAGE",
                data:{
                    msg:this.state.waitingMessage
                }
            })
            this.setState({
                waitingMessage:""
            })
        }
    }

    changeColor=(e)=>{
        this.props.sendMessageToSocket({
            action:"WAIITNGMESSAGE",
            data:{
                msg:":bg:"+e
            }
        })
    }

    render(){


        var allButtons= this.state.allColors.map((item)=>
        <button onClick={(e)=>{
            this.changeColor(item)
        }}>{item}</button>
        );


        return (
            <div id="mainCont">
                <h1>Connected waiting for game to begin</h1>

                <h2>Connected to room id: {this.props.connectedRoom}</h2>

                <input onKeyUp={this.sendMessage} onChange={this.handleWaitingMessage} value={this.state.waitingMessage} type="text" placeholder="enter a message"></input>

                <div>
                    <p>Send -Preset messages</p>
                </div>

                <div id="changeColorContainer">
                    <p>Change background color:</p>
                    <p>Sezire warning bruh, be careful</p>
                    {allButtons}
                </div>
            
            </div>
        )
    }

}


export default ConnectedCoponent;