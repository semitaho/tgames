import React from 'react';

const startButton = (props) => {
  return (
      <div className="start center-align">
        <button className="btn btn-large" onClick={props.onStart}>Start game!</button>
      </div>)
};

export default startButton;

