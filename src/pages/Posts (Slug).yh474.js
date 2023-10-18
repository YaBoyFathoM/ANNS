import wixUsers from "wix-users";
import wixData from "wix-data";
import wixLocation from 'wix-location';
import { authentication } from "wix-members-frontend";
import { timeline } from "wix-animations";
import {getPost} from "backend/blogposts";
let postslug= wixLocation.path[0];
let menushown = false;
let lock = false;
let UserID = wixUsers.currentUser.id;
function convertToStaticUrl(imageUrl) {
let staticUrl = imageUrl.replace("image://v1/", "https://static.wixstatic.com/media/");
staticUrl = staticUrl.substring(0, staticUrl.indexOf("#"));
staticUrl = staticUrl.substring(4);
return staticUrl;
  }
$w.onReady(function () {
$w("#loadinggif").hide("fade",{duration:800});
function getkarma() {
        wixData
        .query("Userkarma")
        .eq("userId", UserID)
        .find()
        .then((results) => {
          if (wixUsers.currentUser.loggedIn) {
          if (results.items.length > 0) {
            $w("#currentkarma").text = results.items[0].karma.toString();
            let voted=results.items[0].voted || [];
            console.log(`User ${UserID} already exists`);
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
        $w("#menuleftline").show("roll", { direction: "top", duration: 200 });
        $w("#menurightline").show("roll", { direction: "top", duration: 200 });
        const leftdownTimeline = timeline().add($w("#leftdown"), {
          duration: 200,
          y: 67,
          easing: "easeInOutSine",
        });
        const rightdownTimeline =timeline().add($w("#rightdown"), {
          duration: 200,
          y: 67,
          easing: "easeInOutSine",
        });
        setTimeout(function () {
        $w("#rightdown").show();
        $w("#leftdown").show();
        leftdownTimeline.play();
        rightdownTimeline.play();
        $w("#leaderboarddown").show("roll", {direction: "top", duration: 200 });
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
        $w("#leaderboarddown").hide("roll", {direction: "bottom", duration: 200 });
        $w("#tabsmenu").hide("roll", { direction: "bottom", duration: 200 });
        $w("#menuleftline").hide("roll", { direction: "top", duration: 200 });
        $w("#menurightline").hide("roll", { direction: "top", duration: 200 });
        setTimeout(function () {
        setTimeout(function () {
          $w("#rightdown").collapse();
          $w("#leftdown").collapse();
          menushown=false;
        }, 400);
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
        $w("#hoverbutto").onMouseIn(function () {
          showmenu();
        });
        $w("#accountbox").onMouseOut(function () {
          hidemenu();
        });
}
else{
$w("#currentkarma").collapse();$w("#badge").collapse();$w("#hoverbutto").label="+";
$w("#hoverbutto").onClick(function(){
authentication.promptLogin();
});
}
async function getauthor(authorId){
  const result = await wixData.get("Members/PrivateMembersData", authorId);
  return [result.nickname, result.picture];
}
console.log(postslug);
getPost(postslug).then((result) => {
  const post=result.post;
  let postimage = "https://static.wixstatic.com/media/cef1ec_9758561209b54b7e8c371d3e7d1dfef8~mv2.png";
  if (post.media) {
  postimage = convertToStaticUrl(post.media.wixMedia.image);
  }
  let authorId=post.memberId;
  getauthor(authorId).then((result) => {
      let authorname=result[0];
      let authorimage=result[1];
      let title=post.title;
      let content=post.richContent;
      let date=post.lastPublishedDate;
      const postdata = {
          title: title,
          content: content,
          image: postimage,
          date: date,
          authorname: authorname,
          authorimage: authorimage
      };
      console.log(postdata);
      $w("#webs").postMessage(postdata);
  });
});
});