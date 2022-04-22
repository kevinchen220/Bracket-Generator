import { useState } from "react";

function Bracket(props) {
  const [bracket, updateBracket] = useState([]);

  let size = props.data["players"].length;
  let minSize = size;
  let bracketSize = 2;
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
    updateBracket([...newBracket]);
  }

  if (minSize < 2) {
    minSize = 2;
  }

  while (bracketSize < minSize) {
    seeds = increaseSize(seeds);
    bracketSize *= 2;
  }

  bracketSize /= 2;

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
    updateBracket([...newBracket]);
  } else {
    newBracket = bracket;
  }
  console.log(seeds);
  console.log(bracket);
  var rounds = [];

  var clicked = [];
  for (let i = 0; i < bracket.length - 1; ++i) {
    var roundClicked = []
    for (let j = 0; j < bracket[i].length; ++j) {
      if (bracket[i + 1].includes(bracket[i][j])) {
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
          ? props.data["players"][
              newBracket[Math.log2(bracketSize / i)][j * 2 - 2] - 1
            ].name
          : "";
      var second =
        size >= newBracket[Math.log2(bracketSize / i)][j * 2 - 1]
          ? props.data["players"][
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
              disabled={!first || clicked[Math.log2(bracketSize / i)][j * 2 - 2]}
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
              disabled={!second || clicked[Math.log2(bracketSize / i)][j * 2 - 1]}
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
        ? props.data["players"][newBracket[newBracket.length - 1][0] - 1].name
        : ""}
    </button>
  );

  return (
    <div className="d-flex flex-row">
      {rounds.map((round) => (
        <div className="d-flex flex-column col-3 justify-content-around">
          {round}
        </div>
      ))}
    </div>
  );
}

export default Bracket;
