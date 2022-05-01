export type BaseCard = {
  type: "flag" | "perk";
  description: string | null;
};

export type Perk = {
  index: number;
  card: BaseCard | null;
};

export type BasePlayer = {
  id: number;
  username: string;
  status: Role;
  host: boolean;
};

export type Role = "picker" | "itsTurn" | "waiting";

export type Position = {
  x: number;
  y: number;
};

export interface Player extends BasePlayer {
  draggingCard: BaseCard | null;
  pickerCards: Perk[];
}

export type Hand = {
  owner: string;
  cardsInHand: BaseCard[];
};
