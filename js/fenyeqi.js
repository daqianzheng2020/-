function Pagination(ele,options){
    //设置实例属性
    this.ele=ele
    this.options=options ||{}
    //创建回调函数
    this.change=this.options.change||function(){}
    //设置默认属性
    this.default={
        //分页数据信息
        pageInfo:{
            pagenum:1,//当前页
            pagesize:10,//每页显示的条数
            totalsize:200,//总条数
            totalpage:20 //总页数
        },
        //分页文本信息
        textInfo:{
            first:'首页',
            prev:"上一页",
            list:'',
            next:"下一页",
            last:"尾页"
        }
    }
    //创建存储页面的实例属性
    this.list=null
    //调用入口函数
    this.init()
}
//创建入口函数
Pagination.prototype.init=function(){
    this.setDefatul()
    //给大盒子对象添加内容
    this.setStyle()
}
//替换默认参数
Pagination.prototype.setDefatul=function(){
    //判断当前实参中是否有分页数据信息
    if(this.options.pageInfo){
        //遍历传入的实参
        for(let attr in this.options.pageInfo){
            this.default.pageInfo[attr]=this.options.pageInfo[attr]
        }
    }

    if(this.options.textInfo){
        for(let attr in this.options.textInfo){
            this.default.textInfo[attr]=this.options.textInfo[attr]
        }
    }
    // console.log(this.default)
}
Pagination.prototype.setStyle=function(){
    //清空当前大盒子中所有内容
    this.ele.innerHTML=''
    //显示文本信息
    this.createText()
    //显示页码
    this.showP()
    //动起来
    this.dongqilai()
    //禁用按钮
    this.jinyong()
    //添加输入框和按钮
    this.input2()
    //调用回调函数
    this.change(this.default.pageInfo.pagenum)
}
//添加输入框和按钮对象
Pagination.prototype.input2=function(){
    //创建输入框对象
    var inp=document.createElement('input')
    var btn=document.createElement('button')
    //给input对象添加属性
    inp.type='number'
    inp.min=1
    inp.value=this.default.pageInfo.pagenum
    inp.max=this.default.pageInfo.totalpage

    btn.innerHTML='go'
    //把新对象追加到大盒子中
    this.ele.appendChild(inp)
    this.ele.appendChild(btn)
}
//禁用
Pagination.prototype.jinyong=function(){
    //获取当前页码
    let num2=this.default.pageInfo.pagenum
    //获取大盒子中所有的div对象
    let divs=this.ele.querySelectorAll('div')
    // console.log(divs)
    //判断当前页是否为第一页
    if(num2==1){
       divs[0].style.backgroundColor='#ccc'
       divs[1].style.backgroundColor='#ccc'
    }
    //当前页为最一页时
    if(num2==this.default.pageInfo.totalpage){
       divs[3].style.backgroundColor='#ccc'
       divs[4].style.backgroundColor='#ccc'
    }

}
//文本显示
Pagination.prototype.createText=function(){
    //遍历默认参数中的文本信息
    for(let attr in this.default.textInfo){
        //创建存放文本的div对象
        var newDiv=document.createElement('div')
        //给新的div对象添加class属性值
        newDiv.className=attr
        //判断该键名是否为list对象
        if(attr == 'list'){
            setCss(newDiv,{
                'display':'flex',
                'justify-content': 'center',
                'align-items': 'center'
            })
            //在把当前div对象赋值给this.list实例属性
            this.list=newDiv
            
        }else{
            //给新的div对象添加文本内容
            newDiv.innerHTML=this.default.textInfo[attr]
            //给当前新div设置样式
            setCss(newDiv,{
                'border':'1px solid red',
                'margin':'0px 5px',
                'padding':'0px 5px'
            })
        }
        //把新的div对象追加到大盒子中
        this.ele.appendChild(newDiv)
    }  
}

