import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Cell from './cell.jsx';

class Board extends React.Component{

  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(index, value){
    this.props.onValueChange(index,value);
  }


  getBoxStyle(index){
    let style = 'box-cell ';
    if ((index+1) % 3 === 0){
      style += 'box-right ';
    }
    if (index % 9 === 0){
      style += 'box-left ';
    }
    if (index < 9){
      style += 'box-top ';
    }
    if ((18 <= index && index <= 26) || (45 <= index && index <= 53) || (72 <= index) ){
      style += 'box-bottom';
    }
    return style;
  }

  render(){
    return <div className="board">{
      this.props.puzzle.map((item,index) => {
        let clearfix = '';
        let boxstyle = this.getBoxStyle(index);
        if ( (index+1) % 9 === 0){
          clearfix = <div className="clearfix" />
        }
        let style = 'col-xs-1 col-sm-1 col-md-1 '+boxstyle;
        return <div><div className={style}><Cell readOnly={item.readOnly} defaultValue={item.number} onValueChange={(value) => this.onValueChange(index,value) }  /></div>{clearfix}</div>


      } ) 
    }</div>

  }

}

export default Board;