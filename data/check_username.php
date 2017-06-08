<?php
	header('Content-Type:application/JSON;charset=UTF-8');

	@$name=$_REQUEST['userName'];

	$conn=mysqli_connect('127.0.0.1','root','','myblog',3306);
	mysqli_query($conn,"SET NAMES UTF8");

	$sql="SELECT uid FROM user WHERE name='$name'";
	$result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);

    $output=[//待输出的信息内容
        'code'=>0,
        'msg'=>null
    ];
    if($row===null){
        $output=[//昵称未使用
            'code'=>4000,
            'msg'=>'该昵称未使用'
        ];
    }else{
        $output=[//昵称已存在
            'code'=>4001,
            'msg'=>'该昵称已存在'
        ];
    }

	echo json_encode($output);
?>