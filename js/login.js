$(function(){
    var flag = false;
    // 注册账户
    $(".login p a").click(function(){
        $(".login p,.submit").css("display","none");
        $(".register").css("display","block");
    })
    // 点击登录
    $(".submit").click(function(){
        // 创建提示框
        var remind = $("<span>账号或密码错误,请重新输入</span>")
        getDate("submit",remind);
    })
    // 点击注册
    $(".register").click(function(){
        // 创建提示框
        var remind = $("<span>账号或密码已存在,请重新输入</span>");
        getDate("register",remind);
    })

    function getDate(obj,remind){
        // 获取密码框和账户框的输入值
        var id = $(".id").val();
        var pwd = $(".pwd").val();
        // 设置提示框样式
        remind.css({
            "font-size":"12px",
            "margin-left":"100px",
            "color":"red",
            "position":"absolute",
            "left":"0",
            "top":"250px",
            "width":"300px",
            "height":"30px"
        })
        // 1.创建ajax请求
        var xhr;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }
        else{
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // 2.设置请求地址与方式
        xhr.open("get","./source/data.json");
        // 3.监听状态
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var data = JSON.parse(xhr.responseText).user;
                // 判断数据库是否有输入的账号与密码
                for(var i = 0; i < data.length; i++){
                    if(id == data[i].id && pwd == data[i].pwd){
                        flag = true;
                        if(obj == "submit"){
                            location = "./index.html?"+data[i].id+"&"+data[i].name+"&"+data[i].img;
                        }
                        if(obj == "register"){
                            console.log(0)
                            remind.insertBefore($(".register"));
                            remind.fadeOut(3000);
                            console.log("1")
                        }
                    }
                }
                if(!flag){
                    // 清空输入框
                    $(".id").val("");
                    $(".pwd").val("");

                    if(obj == "submit"){
                        remind.insertBefore($(".register"));
                        remind.fadeOut(2000);
                    }
                    if(obj == "register"){
                        $(".login p,.submit").css("display","block");
                        $(".register").css("display","none");
                    }
                }
            }
        }
        // 4.发送请求
        xhr.send();
    }
})