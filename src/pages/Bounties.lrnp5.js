// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

import wixData from 'wix-data';
import {timeline} from 'wix-animations';
import wixUsers from 'wix-users';
import { authentication } from 'wix-members-frontend';
import {newsubmision,claimBounty,adduser} from 'backend/karma'
let userid=wixUsers.currentUser.id
adduser(userid);
$w("#bgvideo").mute();
$w("#bgvideo").play();
$w("#bgvideo").onEnded(function () {
$w("#bg").show("fade",{duration:200});
let changing = false;
$w("#bgvideo").delete();
$w("#bgvideo").hide("fade",{duration:200});
$w("#loadinggif").hide("fade",{duration:100});
//$w("#brighttext").show("fade",{duration:100});
$w("#cwbutton").show("fade",{delay:1000,duration:100});
$w("#ccwbutton").show("fade",{delay:1000,duration:100});
$w("#bingbutton").show("fade",{duration:100});
$w("#modelwheel").show("fade",{duration:100});
});
