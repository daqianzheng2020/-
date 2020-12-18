

//获取大盒子对象
var goods = document.querySelector('.goods');
//获取地址栏中的参数信息
// console.log(location)
var path1 = location.search
var dt; //当前详情信息显示的数据
//判断该参数是否存在
if (path1) {
  //获取参数信息
  var id1 = path1.split('?')[1].split('=')[1];
  //使用异步函数发送请求，并获取响应结果
  (async function () {
    var p1 = await promiseAjax({
      url: '../php/xiangqing.php',
      data: 'id=' + id1
    })
    //转换格式
    dt = eval('(' + p1 + ')')
    //设置内容
    var str = `
    <div class="left">
    <div id="box" >
      <div id="small"> 
        <!-- 小图片所在的盒子 -->
         <img src="${dt.goods_small_logo}" /> 
        <!-- 小图片:350*350 -->
        <div id="mask"></div>
        <!-- 遮罩层:175*175 -->
      </div>
      <div id="big"> 
        <!-- 大图片所在的盒子:400*400 -->
         <img src="${dt.goods_big_logo}" alt="" id="bigImg"/>
        <!-- 大图片:800*800 -->
      </div>
    </div>
    </div>
    <div class="center1"> 
      <p> ${dt.cat_one_id} <span> ${dt.cat_two_id}</span><i> ${dt.cat_three_id}</i></p>
      <h3>南极人【10双装】夏季男士丝袜超薄中筒袜男袜子薄款透气纯色商务袜P3038</h3>
      <h4>￥${dt.goods_price}</h4>
      <div class="size">
      <a>xs</a><a>s</a><a>m</a><a>l</a><br>
    </div> 
    <p id='p1'>当前还剩余货存<span>${dt.goods_number}</span>件</p>
    <div class="choose_btns">
      <div class="choose_amount">
        <input type="text" value="1" name="num">
        <a class="add">+</a>
        <a class="reduce">-</a>
      </div>
      <a href="../html/cart.html" class="addcar">加入购物车</a><br>
</div> 

        `
    goods.innerHTML = str
    //获取相关元素
	var small = document.getElementById('small');//小盒子
	var big = document.getElementById('big');//大盒子
	var mask=document.getElementById('mask');//遮罩层
	var smallImg = small.children[0];//小图
	var bigImg = big.children[0];//大图
	
	// 1 鼠标移入small,mask显示,big显示
	small.onmouseenter = function(){
		big.style.display = "block";
		mask.style.display = "block";
	}
	// 2 鼠标移出small,mask隐藏,big隐藏
	small.onmouseleave = function(){
		big.style.display = "none";
		mask.style.display = "none";
	}
	// 3 mask跟着鼠标移动,鼠标在mask的中间
	small.onmousemove = function(e){
		e = e||window.event;
		//计算鼠标相对small的坐标 = 鼠标相对性页面的坐标 - box距离页面的距离
		var left = e.pageX - box.offsetLeft;
		var top = e.pageY - box.offsetTop;
		//由于鼠标必须在mask的中间,所有mask左上角的坐标需要减去自己宽度和高度的一般
		left = left - mask.offsetWidth/2;
		top = top - mask.offsetHeight/2;
		//边界检测
		if(left<0){
			left=0;
		}
		if(top<0){
			top=0;
		}
		if(left>box.offsetWidth-mask.offsetWidth){
			left=box.offsetWidth-mask.offsetWidth
		}
		if(top>box.offsetHeight-mask.offsetHeight){
			top=box.offsetHeight-mask.offsetHeight
		}
		mask.style.left = left+"px";
		mask.style.top = top+"px";
	
		// 4 big里面显示mask里面对应的放大图部分
		// 大图的marginLeft为负数表示左移,为正数表示右移动
		// mask距离small左边的距离/small的总宽度 = bigImg距离big左边的距离/bigImg的总宽度
		bigImg.style.marginLeft = - left*bigImg.offsetWidth/small.offsetWidth+"px";
		// mask距离small上部的距离/small的总高度 = bigImg距离big上面的距离/bigImg的总高度
		bigImg.style.marginTop = -top*bigImg.offsetHeight/small.offsetHeight+"px";
	}

    var a_=document.querySelector('.size').querySelectorAll('a')
    for(var i = 0; i < a_.length;i++) {
      a_[i].onclick = function() {
        for(var j = 0;j<a_.length;j++) {
        a_[j].style.border = '  #ccc 1px solid';
        }
        this.style.border = "pink 1px solid";
        } 
       }
    
  var c = document.querySelector('.choose_amount')
  var num = document.querySelector("[name='num']")
  var p1 = document.querySelector('#p1').querySelector('span')

  num.onchange = () => {
    z = num.value

  }

  c.getElementsByTagName('A')[0].onclick = () => {
    z = num.value++
  }
  c.getElementsByTagName('A')[1].onclick = () => {
    z = num.value--
    if (z <= 1) {
      return num.value = 1
    }
  }

    })()
  } else {
    alert("非法进入")
    location.href = './list.html'
  }
  //给大盒子绑定点击事件
  goods.onclick = function (e) {
    var e = e || window.event
    var target = e.target || e.srcElement
    //判断点击的对象是否为“加入购物车”
  if (target.innerHTML == "加入购物车") {
    //获取localStrong中的cartList
    var cartList = localStorage.getItem("cartList")
    if (cartList) {
      var a = 0 //判断要添加的数据是否存在
      //把字符串转为数组对象
      cartList = JSON.parse(cartList)
      //遍历cartlist数组中所有数据
      cartList.forEach((item) => {
        //当前满足条件时，代表当前添加的数据在localStorage中存在
        if (item.goods_id == dt.goods_id) {
          item.cart_number = ++item.cart_number
          a++
          localStorage.setItem('cartList', JSON.stringify(cartList))
        }
      })
      //判断当前添加的商品是否存在
      if (a == 0) {
        //修改添加的商品数量
        dt.cart_number = 1
        //把当前商品追加到cartList数组中
        cartList.push(dt)
        //更新localStorage中的数据
        localStorage.setItem('cartList', JSON.stringify(cartList))
      }
    } else {
      //修改添加的商品数量
      dt.cart_number = 1
      //在localStrong设置一个cartList属性
      localStorage.setItem('cartList', JSON.stringify([dt]))
    }
  }
}

