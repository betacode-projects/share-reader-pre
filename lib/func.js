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
