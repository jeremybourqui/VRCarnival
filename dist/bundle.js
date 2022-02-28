/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/a-test.js":
/*!**********************************!*\
  !*** ./src/components/a-test.js ***!
  \**********************************/
/***/ (() => {

AFRAME.registerPrimitive('a-test', {
  defaultComponents: {
    'mytest': {}
  },
  mappings: {

  }
});

AFRAME.registerComponent('mytest', {
  schema: {

  },
  init: function () {
    this.genAll();
  },
  genAll: function () {
    this.genVertices();
    this.genShape();
    this.genGeometry();
    this.genMaterial();
    this.genMesh();
  },
  genVertices: function () {
    this.vertices = [];
    for (let i = 0; i < 6; i++ ) {
      let angle_rad = 1.0471975511965976 * i; // (Math.PI / 180) * 60 * i
      this.vertices.push(new THREE.Vector2(1 * Math.cos(angle_rad), 1 * Math.sin(angle_rad)));
    }
  },
  genShape: function() {
    this.shape = new THREE.Shape();
    this.shape.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let i = 1; i < 6; i++) this.shape.lineTo(this.vertices[i].x, this.vertices[i].y);
    this.shape.lineTo(this.vertices[0].x, this.vertices[0].y);
  },
  genGeometry: function() {
    this.geometrySettings = {
      depth: 3,
      bevelEnabled: false,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 1 / 20,
      bevelThickness: 1 / 20
    };
    this.geometry = new THREE.ExtrudeGeometry(this.shape, this.geometrySettings);
  },
  genMaterial: function () {
    this.material = new THREE.MeshLambertMaterial({color: new THREE.Color('red')});
  },
  genMesh: function() {
    this.mesh =  new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    this.el.setObject3D('mesh', this.mesh);
  }
});

/***/ }),

/***/ "./src/components/animate-rotation.js":
/*!********************************************!*\
  !*** ./src/components/animate-rotation.js ***!
  \********************************************/
/***/ (() => {

AFRAME.registerComponent('animate-rotation', {
  multiple: true,
  schema: {
    speed: {type: 'number', default: 10},
    axe: {type: 'string', default: 'x'}
  },
  init: function () {

  },
  remove: function () {

  },
  update: function () {

  },
  tick: function (elapsed, dt) {
    this.el.object3D.rotation[this.data.axe] = THREE.MathUtils.degToRad(elapsed / this.data.speed);
  }
})

/***/ }),

/***/ "./src/components/cursor-listener.js":
/*!*******************************************!*\
  !*** ./src/components/cursor-listener.js ***!
  \*******************************************/
/***/ (() => {

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('click', evt => {
      console.log(evt);
    });
  }
});

/***/ }),

/***/ "./src/components/emit-when-near.js":
/*!******************************************!*\
  !*** ./src/components/emit-when-near.js ***!
  \******************************************/
/***/ (() => {

AFRAME.registerComponent('emit-when-near', {
  schema: {
    target: {type: 'selector', default: '#camera-rig'},
    distance: {type: 'number', default: 1},
    event: {type: 'string', default: 'click'},
    eventFar: {type: 'string', default: 'unclick'},
    throttle: {type: 'number', default: 100},
  },
  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.checkDist, this.data.throttle, this);
    this.emiting = false;
  },
  checkDist: function () {
    let myPos = new THREE.Vector3(0, 0, 0);
    let targetPos = new THREE.Vector3(0, 0, 0);
    this.el.object3D.getWorldPosition(myPos);
    this.data.target.object3D.getWorldPosition(targetPos);
    const distanceTo = myPos.distanceTo(targetPos);
    if (distanceTo <= this.data.distance) {
      if (this.emiting) return;
      this.emiting = true;
      this.el.emit(this.data.event, {collidingEntity: this.data.target}, false);
      this.data.target.emit(this.data.event, {collidingEntity: this.el}, false);
    } else {
      if (!this.emiting) return;
      this.el.emit(this.data.eventFar, {collidingEntity: this.data.target}, false);
      this.data.target.emit(this.data.eventFar, {collidingEntity: this.el}, false);
      this.emiting = false;
    }
  }
});


