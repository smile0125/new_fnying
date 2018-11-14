window.shareData = {
    // 分享标题
    title: "风赢科技－成员介绍",
    // 分享描述
    desc: "我们的征途是星辰大海。",
    // 分享链接
    link: window.location.href,
    // 分享图标
    imgUrl: 'http://www.fnying.com/h5/1804/hb_intro/img/sharelogo.jpg',
    success: function () {},
    cancel: function () {}
};

$(function () {
    // 微信分享处理
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
});
