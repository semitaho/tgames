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
      <div className="container-fluid">
        <h1>Choose the game</h1>

        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
          {this.state.games.map(game => {
            let clazz ='btn btn-lg btn-block '+game.class;
            return (
                <Link className={clazz} to={game.link}><h3>{game.name}</h3></Link>

              )
          })}
          </div>
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