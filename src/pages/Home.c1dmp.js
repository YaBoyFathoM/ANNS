$w.onReady(function () {
  $w("#logo").show("fade",{duration:1000});
  $w("#loadinggif").hide("fade",{duration:500});
  $w("#webs").onMessage((event) => {
    if (event.data === '1') {
      setTimeout(function(){
        $w("#FAQ").show("fade");
        $w("#webs").postMessage("Under\nConstruction");
       },500);
      }
     });
});



