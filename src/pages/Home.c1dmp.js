// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world


import wixUsers from 'wix-users';
import wixWindow from 'wix-window';
    $w.onReady(function () {
        $w("#webs").allowFullScreen();
            $w("#loadinggif").hide("fade", {duration: 200 });
            if(!wixUsers.currentUser.loggedIn) {
                $w("#annsbg").show("fade", {duration: 200 });
                $w("#annsbg").onClick(function () {
                    $w("#bountycard").show("glide",{direction:"left",duration: 800 });
                    $w("#profilecard").show("glide",{direction:"right",duration: 800 });
            });
        }else{
            $w("#bountycard").show("glide",{duration: 800,angle: 90 });
            $w("#profilecard").show("glide",{duration: 800,angle: 270 });
            $w("#activatorl1").show("glide",{duration: 400,delay: 800,angle: 90 });
            $w("#activatorl2").show("glide",{duration: 400,delay: 800,angle: 90 });
            $w("#activatorr1").show("glide",{duration: 400,delay: 800,angle: 270 });
            $w("#activatorr2").show("glide",{duration: 400,delay: 800,angle: 270 });
    }
    // $w("#blogfg").onClick(function () {
    //     $w("#loadinggif").show("fade",{duration:200});
    //     $w("#annsbutton").hide("fade",{duration:200});
    //     setTimeout(() => {
    //         wixLocation.to("https://www.anns.ai/post/adversarial-neural-network-security");
    //     }, 200);
    // });
      // $w("#bountyfg").onClick(function () {
      //   $w("#loadinggif").show("fade",{duration:200});
      //   $w("#annsbutton").hide("fade",{duration:200});
      //       setTimeout(() => {
      //       wixLocation.to("https://www.anns.ai/Bounties");
      //   }, 200);
      // });
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

