// $regex = new RegExp('^[\u4E00-\u9FA5A-Za-z0-9]+$');


$("button").click(function(){
$n1=$("[name='name1']").val();
$u1=$("[name='pwd1']").val();
var seach1=location.search
var newUrl=seach1.split('=')[1]
var k1=$n1
    var n2 = getCookie($n1);
    // if($regex.test($n1)&&$regex.test($u1)){
        $.ajax({
            url:"../php/login.php",
            type:'post',
            data:{ 
                name1:$("[name='name1']").val(),
                pwd1:$("[name='pwd1']").val(),
                
            },
            success:function(res){
                setCookie('name',$n1)
                var i=JSON.parse(res);
                console.log(res)
                if(i.code){
                    alert('恭喜你登录成功');
                    location.href='../html/tianmao.html?'
                }else{
                    alert('登录失败,用户名或者密码错误')
                }
            },
        })
 
   
}) 
    