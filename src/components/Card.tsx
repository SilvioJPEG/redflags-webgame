import "../styles/Card.scss";

export type CardProps = {
  type: "flags" | "perks";
  cardText: string | null;
};

export const Card: React.FC<CardProps> = ({ type, cardText }) => {
  return (
    <div className={"card " + "card_" + type}>
      <div className={"card__inner" + (cardText ? "" : "_back")}>
        {cardText ? <p>{cardText}</p> : ""}
      </div>
    </div>
  );
};
