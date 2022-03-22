AFRAME.registerComponent('game-loop', {
    multiple: true,
    
    init: function () {

      this.el.addEventListener('click', evt => {
        console.log("gameloop");
        // animer cible
        // chrono 1 minute

        gameStart = () => {
            document.querySelector('#shooting-range').setAttribute('score', null);
            console.log(document.querySelector('#shooting-range'));
            console.log("gamestart");
            this.el.emit(`gameStart`);
        };
        gameStart();

        setTimeout(() =>{
            document.querySelector('#shooting-range').removeAttribute('score');
            document.querySelector('#shooting-range').removeAttribute('score');
            console.log(document.querySelector('#shooting-range'));
            console.log("gameend");
            this.el.emit(`gameEnd`);
        }, 10000);
        

     });

    },
    remove: function () {
  
    },
    update: function () {
  
    },
    tick: function (elapsed, dt) {
   
    }
  })