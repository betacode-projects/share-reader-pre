var qr_reader_flag = false;
var count = 0;
var reader_list = [];

// QRコード読み込み
var html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250 });


function onScanSuccess(qrCodeMessage) {
    if (reader_list.indexOf(qrCodeMessage) !== -1 || qr_reader_flag){
        return;
    }

    console.log(qrCodeMessage);
    qr_reader_flag = true;
    $('#history').append('<p>確認中 - '+ qrCodeMessage +'</p>');

    $.ajax({
        url: SET_FILE_PAGE,
        type: 'post',
        data: {token: sender_token, recv_token: qrCodeMessage}
    })
    .done(function(data) {
        console.log(data);
        if (data['data']['flag']){
            $('#history p:last').remove();
            $('#history').append('<p>'+ ++count +' - '+ qrCodeMessage +'</p>');
            reader_list.push(qrCodeMessage);
        }
        else{
            $('#history p:last').remove();
            $('#history').append('<p>エラー - '+ qrCodeMessage +'</p>');

            if (data['code'] === 'NG')
                reader_list.push(qrCodeMessage);
        }
    }).fail(function(data){
        console.log(data);
    }).always(function(data){
        qr_reader_flag = false;
    });

    //$('#history').append('<p>'+ ++count +' - '+ qrCodeMessage +'</p>');
}
function onScanError(errorMessage) {
    // handle on error condition, with error message
}

html5QrcodeScanner.render(onScanSuccess, onScanError);