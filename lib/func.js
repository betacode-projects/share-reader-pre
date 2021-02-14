function set_token(token_user, done_func, fail_func){
    // トークンチェック
    let token = $.cookie(token_user);
    let req_list = {status: token_user};
    if (token !== undefined || token !== 'undefined'){
        req_list['token'] = token;
    }
    //console.log(token);
    //console.log(req_list);

    // 非同期処理部分
    $.ajax({
        url: TOKEN_PAGE,
        type: 'post',
        data: req_list
    })
    .done(done_func)
    .fail(fail_func);
}