/**
 * 通知对话框弹层
 * @param msg 通知信息
 */
function AlertDialog(msg) {

  msg = msg ? msg : '通知信息';

  if(!$('#alert_dialog').length) {
    var dialog = '\
      <div id="alert_dialog" style="display: none;">\
       <div class="weui-mask"></div>\
       <div class="weui-dialog">\
        <div class="weui-dialog__hd">' + msg + '</div>\
        <div class="weui-dialog__ft">\
         <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>\
        </div>\
       </div>\
      </div>\
     ';
    $('body').append(dialog);
  } else {
    $('#alert_dialog .weui-dialog__hd').html(msg);
  }

  $('#alert_dialog').fadeIn('fast');
  $('#alert_dialog .weui-dialog__btn_primary').on('click',function(){
    $('#alert_dialog').fadeOut('fast');
  });

}

/**
 * 确认对话框弹层
 * @param title 标题
 * @param msg 对话信息
 * @param callback 确认执行操作
 */
function ConfimDialog(title, msg, suc_func) {

  title = title || '确认';
  msg = msg || '对话信息';
  suc_func = suc_func || $.noop;

  if(!$('#confim_dialog').length) {
    var dialog = '\
    <div id="confim_dialog" style="display: none;">\
     <div class="weui-mask"></div>\
     <div class="weui-dialog">\
      <div class="weui-dialog__hd"><strong class="weui-dialog_title">'+ title +'</strong></div>\
      <div class="weui-dialog__bd">' + msg + '</div>\
      <div class="weui-dialog__ft">\
       <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">取消</a>\
       <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>\
      </div>\
     </div>\
    </div>\
    ';
    $('body').append(dialog);
  } else {
    $('#confim_dialog .weui-dialog_title').html(title);
    $('#confim_dialog .weui-dialog__hd').html(msg);
  }

  $('#confim_dialog').fadeIn('fast');
  $('#confim_dialog .weui-dialog__btn_primary').on('click',function() {
    suc_func();
    $('#confim_dialog').remove();
  });
  $('#confim_dialog .weui-dialog__btn_default').on('click',function(){
    $('#confim_dialog').fadeOut('fast',function(){
      $('#confim_dialog').remove();
    });
  });
}

/**
 * 发出成功提示音
  */
function SuccessAudio() {

  if(!$('#success_audio').length) {
    var audio = '\
      <audio id="success_audio">\
        <source src="audio/success.mp3" type="audio/mpeg">\
      </audio>\
    ';
    $('body').append(audio);
  }

  $('#success_audio')[0].play();
}

/**
 * 操作结果提示弹层
 * @param msg 提示信息
 */
function Toast(msg) {
  msg = msg ? msg : '已完成';

  if(!$('#toast').length) {
    var toast = '\
    <div id="toast" style="display: none;">\
     <div class="weui-mask_transparent"></div>\
     <div class="weui-toast">\
      <i class="weui-icon-success-no-circle weui-icon_toast"></i>\
      <p class="weui-toast__content">' + msg + '</p>\
     </div>\
    </div>\
    ';
    $('body').append(toast);
  } else {
    $('#toast .weui-toast__content').html(msg);
  }

  var $toast = $('#toast');
  if ($toast.css('display') != 'none') return;

  $toast.fadeIn(100);
  setTimeout(function () {
    $toast.fadeOut(100);
  }, 2000);
}

/**
 * 数据加载提示弹层
 * @param msg 提示信息
 */
function LoadingToast(msg) {
  msg = msg ? msg : '数据加载中';

  if(!$('#loadingToast').length) {
    var toast = '\
    <div id="loadingToast" style="display: none;">\
        <div class="weui-mask_transparent"></div>\
        <div class="weui-toast">\
            <i class="weui-loading weui-icon_toast"></i>\
            <p class="weui-toast__content">' + msg + '</p>\
        </div>\
    </div>\
    ';
    $('body').append(toast);
  } else {
    $('#loadingToast .weui-toast__content').html(msg);
  }

  var $loadingToast = $('#loadingToast');
  if ($loadingToast.css('display') != 'none') return;

  $loadingToast.fadeIn(100);
  setTimeout(function () {
    $loadingToast.fadeOut(100);
  }, 2000);
}

