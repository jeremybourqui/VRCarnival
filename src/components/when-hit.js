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