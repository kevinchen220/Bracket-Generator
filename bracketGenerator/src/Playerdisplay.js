function PlayerDisplay(props) {
  console.log(props.data["names"]);
  let players = JSON.parse(JSON.stringify(props.data["names"]));
  return (
    <div className="col-4">
      <table className="table table-sm table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" className="col-2">ID</th>
            <th scope="col" className="col-5">Player Names</th>
            <th scope="col" className="col-1"></th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr>
              <td className="col-2">{player.id}</td>
              <td className="col-5">{player.name}</td>
              <td className="col-1">
                <button
                  /*id={player.id}*/
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => props.deletePlayer(player.id - 1)}
                ></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerDisplay;
