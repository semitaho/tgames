import React from 'react';
import backend from './../common/backend.js';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { Button } from 'react-materialize';

class Home extends React.Component {
  constructor() {

    super();
    this.state = {games: []};
    this.processGames = this.processGames.bind(this);
  }

  render() {
    return (
      <div className="container">
        <h1>Choose the game</h1>

        <div className="row">
          {this.state.games.map(game => {
            return (
              <div className="col s6 m6 l6">
                <Link to={game.link}>
                  <div className="card">

                    <div className="card-content">
                      <span className="card-title">{game.name}</span>
                    </div>
                  </div>
                </Link>
              </div> 
              )
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