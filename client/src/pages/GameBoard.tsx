import React from "react";
import PlayerBox from "../components/PlayerBox";
import { BaseCard } from "../types/game.types";
import cursorStore from "../store/CursorStore";
import { observer } from "mobx-react-lite";
import PlayerStore from "../store/PlayerStore";
import { Card } from "../components/Card";
import CursorStore from "../store/CursorStore";
import GameStore from "../store/GameStore";

const Board: React.FC = () => {
  function getHand(username: string): BaseCard[] {
    const hand = GameStore.hands.find((el) => {
      return el.owner === username;
    });
    if (hand) {
      return hand.cardsInHand;
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

  function overDropZone() {
    const elementsPoint = document.elementsFromPoint(
      CursorStore.pos.x,
      CursorStore.pos.y
    );
    const playerBox = elementsPoint.find((el) => {
      return el.classList.contains("box");
    });

    const dropZone = elementsPoint.find((el) => {
      return el.classList.contains("box__dropZone");
    });
    const cardPlace = elementsPoint.find((el) => {
      return el.classList.contains("cardPlace");
    });
    if (dropZone && cardPlace) {
      dropZone.querySelectorAll(".cardPlace").forEach((el, index) => {
        if (el === cardPlace) {
          if (cursorStore.dropZoneIndex !== index) {
            cursorStore.setDropZoneIndex(index);
          }
        }
      });
    } else {
      cursorStore.setDropZoneIndex(null);
    }
  }

  function checkDropZoneAvailable(card: BaseCard): boolean {
    if (cursorStore.dropZoneIndex === null) {
      return false;
    }
    if (
      cursorStore.dropZoneIndex === 2 &&
      card.type === "flag" &&
      PlayerStore.pickedCards[2].card === null
    ) {
      return true;
    }
    if (
      [0, 1].includes(cursorStore.dropZoneIndex) &&
      card.type === "perk" &&
      PlayerStore.pickedCards[cursorStore.dropZoneIndex].card === null
    ) {
      return true;
    }
    return false;
  }
  function releaseDraggingCard() {
    if (PlayerStore.draggingCard) {
      if (cursorStore.dropZoneIndex !== null) {
        if (checkDropZoneAvailable(PlayerStore.draggingCard)) {
          PlayerStore.setPickedCards(
            cursorStore.dropZoneIndex,
            PlayerStore.draggingCard
          );
          GameStore.deleteFromHand(
            PlayerStore.draggingCard,
            PlayerStore.username
          );
        }
        cursorStore.setDropZoneIndex(null);
      }
      PlayerStore.setDraggingCard(null);
    }
  }
  return (
    <div className="board">
      <div className="playerGroup playerGroup_upper">
        {GameStore.playersList
          .slice(0, Math.ceil(GameStore.playersList.length / 2))
          .map((player, index) => {
            return (
              <PlayerBox
                key={index}
                playerName={player}
                handCards={getHand(player)}
              />
            );
          })}
      </div>
      <div className="playerGroup">
        {GameStore.playersList
          .slice(Math.ceil(GameStore.playersList.length / 2))
          .map((player, index) => {
            return (
              <PlayerBox
                key={index}
                playerName={player}
                handCards={getHand(player)}
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
        onMouseMove={() => overDropZone()}
        onMouseUp={() => releaseDraggingCard()}
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
};

export default observer(Board);
