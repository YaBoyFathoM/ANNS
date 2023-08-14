// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

import wixData from 'wix-data';
import {timeline} from 'wix-animations';
import wixUsers from 'wix-users';
import { authentication } from 'wix-members-frontend';
import {newsubmision,claimBounty,adduser} from 'backend/karma'

$w.onReady (function () {
let userid=wixUsers.currentUser.id
adduser(userid);
let changing = false;
//$w("#brighttext").show("fade",{duration:100});
$w("#modelwheel").show("fade",{duration:100});
        $w('#profilescreen').postMessage({bountytitle: "_", difficulty: "none", bountydescription: "_"});
        $w('#bountyscreen').postMessage({bountytitle: "_", difficulty: "none", bountydescription: "_"});
        setTimeout(function () {
            $w('#bountyscreen').show("fade",{duration:500});
            $w('#profilescreen').show("fade",{duration:500});
            $w("#bingbutton").show("fade",{duration:500});
        }, 1500);
});

