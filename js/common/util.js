class Util {

  static formatTime(milliseconds){
    return (milliseconds / 1000).toFixed(1).toString().replace('.',',') + ' s';
  }

  static formatDate(milliseconds){
    let date = new Date(milliseconds);
    return date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear();
  }

}

export default Util;