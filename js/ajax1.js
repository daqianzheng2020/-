function Ajax(options){
    //设置默认参数
    var defaultInfo={
        url:'', //请求地址
        type:'get', // 默认请求方式
        data:'',//请求参数
        async:'true', //异步
        dataType:'string', //响应的数据格式
        success:function(){}, //请求成功的回调函数
        error:function(){}
    }
    //使用传入的实参替换默认参数
    for(let attr in options){
        defaultInfo[attr]=options[attr]
    }
    //创建ajax对象
    let xhr=new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP')
    
    //判断是否传递了参数
    if(defaultInfo.data){
        //判断当前是否为get
        if(defaultInfo.type.toUpperCase()=='GET'){
            xhr.open(defaultInfo.type,defaultInfo.url+'?'+defaultInfo.data,defaultInfo.async) 
            //发送请求
            xhr.send()
        }else{
            xhr.open(defaultInfo.type,defaultInfo.url,defaultInfo.async)
            //设置请求头信息
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
            //发送请求
            xhr.send(defaultInfo.data)
        }
    }else{
        xhr.open(defaultInfo.type,defaultInfo.url,defaultInfo.async)
        //发送请求
        xhr.send()
    }

    //获取解析完毕的响应结果
    xhr.onreadystatechange=function(){
        //判断当前ajax状态是否结束
        if(xhr.readyState==4){
            //在判断http状态是否成功
            if(xhr.status==200){
               //调用请求成功的回调函数
               defaultInfo.success(xhr.responseText)
            }else{
                //请求失败的回调函数
               defaultInfo.error()
            }
        }
    }  
}

function promiseAjax(options){
    return new Promise(function(resolve,reject){
            //设置默认参数
        var defaultInfo={
            url:'', //请求地址
            type:'get', // 默认请求方式
            data:'',//请求参数
            async:'true', //异步
            dataType:'string'
        }
        //使用传入的实参替换默认参数
        for(let attr in options){
            defaultInfo[attr]=options[attr]
        }
        //创建ajax对象
        let xhr=new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP')
        
        //判断是否传递了参数
        if(defaultInfo.data){
            //判断当前是否为get
            if(defaultInfo.type.toUpperCase()=='GET'){
                xhr.open(defaultInfo.type,defaultInfo.url+'?'+defaultInfo.data,defaultInfo.async) 
                //发送请求
                xhr.send()
            }else{
                xhr.open(defaultInfo.type,defaultInfo.url,defaultInfo.async)
                //设置请求头信息
                xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
                //发送请求
                xhr.send(defaultInfo.data)
            }
        }else{
            xhr.open(defaultInfo.type,defaultInfo.url,defaultInfo.async)
            //发送请求
            xhr.send()
        }

        //获取解析完毕的响应结果
        xhr.onreadystatechange=function(){
            //判断当前ajax状态是否结束
            if(xhr.readyState==4){
                //在判断http状态是否成功
                if(xhr.status==200){
                //调用请求成功的回调函数
                    resolve(xhr.responseText)
                }else{
                    //请求失败的回调函数
                    reject('请求失败')
                }
            }

        } 
    })
}