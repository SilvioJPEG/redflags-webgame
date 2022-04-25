import React from "react";
import { Card } from "./Card";
import "../styles/Info.scss";
import GameStore from "../store/GameStore";
import DropZone from "./DropZone";
import { BaseCard, Perk, User } from "../types";
import { observer } from "mobx-react-lite";
import PlayerStore from "../store/PlayerStore";

type PlayerBoxProps = {
  playerName: string;
  handCards: BaseCard[];
  changeHandCards?: (data: BaseCard[]) => void;
};

const PlayerBox: React.FC<PlayerBoxProps> = observer(
  ({ handCards, playerName }) => {
    function stringToHslColor(str: string, s: number, l: number): string {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      var h = hash % 360;
      return "hsl(" + h + ", " + s + "%, " + l + "%)";
    }
    function getEmojiStatus(): string {
      if (playerName === GameStore.currentTurn) return "🤚";
      if (playerName === GameStore.judge) return "👑";
      return "🤐";
    }
    return (
      <div className="box">
        <div className="box__dropZone">
          {PlayerStore.pickedCards.map((perk: Perk) => (
            <DropZone
              key={perk.index}
              index={perk.index}
              username={playerName}
            />
          ))}
        </div>
        {}

        <div className="box__hand">
          {handCards.map((card, index) => (
            <Card key={index} card={card} inHand={true} username={playerName} />
          ))}
        </div>

        <div className="info">
          <div
            className="info__color"
            style={{
              backgroundColor: stringToHslColor(playerName, 70, 50),
            }}
          ></div>
          <div className="info__nickname">{playerName}</div>
          <div className="info__emojiStatus">{getEmojiStatus()}</div>
        </div>
      </div>
    );
  }
);

export default PlayerBox;
