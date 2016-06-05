console.log('HI');

document.querySelector('script[src="//instagramstatic-a.akamaihd.net/bluebar/4206917/bundles/pt_BR_webpack-common.js"]').outerHTML='';
document.querySelector('script[src="//instagramstatic-a.akamaihd.net/bluebar/4206917/bundles/pt_BR_FeedPage.js"]').outerHTML='';

var photos = document.getElementsByClassName('_22yr2 _e0mru');

for (var k in photos) {
    if (photos.hasOwnProperty(k)) {
        var dataIdParts = photos[k].getAttribute('data-reactid').split('$'),
            url = dataIdParts[dataIdParts.length - 1].replace('=2', ':');
        url = url.split('=1').join('.');

        photos[k].innerHTML = '<img src="' + url + '">';
    }
}