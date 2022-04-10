import { observer } from "mobx-react-lite";
import PlayerStore from "../store/PlayerStore";
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
          [0,1].includes(index) &&
          card.type === "perks" &&
          PlayerStore.pickedCards[index].card === null
        ) {
          return true;
        }
      }
    }

    return false;
  }
  //TODO: dropping currently draggable card function
  return (
    <div
      className={"cardPlace" + (canDropCard() ? " cardPlace_signaling" : "")}
      style={index === 2 ? { marginLeft: "20px" } : {}}
    >
      {}
    </div>
  );
});

export default DropZone;
