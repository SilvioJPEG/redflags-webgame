export type BaseCard = {
  type: "flags" | "perks";
  cardText: string | null;
};

export type Perk = {
  index: number;
  card: BaseCard | null;
};

export type User = {
  username: string;
  status: Role;
};

export type Role = "picker" | "itsTurn" | "waiting";

export type Position = {
  x: number;
  y: number;
};

export type Hand = {
  username: string;
  cardsInHand: BaseCard[];
};
