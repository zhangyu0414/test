<?php
	 header('Content Type:application/JSON;charset=UTF-8');

    $uname=$_REQUEST['uname'];

    if(!$uname){
    	echo 'err no userName';
    	return;
    }
    $conn=mysqli_connect('127.0.0.1','root','','myblog',3306);
    mysqli_query($conn,"SET NAMES UTF8");

    $sql="SELECT * FROM user WHERE name='$uname'";
    $result=mysqli_query($conn,$sql);

    $output=[];
    while(($row=mysqli_fetch_assoc($result))!==NULL){
    	$output[]=$row;
    }
   	echo json_encode($output);
?>