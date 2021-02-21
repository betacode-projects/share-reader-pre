// トークン取得・設定
let send_token = getParam('sender');
let recv_token = $.cookie('reciever');
//console.log(recv_token);
if (recv_token === undefined){
    recv_token = '';
}


$.ajax({
    url: RECIEVER_TOKEN_PAGE,
    type: 'post',
    data: {token: recv_token}
})
.done(function(data) {

    if (data['status'] === 'success'){
        // クッキー登録
        //console.log(data);
        $.cookie('reciever', data['data']['token'], {expires: 7, path: '/'});
        window.location.href = './download.html?sender=' + send_token;
    }
    else {
        $.removeCookie('reciever', { path: '/' });
        $('#status').html('<p>エラー: '+ data['messages']);
    }

}).fail(function(data){
    console.log(data);
});