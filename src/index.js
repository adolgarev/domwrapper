/* global Node */

"use strict";

class Element {
    constructor(tagName, attributes, children) {
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

    getDOMElement() {
        return this._element;
    }

    _convertAndAppend(parent, child) {
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

    appendTo(parent) {
        this._element = document.createElement(this._tagName);
        for (let key of Object.keys(this._attributes)) {
            if (key === "class")
                this._element.setAttribute(key, this._attributes[key]);
            else
                this._element[key] = this._attributes[key];
        }
        for (let eventListener of this._eventListeners) {
            this._element.addEventListener(...eventListener);
        }
        for (let child of this._children) {
            this._convertAndAppend(this._element, child);
        }
        parent.appendChild(this._element);
    }
    
    getAttribute(key) {
        return this._attributes[key];
    }

    setAttribute(key, val) {
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

    setStyle(obj) {
        let val = "";
        if (obj !== undefined && obj !== null) {
            for (let key of Object.keys(obj).sort()) {
                val += key + ":" + obj[key] + ";";
            }
        }
        this._style = obj;
        return this.setAttribute("style", val);
    }
    
    updateStyle(obj) {
        if (this._style === undefined || this._style === null) {
            this._style = {};
        }
        let res = Object.assign({}, this._style, obj);
        return this.setStyle(res);
    }

    addEventListener(type, listener, options) {
        if (this._element !== null) {
            this._element.addEventListener(type, listener, options);
        }
        this._eventListeners.push([type, listener, options]);
        return this;
    }

    setChildren(...children) {
        if (children.length > 0 && Array.isArray(children[0])) {
            children = children[0];
        }
        if (this._children.length === children.length) {
            let equal = true;
            for (let i = 0; i < children.length; i++) {
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
            for (let child of this._children) {
                if (child._componentWillUnmount !== undefined) {
                    child._componentWillUnmount();
                }
            }
            while (this._element.hasChildNodes()) {
                this._element.removeChild(this._element.lastChild);
            }
        }
        this._children = children;
        if (this._element !== null) {
            let fragment = document.createDocumentFragment();
            for (let child of this._children) {
                this._convertAndAppend(fragment, child);
            }
            this._element.appendChild(fragment);
            for (let child of this._children) {
                if (child._componentDidMount !== undefined) {
                    child._componentDidMount();
                }
            }
        }
        return this;
    }

    _componentDidMount() {
        if (this._element !== null) {
            if (this.componentDidMount !== undefined) {
                this.componentDidMount(this._element);
            }
            for (let child of this._children) {
                if (child._componentDidMount !== undefined) {
                    child._componentDidMount();
                }
            }
        }
    }

    _componentWillUnmount() {
        if (this._element !== null) {
            for (let child of this._children) {
                if (child._componentWillUnmount !== undefined) {
                    child._componentWillUnmount();
                }
            }
            if (this.componentWillUnmount !== undefined) {
                this.componentWillUnmount(this._element);
            }
            this._element = null;
        }
    }
}

export function render(element, parent) {
    element.appendTo(parent);
    element._componentDidMount();
}

export function createElement(tagName, attributes, ...children) {
    return new Element(tagName, attributes, children);
}

export function Div(attributes, ...children) {
    return createElement("div", attributes, ...children);
}

export function Span(attributes, ...children) {
    return createElement("span", attributes, ...children);
}
