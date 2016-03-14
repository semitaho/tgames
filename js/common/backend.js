const API_KEY = 'eOp9LjtwzApDNb-TbPbCEZ2V74XTSwrV';
const BASE_URL = 'https://api.mlab.com/api/1/databases/tgamesdb';
import $ from 'jquery';
class Backend {

  static readGames() {
    return $.ajax({
      url: BASE_URL + '/collections/game?apiKey=' + API_KEY,
      type: 'GET'
    });

  }

  static storeScores(name, app, scoreobj){

    let query = {name, app};

    let data = JSON.stringify({
      name,
      app,
      score: scoreobj,
      datetime: new Date().getTime(),
    });
    console.log('data', data);

    return $.ajax({
      url: BASE_URL + '/collections/scoreboard?apiKey=' + API_KEY + '&q='+JSON.stringify(query)+'&u=true',
      type: 'PUT',
      data,
      contentType: 'application/json'
    });    
  }



}

export default Backend;