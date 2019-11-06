$(function(){

    var theWolf;
    var maxScore = 0;
    var timer;
    var timer1;
    // 图片进度
    var timer2;
    var flag = true;
    var index = 0;
    // var $img = $("<img />");
    // 定义图片位置
    var pos = [{left:"100px",top:"115px"},
    {left:"20px",top:"160px"},
    {left:"190px",top:"142px"},
    {left:"105px",top:"193px"},
    {left:"19px",top:"221px"},
    {left:"202px",top:"212px"},
    {left:"120px",top:"275px"},
    {left:"30px",top:"295px"},
    {left:"209px",top:"297px"},];
    var curPos = pos[Math.round(Math.random()*8)]
    // 定义图片数组
    var bigWolf = ["./images/h0.png","./images/h1.png","./images/h2.png","./images/h3.png",
    "./images/h4.png","./images/h5.png","./images/h6.png","./images/h7.png","./images/h8.png","./images/h9.png"];
    var smallWolf = ["./images/x0.png","./images/x1.png","./images/x2.png","./images/x3.png",
    "./images/x4.png","./images/x5.png","./images/x6.png","./images/x7.png","./images/x8.png","./images/x9.png"];
    
    var location = decodeURI(window.location.search);
    var hash = location.split(/\?/)[1];
    var str = hash.split(/\&/);
    $(".id").html(str[0]);
    $(".name").html(str[1]);
    $(".info>img").attr("src",str[2]);
    $(".maxScore").html(maxScore)
  
    
    // 开始游戏的点击
    $(".start").click(function(){
        $(this).stop().fadeOut(100);
        timer1 = setInterval(progressHandler,300);
        timer2 = setInterval(imgHandler,2000);
    })
    // 游戏规则的点击
    $(".rules").click(function(){
        $(".mask,.rule,.continue").stop().fadeIn(100);
        clearInterval(timer1);
        clearInterval(timer);
        clearInterval(timer2);
    })
    // 继续游戏的点击
    $(".continue").click(function(){
        $(".mask,.rule,.continue").stop().fadeOut(100);
        timer1 = setInterval(progressHandler,300);
        timer2 = setInterval(imgHandler,2000);
    })
    // 重新游戏的点击
    $(".restart").click(function(){
        // 记录最高分
        if(nscore > maxScore){
            maxScore = nscore;
            $(".maxScore").html(maxScore)
        }
        // 初始化分数
        nscore = 0;
        $(".score").html(nscore);
        $(".mask,.restart,.end").stop().fadeOut(100);
        // 初始化图片下标
        index = 0;
        // 移除当前图片
        $(".wolf").attr("src","");
        // 重置进度条
        $(".time").css("width","180px");
        timer1 = setInterval(progressHandler,300);
        timer2 = setInterval(imgHandler,3000);
    })
    function progressHandler(){
        var $width = $(".time").width()-1;
        if($width>0){
            $(".time").css("width",$width+"px");
        }
        else{
            $(".mask,.restart,.end").stop().fadeIn(100);
            // 清除进度条和图片的定时器
            clearInterval(timer2);
            clearInterval(timer1);
        }
    }
    var nscore = 0;
    function imgHandler(){
        clearInterval(timer);
        if(index == 0){
            // 定义图片位置
            curPos = pos[Math.round(Math.random()*8)];
            // 定义小灰灰和灰太狼随机出现
            theWolf = Math.round(Math.random());
            flag = true;
        }
        $(".wolf").css({
            left:curPos.left,top:curPos.top
        })
        timer = setInterval(function(){
            if(index < 6){
                if(theWolf == 1){
                    $(".wolf").attr("src",bigWolf[index]);
                }
                else{
                    $(".wolf").attr("src",smallWolf[index]);
                }
                // 图片的点击（打狼）
                $(".wolf").click(function(){
                    //  清除当前图片的计时器
                    clearInterval(timer2);
                    if(theWolf == 1){
                        if(flag){
                            nscore += 10;
                            $(".score").html(nscore);
                            flag = !flag;
                        }
                        whichWolf(bigWolf,theWolf);
                    }
                    else{
                        if(flag){
                            nscore -=  10;
                            $(".score").html(nscore);
                            flag = !flag;
                        }
                        whichWolf(smallWolf,theWolf);
                    }
                })
                index++;
            }
            else{
                index = 0;
                $(".wolf").attr("src","");
                clearInterval(timer);
            }
        },300);
    }

    function whichWolf(w,b){
        var index2 = 6;
            var hitTimer = setInterval(function(){
                if(index2 < 9){
                    index2++;
                    $(".wolf").attr("src",w[index2]);
                }
                else{
                    index = 0;
                    $(".wolf").attr("src",w[w.length-1])
                    setTimeout(function(){
                        $(".wolf").attr("src","");
                        clearInterval(timer);
                        clearInterval(hitTimer);
                    },100);
                }
            },150)
            // 判断当前分数是否小于0，如果是，游戏结束
            if(nscore < 0){
                clearInterval(timer);
                clearInterval(timer1);
                $(".mask,.restart,.end").stop().fadeIn(100);
            }
            else{
                timer2 = setInterval(imgHandler,3000);
            }
        }
       
    
               

})