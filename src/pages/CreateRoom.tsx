import { observer } from "mobx-react-lite";
import GameStore from "../store/GameStore";
import "../styles/Modal.scss";

const CreateRoom: React.FC = () => {
  return (
    <div className="modal">
      <input
        className="input__username"
        type="text"
        placeholder="Enter your name..."
      />
      <span>Give this code to your friends so they can join!</span>
      <div>
        <p>{GameStore.roomId}</p>
      </div>
      <div className="buttonsGroup">
        <button className="button_white">Start game</button>
        <button className="button_red">Delete room</button>
      </div>
    </div>
  );
};

export default observer(CreateRoom);
