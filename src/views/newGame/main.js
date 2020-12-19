import react from 'react';
import "./main.css"


class NewGame extends react.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
           <div id="newGameContainer">
               <div id="intro">
                   <h1>Enjoy humorous laughter this christmas</h1>
                   <p>Powered by https://api.maeplet.com - special thanks to Microsomes for giving us access to their api</p>
               </div>

                <div id="second">

                <button>New  Game</button>
                <button>Join Game</button>

                </div>

           </div>
        )
    }
}


export default NewGame;
