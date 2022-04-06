import { Card, CardProps } from "./Card";
import "../styles/Info.scss";

type PlayerBoxProps = {
  username: string;
};
const cards: CardProps[] = [
  { type: "perks", cardText: null },
  { type: "perks", cardText: "Owns your favorite sports team" },
  { type: "flags", cardText: null },
  {
    type: "flags",
    cardText:
      "Knocks things out of strangers’ hands while walking down the street",
  },
];

const PlayerBox: React.FC<PlayerBoxProps> = ({ username }) => {
  function stringToHslColor(str: string, s: number, l: number): string {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return "hsl(" + h + ", " + s + "%, " + l + "%)";
  }
  return (
    <div className="box">
      <div className="box__dropZone">
        <div className="cardPlace"></div>
        <div className="cardPlace"></div>
        <div className="cardPlace" style={{ marginLeft: "20px" }}></div>
      </div>
      <div className="box__hand">
        {cards.map((card, index) => (
          <Card key={index} type={card.type} cardText={card.cardText} />
        ))}
      </div>
      <div className="info">
        <div
          className="info__color"
          style={{ backgroundColor: stringToHslColor(username, 70, 50) }}
        ></div>
        <div className="info__nickname">{username}</div>
        <div className="info__emojiStatus">🤚</div>
      </div>
    </div>
  );
};

export default PlayerBox;
