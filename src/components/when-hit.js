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