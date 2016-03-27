import React from 'react';
import {PLAYING, STARTED, ENDED, NOT_LOGGED} from './gamestate';


class App extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    this.refreshPoints();
  }

  render() {
    switch (this.state.gamestate) {
      case STARTED:
        return this.renderStart();
      case PLAYING:
        return this.renderPlaying();
      case ENDED:
        return this.renderEnded();
      default:
        return this.renderEmpty();
    }
  }


  renderEmpty() {
    return <div />
  }

}

export default App;