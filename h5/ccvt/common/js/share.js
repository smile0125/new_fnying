var share_title = document.getElementsByTagName("title")[0].innerText;
var share_desc = document.getElementsByTagName("meta")["description"].getAttribute("content");

window.shareData = {
    // 分享标题
    title: share_title,
    // 分享描述
    desc: share_desc,
    // 分享链接
    link: window.location.href,
    // 分享图标
    imgUrl: 'http://www.fnying.com/h5/ccvt/common/img/ccvt.png',
    success: function () {},
    cancel: function () {}
};

window.onload = function () {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        $.getScript("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", function () {
            // 微信配置启动
            wx_config();
            wx.ready(function() {
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareAppMessage(shareData);
            });
        });
    }
    var uuid = GetCookie('UUID');
    if (!uuid) {
        uuid = new Date().getTime();
        // 取得UUID
        GetUUID('', function (response) {
            if (response.errcode == '0') {
                uuid = response.uuid;
                SetCookie('UUID', uuid);
            }
        }, function (response) {});
    }
};