// トークン取得・設定
set_token(token_user = 'reciever',
done_func = function(data) {
    // クッキー登録
    $.cookie(token_user, data['data']['token'], {expires: 7, path: '/'});
    // QRコード生成
    $('#qrcode').qrcode({text: data['data']['token']});
},
fail_func = function(data){
    console.log(data);
});