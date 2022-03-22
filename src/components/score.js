AFRAME.registerComponent('score', {
    multiple: true,
    
    init: function () {

      let score = 0;
      let bestScore = 0;

      this.el.addEventListener('hit', evt => {
        score++;
        document.querySelector('#score').setAttribute('text', `value: Score : ${score}`);
      });

      this.el.addEventListener('gameStart', evt => {
        score = 0;
        document.querySelector('#score').setAttribute('text', `value: Score : ${score}`);


      });
      
      this.el.addEventListener('gameEnd', evt => {
        console.log("gameEndedede");
        if(score > bestScore){
          bestScore = score
        };
        document.querySelector('#bestScore').setAttribute('text', `value: Best score : ${bestScore}`);
      });



    },
    remove: function () {
  
    },
    update: function () {
  
    },
    tick: function (elapsed, dt) {
   

    }
  })