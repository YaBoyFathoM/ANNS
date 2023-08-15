// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world


import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
    $w.onReady(function () {
      $w("#loadinggif").hide("fade",{duration:300});
      $w("#annsfg").show("fade",{duration:300});

        $w("#bountynav").onClick(function () {
          $w("#writer").postMessage("Bounty\nhunting");
          setTimeout(() => {
          wixLocation.to("https://www.anns.ai/bounties");
      }, 4000);
        });
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
          $w("#hoverbutto").expand();
            $w("#accountbox").expand();
            $w("#logou").onClick( (event) => {
      wixUsers.logout()
    });
       $w("#hoverbutto").onMouseIn (function () {
       $w("#badge").show("slide",{direction:"left",duration: 200})
       $w("#currentkarma").show("slide",{direction:"right",duration: 200})
       $w("#men").show("roll",{delay:200,direction:"top",duration: 200})
      });
        $w("#accountbox").onMouseOut (function () {
        $w("#badge").hide("slide",{delay:200,direction:"left",duration: 200})
        $w("#currentkarma").hide("slide",{delay:200,direction:"right",duration: 200})
        $w("#men").hide("roll",{direction:"top",duration: 200})

      });
        }else{$w("#hoverbutto").collapse();}
      });
    });

