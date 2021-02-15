$('#file').change(function(event) {
    // 多重送信を防ぐため通信完了までボタンをdisableにする
    event.preventDefault();
    let fd = new FormData($('#upload').get(0));
    if (fd === undefined){
        return;
    }

    $.ajax({
        url: UPLOAD_PAGE,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        dataType: 'json'

    }).done(function(e) {
        console.log(e);
    }).fail(function(e){
        console.log(e);
    });

    // ファイル読み込み
    /*
    let reader = new FileReader(); 
    reader.onload = function(e){ 
        console.log(reader.result);
        $.ajax({
            url: UPLOAD_PAGE,
            type: 'post',
            data: reader.result,
            processData: false,
            contentType: false,
        
        }).done(function(e){
            console.log(e);
        })
        .fail(function(e){
            console.log(e);
        });
    }
    reader.readAsArrayBuffer(_file); 
    */

});