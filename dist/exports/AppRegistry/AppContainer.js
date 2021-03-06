function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import StyleSheet from '../StyleSheet';
import View from '../View';
import { any } from 'prop-types';
import React from 'react';

var AppContainer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(AppContainer, _React$Component);

  function AppContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      mainKey: 1
    };
    return _this;
  }

  var _proto = AppContainer.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      rootTag: this.props.rootTag
    };
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        WrapperComponent = _this$props.WrapperComponent;
    var innerView = React.createElement(View, {
      children: children,
      key: this.state.mainKey,
      pointerEvents: "box-none",
      style: styles.appContainer
    });

    if (WrapperComponent) {
      innerView = React.createElement(WrapperComponent, null, innerView);
    }

    return React.createElement(View, {
      pointerEvents: "box-none",
      style: styles.appContainer
    }, innerView);
  };

  return AppContainer;
}(React.Component);

AppContainer.childContextTypes = {
  rootTag: any
};
export { AppContainer as default };
var styles = StyleSheet.create({
  appContainer: {
    flex: 1
  }
});