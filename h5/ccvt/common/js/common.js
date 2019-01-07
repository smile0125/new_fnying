// 设置cookies函数
function SetCookie(name, value) {
    var now = new Date();
    var time = now.getTime();
    // 有效期7天
    time += 3600 * 1000 * 24 * 7;
    now.setTime(time);
    document.cookie = name + "=" + escape(value) + '; expires=' + now.toUTCString();
}

// 取cookies函数
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}