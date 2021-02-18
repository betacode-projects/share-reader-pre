function checkSenderToken(){
    // 送信者トークンチェック
    $(document).ready( function(){
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
            if (data['data']['flag']){
                return;
            }
            else if(!data['data']['flag']){
                alert(data['messages']);
            }
        
            $.removeCookie('sender', { path: '/' });
            window.location.href = './upload.html?error=2';
        
        }).fail(function(data){
            $.removeCookie('sender', { path: '/' });
            window.location.href = './upload.html?error=3';
        });
    });
}


function checkRecieverToken(show_qr_flag = true){
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
            // QRコード生成
            if (show_qr_flag){
                $('#qrcode').html('');
                $('#qrcode').qrcode({text: data['data']['token'], correctLevel : 2});
            }
        }
        else if(show_qr_flag){
            $('#qrcode').html('エラー: '+ data['messages']);
        }
    
    }).fail(function(data){
        console.log(data);
        $('#qrcode').html('エラー: APIサーバーにアクセスできませんでした。');
    });
}
