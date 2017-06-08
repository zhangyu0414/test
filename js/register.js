
//点击注册
$('#btnRegister').click(function(){
  if(canRegister()){
    var account=$('#registerBox input[name="account"]').val();
    var pwd=$('#registerBox input[name="userPwd"]').val();
    var uname=$('#registerBox input[name="userName"]').val();
    var email=$('#registerBox input[name="userMail"]').val();
    var phone=$('#registerBox input[name="userPhone"]').val();
    var data={"account":account,"upwd":pwd,"name":uname,"email":email,"phone":phone};
    $.getJSON('./data/register.php',data,function(object){
      if(object.code===6000){
        window.localStorage.setItem('userName',uname);
        window.localStorage.setItem('email',email);
        alert("注册成功，点击确定跳转至主页");
        window.location.href='index.html';
      }
    });
  }
});

//验证注册
function canRegister(){
  var b1=checkaccount();
  var b2=checkuserPwd();
  var b3=checkrePwd();
  var b4=checkuserName();
  var b5=checkuserMail();
  var b6=checkuserPhone();
  console.log(b1,b2,b3,b4,b5,b6);
  if(b1&&b2&&b3&&b4&&b5&&b6){
    return true;
  }else{
    return false;
  }
}

/*验证规则及错误提示*/
//注册验证规则
var registerRule={
  account:{
    required:true,//必填
    minlength:6, //最少6个字符
    maxlength:20,//最多20个字符
    account:/^[a-zA-z][a-zA-Z0-9_]{5,19}$/
  },
  userPwd:{
    required:true,
    minlength:8,
    maxlength:30
  },
  rePwd:{
    required:true,
    equalTo:'userPwd'
  },
  userName:{
    required:true,
    minlength:2, //最少2个字符
    maxlength:30,//最多30个字符
    remote: "用户昵称已存在"
  },
  userMail:{
    required:true,
    maxlength:50,//最多50个字符
    email:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  },
  userPhone:{
    required:true,
    phone_number:/^1(3|4|5|7|8)\d{9}$/
  }
}
//注册错误信息提示
var registerError={
  account:{
    required:"必须填写账号",
    minlength:"账号至少为"+registerRule.account.minlength+"个字符",
    maxlength:"账号至多为"+registerRule.account.maxlength+"个字符",
    account:"账号应为首字符为字母的字母和数字的组合",
    remote:"用户名已存在"
  },
  userPwd:{
    required:"必须填写密码",
    minlength:"密码至少为"+registerRule.userPwd.minlength+"个字符",
    maxlength:"密码至多为"+registerRule.userPwd.maxlength+"个字符"
  },
  rePwd:{
    required: "请再次输入密码",
    equalTo: "两次输入密码不一致"//与另一个元素相同
  },
  userName:{
    required:"请输入用户昵称",
    minlength:"账号至少为"+registerRule.userName.minlength+"个字符",
    maxlength:"账号至多为"+registerRule.userName.maxlength+"个字符",
    remote: "用户昵称已存在"
  },
  userMail:{
    required:"请输入邮箱地址",
    maxlength:"邮箱长度过长",
    email: "请输入正确的email格式地址",
    remote: "邮箱已存在"
  },
  userPhone:{
    required:"请输入手机号码",
    phone_number:"请输入正确的手机号码"
  }
}

