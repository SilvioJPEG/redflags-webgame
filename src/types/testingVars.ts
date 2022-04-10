import { User, BaseCard } from "./index";

const handCards1: BaseCard[] = [
  { type: "perks", cardText: null },
  { type: "perks", cardText: null },
  { type: "perks", cardText: null },
  { type: "perks", cardText: null },
  { type: "flags", cardText: null },
  { type: "flags", cardText: null },
];
const handCards2: BaseCard[] = [
  { type: "perks", cardText: null },
  { type: "perks", cardText: null },
  { type: "perks", cardText: null },
  { type: "perks", cardText: null },
  { type: "flags", cardText: null },
  { type: "flags", cardText: null },
];

const handCards3: BaseCard[] = [
  { type: "perks", cardText: "Owns your favorite sports team" },
  { type: "perks", cardText: "Generous" },
  { type: "perks", cardText: "Travels a lot" },
  { type: "flags", cardText: "still uses a flip phone" },
  {
    type: "flags",
    cardText: "Knocks things out of strangers’ hands",
  },
];

export const players: User[] = [
  { username: "Alex Si", status: "picker" },
  { username: "Jenny Arts", status: "itsTurn" },
  { username: "Selen Un", status: "waiting" },
];

type Hand = {
  username: string;
  hand: BaseCard[];
};

const handAlex: Hand = {
  username: "Alex Si",
  hand: handCards1,
};

const handJenny: Hand = {
  username: "Jenny Arts",
  hand: handCards2,
};

const handSelen: Hand = {
  username: "Selen Un",
  hand: handCards3,
};

export const hands: Hand[] = [handAlex, handJenny, handSelen];
