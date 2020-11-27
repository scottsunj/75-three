
$(function () {
    let layer = layui.layer;
  
    // 来获取头像和昵称
    getAvatarAndName();
  
    // 退出功能
    $("#logoutBtn").click(function () {
      layer.confirm(
        "确定退出登录?",
        { icon: 3, title: "提 示" },
        function (index) {
          // 该函数会在点击确认的时候执行
          // 退出登录要做的事情，应该和登录的时候做的事情是相反的
          // 1. 把存储在本地的token信息给删除掉 ==> localStorage.removeItem(key);
          // 2. 页面跳转回到login.html 登录页面
  
          // 1.
          localStorage.removeItem("token");
  
          // 2,
          location.href = "login.html";
  
          layer.close(index); // 关闭当前询问框
        }
      );
    });
  });
  
  // 全局的函数 ==> 可以通过window获取到
  function getAvatarAndName() {
    // 获取用户头像和昵称基本信息
    $.ajax({
      url: "/my/userinfo",
      /* // 设置请求头信息  base文件处理了请求头
      headers: {
        Authorization: localStorage.getItem("token"),
      }, */
      success: function (res) {
        //   console.log(res);
  
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败！");
        }
        // layer.msg("获取用户信息成功！");
  
        // 需要处理头像和昵称
  
        // 1. 先处理名字 （优先展示昵称，其次在是用户名）
        let name = res.data.nickname || res.data.username;
        //   console.log(name, name[0].toUpperCase());
        // 获取名字的第一个字母并且大写
        let first = name[0].toUpperCase();
        //添加到欢迎标签里
        $("#welcome").text("欢迎 " + name);
  
        // 2. 在处理头像
        // 根据res的data的user_pic来做不同的处理
        if (res.data.user_pic) {
          //   有用户头像，展示用户头像，隐藏文字头像
          $(".layui-nav-img").show().attr("src", res.data.user_pic);
          $(".text-avatar").hide();
        } else {
          //   没有用户头像，隐藏用户头像，展示文字头像 ==> 文字头像的文字来源于name的第一个字符（大写的）
          $(".layui-nav-img").hide();
          $(".text-avatar").text(first).show();
        }
      },
      /* complete: function (xhr) {
        // 请求完成就会执行的函数（不论是失败还是成功都会执行的）
        // 形参可以获取到xhr对象
        //   console.log(xhr);
        if (
          xhr.responseJSON.status === 1 &&
          xhr.responseJSON.message === "身份认证失败！"
        ) {
          // 回到登录页面重新登录
          // 把token也清除掉
          localStorage.removeItem("token");
          location.href = "login.html";
        }
      }, */
    });
  }
  