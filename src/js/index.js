function Game() {
    this.init();
}

Game.prototype.init = function () {
    var domItems = document.querySelectorAll('.prize-item');
    var domLamp = document.querySelector('.lamp');
    var domHandle = document.querySelector('.handle');
    var timer = null;

    function selected() {
        domItems.forEach(function (v, i) {
            v.classList.add('prize-item_selected4');
        });
    }

    setTimeout(function () {
        fnHandleMove();
        setTimeout(function () {
            selected();
            fnLampMove();
            setTimeout(function () {
                fnLampStop();
                fnHandleStop();
            }, 4000);
        }, 400);
    }, 1000);


    function fnLampMove() {
        timer = setInterval(function () {
            domLamp.classList.toggle('lamp_selected');
        }, 60);
    }

    function fnLampStop() {
        clearInterval(timer);
    }

    function fnHandleMove() {
        var time = 200;
        setTimeout(function () {
            domHandle.classList.remove('handle_selected1');
            domHandle.classList.add('handle_selected2');
            setTimeout(function () {
                domHandle.classList.remove('handle_selected2');
                domHandle.classList.add('handle_selected3');
            }, time);
        }, time);
    }

    function fnHandleStop() {
        domHandle.classList.add('handle_selected1');
        domHandle.classList.remove('handle_selected2');
        domHandle.classList.remove('handle_selected3');
    }
};

new Game();
