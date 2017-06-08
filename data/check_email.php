<?php
	header('Content-Type:application/JSON;charset=UTF-8');

	@$email=$_REQUEST['email'];

	$conn=mysqli_connect('127.0.0.1','root','','myblog',3306);
	mysqli_query($conn,"SET NAMES UTF8");

	$sql="SELECT uid FROM user WHERE email='$email'";
	$result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);

    $output=[//待输出的信息内容
        'code'=>0,
        'msg'=>null
    ];
    if($row===null){
        $output=[//邮箱未使用
            'code'=>5000,
            'msg'=>'该邮箱未使用'
        ];
    }else{
        $output=[//邮箱已存在
            'code'=>5001,
            'msg'=>'该邮箱已存在'
        ];
    }

	echo json_encode($output);
?>