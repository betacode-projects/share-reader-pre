// トークン取得・設定
let recv_token = $.cookie('reciever');
console.log(recv_token);
if (recv_token === undefined){
    recv_token = '';
}

// 非同期処理部分
checkRecieverToken();


// ファイルダウンロード
var interval_flag = false;
var interval = setInterval(function(){
    if (interval_flag)
        return;

    interval_flag = true;
    $.ajax({
        url: CHECK_FILE_PAGE,
        type: 'post',
        data: {token: recv_token}
    })
    .done(function(data) {
        if (data['status']['data']){
            window.location.href = './download.html?sender=' + data['data']['token'];
        }
    }).fail(function(data){
        console.log(data);
    }).always(function(data){
        interval_flag = false;;
    });
},3000);
