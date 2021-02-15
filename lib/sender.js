// 送信者トークンチェック
let sender_token = $.cookie('sender');
if (sender_token === undefined){
    window.location.href = './upload.html?error=1';
}

$.ajax({
    url: SENDER_TOKEN_PAGE,
    type: 'post',
    data: {token: sender_token}
})
.done(function(data) {
    console.log(data);
    if (!data['data']['flag']){
        $.removeCookie('sender');
        window.location.href = './upload.html?error=2';
    }
}).fail(function(data){
    $.removeCookie('sender');
    window.location.href = './upload.html?error=3';
});