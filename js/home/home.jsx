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
          {this.state.games.map(game => {
            let divStyle = {backgroundImage: 'url('+game.background+')'};
            return (
              <div className="col-md-6 gamebox" style={divStyle}>
                <h3><Link to={game.link}>{game.name}</Link></h3>
              </div>)
          })};
        </div>

      </div>
    )
  }

  componentDidMount() {
    backend.readGames().then(this.processGames);
  }

  processGames(games) {
    console.log('having games', games);
    this.setState({games});

  }
}

export default Home;