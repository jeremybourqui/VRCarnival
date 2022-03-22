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

/***/ "./src/components/game-loop.js":
/*!*************************************!*\
  !*** ./src/components/game-loop.js ***!
  \*************************************/
/***/ (() => {

AFRAME.registerComponent('game-loop', {
    multiple: true,
    
    init: function () {

      this.el.addEventListener('click', evt => {
        console.log("gameloop");
        // animer cible
        // chrono 1 minute

        gameStart = () => {
            document.querySelector('#shooting-range').setAttribute('score', null);
            console.log(document.querySelector('#shooting-range'));
            console.log("gamestart");
            this.el.emit(`gameStart`);
        };
        gameStart();

        setTimeout(() =>{
            document.querySelector('#shooting-range').removeAttribute('score');
            document.querySelector('#shooting-range').removeAttribute('score');
            console.log(document.querySelector('#shooting-range'));
            console.log("gameend");
            this.el.emit(`gameEnd`);
        }, 10000);
        

     });

    },
    remove: function () {
  
    },
    update: function () {
  
    },
    tick: function (elapsed, dt) {
   
    }
  })

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

/***/ "./src/components/score.js":
/*!*********************************!*\
  !*** ./src/components/score.js ***!
  \*********************************/
/***/ (() => {

AFRAME.registerComponent('score', {
    multiple: true,
    
    init: function () {

      let score = 0;
      let bestScore = 0;

      this.el.addEventListener('hit', evt => {
        score++;
        document.querySelector('#score').setAttribute('text', `value: Score : ${score}`);
      });

      this.el.addEventListener('gameStart', evt => {
        score = 0;
        document.querySelector('#score').setAttribute('text', `value: Score : ${score}`);


      });
      
      this.el.addEventListener('gameEnd', evt => {
        console.log("gameEndedede");
        if(score > bestScore){
          bestScore = score
        };
        document.querySelector('#bestScore').setAttribute('text', `value: Best score : ${bestScore}`);
      });



    },
    remove: function () {
  
    },
    update: function () {
  
    },
    tick: function (elapsed, dt) {
   

    }
  })

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
        this.el.emit(`hit`);
        

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
	"./game-loop.js": "./src/components/game-loop.js",
	"./gun-flash.js": "./src/components/gun-flash.js",
	"./hover-highlighter.js": "./src/components/hover-highlighter.js",
	"./im-box.js": "./src/components/im-box.js",
	"./listen-to.js": "./src/components/listen-to.js",
	"./on-event-set.js": "./src/components/on-event-set.js",
	"./on-shoot.js": "./src/components/on-shoot.js",
	"./score.js": "./src/components/score.js",
	"./toggle-events.js": "./src/components/toggle-events.js",
	"./when-hit.js": "./src/components/when-hit.js",
	"components/a-test.js": "./src/components/a-test.js",
	"components/animate-hit.js": "./src/components/animate-hit.js",
	"components/animate-rotation.js": "./src/components/animate-rotation.js",
	"components/animate-scale.js": "./src/components/animate-scale.js",
	"components/cursor-listener.js": "./src/components/cursor-listener.js",
	"components/emit-when-near.js": "./src/components/emit-when-near.js",
	"components/game-loop.js": "./src/components/game-loop.js",
	"components/gun-flash.js": "./src/components/gun-flash.js",
	"components/hover-highlighter.js": "./src/components/hover-highlighter.js",
	"components/im-box.js": "./src/components/im-box.js",
	"components/listen-to.js": "./src/components/listen-to.js",
	"components/on-event-set.js": "./src/components/on-event-set.js",
	"components/on-shoot.js": "./src/components/on-shoot.js",
	"components/score.js": "./src/components/score.js",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBOzs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsbURBQStDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2EtdGVzdC5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtaGl0LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1yb3RhdGlvbi5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtc2NhbGUuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9jdXJzb3ItbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9lbWl0LXdoZW4tbmVhci5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2dhbWUtbG9vcC5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2d1bi1mbGFzaC5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2hvdmVyLWhpZ2hsaWdodGVyLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvaW0tYm94LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvbGlzdGVuLXRvLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvb24tZXZlbnQtc2V0LmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvb24tc2hvb3QuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9zY29yZS5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL3RvZ2dsZS1ldmVudHMuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy93aGVuLWhpdC5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzfHN5bmN8bm9ucmVjdXJzaXZlfC8uanMkIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJBRlJBTUUucmVnaXN0ZXJQcmltaXRpdmUoJ2EtdGVzdCcsIHtcclxuICBkZWZhdWx0Q29tcG9uZW50czoge1xyXG4gICAgJ215dGVzdCc6IHt9XHJcbiAgfSxcclxuICBtYXBwaW5nczoge1xyXG5cclxuICB9XHJcbn0pO1xyXG5cclxuQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdteXRlc3QnLCB7XHJcbiAgc2NoZW1hOiB7XHJcblxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nZW5BbGwoKTtcclxuICB9LFxyXG4gIGdlbkFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nZW5WZXJ0aWNlcygpO1xyXG4gICAgdGhpcy5nZW5TaGFwZSgpO1xyXG4gICAgdGhpcy5nZW5HZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5nZW5NYXRlcmlhbCgpO1xyXG4gICAgdGhpcy5nZW5NZXNoKCk7XHJcbiAgfSxcclxuICBnZW5WZXJ0aWNlczogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKysgKSB7XHJcbiAgICAgIGxldCBhbmdsZV9yYWQgPSAxLjA0NzE5NzU1MTE5NjU5NzYgKiBpOyAvLyAoTWF0aC5QSSAvIDE4MCkgKiA2MCAqIGlcclxuICAgICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IyKDEgKiBNYXRoLmNvcyhhbmdsZV9yYWQpLCAxICogTWF0aC5zaW4oYW5nbGVfcmFkKSkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2VuU2hhcGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xyXG4gICAgdGhpcy5zaGFwZS5tb3ZlVG8odGhpcy52ZXJ0aWNlc1swXS54LCB0aGlzLnZlcnRpY2VzWzBdLnkpO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspIHRoaXMuc2hhcGUubGluZVRvKHRoaXMudmVydGljZXNbaV0ueCwgdGhpcy52ZXJ0aWNlc1tpXS55KTtcclxuICAgIHRoaXMuc2hhcGUubGluZVRvKHRoaXMudmVydGljZXNbMF0ueCwgdGhpcy52ZXJ0aWNlc1swXS55KTtcclxuICB9LFxyXG4gIGdlbkdlb21ldHJ5OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZ2VvbWV0cnlTZXR0aW5ncyA9IHtcclxuICAgICAgZGVwdGg6IDMsXHJcbiAgICAgIGJldmVsRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGJldmVsU2VnbWVudHM6IDEsXHJcbiAgICAgIHN0ZXBzOiAxLFxyXG4gICAgICBiZXZlbFNpemU6IDEgLyAyMCxcclxuICAgICAgYmV2ZWxUaGlja25lc3M6IDEgLyAyMFxyXG4gICAgfTtcclxuICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgVEhSRUUuRXh0cnVkZUdlb21ldHJ5KHRoaXMuc2hhcGUsIHRoaXMuZ2VvbWV0cnlTZXR0aW5ncyk7XHJcbiAgfSxcclxuICBnZW5NYXRlcmlhbDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtjb2xvcjogbmV3IFRIUkVFLkNvbG9yKCdyZWQnKX0pO1xyXG4gIH0sXHJcbiAgZ2VuTWVzaDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLm1lc2ggPSAgbmV3IFRIUkVFLk1lc2godGhpcy5nZW9tZXRyeSwgdGhpcy5tYXRlcmlhbCk7XHJcbiAgICB0aGlzLm1lc2gucm90YXRlT25BeGlzKG5ldyBUSFJFRS5WZWN0b3IzKC0xLCAwLCAwKSwgTWF0aC5QSSAvIDIpO1xyXG4gICAgdGhpcy5lbC5zZXRPYmplY3QzRCgnbWVzaCcsIHRoaXMubWVzaCk7XHJcbiAgfVxyXG59KTsiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2FuaW1hdGUtaGl0Jywge1xyXG4gICAgbXVsdGlwbGU6IHRydWUsXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaGl0XCIpO1xyXG4gICAgICAvLyB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYW5pbWF0aW9uJywgXCJwcm9wZXJ0eTogcm90YXRpb24ueTsgdG86IDkwOyBkdXI6IDIwMDA7IGVhc2luZzogbGluZWFyOyBsb29wOiB0cnVlXCIpO1xyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImhpdCB0aWNrXCIpO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gIH0pIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdhbmltYXRlLXJvdGF0aW9uJywge1xyXG4gIG11bHRpcGxlOiB0cnVlLFxyXG4gIHNjaGVtYToge1xyXG4gICAgc3BlZWQ6IHt0eXBlOiAnbnVtYmVyJywgZGVmYXVsdDogMTB9LFxyXG4gICAgYXhlOiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICd4J31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgfSxcclxuICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICAgIHRoaXMuZWwub2JqZWN0M0Qucm90YXRpb25bdGhpcy5kYXRhLmF4ZV0gPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoZWxhcHNlZCAvIHRoaXMuZGF0YS5zcGVlZCk7XHJcbiAgfVxyXG59KSIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnYW5pbWF0ZS1zY2FsZScsIHtcclxuICAgIG11bHRpcGxlOiB0cnVlLFxyXG4gICAgc2NoZW1hOiB7XHJcbiAgICAgIHNwZWVkOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDEwMH1cclxuICAgIH0sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIFxyXG5cclxuICAgIH0sXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICAgICAgICBsZXQgc2NhbGUgPSAoTWF0aC5zaW4oZWxhcHNlZC90aGlzLmRhdGEuc3BlZWQpKjIpO1xyXG5cclxuICAgICAgICB0aGlzLmVsLm9iamVjdDNELnNjYWxlLnNldChzY2FsZSxzY2FsZSxzY2FsZSk7XHJcblxyXG4gICAgfVxyXG4gIH0pIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdjdXJzb3ItbGlzdGVuZXInLCB7XHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGV2dCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnZW1pdC13aGVuLW5lYXInLCB7XHJcbiAgc2NoZW1hOiB7XHJcbiAgICB0YXJnZXQ6IHt0eXBlOiAnc2VsZWN0b3InLCBkZWZhdWx0OiAnI2NhbWVyYS1yaWcnfSxcclxuICAgIGRpc3RhbmNlOiB7dHlwZTogJ251bWJlcicsIGRlZmF1bHQ6IDF9LFxyXG4gICAgZXZlbnQ6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ2NsaWNrJ30sXHJcbiAgICBldmVudEZhcjoge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAndW5jbGljayd9LFxyXG4gICAgdGhyb3R0bGU6IHt0eXBlOiAnbnVtYmVyJywgZGVmYXVsdDogMTAwfSxcclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudGljayA9IEFGUkFNRS51dGlscy50aHJvdHRsZVRpY2sodGhpcy5jaGVja0Rpc3QsIHRoaXMuZGF0YS50aHJvdHRsZSwgdGhpcyk7XHJcbiAgICB0aGlzLmVtaXRpbmcgPSBmYWxzZTtcclxuICB9LFxyXG4gIGNoZWNrRGlzdDogZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IG15UG9zID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICBsZXQgdGFyZ2V0UG9zID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICB0aGlzLmVsLm9iamVjdDNELmdldFdvcmxkUG9zaXRpb24obXlQb3MpO1xyXG4gICAgdGhpcy5kYXRhLnRhcmdldC5vYmplY3QzRC5nZXRXb3JsZFBvc2l0aW9uKHRhcmdldFBvcyk7XHJcbiAgICBjb25zdCBkaXN0YW5jZVRvID0gbXlQb3MuZGlzdGFuY2VUbyh0YXJnZXRQb3MpO1xyXG4gICAgaWYgKGRpc3RhbmNlVG8gPD0gdGhpcy5kYXRhLmRpc3RhbmNlKSB7XHJcbiAgICAgIGlmICh0aGlzLmVtaXRpbmcpIHJldHVybjtcclxuICAgICAgdGhpcy5lbWl0aW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5lbC5lbWl0KHRoaXMuZGF0YS5ldmVudCwge2NvbGxpZGluZ0VudGl0eTogdGhpcy5kYXRhLnRhcmdldH0sIGZhbHNlKTtcclxuICAgICAgdGhpcy5kYXRhLnRhcmdldC5lbWl0KHRoaXMuZGF0YS5ldmVudCwge2NvbGxpZGluZ0VudGl0eTogdGhpcy5lbH0sIGZhbHNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghdGhpcy5lbWl0aW5nKSByZXR1cm47XHJcbiAgICAgIHRoaXMuZWwuZW1pdCh0aGlzLmRhdGEuZXZlbnRGYXIsIHtjb2xsaWRpbmdFbnRpdHk6IHRoaXMuZGF0YS50YXJnZXR9LCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuZGF0YS50YXJnZXQuZW1pdCh0aGlzLmRhdGEuZXZlbnRGYXIsIHtjb2xsaWRpbmdFbnRpdHk6IHRoaXMuZWx9LCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuZW1pdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnZ2FtZS1sb29wJywge1xyXG4gICAgbXVsdGlwbGU6IHRydWUsXHJcbiAgICBcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZWxvb3BcIik7XHJcbiAgICAgICAgLy8gYW5pbWVyIGNpYmxlXHJcbiAgICAgICAgLy8gY2hyb25vIDEgbWludXRlXHJcblxyXG4gICAgICAgIGdhbWVTdGFydCA9ICgpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Nob290aW5nLXJhbmdlJykuc2V0QXR0cmlidXRlKCdzY29yZScsIG51bGwpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvb3RpbmctcmFuZ2UnKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZXN0YXJ0XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLmVtaXQoYGdhbWVTdGFydGApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZ2FtZVN0YXJ0KCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaG9vdGluZy1yYW5nZScpLnJlbW92ZUF0dHJpYnV0ZSgnc2NvcmUnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Nob290aW5nLXJhbmdlJykucmVtb3ZlQXR0cmlidXRlKCdzY29yZScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvb3RpbmctcmFuZ2UnKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZWVuZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5lbC5lbWl0KGBnYW1lRW5kYCk7XHJcbiAgICAgICAgfSwgMTAwMDApO1xyXG4gICAgICAgIFxyXG5cclxuICAgICB9KTtcclxuXHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgXHJcbiAgICB9LFxyXG4gICAgdGljazogZnVuY3Rpb24gKGVsYXBzZWQsIGR0KSB7XHJcbiAgIFxyXG4gICAgfVxyXG4gIH0pIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdndW4tZmxhc2gnLCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaW5pdCBndW4gZmxhc2hcIilcclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdzaG9vdCcsIGV2dCA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaG9vb3RlZFwiKTtcclxuICAgICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnbGlnaHQnLCB7XHJcbiAgICAgICAgICB0eXBlOiAnc3BvdCcsXHJcbiAgICAgICAgICBhbmdsZTogJzQ1J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZSgnbGlnaHQnKTtcclxuXHJcbiAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICBcclxuXHJcblxyXG4gIH1cclxuICB9KTsiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2hvdmVyLWhpZ2hsaWdodGVyJywge1xyXG4gIHNjaGVtYToge1xyXG4gICAgY29sb3I6IHt0eXBlOiAnY29sb3InLCBkZWZhdWx0OiAnd2hpdGUnfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRhcmdldCA9IHRoaXMuZWw7XHJcbiAgICB0aGlzLmhhbmRsZXJPbkVudGVyID0gZXZ0ID0+IHRoaXMub25FbnRlcihldnQpO1xyXG4gICAgdGhpcy5oYW5kbGVyT25MZWF2ZSA9IGV2dCA9PiB0aGlzLm9uTGVhdmUoZXZ0KTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLmhhbmRsZXJPbkVudGVyKTtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLmhhbmRsZXJPbkxlYXZlKTtcclxuICB9LFxyXG4gIG9uRW50ZXI6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGxldCBjdXJzb3IgPSBldnQuZGV0YWlsLmN1cnNvckVsO1xyXG4gICAgdGhpcy5zYXZlZENvbG9yID0gY3Vyc29yLmdldEF0dHJpYnV0ZShcIm1hdGVyaWFsXCIpLmNvbG9yO1xyXG4gICAgY3Vyc29yLnNldEF0dHJpYnV0ZShcIm1hdGVyaWFsXCIsIFwiY29sb3JcIiwgdGhpcy5kYXRhLmNvbG9yKTtcclxuICB9LFxyXG4gIG9uTGVhdmU6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGxldCBjdXJzb3IgPSBldnQuZGV0YWlsLmN1cnNvckVsO1xyXG4gICAgY3Vyc29yLnNldEF0dHJpYnV0ZShcIm1hdGVyaWFsXCIsIFwiY29sb3JcIiwgdGhpcy5zYXZlZENvbG9yKTtcclxuICB9LFxyXG4gIHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRhcmdldCA9IHRoaXMuZWw7XHJcbiAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5oYW5kbGVyT25FbnRlcik7XHJcbiAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5oYW5kbGVyT25MZWF2ZSk7XHJcbiAgfVxyXG59KTsiLCJBRlJBTUUucmVnaXN0ZXJQcmltaXRpdmUoJ2ltLWJveCcsIHtcclxuICBkZWZhdWx0Q29tcG9uZW50czoge1xyXG4gICAgJ2ltYm94Jzoge31cclxuICB9LFxyXG4gIG1hcHBpbmdzOiB7XHJcbiAgICBzaXplOiAnaW1ib3guc2l6ZScsXHJcbiAgICBjb2xvcjogJ2ltYm94LmNvbG9yJyxcclxuICB9XHJcbn0pO1xyXG5cclxuQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdpbWJveCcsIHtcclxuICBzY2hlbWE6IHtcclxuICAgIHNpemU6IHt0eXBlOiBcIm51bWJlclwiLCBkZWZhdWx0OiAxfSxcclxuICAgIGNvbG9yOiB7dHlwZTogXCJjb2xvclwiLCBkZWZhdWx0OiAnYmxhY2snfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nZW5WZXJ0aWNlcygpO1xyXG4gICAgdGhpcy5nZW5TaGFwZSgpO1xyXG4gICAgdGhpcy5nZW5HZW9tZXRyeSgpO1xyXG4gICAgdGhpcy5nZW5NYXRlcmlhbCgpO1xyXG4gICAgdGhpcy5nZW5NZXNoKCk7XHJcbiAgfSxcclxuICBnZW5WZXJ0aWNlczogZnVuY3Rpb24gICgpIHtcclxuICAgIGNvbnN0IGhhbGYgPSB0aGlzLmRhdGEuc2l6ZSAvMjtcclxuICAgIHRoaXMudmVydGljZXMgPSBbXTtcclxuICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMigtaGFsZiwgaGFsZikpO1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IyKGhhbGYsIGhhbGYpKTtcclxuICAgIHRoaXMudmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMihoYWxmLCAtaGFsZikpO1xyXG4gICAgdGhpcy52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IyKC1oYWxmLCAtaGFsZikpO1xyXG4gIH0sXHJcbiAgZ2VuU2hhcGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2hhcGUgPSBuZXcgVEhSRUUuU2hhcGUoKTtcclxuXHJcbiAgICBjb25zdCBoZyA9IHRoaXMudmVydGljZXNbMF07XHJcbiAgICB0aGlzLnNoYXBlLm1vdmVUbyhoZy54LCBoZy55KTtcclxuXHJcbiAgICBjb25zdCBoZCA9IHRoaXMudmVydGljZXNbMV07XHJcbiAgICB0aGlzLnNoYXBlLmxpbmVUbyhoZC54LCBoZC55KTtcclxuXHJcbiAgICBjb25zdCBiZCA9IHRoaXMudmVydGljZXNbMl07XHJcbiAgICB0aGlzLnNoYXBlLmxpbmVUbyhiZC54LCBiZC55KTtcclxuXHJcbiAgICBjb25zdCBibCA9IHRoaXMudmVydGljZXNbM107XHJcbiAgICB0aGlzLnNoYXBlLmxpbmVUbyhibC54LCBibC55KTtcclxuXHJcbiAgICB0aGlzLnNoYXBlLmxpbmVUbyhoZy54LCBoZy55KTtcclxuXHJcblxyXG5cclxuICB9LFxyXG5cclxuICBnZW5HZW9tZXRyeTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNvbnN0IGV4dHJ1ZGVTZXR0aW5ncyA9IHtcclxuICAgICAgc3RlcHM6IDEsXHJcbiAgICAgIGRlcHRoOiB0aGlzLmRhdGEuc2l6ZSxcclxuICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBUSFJFRS5FeHRydWRlR2VvbWV0cnkoIHRoaXMuc2hhcGUsIGV4dHJ1ZGVTZXR0aW5ncyApO1xyXG4gIH0sXHJcblxyXG4gIGdlbk1hdGVyaWFsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLm1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xyXG4gICAgICAgY29sb3I6IG5ldyBUSFJFRS5Db2xvcih0aGlzLmRhdGEuY29sb3IpXHJcbiAgICB9ICk7XHJcbiAgfSxcclxuXHJcbiAgZ2VuTWVzaDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5tZXNoID0gbmV3IFRIUkVFLk1lc2goIHRoaXMuZ2VvbWV0cnksIHRoaXMubWF0ZXJpYWwgKSA7XHJcbiAgICB0aGlzLmVsLnNldE9iamVjdDNEKCdtZXNoJywgdGhpcy5tZXNoKTtcclxuICB9XHJcblxyXG59KVxyXG4iLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2xpc3Rlbi10bycsIHtcclxuICBtdWx0aXBsZTogdHJ1ZSxcclxuICBzY2hlbWE6IHtcclxuICAgIGV2dDoge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAnY2xpY2snfSxcclxuICAgIHRhcmdldDoge3R5cGU6ICdzZWxlY3Rvcid9LFxyXG4gICAgZW1pdDoge3R5cGU6ICdzdHJpbmcnfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5kYXRhLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZGF0YS5ldnQsIGV2dCA9PiB7XHJcbiAgICAgIHRoaXMuZWwuZW1pdCh0aGlzLmRhdGEuZW1pdCk7XHJcbiAgICB9KVxyXG4gIH1cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdvbi1ldmVudC1zZXQnLCB7XHJcbiAgbXVsdGlwbGU6IHRydWUsXHJcblxyXG4gIHNjaGVtYToge1xyXG4gICAgZXZlbnQ6IHt0eXBlOiAnc3RyaW5nJywgZGVmYXVsdDogJ2NsaWNrJ30sXHJcbiAgICBhdHRyaWJ1dGU6IHt0eXBlOiAnc3RyaW5nJ30sXHJcbiAgICB2YWx1ZToge3R5cGU6ICdzdHJpbmcnfVxyXG4gIH0sXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fb25FdmVudCA9IHRoaXMuX29uRXZlbnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmRhdGEuZXZlbnQsIHRoaXMuX29uRXZlbnQpO1xyXG4gIH0sXHJcblxyXG4gIHJlbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5kYXRhLmV2ZW50LCB0aGlzLl9vbkV2ZW50KTtcclxuICB9LFxyXG5cclxuICBfb25FdmVudDogZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICBBRlJBTUUudXRpbHMuZW50aXR5LnNldENvbXBvbmVudFByb3BlcnR5KHRoaXMuZWwsIHRoaXMuZGF0YS5hdHRyaWJ1dGUsIHRoaXMuZGF0YS52YWx1ZSk7XHJcbiAgfVxyXG5cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdvbi1zaG9vdCcsIHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpbml0IG9uIHNob290XCIpXHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICAgIHRoaXMuZWwuZW1pdChgc2hvb3RgLCBudWxsLCB0cnVlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNob290XCIpO1xyXG4gICAgICAgIC8vIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdsaWdodCcsIHtcclxuICAgICAgICAvLyAgIHR5cGU6ICdzcG90JyxcclxuICAgICAgICAvLyAgIGFuZ2xlOiAnNDUnXHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKCdsaWdodCcpO1xyXG5cclxuICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBcclxuICAgIHRpY2s6IGZ1bmN0aW9uIChlbGFwc2VkLCBkdCkge1xyXG4gIFxyXG5cclxuXHJcbiAgfVxyXG4gIH0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnc2NvcmUnLCB7XHJcbiAgICBtdWx0aXBsZTogdHJ1ZSxcclxuICAgIFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgbGV0IGJlc3RTY29yZSA9IDA7XHJcblxyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2hpdCcsIGV2dCA9PiB7XHJcbiAgICAgICAgc2NvcmUrKztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUnKS5zZXRBdHRyaWJ1dGUoJ3RleHQnLCBgdmFsdWU6IFNjb3JlIDogJHtzY29yZX1gKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2dhbWVTdGFydCcsIGV2dCA9PiB7XHJcbiAgICAgICAgc2NvcmUgPSAwO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZScpLnNldEF0dHJpYnV0ZSgndGV4dCcsIGB2YWx1ZTogU2NvcmUgOiAke3Njb3JlfWApO1xyXG5cclxuXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdnYW1lRW5kJywgZXZ0ID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdhbWVFbmRlZGVkZVwiKTtcclxuICAgICAgICBpZihzY29yZSA+IGJlc3RTY29yZSl7XHJcbiAgICAgICAgICBiZXN0U2NvcmUgPSBzY29yZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jlc3RTY29yZScpLnNldEF0dHJpYnV0ZSgndGV4dCcsIGB2YWx1ZTogQmVzdCBzY29yZSA6ICR7YmVzdFNjb3JlfWApO1xyXG4gICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgIH0sXHJcbiAgICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuICAgXHJcblxyXG4gICAgfVxyXG4gIH0pIiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCd0b2dnbGUtZXZlbnRzJywge1xyXG4gIG11bHRpcGxlOiB0cnVlLFxyXG4gIHNjaGVtYToge1xyXG4gICAgc291cmNlRXZ0OiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICdjbGljayd9LFxyXG4gICAgZXZ0MToge3R5cGU6ICdzdHJpbmcnfSxcclxuICAgIGV2dDI6IHt0eXBlOiAnc3RyaW5nJ31cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSAwO1xyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZGF0YS5zb3VyY2VFdnQsIGV2dCA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXRlID09IDApIHtcclxuICAgICAgICB0aGlzLmVsLmVtaXQodGhpcy5kYXRhLmV2dDEpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAxO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZWwuZW1pdCh0aGlzLmRhdGEuZXZ0Mik7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSk7IiwiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCd3aGVuLWhpdCcsIHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpbml0IHdoZW4gaXRcIilcclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB7XHJcbiAgICAgICAgLy8gdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtaGl0JyxcIlwiKTtcclxuICAgICAgICB0aGlzLmVsLmVtaXQoYGFuaW1UYXJnZXRgLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5lbC5lbWl0KGBoaXRgKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICB0aWNrOiBmdW5jdGlvbiAoZWxhcHNlZCwgZHQpIHtcclxuXHJcbiAgXHJcblxyXG5cclxuICB9XHJcbiAgfSk7IiwidmFyIG1hcCA9IHtcblx0XCIuL2EtdGVzdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYS10ZXN0LmpzXCIsXG5cdFwiLi9hbmltYXRlLWhpdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvYW5pbWF0ZS1oaXQuanNcIixcblx0XCIuL2FuaW1hdGUtcm90YXRpb24uanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtcm90YXRpb24uanNcIixcblx0XCIuL2FuaW1hdGUtc2NhbGUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtc2NhbGUuanNcIixcblx0XCIuL2N1cnNvci1saXN0ZW5lci5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvY3Vyc29yLWxpc3RlbmVyLmpzXCIsXG5cdFwiLi9lbWl0LXdoZW4tbmVhci5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvZW1pdC13aGVuLW5lYXIuanNcIixcblx0XCIuL2dhbWUtbG9vcC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvZ2FtZS1sb29wLmpzXCIsXG5cdFwiLi9ndW4tZmxhc2guanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2d1bi1mbGFzaC5qc1wiLFxuXHRcIi4vaG92ZXItaGlnaGxpZ2h0ZXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2hvdmVyLWhpZ2hsaWdodGVyLmpzXCIsXG5cdFwiLi9pbS1ib3guanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2ltLWJveC5qc1wiLFxuXHRcIi4vbGlzdGVuLXRvLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9saXN0ZW4tdG8uanNcIixcblx0XCIuL29uLWV2ZW50LXNldC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvb24tZXZlbnQtc2V0LmpzXCIsXG5cdFwiLi9vbi1zaG9vdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvb24tc2hvb3QuanNcIixcblx0XCIuL3Njb3JlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9zY29yZS5qc1wiLFxuXHRcIi4vdG9nZ2xlLWV2ZW50cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvdG9nZ2xlLWV2ZW50cy5qc1wiLFxuXHRcIi4vd2hlbi1oaXQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL3doZW4taGl0LmpzXCIsXG5cdFwiY29tcG9uZW50cy9hLXRlc3QuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2EtdGVzdC5qc1wiLFxuXHRcImNvbXBvbmVudHMvYW5pbWF0ZS1oaXQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2FuaW1hdGUtaGl0LmpzXCIsXG5cdFwiY29tcG9uZW50cy9hbmltYXRlLXJvdGF0aW9uLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLXJvdGF0aW9uLmpzXCIsXG5cdFwiY29tcG9uZW50cy9hbmltYXRlLXNjYWxlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9hbmltYXRlLXNjYWxlLmpzXCIsXG5cdFwiY29tcG9uZW50cy9jdXJzb3ItbGlzdGVuZXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2N1cnNvci1saXN0ZW5lci5qc1wiLFxuXHRcImNvbXBvbmVudHMvZW1pdC13aGVuLW5lYXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2VtaXQtd2hlbi1uZWFyLmpzXCIsXG5cdFwiY29tcG9uZW50cy9nYW1lLWxvb3AuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2dhbWUtbG9vcC5qc1wiLFxuXHRcImNvbXBvbmVudHMvZ3VuLWZsYXNoLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9ndW4tZmxhc2guanNcIixcblx0XCJjb21wb25lbnRzL2hvdmVyLWhpZ2hsaWdodGVyLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9ob3Zlci1oaWdobGlnaHRlci5qc1wiLFxuXHRcImNvbXBvbmVudHMvaW0tYm94LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9pbS1ib3guanNcIixcblx0XCJjb21wb25lbnRzL2xpc3Rlbi10by5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvbGlzdGVuLXRvLmpzXCIsXG5cdFwiY29tcG9uZW50cy9vbi1ldmVudC1zZXQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL29uLWV2ZW50LXNldC5qc1wiLFxuXHRcImNvbXBvbmVudHMvb24tc2hvb3QuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL29uLXNob290LmpzXCIsXG5cdFwiY29tcG9uZW50cy9zY29yZS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvc2NvcmUuanNcIixcblx0XCJjb21wb25lbnRzL3RvZ2dsZS1ldmVudHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL3RvZ2dsZS1ldmVudHMuanNcIixcblx0XCJjb21wb25lbnRzL3doZW4taGl0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy93aGVuLWhpdC5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9jb21wb25lbnRzIHN5bmMgXFxcXC5qcyRcIjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIlxyXG5mdW5jdGlvbiBpbXBvcnRBbGwocikge1xyXG4gIHIua2V5cygpLmZvckVhY2gocik7XHJcbn1cclxuXHJcbmltcG9ydEFsbChyZXF1aXJlLmNvbnRleHQoJy4vY29tcG9uZW50cycsIGZhbHNlLCAvXFwuanMkLykpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==