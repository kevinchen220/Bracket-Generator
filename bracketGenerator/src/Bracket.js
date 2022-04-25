import { useEffect, useState } from "react";

const { nanoid } = require("nanoid");

async function fetchBracket(url) {
  let response = await fetch(`https://bracketsbackend.herokuapp.com/${url}`);
  response = await response.json();
  console.log(response);
  return response;
}

function Bracket(props) {
  const [bracket, updateBracket] = useState([]);
  const [link, setLink] = useState(nanoid(10));
  console.log(bracket);

  useEffect(() => {
    console.log(bracket);
    fetchBracket(props.url).then((data) => updateBracket(data.bracket));
    if (props.url !== "") {
      setLink(props.url);
    }
  }, [props.url]);

  console.log(props.data);
  console.log(JSON.parse(JSON.stringify(props.data["names"])));
  var size = JSON.parse(JSON.stringify(props.data["names"])).length;
  var minSize = size;
  console.log(bracket);
  var bracketSize = 2;
  var seeds = [1, 2];

  function increaseSize(seeds) {
    let currentSize = seeds.length;
    let newSeeds = [];
    for (let i = 0; i < currentSize; ++i) {
      if (i % 2 === 0) {
        newSeeds.push(seeds[i]);
        newSeeds.push(2 * currentSize - seeds[i] + 1);
      } else {
        newSeeds.push(2 * currentSize - seeds[i] + 1);
        newSeeds.push(seeds[i]);
      }
    }
    return newSeeds;
  }

  function advancePlayer(round, match, seed) {
    let nextRound = round + 1;
    let nextMatch = match - 1;
    let newBracket = bracket;
    newBracket[nextRound][nextMatch] = seed;

    let length = bracket.length;
    let placeholder = bracket[0].length + 1;
    for (let i = nextRound + 1; i < length; ++i) {
      let roundSize = bracket[i].length;
      for (let j = 0; j < roundSize; ++j) {
        if (!bracket[i - 1].includes(bracket[i][j])) {
          bracket[i][j] = placeholder;
        }
      }
    }
    updateBracket([...newBracket])
    console.log("ASKJDHKASJHDKLASJHDKLASHJD");
  }

  if (minSize < 2) {
    minSize = 2;
  }

  while (bracketSize < minSize) {
    seeds = increaseSize(seeds);
    bracketSize *= 2;
  }

  bracketSize /= 2;

  console.log(minSize);
  console.log(bracketSize);
  console.log(seeds);
  console.log(bracket);
  var newBracket = [];
  if (JSON.stringify(seeds) !== JSON.stringify(bracket[0])) {
    newBracket.push(seeds);
    let length = seeds.length;
    for (let i = bracketSize; i >= 1; i /= 2) {
      var nextRound = [];
      for (let j = 0; j < i; ++j) {
        nextRound.push(length + 1);
      }
      newBracket.push(nextRound);
    }
    console.log(newBracket);
    console.log(bracket);
    updateBracket([...newBracket])
    console.log("ASKJDHKASJHDKLASJHDKLASHJD");
  } else {
    newBracket = bracket;
  }
  console.log(seeds);
  console.log(bracket);
  var rounds = [];

  var clicked = [];
  for (let i = 0; i < bracket.length - 1; ++i) {
    var roundClicked = [];
    for (let j = 0; j < bracket[i].length; ++j) {
      if (
        bracket[i + 1].includes(bracket[i][j]) &&
        bracket[i][j] < bracket[0].length + 1
      ) {
        roundClicked.push(true);
      } else {
        roundClicked.push(false);
      }
    }
    clicked.push(roundClicked);
  }

  console.log(clicked);
  for (let i = bracketSize; i >= 1; i /= 2) {
    var round = [];
    for (let j = 1; j <= i; j++) {
      var first =
        size >= newBracket[Math.log2(bracketSize / i)][j * 2 - 2]
          ? props.data["names"][
              newBracket[Math.log2(bracketSize / i)][j * 2 - 2] - 1
            ].name
          : "";
      var second =
        size >= newBracket[Math.log2(bracketSize / i)][j * 2 - 1]
          ? props.data["names"][
              newBracket[Math.log2(bracketSize / i)][j * 2 - 1] - 1
            ].name
          : "";
      round.push(
        <div className="game">
          <div className="match">
            <button
              className="top"
              onClick={() =>
                advancePlayer(
                  Math.log2(bracketSize / i),
                  j,
                  newBracket[Math.log2(bracketSize / i)][j * 2 - 2]
                )
              }
              disabled={
                !first || clicked[Math.log2(bracketSize / i)][j * 2 - 2]
              }
            >
              {first}
            </button>
            <button
              className="bot"
              onClick={() =>
                advancePlayer(
                  Math.log2(bracketSize / i),
                  j,
                  newBracket[Math.log2(bracketSize / i)][j * 2 - 1]
                )
              }
              disabled={
                !second || clicked[Math.log2(bracketSize / i)][j * 2 - 1]
              }
            >
              {second}
            </button>
          </div>
        </div>
      );
    }
    rounds.push(round);
  }

  rounds.push(
    <button className="winner">
      {size >= newBracket[newBracket.length - 1][0]
        ? props.data["names"][newBracket[newBracket.length - 1][0] - 1].name
        : ""}
    </button>
  );

  const showLink = async () => {
    document.getElementById("link").style.display = "block";
    const body = {
      url: link,
      bracket: bracket,
      names: JSON.parse(JSON.stringify(props.data["names"])),
    };
    console.log(body);
    await fetch("https://bracketsbackend.herokuapp.com/storeBracket", {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-cache",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    }).then(console.log("Successful POST"));
  };

  return (
    <div>
      <div className="d-flex flex-row">
        {rounds.map((round) => (
          <div className="d-flex flex-column col-3 justify-content-around">
            {round}
          </div>
        ))}
      </div>
      <div className="d-flex flex-row mt-3 ">
        <button className="btn btn-success btn-lg" onClick={showLink}>
          Save
        </button>
        <div className="card" id="link">
          {/* For localhost */}
          {/* <div className="card-body">
            View at: {" "}
            <a
              href={`http://localhost:3000/Bracket-Generator/${link}`}
            >{`http://localhost:3000/Bracket-Generator/${link}`}</a>
          </div>{" "} */}
          {/* For firebase */}
          <div className="card-body">
            View at:{" "}
            <a
              href={`https://bracketgenerator-220.web.app/${link}`}
            >{`https://bracketgenerator-220.web.app/${link}`}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bracket;
