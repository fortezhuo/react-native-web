/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import React, { forwardRef, useCallback, useMemo, useEffect, useState } from 'react';
import ModalPortal from './ModalPortal';
import ModalAnimation from './ModalAnimation';
import ModalContent from './ModalContent';
import ModalFocusTrap from './ModalFocusTrap';
var uniqueModalIdentifier = 0;
var activeModalStack = [];
var activeModalListeners = {};

function notifyActiveModalListeners() {
  if (activeModalStack.length === 0) {
    return;
  }

  var activeModalId = activeModalStack[activeModalStack.length - 1];
  activeModalStack.forEach(function (modalId) {
    if (modalId in activeModalListeners) {
      activeModalListeners[modalId](modalId === activeModalId);
    }
  });
}

function removeActiveModal(modalId) {
  if (modalId in activeModalListeners) {
    // Before removing this listener we should probably tell it
    // that it's no longer the active modal for sure.
    activeModalListeners[modalId](false);
    delete activeModalListeners[modalId];
  }

  var index = activeModalStack.indexOf(modalId);

  if (index !== -1) {
    activeModalStack.splice(index, 1);
    notifyActiveModalListeners();
  }
}

function addActiveModal(modalId, listener) {
  removeActiveModal(modalId);
  activeModalStack.push(modalId);
  activeModalListeners[modalId] = listener;
  notifyActiveModalListeners();
}

var Modal = forwardRef(function (props, forwardedRef) {
  var animationType = props.animationType,
      children = props.children,
      onDismiss = props.onDismiss,
      onRequestClose = props.onRequestClose,
      onShow = props.onShow,
      transparent = props.transparent,
      _props$visible = props.visible,
      visible = _props$visible === void 0 ? true : _props$visible; // Set a unique model identifier so we can correctly route
  // dismissals and check the layering of modals.

  var modalId = useMemo(function () {
    return uniqueModalIdentifier++;
  }, []);

  var _useState = useState(false),
      isActive = _useState[0],
      setIsActive = _useState[1];

  var onDismissCallback = useCallback(function () {
    // When we dismiss we can't assume that we're dismissing the
    // top element in the stack - so search the stack and remove
    // ourselves from it if need be.
    removeActiveModal(modalId);

    if (onDismiss) {
      onDismiss();
    }
  }, [modalId, onDismiss]);
  var onShowCallback = useCallback(function () {
    addActiveModal(modalId, setIsActive);

    if (onShow) {
      onShow();
    }
  }, [modalId, onShow]);
  useEffect(function () {
    // When this component is unmounted we should remove the modal from
    // the active modal stack.  This is to handle the case of us unmounting
    // a visible modal so we don't end up with a broken stack
    return function () {
      return removeActiveModal(modalId);
    };
  }, [modalId]);
  return React.createElement(ModalPortal, null, React.createElement(ModalAnimation, {
    animationType: animationType,
    onDismiss: onDismissCallback,
    onShow: onShowCallback,
    visible: visible
  }, React.createElement(ModalFocusTrap, {
    active: isActive
  }, React.createElement(ModalContent, {
    active: isActive,
    onRequestClose: onRequestClose,
    ref: forwardedRef,
    transparent: transparent
  }, children))));
});
export default Modal;