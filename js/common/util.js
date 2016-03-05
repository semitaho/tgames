class Util {

  static formatTime(milliseconds){
    return (milliseconds / 1000).toFixed(1).toString().replace('.',',') + ' s';
  }

}

export default Util;