AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('click', evt => {
      console.log(evt);
    });

    this.el.addEventListener('open', evt => {
      console.log('open');
    });
    this.el.addEventListener('close', evt => {
      console.log('close');
    });
  }
});