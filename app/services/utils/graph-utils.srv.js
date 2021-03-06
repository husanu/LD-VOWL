/**
 * @ngdoc service
 * @name GraphUtils
 */
function graphUtils() {

  const that = this;

  let arrowHeads = [];

  var maxNameLength = 15;

  that.labelFromURI = function (uri) {
    var uriLabel = '';
    if (uri !== undefined && uri !== '') {
      var lastSlash = uri.lastIndexOf('/');
      var lastHash = uri.lastIndexOf('#');
      uriLabel = uri.substr(Math.max(lastSlash, lastHash) + 1).replace(/\_/g, ' ');
    }

    return uriLabel;
  };

  that.getName = function (obj, values, clip) {
    var name = '';
    clip =  (clip !== undefined) ? clip : false;

    if (obj.name !== undefined && obj.name !== '') {
      name = obj.name;
    } else {
      name = that.labelFromURI(obj.uri);
    }

    if (clip && name.length > maxNameLength) {
      name = name.substr(0, maxNameLength-2) + '...';
    }

    if (values && obj.value !== undefined && obj.value > 1) {
      name += ' [' + obj.value + ']';
    }

    return name;
  };

  /**
   * Returns the name which should be displayed for a given object if the width is restricted to a given amount of
   * pixels.
   *
   * @param {*} obj - the object which name should be displayed, must have a name or uri attribute
   * @param {number} maxWidth - the maximum amount of space available (in pixels)
   * @returns {string}
   */
  that.getNameForSpace = function (obj, maxWidth) {
    var name = '';

    // start will full name from object or its URI
    if (obj !== undefined && obj.name !== undefined && obj.name.length > 0) {
      name = obj.name;
    } else {
      name = that.labelFromURI(obj.uri);
    }

    // estimate for how many chars there will be space
    var chars = Math.floor(maxWidth / 7);

    // cut name and add ellipsis
    if (chars < name.length) {
      name = name.substr(0, chars - 3) + '...';
    }

    return name;
  };

  that.getArrowHeads = function () {
    if (arrowHeads.length === 0) {
      for (let lwidth = 1; lwidth <= 5; lwidth++) {
        arrowHeads.push({id: `Arrow${lwidth}`, class: 'arrow', size: 10 - lwidth});
        arrowHeads.push({id: `hoveredArrow${lwidth}`, class: 'hovered', size: 10 - lwidth});
        arrowHeads.push({id: `subclassArrow${lwidth}`, class: 'subclass', size: 10 - lwidth});
      }
    }

    return arrowHeads;
  };

  that.calcPropBoxWidth = function(d) {
    return (this.getName(d, true, true).length * 8);
  };

  that.calcPropBoxOffset = function(d) {
    return (-1) * (this.calcPropBoxWidth(d) / 2);
  }

}

export default graphUtils;
