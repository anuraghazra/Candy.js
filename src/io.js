const Candy = require('./core');

/**
 * @method Candy.loadImage()
 * @param {String} url 
 * @return HTMLImageElement
 */
Candy.prototype.loadImage = function (url) {
  this.resCount++;
  let img = new Image();
  img.src = url;
  img.onload = function () { this.resCount--; }.bind(this);
  return img;
}

/**
 * @method Candy.loadJSON()
 * @param {String} url
 * @param {Function} callback
 * loads a JSON file
 */
Candy.prototype.loadJSON = function (url, callback) {
  this.resCount++;
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.onload = () => {
    this.resCount--;
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(null, xhr.responseText);
    } else {
      callback('Error loading JSON', null);
    }
  }
  xhr.send();

}

/**
 * @method Candy.drawJSON()
 * @param {JSON} json 
 * draws a JSON file
 */
Candy.prototype.drawJSON = function (json) {
  for (const i in json) {
    let key = (i).split('-')[0];
    switch (key) {
      case 'fill':
        this[key](json[key])
        break;
      case 'stroke':
        this[key](json[key])
        break;

      // do defaults 
      default:
        if (typeof json[key] === 'object') {
          this[key].apply(this, json[key])
        } else {
          this[key].call(this, json[key])
        }
        break;
    }
  }
}

module.exports = Candy;
