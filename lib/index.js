/* global Node */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.createElement = createElement;
exports.Div = Div;
exports.Span = Span;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Element =
/*#__PURE__*/
function () {
  function Element(tagName, attributes, children) {
    _classCallCheck(this, Element);

    this._tagName = tagName;
    this._element = null;

    if (attributes !== undefined) {
      this._attributes = attributes;
    } else {
      this._attributes = {};
    }

    if (children !== undefined) {
      this._children = children;
    } else {
      this._children = [];
    }

    this._eventListeners = [];
  }

  _createClass(Element, [{
    key: "getDOMElement",
    value: function getDOMElement() {
      return this._element;
    }
  }, {
    key: "_convertAndAppend",
    value: function _convertAndAppend(parent, child) {
      if (typeof child === "string") {
        parent.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        parent.appendChild(child);
      } else if (child.appendTo !== undefined) {
        child.appendTo(parent);
      } else {
        throw "Unsupported child";
      }
    }
  }, {
    key: "appendTo",
    value: function appendTo(parent) {
      this._element = document.createElement(this._tagName);

      var _arr = Object.keys(this._attributes);

      for (var _i = 0; _i < _arr.length; _i++) {
        var key = _arr[_i];
        if (key === "class") this._element.setAttribute(key, this._attributes[key]);else this._element[key] = this._attributes[key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._eventListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _this$_element;

          var eventListener = _step.value;

          (_this$_element = this._element).addEventListener.apply(_this$_element, _toConsumableArray(eventListener));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var child = _step2.value;

          this._convertAndAppend(this._element, child);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      parent.appendChild(this._element);
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(key) {
      return this._attributes[key];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key, val) {
      if (this._attributes[key] === val) {
        return this;
      }

      if (this._element !== null) {
        if (val === null || val === undefined) {
          this._element.removeAttribute(key);
        } else {
          this._element[key] = val;
        }
      }

      if (val === null || val === undefined) {
        delete this._attributes[key];
      } else {
        this._attributes[key] = val;
      }

      return this;
    }
  }, {
    key: "setStyle",
    value: function setStyle(obj) {
      var val = "";

      if (obj !== undefined && obj !== null) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.keys(obj).sort()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var key = _step3.value;
            val += key + ":" + obj[key] + ";";
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      this._style = obj;
      return this.setAttribute("style", val);
    }
  }, {
    key: "updateStyle",
    value: function updateStyle(obj) {
      if (this._style === undefined || this._style === null) {
        this._style = {};
      }

      var res = Object.assign({}, this._style, obj);
      return this.setStyle(res);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener, options) {
      if (this._element !== null) {
        this._element.addEventListener(type, listener, options);
      }

      this._eventListeners.push([type, listener, options]);

      return this;
    }
  }, {
    key: "setChildren",
    value: function setChildren() {
      for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
        children[_key] = arguments[_key];
      }

      if (children.length > 0 && Array.isArray(children[0])) {
        children = children[0];
      }

      if (this._children.length === children.length) {
        var equal = true;

        for (var i = 0; i < children.length; i++) {
          if (this._children[i] !== children[i]) {
            equal = false;
            break;
          }
        }

        if (equal) {
          return;
        }
      }

      if (this._element !== null) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this._children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var child = _step4.value;

            if (child._componentWillUnmount !== undefined) {
              child._componentWillUnmount();
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        while (this._element.hasChildNodes()) {
          this._element.removeChild(this._element.lastChild);
        }
      }

      this._children = children;

      if (this._element !== null) {
        var fragment = document.createDocumentFragment();
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this._children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _child = _step5.value;

            this._convertAndAppend(fragment, _child);
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        this._element.appendChild(fragment);

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this._children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _child2 = _step6.value;

            if (_child2._componentDidMount !== undefined) {
              _child2._componentDidMount();
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      }

      return this;
    }
  }, {
    key: "_componentDidMount",
    value: function _componentDidMount() {
      if (this._element !== null) {
        if (this.componentDidMount !== undefined) {
          this.componentDidMount(this._element);
        }

        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this._children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var child = _step7.value;

            if (child._componentDidMount !== undefined) {
              child._componentDidMount();
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      }
    }
  }, {
    key: "_componentWillUnmount",
    value: function _componentWillUnmount() {
      if (this._element !== null) {
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = this._children[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var child = _step8.value;

            if (child._componentWillUnmount !== undefined) {
              child._componentWillUnmount();
            }
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }

        if (this.componentWillUnmount !== undefined) {
          this.componentWillUnmount(this._element);
        }

        this._element = null;
      }
    }
  }]);

  return Element;
}();

function render(element, parent) {
  element.appendTo(parent);

  element._componentDidMount();
}

function createElement(tagName, attributes) {
  for (var _len2 = arguments.length, children = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    children[_key2 - 2] = arguments[_key2];
  }

  return new Element(tagName, attributes, children);
}

function Div(attributes) {
  for (var _len3 = arguments.length, children = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    children[_key3 - 1] = arguments[_key3];
  }

  return createElement.apply(void 0, ["div", attributes].concat(children));
}

function Span(attributes) {
  for (var _len4 = arguments.length, children = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    children[_key4 - 1] = arguments[_key4];
  }

  return createElement.apply(void 0, ["span", attributes].concat(children));
}