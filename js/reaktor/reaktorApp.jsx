import React from 'react';
import ReactButtonContainer from './buttonContainer.jsx';
import ReactButton from './button.jsx';
class ReaktorApp extends React.Component{

  constructor(){
    super();
    this.colorArray  = ['red', 'yellow', 'blue', 'green'];
    this.state = {rand: 0};
  }
  componentDidMount(){
    let counter = 1500;
    const myFunction = () => {
      clearInterval(interval);
      let rand = Math.floor((Math.random() * 4) + 1) -1;
      this.setState({rand})
      counter = counter -100;
      interval = setInterval(myFunction, counter);
    };
    var interval = setInterval(myFunction, counter);


  }
  render(){

    const onPress = () => {

    };
    return(<div>
            <h1>Reaktor (speden spelit)</h1>
              <ReactButtonContainer>
                {this.colorArray.map ((color,index) => {
                  return (<ReactButton type={color} onPress={onPress} active={index === this.state.rand} />) 
                }) }
                </ReactButtonContainer>  
            </div> ) 
  }

}

export default ReaktorApp;
