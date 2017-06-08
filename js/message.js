$(document).ready(function(){
  var uid=hoster.id;
  var uname=user.name;
  var email=user.email;
  $('#message-pages>li>a').on('click',function(e){
    e.preventDefault();
    var p=$(this).attr('data-page');
    if(p!=null){
      getmessage(uid,p,10);
    }
  });
  getmessage(uid);
  loadMessage(uname,email,uid);
});

//加载留言信息
function getmessage(uid,p,n){
  var n=10;
  var data={"uid":uid,"n":n,"p":p};
  $.getJSON('./data/getmessages.php',data,function(objects){
    console.log(objects);
    var pageCount=objects.pageCount;
    var pno=objects.pno;
    messages=objects.data;
    var html='';
    for(var i=0;i<messages.length;i++){
      var msg=messages[i];
      html+=`
						<li class="list-group-item">
						  <p><b>${msg.mname}&nbsp;:&nbsp;</b><small class="pull-right">${msg.createtime}</small></p>
							<p style="word-break: break-all;">${msg.mcontent}</p>
						</li>`;
    }
    $('#message-pages b.page-count').html(pageCount);
    $('#message-pages input').val(pno);
    if(pno<=1){
      $('#message-pages li.previous a').attr("data-page",null);
    }else{
      $('#message-pages li.previous a').attr("data-page",pno-1);
    }
    if(pno==pageCount){
      $('#message-pages li.next a').attr("data-page",null);
    }else{
      $('#message-pages li.next a').attr("data-page",pno+1);
    }
    $('#messages-loading').hide();
    $('#messages').html(html).slideDown();
  });
  $('#message textarea').on('keyup',function(){
    if($(this).val().length>100){
      $(this).val($(this).val().substr(0,100));
    }
  });
}

//加载留言板
function loadMessage(uname,email,uid){
  if(uname&&email){
    $('#message input[name="uname"]').hide().val(uname);
    $('#message input[name="email"]').hide().val(email);
  }
  $('#btn-msg').click(function(){
    var n=$('#message input[name="uname"]').val();
    var m=$('#message input[name="email"]').val();
    var t=$('#message textarea').val();
    if(canSend(n,m,t)){
      var text=$('#message textarea[name="content"]').val();
      var uname=$('#message input[name="uname"]').val();
      var email=$('#message input[name="email"]').val();
      $.post('./data/send_message.php',{'uid':uid,'uname':uname,'email':email,'text':text},function(){
        $('#message input[name="uname"]').val('');
        $('#message input[name="email"]').val('');
        if(uname&&email){
          $('#message input[name="uname"]').hide().val(uname);
          $('#message input[name="email"]').hide().val(email);
        }
        $('#message textarea[name="content"]').val('');
        getmessage(uid);
      });
    }
  });
}
