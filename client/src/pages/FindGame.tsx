import { observer } from "mobx-react-lite";
import React from "react";
import GameStore from "../store/GameStore";
import "../styles/Modal.scss";

type startingPageState = "start" | "join" | "create";

const StartingPoint = (
  setPageState: (data: startingPageState) => void
): JSX.Element => {
  return (
    <div className="buttonsWrapper">
      <div>
        <p>Create a new room, so your friends can join</p>
        <button className="button_white" onClick={() => setPageState("create")}>
          CREATE
        </button>
      </div>
      <div>
        <p>Join a room one of your friends just created</p>
        <button className="button_white" onClick={() => setPageState("join")}>
          JOIN
        </button>
      </div>
    </div>
  );
};

const CreatingNewRoom = (): JSX.Element => {
  return (
    <>
      <span>Give this code to your friends so they can join!</span>
      <div>
        <p>{GameStore.roomId}</p>
      </div>
      <div className="buttonsGroup">
        <button className="button_white">Start game</button>
        <button className="button_red">Delete room</button>
      </div>
    </>
  );
};

const JoinRoom = (
  setPageState: (data: startingPageState) => void
): JSX.Element => {
  return (
    <div className="modal__code">
      <p>Ask for the room code and paste it here:</p>
      <input maxLength={6} />
    </div>
  );
};

const FindGamePage: React.FC = () => {
  const [pageState, setPageState] = React.useState<startingPageState>("start");
  return (
    <div className="modal">
      <div className="modal__header">
        <input
          maxLength={20}
          placeholder="Choose a nickname!"
          className="usernameInput"
          type="text"
        />
      </div>
      {pageState === "start"
        ? StartingPoint(setPageState)
        : pageState === "join"
        ? JoinRoom(setPageState)
        : pageState === "create"
        ? CreatingNewRoom()
        : ""}
    </div>
  );
};

export default observer(FindGamePage);
