import "../styles/Card.scss";
import React from "react";
import { BaseCard } from "../types/game.types";
import { observer } from "mobx-react-lite";
import PlayerStore from "../store/PlayerStore";
interface CardProps {
  card: BaseCard;
  inHand: boolean;
  username: string;
}

export const Card: React.FC<CardProps> = observer(
  ({ card, inHand, username }) => {
    function checkDragging(): boolean {
      if (!inHand || PlayerStore.draggingCard === null) {
        return false;
      }
      if (PlayerStore.draggingCard.cardText === card.cardText) {
        return true;
      }
      return false;
    }
    return (
      <div
        className={
          "card " + "card_" + card.type + (inHand ? " card_inHand" : "")
        }
        onMouseDown={() => {
          if (username === PlayerStore.username && inHand)
            PlayerStore.setDraggingCard(card);
        }}
        style={checkDragging() ? { opacity: 0 } : {}}
      >
        <div className={"card__inner" + (card.cardText ? "" : "_back")}>
          {card.cardText ? <p>{card.cardText}</p> : ""}
        </div>
      </div>
    );
  }
);
