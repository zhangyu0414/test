/*
 * 网站共有js
 */

//获取local
var hoster={
  id:1
}
var user={
  name:null,
  email:null
}
if(window.localStorage.getItem("#login")){
  $('#loginBox').show();
}else{
  $('#loginBox').hide();
}
if(window.localStorage.getItem("userName")){
  user.name=window.localStorage.getItem("userName");
}
if(window.localStorage.getItem("email")){
  user.email=window.localStorage.getItem("email");
}

$(document).ready(function() {
  var uid=hoster.id;
  //加载用户信息
  loadUser();
  //加载博客主信息
  loadHosterInfo(uid);
});

//设置跳转链接
$('body').on('click','a[href="#"]',function(e){
  e.preventDefault();
  switch($(this).attr('data-addr')){
    case 'index':
      href('index');
      break;
    case 'moods':
      href('moods');
      break;
    case 'blog':
      href('blog');
      break;
    case 'photos':
      href('photos');
      break;
    case 'message':
      href('message');
      break;
    case 'register':
      $('#main').hide();
      $('#loginBox').hide();
      $('#registerBox').show();
      break;
    case 'login':
      $('#main').hide();
      $('#registerBox').hide();
      $('#loginBox').show();
      break;
    case 'exit':
      var r=confirm("确定退出当前账号吗？")
      if(r==true){
        window.localStorage.removeItem("userName");
        window.localStorage.removeItem("email");
        window.scroll(0,0);
        location.reload();
      }
      break;
  }
  function href(addr){
    location.href=addr+'.html';
  }
});

//加载用户信息
function loadUser(){
  if (user.name === null) {
    var html=`
				<li><a href="#" data-addr="register">注册</a></li>
        <li><a href="#" data-addr="login">登录</a></li>`;
    $('#account_nav').html(html);
  } else {
    var uname = user.name;
    //加载用户信息
    $.getJSON('./data/getuserinfo.php','uname='+uname, function(objects) {
      var user = objects[0];
      var html = `
					<li><a href="#">消息</a></li>
          <li><a href="#">邮件</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				${user.name}<b class="caret"></b>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#">个人资料</a></li>
              <li><a href="#">设置</a></li>
              <li><a href="#" data-addr="exit">退出</a></li>
            </ul>
          </li>`;
      $('#account_nav').html(html);
    });
  }
}

//加载博客主信息
function loadHosterInfo(uid){
  $.getJSON('./data/getpersoninfo.php','uid='+uid,function(objects){
    var person=objects[0];
    var html=`
				<div class="media-middle">
          <img class="img-circle" src="${person.bpic}"/>
          <br><br>
          <p>${person.name}</p>
          <p>常居：福建厦门</p>
          <p>双子座</p>
        </div>
        <div class="self_intro">
          <br><br>
          <h3>爱好&nbsp;<small>&nbsp;HOBBY</small></h3>
          <br>
          <p>${person.hobby}</p>
          <br><br>
          <h3>技能&nbsp;<small>&nbsp;SKILLS</small></h3>
          <br>`;
    var skills=JSON.parse(person.skills);
    for(key in skills){
      html+=`
					<p>${key}</p>
          <div class="progress">
						<div class="progress-bar progress-bar-striped progress-bar-info" style="width:${skills[key]}"></div>
          </div>`;}
    html+=`<br><br>
          <h3>联系&nbsp;<small>&nbsp;Say hi to me</small></h3>
          <br>
          <p>Phone&nbsp;:&nbsp;${person.phone}</p>
          <p>EMail&nbsp;:&nbsp;${person.email}</p>
          <br><br>
        </div>`;
    $('#person_info').html(html);
  });
}

function canSend(n,m,t){
  if(n==""||n==null||n==undefined){
    alert('名称不能为空');
    return false;
  }else if(n.length>30){
    alert('名称过长！');
    return false;
  }else if(m==""||m==null||m==undefined){
    alert('邮箱不能为空');
    return false;
  }else if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(m))){
    alert('邮箱格式不对');
    return false;
  }else if(m.length>50){
    alert('邮箱号过长！');
    return false;
  }else if(t==""||t==null||t==undefined){
    alert('内容不能为空');
    return false;
  }else if(t.length>100){
    alert('内容不能超过100字符');
    return false;
  }else{
    return true;
  }
}