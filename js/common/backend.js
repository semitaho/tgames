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

}

export default Backend;