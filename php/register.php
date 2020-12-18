<?php
header('content-type:text/html;charsrt=utf-8');
$u=$_POST['name1'];
$p=$_POST['pwd1'];
$link=mysqli_connect('localhost','root','','c');
$sql="INSERT INTO `ccc` VALUES (null,'$u','$p')"; 
mysqli_set_charset($link,"utf8");   
$res=mysqli_query($link,$sql);

mysqli_close($link);
if($res){   
    $arr=array('code'=>1);
    $josn=json_encode($arr);
    echo $josn;
}
else{
    $arr=array('code'=>0);
    $json=json_encode($arr);
    echo $json;
}

?>