//点击登录
$('#btnLogin').click(function(){
	if(canLogin()){
		window.scroll(0,0);
		location.reload();
	}
});

//服务器验证登录（判断用户名密码是否正确）
function canLogin(){
	var b1=checkuname();
	var b2=checkupwd();
	if(b1&&b2){
		var uname=$('#loginBox input[name="uname"]').val();
		var upwd=$('#loginBox input[name="upwd"]').val();
		var label=$('#btnLogin').siblings('label');
		var b=false;
		$.ajax({
			type:"GET",
			url:'./data/login.php',
			async:false,
			data:'uname='+uname+'&upwd='+upwd,
			dataType:"json",
			success:function(object){
				console.log(object);
				if(object.code===1001){
					label.html(object.msg).css('opacity',1);
				}else if(object.code===1002){
					label.html(object.msg).css('opacity',1);
				}else if(object.code===1000){
					label.html(object.msg).css('opacity',1);
					window.localStorage.setItem('userName',object.name);
					window.localStorage.setItem('email',object.email);
					b=true;
					console.log(b);
				}else{
					alert('未知错误');
				}
			}
		});
		return b;
	}else{
		return false;
	}
}

/*验证规则及错误提示*/
//登录验证规则——未用
var loginRule={
	uname:{
		required:true//必填
	},
	upwd:{
		required:true
	}
}
//登录错误信息提示
var loginError={
	uname:{
		required:"必须填写用户名"
	},
	upwd:{
		required:"必须填写密码"
	}
}
//判断登录用户名
function checkuname(){
	var n=$('#loginBox input[name="uname"]');
	var text=n.val();
	if(text==''||text==null||text==undefined){
		n.siblings('label').html(loginError.uname.required).css('opacity',1);
		return false;
	}else{
		n.siblings('label').css('opacity',0);
		return true;
	}
}
//判断登录密码
function checkupwd(){
	var n=$('#loginBox input[name="upwd"]');
	var text=n.val();
	if(text==''||text==null||text==undefined){
		n.siblings('label').html(loginError.upwd.required).css('opacity',1);
		return false;
	}else{
		n.siblings('label').css('opacity',0);
		return true;
	}
}

//设置登录表单blur验证
$('#loginBox input[name="uname"]').blur(function(){
	checkuname();
});
$('#loginBox input[name="upwd"]').blur(function(){
	checkupwd();
});
