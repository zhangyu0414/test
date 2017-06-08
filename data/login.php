<?php
	header('Content-Type:application/JSON;charset=UTF-8');

	@$uname=$_REQUEST['uname'];
	@$upwd=$_REQUEST['upwd'];

	$conn=mysqli_connect('127.0.0.1','root','','myblog',3306);
	mysqli_query($conn,"SET NAMES UTF8");

	$sql="SELECT * FROM user WHERE account='$uname' AND password='$upwd'";
	$result=mysqli_query($conn,$sql);

	$msg=["code"=>0,"msg"=>null];
	if(!$result){
		$msg=["code"=>1001,"msg"=>"SQL语句错误"];
	}else if(($row=mysqli_fetch_assoc($result))!=null){
		$msg=["code"=>1000,"msg"=>"登录信息验证正确","email"=>$row["email"],"name"=>$row["name"]];
	}else{
		$msg=["code"=>1002,"msg"=>"用户名或密码错误"];
	}

	echo json_encode($msg);
?>