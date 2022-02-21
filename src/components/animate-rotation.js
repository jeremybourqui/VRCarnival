AFRAME.registerComponent('animate-rotation', {
  multiple: true,
  schema: {
    speed: {type: 'number', default: 10},
    axe: {type: 'string', default: 'x'}
  },
  init: function () {
    console.log(this.data.speed)
  },
  remove: function () {

  },
  update: function () {

  },
  tick: function (elapsed, dt) {
      //this.el.setAttribute('rotation', this.data.axe, elapsed / this.data.speed);
      this.el.object3D.rotation[this.data.axe] = THREE.MathUtils.degToRad(elapsed / this.data.speed);

  }
})