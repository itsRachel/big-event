// -------------------  切换登录和注册的盒子  ----------------------
$('#goto-register').click(function() {
    $('#login').hide().next().show();
});
$('#goto-login').click(function() {
    $('#login').show().next().hide();
});
// -----------------------  完成注册功能  -------------------------
// 整体思路：把账号和密码提交给接口
$('#register form').on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: 'http://www.liulongbin.top:3007/api/reguser',
        data: data,
        success: function(res) {
            // 无论注册成功还是失败，都给提示
            layer.msg(res.message);
            if(res.status ===0) {
                // 如果注册成=成功，显示登录的盒子，隐藏注册的盒子
                $('#login').show().next().hide();
            }
        }
    })
});
// -------------------  注册的表单验证功能 ------------------------
// 需要验证的有两个： 密码长度必须是6-12位，再次密码必须一致
// 使用lauui提供的form模块之前，必须先引入模块
var form = layui.form;
// 调用下面的方法，自定义验证规则
form.verify({
    // 键（验证规则） ： 值（验证方法，可以使用数组，可以使用函数
    // abc: ['正则表达式形式的验证规则', '验证不同欧式的提示信息']
    // len: [/^\S{6,12}$/, '密码长度不正确'],
    len: function(val) {
        // 形参val表示使用此验证规则的输入框的值，简单来说就是我们填写的值
        // 案例中，密码框使用了这个验证规则，形参val表示我们输入的密码
        if(!/^\S{6,12}$/.test(val)) {
            return '密码长度不正确'
        }
        // return '验证不通过的提示'
    },
    same: function(val) {
        // 这个验证规则，重复密码使用，所以这个val就表示重复密码
        // 获取密码
        var pwd = $('#register input[name=password]').val();
        if(pwd !== val) {
            return '两次密码不一致'
        }
    }
});

// ---------------------------  登录功能 ------------------------------
// 监听表单的提交事件 -> 阻止表单默认行为 -> 收集表单数据 -> ajax提交给接口
$('#login form').on('submit', function(e) {
    e.preventDefault();
    // 检查input的name属性值，是否与接口要求的请求参数一致，必须一致才行
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: 'http://www.liulongbin.top:3007/api/login',
        data: data,
        success: function(res) {
            // 无乱登录成功还是失败，都给出提示
            layer.msg(res.message);
            if(res.status === 0) {
                // 把token保存到本地存储中
                localStorage.setItem('token', res.token);
                // 登录成功，跳转到首页
                // location.href = '/index.html'; // 表示跳转到根目录中的index.html
            }
        }
    })
})

