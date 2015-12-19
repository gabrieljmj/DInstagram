/* END */
function end (arr) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Legaev Andrey
  // +    revised by: J A R
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   restored by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: Uses global: php_js to store the array pointer
  // *     example 1: end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'});
  // *     returns 1: 'Zonneveld'
  // *     example 2: end(['Kevin', 'van', 'Zonneveld']);
  // *     returns 2: 'Zonneveld'
  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function (value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      ct++;
      var val = arr[k];
    }
    if (ct === 0) {
      return false; // Empty
    }
    pointers[arrpos + 1] = ct - 1;
    return val;
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] = arr.length - 1;
  return arr[pointers[arrpos + 1]];
}


/* GET */
function urlDecode(string, overwrite){
    if(!string || !string.length){
        return {};
    }
    var obj = {};
    var pairs = string.split('&');
    var pair, name, value;
    var lsRegExp = /\+/g;
    for(var i = 0, len = pairs.length; i < len; i++){
        pair = pairs[i].split('=');
        name = unescape(pair[0]);
        value = unescape(pair[1]).replace(lsRegExp, " ");
        //value = decodeURIComponent(pair[1]).replace(lsRegExp, " ");
        if(overwrite !== true){
            if(typeof obj[name] == "undefined"){
                obj[name] = value;
            }else if(typeof obj[name] == "string"){
                obj[name] = [obj[name]];
                obj[name].push(value);
            }else{
                obj[name].push(value);
            }
        }else{
            obj[name] = value;
        }
    }
    return obj;
}

function jsGet(param){
    var wl = window.location.href;
    var params = urlDecode(wl.substring(wl.indexOf("?")+1));
    return(params[param]);
}

/* SLEEP */
function sleep(milliseconds) {
    document.devCheater.sleep(milliSeconds);
}

/* ARRAY_SEARCH */
function verifyIfElementExists(array, element){
    var results = 0;
    for(i = 0; i < array.length; i++){
        if(array[i] == element){
            results += 1;
        }
    }
    if(results == 0){
        return false;
    }else{
        return true;
    }
}

/* TABS */
function tabs(){
    var imgBtn = '#tabs-img';
    var vdBtn = '#tabs-vd';
    var imgsDiv = '#media-images';
    var vdsDiv = '#media-videos';
    $(imgBtn).attr('disabled', 'disabled');
    $(imgBtn).click(function(){
        if($(imgsDiv).is(':visible') == false){
            $(vdBtn).removeAttr('disabled');
            $(imgsDiv).show();
            $(vdsDiv).hide();
            $(imgBtn).attr('disabled', 'disabled');
        }
        return false;
    });
            
    $(vdBtn).click(function(){
        if($(vdsDiv).is(':visible') == false){
            $(imgBtn).removeAttr('disabled');
            $(vdsDiv).show();
            $(imgsDiv).hide();
            $(vdBtn).attr('disabled', 'disabled');
        }
        return false;
    });
}

$.fn.countdown = function(seconds){
    $(this).html(seconds);
    var seconds = $(this).html();
    setInterval(function(){
        $(this).html(seconds--);
    }, 1000);
}