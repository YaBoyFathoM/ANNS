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
let currentUserKarma = 0;
function convertToStaticUrl(imageUrl) {
let staticUrl = imageUrl.replace("image://v1/", "https://static.wixstatic.com/media/");
staticUrl = staticUrl.substring(0, staticUrl.indexOf("#"));
staticUrl = staticUrl.substring(4);
return staticUrl;
  }
$w.onReady(function () {
function getkarma() {
    wixData
    .query("Userkarma")
    .eq("userId", UserID)
    .find()
    .then((results) => {
      if (wixUsers.currentUser.loggedIn) {
      if (results.items.length > 0) {
        currentUserKarma = results.items[0].karma;
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
    $w("#downvotebutton").show("roll", {direction: "top", duration: 100 });
    $w("#upvotebutton").show("roll", {direction: "top", duration: 100 });
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
    $w("#upvotebutton").hide("roll", {direction: "top", duration: 200 });
    $w("#downvotebutton").hide("roll", {direction: "top", duration: 200 });
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
$w("#hoverbutto").label="+";
$w("#hoverbutto").onClick(function(){
authentication.promptLogin();
});
}
$w("#hoverbutto").onMouseIn(function () {
  showmenu();
});
$w("#accountbox").onMouseOut(function () {
  hidemenu();
});
async function getauthor(authorId){
  const result = await wixData.get("Members/PrivateMembersData", authorId);
  return [result.nickname, result.picture];
}

getPost(postslug).then((result) => {
  const post = result.post;
  const postid = post._id;
  let postimage = "https://static.wixstatic.com/media/cef1ec_9758561209b54b7e8c371d3e7d1dfef8~mv2.png";
  if (post.media) {
    postimage = convertToStaticUrl(post.media.wixMedia.image);
  }
  let authorId = post.memberId;
  getauthor(authorId).then((result) => {
    let authorname = result[0];
    let authorimage = result[1];
    let title = post.title;
    let content = post.richContent;
    let date = new Date(post.lastPublishedDate).toDateString();
    const postdata = {
      title: title,
      content: content,
      image: postimage,
      date: date,
      authorname: authorname,
      authorimage: authorimage
    };
    $w("#webs").postMessage(postdata);
  });
  const postKarma = wixData.query("postkarma").eq("postid", postid);
  postKarma.find().then((results) => {
      let currentPostKarma = 0;
      results.items.forEach((item) => {
        currentPostKarma += item.karma;
      });
      let karmastring = currentPostKarma.toString();
      $w("#postdownvotekarmatext").html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#444444 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
        karmastring
      }</span></span></span></span></h3>`;
      $w("#postupvotekarmatext").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#444444 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
        karmastring
      }</span></span></span></span></h3>`;
      if (wixUsers.currentUser.loggedIn) {
      if(UserID != authorId)
      {

function animatedownvote(){
  $w("#postdownvotekarmatext").show("roll", { direction: "left", duration: 500 });
  setTimeout(function () {
    $w("#postdownvotekarmatext").html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
      (currentPostKarma).toString()
    }</span></span></span></span></h3>`;
    $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
      (currentUserKarma).toString()
    }</span></span></span></span></h3>`;
    setTimeout(function () {
      $w("#postdownvotekarmatext").html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#444444 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
        (currentPostKarma - 1).toString()
      }</span></span></span></span></h3>`;
      $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#444444 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
        (currentUserKarma - 1).toString()
      }</span></span></span></span></h3>`;
    }, 100);
    setTimeout(function () {
      $w("#postdownvotekarmatext").hide("roll", { direction: "left", duration: 500 });
      currentPostKarma = currentPostKarma - 1;
      currentUserKarma = currentUserKarma - 1;
    }, 500);
  }, 1000);
}
function animateupvote(){
  $w("#postupvotekarmatext").show("roll", { direction: "right", duration: 500 });
  setTimeout(function () {
    $w("#postupvotekarmatext").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
      (currentPostKarma).toString()
    }</span></span></span></span></h3>`;
    $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
      (currentUserKarma).toString()
    }</span></span></span></span></h3>`;
    setTimeout(function () {
      $w("#postupvotekarmatext").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#444444 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
        (currentPostKarma + 1).toString()
      }</span></span></span></span></h3>`;
      $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#444444 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
        (currentUserKarma - 1).toString()
      }</span></span></span></span></h3>`;
    }, 100);
    setTimeout(function () {
      $w("#postupvotekarmatext").hide("roll", { direction: "right", duration: 500 });
      currentPostKarma = currentPostKarma - 1;
      currentPostKarma = currentPostKarma + 1;
    }, 500);
  }, 1000);
}
      $w("#upvotebutton").onClick(() => {
                $w("#postupvotekarmatext").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#444444 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
                  (currentPostKarma).toString()
                }</span></span></span></span></h3>`;
                wixData.query("postkarma").eq("postid", postid).eq("_owner", UserID).find().then((results) => {
                  if (results.items.length === 0) {
                wixData
                .insert("postkarma", {
                  postid: postid,
                  karma: currentPostKarma + 1,
                })
                  .then(() => {
                    currentUserKarma = currentUserKarma - 1;
                    animateupvote();
                  });
                }
                else {
                  wixData.update("postkarma", {
                    _id: results.items[0]._id,
                    postid: postid,
                    karma: currentPostKarma + 1,
                    _owner: UserID,
                  })
                    .then(() => {
                      currentUserKarma = currentUserKarma - 1;
                      animateupvote();
                    });
                }
                wixData
                .query("Userkarma")
                .eq("userId", UserID)
                .find()
                .then((results) => {
                    wixData.update("Userkarma", {
                      _id: results.items[0]._id,
                      userId: UserID,
                      karma: currentUserKarma,
                    });
            })
              });

      });
      $w("#downvotebutton").onClick(() => {
          $w("#postdownvotekarmatext").html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#444444 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
            (currentPostKarma).toString()
          }</span></span></span></span></h3>`;
          wixData.query("postkarma").eq("postid", postid).eq("_owner", UserID).find().then((results) => {
            if (results.items.length === 0) {
              wixData.insert("postkarma", {
                postid: postid,
                karma: currentPostKarma - 1,
                _owner: UserID,
              }).then(() => {
                currentUserKarma = currentUserKarma - 1;
                animatedownvote();
              });

            } else {
              wixData.update("postkarma", {
                _id: results.items[0]._id,
                postid: postid,
                karma: currentPostKarma - 1,
                _owner: UserID,
              }).then(() => {
                currentUserKarma = currentUserKarma - 1;
                animatedownvote();
              });

            }
          });
          wixData
          .query("Userkarma")
          .eq("userId", UserID)
          .find()
          .then((results) => {
              wixData.update("Userkarma", {
                _id: results.items[0]._id,
                userId: UserID,
                karma: currentUserKarma,
              });
      });
    });
      }
      }else{authentication.promptLogin();}
});
});
});

