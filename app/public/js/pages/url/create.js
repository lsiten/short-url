(function (window, $) {
  var DEVICE_ID = 'DEVICE_ID'
  var myDeviceId = localStorage.getItem(DEVICE_ID);
  var logs = [];
  var copyObj =new copy_txt();
  // 渲染log
  function renderLogs (list) {
    logs = list;
    let content = '';
    for(var i = 0; i < logs.length; i++) {
      content += '<p><span>短链接:'+ logs[i].shortUrl +'</span><span>长链接:'+ logs[i].longUrl +'</span><span class="url-copy" data-url="' + logs[i].shortUrl + '">复制</span></p>';
    }
    $('#page-result-box').html(content);
  }
  // 初始化log数据
  function initLogsData (id) {
    console.log(id);
    $.ajax({
      url: '/url/geturllog',
      method: 'post',
      headers: {
        'x-csrf-token': getCookie("csrfToken"),
      },
      data: {
        user: id,
      },
      dataType: 'json',
      success: function (data) {
        if (data.code === 200) {
          renderLogs(data.data)
        } else {
          alert(data.message);
        }
      }
    })
  }
  // 在log前面插入一条log数据
  function unshiftLog (log) {
    if (logs.filter(function (item) {
      return item.shortUrl === log.shortUrl
    }).length < 1) {
      // 插入
      logs.unshift(log);
      $('#page-result-box').prepend('<p><span>短链接:'+ log.shortUrl +'</span><span>长链接:'+ log.longUrl +'</span><span class="url-copy" data-url="' + log.shortUrl + '">复制</span></p>')
    }
  }
  if (!myDeviceId) {
    Fingerprint2.get(function(components){
      var values = components.map(function (component) { return component.value })
      var myDeviceId = Fingerprint2.x64hash128(values.join(''), 31)
      localStorage.setItem(DEVICE_ID, myDeviceId);
    })
  } else {
    initLogsData(myDeviceId);
  }

  $(document).ready(function () {
    $('#submit-button').on('click', function() {
      var url = $("#long-url").val();
      if (!url) {
        alert('请输入链接');
        return false;
      }
      // 如果log内有，则不去请求接口
      if (logs.filter(function (item) {
        return item.longUrl === url
      }).length > 0) {
        return false;
      }

      $.ajax({
        url: '/url/create',
        data: {
          url,
          user: myDeviceId,
        },
        success: function (data) {
          if (data.code === 200) {
            unshiftLog({
              shortUrl: data.data.url,
              longUrl: url,
            })
          } else {
            alert(data.message);
          }
        }
      })
    })
    $('#page-result-box').on('click', '.url-copy', function () {
      copyObj.copy($(this).data('url'));
      alert($(this).data('url') + '已复制到剪切板');
    })
  })
})(window, $)