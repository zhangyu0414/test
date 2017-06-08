<?php
	header('Content-Type:application/JSON;charset=UTF-8');

	@$account=$_REQUEST['account'];
	@$password=$_REQUEST['upwd'];
	@$name=$_REQUEST['name'];
	@$email=$_REQUEST['email'];
	@$phone=$_REQUEST['phone'];
	$date=date('y-m-d h:i:s',time());
	$spic="images/default_small.jpg";
	$bpic="images/default.jpg";
	$hobby="null";
	$skills='{"ALL":"100%"}';

	$conn=mysqli_connect('127.0.0.1','root','','myblog',3306);
	mysqli_query($conn,"SET NAMES UTF8");

	$sql="INSERT INTO user VALUES(NULL,'$account','$password','$name','$date','$phone','$email','$spic','$bpic','$hobby','$skills')";
	$result=mysqli_query($conn,$sql);
	if($result){
		$output=[//待输出的信息内容
			'code'=>6000,
			'msg'=>'added'
		];
	}else{
		$output=[//待输出的信息内容
			'code'=>6001,
			'msg'=>'failed'
		];
	}
	echo json_encode($output);
?>