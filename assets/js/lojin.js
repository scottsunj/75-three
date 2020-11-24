$(function () {
    //  注册账号  点击去注册==》注册区域显示 登陆区域隐藏
    $("#gotoRegi").click(function () {
        // 注册区域显示
        $(".regiBox").show();

        // 登录区域隐藏
        $(".loginBox").hide();

    })

    // 去登录  点击登录==》登录区域显示  注册区域隐藏
    $("#gotoLogin").click(function () {
        // 注册区域隐藏
        $(".regiBox").hide();

        // 登录区域显示
        $(".loginBox").show();
    })
    // 从layui中获取form表单的功能  和layer功能（弹框）
    let form = layui.form;
    let layer = layui.layer;
    // 表单校验
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式

        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        // 以下是密码校验
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 确认密码的校验：需要和密码框的内容保持一致==》函数,定义一个函数repass

        repass: function (value, item) {
            // value：表单的值(再次输入的密码框的内容)、item：表单的DOM对象
            // console.log(value, item);
            // 找到注册表单中的input==》属性选择器要精确（也可以直接添加类名）
            let pwd = $(".regiBox input[name=password]").val();
            // console.log(pwd);// 拿到密码框的内容
            // 判断两个密码框的内容是否一致
            if (value !== pwd) {
                return "两次输入的内容不一样";
            }
        }
    });


    // 注册表单ajax代码
    // 表单提交事件submit
    $("#regiForm").on("submit", function (e) {
        e.preventDefault();
        // 快速收集表单的值(用户名 密码  确认密码) 确保表单有name属性值为接口文档的参数
        let str = $(this).serialize();
        // console.log(str);

        // 发送ajax请求
        $.ajax({ 
            type: "POST",
            url: "/api/reguser",
            data: str,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    // return console.log("注册失败" +res.message);
                    return layer.msg("注册失败" + res.message);
                }
                // console.log("注册成功");
                // layui 提供的弹框layer.msg() 在layui中获取下layer功能
                layer.msg("注册成功");
                // 注册完成之后出发下登录功能==》跳转到登录页面
                $("#gotoLogin").click()//（注册成功，显示登录页面）
            
            }
        })

    })


    // 登录ajax请求
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        // 收集到表单的数据 
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data,//es6简写
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg("登录失败！")
                }
                //登录成功
                // 1、提示框
                // layer.msg("注册成功");
                // // 2、需要将token储存到本地中（loaclStorage）
                // // res.token 本身就是字符串可以直接存储（如果是对象或数组需要进行序列化成字符串）
                // localStorage.setItem("token", res.token)

                // // 3、登录成功去后台页面（跳转页面）
                // location.href = "index.html";

                localStorage.setItem("token", res.token)

                layer.msg('登录成功去后台页面',
                    {
                        time:2000
                    },
                    function () {
                    // 关闭之后做的事==》跳转去后台主页
                    location.href = "index.html";
                  }); 

            }
        })
    })
})