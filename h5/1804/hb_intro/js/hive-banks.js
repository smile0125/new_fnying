$(function () {
  
  // 分享标题
  var ShareTitle = 'HiveBanks白皮书兼概要设计（中文版）';
  // 分享描述
  var ShareDesc = '蜂巢项目白皮书兼概要设计（中文版）。';
  // 分享链接
  var ShareLink = window.location.href;
  // 分享图标
  var ShareimgUrl = 'http://www.fnying.com/h5/1804/hb_intro/img/sharelogo.jpg';
  //分享成功
  var friendcallback = function(res) {  
            alert("分享成功");  
  };  
  //取消分享
  var canelShare=function(res){
            alert("已取消");
  }
  
  // 微信配置启动
  wx_config();

  wx.ready(function() {
    //分享到朋友圈
      wx.onMenuShareTimeline({
          title: ShareTitle,
          desc: ShareDesc,
          link: ShareLink,
          imgUrl: ShareimgUrl,
          success: function () {
              // 用户确认分享后执行的回调函数
              friendcallback(res);
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
              canelShare(res);
          }
      });
      //分享给朋友
      wx.onMenuShareAppMessage({
          title:ShareTitle,
          desc: ShareDesc,
          link: ShareLink,
          imgUrl: ShareimgUrl,
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
              // 用户确认分享后执行的回调函数
              friendcallback(res);
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
              canelShare(res);
          }
      });
      //分享到QQ
      wx.onMenuShareQQ({
          title:ShareTitle,
          desc: ShareDesc,
          link: ShareLink,
          imgUrl: ShareimgUrl,
          success: function () {
              // 用户确认分享后执行的回调函数
              friendcallback(res);
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
              canelShare(res);
          }
      });
      //分享到腾讯微博
      wx.onMenuShareWeibo({
          title:ShareTitle,
          desc: ShareDesc,
          link: ShareLink,
          imgUrl: ShareimgUrl,
          success: function () {
              // 用户确认分享后执行的回调函数
              friendcallback(res);
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
              canelShare(res);
          }
      });
      //分享到QQ空间
      wx.onMenuShareQZone({
          title:ShareTitle,
          desc: ShareDesc,
          link: ShareLink,
          imgUrl: ShareimgUrl,
          success: function () {
              // 用户确认分享后执行的回调函数
              friendcallback(res);
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
              canelShare(res);
          }
      });


  });

//导航栏显示和隐藏
  $('.bar').click(function(){ 
      $('.nav-item').css({display:"block"});
  })
  $('#detail').click(function(){
    $('.nav-item').css({display:"none"});
  })  
  
});