// 设置cookies函数（24小时有效）
function SetCookie(name, value) {
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000 * 24;
    now.setTime(time);
    document.cookie = name + "=" + escape(value) + '; expires=' + now.toUTCString();
}

// 取cookies函数
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

// 删除cookie函数
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// 取得URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 用户ID格式检查
function IsUid(s) {
    var patrn = /^[a-z]{3}[0-9]{2,5}$/;
    return patrn.exec(s);
}

// 调用API失败通用处理
function CallApiError(response) {
    AlertDialog(response.errmsg);
    return false;
}

// 调用API共通函数
function CallApi(api_url, post_data, suc_func, error_func) {

    var api_site = 'http://www.fnying.com/php/';

    post_data = post_data || {};
    suc_func = suc_func || $.noop;
    error_func = error_func || CallApiError;

    //console.log('Call API:' + api_url);
    //console.log(JSON.stringify(post_data));

    $.ajax({
        url: api_site + api_url,
        dataType: "jsonp",
        data: post_data,
        success: function(response) {
            //console.log(JSON.stringify(response));
            // API返回失败
            if (response.errcode != 0) {
                error_func(response);
            } else {
                // 成功处理数据
                suc_func(response);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，请稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}

// 用户本地Cookie删除处理
function DelUserCookie() {
    // 退出删除所有Cookie
    DelCookie('openid');
    DelCookie('staff_name');
}

// 获取用户UUID
function GetUUID(post_data, suc_func, error_func) {
var api_url = 'get_uuid.php';
CallApi(api_url, post_data, suc_func, error_func);
}

// 用户是否已登录
function IsLogin() {
    return GetCookie('openid') != null && GetCookie('staff_name') != null;
}

// 是否使用微信浏览器
function IsWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    } else {
        return false;
    }
}
  
// 取得浏览器信息
function GetBrowserInfo() {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

/**
 * 按钮点击中
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"处理中"
 * @return {boolean}
 */
function BtnOnClick($this, btnText) {
    if (!$this) {
      console.warn("$this 不能为空");
      return;
    }

    // 去除样式
    $this.removeClass("weui-btn_disabled");
    // 添加样式
    $this.addClass("weui-btn_loading");
    // 去除onclick事件
    $this.attr('onclick', 'javascript:void(0);');
    // 按钮内容变更
    btnText = btnText ? btnText : "处理中";
    $this.html(btnText);
}

/**
 * 按钮有效
 * @param $this 按钮对象
 * @param jsfunc 执行JS函数
 * @param btnText 按钮文本内容 默认为"处理中"
 */
function BtnEnable($this, jsfunc, btnText) {
    if (!$this) {
      console.warn("$this 不能为空");
      return;
    }

    // 去除样式
    $this.removeClass("weui-btn_loading");
    $this.removeClass("weui-btn_disabled");
    // 设置事件
    $this.attr('onclick', jsfunc);
    // 按钮内容变更
    btnText = btnText ? btnText : "确认";
    $this.html(btnText);
}

/**
 * 按钮无效
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"确认"
 */
function BtnDisable($this, btnText) {
    if (!$this) {
      console.warn("$this 不能为空");
      return;
    }

    // 去除样式
    $this.removeClass("weui-btn_loading");
    // 添加样式
    $this.addClass("weui-btn_disabled");
     // 去除onclick事件
    $this.attr('onclick', 'javascript:void(0);');
    // 按钮内容变更
    btnText = btnText ? btnText : "确认";
    $this.html(btnText);
}

function FormatDateTime(date, fmt) {
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    
    if(/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt;
}