import React from "react";
import { Card } from "./Card";
import "../styles/Info.scss";
import GameStore from "../store/GameStore";
import DropZone from "./DropZone";
import { BaseCard, BasePlayer, Perk } from "../types/game.types";
import { observer } from "mobx-react-lite";
import PlayerStore from "../store/PlayerStore";

type PlayerBoxProps = {
  player: BasePlayer;
  handCards: BaseCard[];
  changeHandCards?: (data: BaseCard[]) => void;
};

function stringToHslColor(str: string, s: number, l: number): string {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

const PlayerBox: React.FC<PlayerBoxProps> = observer(
  ({ handCards, player }) => {
    function getEmojiStatus(): string {
      if (player.id === GameStore.currentTurn?.id) return "🤚";
      if (player.id === GameStore.judge?.id) return "👑";
      return "🤐";
    }
    return (
      <div className="box">
        <div className="box__dropZone">
          {PlayerStore.pickedCards.map((perk: Perk) => (
            <DropZone key={perk.index} index={perk.index} player={player} />
          ))}
        </div>
        <div className="box__hand">
          {handCards.map((card, index) => (
            <Card key={index} card={card} inHand={true} player={player} />
          ))}
        </div>

        <div className="info">
          <div
            className="info__color"
            style={{
              backgroundColor: stringToHslColor(player.username, 70, 50),
            }}
          ></div>
          <div className="info__nickname">{player.username}</div>
          <div className="info__emojiStatus">{getEmojiStatus()}</div>
        </div>
      </div>
    );
  }
);

export default PlayerBox;
