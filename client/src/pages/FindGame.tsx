import { observer } from "mobx-react-lite";
import React from "react";
import GameService from "../api/game.service";
import GameStore from "../store/GameStore";
import "../styles/Modal.scss";

type startingPageState = "start" | "join" | "create";

type StartProps = {
  setModal: (data: startingPageState) => void;
};

const StartingPoint: React.FC<StartProps> = ({ setModal }) => {
  return (
    <div className="buttonsWrapper">
      <div>
        <p>Create a new room, so your friends can join</p>
        <button
          className="button_white"
          onClick={() => {
            GameService.createRoom().finally(() => {
              setModal("create");
            });
          }}
        >
          CREATE
        </button>
      </div>
      <div>
        <p>Join a room one of your friends just created</p>
        <button className="button_white" onClick={() => setModal("join")}>
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
      <input id="access-code" maxLength={6} />

      <button className="button_white">JOIN</button>
    </div>
  );
};

const FindGamePage: React.FC = () => {
  const [modal, setModal] = React.useState<startingPageState>("start");
  const [username, setUsername] = React.useState<string>("");
  React.useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) {
      setUsername(name);
    }
    const uuid = localStorage.getItem("uuid");
    const access_code = localStorage.getItem("access_code");
    if (uuid && access_code) {
      GameService.getRoomData(uuid, access_code);
    }
  }, []);
  const handleNameChange = (name: string) => {
    setUsername(name);
    localStorage.setItem("username", name);
  };
  return (
    <div className="modal">
      <div className="modal__header">
        {modal === "join" && (
          <button
            className="modal__header__return-btn"
            onClick={() => {
              setModal("start");
            }}
          ></button>
        )}
        <input
          maxLength={20}
          placeholder="Choose a nickname!"
          className="usernameInput"
          onChange={(e) => handleNameChange(e.target.value)}
          value={username}
          type="text"
          required
        />
      </div>
      {modal === "start" ? (
        <StartingPoint setModal={setModal} />
      ) : modal === "join" ? (
        JoinRoom(setModal)
      ) : modal === "create" ? (
        CreatingNewRoom()
      ) : (
        ""
      )}
    </div>
  );
};

export default observer(FindGamePage);
