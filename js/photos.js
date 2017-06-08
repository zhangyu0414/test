$(document).ready(function(){
  var uid=hoster.id;
  var uname=user.name;
  var email=user.email;
  loadAlbums(uid);
});

//加载相册信息
function loadAlbums(uid){
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