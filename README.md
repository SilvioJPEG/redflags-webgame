# Red flags web-game

There is a designated person (host) and the rest of the players try to create an ideal date for them using two white cards.
These players also try to sabotage each other with one red card. The person with the most successful date wins. The winner is picked out by the host.

## Frontend 

built with:
- Typescript
- React
- Mobx

To build

```bash
    cd client
    npm install
    npm run build
```

## Backend 
built with:
- Typescript
- Express
- Sequelize    

To run backend part in development mode clone this repo and run

```bash
    cd server
    pip install -r requirements.txt
    python app.py
```

This app uses Postgres as a database. 
database ER-diagram:
![ER-model](https://github.com/SilvioJPEG/redflags-webgame/blob/main/server/redflags_db.png?raw=true)
