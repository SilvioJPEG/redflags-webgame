import React from "react";
import { observer } from "mobx-react-lite";
import FindGamePage from "./pages/FindGame";
import GameBoard from "./pages/GameBoard";
import GameStore from "./store/GameStore";
import GameService from "./api/game.service";

function App() {
  const ws = new WebSocket("ws://localhost:5002/api");
  React.useEffect(() => {
    const playerId = localStorage.getItem("player:id");
    const accessCode = localStorage.getItem("game:access_code");
    if (playerId && accessCode) {
      GameService.getGameData(playerId, accessCode);
    }
  }, []);
  return (
    <>
      {GameStore.gameStatus !== "in-progress" ? (
        <FindGamePage />
      ) : (
        <GameBoard />
      )}
    </>
  );
}

export default observer(App);
