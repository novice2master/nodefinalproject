url = (window.location.href.split('/')[3]).split('_');
temp = [];
for (var i in url) {
    temp.push(url[i].charAt(0).toUpperCase() + url[i].slice(1))
}
$("#thread-titles").html((temp.join(' ')));