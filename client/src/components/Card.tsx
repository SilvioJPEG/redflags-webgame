import "../styles/Card.scss";
import React from "react";
import { BaseCard } from "../types/game.types";
import { observer } from "mobx-react-lite";
import PlayerStore from "../store/PlayerStore";
interface CardProps {
  card: BaseCard;
  inHand: boolean;
  player: { id: string; username: string } | null;
}
export const Card: React.FC<CardProps> = observer(
  ({ card, inHand, player }) => {
    function checkDragging(): boolean {
      if (!inHand || PlayerStore.draggingCard === null) {
        return false;
      }
      if (PlayerStore.draggingCard.description === card.description) {
        return true;
      }
      return false;
    }
    return (
      player && (
        <div
          className={
            "card " + "card_" + card.type + (inHand ? " card_inHand" : "")
          }
          onMouseDown={() => {
            if (inHand && PlayerStore.id === player.id) {
              PlayerStore.setDraggingCard(card);
            }
          }}
          style={checkDragging() ? { opacity: 0 } : {}}
        >
          <div className={"card__inner" + (card.description ? "" : "_back")}>
            {card.description ? <p>{card.description}</p> : ""}
          </div>
        </div>
      )
    );
  }
);
