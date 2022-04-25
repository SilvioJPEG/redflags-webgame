import { observer } from "mobx-react-lite";
import CreateRoom from "./pages/CreateRoom";
import GameBoard from "./pages/GameBoard";
import GameStore from "./store/GameStore";

function App() {
  return (
    <>
    {!GameStore.roomId ? <CreateRoom/>:  <GameBoard />}

    </>
  );
}

export default observer(App);
