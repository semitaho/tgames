import React from 'react';

const startButton = (props) => {
  return (
      <div className="start text-center">
        <button className="btn-primary btn-lg btn-block" onClick={props.onStart}>Start game!</button>
      </div>)
};

export default startButton;