//显示页码
Pagination.prototype.showP=function(){
    //获取当前页
    let pagenum2=this.default.pageInfo.pagenum
    //获取总页数
    let totalpage2=this.default.pageInfo.totalpage
    //判断总页数是否小于10
    if(totalpage2<10){
        for(let i=1;i<=totalpage2;i++){
            //创建p对象存放页码
            let newP=createP(i,pagenum2)
            //把当前创建好的p对象追加到this.list盒子中
            this.list.appendChild(newP)
        }
    }else{
        //判断当前页是否<5
        if(pagenum2<5){
            for(let i=1;i<=5;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
            //创建span对象
            var span=document.createElement('span')
            //添加内容
            span.innerHTML='...'
            this.list.appendChild(span)

            for(let i=totalpage2-1;i<=totalpage2;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
        }else if(pagenum2==5){
            for(let i=1;i<=7;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
            //创建span对象
            var span=document.createElement('span')
            //添加内容
            span.innerHTML='...'
            this.list.appendChild(span)

            for(let i=totalpage2-1;i<=totalpage2;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
        }else if(pagenum2>5 && pagenum2<totalpage2-4){
            for(let i=1;i<=2;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
            //创建span对象
            var span=document.createElement('span')
            //添加内容
            span.innerHTML='...'
            this.list.appendChild(span)

            for(let i=pagenum2-2;i<=pagenum2+2;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }

            //创建span对象
            var span=document.createElement('span')
            //添加内容
            span.innerHTML='...'
            this.list.appendChild(span)

            for(let i=totalpage2-1;i<=totalpage2;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
        }else if(pagenum2==totalpage2-4){
            for(let i=1;i<=2;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
            //创建span对象
            var span=document.createElement('span')
            //添加内容
            span.innerHTML='...'
            this.list.appendChild(span)

            for(let i=totalpage2-6;i<=totalpage2;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
        }else if(pagenum2>totalpage2-4){
            for(let i=1;i<=2;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
            //创建span对象
            var span=document.createElement('span')
            //添加内容
            span.innerHTML='...'
            this.list.appendChild(span)

            for(let i=totalpage2-4;i<=totalpage2;i++){
                //创建p对象存放页码
                let newP=createP(i,pagenum2)
                //把当前创建好的p对象追加到this.list盒子中
                this.list.appendChild(newP)
            }
        }
    }
}
//动起来
Pagination.prototype.dongqilai=function(){
   
    //给大盒子对象绑定点击事件
    this.ele.onclick=(e)=>{
        
        var e =e || window.event
        var target=e.target || e.srcElement
        
        //判断点击的是否为下一页
        if(target.className=='next' && this.default.pageInfo.pagenum!=this.default.pageInfo.totalpage){
            //修改当前页码
            this.default.pageInfo.pagenum=this.default.pageInfo.pagenum-0+1
            this.setStyle()
        }
        //判断点击的是否为上一页
        if(target.className=='prev' && this.default.pageInfo.pagenum!=1){
            //修改当前页码
            this.default.pageInfo.pagenum=this.default.pageInfo.pagenum-1
            this.setStyle()
        }
        //判断点击的是否为首页
        if(target.className=='first' && this.default.pageInfo.pagenum!=1){
            //修改当前页码
            this.default.pageInfo.pagenum=1
            this.setStyle()
        }
        //尾页
        if(target.className=='last' && this.default.pageInfo.pagenum!=this.default.pageInfo.totalpage){
            //修改当前页码
            this.default.pageInfo.pagenum=this.default.pageInfo.totalpage
            this.setStyle()
        }
        //点击页码
        if(target.nodeName=='P' && target.innerHTML!=this.default.pageInfo.pagenum){
            //修改当前页码
            this.default.pageInfo.pagenum=parseInt(target.innerHTML)
            this.setStyle()
        }
        //判断点击的是否为go按钮
        if(target.innerHTML=='go'){
             //获取输入框中的内容
             let val=parseInt(target.previousElementSibling.value)
             //判断当前输入框的取值范围
             if(val>=1 && val<=this.default.pageInfo.totalpage){
                  //修改当前页码
                this.default.pageInfo.pagenum=val
                this.setStyle()
             }
        }
    }
}

function createP(i,num){
    //创建p对象
    var p1=document.createElement('p')
    //添加内容
    p1.innerHTML=i
    //判断是否为当前页
    if(i==num){
        //设置样式
        setCss(p1,{
            'border':'1px solid red',
            'margin':'0px 5px',
            'padding':'0px 5px',
            'background-color':'red'
        })
    }else{
        //设置样式
        setCss(p1,{
            'border':'1px solid red',
            'margin':'0px 5px',
            'padding':'0px 5px'
        })
    }
    return p1
}

function setCss(ele,options){
    //遍历options对象
    for(let attr in options){
        ele.style[attr]=options[attr]
    }
}