/***/ }),

/***/ "./src/components/hover-highlighter.js":
/*!*********************************************!*\
  !*** ./src/components/hover-highlighter.js ***!
  \*********************************************/
/***/ (() => {

AFRAME.registerComponent('hover-highlighter', {
  schema: {
    color: {type: 'color', default: 'white'}
  },
  init: function () {
    let target = this.el;
    this.handlerOnEnter = evt => this.onEnter(evt);
    this.handlerOnLeave = evt => this.onLeave(evt);
    target.addEventListener("mouseenter", this.handlerOnEnter);
    target.addEventListener("mouseleave", this.handlerOnLeave);
  },
  onEnter: function (evt) {
    let cursor = evt.detail.cursorEl;
    this.savedColor = cursor.getAttribute("material").color;
    cursor.setAttribute("material", "color", this.data.color);
  },
  onLeave: function (evt) {
    let cursor = evt.detail.cursorEl;
    cursor.setAttribute("material", "color", this.savedColor);
  },
  remove: function () {
    let target = this.el;
    target.removeEventListener("mouseenter", this.handlerOnEnter);
    target.removeEventListener("mouseleave", this.handlerOnLeave);
  }
});

/***/ }),

/***/ "./src/components/im-box.js":
/*!**********************************!*\
  !*** ./src/components/im-box.js ***!
  \**********************************/
/***/ (() => {

AFRAME.registerPrimitive('im-box', {
  defaultComponents: {
    'imbox': {}
  },
  mappings: {
    size: 'imbox.size'
  }
});

AFRAME.registerComponent('imbox', {
  schema: {
    size: {type: "number", default: 1}
  },
  init: function () {
    this.genVertices();
    this.genShape();
  },
  genVertices: function  () {
    const half = this.data.size /2;
    this.vertices = [];
    this.vertices.push(new THREE.Vector2(-half, half));
    this.vertices.push(new THREE.Vector2(half, half));
    this.vertices.push(new THREE.Vector2(half, -half));
    this.vertices.push(new THREE.Vector2(-half, -half));
  },
  genShape: function () {
    this.shape = new THREE.Shape();

    const hg = this.vertices[0];
    this.shape.moveTo(hg.x, hg.y);

    const hd = this.vertices[1];
    this.shape.lineTo(hd.x, hd.y);

    const bd = this.vertices[2];
    this.shape.lineTo(bd.x, bd.y);

    const bl = this.vertices[3];
    this.shape.lineTo(bl.x, bl.y);

    this.shape.lineTo(hg.x, hg.y);

    const geometry = new THREE.ShapeGeometry( this.shape );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const mesh = new THREE.Mesh( geometry, material ) ;
    this.el.setObject3D('mesh', mesh);

  }



})


/***/ }),

/***/ "./src/components/listen-to.js":
/*!*************************************!*\
  !*** ./src/components/listen-to.js ***!
  \*************************************/
/***/ (() => {

AFRAME.registerComponent('listen-to', {
  multiple: true,
  schema: {
    evt: {type: 'string', default: 'click'},
    target: {type: 'selector'},
    emit: {type: 'string'}
  },
  init: function () {
    this.data.target.addEventListener(this.data.evt, evt => {
      this.el.emit(this.data.emit);
    })
  }
});

/***/ }),

/***/ "./src/components/on-event-set.js":
/*!****************************************!*\
  !*** ./src/components/on-event-set.js ***!
  \****************************************/
