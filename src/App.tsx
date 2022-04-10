import React from "react";
import PlayerBox from "./components/PlayerBox";
import { BaseCard } from "./types";
import { players } from "./types/testingVars";
import { hands } from "./types/testingVars";
import cursorStore from "./store/CursorStore";
import { observer } from "mobx-react-lite";
import PlayerStore from "./store/PlayerStore";
import { Card } from "./components/Card";

function App() {
  function getHand(username: string): BaseCard[] {
    const hand = hands.find((el) => {
      return el.username === username;
    });
    if (hand) {
      return hand.hand;
    }
    return [];
  }
  function updateCursorPos(e: MouseEvent) {
    cursorStore.changeMousePos({ x: e.pageX, y: e.pageY });
  }
  React.useEffect(() => {
    document.addEventListener("mousemove", updateCursorPos);
    document.addEventListener("mousedown", () =>
      cursorStore.changeMouseState(true)
    );
    document.addEventListener("mouseup", () =>
      cursorStore.changeMouseState(true)
    );
    return function () {
      document.removeEventListener("mousemove", updateCursorPos);
      document.addEventListener("mousedown", () =>
        cursorStore.changeMouseState(true)
      );
      document.addEventListener("mouseup", () =>
        cursorStore.changeMouseState(true)
      );
    };
  });

  React.useEffect(() => {
    //TODO: get username from cookies
    PlayerStore.setUsername("Selen Un");
  });

  return (
    <div className="board">
      <div className="playerGroup playerGroup_upper">
        {players
          .slice(0, Math.ceil(players.length / 2))
          .map((player, index) => {
            return (
              <PlayerBox
                key={index}
                player={player}
                handCards={getHand(player.username)}
              />
            );
          })}
      </div>
      <div className="playerGroup">
        {players.slice(Math.ceil(players.length / 2)).map((player, index) => {
          return (
            <PlayerBox
              key={index}
              player={player}
              handCards={getHand(player.username)}
            />
          );
        })}
      </div>
      <div
        id="card_dragging"
        style={{
          left: cursorStore.pos.x - 120 / 2,
          top: cursorStore.pos.y - 160 / 2,
          position: "fixed",
        }}
        onMouseUp={() => {
          PlayerStore.setDraggingCard(null);
        }}
      >
        {PlayerStore.draggingCard && (
          <Card
            card={PlayerStore.draggingCard}
            inHand={false}
            username={PlayerStore.username}
          />
        )}
      </div>
    </div>
  );
}

export default observer(App);
