/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
        
        gameStart = () => {
            document.querySelector('#shooting-range').setAttribute('score', null);
            document.querySelector('#targets').setAttribute('animation', {'property': 'position',
                                                                        'to': {x: 0, y: 0, z: 0},                                 
                                                                        'easing': 'easeInOutElastic',                                 
                                                                        'dur': '1000'});
            document.querySelector('#targets').setAttribute('sound', {'src': '#fair-sound',
                                                                      'loop': 'true'
                                                                    });
            this.el.emit(`gameStart`);
        };
        gameStart();

        setTimeout(() =>{
            document.querySelector('#shooting-range').removeAttribute('score');
            document.querySelector('#targets').setAttribute('animation', {'property': 'position',
                                                                            'to': {X: 0, y: -2.837, z: 0},                                 
                                                                            'easing': 'easeInOutElastic',                                 
                                                                            'dur': '1000'});
            this.el.emit(`gameEnd`);
        }, 30000);
        

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
        this.el.emit(`animStart`, null, false);

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
	"./cursor-listener.js": "./src/components/cursor-listener.js",
	"./game-loop.js": "./src/components/game-loop.js",
	"./hover-highlighter.js": "./src/components/hover-highlighter.js",
	"./listen-to.js": "./src/components/listen-to.js",
	"./score.js": "./src/components/score.js",
	"./when-hit.js": "./src/components/when-hit.js",
	"components/cursor-listener.js": "./src/components/cursor-listener.js",
	"components/game-loop.js": "./src/components/game-loop.js",
	"components/hover-highlighter.js": "./src/components/hover-highlighter.js",
	"components/listen-to.js": "./src/components/listen-to.js",
	"components/score.js": "./src/components/score.js",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7Ozs7Ozs7OztBQ05EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFLCtFQUErRSxpQkFBaUI7QUFDaEc7QUFDQSxzRkFBc0Y7QUFDdEYsc0VBQXNFO0FBQ3RFO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRTtBQUMxRSxtRkFBbUYsc0JBQXNCO0FBQ3pHO0FBQ0EsMEZBQTBGO0FBQzFGO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7Ozs7Ozs7Ozs7QUMzQ0g7QUFDQTtBQUNBLFlBQVk7QUFDWixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7OztBQ3pCRDtBQUNBO0FBQ0E7QUFDQSxVQUFVLGlDQUFpQztBQUMzQyxhQUFhLGlCQUFpQjtBQUM5QixXQUFXO0FBQ1gsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7Ozs7Ozs7Ozs7QUNaRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRixNQUFNO0FBQ3RGLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YsTUFBTTtBQUN0RjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlGQUF5RixVQUFVO0FBQ25HLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7Ozs7Ozs7OztBQ3pDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7Ozs7Ozs7OztBQ3JCSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2pDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLG1EQUErQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9jdXJzb3ItbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9nYW1lLWxvb3AuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50cy9ob3Zlci1oaWdobGlnaHRlci5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL2xpc3Rlbi10by5qcyIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9jb21wb25lbnRzL3Njb3JlLmpzIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2NvbXBvbmVudHMvd2hlbi1oaXQuanMiLCJ3ZWJwYWNrOi8vYWZyYW1lLXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvY29tcG9uZW50c3xzeW5jfG5vbnJlY3Vyc2l2ZXwvLmpzJCIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hZnJhbWUtd2VicGFjay1ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FmcmFtZS13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdjdXJzb3ItbGlzdGVuZXInLCB7XHJcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2dCA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGV2dCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnZ2FtZS1sb29wJywge1xyXG4gICAgbXVsdGlwbGU6IHRydWUsXHJcbiAgICBcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZWxvb3BcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ2FtZVN0YXJ0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvb3RpbmctcmFuZ2UnKS5zZXRBdHRyaWJ1dGUoJ3Njb3JlJywgbnVsbCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXJnZXRzJykuc2V0QXR0cmlidXRlKCdhbmltYXRpb24nLCB7J3Byb3BlcnR5JzogJ3Bvc2l0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RvJzoge3g6IDAsIHk6IDAsIHo6IDB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZWFzaW5nJzogJ2Vhc2VJbk91dEVsYXN0aWMnLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZHVyJzogJzEwMDAnfSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXJnZXRzJykuc2V0QXR0cmlidXRlKCdzb3VuZCcsIHsnc3JjJzogJyNmYWlyLXNvdW5kJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsb29wJzogJ3RydWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuZW1pdChgZ2FtZVN0YXJ0YCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBnYW1lU3RhcnQoKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Nob290aW5nLXJhbmdlJykucmVtb3ZlQXR0cmlidXRlKCdzY29yZScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFyZ2V0cycpLnNldEF0dHJpYnV0ZSgnYW5pbWF0aW9uJywgeydwcm9wZXJ0eSc6ICdwb3NpdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndG8nOiB7WDogMCwgeTogLTIuODM3LCB6OiAwfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdlYXNpbmcnOiAnZWFzZUluT3V0RWxhc3RpYycsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZHVyJzogJzEwMDAnfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwuZW1pdChgZ2FtZUVuZGApO1xyXG4gICAgICAgIH0sIDMwMDAwKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgfSk7XHJcblxyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG4gIFxyXG4gICAgfSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gIFxyXG4gICAgfSxcclxuICAgIHRpY2s6IGZ1bmN0aW9uIChlbGFwc2VkLCBkdCkge1xyXG4gICBcclxuICAgIH1cclxuICB9KSIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnaG92ZXItaGlnaGxpZ2h0ZXInLCB7XHJcbiAgc2NoZW1hOiB7XHJcbiAgICBjb2xvcjoge3R5cGU6ICdjb2xvcicsIGRlZmF1bHQ6ICd3aGl0ZSd9XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcy5lbDtcclxuICAgIHRoaXMuaGFuZGxlck9uRW50ZXIgPSBldnQgPT4gdGhpcy5vbkVudGVyKGV2dCk7XHJcbiAgICB0aGlzLmhhbmRsZXJPbkxlYXZlID0gZXZ0ID0+IHRoaXMub25MZWF2ZShldnQpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuaGFuZGxlck9uRW50ZXIpO1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuaGFuZGxlck9uTGVhdmUpO1xyXG4gIH0sXHJcbiAgb25FbnRlcjogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgbGV0IGN1cnNvciA9IGV2dC5kZXRhaWwuY3Vyc29yRWw7XHJcbiAgICB0aGlzLnNhdmVkQ29sb3IgPSBjdXJzb3IuZ2V0QXR0cmlidXRlKFwibWF0ZXJpYWxcIikuY29sb3I7XHJcbiAgICBjdXJzb3Iuc2V0QXR0cmlidXRlKFwibWF0ZXJpYWxcIiwgXCJjb2xvclwiLCB0aGlzLmRhdGEuY29sb3IpO1xyXG4gIH0sXHJcbiAgb25MZWF2ZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgbGV0IGN1cnNvciA9IGV2dC5kZXRhaWwuY3Vyc29yRWw7XHJcbiAgICBjdXJzb3Iuc2V0QXR0cmlidXRlKFwibWF0ZXJpYWxcIiwgXCJjb2xvclwiLCB0aGlzLnNhdmVkQ29sb3IpO1xyXG4gIH0sXHJcbiAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gdGhpcy5lbDtcclxuICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLmhhbmRsZXJPbkVudGVyKTtcclxuICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLmhhbmRsZXJPbkxlYXZlKTtcclxuICB9XHJcbn0pOyIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnbGlzdGVuLXRvJywge1xyXG4gIG11bHRpcGxlOiB0cnVlLFxyXG4gIHNjaGVtYToge1xyXG4gICAgZXZ0OiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICdjbGljayd9LFxyXG4gICAgdGFyZ2V0OiB7dHlwZTogJ3NlbGVjdG9yJ30sXHJcbiAgICBlbWl0OiB7dHlwZTogJ3N0cmluZyd9XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmRhdGEudGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5kYXRhLmV2dCwgZXZ0ID0+IHtcclxuICAgICAgdGhpcy5lbC5lbWl0KHRoaXMuZGF0YS5lbWl0KTtcclxuICAgIH0pXHJcbiAgfVxyXG59KTsiLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ3Njb3JlJywge1xyXG4gICAgbXVsdGlwbGU6IHRydWUsXHJcbiAgICBcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgIGxldCBiZXN0U2NvcmUgPSAwO1xyXG5cclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdoaXQnLCBldnQgPT4ge1xyXG4gICAgICAgIHNjb3JlKys7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlJykuc2V0QXR0cmlidXRlKCd0ZXh0JywgYHZhbHVlOiBTY29yZSA6ICR7c2NvcmV9YCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdnYW1lU3RhcnQnLCBldnQgPT4ge1xyXG4gICAgICAgIHNjb3JlID0gMDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUnKS5zZXRBdHRyaWJ1dGUoJ3RleHQnLCBgdmFsdWU6IFNjb3JlIDogJHtzY29yZX1gKTtcclxuXHJcblxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignZ2FtZUVuZCcsIGV2dCA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lRW5kZWRlZGVcIik7XHJcbiAgICAgICAgaWYoc2NvcmUgPiBiZXN0U2NvcmUpe1xyXG4gICAgICAgICAgYmVzdFNjb3JlID0gc2NvcmVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiZXN0U2NvcmUnKS5zZXRBdHRyaWJ1dGUoJ3RleHQnLCBgdmFsdWU6IEJlc3Qgc2NvcmUgOiAke2Jlc3RTY29yZX1gKTtcclxuICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgXHJcbiAgICB9LFxyXG4gICAgdGljazogZnVuY3Rpb24gKGVsYXBzZWQsIGR0KSB7XHJcbiAgIFxyXG5cclxuICAgIH1cclxuICB9KSIsIkFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnd2hlbi1oaXQnLCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaW5pdCB3aGVuIGl0XCIpXHJcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldnQgPT4ge1xyXG4gICAgICAgIC8vIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdhbmltYXRlLWhpdCcsXCJcIik7XHJcbiAgICAgICAgdGhpcy5lbC5lbWl0KGBhbmltVGFyZ2V0YCwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZWwuZW1pdChgaGl0YCk7XHJcbiAgICAgICAgdGhpcy5lbC5lbWl0KGBhbmltU3RhcnRgLCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgdGljazogZnVuY3Rpb24gKGVsYXBzZWQsIGR0KSB7XHJcblxyXG4gIFxyXG5cclxuXHJcbiAgfVxyXG4gIH0pOyIsInZhciBtYXAgPSB7XG5cdFwiLi9jdXJzb3ItbGlzdGVuZXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2N1cnNvci1saXN0ZW5lci5qc1wiLFxuXHRcIi4vZ2FtZS1sb29wLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9nYW1lLWxvb3AuanNcIixcblx0XCIuL2hvdmVyLWhpZ2hsaWdodGVyLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9ob3Zlci1oaWdobGlnaHRlci5qc1wiLFxuXHRcIi4vbGlzdGVuLXRvLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9saXN0ZW4tdG8uanNcIixcblx0XCIuL3Njb3JlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9zY29yZS5qc1wiLFxuXHRcIi4vd2hlbi1oaXQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL3doZW4taGl0LmpzXCIsXG5cdFwiY29tcG9uZW50cy9jdXJzb3ItbGlzdGVuZXIuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2N1cnNvci1saXN0ZW5lci5qc1wiLFxuXHRcImNvbXBvbmVudHMvZ2FtZS1sb29wLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9nYW1lLWxvb3AuanNcIixcblx0XCJjb21wb25lbnRzL2hvdmVyLWhpZ2hsaWdodGVyLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9ob3Zlci1oaWdobGlnaHRlci5qc1wiLFxuXHRcImNvbXBvbmVudHMvbGlzdGVuLXRvLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9saXN0ZW4tdG8uanNcIixcblx0XCJjb21wb25lbnRzL3Njb3JlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9zY29yZS5qc1wiLFxuXHRcImNvbXBvbmVudHMvd2hlbi1oaXQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL3doZW4taGl0LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2NvbXBvbmVudHMgc3luYyBcXFxcLmpzJFwiOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiXHJcbmZ1bmN0aW9uIGltcG9ydEFsbChyKSB7XHJcbiAgci5rZXlzKCkuZm9yRWFjaChyKTtcclxufVxyXG5cclxuaW1wb3J0QWxsKHJlcXVpcmUuY29udGV4dCgnLi9jb21wb25lbnRzJywgZmFsc2UsIC9cXC5qcyQvKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9