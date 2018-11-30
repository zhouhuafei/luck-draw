var items = document.querySelectorAll('.prize-item');

function selected() {
    items.forEach(function (v, i) {
        v.classList.add('prize-item_selected4');
    });
}

setTimeout(function () {
    selected();
}, 1000);
