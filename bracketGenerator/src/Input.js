import { useState } from "react";

function Input(props) {
  const [name, setName] = useState("");

  const buttonPress = () => {
    if (name.trim() !== "") {
      props.addPlayer({ name: name });
    }

    const nameInput = document.getElementById("name-field");
    nameInput.value = "";
    setName("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      buttonPress();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add Players</h1>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-floating">
            <input
              id="name-field"
              type="text"
              className="form-control mb-3"
              placeholder="Player Name"
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="name-field">Player Name</label>
          </div>
        </div>
        <div className="col">
          <button
            type="button"
            className="col-2 btn btn-primary btn-lg"
            style={{ height: 58 }}
            onClick={buttonPress}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
