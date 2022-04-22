import "./App.css";
import Input from "./Input.js";
import PlayerDisplay from "./Playerdisplay";
import Bracket from "./Bracket";
import { useState } from "react";

function App() {
  const [data, addPlayers] = useState({ players: [] });

  const updatePlayer = (newPlayer) => {
    let players = data["players"];
    newPlayer.id = players.length + 1;
    players.push(newPlayer);
    addPlayers({ players: players });
    //console.log(data["players"]);
  };

  const deletePlayer = (id) => {
    let players = data["players"];
    players.splice(id, 1);
    for (let i = 0; i < players.length; ++i) {
      players[i].id = i + 1;
    }
    addPlayers({ players: players });
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <Input addPlayer={updatePlayer} />
      </div>
      <Bracket data={data} />
      <div className="row mt-3">
        <PlayerDisplay data={data} deletePlayer={deletePlayer} />
      </div>
      
    </div>
  );
}

export default App;
