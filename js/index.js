window.shareData = {
    // 分享标题
    title: "风赢科技官网",
    // 分享描述
    desc: "风行天下，赢在中国！上海风赢网络科技有限公司官方网站（www.fnying.com）",
    // 分享链接
    link: window.location.href,
    // 分享图标
    imgUrl: 'http://www.fnying.com/img/share.jpg',
    success: function () {},
    cancel: function () {}
};

$('#bootstrap-touch-slider').bsTouchSlider();
$(function () {
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

    // 免费订阅按钮处理
    $('#email_btn').click(function () {
        var email = $('#email').val();
        // 检查输入合法性
        if (email.length <= 0) {
            layer.msg('请输入邮箱地址');
            return;
        }

        if (!IsEmail(email)) {
            layer.msg('邮箱地址有误');
            return;
        }

        var $this = $(this);
        if (DisableClick($this)) return;
        // 免费订阅处理
        LeaveEmail(email, uuid, function (response) {
            ActiveClick($this, '免费订阅');
            if (response.errcode == '0') {
                $('#email').val('');
            }
            layer.msg(response.errmsg);
        }, function (response) {
            ActiveClick($this, '免费订阅');
            layer.msg(response.errmsg);
        });
    });

    // 建议提交按钮处理
    $('#contact_btn').click(function () {
        var user_name = $('#user_name').val();
        var user_email = $('#user_email').val();
        var user_suggestion = $('#user_suggestion').val();
        // 检查输入合法性
        if (user_name.length <= 0) {
            layer.msg('请输入你的名字');
            return;
        }
        if (user_email.length <= 0) {
            layer.msg('请输入你的Email地址');
            return;
        }
        if (user_suggestion.length <= 0) {
            layer.msg('请输入你的宝贵意见和建议');
            return;
        }
        if (!IsEmail(user_email)) {
            layer.msg('邮箱地址有误');
            return;
        }

        var $this = $(this);
        if (DisableClick($this)) return;
        // 建议提交处理
        ContactUs(uuid, user_name, user_email, user_suggestion, function (response) {
            ActiveClick($this, '提交');
            if (response.errcode == '0') {
                $('#user_name').val('');
                $('#user_email').val('');
                $('#user_suggestion').val('');
            }
            layer.msg(response.errmsg);
        }, function (response) {
            ActiveClick($this, '提交');
            layer.msg(response.errmsg);
        });
    });

    //滚动
    $('#move_job').owlCarousel({
        items: 3,
        autoPlay: true
    });

    //nav toggle
    $(".navbar-right li").click(function () {
       $(this).addClass("active").siblings("li").removeClass("active");
    });

    //scroll nav
    var height = "";
    $(window).scroll(function () {
        height = $(window).scrollTop();
        if (height >= 280) {
            $("nav").slideDown();
            $("#scroll_top").slideDown().css("display", "flex");
        } else {
            $("nav").slideUp();
            $("#scroll_top").slideUp();
        }
    });

    //scroll top
    $("#scroll_top").click(function () {
        $("body,html").animate({scrollTop: 0}, 500);
    });

});