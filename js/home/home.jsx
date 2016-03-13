import React from 'react';
import backend from './../common/backend.js';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

class Home extends React.Component {
  constructor() {

    super();
    this.state = {games: []};
    this.processGames = this.processGames.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Choose the game</h1>

        <div className="row">
          {this.state.games.map(game => {
            let divStyle = {backgroundImage: 'url('+game.background+')'};
            let clazz ='btn btn-lg btn-block '+game.class;
            return (
              <div className="col-md-12 gamebox">
                <Link className={clazz} to={game.link}><h2>{game.name}</h2></Link>
              </div>)
          })}
        </div>

      </div>
    )
  }

  componentWillMount() {
    backend.readGames().then(this.processGames);
  }

  processGames(games) {
    console.log('having games', games);
    this.setState({games});

  }
}

export default Home;