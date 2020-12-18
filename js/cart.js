/* 
思路：
    1、判断当前是否为非法进入，如果没有登录就进入购物车页面。那么弹出提示，并跳转到登录页。然后登录成功以后，在跳回购物车页面
    2、判断localStrong是否有数据，如果没有数据，则提示添加数据信息；如果有数据，则显示所以数据信息
*/
//获取用户名cookie
var name1=getCookie('name')
//获取当前地址
var url2=location.href
//判断当前cookie是否存在
if(!name1){
    alert('非法进入，请登录')
    location.href='./login.html?url='+url2
}
//获取大盒子对象
var container=document.querySelector('.container')
//获取localStrong的数据
var cartlist=localStorage.getItem("cartList") || "[]";
//转为数据对象
cartlist=JSON.parse(cartlist)

show1()
function show1(){
    if(cartlist.length>0){
        //验证全选框是否被选中
        var quan1=cartlist.every(item=>{
            return item.is_select==1
        })
     
        //创建变量，拼接所有商品信息
        var str2=`
        <h2>这是一个购物车页<a href='./list.html'  class="btn btn-info btn-sm">回到列表页</a></h2>
        <div class="panel panel-default">
            <div class="panel-heading">
                <input type="checkbox" name="quan" ${quan1?'checked':''}>全选
                商品种类：<span>${cartlist.length}</span> 
                所选商品数量：<span>${aa[0]}</span> 
                所选商品价格：￥<span>${aa[1]}</span> 
                <a href="#" class="btn btn-primary btn-sm" role="button">结算</a> <a href="#" class="btn btn-info  btn-sm" role="button">清空购物车</a>
            </div>
            <div class="panel-body">
        `
    //遍历数组中所有的商品信息
    cartlist.forEach(item=>{
        str2+=`
        <div class="media">
            <div class="media-left media-middle">
                <input type="checkbox" ${item.is_select==1?'checked':''}  name="xuan" data-id="${item.goods_id}">
            <a href="#">
                <img class="media-object" src="${item.goods_small_logo}" width="100" alt="...">
            </a>
            </div>
            <div class="media-body">
            <h4 class="media-heading">${item.goods_name}</h4>
            <h4>￥<span>${item.goods_price}</span></h4>
            <button type="button" class="btn btn-primary" data-id=${item.goods_id}>我不要了</button>
            <div class="btn-group right1" role="group" aria-label="...">
                <button type="button" data-id=${item.goods_id} ${item.cart_number<=1? 'disabled':''} class="btn btn-default">-</button>
                <button type="button" class="btn btn-default">${item.cart_number}</button>
                <button data-id=${item.goods_id} ${item.cart_number>=item.goods_number?'disabled':''} type="button" class="btn btn-default">+</button>
            </div>
            </div>
        </div>
        `
    })
    str+=`
            </div>
        </div>
    `
    //在把拼接好的内容添加到大盒子中
    container.innerHTML=str2
    }else{
    var str=`
    <h2>这是一个购物车页<a href='./list.html'  class="btn btn-info btn-sm">回到列表页</a></h2>
    <div class="jumbotron">
            <h1>您的购物车空空如也</h1>
            <p>点击下方按钮快去选购吧! ^_^</p>
            <p><a class="btn btn-primary btn-lg" href="./list.html" role="button">赶紧去购买吧</a></p>
        </div>
    `
    //把当前字符串添加到大盒子中
    container.innerHTML=str
    }
}
//給大盒子绑定点击事件
container.onclick=function(e){
    // console.log(cartlist)
    var e = e || window.event
    var target=e.target || e.srcElement
    //加法
    if(target.innerHTML=="+"){
        //获取当前商品的id
        var id1=target.getAttribute('data-id')
        //遍历数组元素
        cartlist.forEach(item=>{
            //判断是否为当前操作的商品
            if(item.goods_id==id1){
                item.cart_number+=1
            }
        })
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist))
        show1()
    }
    //减法
    if(target.innerHTML=='-'){
        //获取id
        var id1=target.getAttribute('data-id')
        //遍历数组元素
        cartlist.forEach(item=>{
            //判断是否为当前操作的商品
            if(item.goods_id==id1){
                item.cart_number-=1
            }
        })
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist))
        show1()
    }
    //删除一行
    if(target.innerHTML=='我不要了'){
        //获取id
        var id1=target.getAttribute('data-id')
        //遍历数据元素，把满足条件的数据过滤，不满足条件的元素保留
        cartlist2=cartlist.filter(item=>{
            return item.goods_id!=id1
        })
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist2))
        //刷新
        location.reload()
    }
    //全选
    if(target.getAttribute('name')=='quan'){
        //遍历数组中所有的数据
        cartlist.forEach(item=>{
            //判断全选框是否被选中
            if(target.checked){
                //修改所有商品选中框的is_select
                item.is_select=1
            }else{
                item.is_select=0
            }
        })
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist))
        show1()
    }
    //选中框
    if(target.getAttribute('name')=='xuan'){
       //获取当前商品id
       var id1=target.getAttribute('data-id')
       //遍历数据元素
       cartlist.forEach(item=>{
           //判断是否为当前操作商品
           if(item.goods_id==id1){
            //    item.is_select=item.is_select?0:1
                if(item.is_select==1){
                    item.is_select=0
                }else{
                    item.is_select=1
                }
           }
       })
       //重置localStrong
       localStorage.setItem('cartList',JSON.stringify(cartlist))
       show1()
    }
    //结算
    if(target.innerHTML=='结算'){
        //确认是否购买
        if(confirm("你确定要购买吗？")){
            alert("你要支付："+total1()[1])
            //过滤数组元素
            var cartlist3=cartlist.filter(item=>{
                return item.is_select!=1
            })
            //重置localStrong
       localStorage.setItem('cartList',JSON.stringify(cartlist3))
        location.reload()
        }
    }
    //清空购物车
    if(target.innerHTML=='清空购物车'){
        localStorage.removeItem('cartList')
        // localStorage.setItem('cartList','')
        location.reload()
    }

}
function total1(){
    var num=0 //总数量
    var price=0 //总价格
    //遍历cartlist数组
    cartlist.forEach(item=>{
        //判断该商品是否被选中
        if(item.is_select==1){
            //统计商品总数量
            num+=item.cart_number
            //统计总计
            price+=parseInt(item.cart_number)*parseFloat(item.goods_price)
        }
    })
    return [num,price.toFixed(2)]
}