/***/ (() => {

AFRAME.registerComponent('on-event-set', {
  multiple: true,

  schema: {
    event: {type: 'string', default: 'click'},
    attribute: {type: 'string'},
    value: {type: 'string'}
  },

  init: function() {
    this._onEvent = this._onEvent.bind(this);
    this.el.addEventListener(this.data.event, this._onEvent);
  },

  remove: function() {
    this.el.removeEventListener(this.data.event, this._onEvent);
  },

  _onEvent: function(evt) {
    AFRAME.utils.entity.setComponentProperty(this.el, this.data.attribute, this.data.value);
  }

});

/***/ }),

/***/ "./src/components/toggle-events.js":
/*!*****************************************!*\
  !*** ./src/components/toggle-events.js ***!
  \*****************************************/
/***/ (() => {

AFRAME.registerComponent('toggle-events', {
  multiple: true,
  schema: {
    sourceEvt: {type: 'string', default: 'click'},
    evt1: {type: 'string'},
    evt2: {type: 'string'}
  },
  init: function () {
    this.state = 0;
    this.el.addEventListener(this.data.sourceEvt, evt => {
      if (this.state == 0) {
        this.el.emit(this.data.evt1);
        this.state = 1;
      } else {
        this.el.emit(this.data.evt2);
        this.state = 0;
      }
    });
  }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_animate_rotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/animate-rotation */ "./src/components/animate-rotation.js");
/* harmony import */ var _components_animate_rotation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_animate_rotation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_cursor_listener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/cursor-listener */ "./src/components/cursor-listener.js");
/* harmony import */ var _components_cursor_listener__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_cursor_listener__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_hover_highlighter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/hover-highlighter */ "./src/components/hover-highlighter.js");
/* harmony import */ var _components_hover_highlighter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_hover_highlighter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_toggle_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/toggle-events */ "./src/components/toggle-events.js");
/* harmony import */ var _components_toggle_events__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_toggle_events__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_listen_to__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/listen-to */ "./src/components/listen-to.js");
/* harmony import */ var _components_listen_to__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_listen_to__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_emit_when_near__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/emit-when-near */ "./src/components/emit-when-near.js");
/* harmony import */ var _components_emit_when_near__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_emit_when_near__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_on_event_set__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/on-event-set */ "./src/components/on-event-set.js");
/* harmony import */ var _components_on_event_set__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_on_event_set__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_im_box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/im-box */ "./src/components/im-box.js");
/* harmony import */ var _components_im_box__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_components_im_box__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_a_test__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/a-test */ "./src/components/a-test.js");
/* harmony import */ var _components_a_test__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_components_a_test__WEBPACK_IMPORTED_MODULE_8__);












})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVc7QUFDWCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7Ozs7OztVQ25CRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnVDO0FBQ0Q7QUFDRTtBQUNKO0FBQ0o7QUFDaEM7QUFDcUM7QUFDRjtBQUNOO0FBQzdCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2EtdGVzdC5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtcm90YXRpb24uanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9jdXJzb3ItbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9lbWl0LXdoZW4tbmVhci5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2hvdmVyLWhpZ2hsaWdodGVyLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvaW0tYm94LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvbGlzdGVuLXRvLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvb24tZXZlbnQtc2V0LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvdG9nZ2xlLWV2ZW50cy5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiQUZSQU1FLnJlZ2lzdGVyUHJpbWl0aXZlKCdhLXRlc3QnLCB7XHJcbiAgZGVmYXVsdENvbXBvbmVudHM6IHtcclxuICAgICdteXRlc3QnOiB7fVxyXG4gIH0sXHJcbiAgbWFwcGluZ3M6IHtcclxuXHJcbiAgfVxyXG59KTtcclxuXHJcbkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnbXl0ZXN0Jywge1xyXG4gIHNjaGVtYToge1xyXG5cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2VuQWxsKCk7XHJcbiAgfSxcclxuICBnZW5BbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2VuVmVydGljZXMoKTtcclxuICAgIHRoaXMuZ2VuU2hhcGUoKTtcclxuICAgIHRoaXMuZ2VuR2VvbWV0cnkoKTtcclxuICAgIHRoaXMuZ2VuTWF0ZXJpYWwoKTtcclxuICAgIHRoaXMuZ2VuTWVzaCgpO1xyXG4gIH0sXHJcbiAgZ2VuVmVydGljZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudmVydGljZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrICkge1xyXG4gICAgICBsZXQgYW5nbGVfcmFkID0gMS4wNDcxOTc1NTExOTY1OTc2ICogaTsgLy8gKE1hdGguUEkgLyAxODApICogNjAgKiBpXHJcbiAgICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMigxICogTWF0aC5jb3MoYW5nbGVfcmFkKSwgMSAqIE1hdGguc2luKGFuZ2xlX3JhZCkpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdlblNoYXBlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcclxuICAgIHRoaXMuc2hhcGUubW92ZVRvKHRoaXMudmVydGljZXNbMF0ueCwgdGhpcy52ZXJ0aWNlc1swXS55KTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNjsgaSsrKSB0aGlzLnNoYXBlLmxpbmVUbyh0aGlzLnZlcnRpY2VzW2ldLngsIHRoaXMudmVydGljZXNbaV0ueSk7XHJcbiAgICB0aGlzLnNoYXBlLmxpbmVUbyh0aGlzLnZlcnRpY2VzWzBdLngsIHRoaXMudmVydGljZXNbMF0ueSk7XHJcbiAgfSxcclxuICBnZW5HZW9tZXRyeTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmdlb21ldHJ5U2V0dGluZ3MgPSB7XHJcbiAgICAgIGRlcHRoOiAzLFxyXG4gICAgICBiZXZlbEVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBiZXZlbFNlZ21lbnRzOiAxLFxyXG4gICAgICBzdGVwczogMSxcclxuICAgICAgYmV2ZWxTaXplOiAxIC8gMjAsXHJcbiAgICAgIGJldmVsVGhpY2tuZXNzOiAxIC8gMjBcclxuICAgIH07XHJcbiAgICB0aGlzLmdlb21ldHJ5ID0gbmV3IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeSh0aGlzLnNoYXBlLCB0aGlzLmdlb21ldHJ5U2V0dGluZ3MpO1xyXG4gIH0sXHJcbiAgZ2VuTWF0ZXJpYWw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7Y29sb3I6IG5ldyBUSFJFRS5Db2xvcigncmVkJyl9KTtcclxuICB9LFxyXG4gIGdlbk1lc2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5tZXNoID0gIG5ldyBUSFJFRS5NZXNoKHRoaXMuZ2VvbWV0cnksIHRoaXMubWF0ZXJpYWwpO1xyXG4gICAgdGhpcy5tZXNoLnJvdGF0ZU9uQXhpcyhuZXcgVEhSRUUuVmVjdG9yMygtMSwgMCwgMCksIE1hdGguUEkgLyAyKTtcclxuICAgIHRoaXMuZWwuc2V0T2JqZWN0M0QoJ21lc2gnLCB0aGlzLm1lc2gpO1xyXG4gIH1cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdhbmltYXRlLXJvdGF0aW9uJywge1xyXG4gIG11bHRpcGxlOiB0cnVlLFxyXG4gIHNjaGVtYToge1xyXG4gICAgc3BlZWQ6IHt0eXBlOiAnbnVtYmVyJywgZGVmYXVsdDogMTB9LFxyXG4gICAgYXhlOiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICd4J31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICAgIHRoaXMuZWwub2JqZWN0M0Qucm90YXRpb25bdGhpcy5kYXRhLmF4ZV0gPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoZWxhcHNlZCAvIHRoaXMuZGF0YS5zcGVlZCk7XHJcbiAgfVxyXG59KSIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnY3Vyc29yLWxpc3RlbmVyJywge1xyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhldnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTsiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2VtaXQtd2hlbi1uZWFyJywge1xyXG4gIHNjaGVtYToge1xyXG4gICAgdGFyZ2V0OiB7dHlwZTogJ3NlbGVjdG9yJywgZGVmYXVsdDogJyNjYW1lcmEtcmlnJ30sXHJcbiAgICBkaXN0YW5jZToge3R5cGU6ICdudW1iZXInLCBkZWZhdWx0OiAxfSxcclxuICAgIGV2ZW50OiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICdjbGljayd9LFxyXG4gICAgZXZlbnRGYXI6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ3VuY2xpY2snfSxcclxuICAgIHRocm90dGxlOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDEwMH0sXHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnRpY2sgPSBBRlJBTUUudXRpbHMudGhyb3R0bGVUaWNrKHRoaXMuY2hlY2tEaXN0LCB0aGlzLmRhdGEudGhyb3R0bGUsIHRoaXMpO1xyXG4gICAgdGhpcy5lbWl0aW5nID0gZmFsc2U7XHJcbiAgfSxcclxuICBjaGVja0Rpc3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBteVBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgbGV0IHRhcmdldFBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgdGhpcy5lbC5vYmplY3QzRC5nZXRXb3JsZFBvc2l0aW9uKG15UG9zKTtcclxuICAgIHRoaXMuZGF0YS50YXJnZXQub2JqZWN0M0QuZ2V0V29ybGRQb3NpdGlvbih0YXJnZXRQb3MpO1xyXG4gICAgY29uc3QgZGlzdGFuY2VUbyA9IG15UG9zLmRpc3RhbmNlVG8odGFyZ2V0UG9zKTtcclxuICAgIGlmIChkaXN0YW5jZVRvIDw9IHRoaXMuZGF0YS5kaXN0YW5jZSkge1xyXG4gICAgICBpZiAodGhpcy5lbWl0aW5nKSByZXR1cm47XHJcbiAgICAgIHRoaXMuZW1pdGluZyA9IHRydWU7XHJcbiAgICAgIHRoaXMuZWwuZW1pdCh0aGlzLmRhdGEuZXZlbnQsIHtjb2xsaWRpbmdFbnRpdHk6IHRoaXMuZGF0YS50YXJnZXR9LCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuZGF0YS50YXJnZXQuZW1pdCh0aGlzLmRhdGEuZXZlbnQsIHtjb2xsaWRpbmdFbnRpdHk6IHRoaXMuZWx9LCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIXRoaXMuZW1pdGluZykgcmV0dXJuO1xyXG4gICAgICB0aGlzLmVsLmVtaXQodGhpcy5kYXRhLmV2ZW50RmFyLCB7Y29sbGlkaW5nRW50aXR5OiB0aGlzLmRhdGEudGFyZ2V0fSwgZmFsc2UpO1xyXG4gICAgICB0aGlzLmRhdGEudGFyZ2V0LmVtaXQodGhpcy5kYXRhLmV2ZW50RmFyLCB7Y29sbGlkaW5nRW50aXR5OiB0aGlzLmVsfSwgZmFsc2UpO1xyXG4gICAgICB0aGlzLmVtaXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2hvdmVyLWhpZ2hsaWdodGVyJywge1xyXG4gIHNjaGVtYToge1xyXG4gICAgY29sb3I6IHt0eXBlOiAnY29sb3InLCBkZWZhdWx0OiAnd2hpdGUnfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRhcmdldCA9IHRoaXMuZWw7XHJcbiAgICB0aGlzLmhhbmRsZXJPbkVudGVyID0gZXZ0ID0+IHRoaXMub25FbnRlcihldnQpO1xyXG4gICAgdGhpcy5oYW5kbGVyT25MZWF2ZSA9IGV2dCA9PiB0aGlzLm9uTGVhdmUoZXZ0KTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLmhhbmRsZXJPbkVudGVyKTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLmhhbmRsZXJPbkxlYXZlKTtcclxuICB9LFxyXG4gIG9uRW50ZXI6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGxldCBjdXJzb3IgPSBldnQuZGV0YWlsLmN1cnNvckVsO1xyXG4gICAgdGhpcy5zYXZlZENvbG9yID0gY3Vyc29yLmdldEF0dHJpYnV0ZShcIm1hdGVyaWFsXCIpLmNvbG9yO1xyXG4gICAgY3Vyc29yLnNldEF0dHJpYnV0ZShcIm1hdGVyaWFsXCIsIFwiY29sb3JcIiwgdGhpcy5kYXRhLmNvbG9yKTtcclxuICB9LFxyXG4gIG9uTGVhdmU6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGxldCBjdXJzb3IgPSBldnQuZGV0YWlsLmN1cnNvckVsO1xyXG4gICAgY3Vyc29yLnNldEF0dHJpYnV0ZShcIm1hdGVyaWFsXCIsIFwiY29sb3JcIiwgdGhpcy5zYXZlZENvbG9yKTtcclxuICB9LFxyXG4gIHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRhcmdldCA9IHRoaXMuZWw7XHJcbiAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5oYW5kbGVyT25FbnRlcik7XHJcbiAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5oYW5kbGVyT25MZWF2ZSk7XHJcbiAgfVxyXG59KTsiLCJBRlJBTUUucmVnaXN0ZXJQcmltaXRpdmUoJ2ltLWJveCcsIHtcclxuICBkZWZhdWx0Q29tcG9uZW50czoge1xyXG4gICAgJ2ltYm94Jzoge31cclxuICB9LFxyXG4gIG1hcHBpbmdzOiB7XHJcbiAgICBzaXplOiAnaW1ib3guc2l6ZSdcclxuICB9XHJcbn0pO1xyXG5cclxuQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdpbWJveCcsIHtcclxuICBzY2hlbWE6IHtcclxuICAgIHNpemU6IHt0eXBlOiBcIm51bWJlclwiLCBkZWZhdWx0OiAxfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nZW5WZXJ0aWNlcygpO1xyXG4gICAgdGhpcy5nZW5TaGFwZSgpO1xyXG4gIH0sXHJcbiAgZ2VuVmVydGljZXM6IGZ1bmN0aW9uICAoKSB7XHJcbiAgICBjb25zdCBoYWxmID0gdGhpcy5kYXRhLnNpemUgLzI7XHJcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XHJcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoLWhhbGYsIGhhbGYpKTtcclxuICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMihoYWxmLCBoYWxmKSk7XHJcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoaGFsZiwgLWhhbGYpKTtcclxuICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMigtaGFsZiwgLWhhbGYpKTtcclxuICB9LFxyXG4gIGdlblNoYXBlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XHJcblxyXG4gICAgY29uc3QgaGcgPSB0aGlzLnZlcnRpY2VzWzBdO1xyXG4gICAgdGhpcy5zaGFwZS5tb3ZlVG8oaGcueCwgaGcueSk7XHJcblxyXG4gICAgY29uc3QgaGQgPSB0aGlzLnZlcnRpY2VzWzFdO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oaGQueCwgaGQueSk7XHJcblxyXG4gICAgY29uc3QgYmQgPSB0aGlzLnZlcnRpY2VzWzJdO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oYmQueCwgYmQueSk7XHJcblxyXG4gICAgY29uc3QgYmwgPSB0aGlzLnZlcnRpY2VzWzNdO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oYmwueCwgYmwueSk7XHJcblxyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oaGcueCwgaGcueSk7XHJcblxyXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU2hhcGVHZW9tZXRyeSggdGhpcy5zaGFwZSApO1xyXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHsgY29sb3I6IDB4MDBmZjAwIH0gKTtcclxuICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICkgO1xyXG4gICAgdGhpcy5lbC5zZXRPYmplY3QzRCgnbWVzaCcsIG1lc2gpO1xyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbn0pXHJcbiIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnbGlzdGVuLXRvJywge1xyXG4gIG11bHRpcGxlOiB0cnVlLFxyXG4gIHNjaGVtYToge1xyXG4gICAgZXZ0OiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICdjbGljayd9LFxyXG4gICAgdGFyZ2V0OiB7dHlwZTogJ3NlbGVjdG9yJ30sXHJcbiAgICBlbWl0OiB7dHlwZTogJ3N0cmluZyd9XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmRhdGEudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5kYXRhLmV2dCwgZXZ0ID0+IHtcclxuICAgICAgdGhpcy5lbC5lbWl0KHRoaXMuZGF0YS5lbWl0KTtcclxuICAgIH0pXHJcbiAgfVxyXG59KTsiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ29uLWV2ZW50LXNldCcsIHtcclxuICBtdWx0aXBsZTogdHJ1ZSxcclxuXHJcbiAgc2NoZW1hOiB7XHJcbiAgICBldmVudDoge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAnY2xpY2snfSxcclxuICAgIGF0dHJpYnV0ZToge3R5cGU6ICdzdHJpbmcnfSxcclxuICAgIHZhbHVlOiB7dHlwZTogJ3N0cmluZyd9XHJcbiAgfSxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9vbkV2ZW50ID0gdGhpcy5fb25FdmVudC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZGF0YS5ldmVudCwgdGhpcy5fb25FdmVudCk7XHJcbiAgfSxcclxuXHJcbiAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEuZXZlbnQsIHRoaXMuX29uRXZlbnQpO1xyXG4gIH0sXHJcblxyXG4gIF9vbkV2ZW50OiBmdW5jdGlvbihldnQpIHtcclxuICAgIEFGUkFNRS51dGlscy5lbnRpdHkuc2V0Q29tcG9uZW50UHJvcGVydHkodGhpcy5lbCwgdGhpcy5kYXRhLmF0dHJpYnV0ZSwgdGhpcy5kYXRhLnZhbHVlKTtcclxuICB9XHJcblxyXG59KTsiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ3RvZ2dsZS1ldmVudHMnLCB7XHJcbiAgbXVsdGlwbGU6IHRydWUsXHJcbiAgc2NoZW1hOiB7XHJcbiAgICBzb3VyY2VFdnQ6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ2NsaWNrJ30sXHJcbiAgICBldnQxOiB7dHlwZTogJ3N0cmluZyd9LFxyXG4gICAgZXZ0Mjoge3R5cGU6ICdzdHJpbmcnfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IDA7XHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5kYXRhLnNvdXJjZUV2dCwgZXZ0ID0+IHtcclxuICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gMCkge1xyXG4gICAgICAgIHRoaXMuZWwuZW1pdCh0aGlzLmRhdGEuZXZ0MSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbC5lbWl0KHRoaXMuZGF0YS5ldnQyKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2NvbXBvbmVudHMvYW5pbWF0ZS1yb3RhdGlvbic7XHJcbmltcG9ydCAnLi9jb21wb25lbnRzL2N1cnNvci1saXN0ZW5lcic7XHJcbmltcG9ydCAnLi9jb21wb25lbnRzL2hvdmVyLWhpZ2hsaWdodGVyJztcclxuaW1wb3J0ICcuL2NvbXBvbmVudHMvdG9nZ2xlLWV2ZW50cyc7XHJcbmltcG9ydCAnLi9jb21wb25lbnRzL2xpc3Rlbi10byc7XHJcblxyXG5pbXBvcnQgJy4vY29tcG9uZW50cy9lbWl0LXdoZW4tbmVhcic7XHJcbmltcG9ydCAnLi9jb21wb25lbnRzL29uLWV2ZW50LXNldCc7XHJcbmltcG9ydCAnLi9jb21wb25lbnRzL2ltLWJveCc7XHJcblxyXG5cclxuaW1wb3J0ICcuL2NvbXBvbmVudHMvYS10ZXN0JzsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=