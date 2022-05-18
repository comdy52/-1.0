$(function() {
    $('#link_reg').on('click', function() {
        $('.reg-box').show()
        $('.login-box').hide()

    })

    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()

    })

    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }
        $.post('/api//reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);

            }
            layer.msg('注册成功,请登入')
            $('#link_login').click()
        })
    })

    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登入失败')
                }
                layer.msg('登入成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})