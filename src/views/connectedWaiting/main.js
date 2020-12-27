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
            ],
            videos:[
                {
                    name:"Pause"
                },
                {
                    name:"Play"
                },
               {
                   name:"intro",
                   link:"https://www.youtube.com/watch?v=VlSUyM_mIUw"
               }
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

    sendPresetMessage= (msg)=>{
        this.props.sendMessageToSocket({
            action:"WAIITNGMESSAGE",
            data:{
                msg:msg
            }
        })
    }

    sendVideoTo= (msg)=>{

        if(msg.name=="Play"){
             this.props.sendMessageToSocket({
                action:"WAIITNGMESSAGE",
                data:{
                    msg:">play"
                }
            })
            return;
        }

        if(msg.name=="Pause"){
            this.props.sendMessageToSocket({
                action:"WAIITNGMESSAGE",
                data:{
                    msg:">pause"
                }
            })
            return ;
        }
        this.props.sendMessageToSocket({
            action:"WAIITNGMESSAGE",
            data:{
                msg:">video>"+msg.link
            }
        })

        setTimeout(()=>{
            this.props.sendMessageToSocket({
                action:"WAIITNGMESSAGE",
                data:{
                    msg:">play"
                }
            })
        },1000)
    }

    render(){


        var allButtons= this.state.allColors.map((item)=>
        <button onClick={(e)=>{
            this.changeColor(item)
        }}>{item}</button>
        );

        var presetText= this.state.allPresetMessages.map((item)=>
            <button onClick={(e)=>{
                this.sendPresetMessage(item)
            }}>{item}</button>
        );


        var allVideos= this.state.videos.map((item,index)=>{
            return <button onClick={(e)=>{
                this.sendVideoTo(item)
            }} key={item.name}>
                {item.name}
            </button>
        });

        return (
            <div id="mainCont">
                <h1>Connected waiting for game to begin</h1>

                <h2>Connected to room id: {this.props.connectedRoom}</h2>

                <div>
                    {allVideos}
                </div>
 

                <input onClick={(e)=>{

                }} onKeyUp={this.sendMessage} onChange={this.handleWaitingMessage} value={this.state.waitingMessage} type="text" placeholder="enter a message"></input>

                <div>
                    <p>Send -Preset messages</p>
                    {presetText}
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