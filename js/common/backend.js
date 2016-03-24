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

  static readScores(app) {
    let query = {app};
    let sort = {'score.points': -1};

    return $.ajax({
      url: BASE_URL + '/collections/scoreboard?apiKey=' + API_KEY + '&q=' + JSON.stringify(query) + '&l=3&s=' + JSON.stringify(sort),
      type: 'GET',
      contentType: 'application/json'
    });
  }


  static readProfileScores(app, name) {
    let query = {app, name};
    return $.ajax({
      url: BASE_URL + '/collections/scoreboard?apiKey=' + API_KEY + '&q=' + JSON.stringify(query) + '&l=1',
      type: 'GET',
      contentType: 'application/json'
    });
  }


  static storeScores(_id, name, app, scoreobj) {

    let query = {name, app};

    let data = JSON.stringify({
      _id,
      name,
      app,
      score: scoreobj,
      datetime: new Date().getTime(),
    });
    console.log('data', data);

    return $.ajax({
      url: BASE_URL + '/collections/scoreboard?apiKey=' + API_KEY,
      data,
      type: 'POST',
      contentType: 'application/json'
    });
  }


}

export default Backend;