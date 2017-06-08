<?php
	header('Content-Type:application/JSON;charset=UTF-8');

	@$account=$_REQUEST['account'];

	$conn=mysqli_connect('127.0.0.1','root','','myblog',3306);
	mysqli_query($conn,"SET NAMES UTF8");

	$sql="SELECT uid FROM user WHERE account='$account'";
	$result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);

    $output=[//待输出的信息内容
        'code'=>0,
        'msg'=>null
    ];
    if($row===null){
        $output=[//账号未使用
            'code'=>3000,
            'msg'=>'该账号未使用'
        ];
    }else{
        $output=[//账号已存在
            'code'=>3001,
            'msg'=>'该账号已存在'
        ];
    }

	echo json_encode($output);
?>