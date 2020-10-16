"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function ModalPortal(props) {
  var children = props.children;
  var elementRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(),
      mounted = _useState[0],
      setMounted = _useState[1];

  (0, _react.useEffect)(function () {
    if (_ExecutionEnvironment.canUseDOM) {
      var element = document.createElement('div');

      if (element && document.body) {
        document.body.appendChild(element);
        elementRef.current = element;
        setMounted(true);
      }

      return function () {
        if (document.body) {
          document.body.removeChild(element);
        }
      };
    }
  }, []);
  return mounted && elementRef.current && _ExecutionEnvironment.canUseDOM ? _reactDom.default.createPortal(children, elementRef.current) : null;
}

var _default = ModalPortal;
exports.default = _default;
module.exports = exports.default;