import "./App.css";
import Input from "./Input.js";
import PlayerDisplay from "./Playerdisplay";
import Bracket from "./Bracket";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [data, addPlayers] = useState({ names: [] });
  const [first, setFirst] = useState(true);

  console.log(data);

  let params = useParams();
  let url = "";
  if (JSON.stringify(params) !== "{}") {
    url = params.url;
  }

  useEffect(() => {
    fetchBracket(url).then((data) => addPlayers({ names: data.names }));
    console.log(data);
    setFirst(false);
  }, [url]);

  var names = data;

  if (first) {
    const getNames = async () => {
      names.names = await fetchBracket(url).then((data) => {
        return data.names;
      });
    }
    getNames();
  }

  function updatePlayer(newPlayer) {
    let names = data["names"];
    newPlayer.id = names.length + 1;
    names.push(newPlayer);
    addPlayers({ names: names });
    //console.log(data["names"]);
  }

  const deletePlayer = (id) => {
    let names = data["names"];
    names.splice(id, 1);
    for (let i = 0; i < names.length; ++i) {
      names[i].id = i + 1;
    }
    addPlayers({ names: names });
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <Input data={names} addPlayer={updatePlayer} />
      </div>
      <Bracket data={names} url={url} key="bracket" />
      <div className="row mt-3">
        <PlayerDisplay data={names} deletePlayer={deletePlayer} />
      </div>
    </div>
  );
}

async function fetchBracket(url) {
  let response = await fetch(`https://bracketsbackend.herokuapp.com/${url}`);
  response = await response.json();
  console.log(response);
  return response;
}

export default App;
