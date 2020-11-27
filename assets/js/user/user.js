$(function () {
    //发送ajax请求获取用户的基本信息
    let form = layui.form;
    let layer = layui.layer;
    
    getInfo();
    function getInfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！");
                }
                // layer.msg("获取用户信息成功！")
                // 获取信息成功，把响应回来的数据填充到form中
                // 给表单赋值：语法form.val('filter', object)
                // filter:表单
                form.val("userForm", res.data);
            },
        });
    };
    

    // 重置功能
    $("#resetBtn").click(function (e) {
        e.preventDefault();
        //再次发送ajax请求获取数据  填充到form中
        getInfo();
    }); 


    // 提交form表单数据-修改用户信息
    $("#userForm").submit(function (e) {
        e.preventDefault();
        let data = $(this).serialize();//获取表单的值
        //发送请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",//根路径处理了
            data, //ES6简写  与上面获取的data数据名字相同写一个即可
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改用户信息失败！")
                }
                layer.msg("修改用户信息成功！");

                // 通过window.parent 来获取到父页面（index.html)
                window.parent.getAvatarAndName();
            },
        });
    });


    // 添加表单校验功能
    form.verify({
        // 限制昵称的长度
        nickname: function (value, item) {
            if (value.length > 6) {
                return "昵称长度必须在1-6字符之间";
            }
        },
    });
});