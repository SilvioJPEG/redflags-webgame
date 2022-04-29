import { observer } from "mobx-react-lite";
import CursorStore from "../store/CursorStore";
import PlayerStore from "../store/PlayerStore";
import { Card } from "./Card";
type DropZoneProps = {
  index: number;
  username: string;
};

const DropZone: React.FC<DropZoneProps> = observer(({ index, username }) => {
  function canDropCard(): boolean {
    if (username === PlayerStore.username) {
      const card = PlayerStore.draggingCard;
      if (card) {
        if (
          index === 2 &&
          card.type === "flags" &&
          PlayerStore.pickedCards[2].card === null
        ) {
          return true;
        }
        if (
          [0, 1].includes(index) &&
          card.type === "perks" &&
          PlayerStore.pickedCards[index].card === null
        ) {
          return true;
        }
      }
    }

    return false;
  }
  function myDropZone(): boolean {
    if (PlayerStore.getPickedCard(index) === null) 
      return false;
    return ((username === PlayerStore.username))
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
            username={username}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

export default DropZone;
