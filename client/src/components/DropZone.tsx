import { observer } from "mobx-react-lite";
import PlayerStore from "../store/PlayerStore";
import { Card } from "./Card";
type DropZoneProps = {
  index: number;
  player: {
    id: string;
    username: string;
  };
};

const DropZone: React.FC<DropZoneProps> = observer(({ index, player }) => {
  function canDropCard(): boolean {
    if (player.username === PlayerStore.username) {
      const card = PlayerStore.draggingCard;
      if (card) {
        if (
          index === 2 &&
          card.type === "flag" &&
          PlayerStore.pickedCards[2].card === null
        ) {
          return true;
        }
        if (
          [0, 1].includes(index) &&
          card.type === "perk" &&
          PlayerStore.pickedCards[index].card === null
        ) {
          return true;
        }
      }
    }

    return false;
  }
  function myDropZone(): boolean {
    if (PlayerStore.getPickedCard(index) === null) return false;
    return player.username === PlayerStore.username;
  }
  return (
    <div
      className={"cardPlace" + (canDropCard() ? " cardPlace_signaling" : "")}
      style={index === 2 ? { marginLeft: "20px" } : {}}
    >
      {myDropZone() ? (
        <div style={{ position: "absolute", top: 0 }}>
          <Card
            card={PlayerStore.getPickedCard(index)!}
            inHand={false}
            player={player}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

export default DropZone;
