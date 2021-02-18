// トークン取得・設定
let recv_token = $.cookie('reciever');
//console.log(recv_token);
if (recv_token === undefined){
    recv_token = '';
}
auth_tokens();


function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function start_download(recv_token, send_token){
    console.log('受信者トークン: '+ recv_token);
    console.log('送信者トークン: '+ send_token);
}


// 非同期処理部分
function auth_tokens(){
    $.ajax({
        url: RECIEVER_TOKEN_PAGE,
        type: 'post',
        data: {token: recv_token}
    })
    .done(function(data) {
        if (data['status'] === 'success'){
            $.cookie('reciever', data['data']['token'], {expires: 7, path: '/'});
            start_download(data['data']['token'], getParam('sender'));
        }
        else {
            $('#qrcode').html('エラー: '+ data['messages']);
        }

    }).fail(function(data){
        console.log(data);
        $('#qrcode').html('エラー: APIサーバーにアクセスできませんでした。');
    });
}
