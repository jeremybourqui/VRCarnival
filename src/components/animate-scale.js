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