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

/***/ "./src/components/animate-hit.js":
/*!***************************************!*\
  !*** ./src/components/animate-hit.js ***!
  \***************************************/
/***/ (() => {

AFRAME.registerComponent('animate-hit', {
    multiple: true,
    init: function () {
      console.log("hit");
      // this.el.setAttribute('animation', "property: rotation.y; to: 90; dur: 2000; easing: linear; loop: true");
      
    },
    remove: function () {
  
    },
    update: function () {
  
    },
    tick: function (elapsed, dt) {
        console.log("hit tick");



    }
  })

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

/***/ "./src/components/animate-scale.js":
/*!*****************************************!*\
  !*** ./src/components/animate-scale.js ***!
  \*****************************************/
/***/ (() => {

AFRAME.registerComponent('animate-scale', {
    multiple: true,
    schema: {
      speed: {type: 'number', default: 100}
    },
    init: function () {
      

    },
    remove: function () {
  
    },
    update: function () {
  
    },
    tick: function (elapsed, dt) {
        let scale = (Math.sin(elapsed/this.data.speed)*2);

        this.el.object3D.scale.set(scale,scale,scale);

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
    size: 'imbox.size',
    color: 'imbox.color',
  }
});

AFRAME.registerComponent('imbox', {
  schema: {
    size: {type: "number", default: 1},
    color: {type: "color", default: 'black'}
  },
  init: function () {
    this.genVertices();
    this.genShape();
    this.genGeometry();
    this.genMaterial();
    this.genMesh();
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



  },

  genGeometry: function () {

    const extrudeSettings = {
      steps: 1,
      depth: this.data.size,
      bevelEnabled: false,
    };

    this.geometry = new THREE.ExtrudeGeometry( this.shape, extrudeSettings );
  },

  genMaterial: function () {
    this.material = new THREE.MeshLambertMaterial({
       color: new THREE.Color(this.data.color)
    } );
  },

  genMesh: function () {
    this.mesh = new THREE.Mesh( this.geometry, this.material ) ;
    this.el.setObject3D('mesh', this.mesh);
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

/***/ "./src/components/when-hit.js":
/*!************************************!*\
  !*** ./src/components/when-hit.js ***!
  \************************************/
/***/ (() => {

AFRAME.registerComponent('when-hit', {
    init: function () {
      console.log("init when it")
      this.el.addEventListener('click', evt => {
        // this.el.setAttribute('animate-hit',"");
        this.el.emit(`animTarget`, null, false);
     });



    },
    
    tick: function (elapsed, dt) {

  


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
	"./animate-hit.js": "./src/components/animate-hit.js",
	"./animate-rotation.js": "./src/components/animate-rotation.js",
	"./animate-scale.js": "./src/components/animate-scale.js",
	"./cursor-listener.js": "./src/components/cursor-listener.js",
	"./emit-when-near.js": "./src/components/emit-when-near.js",
	"./hover-highlighter.js": "./src/components/hover-highlighter.js",
	"./im-box.js": "./src/components/im-box.js",
	"./listen-to.js": "./src/components/listen-to.js",
	"./on-event-set.js": "./src/components/on-event-set.js",
	"./toggle-events.js": "./src/components/toggle-events.js",
	"./when-hit.js": "./src/components/when-hit.js",
	"components/a-test.js": "./src/components/a-test.js",
	"components/animate-hit.js": "./src/components/animate-hit.js",
	"components/animate-rotation.js": "./src/components/animate-rotation.js",
	"components/animate-scale.js": "./src/components/animate-scale.js",
	"components/cursor-listener.js": "./src/components/cursor-listener.js",
	"components/emit-when-near.js": "./src/components/emit-when-near.js",
	"components/hover-highlighter.js": "./src/components/hover-highlighter.js",
	"components/im-box.js": "./src/components/im-box.js",
	"components/listen-to.js": "./src/components/listen-to.js",
	"components/on-event-set.js": "./src/components/on-event-set.js",
	"components/toggle-events.js": "./src/components/toggle-events.js",
	"components/when-hit.js": "./src/components/when-hit.js"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBOzs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsbURBQStDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2EtdGVzdC5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtaGl0LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1yb3RhdGlvbi5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtc2NhbGUuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9jdXJzb3ItbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9lbWl0LXdoZW4tbmVhci5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2hvdmVyLWhpZ2hsaWdodGVyLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvaW0tYm94LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvbGlzdGVuLXRvLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvb24tZXZlbnQtc2V0LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvdG9nZ2xlLWV2ZW50cy5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL3doZW4taGl0LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHN8c3luY3xub25yZWN1cnNpdmV8Ly5qcyQiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIkFGUkFNRS5yZWdpc3RlclByaW1pdGl2ZSgnYS10ZXN0Jywge1xyXG4gIGRlZmF1bHRDb21wb25lbnRzOiB7XHJcbiAgICAnbXl0ZXN0Jzoge31cclxuICB9LFxyXG4gIG1hcHBpbmdzOiB7XHJcblxyXG4gIH1cclxufSk7XHJcblxyXG5BRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ215dGVzdCcsIHtcclxuICBzY2hlbWE6IHtcclxuXHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdlbkFsbCgpO1xyXG4gIH0sXHJcbiAgZ2VuQWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdlblZlcnRpY2VzKCk7XHJcbiAgICB0aGlzLmdlblNoYXBlKCk7XHJcbiAgICB0aGlzLmdlbkdlb21ldHJ5KCk7XHJcbiAgICB0aGlzLmdlbk1hdGVyaWFsKCk7XHJcbiAgICB0aGlzLmdlbk1lc2goKTtcclxuICB9LFxyXG4gIGdlblZlcnRpY2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKyApIHtcclxuICAgICAgbGV0IGFuZ2xlX3JhZCA9IDEuMDQ3MTk3NTUxMTk2NTk3NiAqIGk7IC8vIChNYXRoLlBJIC8gMTgwKSAqIDYwICogaVxyXG4gICAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoMSAqIE1hdGguY29zKGFuZ2xlX3JhZCksIDEgKiBNYXRoLnNpbihhbmdsZV9yYWQpKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZW5TaGFwZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XHJcbiAgICB0aGlzLnNoYXBlLm1vdmVUbyh0aGlzLnZlcnRpY2VzWzBdLngsIHRoaXMudmVydGljZXNbMF0ueSk7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDY7IGkrKykgdGhpcy5zaGFwZS5saW5lVG8odGhpcy52ZXJ0aWNlc1tpXS54LCB0aGlzLnZlcnRpY2VzW2ldLnkpO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8odGhpcy52ZXJ0aWNlc1swXS54LCB0aGlzLnZlcnRpY2VzWzBdLnkpO1xyXG4gIH0sXHJcbiAgZ2VuR2VvbWV0cnk6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5nZW9tZXRyeVNldHRpbmdzID0ge1xyXG4gICAgICBkZXB0aDogMyxcclxuICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcclxuICAgICAgYmV2ZWxTZWdtZW50czogMSxcclxuICAgICAgc3RlcHM6IDEsXHJcbiAgICAgIGJldmVsU2l6ZTogMSAvIDIwLFxyXG4gICAgICBiZXZlbFRoaWNrbmVzczogMSAvIDIwXHJcbiAgICB9O1xyXG4gICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBUSFJFRS5FeHRydWRlR2VvbWV0cnkodGhpcy5zaGFwZSwgdGhpcy5nZW9tZXRyeVNldHRpbmdzKTtcclxuICB9LFxyXG4gIGdlbk1hdGVyaWFsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLm1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe2NvbG9yOiBuZXcgVEhSRUUuQ29sb3IoJ3JlZCcpfSk7XHJcbiAgfSxcclxuICBnZW5NZXNoOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubWVzaCA9ICBuZXcgVEhSRUUuTWVzaCh0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsKTtcclxuICAgIHRoaXMubWVzaC5yb3RhdGVPbkF4aXMobmV3IFRIUkVFLlZlY3RvcjMoLTEsIDAsIDApLCBNYXRoLlBJIC8gMik7XHJcbiAgICB0aGlzLmVsLnNldE9iamVjdDNEKCdtZXNoJywgdGhpcy5tZXNoKTtcclxuICB9XHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnYW5pbWF0ZS1oaXQnLCB7XHJcbiAgICBtdWx0aXBsZTogdHJ1ZSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJoaXRcIik7XHJcbiAgICAgIC8vIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdhbmltYXRpb24nLCBcInByb3BlcnR5OiByb3RhdGlvbi55OyB0bzogOTA7IGR1cjogMjAwMDsgZWFzaW5nOiBsaW5lYXI7IGxvb3A6IHRydWVcIik7XHJcbiAgICAgIFxyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG4gIFxyXG4gICAgfSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gIFxyXG4gICAgfSxcclxuICAgIHRpY2s6IGZ1bmN0aW9uIChlbGFwc2VkLCBkdCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGl0IHRpY2tcIik7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcbiAgfSkiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2FuaW1hdGUtcm90YXRpb24nLCB7XHJcbiAgbXVsdGlwbGU6IHRydWUsXHJcbiAgc2NoZW1hOiB7XHJcbiAgICBzcGVlZDoge3R5cGU6ICdudW1iZXInLCBkZWZhdWx0OiAxMH0sXHJcbiAgICBheGU6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ3gnfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG4gIHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICB9LFxyXG4gIHRpY2s6IGZ1bmN0aW9uIChlbGFwc2VkLCBkdCkge1xyXG4gICAgdGhpcy5lbC5vYmplY3QzRC5yb3RhdGlvblt0aGlzLmRhdGEuYXhlXSA9IFRIUkVFLk1hdGhVdGlscy5kZWdUb1JhZChlbGFwc2VkIC8gdGhpcy5kYXRhLnNwZWVkKTtcclxuICB9XHJcbn0pIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdhbmltYXRlLXNjYWxlJywge1xyXG4gICAgbXVsdGlwbGU6IHRydWUsXHJcbiAgICBzY2hlbWE6IHtcclxuICAgICAgc3BlZWQ6IHt0eXBlOiAnbnVtYmVyJywgZGVmYXVsdDogMTAwfVxyXG4gICAgfSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgXHJcblxyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG4gIFxyXG4gICAgfSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gIFxyXG4gICAgfSxcclxuICAgIHRpY2s6IGZ1bmN0aW9uIChlbGFwc2VkLCBkdCkge1xyXG4gICAgICAgIGxldCBzY2FsZSA9IChNYXRoLnNpbihlbGFwc2VkL3RoaXMuZGF0YS5zcGVlZCkqMik7XHJcblxyXG4gICAgICAgIHRoaXMuZWwub2JqZWN0M0Quc2NhbGUuc2V0KHNjYWxlLHNjYWxlLHNjYWxlKTtcclxuXHJcbiAgICB9XHJcbiAgfSkiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2N1cnNvci1saXN0ZW5lcicsIHtcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXZ0KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdlbWl0LXdoZW4tbmVhcicsIHtcclxuICBzY2hlbWE6IHtcclxuICAgIHRhcmdldDoge3R5cGU6ICdzZWxlY3RvcicsIGRlZmF1bHQ6ICcjY2FtZXJhLXJpZyd9LFxyXG4gICAgZGlzdGFuY2U6IHt0eXBlOiAnbnVtYmVyJywgZGVmYXVsdDogMX0sXHJcbiAgICBldmVudDoge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAnY2xpY2snfSxcclxuICAgIGV2ZW50RmFyOiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICd1bmNsaWNrJ30sXHJcbiAgICB0aHJvdHRsZToge3R5cGU6ICdudW1iZXInLCBkZWZhdWx0OiAxMDB9LFxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy50aWNrID0gQUZSQU1FLnV0aWxzLnRocm90dGxlVGljayh0aGlzLmNoZWNrRGlzdCwgdGhpcy5kYXRhLnRocm90dGxlLCB0aGlzKTtcclxuICAgIHRoaXMuZW1pdGluZyA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgY2hlY2tEaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgbXlQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcclxuICAgIGxldCB0YXJnZXRQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcclxuICAgIHRoaXMuZWwub2JqZWN0M0QuZ2V0V29ybGRQb3NpdGlvbihteVBvcyk7XHJcbiAgICB0aGlzLmRhdGEudGFyZ2V0Lm9iamVjdDNELmdldFdvcmxkUG9zaXRpb24odGFyZ2V0UG9zKTtcclxuICAgIGNvbnN0IGRpc3RhbmNlVG8gPSBteVBvcy5kaXN0YW5jZVRvKHRhcmdldFBvcyk7XHJcbiAgICBpZiAoZGlzdGFuY2VUbyA8PSB0aGlzLmRhdGEuZGlzdGFuY2UpIHtcclxuICAgICAgaWYgKHRoaXMuZW1pdGluZykgcmV0dXJuO1xyXG4gICAgICB0aGlzLmVtaXRpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmVsLmVtaXQodGhpcy5kYXRhLmV2ZW50LCB7Y29sbGlkaW5nRW50aXR5OiB0aGlzLmRhdGEudGFyZ2V0fSwgZmFsc2UpO1xyXG4gICAgICB0aGlzLmRhdGEudGFyZ2V0LmVtaXQodGhpcy5kYXRhLmV2ZW50LCB7Y29sbGlkaW5nRW50aXR5OiB0aGlzLmVsfSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLmVtaXRpbmcpIHJldHVybjtcclxuICAgICAgdGhpcy5lbC5lbWl0KHRoaXMuZGF0YS5ldmVudEZhciwge2NvbGxpZGluZ0VudGl0eTogdGhpcy5kYXRhLnRhcmdldH0sIGZhbHNlKTtcclxuICAgICAgdGhpcy5kYXRhLnRhcmdldC5lbWl0KHRoaXMuZGF0YS5ldmVudEZhciwge2NvbGxpZGluZ0VudGl0eTogdGhpcy5lbH0sIGZhbHNlKTtcclxuICAgICAgdGhpcy5lbWl0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdob3Zlci1oaWdobGlnaHRlcicsIHtcclxuICBzY2hlbWE6IHtcclxuICAgIGNvbG9yOiB7dHlwZTogJ2NvbG9yJywgZGVmYXVsdDogJ3doaXRlJ31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzLmVsO1xyXG4gICAgdGhpcy5oYW5kbGVyT25FbnRlciA9IGV2dCA9PiB0aGlzLm9uRW50ZXIoZXZ0KTtcclxuICAgIHRoaXMuaGFuZGxlck9uTGVhdmUgPSBldnQgPT4gdGhpcy5vbkxlYXZlKGV2dCk7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5oYW5kbGVyT25FbnRlcik7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5oYW5kbGVyT25MZWF2ZSk7XHJcbiAgfSxcclxuICBvbkVudGVyOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICBsZXQgY3Vyc29yID0gZXZ0LmRldGFpbC5jdXJzb3JFbDtcclxuICAgIHRoaXMuc2F2ZWRDb2xvciA9IGN1cnNvci5nZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiKS5jb2xvcjtcclxuICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiLCBcImNvbG9yXCIsIHRoaXMuZGF0YS5jb2xvcik7XHJcbiAgfSxcclxuICBvbkxlYXZlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICBsZXQgY3Vyc29yID0gZXZ0LmRldGFpbC5jdXJzb3JFbDtcclxuICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiLCBcImNvbG9yXCIsIHRoaXMuc2F2ZWRDb2xvcik7XHJcbiAgfSxcclxuICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzLmVsO1xyXG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuaGFuZGxlck9uRW50ZXIpO1xyXG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuaGFuZGxlck9uTGVhdmUpO1xyXG4gIH1cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyUHJpbWl0aXZlKCdpbS1ib3gnLCB7XHJcbiAgZGVmYXVsdENvbXBvbmVudHM6IHtcclxuICAgICdpbWJveCc6IHt9XHJcbiAgfSxcclxuICBtYXBwaW5nczoge1xyXG4gICAgc2l6ZTogJ2ltYm94LnNpemUnLFxyXG4gICAgY29sb3I6ICdpbWJveC5jb2xvcicsXHJcbiAgfVxyXG59KTtcclxuXHJcbkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnaW1ib3gnLCB7XHJcbiAgc2NoZW1hOiB7XHJcbiAgICBzaXplOiB7dHlwZTogXCJudW1iZXJcIiwgZGVmYXVsdDogMX0sXHJcbiAgICBjb2xvcjoge3R5cGU6IFwiY29sb3JcIiwgZGVmYXVsdDogJ2JsYWNrJ31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2VuVmVydGljZXMoKTtcclxuICAgIHRoaXMuZ2VuU2hhcGUoKTtcclxuICAgIHRoaXMuZ2VuR2VvbWV0cnkoKTtcclxuICAgIHRoaXMuZ2VuTWF0ZXJpYWwoKTtcclxuICAgIHRoaXMuZ2VuTWVzaCgpO1xyXG4gIH0sXHJcbiAgZ2VuVmVydGljZXM6IGZ1bmN0aW9uICAoKSB7XHJcbiAgICBjb25zdCBoYWxmID0gdGhpcy5kYXRhLnNpemUgLzI7XHJcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XHJcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoLWhhbGYsIGhhbGYpKTtcclxuICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMihoYWxmLCBoYWxmKSk7XHJcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoaGFsZiwgLWhhbGYpKTtcclxuICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMigtaGFsZiwgLWhhbGYpKTtcclxuICB9LFxyXG4gIGdlblNoYXBlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XHJcblxyXG4gICAgY29uc3QgaGcgPSB0aGlzLnZlcnRpY2VzWzBdO1xyXG4gICAgdGhpcy5zaGFwZS5tb3ZlVG8oaGcueCwgaGcueSk7XHJcblxyXG4gICAgY29uc3QgaGQgPSB0aGlzLnZlcnRpY2VzWzFdO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oaGQueCwgaGQueSk7XHJcblxyXG4gICAgY29uc3QgYmQgPSB0aGlzLnZlcnRpY2VzWzJdO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oYmQueCwgYmQueSk7XHJcblxyXG4gICAgY29uc3QgYmwgPSB0aGlzLnZlcnRpY2VzWzNdO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oYmwueCwgYmwueSk7XHJcblxyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oaGcueCwgaGcueSk7XHJcblxyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgZ2VuR2VvbWV0cnk6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBjb25zdCBleHRydWRlU2V0dGluZ3MgPSB7XHJcbiAgICAgIHN0ZXBzOiAxLFxyXG4gICAgICBkZXB0aDogdGhpcy5kYXRhLnNpemUsXHJcbiAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgVEhSRUUuRXh0cnVkZUdlb21ldHJ5KCB0aGlzLnNoYXBlLCBleHRydWRlU2V0dGluZ3MgKTtcclxuICB9LFxyXG5cclxuICBnZW5NYXRlcmlhbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcclxuICAgICAgIGNvbG9yOiBuZXcgVEhSRUUuQ29sb3IodGhpcy5kYXRhLmNvbG9yKVxyXG4gICAgfSApO1xyXG4gIH0sXHJcblxyXG4gIGdlbk1lc2g6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubWVzaCA9IG5ldyBUSFJFRS5NZXNoKCB0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsICkgO1xyXG4gICAgdGhpcy5lbC5zZXRPYmplY3QzRCgnbWVzaCcsIHRoaXMubWVzaCk7XHJcbiAgfVxyXG5cclxufSlcclxuIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdsaXN0ZW4tdG8nLCB7XHJcbiAgbXVsdGlwbGU6IHRydWUsXHJcbiAgc2NoZW1hOiB7XHJcbiAgICBldnQ6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ2NsaWNrJ30sXHJcbiAgICB0YXJnZXQ6IHt0eXBlOiAnc2VsZWN0b3InfSxcclxuICAgIGVtaXQ6IHt0eXBlOiAnc3RyaW5nJ31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZGF0YS50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEuZXZ0LCBldnQgPT4ge1xyXG4gICAgICB0aGlzLmVsLmVtaXQodGhpcy5kYXRhLmVtaXQpO1xyXG4gICAgfSlcclxuICB9XHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnb24tZXZlbnQtc2V0Jywge1xyXG4gIG11bHRpcGxlOiB0cnVlLFxyXG5cclxuICBzY2hlbWE6IHtcclxuICAgIGV2ZW50OiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICdjbGljayd9LFxyXG4gICAgYXR0cmlidXRlOiB7dHlwZTogJ3N0cmluZyd9LFxyXG4gICAgdmFsdWU6IHt0eXBlOiAnc3RyaW5nJ31cclxuICB9LFxyXG5cclxuICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX29uRXZlbnQgPSB0aGlzLl9vbkV2ZW50LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5kYXRhLmV2ZW50LCB0aGlzLl9vbkV2ZW50KTtcclxuICB9LFxyXG5cclxuICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZGF0YS5ldmVudCwgdGhpcy5fb25FdmVudCk7XHJcbiAgfSxcclxuXHJcbiAgX29uRXZlbnQ6IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgQUZSQU1FLnV0aWxzLmVudGl0eS5zZXRDb21wb25lbnRQcm9wZXJ0eSh0aGlzLmVsLCB0aGlzLmRhdGEuYXR0cmlidXRlLCB0aGlzLmRhdGEudmFsdWUpO1xyXG4gIH1cclxuXHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgndG9nZ2xlLWV2ZW50cycsIHtcclxuICBtdWx0aXBsZTogdHJ1ZSxcclxuICBzY2hlbWE6IHtcclxuICAgIHNvdXJjZUV2dDoge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAnY2xpY2snfSxcclxuICAgIGV2dDE6IHt0eXBlOiAnc3RyaW5nJ30sXHJcbiAgICBldnQyOiB7dHlwZTogJ3N0cmluZyd9XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEuc291cmNlRXZ0LCBldnQgPT4ge1xyXG4gICAgICBpZiAodGhpcy5zdGF0ZSA9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5lbC5lbWl0KHRoaXMuZGF0YS5ldnQxKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVsLmVtaXQodGhpcy5kYXRhLmV2dDIpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnd2hlbi1oaXQnLCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaW5pdCB3aGVuIGl0XCIpXHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICAgIC8vIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdhbmltYXRlLWhpdCcsXCJcIik7XHJcbiAgICAgICAgdGhpcy5lbC5lbWl0KGBhbmltVGFyZ2V0YCwgbnVsbCwgZmFsc2UpO1xyXG4gICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgdGljazogZnVuY3Rpb24gKGVsYXBzZWQsIGR0KSB7XHJcblxyXG4gIFxyXG5cclxuXHJcbiAgfVxyXG4gIH0pOyIsInZhciBtYXAgPSB7XG5cdFwiLi9hLXRlc3QuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2EtdGVzdC5qc1wiLFxuXHRcIi4vYW5pbWF0ZS1oaXQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtaGl0LmpzXCIsXG5cdFwiLi9hbmltYXRlLXJvdGF0aW9uLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLXJvdGF0aW9uLmpzXCIsXG5cdFwiLi9hbmltYXRlLXNjYWxlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLXNjYWxlLmpzXCIsXG5cdFwiLi9jdXJzb3ItbGlzdGVuZXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2N1cnNvci1saXN0ZW5lci5qc1wiLFxuXHRcIi4vZW1pdC13aGVuLW5lYXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2VtaXQtd2hlbi1uZWFyLmpzXCIsXG5cdFwiLi9ob3Zlci1oaWdobGlnaHRlci5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvaG92ZXItaGlnaGxpZ2h0ZXIuanNcIixcblx0XCIuL2ltLWJveC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvaW0tYm94LmpzXCIsXG5cdFwiLi9saXN0ZW4tdG8uanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2xpc3Rlbi10by5qc1wiLFxuXHRcIi4vb24tZXZlbnQtc2V0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9vbi1ldmVudC1zZXQuanNcIixcblx0XCIuL3RvZ2dsZS1ldmVudHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS1ldmVudHMuanNcIixcblx0XCIuL3doZW4taGl0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy93aGVuLWhpdC5qc1wiLFxuXHRcImNvbXBvbmVudHMvYS10ZXN0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hLXRlc3QuanNcIixcblx0XCJjb21wb25lbnRzL2FuaW1hdGUtaGl0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLWhpdC5qc1wiLFxuXHRcImNvbXBvbmVudHMvYW5pbWF0ZS1yb3RhdGlvbi5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1yb3RhdGlvbi5qc1wiLFxuXHRcImNvbXBvbmVudHMvYW5pbWF0ZS1zY2FsZS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1zY2FsZS5qc1wiLFxuXHRcImNvbXBvbmVudHMvY3Vyc29yLWxpc3RlbmVyLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9jdXJzb3ItbGlzdGVuZXIuanNcIixcblx0XCJjb21wb25lbnRzL2VtaXQtd2hlbi1uZWFyLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9lbWl0LXdoZW4tbmVhci5qc1wiLFxuXHRcImNvbXBvbmVudHMvaG92ZXItaGlnaGxpZ2h0ZXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2hvdmVyLWhpZ2hsaWdodGVyLmpzXCIsXG5cdFwiY29tcG9uZW50cy9pbS1ib3guanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2ltLWJveC5qc1wiLFxuXHRcImNvbXBvbmVudHMvbGlzdGVuLXRvLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9saXN0ZW4tdG8uanNcIixcblx0XCJjb21wb25lbnRzL29uLWV2ZW50LXNldC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvb24tZXZlbnQtc2V0LmpzXCIsXG5cdFwiY29tcG9uZW50cy90b2dnbGUtZXZlbnRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy90b2dnbGUtZXZlbnRzLmpzXCIsXG5cdFwiY29tcG9uZW50cy93aGVuLWhpdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvd2hlbi1oaXQuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvY29tcG9uZW50cyBzeW5jIFxcXFwuanMkXCI7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJcclxuZnVuY3Rpb24gaW1wb3J0QWxsKHIpIHtcclxuICByLmtleXMoKS5mb3JFYWNoKHIpO1xyXG59XHJcblxyXG5pbXBvcnRBbGwocmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMnLCBmYWxzZSwgL1xcLmpzJC8pKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=