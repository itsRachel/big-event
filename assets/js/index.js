// -----------------  获取用户的信息，把信息渲染到页面中  ------------------
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 0) {
                console.log(res);
                // 1. 设置欢迎语
                // 有昵称优先使用昵称，没有昵称则使用账号
                var name = res.data.nickname || res.data.username;
                $('.username').html('&nbsp;&nbsp;' + name);
                // 2. 设置头像
                // 有图片类型的头像，那么就使用图片，没有图片，使用name的第一个字符
                if (res.data.user_pic) {
                    // 说明有图片
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avatar').hide();
                } else {
                    var firstWord = name.substr(0, 1).toUpperCase(); // 截取，对中文也有效,中文转大小不会抱错
                    $('.text-avatar').text(firstWord).css('display', 'inline-block');
                    $('.layui-nav-img').hide();
                }
            }
        }
        // ajax请求结束之后（无论成功还是失败都执行，会执行complete函数 -> 在common.js里
    });
}
getUserInfo(); // 封装成函数，目的就是后面会多次调用

// -------------------------  完成退出功能  ---------------------------
// 如果确定退出，1.删除token 2.跳转到 /login.html
$('#logout').click(function () {
    layer.confirm('确定退出么？', function (index) {
        localStorage.removeItem('token');
        location.href = "/login.html"
        // 关闭窗口
        layer.close(inidex);
    })
})
