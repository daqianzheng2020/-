/* 
思路：
    1、判断当前是否为非法进入，如果没有登录就进入购物车页面。那么弹出提示，并跳转到登录页。然后登录成功以后，在跳回购物车页面
    2、判断localStrong是否有数据，如果没有数据，则提示添加数据信息；如果有数据，则显示所以数据信息
*/
//获取用户名cookie
var name1=getCookie('name')
var looks=document.querySelector('#look')
looks.innerHTML=name1

//获取当前地址
// var url2=location.href
//判断当前cookie是否存在
// if(!name1){
//     alert('非法进入，请登录')
//     location.href='./login.html?url='+url2
// }
//获取大盒子对象
var container=document.querySelector('.c-container')
//获取localStrong的数据
var cartlist=localStorage.getItem("cartList") || "[]";
//转为数据对象
cartlist=JSON.parse(cartlist)

        //创建变量，拼接所有商品信息
        var str2=`
        <div class="w">
		<div class="cart-filter-bar">
			<em>全部商品</em>
		</div> 
		<!-- 购物车主要核心区域 -->
		<div class="cart-warp"> 
			<!-- 头部全选模块 -->
			<div class="cart-thead">
				<div class="t-checkbox">
					<input type="checkbox" name="" id="" class="checkall"> 全选
				</div>
				<div class="t-goods">商品</div>
				<div class="t-price">单价</div>
				<div class="t-num">数量</div>
				<div class="t-sum">小计</div>
				<div class="t-action">操作</div>
            </div>
            <div class="cart-item-list">
        <div class="cart-item ">
                <div class="p-checkbox">
                    <input type="checkbox" name="" id=""  class="j-checkcart-itembox">
                </div>
        `
    //遍历数组中所有的商品信息
    cartlist.forEach(item=>{
        str2+=` 
        
            <div class="p-goods">
                <div class="p-img">
                    <img src="${item.goods_small_logo}" alt="" id="tu">
                </div>
                <div class="p-msg">${item.goods_name}</div>
            </div>
            <div class="p-price">￥<span>${item.goods_price}</span></div>
            <div class="p-num">
                <div class="quantity-form">
                    <a href="javascript:;" class="decrement">-</a>
                    <input type="text" class="itxt" value="${item.cart_number}">
                    <a href="javascript:;" class="increment">+</a>
                </div>
            </div>
            <div class="p-sum">￥<span>${item.cart_number*item.goods_price}</span></div>
            <div class="p-action"><a href="javascript:;">删除</a></div>
        </div>
        <div class="cart-item">
            <div class="p-checkbox">
                <input type="checkbox" name="" id="" class="j-checkbox">
            </div>
        `
    })
    str2+=`
    <div class="p-goods"> 
    <!-- 结算模块 -->   
     <div class="cart-floatbar">
        <div class="select-all">
            <input type="checkbox" name="" id="" class="checkall">全选
        </div>
        <div class="operation">
            <a href="javascript:;" class="remove-batch"> 删除选中的商品</a>
            <a href="javascript:;" class="clear-all">清理购物车</a>
        </div>
        <div class="toolbar-right">
            <div class="amount-sum">共<em>1</em>件商品</div>
            <div class="price-sum">总价： <em>￥12.60</em></div>
            <a class="btn-area">去结算</a>
        </div>

    `
    //在把拼接好的内容添加到大盒子中
    container.innerHTML=str2
//   var c=$('.p-price').children().html()*$('.itxt').val()
// console.log(c)
  //   $('.p-sum').children().html()=parseInt(c)  
  show()
  function show(){
  $(function(){
        // 1. 全选 全不选功能模块
        // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
        // 事件可以使用change
        $(".checkall").change(function() {
            // console.log($(this).prop("checked"));
            $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
            if ($(this).prop("checked")) {
                // 让所有的商品添加 check-cart-item 类名
                $(".cart-item").addClass("check-cart-item");
            } else {
                // check-cart-item 移除
                $(".cart-item").removeClass("check-cart-item");
            }
        });
        // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
        $(".j-checkbox").change(function() {
            // if(被选中的小的复选框的个数 === 3) {
            //     就要选中全选按钮
            // } else {
            //     不要选中全选按钮
            // }
            // console.log($(".j-checkbox:checked").length);
            // $(".j-checkbox").length 这个是所有的小复选框的个数
            if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
                $(".checkall").prop("checked", true);
            } else {
                $(".checkall").prop("checked", false);
            }
            if ($(this).prop("checked")) {
                // 让当前的商品添加 check-cart-item 类名
                $(this).parents(".cart-item").addClass("check-cart-item");
            } else {
                // check-cart-item 移除
                $(this).parents(".cart-item").removeClass("check-cart-item");
            }
        });
        // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
        $(".increment").click(function() {
            // 得到当前兄弟文本框的值
            var n = $(this).siblings(".itxt").val();
            // console.log(n);
            n++;
            $(this).siblings(".itxt").val(n);
            
            // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
            // 当前商品的价格 p  
            var p = $(this).parents(".p-num").siblings(".p-price").children().html();
            var price = (p * n).toFixed(2);
            // 小计模块 
            // toFixed(2) 可以让我们保留2位小数
            $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
            getSum();
            
        });
        $(".decrement").click(function() {
            // 得到当前兄弟文本框的值
            var n = $(this).siblings(".itxt").val();
            if (n == 1) {
                return false;
            }
            // console.log(n);
            n--;
            $(this).siblings(".itxt").val(n);
            // var p = $(this).parent().parent().siblings(".p-price").html();
            // parents(".p-num") 返回指定的祖先元素
            var p = $(this).parents(".p-num").siblings(".p-price").children().html();
            console.log(p);
            // 小计模块 
            $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
            getSum();
        });
        //  4. 用户修改文本框的值 计算 小计模块  
        $(".itxt").change(function() {
            // 先得到文本框的里面的值 乘以 当前商品的单价 
            var n = $(this).val();
            // 当前商品的单价
            var p = $(this).parents(".p-num").siblings(".p-price").html();
            // console.log(p);
            p = p.substr(1);
            $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
            getSum();
        });
        // 5. 计算总计和总额模块
        getSum();
    
        function getSum() {
            var count = 0; // 计算总件数 
            var money = 0; // 计算总价钱
            $(".itxt").each(function(i, ele) {
                count += parseInt($(ele).val());
            });
            $(".amount-sum em").text(count);
            $(".p-sum").each(function(i, ele) {
                money += parseFloat($(ele).text().substr(1));
            });
            $(".price-sum em").text("￥" + money.toFixed(2));
        }
        // 6. 删除商品模块
        // (1) 商品后面的删除按钮
        $(".p-action a").click(function() {
            // 删除的是当前的商品 
            $(this).parents(".cart-item").remove();
            getSum();
        });
        // (2) 删除选中的商品
        $(".remove-batch").click(function() {
            // 删除的是小的复选框选中的商品
            $(".j-checkbox:checked").parents(".cart-item").remove();
            getSum();
        });
        // (3) 清空购物车 删除全部商品
        $(".clear-all").click(function() {
            $(".cart-item").remove();
            getSum();
        })
    })

}   
