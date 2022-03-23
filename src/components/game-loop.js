AFRAME.registerComponent('game-loop', {
    multiple: true,
    
    init: function () {

      this.el.addEventListener('click', evt => {
        console.log("gameloop");
        // animer cible
        // chrono 1 minute
        
        gameStart = () => {
            document.querySelector('#shooting-range').setAttribute('score', null);
            document.querySelector('#targets').setAttribute('animation', {'property': 'position',
                                                                        'to': {x: 0, y: 0, z: 0},                                 
                                                                        'easing': 'easeInOutElastic',                                 
                                                                        'dur': '1000'});
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
        }, 5000);
        

     });

    },
    remove: function () {
  
    },
    update: function () {
  
    },
    tick: function (elapsed, dt) {
   
    }
  })