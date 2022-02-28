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

/***/ }),

/***/ "./src/components sync \\.js$":
/*!*************************************************!*\
  !*** ./src/components/ sync nonrecursive \.js$ ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./a-test.js": "./src/components/a-test.js",
	"./animate-rotation.js": "./src/components/animate-rotation.js",
	"./cursor-listener.js": "./src/components/cursor-listener.js",
	"./emit-when-near.js": "./src/components/emit-when-near.js",
	"./hover-highlighter.js": "./src/components/hover-highlighter.js",
	"./im-box.js": "./src/components/im-box.js",
	"./listen-to.js": "./src/components/listen-to.js",
	"./on-event-set.js": "./src/components/on-event-set.js",
	"./toggle-events.js": "./src/components/toggle-events.js",
	"components/a-test.js": "./src/components/a-test.js",
	"components/animate-rotation.js": "./src/components/animate-rotation.js",
	"components/cursor-listener.js": "./src/components/cursor-listener.js",
	"components/emit-when-near.js": "./src/components/emit-when-near.js",
	"components/hover-highlighter.js": "./src/components/hover-highlighter.js",
	"components/im-box.js": "./src/components/im-box.js",
	"components/listen-to.js": "./src/components/listen-to.js",
	"components/on-event-set.js": "./src/components/on-event-set.js",
	"components/toggle-events.js": "./src/components/toggle-events.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/components sync \\.js$";

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/

function importAll(r) {
  r.keys().forEach(r);
}

importAll(__webpack_require__("./src/components sync \\.js$"));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVc7QUFDWCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7Ozs7Ozs7Ozs7QUNuQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUN2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxtREFBK0MsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvYS10ZXN0LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1yb3RhdGlvbi5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2N1cnNvci1saXN0ZW5lci5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2VtaXQtd2hlbi1uZWFyLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvaG92ZXItaGlnaGxpZ2h0ZXIuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9pbS1ib3guanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9saXN0ZW4tdG8uanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9vbi1ldmVudC1zZXQuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy90b2dnbGUtZXZlbnRzLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHN8c3luY3xub25yZWN1cnNpdmV8Ly5qcyQiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIkFGUkFNRS5yZWdpc3RlclByaW1pdGl2ZSgnYS10ZXN0Jywge1xyXG4gIGRlZmF1bHRDb21wb25lbnRzOiB7XHJcbiAgICAnbXl0ZXN0Jzoge31cclxuICB9LFxyXG4gIG1hcHBpbmdzOiB7XHJcblxyXG4gIH1cclxufSk7XHJcblxyXG5BRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ215dGVzdCcsIHtcclxuICBzY2hlbWE6IHtcclxuXHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdlbkFsbCgpO1xyXG4gIH0sXHJcbiAgZ2VuQWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdlblZlcnRpY2VzKCk7XHJcbiAgICB0aGlzLmdlblNoYXBlKCk7XHJcbiAgICB0aGlzLmdlbkdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLmdlbk1hdGVyaWFsKCk7XHJcbiAgICB0aGlzLmdlbk1lc2goKTtcclxuICB9LFxyXG4gIGdlblZlcnRpY2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKyApIHtcclxuICAgICAgbGV0IGFuZ2xlX3JhZCA9IDEuMDQ3MTk3NTUxMTk2NTk3NiAqIGk7IC8vIChNYXRoLlBJIC8gMTgwKSAqIDYwICogaVxyXG4gICAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoMSAqIE1hdGguY29zKGFuZ2xlX3JhZCksIDEgKiBNYXRoLnNpbihhbmdsZV9yYWQpKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZW5TaGFwZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XHJcbiAgICB0aGlzLnNoYXBlLm1vdmVUbyh0aGlzLnZlcnRpY2VzWzBdLngsIHRoaXMudmVydGljZXNbMF0ueSk7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDY7IGkrKykgdGhpcy5zaGFwZS5saW5lVG8odGhpcy52ZXJ0aWNlc1tpXS54LCB0aGlzLnZlcnRpY2VzW2ldLnkpO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8odGhpcy52ZXJ0aWNlc1swXS54LCB0aGlzLnZlcnRpY2VzWzBdLnkpO1xyXG4gIH0sXHJcbiAgZ2VuR2VvbWV0cnk6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5nZW9tZXRyeVNldHRpbmdzID0ge1xyXG4gICAgICBkZXB0aDogMyxcclxuICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcclxuICAgICAgYmV2ZWxTZWdtZW50czogMSxcclxuICAgICAgc3RlcHM6IDEsXHJcbiAgICAgIGJldmVsU2l6ZTogMSAvIDIwLFxyXG4gICAgICBiZXZlbFRoaWNrbmVzczogMSAvIDIwXHJcbiAgICB9O1xyXG4gICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBUSFJFRS5FeHRydWRlR2VvbWV0cnkodGhpcy5zaGFwZSwgdGhpcy5nZW9tZXRyeVNldHRpbmdzKTtcclxuICB9LFxyXG4gIGdlbk1hdGVyaWFsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLm1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe2NvbG9yOiBuZXcgVEhSRUUuQ29sb3IoJ3JlZCcpfSk7XHJcbiAgfSxcclxuICBnZW5NZXNoOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubWVzaCA9ICBuZXcgVEhSRUUuTWVzaCh0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsKTtcclxuICAgIHRoaXMubWVzaC5yb3RhdGVPbkF4aXMobmV3IFRIUkVFLlZlY3RvcjMoLTEsIDAsIDApLCBNYXRoLlBJIC8gMik7XHJcbiAgICB0aGlzLmVsLnNldE9iamVjdDNEKCdtZXNoJywgdGhpcy5tZXNoKTtcclxuICB9XHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnYW5pbWF0ZS1yb3RhdGlvbicsIHtcclxuICBtdWx0aXBsZTogdHJ1ZSxcclxuICBzY2hlbWE6IHtcclxuICAgIHNwZWVkOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDEwfSxcclxuICAgIGF4ZToge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAneCd9XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcbiAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH0sXHJcbiAgdGljazogZnVuY3Rpb24gKGVsYXBzZWQsIGR0KSB7XHJcbiAgICB0aGlzLmVsLm9iamVjdDNELnJvdGF0aW9uW3RoaXMuZGF0YS5heGVdID0gVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKGVsYXBzZWQgLyB0aGlzLmRhdGEuc3BlZWQpO1xyXG4gIH1cclxufSkiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2N1cnNvci1saXN0ZW5lcicsIHtcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXZ0KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdlbWl0LXdoZW4tbmVhcicsIHtcclxuICBzY2hlbWE6IHtcclxuICAgIHRhcmdldDoge3R5cGU6ICdzZWxlY3RvcicsIGRlZmF1bHQ6ICcjY2FtZXJhLXJpZyd9LFxyXG4gICAgZGlzdGFuY2U6IHt0eXBlOiAnbnVtYmVyJywgZGVmYXVsdDogMX0sXHJcbiAgICBldmVudDoge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAnY2xpY2snfSxcclxuICAgIGV2ZW50RmFyOiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICd1bmNsaWNrJ30sXHJcbiAgICB0aHJvdHRsZToge3R5cGU6ICdudW1iZXInLCBkZWZhdWx0OiAxMDB9LFxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy50aWNrID0gQUZSQU1FLnV0aWxzLnRocm90dGxlVGljayh0aGlzLmNoZWNrRGlzdCwgdGhpcy5kYXRhLnRocm90dGxlLCB0aGlzKTtcclxuICAgIHRoaXMuZW1pdGluZyA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgY2hlY2tEaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgbXlQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcclxuICAgIGxldCB0YXJnZXRQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcclxuICAgIHRoaXMuZWwub2JqZWN0M0QuZ2V0V29ybGRQb3NpdGlvbihteVBvcyk7XHJcbiAgICB0aGlzLmRhdGEudGFyZ2V0Lm9iamVjdDNELmdldFdvcmxkUG9zaXRpb24odGFyZ2V0UG9zKTtcclxuICAgIGNvbnN0IGRpc3RhbmNlVG8gPSBteVBvcy5kaXN0YW5jZVRvKHRhcmdldFBvcyk7XHJcbiAgICBpZiAoZGlzdGFuY2VUbyA8PSB0aGlzLmRhdGEuZGlzdGFuY2UpIHtcclxuICAgICAgaWYgKHRoaXMuZW1pdGluZykgcmV0dXJuO1xyXG4gICAgICB0aGlzLmVtaXRpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmVsLmVtaXQodGhpcy5kYXRhLmV2ZW50LCB7Y29sbGlkaW5nRW50aXR5OiB0aGlzLmRhdGEudGFyZ2V0fSwgZmFsc2UpO1xyXG4gICAgICB0aGlzLmRhdGEudGFyZ2V0LmVtaXQodGhpcy5kYXRhLmV2ZW50LCB7Y29sbGlkaW5nRW50aXR5OiB0aGlzLmVsfSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLmVtaXRpbmcpIHJldHVybjtcclxuICAgICAgdGhpcy5lbC5lbWl0KHRoaXMuZGF0YS5ldmVudEZhciwge2NvbGxpZGluZ0VudGl0eTogdGhpcy5kYXRhLnRhcmdldH0sIGZhbHNlKTtcclxuICAgICAgdGhpcy5kYXRhLnRhcmdldC5lbWl0KHRoaXMuZGF0YS5ldmVudEZhciwge2NvbGxpZGluZ0VudGl0eTogdGhpcy5lbH0sIGZhbHNlKTtcclxuICAgICAgdGhpcy5lbWl0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdob3Zlci1oaWdobGlnaHRlcicsIHtcclxuICBzY2hlbWE6IHtcclxuICAgIGNvbG9yOiB7dHlwZTogJ2NvbG9yJywgZGVmYXVsdDogJ3doaXRlJ31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzLmVsO1xyXG4gICAgdGhpcy5oYW5kbGVyT25FbnRlciA9IGV2dCA9PiB0aGlzLm9uRW50ZXIoZXZ0KTtcclxuICAgIHRoaXMuaGFuZGxlck9uTGVhdmUgPSBldnQgPT4gdGhpcy5vbkxlYXZlKGV2dCk7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5oYW5kbGVyT25FbnRlcik7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5oYW5kbGVyT25MZWF2ZSk7XHJcbiAgfSxcclxuICBvbkVudGVyOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICBsZXQgY3Vyc29yID0gZXZ0LmRldGFpbC5jdXJzb3JFbDtcclxuICAgIHRoaXMuc2F2ZWRDb2xvciA9IGN1cnNvci5nZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiKS5jb2xvcjtcclxuICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiLCBcImNvbG9yXCIsIHRoaXMuZGF0YS5jb2xvcik7XHJcbiAgfSxcclxuICBvbkxlYXZlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICBsZXQgY3Vyc29yID0gZXZ0LmRldGFpbC5jdXJzb3JFbDtcclxuICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiLCBcImNvbG9yXCIsIHRoaXMuc2F2ZWRDb2xvcik7XHJcbiAgfSxcclxuICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzLmVsO1xyXG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuaGFuZGxlck9uRW50ZXIpO1xyXG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuaGFuZGxlck9uTGVhdmUpO1xyXG4gIH1cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyUHJpbWl0aXZlKCdpbS1ib3gnLCB7XHJcbiAgZGVmYXVsdENvbXBvbmVudHM6IHtcclxuICAgICdpbWJveCc6IHt9XHJcbiAgfSxcclxuICBtYXBwaW5nczoge1xyXG4gICAgc2l6ZTogJ2ltYm94LnNpemUnXHJcbiAgfVxyXG59KTtcclxuXHJcbkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnaW1ib3gnLCB7XHJcbiAgc2NoZW1hOiB7XHJcbiAgICBzaXplOiB7dHlwZTogXCJudW1iZXJcIiwgZGVmYXVsdDogMX1cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2VuVmVydGljZXMoKTtcclxuICAgIHRoaXMuZ2VuU2hhcGUoKTtcclxuICB9LFxyXG4gIGdlblZlcnRpY2VzOiBmdW5jdGlvbiAgKCkge1xyXG4gICAgY29uc3QgaGFsZiA9IHRoaXMuZGF0YS5zaXplIC8yO1xyXG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IyKC1oYWxmLCBoYWxmKSk7XHJcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoaGFsZiwgaGFsZikpO1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IyKGhhbGYsIC1oYWxmKSk7XHJcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoLWhhbGYsIC1oYWxmKSk7XHJcbiAgfSxcclxuICBnZW5TaGFwZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xyXG5cclxuICAgIGNvbnN0IGhnID0gdGhpcy52ZXJ0aWNlc1swXTtcclxuICAgIHRoaXMuc2hhcGUubW92ZVRvKGhnLngsIGhnLnkpO1xyXG5cclxuICAgIGNvbnN0IGhkID0gdGhpcy52ZXJ0aWNlc1sxXTtcclxuICAgIHRoaXMuc2hhcGUubGluZVRvKGhkLngsIGhkLnkpO1xyXG5cclxuICAgIGNvbnN0IGJkID0gdGhpcy52ZXJ0aWNlc1syXTtcclxuICAgIHRoaXMuc2hhcGUubGluZVRvKGJkLngsIGJkLnkpO1xyXG5cclxuICAgIGNvbnN0IGJsID0gdGhpcy52ZXJ0aWNlc1szXTtcclxuICAgIHRoaXMuc2hhcGUubGluZVRvKGJsLngsIGJsLnkpO1xyXG5cclxuICAgIHRoaXMuc2hhcGUubGluZVRvKGhnLngsIGhnLnkpO1xyXG5cclxuICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlNoYXBlR2VvbWV0cnkoIHRoaXMuc2hhcGUgKTtcclxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAweDAwZmYwMCB9ICk7XHJcbiAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApIDtcclxuICAgIHRoaXMuZWwuc2V0T2JqZWN0M0QoJ21lc2gnLCBtZXNoKTtcclxuXHJcbiAgfVxyXG5cclxuXHJcblxyXG59KVxyXG4iLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2xpc3Rlbi10bycsIHtcclxuICBtdWx0aXBsZTogdHJ1ZSxcclxuICBzY2hlbWE6IHtcclxuICAgIGV2dDoge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAnY2xpY2snfSxcclxuICAgIHRhcmdldDoge3R5cGU6ICdzZWxlY3Rvcid9LFxyXG4gICAgZW1pdDoge3R5cGU6ICdzdHJpbmcnfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5kYXRhLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZGF0YS5ldnQsIGV2dCA9PiB7XHJcbiAgICAgIHRoaXMuZWwuZW1pdCh0aGlzLmRhdGEuZW1pdCk7XHJcbiAgICB9KVxyXG4gIH1cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdvbi1ldmVudC1zZXQnLCB7XHJcbiAgbXVsdGlwbGU6IHRydWUsXHJcblxyXG4gIHNjaGVtYToge1xyXG4gICAgZXZlbnQ6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ2NsaWNrJ30sXHJcbiAgICBhdHRyaWJ1dGU6IHt0eXBlOiAnc3RyaW5nJ30sXHJcbiAgICB2YWx1ZToge3R5cGU6ICdzdHJpbmcnfVxyXG4gIH0sXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fb25FdmVudCA9IHRoaXMuX29uRXZlbnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEuZXZlbnQsIHRoaXMuX29uRXZlbnQpO1xyXG4gIH0sXHJcblxyXG4gIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5kYXRhLmV2ZW50LCB0aGlzLl9vbkV2ZW50KTtcclxuICB9LFxyXG5cclxuICBfb25FdmVudDogZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICBBRlJBTUUudXRpbHMuZW50aXR5LnNldENvbXBvbmVudFByb3BlcnR5KHRoaXMuZWwsIHRoaXMuZGF0YS5hdHRyaWJ1dGUsIHRoaXMuZGF0YS52YWx1ZSk7XHJcbiAgfVxyXG5cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCd0b2dnbGUtZXZlbnRzJywge1xyXG4gIG11bHRpcGxlOiB0cnVlLFxyXG4gIHNjaGVtYToge1xyXG4gICAgc291cmNlRXZ0OiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICdjbGljayd9LFxyXG4gICAgZXZ0MToge3R5cGU6ICdzdHJpbmcnfSxcclxuICAgIGV2dDI6IHt0eXBlOiAnc3RyaW5nJ31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSAwO1xyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZGF0YS5zb3VyY2VFdnQsIGV2dCA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXRlID09IDApIHtcclxuICAgICAgICB0aGlzLmVsLmVtaXQodGhpcy5kYXRhLmV2dDEpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZWwuZW1pdCh0aGlzLmRhdGEuZXZ0Mik7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSk7IiwidmFyIG1hcCA9IHtcblx0XCIuL2EtdGVzdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYS10ZXN0LmpzXCIsXG5cdFwiLi9hbmltYXRlLXJvdGF0aW9uLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLXJvdGF0aW9uLmpzXCIsXG5cdFwiLi9jdXJzb3ItbGlzdGVuZXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2N1cnNvci1saXN0ZW5lci5qc1wiLFxuXHRcIi4vZW1pdC13aGVuLW5lYXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2VtaXQtd2hlbi1uZWFyLmpzXCIsXG5cdFwiLi9ob3Zlci1oaWdobGlnaHRlci5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvaG92ZXItaGlnaGxpZ2h0ZXIuanNcIixcblx0XCIuL2ltLWJveC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvaW0tYm94LmpzXCIsXG5cdFwiLi9saXN0ZW4tdG8uanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2xpc3Rlbi10by5qc1wiLFxuXHRcIi4vb24tZXZlbnQtc2V0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9vbi1ldmVudC1zZXQuanNcIixcblx0XCIuL3RvZ2dsZS1ldmVudHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS1ldmVudHMuanNcIixcblx0XCJjb21wb25lbnRzL2EtdGVzdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYS10ZXN0LmpzXCIsXG5cdFwiY29tcG9uZW50cy9hbmltYXRlLXJvdGF0aW9uLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLXJvdGF0aW9uLmpzXCIsXG5cdFwiY29tcG9uZW50cy9jdXJzb3ItbGlzdGVuZXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2N1cnNvci1saXN0ZW5lci5qc1wiLFxuXHRcImNvbXBvbmVudHMvZW1pdC13aGVuLW5lYXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2VtaXQtd2hlbi1uZWFyLmpzXCIsXG5cdFwiY29tcG9uZW50cy9ob3Zlci1oaWdobGlnaHRlci5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvaG92ZXItaGlnaGxpZ2h0ZXIuanNcIixcblx0XCJjb21wb25lbnRzL2ltLWJveC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvaW0tYm94LmpzXCIsXG5cdFwiY29tcG9uZW50cy9saXN0ZW4tdG8uanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2xpc3Rlbi10by5qc1wiLFxuXHRcImNvbXBvbmVudHMvb24tZXZlbnQtc2V0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9vbi1ldmVudC1zZXQuanNcIixcblx0XCJjb21wb25lbnRzL3RvZ2dsZS1ldmVudHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS1ldmVudHMuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvY29tcG9uZW50cyBzeW5jIFxcXFwuanMkXCI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJcclxuZnVuY3Rpb24gaW1wb3J0QWxsKHIpIHtcclxuICByLmtleXMoKS5mb3JFYWNoKHIpO1xyXG59XHJcblxyXG5pbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMnLCBmYWxzZSwgL1xcLmpzJC8pKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=