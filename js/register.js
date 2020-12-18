var btn=document.querySelector("#OK");
var show=document.querySelector(".show");
btn.onclick=(e)=>{
   var e=e||window.event;
    btn.parentNode.parentNode.parentNode.style="display:none" ;
    show.style="display:none"
};

$("#register1").click(function(){

    if($("[name='pwd2']").val()===$("[name='pwd1']").val()){
        $.ajax({
            url:"../php/register.php",
            type:'post',
            data:{ 
                name1:$("[name='name1']").val(),
                pwd1:$("[name='pwd1']").val(),
            },
            success:function(res){
                //console.log(res);
                var i=JSON.parse(res);
                //console.log(i.code);
                //console.log("成功的回调");
                if(i.code==1){
                    alert('恭喜你注册成功,请登录')
                    location.href="../html/login.html"
                }else{
                    alert('注册失败')
                }
     
            }
    
    
    
        })
    
    
    }else if($("[name='pwd2']").val()!=$("[name='pwd1']").val()){
        alert('你重复密码填写错误')
    
    }



})

