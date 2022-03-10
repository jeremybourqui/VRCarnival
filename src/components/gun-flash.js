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