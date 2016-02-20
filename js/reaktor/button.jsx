import React from 'react';

class ReactButton extends React.Component{

  render(){
    let clazzName = 'react-button '+this.props.type;
    if (this.props.active){
      clazzName = 'react-button '+this.props.type+' active';
    }

    return <div className={clazzName}><a /></div>
  }


}

export default ReactButton;