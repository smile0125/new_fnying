$(function () {
    var token = decodeURI(GetQueryString("user_token"));
    if (token) {
        $(".to_account").removeClass("none");
        $(".login,.register").remove();
    }
});