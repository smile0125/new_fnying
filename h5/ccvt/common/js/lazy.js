    var imgs = document.querySelectorAll('img');
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var winHeight = window.innerHeight;
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].offsetTop < scrollTop + winHeight) {
                if(imgs[i].getAttribute('data-src')){
                    imgs[i].src = imgs[i].getAttribute('data-src');
                }
            }
        }
    };