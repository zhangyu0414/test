$(document).ready(function(){
  var uid=hoster.id;
  var uname=user.name;
  var email=user.email;
  loadMoods(uid);
});

//加载心情信息
function loadMoods(uid,p,n){
  var n=10;
  var data={"uid":uid,"n":n,"p":p};
  $.getJSON('./data/getmoods.php',data,function(objects){
    console.log(objects);
    var pageCount=objects.pageCount;
    var pno=objects.pno;
    if(pageCount!=="0"){
      var html="";
      for(var i=0;i<objects.data.length;i++){
        var mood=objects.data[i];
        html+=`
          <li class="list-group-item">
            <p style="word-break: break-all;">${mood.mcontent}</p>
            <p style="word-break: break-all;">&nbsp;<small class="pull-right">${mood.createtime}</small></p>
          </li>`;
      }
    }else{
      var html=`
					<p>博主很懒，什么心情也没发...</p>
					<p><small class="pull-right">管理员留</small></p>`;
    }
    $('#mood-loading').hide();
    $('#mood').html(html).slideDown();
  });
}
