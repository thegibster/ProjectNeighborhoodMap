'use strict';
//From the dynamically generated knockout view list, when a item within the select section is changed
//the map marker corresponding to that selection will be triggered.

$('option').click(function(){
    $(this).addClass('mapLink');
})
$('select').change(function(){
    $(this).find(':selected').addClass('selected')
           .siblings('option').removeClass('selected');
    $('.selected').text();
     for(var i in $('option')){if($('option')[i].text==$('.selected').text()){
      google.maps.event.trigger(markers[i],'click');
      // console.log("success",i,$('.selected').text());
    }
  }
});
