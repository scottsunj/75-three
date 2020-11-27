// ajax基本配置
$.ajaxPrefilter(function (options) {
    //  在每次jQ发送ajax请求前会执行该函数，通过该函数的形参options可以获取每次ajax的配置项来修改每次请求的配置项
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // console.log(options.url);



    // 处理请求头信息（token）优化==》有/my/==》需要携带 Authorization 身份认证字段
    if (options.url.indexOf("/my/") !== -1) {
        // !== -1，有/my/==》需要携带 Authorization 身份认证字段
        options.headers = {
            Authorization: localStorage.getItem("token"),
        };
    }
    
    // 控制用户访问权限
    options.complete = function (xhr) {
        //请求完成就会执行的函数（不论是失败还是成功都会执行）
        //形参可以获取到xhr对象
       // console.log(xhr);
       if (
        xhr.responseJSON.status === 1 &&
        xhr.responseJSON.message === "身份认证失败！"
       ) {
           //回到登录页面重新登录
           // 把token信息也清除掉
           localStorage.removeItem("token");
           location.href = "login.html";
       }    
   }
});