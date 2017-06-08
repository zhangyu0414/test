<?php
	header('Content Type:application/JSON;charset=UTF-8');

	@$uid=$_REQUEST['uid'];
	@$uname=$_REQUEST['uname'];
	@$email=$_REQUEST['email'];
	@$text=$_REQUEST['text'];

	//连接数据库
  $conn=mysqli_connect('127.0.0.1','root','','myblog',3306);
  mysqli_query($conn,"SET NAMES UTF8");
	
	$date=date('y-m-d h:i:s',time());
	
	$sql="INSERT INTO message VALUES(NULL,'$uname','$email','$date','$text','$uid')";
	$result=mysqli_query($conn,$sql);
	if(!$result){
		$output=[//待输出的信息内容
			'code'=>2001,
			'msg'=>'SQL语句错误'
		];
	}else{
		$output=[//待输出的信息内容
			'code'=>2000,
			'msg'=>'added'
		];
	}
	

	echo json_encode($output);
?>