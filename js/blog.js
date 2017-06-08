$(document).ready(function(){
  var uid=hoster.id;
  var uname=user.name;
  var email=user.email;
  loadNotes(uid);
});

//加载日志信息
function loadNotes(uid){
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