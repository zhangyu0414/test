<?php
	 header('Content Type:application/JSON;charset=UTF-8');

    $uid=$_REQUEST['uid'];

    if(!$uid){
    	echo 'err no userId';
    	return;
    }
    $conn=mysqli_connect('127.0.0.1','root','','myblog',3306);
    mysqli_query($conn,"SET NAMES UTF8");

    $sql="SELECT * FROM user WHERE uid=$uid";
    $result=mysqli_query($conn,$sql);

    $output=[];
    while(($row=mysqli_fetch_assoc($result))!==NULL){
    	$output[]=$row;
    }
   	echo json_encode($output);
?>