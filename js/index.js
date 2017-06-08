/*
 * index.js
 */

$(document).ready(function(){
		var uid=hoster.id;
		var uname=user.name;
		var email=user.email;
		//加载心情信息
		loadHosterMoods(uid);
		//加载日志信息
		loadHosterNotes(uid);
		//加载相册信息
		loadHosterAlbums(uid);
		//加载留言信息
		getmessage(uid);
		//加载留言
		loadMessage(uname,email,uid);
});


//加载心情信息
function loadHosterMoods(uid){
	$.getJSON('./data/getmoods.php','uid='+uid,function(objects){
		if(objects.recordCount!=="0"){
			var mood=objects.data[0];
			var html=`
					<p>${mood.mcontent}</p>
					<p><small class="pull-right">${mood.createtime}</small></p>`;
		}else{
			var html=`
					<p>博主很懒，什么心情也没发...</p>
					<p><small class="pull-right">管理员留</small></p>`;
		}
		$('#mood-loading').hide();
		$('#mood').html(html).slideDown();
	});
}

//加载日志信息
function loadHosterNotes(uid){
	$.getJSON('./data/getblogs.php','uid='+uid+'&n=5',function(objects){
		var html='';
		if(objects.recordCount!=="0"){
			notes=objects.data;
			for(var i=0;i<notes.length;i++){
				var note=notes[i];
				if(note.ncontent.length>80){
					note.ncontent=note.ncontent.slice(0,79);
				}
				html+=`
						<li class="list-group-item">
							<h5 class="list-group-item-heading">
								<a href="#">
									${note.ntitle}
								</a>
								<small class="pull-right">${note.createtime}</small>
							</h5>
							<p class="list-group-item-text">${note.ncontent}...</p>
						</li>`;
			}
		}else{
			html+=`
					<li class="list-group-item">
						<h5 class="list-group-item-heading">
							<a href="#">
							</a>
							<small class="pull-right"></small>
						</h5>
						<p class="list-group-item-text">博主很懒，什么也没写...</p>
					</li>`;
		}
		$('#blogs-loading').hide();
		$('#blogs').html(html).slideDown();
	});
}

//加载相册信息
function loadHosterAlbums(uid){
	$.getJSON('./data/getalbums.php','uid='+uid,function(objects){
		var html='';
		for(var i=0;i<objects.length;i++){
			var album=objects[i];
			html+=`
					<div class="col-md-3 col-sm-6 col-xs-12">
            <a href="#"><img src="${album.acover}" class="img-thumbnail"/></a>
          </div>`;
		}
		$('#photos-loading').hide();
		$('#photos .row').html(html).parent().slideDown();
	});
}

//加载留言信息
function getmessage(uid){
	$.getJSON('./data/getmessages.php','uid='+uid+'&n=5',function(objects){
		messages=objects.data;
		var html='';
		for(var i=0;i<messages.length;i++){
			var msg=messages[i];
			html+=`
						<li class="list-group-item">
							<p style="word-break: break-all;"><b>${msg.mname}&nbsp;:&nbsp;</b>${msg.mcontent}</p>
						</li>`;
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

//加载留言
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

