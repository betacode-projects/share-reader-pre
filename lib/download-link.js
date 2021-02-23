// トークン取得・設定
let send_token = getParam('sender');
let recv_token = $.cookie('reciever');
let recv_secret_token = $.cookie('reciever_secret');

if (recv_token === undefined){
    recv_token = '';
}
if (recv_secret_token === undefined){
    recv_secret_token = '';
}

start_setting_reciever();


// 受信者トークン生成
function start_setting_reciever(){
    $.ajax({
        url: RECIEVER_TOKEN_PAGE,
        type: 'post',
        data: {token: recv_token, secret_token: recv_secret_token}
    })
    .done(function(data) {

        if (data['status'] === 'success'){
            // クッキー登録
            //console.log(data);
            $.cookie('reciever', data['data']['token'], {expires: 7, path: '/'});
            $.cookie('reciever_secret', data['data']['secret_token'], {expires: 7, path: '/'});

            set_qr_read_list();
        }
        else {
            $('#status').html('<p>エラー: '+ data['messages']);
        }

    }).fail(function(data){
        console.log(data);
    });
}


// QRコード読み取りリストに追加
function set_qr_read_list(){
    $.ajax({
        url: SET_FILE_PAGE,
        type: 'post',
        data: {'send_token': send_token, 'recv_token': $.cookie('reciever')}
    })
    .done(function(data) {
        console.log(data);
        if (data['status'] === 'success'){
            window.location.href = './download.html';
        }
        else {
            $('#status').html('<p>エラー: '+ data['messages']);
        }
    }).fail(function(data){
        $('#status').html('<p>エラー: '+ data);
    });
}


function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}