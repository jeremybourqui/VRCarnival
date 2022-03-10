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

/***/ "./src/components/gun-flash.js":
/*!*************************************!*\
  !*** ./src/components/gun-flash.js ***!
  \*************************************/
/***/ (() => {

AFRAME.registerComponent('gun-flash', {
    init: function () {
      console.log("init gun flash")
      this.el.addEventListener('shoot', evt => {
        console.log("shoooted");
        this.el.setAttribute('light', {
          type: 'spot',
          angle: '45'
        });

        // this.el.removeAttribute('light');

     });



    },
    
    tick: function (elapsed, dt) {
  


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

/***/ "./src/components/on-shoot.js":
/*!************************************!*\
  !*** ./src/components/on-shoot.js ***!
  \************************************/
/***/ (() => {

AFRAME.registerComponent('on-shoot', {
    init: function () {
      console.log("init on shoot")
      this.el.addEventListener('click', evt => {
        this.el.emit(`shoot`, null, true);
        console.log("shoot");
        // this.el.setAttribute('light', {
        //   type: 'spot',
        //   angle: '45'
        // });

        // this.el.removeAttribute('light');

     });



    },
    
    tick: function (elapsed, dt) {
  


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
        console.log("evt shoot");
        
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
	"./gun-flash.js": "./src/components/gun-flash.js",
	"./hover-highlighter.js": "./src/components/hover-highlighter.js",
	"./im-box.js": "./src/components/im-box.js",
	"./listen-to.js": "./src/components/listen-to.js",
	"./on-event-set.js": "./src/components/on-event-set.js",
	"./on-shoot.js": "./src/components/on-shoot.js",
	"./toggle-events.js": "./src/components/toggle-events.js",
	"./when-hit.js": "./src/components/when-hit.js",
	"components/a-test.js": "./src/components/a-test.js",
	"components/animate-hit.js": "./src/components/animate-hit.js",
	"components/animate-rotation.js": "./src/components/animate-rotation.js",
	"components/animate-scale.js": "./src/components/animate-scale.js",
	"components/cursor-listener.js": "./src/components/cursor-listener.js",
	"components/emit-when-near.js": "./src/components/emit-when-near.js",
	"components/gun-flash.js": "./src/components/gun-flash.js",
	"components/hover-highlighter.js": "./src/components/hover-highlighter.js",
	"components/im-box.js": "./src/components/im-box.js",
	"components/listen-to.js": "./src/components/listen-to.js",
	"components/on-event-set.js": "./src/components/on-event-set.js",
	"components/on-shoot.js": "./src/components/on-shoot.js",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7Ozs7Ozs7O0FDcEJIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNqREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxtREFBK0MsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvYS10ZXN0LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1oaXQuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLXJvdGF0aW9uLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1zY2FsZS5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2N1cnNvci1saXN0ZW5lci5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2VtaXQtd2hlbi1uZWFyLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvZ3VuLWZsYXNoLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvaG92ZXItaGlnaGxpZ2h0ZXIuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9pbS1ib3guanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9saXN0ZW4tdG8uanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9vbi1ldmVudC1zZXQuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9vbi1zaG9vdC5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS1ldmVudHMuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy93aGVuLWhpdC5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzfHN5bmN8bm9ucmVjdXJzaXZlfC8uanMkIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJBRlJBTUUucmVnaXN0ZXJQcmltaXRpdmUoJ2EtdGVzdCcsIHtcclxuICBkZWZhdWx0Q29tcG9uZW50czoge1xyXG4gICAgJ215dGVzdCc6IHt9XHJcbiAgfSxcclxuICBtYXBwaW5nczoge1xyXG5cclxuICB9XHJcbn0pO1xyXG5cclxuQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdteXRlc3QnLCB7XHJcbiAgc2NoZW1hOiB7XHJcblxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nZW5BbGwoKTtcclxuICB9LFxyXG4gIGdlbkFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nZW5WZXJ0aWNlcygpO1xyXG4gICAgdGhpcy5nZW5TaGFwZSgpO1xyXG4gICAgdGhpcy5nZW5HZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5nZW5NYXRlcmlhbCgpO1xyXG4gICAgdGhpcy5nZW5NZXNoKCk7XHJcbiAgfSxcclxuICBnZW5WZXJ0aWNlczogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKysgKSB7XHJcbiAgICAgIGxldCBhbmdsZV9yYWQgPSAxLjA0NzE5NzU1MTE5NjU5NzYgKiBpOyAvLyAoTWF0aC5QSSAvIDE4MCkgKiA2MCAqIGlcclxuICAgICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IyKDEgKiBNYXRoLmNvcyhhbmdsZV9yYWQpLCAxICogTWF0aC5zaW4oYW5nbGVfcmFkKSkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2VuU2hhcGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xyXG4gICAgdGhpcy5zaGFwZS5tb3ZlVG8odGhpcy52ZXJ0aWNlc1swXS54LCB0aGlzLnZlcnRpY2VzWzBdLnkpO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspIHRoaXMuc2hhcGUubGluZVRvKHRoaXMudmVydGljZXNbaV0ueCwgdGhpcy52ZXJ0aWNlc1tpXS55KTtcclxuICAgIHRoaXMuc2hhcGUubGluZVRvKHRoaXMudmVydGljZXNbMF0ueCwgdGhpcy52ZXJ0aWNlc1swXS55KTtcclxuICB9LFxyXG4gIGdlbkdlb21ldHJ5OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZ2VvbWV0cnlTZXR0aW5ncyA9IHtcclxuICAgICAgZGVwdGg6IDMsXHJcbiAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGJldmVsU2VnbWVudHM6IDEsXHJcbiAgICAgIHN0ZXBzOiAxLFxyXG4gICAgICBiZXZlbFNpemU6IDEgLyAyMCxcclxuICAgICAgYmV2ZWxUaGlja25lc3M6IDEgLyAyMFxyXG4gICAgfTtcclxuICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgVEhSRUUuRXh0cnVkZUdlb21ldHJ5KHRoaXMuc2hhcGUsIHRoaXMuZ2VvbWV0cnlTZXR0aW5ncyk7XHJcbiAgfSxcclxuICBnZW5NYXRlcmlhbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtjb2xvcjogbmV3IFRIUkVFLkNvbG9yKCdyZWQnKX0pO1xyXG4gIH0sXHJcbiAgZ2VuTWVzaDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLm1lc2ggPSAgbmV3IFRIUkVFLk1lc2godGhpcy5nZW9tZXRyeSwgdGhpcy5tYXRlcmlhbCk7XHJcbiAgICB0aGlzLm1lc2gucm90YXRlT25BeGlzKG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSwgTWF0aC5QSSAvIDIpO1xyXG4gICAgdGhpcy5lbC5zZXRPYmplY3QzRCgnbWVzaCcsIHRoaXMubWVzaCk7XHJcbiAgfVxyXG59KTsiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2FuaW1hdGUtaGl0Jywge1xyXG4gICAgbXVsdGlwbGU6IHRydWUsXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaGl0XCIpO1xyXG4gICAgICAvLyB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYW5pbWF0aW9uJywgXCJwcm9wZXJ0eTogcm90YXRpb24ueTsgdG86IDkwOyBkdXI6IDIwMDA7IGVhc2luZzogbGluZWFyOyBsb29wOiB0cnVlXCIpO1xyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImhpdCB0aWNrXCIpO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gIH0pIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdhbmltYXRlLXJvdGF0aW9uJywge1xyXG4gIG11bHRpcGxlOiB0cnVlLFxyXG4gIHNjaGVtYToge1xyXG4gICAgc3BlZWQ6IHt0eXBlOiAnbnVtYmVyJywgZGVmYXVsdDogMTB9LFxyXG4gICAgYXhlOiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICd4J31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICAgIHRoaXMuZWwub2JqZWN0M0Qucm90YXRpb25bdGhpcy5kYXRhLmF4ZV0gPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoZWxhcHNlZCAvIHRoaXMuZGF0YS5zcGVlZCk7XHJcbiAgfVxyXG59KSIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnYW5pbWF0ZS1zY2FsZScsIHtcclxuICAgIG11bHRpcGxlOiB0cnVlLFxyXG4gICAgc2NoZW1hOiB7XHJcbiAgICAgIHNwZWVkOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDEwMH1cclxuICAgIH0sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIFxyXG5cclxuICAgIH0sXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICAgICAgICBsZXQgc2NhbGUgPSAoTWF0aC5zaW4oZWxhcHNlZC90aGlzLmRhdGEuc3BlZWQpKjIpO1xyXG5cclxuICAgICAgICB0aGlzLmVsLm9iamVjdDNELnNjYWxlLnNldChzY2FsZSxzY2FsZSxzY2FsZSk7XHJcblxyXG4gICAgfVxyXG4gIH0pIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdjdXJzb3ItbGlzdGVuZXInLCB7XHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGV2dCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnZW1pdC13aGVuLW5lYXInLCB7XHJcbiAgc2NoZW1hOiB7XHJcbiAgICB0YXJnZXQ6IHt0eXBlOiAnc2VsZWN0b3InLCBkZWZhdWx0OiAnI2NhbWVyYS1yaWcnfSxcclxuICAgIGRpc3RhbmNlOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDF9LFxyXG4gICAgZXZlbnQ6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ2NsaWNrJ30sXHJcbiAgICBldmVudEZhcjoge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAndW5jbGljayd9LFxyXG4gICAgdGhyb3R0bGU6IHt0eXBlOiAnbnVtYmVyJywgZGVmYXVsdDogMTAwfSxcclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudGljayA9IEFGUkFNRS51dGlscy50aHJvdHRsZVRpY2sodGhpcy5jaGVja0Rpc3QsIHRoaXMuZGF0YS50aHJvdHRsZSwgdGhpcyk7XHJcbiAgICB0aGlzLmVtaXRpbmcgPSBmYWxzZTtcclxuICB9LFxyXG4gIGNoZWNrRGlzdDogZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IG15UG9zID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICB0aGlzLmVsLm9iamVjdDNELmdldFdvcmxkUG9zaXRpb24obXlQb3MpO1xyXG4gICAgdGhpcy5kYXRhLnRhcmdldC5vYmplY3QzRC5nZXRXb3JsZFBvc2l0aW9uKHRhcmdldFBvcyk7XHJcbiAgICBjb25zdCBkaXN0YW5jZVRvID0gbXlQb3MuZGlzdGFuY2VUbyh0YXJnZXRQb3MpO1xyXG4gICAgaWYgKGRpc3RhbmNlVG8gPD0gdGhpcy5kYXRhLmRpc3RhbmNlKSB7XHJcbiAgICAgIGlmICh0aGlzLmVtaXRpbmcpIHJldHVybjtcclxuICAgICAgdGhpcy5lbWl0aW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5lbC5lbWl0KHRoaXMuZGF0YS5ldmVudCwge2NvbGxpZGluZ0VudGl0eTogdGhpcy5kYXRhLnRhcmdldH0sIGZhbHNlKTtcclxuICAgICAgdGhpcy5kYXRhLnRhcmdldC5lbWl0KHRoaXMuZGF0YS5ldmVudCwge2NvbGxpZGluZ0VudGl0eTogdGhpcy5lbH0sIGZhbHNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghdGhpcy5lbWl0aW5nKSByZXR1cm47XHJcbiAgICAgIHRoaXMuZWwuZW1pdCh0aGlzLmRhdGEuZXZlbnRGYXIsIHtjb2xsaWRpbmdFbnRpdHk6IHRoaXMuZGF0YS50YXJnZXR9LCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuZGF0YS50YXJnZXQuZW1pdCh0aGlzLmRhdGEuZXZlbnRGYXIsIHtjb2xsaWRpbmdFbnRpdHk6IHRoaXMuZWx9LCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuZW1pdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnZ3VuLWZsYXNoJywge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImluaXQgZ3VuIGZsYXNoXCIpXHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignc2hvb3QnLCBldnQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hvb290ZWRcIik7XHJcbiAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2xpZ2h0Jywge1xyXG4gICAgICAgICAgdHlwZTogJ3Nwb3QnLFxyXG4gICAgICAgICAgYW5nbGU6ICc0NSdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoJ2xpZ2h0Jyk7XHJcblxyXG4gICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgdGljazogZnVuY3Rpb24gKGVsYXBzZWQsIGR0KSB7XHJcbiAgXHJcblxyXG5cclxuICB9XHJcbiAgfSk7IiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdob3Zlci1oaWdobGlnaHRlcicsIHtcclxuICBzY2hlbWE6IHtcclxuICAgIGNvbG9yOiB7dHlwZTogJ2NvbG9yJywgZGVmYXVsdDogJ3doaXRlJ31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzLmVsO1xyXG4gICAgdGhpcy5oYW5kbGVyT25FbnRlciA9IGV2dCA9PiB0aGlzLm9uRW50ZXIoZXZ0KTtcclxuICAgIHRoaXMuaGFuZGxlck9uTGVhdmUgPSBldnQgPT4gdGhpcy5vbkxlYXZlKGV2dCk7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5oYW5kbGVyT25FbnRlcik7XHJcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5oYW5kbGVyT25MZWF2ZSk7XHJcbiAgfSxcclxuICBvbkVudGVyOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICBsZXQgY3Vyc29yID0gZXZ0LmRldGFpbC5jdXJzb3JFbDtcclxuICAgIHRoaXMuc2F2ZWRDb2xvciA9IGN1cnNvci5nZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiKS5jb2xvcjtcclxuICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiLCBcImNvbG9yXCIsIHRoaXMuZGF0YS5jb2xvcik7XHJcbiAgfSxcclxuICBvbkxlYXZlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICBsZXQgY3Vyc29yID0gZXZ0LmRldGFpbC5jdXJzb3JFbDtcclxuICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJtYXRlcmlhbFwiLCBcImNvbG9yXCIsIHRoaXMuc2F2ZWRDb2xvcik7XHJcbiAgfSxcclxuICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB0YXJnZXQgPSB0aGlzLmVsO1xyXG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuaGFuZGxlck9uRW50ZXIpO1xyXG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuaGFuZGxlck9uTGVhdmUpO1xyXG4gIH1cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyUHJpbWl0aXZlKCdpbS1ib3gnLCB7XHJcbiAgZGVmYXVsdENvbXBvbmVudHM6IHtcclxuICAgICdpbWJveCc6IHt9XHJcbiAgfSxcclxuICBtYXBwaW5nczoge1xyXG4gICAgc2l6ZTogJ2ltYm94LnNpemUnLFxyXG4gICAgY29sb3I6ICdpbWJveC5jb2xvcicsXHJcbiAgfVxyXG59KTtcclxuXHJcbkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnaW1ib3gnLCB7XHJcbiAgc2NoZW1hOiB7XHJcbiAgICBzaXplOiB7dHlwZTogXCJudW1iZXJcIiwgZGVmYXVsdDogMX0sXHJcbiAgICBjb2xvcjoge3R5cGU6IFwiY29sb3JcIiwgZGVmYXVsdDogJ2JsYWNrJ31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2VuVmVydGljZXMoKTtcclxuICAgIHRoaXMuZ2VuU2hhcGUoKTtcclxuICAgIHRoaXMuZ2VuR2VvbWV0cnkoKTtcclxuICAgIHRoaXMuZ2VuTWF0ZXJpYWwoKTtcclxuICAgIHRoaXMuZ2VuTWVzaCgpO1xyXG4gIH0sXHJcbiAgZ2VuVmVydGljZXM6IGZ1bmN0aW9uICAoKSB7XHJcbiAgICBjb25zdCBoYWxmID0gdGhpcy5kYXRhLnNpemUgLzI7XHJcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XHJcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoLWhhbGYsIGhhbGYpKTtcclxuICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMihoYWxmLCBoYWxmKSk7XHJcbiAgICB0aGlzLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjIoaGFsZiwgLWhhbGYpKTtcclxuICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMigtaGFsZiwgLWhhbGYpKTtcclxuICB9LFxyXG4gIGdlblNoYXBlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNoYXBlID0gbmV3IFRIUkVFLlNoYXBlKCk7XHJcblxyXG4gICAgY29uc3QgaGcgPSB0aGlzLnZlcnRpY2VzWzBdO1xyXG4gICAgdGhpcy5zaGFwZS5tb3ZlVG8oaGcueCwgaGcueSk7XHJcblxyXG4gICAgY29uc3QgaGQgPSB0aGlzLnZlcnRpY2VzWzFdO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oaGQueCwgaGQueSk7XHJcblxyXG4gICAgY29uc3QgYmQgPSB0aGlzLnZlcnRpY2VzWzJdO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oYmQueCwgYmQueSk7XHJcblxyXG4gICAgY29uc3QgYmwgPSB0aGlzLnZlcnRpY2VzWzNdO1xyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oYmwueCwgYmwueSk7XHJcblxyXG4gICAgdGhpcy5zaGFwZS5saW5lVG8oaGcueCwgaGcueSk7XHJcblxyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgZ2VuR2VvbWV0cnk6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBjb25zdCBleHRydWRlU2V0dGluZ3MgPSB7XHJcbiAgICAgIHN0ZXBzOiAxLFxyXG4gICAgICBkZXB0aDogdGhpcy5kYXRhLnNpemUsXHJcbiAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgVEhSRUUuRXh0cnVkZUdlb21ldHJ5KCB0aGlzLnNoYXBlLCBleHRydWRlU2V0dGluZ3MgKTtcclxuICB9LFxyXG5cclxuICBnZW5NYXRlcmlhbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcclxuICAgICAgIGNvbG9yOiBuZXcgVEhSRUUuQ29sb3IodGhpcy5kYXRhLmNvbG9yKVxyXG4gICAgfSApO1xyXG4gIH0sXHJcblxyXG4gIGdlbk1lc2g6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubWVzaCA9IG5ldyBUSFJFRS5NZXNoKCB0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsICkgO1xyXG4gICAgdGhpcy5lbC5zZXRPYmplY3QzRCgnbWVzaCcsIHRoaXMubWVzaCk7XHJcbiAgfVxyXG5cclxufSlcclxuIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdsaXN0ZW4tdG8nLCB7XHJcbiAgbXVsdGlwbGU6IHRydWUsXHJcbiAgc2NoZW1hOiB7XHJcbiAgICBldnQ6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ2NsaWNrJ30sXHJcbiAgICB0YXJnZXQ6IHt0eXBlOiAnc2VsZWN0b3InfSxcclxuICAgIGVtaXQ6IHt0eXBlOiAnc3RyaW5nJ31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZGF0YS50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEuZXZ0LCBldnQgPT4ge1xyXG4gICAgICB0aGlzLmVsLmVtaXQodGhpcy5kYXRhLmVtaXQpO1xyXG4gICAgfSlcclxuICB9XHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnb24tZXZlbnQtc2V0Jywge1xyXG4gIG11bHRpcGxlOiB0cnVlLFxyXG5cclxuICBzY2hlbWE6IHtcclxuICAgIGV2ZW50OiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICdjbGljayd9LFxyXG4gICAgYXR0cmlidXRlOiB7dHlwZTogJ3N0cmluZyd9LFxyXG4gICAgdmFsdWU6IHt0eXBlOiAnc3RyaW5nJ31cclxuICB9LFxyXG5cclxuICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX29uRXZlbnQgPSB0aGlzLl9vbkV2ZW50LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5kYXRhLmV2ZW50LCB0aGlzLl9vbkV2ZW50KTtcclxuICB9LFxyXG5cclxuICByZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZGF0YS5ldmVudCwgdGhpcy5fb25FdmVudCk7XHJcbiAgfSxcclxuXHJcbiAgX29uRXZlbnQ6IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgQUZSQU1FLnV0aWxzLmVudGl0eS5zZXRDb21wb25lbnRQcm9wZXJ0eSh0aGlzLmVsLCB0aGlzLmRhdGEuYXR0cmlidXRlLCB0aGlzLmRhdGEudmFsdWUpO1xyXG4gIH1cclxuXHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnb24tc2hvb3QnLCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaW5pdCBvbiBzaG9vdFwiKVxyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHtcclxuICAgICAgICB0aGlzLmVsLmVtaXQoYHNob290YCwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vdFwiKTtcclxuICAgICAgICAvLyB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnbGlnaHQnLCB7XHJcbiAgICAgICAgLy8gICB0eXBlOiAnc3BvdCcsXHJcbiAgICAgICAgLy8gICBhbmdsZTogJzQ1J1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgnbGlnaHQnKTtcclxuXHJcbiAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICBcclxuXHJcblxyXG4gIH1cclxuICB9KTsiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ3RvZ2dsZS1ldmVudHMnLCB7XHJcbiAgbXVsdGlwbGU6IHRydWUsXHJcbiAgc2NoZW1hOiB7XHJcbiAgICBzb3VyY2VFdnQ6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ2NsaWNrJ30sXHJcbiAgICBldnQxOiB7dHlwZTogJ3N0cmluZyd9LFxyXG4gICAgZXZ0Mjoge3R5cGU6ICdzdHJpbmcnfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IDA7XHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5kYXRhLnNvdXJjZUV2dCwgZXZ0ID0+IHtcclxuICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gMCkge1xyXG4gICAgICAgIHRoaXMuZWwuZW1pdCh0aGlzLmRhdGEuZXZ0MSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbC5lbWl0KHRoaXMuZGF0YS5ldnQyKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTsiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ3doZW4taGl0Jywge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImluaXQgd2hlbiBpdFwiKVxyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZ0ID0+IHtcclxuICAgICAgICAvLyB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYW5pbWF0ZS1oaXQnLFwiXCIpO1xyXG4gICAgICAgIHRoaXMuZWwuZW1pdChgYW5pbVRhcmdldGAsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImV2dCBzaG9vdFwiKTtcclxuICAgICAgICBcclxuICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBcclxuICAgIHRpY2s6IGZ1bmN0aW9uIChlbGFwc2VkLCBkdCkge1xyXG5cclxuICBcclxuXHJcblxyXG4gIH1cclxuICB9KTsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYS10ZXN0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hLXRlc3QuanNcIixcblx0XCIuL2FuaW1hdGUtaGl0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLWhpdC5qc1wiLFxuXHRcIi4vYW5pbWF0ZS1yb3RhdGlvbi5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1yb3RhdGlvbi5qc1wiLFxuXHRcIi4vYW5pbWF0ZS1zY2FsZS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1zY2FsZS5qc1wiLFxuXHRcIi4vY3Vyc29yLWxpc3RlbmVyLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9jdXJzb3ItbGlzdGVuZXIuanNcIixcblx0XCIuL2VtaXQtd2hlbi1uZWFyLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9lbWl0LXdoZW4tbmVhci5qc1wiLFxuXHRcIi4vZ3VuLWZsYXNoLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9ndW4tZmxhc2guanNcIixcblx0XCIuL2hvdmVyLWhpZ2hsaWdodGVyLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9ob3Zlci1oaWdobGlnaHRlci5qc1wiLFxuXHRcIi4vaW0tYm94LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9pbS1ib3guanNcIixcblx0XCIuL2xpc3Rlbi10by5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvbGlzdGVuLXRvLmpzXCIsXG5cdFwiLi9vbi1ldmVudC1zZXQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL29uLWV2ZW50LXNldC5qc1wiLFxuXHRcIi4vb24tc2hvb3QuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL29uLXNob290LmpzXCIsXG5cdFwiLi90b2dnbGUtZXZlbnRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy90b2dnbGUtZXZlbnRzLmpzXCIsXG5cdFwiLi93aGVuLWhpdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvd2hlbi1oaXQuanNcIixcblx0XCJjb21wb25lbnRzL2EtdGVzdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYS10ZXN0LmpzXCIsXG5cdFwiY29tcG9uZW50cy9hbmltYXRlLWhpdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1oaXQuanNcIixcblx0XCJjb21wb25lbnRzL2FuaW1hdGUtcm90YXRpb24uanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtcm90YXRpb24uanNcIixcblx0XCJjb21wb25lbnRzL2FuaW1hdGUtc2NhbGUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtc2NhbGUuanNcIixcblx0XCJjb21wb25lbnRzL2N1cnNvci1saXN0ZW5lci5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvY3Vyc29yLWxpc3RlbmVyLmpzXCIsXG5cdFwiY29tcG9uZW50cy9lbWl0LXdoZW4tbmVhci5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvZW1pdC13aGVuLW5lYXIuanNcIixcblx0XCJjb21wb25lbnRzL2d1bi1mbGFzaC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvZ3VuLWZsYXNoLmpzXCIsXG5cdFwiY29tcG9uZW50cy9ob3Zlci1oaWdobGlnaHRlci5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvaG92ZXItaGlnaGxpZ2h0ZXIuanNcIixcblx0XCJjb21wb25lbnRzL2ltLWJveC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvaW0tYm94LmpzXCIsXG5cdFwiY29tcG9uZW50cy9saXN0ZW4tdG8uanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2xpc3Rlbi10by5qc1wiLFxuXHRcImNvbXBvbmVudHMvb24tZXZlbnQtc2V0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9vbi1ldmVudC1zZXQuanNcIixcblx0XCJjb21wb25lbnRzL29uLXNob290LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9vbi1zaG9vdC5qc1wiLFxuXHRcImNvbXBvbmVudHMvdG9nZ2xlLWV2ZW50cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvdG9nZ2xlLWV2ZW50cy5qc1wiLFxuXHRcImNvbXBvbmVudHMvd2hlbi1oaXQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL3doZW4taGl0LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2NvbXBvbmVudHMgc3luYyBcXFxcLmpzJFwiOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiXHJcbmZ1bmN0aW9uIGltcG9ydEFsbChyKSB7XHJcbiAgci5rZXlzKCkuZm9yRWFjaChyKTtcclxufVxyXG5cclxuaW1wb3J0QWxsKHJlcXVpcmUuY29udGV4dCgnLi9jb21wb25lbnRzJywgZmFsc2UsIC9cXC5qcyQvKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9