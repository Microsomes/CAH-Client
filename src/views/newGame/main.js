import react from 'react';
import "./main.css"


//all components
import NewGameView from './components/newGame/main'

import JoinGame from './components/joinGame/main'

class NewGame extends react.Component{
    constructor(props){
        super(props);
        this.state={
            popup:"null"
        }
    }


    triggerPopUpNewGame=()=>{
         this.setState({
            popup:"newgame"
        })
    }


    triggerPopUpJoinGame=()=>{
        this.setState({
            popup:"joinGame"
        })
    }

    render(){
        let popup;
        if(this.state.popup!="null"){
            if(this.state.popup=="newgame"){
                popup=<div id="newGamePopUp"><NewGameView sendMessageToSocket={this.props.sendMessageToSocket} ></NewGameView></div>
            }else{
                popup=<div id="newGamePopUp">
                <JoinGame sendMessageToSocket={this.props.sendMessageToSocket}></JoinGame>
            </div>
            }
       }


        return(
           <div id="newGameContainer">

              {popup}
    

               <div id="intro">
                   <h1>Enjoy humorous laughter this christmas</h1>
                   <p>Powered by https://api.maeplet.com - special thanks to Microsomes for giving us access to their api</p>
               </div>

                <div id="second">

                <button onClick={this.triggerPopUpNewGame}>New  Game</button>
                <button onClick={this.triggerPopUpJoinGame}>Join Game</button>

                </div>

           </div>
        )
    }
}


export default NewGame;
