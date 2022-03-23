AFRAME.registerComponent('toggle-visibility', {
    init: function () {
        this.el.addEventListener('click', evt => this.el.setAttribute('display', 'none'));
    },

});