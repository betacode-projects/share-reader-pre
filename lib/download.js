// トークン取得・設定
let recv_token = $.cookie('reciever');
console.log(recv_token);
if (recv_token === undefined){
    recv_token = '';
}


// 非同期処理部分
$.ajax({
    url: RECIEVER_TOKEN_PAGE,
    type: 'post',
    data: {token: recv_token}
})
.done(function(data) {

    if (data['status'] === 'success'){
        // クッキー登録
        $.cookie('reciever', data['data']['token'], {expires: 7, path: '/'});
        // QRコード生成
        $('#qrcode').html('');
        $('#qrcode').qrcode({text: data['data']['token']});
    }
    else{
        $('#qrcode').html('エラー: '+ data['messages']);
    }

}).fail(function(data){
    console.log(data);
    $('#qrcode').html('エラー: APIサーバーにアクセスできませんでした。');
});