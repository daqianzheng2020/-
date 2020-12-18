
//获取操作对象
var pagination=document.querySelector('.Pagination');
// console.log(pagination)
var divRow=document.querySelector('.row');

//使用自执行函数获取数据库中对应的数据
(async function(){
    var p1=await promiseAjax({
        url:'../php/list.php'
    })
    //转换数据类型
var  dt = eval('('+p1+')')
    
    //编写传入的obj数据
    var obj={
        pageInfo:{
            pagenum:1,
            pagesize:12, 
            totalsize:dt.length,
            totalpage:Math.ceil(dt.length/12)
        },
        textInfo:{
            first:"首页",
            prev:"上一页",
            next:'下一页',
            last:"尾页"
        },
        change(m){
            //截取指定长度的数据
            let ar2=dt.slice((m-1)*12,m*12)
            //拼接所有内容
            var str=''
            //遍历新数组中所有数据
            for(var attr in ar2){
                str+=`
                <div class="goods">
                    <div class="thumbnail">
                    <img src="${ar2[attr].goods_small_logo}" alt="...">
                    <div class="caption">
                        <h3>${ar2[attr].goods_name}</h3>
                        <p>￥ ${ar2[attr].goods_price}</p>
                        <p id='p'>店铺名：${ar2[attr].cat_id}</p>
                        <p><a href="./cart.html" class="btn">查看购物车</a> <a href="./particulars?id=${ar2[attr].goods_id}" class="btn" >查看商品详情</a></p>
                    </div>
                    </div>
                </div>
                `
            }
            divRow.innerHTML=str
        }
    }
    //创建分页器对象
    new Pagination(pagination,obj)
})()
