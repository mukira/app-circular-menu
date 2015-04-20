/**
 * CircularMenu
 * Manage an SVG menu via public methods.
 * The SVG menu must repect the structure of the one in the
 * index.html file. A menu contain 8 options. The index starts
 * at one (the top one) then clockwise.
 * 
 * @param {String} menuId Element ID of SVG menu
 */
function CircularMenu (menuId) {
  this.el = document.getElementById(menuId);
  this.index = 0;
}

/**
 * Resets and display the circular menu
 * 
 */
CircularMenu.prototype.activate = function () {
  this.setSelectedIndex();
  this.el.classList.add('visible');
};

/**
 * Set the index of the current selected item.
 * If the index is not given, it will get the default value (:0),
 * which will select the central point.
 * 
 * @param {Number} index Index of the selected option
 */
CircularMenu.prototype.setSelectedIndex = function (index) {
  if (this.index === index) {
    return;
  }
  this.swipeClass('selected', (!index ? 'center' : 'index-' + index));
  this.index = index || 0;
  return this.index;
};

/**
 * Save the choice but setting the 'active' class to
 * the selected item then close the menu.
 * 
 * @return {Number} Selected option index
 */
CircularMenu.prototype.close = function () {
  this.swipeClass('active', 'index-' + this.index);
  this.el.classList.remove('visible');
  return this.index;
};

/**
 * Method to remove a class from the child elements of the
 * SVG menu. Then if `newElClass` is defined, it will be used
 * to set the new class.
 * 
 * @param  {String} className  Class name to remove
 * @param  {String} newElClass Class name of the element to set the class
 */
CircularMenu.prototype.swipeClass = function (className, newElClass) {
  var selectedItem = this.el.querySelector('.' + className);
  if (selectedItem) {
    selectedItem.classList.remove(className);
  }

  var newEl = this.el.querySelector('.' + newElClass);
  if (newEl) {
    newEl.classList.add(className);
  }
};

/**
 * Use the coordinates of a move to set the correct option
 * index to be selected.
 *
 * If the finger is not far enough from the original point,
 * the method will return 0, and let the center point selected.
 *
 *  \  1  /  Here is the definition of quarters (they are supposed
 *   \   /   to be equal, but I can make it with ASCI chars).
 *    \ /    
 *  4  X  2  Simply with `x` and `y` it's possible to know in which
 *    / \    quarter the finger is.
 *   /   \
 *  /  3  \
 *
 * Once the quarter if found, the method `edge` is called to
 * get the index.
 * 
 * @param  {Number} x Value X of the move vector
 * @param  {Number} y Value Y of the move vector
 */
CircularMenu.prototype.updatePosition = function (x, y) {
  var newIndex;
  if (Math.abs(x) + Math.abs(y) < 20) {
    newIndex = 0;
  }
  else if (x > y) {
    if (-y > x) {
      newIndex = this.edge(-y, x, 1); // 1st quarter
    }
    else {
      newIndex = this.edge(x, y, 3); // 2nd quarter
    }
  }
  else {
    if (-x < y) {
      newIndex = this.edge(y, -x, 5); // 3rd quarter
    }
    else {
      newIndex = this.edge(-x, -y, 7); // 4th quarter
    }
  }
  return this.setSelectedIndex(newIndex);
};

/**
 * Define the current index based on `x` and `y` as defined
 * in the following plan. These values come from the quarter
 * found in updatePosition. 
 * The method find out if the position is in the center angle
 * and will return the index given in parameter. Or, in case
 * of extreme, will add or remove one unit.
 * 
 *     /    .
 *    /  .
 *   /.
 *   --------> (x)
 *   \`
 *    \  `
 *  |  \    `
 *  v
 * (y)
 *
 * 
 * @param  {Number} x         Value X
 * @param  {Number} y         Value Y
 * @param  {Number} middlePos Index value of the middle
 * @return {Number}           New index
 */
CircularMenu.prototype.edge = function (x, y, middlePos) {
  y += x/2; 
  if (y < 0) {
    middlePos -= 1; 
  }
  else if (y > x) {
    middlePos += 1;
  }
  return middlePos || middlePos + 8;
};