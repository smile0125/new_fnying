window.shareData = {
    // 分享标题
    title: "4月20日风赢科技活动预约",
    // 分享描述
    desc: "代号：HiveBanks，时间：本周五下午三点，坐标：魔都北外滩白金湾，期待与您一起揭开全球领先的分布式开源数字资产管理平台的神秘面纱。",
    // 分享链接
    link: window.location.href,
    // 分享图标
    imgUrl: 'http://www.fnying.com/staff/wx/img/share.jpg',
    success: function () {},
    cancel: function () {}
};
        
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

    // 接受邀请按钮处理
    $('.sign_btn').click(function () {
        var user_name = $(this).parent().find(".username").val();
        var user_phone = $(this).parent().find(".phone").val();
        // 检查输入合法性
        if (user_name.length <= 0) {
            layer.msg('请输入你的姓名');
            return;
        }
        if (user_phone.length <= 0) {
            layer.msg('请输入手机号码');
            return;
        }
        if (!IsPhone(user_phone)) {
            layer.msg('手机号码有误');
            return;
        }

        var $this = $(this);
        if (DisableClick($this)) return;
        // 建议提交处理
        ContactUs(uuid, user_name, user_phone, "预约参加风赢180420项目发布会", function (response) {
            if (response.errcode == '0') {
              $('.username').val('');
              $('.phone').val('');
              ActiveClick($this, '预约成功');
            }
            layer.msg(response.errmsg);
        }, function (response) {
            ActiveClick($this, '点击预约');
            layer.msg(response.errmsg);
        });
    });
});


var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: true,

   // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
})

//屏幕自适应
if(/Android (\d+\.\d+)/.test(navigator.userAgent)) {
    var version = parseFloat(RegExp.$1);
    if(version>2.3) {
        var phoneScale = parseInt(window.screen.width) / 640;
        document.write('<meta name="viewport" content="width=640, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');
    } else {
        document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
    }
} else {
    document.write('<meta name="viewport" content="width=640, user-scalable=no">');
}

//切换图片
/*var index=0,
    len=2;

$('.next').click(function(){

  index++;AlertDialog(index);
  if (index>len) index=0;
  changeImg();
})

function changeImg(){
  //隐藏page-01~page-03
  $('.page-01').css({display:"none"});
  $('.2').css({display:"none"});
  $('.03').css({display:"none"});
  //找到当前id对应的div，让其显示
  if (index==0) {
    $('.page-01').css({display:"block"});
  }
  if (index==1) {
    $('.2').css({display:"block"});
  }
  if (index==2) {
    $('swiper-slide-active').css({display:"none"});
    $('.03').css({display:"block"});
  }
}*/