function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
  try {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (E) {
    xmlhttp = false;
  }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function addEvent(elem, evType, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(evType, fn, false);
  }
  else if (elem.attachEvent) {
    elem.attachEvent('on' + evType, fn);
  }
  else {
    elem['on' + evType] = fn;
  }
}

function byId(node) {
    return typeof node == 'string' ? document.getElementById(node) : node;
}

function sendData(type, url, data, callback) {
  var xhr = getXmlHttp();
  xhr.open(type, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 ) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        console.log(xhr);
      }
    }
  }
  data = null;
  if (type === 'POST') {
    xhr.setRequestHeader('Content-Type', 'text/plain');
    data = 'data='+ encodeURIComponent(data);
  }
  xhr.send(data);
}