//验证注册账号
function checkaccount(){
  var n=$('#registerBox input[name="account"]');
  var text=n.val();
  var b=false;
  var accountReg=new RegExp(registerRule.account.account);
  if(text==''||text==null||text==undefined){
    n.siblings('label').html(registerError.account.required).css('opacity',1);
    return false;
  }else if(text.length<registerRule.account.minlength){
    n.siblings('label').html(registerError.account.minlength).css('opacity',1);
    return false;
  }else if(text.length>registerRule.account.maxlength){
    n.siblings('label').html(registerError.account.maxlength).css('opacity',1);
    return false;
  }else if(!accountReg.test(text)){
    n.siblings('label').html(registerError.account.account).css('opacity',1);
    return false;
  }else{
    $.ajax({
      type:"GET",
      url:'./data/check_account.php',
      async:false,
      data:'account='+text,
      dataType:"json",
      success:function(object){
        if(object.code=='3001'){
          n.siblings('label').html(registerError.account.remote).css('opacity',1);
          b=false;
        }else if(object.code=='3000'){
          n.siblings('label').css('opacity',0);
          b=true;
        }else{
          console.log('查询账号出错。')
          b=false;
        }
      }
    });
    return b;
  }
}
//验证注册密码
function checkuserPwd(){
  var n=$('#registerBox input[name="userPwd"]');
  var text=n.val();
  if(text==''||text==null||text==undefined){
    n.siblings('label').html(registerError.userPwd.required).css('opacity',1);
    return false;
  }else if(text.length<registerRule.userPwd.minlength){
    n.siblings('label').html(registerError.userPwd.minlength).css('opacity',1);
    return false;
  }else if(text.length>registerRule.userPwd.maxlength){
    n.siblings('label').html(registerError.userPwd.maxlength).css('opacity',1);
    return false;
  }else{
    n.siblings('label').css('opacity',0);
    return true;
  }
}
//验证注册重复密码
function checkrePwd(){
  var n=$('#registerBox input[name="rePwd"]');
  var n1=$('#registerBox input[name="'+registerRule.rePwd.equalTo+'"]');
  var text=n.val();
  if(text==''||text==null||text==undefined){
    n.siblings('label').html(registerError.rePwd.required).css('opacity',1);
    return false;
  }else if(text!=n1.val()){
    n.siblings('label').html(registerError.rePwd.equalTo).css('opacity',1);
    return false;
  }else{
    n.siblings('label').css('opacity',0);
    return true;
  }
}
//验证注册用户昵称
function checkuserName(){
  var n=$('#registerBox input[name="userName"]');
  var text=n.val();
  var b=false;
  if(text==''||text==null||text==undefined){
    n.siblings('label').html(registerError.userName.required).css('opacity',1);
    return false;
  }else if(text.length<registerRule.userName.minlength){
    n.siblings('label').html(registerError.userName.minlength).css('opacity',1);
    return false;
  }else if(text.length>registerRule.userName.maxlength){
    n.siblings('label').html(registerError.userName.maxlength).css('opacity',1);
    return false;
  }else{
    $.ajax({
      type:"GET",
      url:'./data/check_username.php',
      async:false,
      data:'userName='+text,
      dataType:"json",
      success:function(object){
        if(object.code=='4001'){
          n.siblings('label').html(registerError.userName.remote).css('opacity',1);
          b=false;
        }else if(object.code=='4000'){
          n.siblings('label').css('opacity',0);
          b=true;
        }else{
          console.log('查询昵称出错。');
          b=false;
        }
      }
    });
    return b;
  }
}
//验证邮箱
function checkuserMail(){
  var n=$('#registerBox input[name="userMail"]');
  var text=n.val();
  var emailReg=new RegExp(registerRule.userMail.email);
  var b=false;
  if(text==''||text==null||text==undefined){
    n.siblings('label').html(registerError.userMail.required).css('opacity',1);
    return false;
  }else if(text.length>registerRule.userMail.maxlength){
    n.siblings('label').html(registerError.userMail.maxlength).css('opacity',1);
    return false;
  }else if(!emailReg.test(text)){
    n.siblings('label').html(registerError.userMail.email).css('opacity',1);
    return false;
  }else{
    $.ajax({
      type:"GET",
      url:'./data/check_email.php',
      async:false,
      data:'email='+text,
      dataType:"json",
      success:function(object){
        if(object.code=='5001'){
          n.siblings('label').html(registerError.userMail.remote).css('opacity',1);
          b=false;
        }else if(object.code=='5000'){
          n.siblings('label').css('opacity',0);
          b=true;
        }else{
          console.log('查询邮箱出错。');
          b=false;
        }
      }
    });
    return b;
  }
}
//验证注册手机
function checkuserPhone(){
  var n=$('#registerBox input[name="userPhone"]');
  var phoneReg=new RegExp(registerRule.userPhone.phone_number);
  var text=n.val();
  if(text==''||text==null||text==undefined){
    n.siblings('label').html(registerError.userPhone.required).css('opacity',1);
    return false;
  }else if(!phoneReg.test(text)){
    n.siblings('label').html(registerError.userPhone.phone_number).css('opacity',1);
    return false;
  }else{
    n.siblings('label').css('opacity',0);
    return true;
  }
}

//设置注册表单blur验证
$('#registerBox input[name="account"]').blur(function(){
  checkaccount();
});
$('#registerBox input[name="userPwd"]').blur(function(){
  checkuserPwd();
});
$('#registerBox input[name="rePwd"]').blur(function(){
  checkrePwd();
});
$('#registerBox input[name="userName"]').blur(function(){
  checkuserName();
});
$('#registerBox input[name="userMail"]').blur(function(){
  checkuserMail();
});
$('#registerBox input[name="userPhone"]').blur(function(){
  checkuserPhone();
});
