import React from 'react';

const ReactButtonContainer = (props) => {
  return (<div className="panel-body react-button-container">
            <div className="row">
                <div className="col-md-12" >
                    <div className="row">
                      {props.children}
                    </div>
                </div> 
             </div>   
          </div>)

};

export default ReactButtonContainer;