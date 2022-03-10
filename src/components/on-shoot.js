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