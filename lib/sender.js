// 送信者トークンチェック
checkSenderToken();
var sender_token = $.cookie('sender');
var link_flag = true;

$(function(){

    // アップロードファイル削除
    $('#clearFile').click(function(event){
        if (!link_flag)
            return false;
        link_flag = false;
        $inner_html = $('#clearFile').html();
        $('#clearFile').html('削除中...');

        $.ajax({
            url: REMOVE_SENDER_TOKEN_PAGE,
            type: 'post',
            data: {token: sender_token}
        })
        .done(function(data) {
            console.log(data);
            if (data['data']['flag']){
                $.removeCookie('sender', { path: '/' });
                window.location.href = './upload.html';
            }
            else{
                alert(data['messages']);
            }
        }).fail(function(data){
            $.removeCookie('sender', { path: '/' });
            window.location.href = './upload.html?error=3';
        }).always(function(data){
            link_flag = true;
            $('#clearFile').html($inner_html);
        });
    });
});


// ダウンロード用QRコード表示
function onShowDownloadQR(){

}


// ファイル操作権限移行
function onMovePermission(){

}
