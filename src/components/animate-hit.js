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