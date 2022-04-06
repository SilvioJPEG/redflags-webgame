import PlayerBox from "./components/PlayerBox";

const players = ["Alex Si", "Jenny Arts", "Selen Un"];

function App() {
  return (
    <div className="board">
      <div className="playerGroup playerGroup_upper">
        {players
          .slice(0, Math.ceil(players.length / 2))
          .map((player, index) => {
            console.log(player);
            return <PlayerBox key={index} username={player} />;
          })}
      </div>
      <div className="playerGroup">
        {players.slice(Math.ceil(players.length / 2)).map((player, index) => {
          console.log(player);
          return <PlayerBox key={index} username={player} />;
        })} 
      </div>
    </div>
  );
}

export default App;
