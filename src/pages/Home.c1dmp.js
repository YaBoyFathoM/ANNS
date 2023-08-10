// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world



    $w.onReady(function () {
        $w("#webs").allowFullScreen();
            $w("#loadinggif").hide("fade", {duration: 200 });
            $w("#annsbg").show("fade", {duration: 200 });
            $w("#bountybg").show("fade", {duration: 200 });
            $w("#rlbg").show("fade", {duration: 200 });
            $w("#blogbg").show("fade", {duration: 200 });
            $w("#section1").onViewportEnter(function () {
                setTimeout(() => {
                    $w("#annsfg").show("fade", {duration: 200 });
                }, 500);
            });
            $w("#section1").onViewportLeave(function () {
                $w("#annsfg").hide("fade", {duration: 200 });
            });
            $w("#section2").onViewportEnter(function () {
                setTimeout(() => {
                    $w("#bountyfg").show("fade", {duration: 200 });
                }, 500);
            });
            $w("#section2").onViewportLeave(function () {
                $w("#bountyfg").hide("fade", {duration: 200 });
            });
            $w("#section3").onViewportEnter(function () {
                setTimeout(() => {
                    $w("#rlfg").show("fade", {duration: 200 });
                }, 500);
            });
            $w("#section3").onViewportLeave(function () {
                $w("#rlfg").hide("fade", {duration: 200 });
            });
            $w("#section4").onViewportEnter(function () {
                setTimeout(() => {
                    $w("#blogfg").show("fade", {duration: 200 });
                }, 500);
            });
            $w("#section4").onViewportLeave(function () {
                $w("#blogfg").hide("fade", {duration: 200 });
            });
            $w("#footer").onViewportEnter(function () {
                setTimeout(() => {
                    $w("#blogfg").show("fade", {duration: 200 });
                }, 500);
            });
    // $w("#rlbutton").onClick(function () {
    //     $w("#loadinggif").show("fade",{duration:200});
    //     $w("#annsbutton").hide("fade",{duration:200});
    //     setTimeout(() => {
    //         wixLocation.to("https://www.anns.ai/post/adversarial-neural-network-security");
    //     }, 200);
    // });
      // $w("#bountybutton").onClick(function () {
      //   $w("#loadinggif").show("fade",{duration:200});
      //   $w("#annsbutton").hide("fade",{duration:200});
      //       setTimeout(() => {
      //       wixLocation.to("https://www.anns.ai/Bounties");
      //   }, 200);
      // });


    $w.onReady(function () {
      if(wixWindow.formFactor === "Mobile") {
        wixLocation.to("https://www.anns.ai/mhome"); // redirect to mobile page
      }
    });
    $w("#webs").allowFullScreen();
    $w("#webs").scrollTo()
      $w("#hoverbutto").onMouseIn (function () {
        if(wixUsers.currentUser.loggedIn) {
            $w("#accountbo").expand();
            $w("#logou").onClick( (event) => {
      wixUsers.logout()
    });
       $w("#hoverbutto").onMouseIn (function () {
       $w("#badg").show("slide",{direction:"left",duration: 200})
       $w("#currentkarm").show("slide",{direction:"right",duration: 200})
       $w("#men").show("roll",{delay:200,direction:"top",duration: 200})
      });
        $w("#accountbo").onMouseOut (function () {
        $w("#badg").hide("slide",{delay:200,direction:"left",duration: 200})
        $w("#currentkarm").hide("slide",{delay:200,direction:"right",duration: 200})
        $w("#men").hide("roll",{direction:"top",duration: 200})

      });
        }else{$w("#hoverbutto").collapse();}
      });
    });

