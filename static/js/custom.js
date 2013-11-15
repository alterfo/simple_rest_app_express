var load = '<img src="i/load.gif" alt="" id="load"/>'

function getUsers() {
  sendData('GET', 'http://10.10.108.113:3000/users', null, function(req) {
        var result = JSON.parse(req), rows = '';
        if (result != false) {
          for (var i = 0, len = result.length; i < len; i++) {
                rows += '<tr><td>' + (i + 1) + '</td><td>' + result[i].name + '</td><td>' + result[i].email + '</td> \
                  <td> \
                    <a href="#delete" class="delete" userid="'+ result[i]._id + '">Удалить</a> \
                    <a href=""></a> \
                    <a href=""></a> \
                  </td> \
                </tr>';

            }
        } else {
          rows += '<tr><td><strong>Нет данных</strong></td></tr>';
        }
        byId('list').innerHTML = '<table id="users"><tr><th>№</th><th>Имя</th><th>Е-мэйл</th><th>Actions</th>' + rows + '</table><input type="button" />';
        
        var els = document.getElementsByClassName('delete'), elnum = els.length, element;
        for (var j = 0; j < elnum; j++) {
          var el = els[j];
          addEvent(el, 'click', function() {
              sendData('DELETE', 'http://10.10.108.113:3000/user/' + el.getAttribute('userid'), null, function(response) {
                  getUsers();
                });
            });
        }
      });
}

window.onload = getUsers();