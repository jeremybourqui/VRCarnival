AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('click', evt => {
      console.log(evt);
    });
  }
});