import { observer } from "mobx-react-lite";
import FindGamePage from "./pages/FindGame";
import GameBoard from "./pages/GameBoard";
import GameStore from "./store/GameStore";

function App() {
  return (
    <>
    {!GameStore.roomId ? <FindGamePage/>:  <GameBoard />}
    </>
  );
}

export default observer(App);
