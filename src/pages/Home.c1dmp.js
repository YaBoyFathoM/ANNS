$w.onReady(function () {
  $w("#bountyfg").show("fade",{delay:1000,duration:1000});
  $w("#logo").show("fade",{duration:1000});
  $w("#loadinggif").hide("fade",{duration:500});
  $w("#bountyfg").onMouseIn(function () {
    $w("#bountybg").show("fade",{duration:400});
    $w("#logo").hide("fade",{duration:100});
  });
     $w("#bountyfg").onClick(function () {
      $w("#bountybg").hide("fade",{duration:500});
      $w("#imageX7").hide("fade",{duration:500});
      $w("#sharplogo").hide("fade",{duration:500});
      $w("#bountybg").hide("fade",{duration:500});
      //$w("#loadinggif").show("fade",{duration:100});
      setTimeout(function(){
        $w("#webs").postMessage("Under\nConstruction");
        $w("#bountyfg").collapse();
       },500);
     });
});
