<?php
  header('Content Type:application/JSON;charset=UTF-8');

	//获取被访问者id，一页数据条数，数据第几页
  @$uid=$_REQUEST['uid'];//被访问者id
  @$n=$_REQUEST['n'];//一页数据条数
  @$p=$_REQUEST['p'];//数据第几页
  
	if(!$uid){
  	echo 'err no userId';
   	return;
  }
  if(!$n){
    $n=1;
  }else{
		$n=intval($n);//把字符串解析为整数
	}
  if(!$p){
    $p=1;
  }else{
		$p=intval($p);//把字符串解析为整数
	}

	$pager=[
		'recordCount'=>0,
		'pageSize'=>$n,
		'pageCount'=>0,
		'pno'=>$p,
		'data'=>[]
	];
  
	//连接数据库
  $conn=mysqli_connect('127.0.0.1','root','','myblog',3306);
  mysqli_query($conn,"SET NAMES UTF8");

  //查找数据总条数
  $sql="SELECT COUNT(*) FROM moods WHERE userid=$uid";
  $result=mysqli_query($conn,$sql);
	if($array=mysqli_fetch_array($result)){
		$pager['recordCount']=$array[0];
	}else{
		$pager['recordCount']=0;
	};

	//数据页数
    	$pager['pageCount']=ceil($pager['recordCount']/$n);

  //查找数据
	$first=($p-1)*$n;
  $sql="SELECT * FROM moods WHERE userid=$uid ORDER BY createtime DESC LIMIT $first,$n";
  $result=mysqli_query($conn,$sql);

  while(($row=mysqli_fetch_assoc($result))!==NULL){
  	$pager['data'][]=$row;
  }

  echo json_encode($pager);
?>