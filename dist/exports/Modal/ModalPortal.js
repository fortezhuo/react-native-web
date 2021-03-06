/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import { useEffect, useState, useRef } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import ReactDOM from 'react-dom';

function ModalPortal(props) {
  var children = props.children;
  var elementRef = useRef();

  var _useState = useState(),
      mounted = _useState[0],
      setMounted = _useState[1];

  useEffect(function () {
    if (canUseDOM) {
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
  return mounted && elementRef.current && canUseDOM ? ReactDOM.createPortal(children, elementRef.current) : null;
}

export default ModalPortal;