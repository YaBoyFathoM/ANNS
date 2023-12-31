import wixUsers from "wix-users";
import wixData from "wix-data";
import { authentication } from "wix-members-frontend";
import { timeline } from "wix-animations";
import wixLocation from 'wix-location';
let menushown = false;
$w("#hoverbutto").label="+";
let lock = false;
let UserID = wixUsers.currentUser.id;
$w("#blocker").show();
$w("#loadinggif").show();
$w.onReady(function () {
$w("#blocker").hide("fade",{delay:1200,duration:800});
$w("#loadinggif").hide("fade",{duration:1200});
function getkarma() {
  wixData
  .query("Userkarma")
  .eq("userId", UserID)
  .find()
  .then((results) => {
    if (wixUsers.currentUser.loggedIn) {
    if (results.items.length > 0) {
      $w("#currentkarma").text = results.items[0].karma.toString();
      return;
    }
  }else{
    authentication.promptLogin();
  }
});
}
function showmenu() {
  if (!menushown&&!lock) {;
  $w("#rightdown").expand();
  $w("#leftdown").expand();
  $w("#topright").show("roll", { direction: "left", duration: 400 });
  $w("#topleft").show("roll", { direction: "right", duration: 400 });
  $w("#bottomright").show("roll", { direction: "left", duration: 400 });
  $w("#bottomleft").show("roll", { direction: "right", duration: 400 });
  $w("#tabsmenu").show("roll", { delay:400, direction: "top", duration: 200 });
  $w("#currentkarma").show("roll", { direction: "right", duration: 400 });
  $w("#badge").show("roll", { direction: "left", duration: 400 });
  const leftdownTimeline = timeline().add($w("#leftdown"), {
    duration: 200,
    y: 66,
    easing: "easeInOutSine",
  });
  const rightdownTimeline =timeline().add($w("#rightdown"), {
    duration: 200,
    y: 66,
    easing: "easeInOutSine",
  });
  setTimeout(function () {
  $w("#rightdown").show();
  $w("#leftdown").show();
  leftdownTimeline.play();
  rightdownTimeline.play();
  $w("#bountiesbutton").show("roll", {direction: "top", duration: 100 });
  $w("#blogbutton").show("roll", {direction: "top", duration: 100 });
  setTimeout(function () {
    leftdownTimeline.pause();
    rightdownTimeline.pause();
    menushown=true;
  }, 200);
  }, 400);
    $w("#logoutbutton").onClick((event) => {
      wixUsers.logout();
    });
  }
}
function hidemenu() {
  if (menushown&&!lock) {
  const leftdownTimeline = timeline().add($w("#leftdown"), {
    duration: 200,
    y: 0,
    easing: "easeInOutSine",
  });
  const rightdownTimeline =timeline().add($w("#rightdown"), {
    duration: 200,
    y: 0,
    easing: "easeInOutSine",
  });
  leftdownTimeline.play();
  rightdownTimeline.play();
  $w("#blogbutton").hide("roll", {direction: "top", duration: 200 });
  $w("#bountiesbutton").hide("roll", {direction: "top", duration: 200 });
  $w("#tabsmenu").hide("roll", { direction: "top", duration: 200 });
  setTimeout(function () {
    setTimeout(function () {
      $w("#rightdown").collapse();
      $w("#leftdown").collapse();
    }, 400);
    menushown=false;
    $w("#rightdown").hide();
    $w("#leftdown").hide();
  leftdownTimeline.pause();
  rightdownTimeline.pause();
  }, 200);
  $w("#currentkarma").hide("roll", { delay:300, direction: "right", duration: 200 });
  $w("#badge").hide("roll", { delay:300, direction: "left", duration: 200 });
  $w("#topright").hide("roll", { delay:300, direction: "left", duration: 400 });
  $w("#topleft").hide("roll", { delay:300, direction: "right", duration: 400 });
  $w("#bottomright").hide("roll", { delay:300, direction: "left", duration: 400 });
  $w("#bottomleft").hide("roll", { delay:300, direction: "right", duration: 400 });
}
}
if (wixUsers.currentUser.loggedIn) {
  getkarma();
  $w("#hoverbutto").label=""
}
else{
$w("#currentkarma").collapse();$w("#badge").collapse();
$w("#hoverbutto").onClick(function(){
authentication.promptLogin();
});
$w("#profiletab").onClick(function(){
authentication.promptLogin();
});
}
$w("#hoverbutto").onMouseIn(function () {
  showmenu();
});
$w("#accountbox").onMouseOut(function () {
  hidemenu();
});
$w("#bountiesbutton").onClick(function(){
  $w("#loadinggif").show("fade",{duration:500});
  wixLocation.to("https://www.anns.ai/bounties");
});

});


