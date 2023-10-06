import wixUsers from "wix-users";
import wixData from "wix-data";
import { timeline } from "wix-animations";
import { authentication } from "wix-members-frontend";
import * as tf from "@tensorflow/tfjs";
import { Image } from "image-js";
let UserID;
let voted=[];
const screen_model = tf.loadLayersModel(
  tf.io.browserHTTPRequest(
    "https://storage.googleapis.com/classifier_tfjs/model.json",
  ),
);
$w.onReady(function () {
  let counter=0;
  let connector = $w("#easyconnector");
  let selected = $w("#bounty00");
  let bright;
  let dim;
  let bounties = [];
  let modelstring;
  let reward;
  let collection;
  let submittedids = [];
  let difficultystring = "easy";
  let previousDifficultystring = "none";
  let pos = 0;
  let changing = false;
  let wheelAngle = 0;
  let menushown = false;
  let lock = true;
  const difffoundation = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_d26b49973d6e43758e58940aa9fdbacb~mv2.png",
    "diffbg.png",
    "3000x3000",
  );
  const mjlight = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_9191c6b8f0e04b14942163074a25d0b0~mv2.png",
    "mjlight.png",
    "613x262",
  );
  const mjdark = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_6a96031542944866ab5f5db9d8c888a2~mv2.png",
    "mjdark.png",
    "613x262",
  );
  const chatlight = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_40c894a85bef4ba88340a008ef260e02~mv2.png",
    "chatlight.png",
    "225x192",
  );
  const chatdark = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_f0c48cffdcaf4aebb4884ee55e2d5960~mv2.png",
    "chatdark.png",
    "225x192",
  );
  const bingdark = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_6d32706a633244f099dd77a31e0c7934~mv2.png",
    "bingdark.png",
    "190x103",
  );
  const binglight = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_cceb11cad6f94dfe96368f826f94c434~mv2.png",
    "binglight.png",
    "190x103",
  );
  const models = [
    {
      name: "bing",
      angle: 0,
      darksrc: bingdark,
      brightsrc: binglight,
      button: $w("#bingbutton"),
    },
    {
      name: "mj",
      angle: 90,
      darksrc: mjdark,
      brightsrc: mjlight,
      button: $w("#mjbutton"),
    },
    {
      name: "chatgpt",
      angle: 180,
      darksrc: chatdark,
      brightsrc: chatlight,
      button: $w("#chatgptbutton"),
    },
  ];
  let currentmodel = models[0];
  let nonebounty = {
    bountytitle: " ",
    difficulty: "none",
    bountydescription: " ",
  };
  let bountybuttons = [
    $w(`#bounty01`),
    $w(`#bounty02`),
    $w(`#bounty03`),
    $w(`#bounty04`),
    $w(`#bounty05`),
    $w(`#bounty06`),
    $w(`#bounty07`),
    $w(`#bounty08`),
    $w(`#bounty09`),
    $w(`#bounty10`),
    $w(`#bounty11`),
    $w(`#bounty12`),
    $w(`#bounty13`),
    $w(`#bounty14`),
    $w(`#bounty15`),
    $w(`#bounty16`),
    $w(`#bounty17`),
    $w(`#bounty18`),
    $w(`#bounty19`),
    $w(`#bounty20`),
    $w(`#bounty21`),
    $w(`#bounty22`),
    $w(`#bounty23`),
  ];
  $w("#foundation").expand();
  function convertToStaticUrl(imageUrl) {
    let urlId = imageUrl.split("/")[3].split(".")[0];
    let urlExtension = imageUrl.split("/")[4].split(".")[1].split("#")[0];
    let staticUrl = `https://static.wixstatic.com/media/${urlId}.${urlExtension}`;
    return staticUrl;
  }
  async function classifyImage(staticUrl, w, h) {
    const image = await Image.load(staticUrl);
    const imageTensor = tf.browser.fromPixels(image).div(tf.scalar(255));
    const resized = tf.image
      .resizeBilinear(imageTensor, [500, 500])
      .expandDims(0);
    const predictions = (await screen_model).predict(resized);
    const predictedclass = predictions.argMax(1).dataSync()[0];
    if (predictedclass === 1) {
      return true;
    } else {
      return false;
    }
  }
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
    // $w("#currentkarma").show("roll", { direction: "right", duration: 400 });
    // $w("#badge").show("roll", { direction: "left", duration: 400 });
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
    $w("#rlhfdown").show("roll", {direction: "top", duration: 200 });
    $w("#menuleftline").show("roll", { direction: "top", duration: 200 });
    $w("#menurightline").show("roll", { direction: "top", duration: 200 });
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
    $w("#rlhfdown").hide("roll", {direction: "bottom", duration: 200 });
    $w("#leaderboarddown").hide("roll", {direction: "bottom", duration: 200 });
    $w("#tabsmenu").hide("roll", { direction: "bottom", duration: 200 });
    $w("#menuleftline").hide("roll", { direction: "bottom", duration: 200 });
    $w("#menurightline").hide("roll", { direction: "bottom", duration: 200 });
    setTimeout(function () {
    setTimeout(function () {
      $w("#rightdown").collapse();
      $w("#leftdown").collapse();
    }, 400);
    $w("#rightdown").hide();
    $w("#leftdown").hide();
    leftdownTimeline.pause();
    rightdownTimeline.pause();
    menushown=false;
    }, 200);
    // $w("#currentkarma").hide("roll", { delay:300, direction: "right", duration: 200 });
    // $w("#badge").hide("roll", { delay:300, direction: "left", duration: 200 });
    $w("#topright").hide("roll", { delay:300, direction: "left", duration: 400 });
    $w("#topleft").hide("roll", { delay:300, direction: "right", duration: 400 });
    $w("#bottomright").hide("roll", { delay:300, direction: "left", duration: 400 });
    $w("#bottomleft").hide("roll", { delay:300, direction: "right", duration: 400 });
  }
  }
  if (wixUsers.currentUser.loggedIn) {
    UserID = wixUsers.currentUser.id;
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
    $w("#currentkarma").collapse();$w("#badge").collapse();$w("#claimbountyupload").collapse();$w("#hoverbutto").label="+";
    $w("#hoverbutto").onClick(function(){
    authentication.promptLogin();
    });
  }
  function generateSrc(url, name, resolution) {
    let src = "wix:image://v1/";
    let urlId = url.split("/")[4];
    let width = resolution.split("x")[0];
    let height = resolution.split("x")[1];
    src +=
      urlId + "/" + name + "#originWidth=" + width + "&originHeight=" + height;
    return src;
  }
  function claimBounty(collection, claim) {
    console.log(claim.bounty);
    wixData
      .insert(collection, claim)
      .then((item) => {
        console.log("Claim item inserted");
        const newkarma = Number(claim.reward);
        return wixData
          .query("Userkarma")
          .eq("userId", UserID)
          .find()
          .then((results) => {
            const item = results.items[0];
            if (results.length > 0) {
              item.karma += newkarma;
              wixData
                .update("Userkarma", item)
                .then((item) => {
                  console.log("User karma updated");
                  return item.karma;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  $w("#bgvideo").onEnded(function () {
    $w("#accountbox").show("fade", { duration: 200 });
    $w("#bg").show("fade", { duration: 200 });
    $w("#bgvideo").delete();
    $w("#leaderboard").show("fade", { duration: 500 });
    $w("#bgvideo").hide("fade", { duration: 200 });
    $w("#loadinggif").hide("fade", { duration: 100 });
    $w("#bingbutton").show("fade", { duration: 500 });
    $w("#brighttext").show("fade", { duration: 100 });
    $w("#cwbutton").show("fade", { duration: 100 });
    $w("#ccwbutton").show("fade", { duration: 100 });
    $w("#modelwheel").show("fade", { duration: 100 });
    $w("#difficultybox").show("fade", { duration: 100 });
    $w("#profilescreen").postMessage(nonebounty);
    $w("#bountyscreen").postMessage(nonebounty);
  });
  function buildhtml(fontsize, color, text) {
    return `<h3 class="wixui-rich-text__text" style="font-size:${fontsize}px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${color}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${text}</span></span></span></span></h3>`;
  }
  function nextModel(current, direction) {
    let index = models.findIndex((model) => model.name === current.name);
    if (direction === "cw") {
      return models[(index + 1) % models.length];
    } else {
      return models[(index - 1 + models.length) % models.length];
    }
  }
  function rotateModelWheel(direction) {
    let next = nextModel(currentmodel, direction);
    currentmodel.button.hide("fade", { duration: 400 });
    const changemodel = timeline();
    let angleDiff = next.angle - currentmodel.angle;
    if (direction === "cw" && angleDiff < 0) {
      angleDiff += 360;
    } else if (direction === "ccw" && angleDiff > 0) {
      angleDiff -= 360;
    }
    wheelAngle += angleDiff;
    changemodel.add($w("#modelwheel"), {
      rotate: wheelAngle,
      easing: "easeInSine",
      duration: 1000,
    });
    changemodel.play();
    setTimeout(() => {
      setTimeout(() => {
        changing = false;
        currentmodel = next;
      }, 600);
      $w("#brighttext").src = next.brightsrc;
      $w("#brighttext").show("slide", { delay: 500, duration: 200 });
      next.button.show("fade", { delay: 500, duration: 200 });
    }, 500);
  }
  $w("#cwbutton").onClick(function () {
    if (!changing) {
      changing = true;
      $w("#brighttext").hide("slide", { direction: "right", duration: 300 });
      rotateModelWheel("cw");
    }
  });
  $w("#ccwbutton").onClick(function () {
    if (!changing) {
      changing = true;
      $w("#brighttext").hide("slide", { direction: "left", duration: 300 });
      rotateModelWheel("ccw");
    }
  });
  function hidestuff() {
    initapps();
    lock=false;
    $w("#wheel").hide("fade", { duration: 300 });
    for (let i = 0; i < bountybuttons.length; i++) {
      bountybuttons[i].hide();
    }
    $w(
      "#easybutton",
    ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
    $w(
      "#medbutton",
    ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
    $w(
      "#hardbutton",
    ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
    $w("#modeltext",
    ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${modelstring}</span></span></span></span></h3>`;
    const EasyLineTimeline = timeline().add($w("#easybuttonline"), {
      duration: 200,
      x: -10,
      easing: "easeInOutSine",
    });
    const EasyButtonTimeline =timeline().add($w("#easybutton"), {
      duration: 200,
      x: -10,
      easing: "easeInOutSine",
    });
    EasyLineTimeline.play();
    EasyButtonTimeline.play();
    setTimeout(function () {
      EasyLineTimeline.pause();
      EasyButtonTimeline.pause();
    }, 200);
    $w("#bg").src = difffoundation;
    $w("#brighttext").hide("fade", { duration: 100 });
    $w("#easydark").show();
    $w("#cwbutton").hide();
    $w("#ccwbutton").hide();
    $w("#difficultywheel").show("fade", { duration: 500 });
    $w("#costup").hide("fade", { duration: 100 });
    $w("#costdown").hide("fade", { duration: 100 });
    $w("#diffbg").hide("roll", { direction: "left", duration: 400 });
    $w("#bountyamounttext").hide("fade", { duration: 100 });
    $w("#claimbountyupload").hide("fade", { duration: 100 });
    $w("#newbountybutton").hide("fade", { duration: 100 });
    $w("#postbountydisc").hide("fade", { duration: 100 });
    if (wixUsers.currentUser.loggedIn) {
      $w("#badge").show("slide", { direction: "left", duration: 200 });
      $w("#currentkarma").show("slide", {
        direction: "right",
        duration: 200,
      });
    }
  }
  $w("#chatgptbutton").onClick(function () {
    hidestuff();
    difficultystring = "easy";
    $w("#bingbutton").collapse();
    $w("#mjbutton").collapse();
    modelstring = "chatgpt";
    collection = "ChatGPTSubmissions";
    showDifficulty();
  });
  $w("#mjbutton").onClick(function () {
    hidestuff();
    difficultystring = "easy";
    $w("#bingbutton").collapse();
    $w("#chatgptbutton").collapse();
    modelstring = "mj";
    collection = "MJSubmissions";
    showDifficulty();
  });
  $w("#bingbutton").onClick(function () {
    hidestuff();
    difficultystring = "easy";
    $w("#mjbutton").collapse();
    $w("#chatgptbutton").collapse();
    modelstring = "bing";
    collection = "BingSubmissions";
    showDifficulty();
  });
  function quick() {
    $w("#meddark").hide();
    $w("#harddark").hide();
    $w("#easydark").hide();
    $w("#profilescreen").postMessage(nonebounty);
    $w("#modeltext").html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#116611" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${modelstring}</span></span></span></span></h3>`;
    if (difficultystring === "easy") {
      $w("#easydark").show();
    } else if (difficultystring === "med") {
      $w("#meddark").show();
    } else if (difficultystring === "hard") {
      $w("#harddark").show();
    }
    showDifficulty();
  }
  function colors(dim){
    $w("#easybutton").onClick(function () {
    if (!changing) {
      changing = true;
      difficultystring = "easy";
      if (difficultystring !== previousDifficultystring) {
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#116611" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#116611" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#116611" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
        quick();
      }
    }
    });
    $w("#medbutton").onClick(function () {
    if (!changing) {
      changing = true;
      difficultystring = "med";
      if (difficultystring !== previousDifficultystring) {
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
        quick();
      }
    }
    });
    $w("#hardbutton").onClick(function () {
    if (!changing) {
      changing = true;
      difficultystring = "hard";
      if (difficultystring !== previousDifficultystring) {
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        quick();
      }
    }
    });
    $w("#easybutton").onMouseIn(function () {
      if (!changing) {
        const EasyLineTimeline = timeline().add($w("#easybuttonline"), {
          duration: 200,
          x: -10,
          easing: "easeInOutSine",
        });
        const EasyButtonTimeline = timeline().add($w("#easybutton"), {
          duration: 200,
          x: -10,
          easing: "easeInOutSine",
        });
        const MedLineTimeline = timeline().add($w("#medbuttonline"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const MedButtonTimeline = timeline().add($w("#medbutton"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const HardLineTimeline = timeline().add($w("#hardbuttonline"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const HardButtonTimeline = timeline().add($w("#hardbutton"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        EasyButtonTimeline.play();
        EasyLineTimeline.play();
        MedButtonTimeline.play();
        MedLineTimeline.play();
        HardButtonTimeline.play();
        HardLineTimeline.play();
        setTimeout(function () {
          EasyButtonTimeline.pause();
          EasyLineTimeline.pause();
          MedButtonTimeline.pause();
          MedLineTimeline.pause();
          HardButtonTimeline.pause();
          HardLineTimeline.pause();
        }, 200);
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      }
    });
    $w("#medbutton").onMouseIn(function () {
      if (!changing) {
        const EasyLineTimeline = timeline().add($w("#easybuttonline"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const EasyButtonTimeline = timeline().add($w("#easybutton"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const MedLineTimeline = timeline().add($w("#medbuttonline"), {
          duration: 200,
          x: -10,
          easing: "easeInOutSine",
        });
        const MedButtonTimeline = timeline().add($w("#medbutton"), {
          duration: 200,
          x: -10,
          easing: "easeInOutSine",
        });
        const HardLineTimeline = timeline().add($w("#hardbuttonline"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const HardButtonTimeline = timeline().add($w("#hardbutton"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        EasyButtonTimeline.play();
        EasyLineTimeline.play();
        MedButtonTimeline.play();
        MedLineTimeline.play();
        HardButtonTimeline.play();
        HardLineTimeline.play();
        setTimeout(function () {
          EasyButtonTimeline.pause();
          EasyLineTimeline.pause();
          MedButtonTimeline.pause();
          MedLineTimeline.pause();
          HardButtonTimeline.pause();
          HardLineTimeline.pause();
        }, 200);
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      }
    });
    $w("#hardbutton").onMouseIn(function () {
      if (!changing) {
        const EasyLineTimeline = timeline().add($w("#easybuttonline"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const EasyButtonTimeline = timeline().add($w("#easybutton"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const MedLineTimeline = timeline().add($w("#medbuttonline"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const MedButtonTimeline = timeline().add($w("#medbutton"), {
          duration: 200,
          x: 0,
          easing: "easeInOutSine",
        });
        const HardLineTimeline = timeline().add($w("#hardbuttonline"), {
          duration: 200,
          x: -10,
          easing: "easeInOutSine",
        });
        const HardButtonTimeline = timeline().add($w("#hardbutton"), {
          duration: 200,
          x: -10,
          easing: "easeInOutSine",
        });
        EasyButtonTimeline.play();
        EasyLineTimeline.play();
        MedButtonTimeline.play();
        MedLineTimeline.play();
        HardButtonTimeline.play();
        HardLineTimeline.play();
        setTimeout(function () {
          EasyButtonTimeline.pause();
          EasyLineTimeline.pause();
          MedButtonTimeline.pause();
          MedLineTimeline.pause();
          HardButtonTimeline.pause();
          HardLineTimeline.pause();
        }, 200);
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      }
    });
    // $w("#difficultybox").onMouseIn(function () {
    //   if (!changing) {
    //   if (difficultystring == "easy") {
    //   $w(
    //     "#easybutton",
    //   ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
    //   $w(
    //     "#medbutton",
    //   ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
    //   $w(
    //     "#hardbutton",
    //   ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
    //   const EasyLineTimeline = timeline().add($w("#easybuttonline"), {
    //     duration: 200,
    //     x: -10,
    //     easing: "easeInOutSine",
    //   });
    //   const EasyButtonTimeline = timeline().add($w("#easybutton"), {
    //     duration: 200,
    //     x: -10,
    //     easing: "easeInOutSine",
    //   });
    //   const MedLineTimeline = timeline().add($w("#medbuttonline"), {
    //     duration: 200,
    //     x: 0,
    //     easing: "easeInOutSine",
    //   });
    //   const MedButtonTimeline = timeline().add($w("#medbutton"), {
    //     duration: 200,
    //     x: 0,
    //     easing: "easeInOutSine",
    //   });
    //   const HardLineTimeline = timeline().add($w("#hardbuttonline"), {
    //     duration: 200,
    //     x: 0,
    //     easing: "easeInOutSine",
    //   });
    //   const HardButtonTimeline = timeline().add($w("#hardbutton"), {
    //     duration: 200,
    //     x: 0,
    //     easing: "easeInOutSine",
    //   });
    //   EasyButtonTimeline.play();
    //   EasyLineTimeline.play();
    //   MedButtonTimeline.play();
    //   MedLineTimeline.play();
    //   HardButtonTimeline.play();
    //   HardLineTimeline.play();
    //   setTimeout(function () {
    //     EasyButtonTimeline.pause();
    //     EasyLineTimeline.pause();
    //     MedButtonTimeline.pause();
    //     MedLineTimeline.pause();
    //     HardButtonTimeline.pause();
    //     HardLineTimeline.pause();
    //   }, 200);
    //   }
    //   if (difficultystring == "med") {
    //     const EasyLineTimeline = timeline().add($w("#easybuttonline"), {
    //       duration: 200,
    //       x: 0,
    //       easing: "easeInOutSine",
    //     });
    //     const EasyButtonTimeline = timeline().add($w("#easybutton"), {
    //       duration: 200,
    //       x: 0,
    //       easing: "easeInOutSine",
    //     });
    //     const MedLineTimeline = timeline().add($w("#medbuttonline"), {
    //       duration: 200,
    //       x: -10,
    //       easing: "easeInOutSine",
    //     });
    //     const MedButtonTimeline = timeline().add($w("#medbutton"), {
    //       duration: 200,
    //       x: -10,
    //       easing: "easeInOutSine",
    //     });
    //     const HardLineTimeline = timeline().add($w("#hardbuttonline"), {
    //       duration: 200,
    //       x: 0,
    //       easing: "easeInOutSine",
    //     });
    //     const HardButtonTimeline = timeline().add($w("#hardbutton"), {
    //       duration: 200,
    //       x: 0,
    //       easing: "easeInOutSine",
    //     });
    //     EasyButtonTimeline.play();
    //     EasyLineTimeline.play();
    //     MedButtonTimeline.play();
    //     MedLineTimeline.play();
    //     HardButtonTimeline.play();
    //     HardLineTimeline.play();
    //     setTimeout(function () {
    //       EasyButtonTimeline.pause();
    //       EasyLineTimeline.pause();
    //       MedButtonTimeline.pause();
    //       MedLineTimeline.pause();
    //       HardButtonTimeline.pause();
    //       HardLineTimeline.pause();
    //     }, 200);
    //   $w(
    //     "#medbutton",
    //   ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
    //   $w(
    //     "#easybutton",
    //   ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
    //   $w(
    //     "#hardbutton",
    //   ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
    //   }
    //   if (difficultystring == "hard") {
    //     const EasyLineTimeline = timeline().add($w("#easybuttonline"), {
    //       duration: 200,
    //       x: 0,
    //       easing: "easeInOutSine",
    //     });
    //     const EasyButtonTimeline = timeline().add($w("#easybutton"), {
    //       duration: 200,
    //       x: 0,
    //       easing: "easeInOutSine",
    //     });
    //     const MedLineTimeline = timeline().add($w("#medbuttonline"), {
    //       duration: 200,
    //       x: 0,
    //       easing: "easeInOutSine",
    //     });
    //     const MedButtonTimeline = timeline().add($w("#medbutton"), {
    //       duration: 200,
    //       x: 0,
    //       easing: "easeInOutSine",
    //     });
    //     const HardLineTimeline = timeline().add($w("#hardbuttonline"), {
    //       duration: 200,
    //       x: -10,
    //       easing: "easeInOutSine",
    //     });
    //     const HardButtonTimeline = timeline().add($w("#hardbutton"), {
    //       duration: 200,
    //       x: -10,
    //       easing: "easeInOutSine",
    //     });
    //     EasyButtonTimeline.play();
    //     EasyLineTimeline.play();
    //     MedButtonTimeline.play();
    //     MedLineTimeline.play();
    //     HardButtonTimeline.play();
    //     HardLineTimeline.play();
    //     setTimeout(function () {
    //       EasyButtonTimeline.pause();
    //       EasyLineTimeline.pause();
    //       MedButtonTimeline.pause();
    //       MedLineTimeline.pause();
    //       HardButtonTimeline.pause();
    //       HardLineTimeline.pause();
    //     }, 200);
    //   $w(
    //     "#hardbutton",
    //   ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
    //   $w(
    //     "#easybutton",
    //   ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
    //   $w(
    //     "#medbutton",
    //   ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
    //   }
    //   }
    // });
    $w("#difficultybox").onMouseOut(function () {
      if (!changing) {
        if (difficultystring == "easy") {
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
        }
        if (difficultystring == "med") {
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
        }
        if (difficultystring == "hard") {
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        }
      }
    });
    $w("#modeltext").show();
    if (difficultystring == "easy") {
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
    }
    if (difficultystring == "med") {
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
    }
    if (difficultystring == "hard") {
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
    }
  }
  function newbounty(element, difficultystring, bounty, position) {
    $w("#bountyscreen").postMessage({
      bountytitle: " ",
      difficulty: difficultystring,
      bountydescription: " ",
    });
    $w("#costup").show("roll", { direction: "bottom", duration: 100 });
    $w("#costdown").show("roll", { direction: "top", duration: 100 });
    $w("#postbountydisc").value = "";
    $w("#postbountyname").value = "";
    $w("#postbountydisc").show();
    $w("#postbountyname").show();
    $w("#claimbountyupload").hide();
    $w("#newbountybutton").show("roll", {
      delay: 500,
      direction: "top",
      duration: 200,
    });
    $w("#postbountydisc").show("roll", {
      delay: 300,
      direction: "top",
      duration: 500,
    });
    $w("#postbountyname").show("roll", { delay: 100, duration: 500 });
    $w("#bountyamounttext").show("roll", { direction: "top", duration: 500 });
    let tempwallet = $w("#currentkarma").text;
    let t = 0;
    if (wixUsers.currentUser.loggedIn) {
      $w("#badge").show("slide", { direction: "left", duration: 200 });
      $w("#currentkarma").show("slide", {
        direction: "right",
        duration: 200,
      });
    }
    function updateText(added) {
      if (t < added) {
        t++;
        let currentKarma = Number(tempwallet);
        let bountyAmount = Number($w("#bountyamounttext").text);
        $w(
          "#currentkarma",
        ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#666666" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${tempwallet}</span></span></span></span></h3>`;
        $w(
          "#bountyamounttext",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#666666" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
          $w("#bountyamounttext").text
        }</span></span></span></span></h3>`;
        currentKarma--;
        bountyAmount++;
        tempwallet = currentKarma.toString();
        $w("#bountyamounttext").text = bountyAmount.toString();
        setTimeout(function () {
          $w(
            "#currentkarma",
          ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${tempwallet}</span></span></span></span></h3>`;
          $w(
            "#bountyamounttext",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
            $w("#bountyamounttext").text
          }</span></span></span></span></h3>`;
        }, 100);
        setTimeout(updateText, 200, added);
      } else {
        changing = false;
        $w("#loadinggif").hide();
        $w("#newbountybutton").hide();
        element.text = $w("#postbountyname").value;
        $w("#newbountybutton").hide("fade", { duration: 100 });
        $w("#postbountydisc").hide("fade", { duration: 100 });
        $w("#postbountyname").hide("roll", {
          direction: "left",
          duration: 100,
        });
        $w("#bountyscreen").postMessage({
          bountytitle: $w("#postbountyname").value,
          difficulty: difficultystring,
          bountydescription: $w("#postbountydisc").value,
        });
        element.show("roll", { delay: 100, duration: 500 });
        $w(
          "#currentkarma",
        ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${tempwallet}</span></span></span></span></h3>`;
        $w(
          "#bountyamounttext",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
          $w("#bountyamounttext").text
        }</span></span></span></span></h3>`;
        selected.text = $w("#postbountyname").value;
        setTimeout(function () {
          showDifficulty();
        }, 500);
      }
    }
    $w("#costup").onClick(() => {
      $w("#costdown").enable();
      $w(
        "#currentkarma",
      ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#666666" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
        $w("#currentkarma").text
      }</span></span></span></span></h3>`;
      $w(
        "#bountyamounttext",
      ).html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
        $w("#bountyamounttext").text
      }</span></span></span></span></h3>`;
      setTimeout(function () {
        if (Number(tempwallet) < Number($w("#bountyamounttext").text)) {
          $w("#newbountybutton").disable();
          $w(
            "#currentkarma",
          ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${tempwallet}</span></span></span></span></h3>`;
          $w(
            "#bountyamounttext",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
            $w("#bountyamounttext").text
          }</span></span></span></span></h3>`;
        } else {
          $w("#newbountybutton").enable();
          $w(
            "#currentkarma",
          ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${(
            Number($w("#currentkarma").text) - 1
          ).toString()}</span></span></span></span></h3>`;
          $w(
            "#bountyamounttext",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${(
            Number($w("#bountyamounttext").text) + 1
          ).toString()}</span></span></span></span></h3>`;
        }
      }, 100);
    });
    $w("#costdown").onClick(() => {
      if (Number($w("#bountyamounttext").text) >= 1) {
        $w(
          "#currentkarma",
        ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
          $w("#currentkarma").text
        }</span></span></span></span></h3>`;
        $w(
          "#bountyamounttext",
        ).html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#666666" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
          $w("#bountyamounttext").text
        }</span></span></span></span></h3>`;
        setTimeout(function () {
          $w(
            "#bountyamounttext",
          ).html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${(
            Number($w("#bountyamounttext").text) - 1
          ).toString()}</span></span></span></span></h3>`;
          $w(
            "#currentkarma",
          ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${(
            Number($w("#currentkarma").text) + 1
          ).toString()}</span></span></span></span></h3>`;
        }, 100);
      } else {
        $w("#costdown").disable();
        $w(
          "#bountyamounttext",
        ).html = `<h3 class="wixui-rich-text__text" style="text-align:left;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#666666" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
          $w("#bountyamounttext").text
        }</span></span></span></span></h3>`;
      }
    });
    $w("#newbountybutton").onClick(() => {
      let spentkarma = Number($w("#bountyamounttext").text);
      changing = true;
      if (Number(tempwallet) - spentkarma >= 0) {
        bounty.reward = spentkarma;
        bounty.difficulty = difficultystring;
        bounty.bountytitle = $w("#postbountyname").value;
        bounty.bountydescription = $w("#postbountydisc").value;
        bounty.bountytitle = $w("#postbountyname").value;
        bounty._owner = wixUsers.currentUser.id;
        bounty.pos = position;
        wixData.update(modelstring, bounty).then(() => {
          console.log("Update successful");
          $w("#loadinggif").show();
          updateText(Number($w("#bountyamounttext").text));
        });
      }
    });
  }
  function claimbounty(element, bounty) {
    let t = 0;
    $w("#scanbox").hide("fade", { duration: 200 });
    $w("#claimbountyupload").reset();
    element.hide("roll", { direction: "right", duration: 200 });
    $w("#bountyscreen").show();
    $w("#profilescreen").show();
    $w("#claimbountyupload").enable();
    $w("#claimbountyupload").show();
    $w("#postbountydisc").hide();
    $w("#postbountyname").hide();
    $w("#bountyamounttext").show("roll", { duration: 500 });
    $w("#bountyscreen").postMessage(bounty);
    $w("#claimbountyupload").show("roll", { delay: 200, duration: 200 });
    let tempwallet = Number($w("#currentkarma").text);
    let bountyAmount = Number($w("#bountyamounttext").text);
    if (wixUsers.currentUser.loggedIn) {
      $w("#currentkarma").show("slide", {
        direction: "right",
        duration: 200,
      });
    }
    function updateText(reward) {
      if (t < reward) {
        t++;
        $w(
          "#currentkarma",
        ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
          $w("#currentkarma").text
        }</span></span></span></span></h3>`;
        $w(
          "#bountyamounttext",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
          $w("#bountyamounttext").text
        }</span></span></span></span></h3>`;
        tempwallet++;
        bountyAmount--;
        $w("#currentkarma").text = tempwallet.toString();
        $w("#bountyamounttext").text = bountyAmount.toString();
        setTimeout(function () {
          $w(
            "#currentkarma",
          ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
            $w("#currentkarma").text
          }</span></span></span></span></h3>`;
          $w(
            "#bountyamounttext",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
            $w("#bountyamounttext").text
          }</span></span></span></span></h3>`;
        }, 100);
        setTimeout(updateText, 200, reward);
      } else {
        bounty.bountytitle = "+";
        bounty.bountydescription = "Bounty Complete";
        $w("#claimbountyupload").hide("roll", {
          direction: "top",
          duration: 200,
        });
        $w("#bountyscreen").postMessage(bounty);
        $w("#bountyamounttext").hide("roll", {
          delay: 600,
          direction: "right",
          duration: 100,
        });
        element.hide("roll", {
          delay: 800,
          direction: "left",
          duration: 100,
        });
        setTimeout(function () {
          element.collapse();
          console.log(element);
          setTimeout(function () {
            showDifficulty();
            return;
          }, 2800);
          changing = false;
          $w(
            "#currentkarma",
          ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
            $w("#currentkarma").text
          }</span></span></span></span></h3>`;
          $w(
            "#bountyamounttext",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
            '0'
          }</span></span></span></span></h3>`;
          $w("#loadinggif").hide();
        }, 1000);
      }
    }
    $w("#claimbountyupload").enable();
    $w("#claimbountyupload").onChange(function () {
      if (!wixUsers.currentUser.loggedIn) {
        authentication.promptLogin();
        $w("#claimbountyupload").reset();
        return;
      }
      $w("#scanbox").style.borderColor = dim;
      $w("#claimbountyupload").style.color = bright;
      $w("#claimbountyupload").style.borderColor = bright;
      $w("#loadinggif").show();
      changing = true;
      $w("#claimbountyupload")
        .uploadFiles()
        .then(async (uploadedFiles) => {
          $w("#scanbox").show("fade", { duration: 200 });
          $w("#scanbox").style.borderColor = bright;
          const EasyLineTimeline = timeline().add($w("#easybuttonline"), {
            duration: 200,
            x: 0,
            easing: "easeInOutSine",
          });
          const MedLineTimeline = timeline().add($w("#medbuttonline"), {
            duration: 200,
            x: 0,
            easing: "easeInOutSine",
          });
          const HardLineTimeline = timeline().add($w("#hardbuttonline"), {
            duration: 200,
            x: 0,
            easing: "easeInOutSine",
          });
          EasyLineTimeline.play();
          MedLineTimeline.play();
          HardLineTimeline.play();
          setTimeout(function () {
            EasyLineTimeline.pause();
            MedLineTimeline.pause();
            HardLineTimeline.pause();
          }, 200);
          let uploadedFile = uploadedFiles[0];
          let w = uploadedFile.width;
          let h = uploadedFile.height;
          let staticUrl = convertToStaticUrl(uploadedFile.fileUrl);
          $w("#submitpreview").src = staticUrl;
          $w("#difficultybox").hide("roll", {direction: "left", duration: 400});
          $w("#scany").expand();
          $w("#scanx").expand();
          $w("#submitpreview").expand();
          $w("#submitpreview").show("roll", {
            direction: "left",
            duration: 400,
          });
          const scan = timeline({ repeat: -1, yoyo: true }).add(
            $w("#scany"),
            {
              duration: 500,
              y: 490,
              easing: "easeInOutSine",
            },
          );
          scan.add($w("#scanx"), {
            duration: 500,
            x: 380,
            easing: "easeInOutSine",
          });
          scan.play();
          const isImageClassified = await classifyImage(staticUrl, w, h);
          if (typeof isImageClassified === "boolean") {
            $w("#scany").collapse();
            $w("#scanx").collapse();
            if (isImageClassified === true) {
              $w("#submitpreview").hide("roll", {
                duration: 400,
                direction: "right",
              });
              let claim = {
                title: bounty._id,
                file: staticUrl,
                bounty: bounty,
                reward: Number($w("#bountyamounttext").text),
              };
              claimBounty(collection, claim);
              $w("#claimbountyupload").hide("fade", { duration: 200 });
              updateText(reward);
            } else {
              $w("#scanbox").style.borderColor = "#000000";
              $w("#scanbox").style.backgroundColor = "#000000";
              $w("#claimbountyupload").style.color = "#000000";
              $w("#claimbountyupload").style.borderColor = "#000000";
              setTimeout(function () {
                $w("#scanbox").style.borderColor = "#ff0000";
                $w("#scanbox").style.backgroundColor = "#CCCCCC15";
                $w("#claimbountyupload").style.color = "#ff0000";
                $w("#claimbountyupload").style.borderColor = "#ff0000";
                $w("#submitpreview").hide();
              }, 100);
              setTimeout(function () {
                $w("#scanbox").style.borderColor = "#000000";
                $w("#scanbox").style.backgroundColor = "#000000";
                $w("#claimbountyupload").style.color = "#000000";
                $w("#claimbountyupload").style.borderColor = "#000000";
                $w("#submitpreview").show();
              }, 250);
              setTimeout(function () {
                $w("#scanbox").style.borderColor = "#ff0000";
                $w("#scanbox").style.backgroundColor = "#CCCCCC15";
                $w("#claimbountyupload").style.color = "#ff0000";
                $w("#claimbountyupload").style.borderColor = "#ff0000";
                $w("#submitpreview").hide();
              }, 400);
              setTimeout(function () {
                $w("#scanbox").style.borderColor = "#ff0000";
                $w("#scanbox").style.backgroundColor = "#00000050";
                $w("#claimbountyupload").style.color = "#CCCCCC";
                $w("#claimbountyupload").style.borderColor = "#ff0000";
                $w("#submitpreview").show();
                $w("#profilescreen").postMessage({
                  bountytitle: " ",
                  difficulty: difficultystring,
                  bountydescription: "Submit a valid screenshot",
                });
              }, 550);
              setTimeout(function () {
                $w("#scanbox").style.borderColor = bright;
                $w("#scanbox").style.backgroundColor = "#CCCCCC15";
                $w("#claimbountyupload").style.borderColor = bright;
                $w("#submitpreview").hide("roll", {
                  duration: 400,
                  direction: "left",
                });
                $w("#difficultybox").show("roll", {delay: 500,direction: "left", duration: 400});
                $w("#claimbountyupload").reset();
                $w("#loadinggif").hide();
                changing = false;
              }, 1000);
              return;
            }
          }
    });
    });
  }
  function makethemdim(element) {
      if (changing === false) {
        for (let i = 0; i < bounties.length; i++) {
          let bountytitle = bounties[i].bountytitle;
          if (bountytitle.length) {
            let fontsize = (31 - bountytitle.length).toString();
            if (bountybuttons[i] == element) {
              if (bounties[i].bountytitle == "+") {
                bountybuttons[i].html = buildhtml(
                  30,
                  bright,
                  bounties[i].bountytitle,
                );
              }
              bountybuttons[i].html = buildhtml(
                fontsize,
                bright,
                bounties[i].bountytitle,
              );
            } else if (bountybuttons[i] == selected) {
              bountybuttons[i].html = buildhtml(
                fontsize,
                bright,
                bounties[i].bountytitle,
              );
            } else if (bounties[i].bountytitle != "+") {
              bountybuttons[i].html = buildhtml(
                fontsize,
                dim,
                bounties[i].bountytitle,
              );
            } else {
              bountybuttons[i].html = buildhtml(30, "#666666", "+");
            }
          }
        }
      }
  }
  function rotatedifficulties(difficultystring) {
      setTimeout(function () {
        const angles = {
          easy: 270,
          med: 313.5,
          hard: 360,
        };
        let currAngle = angles[difficultystring];
        let rotateValue = 270 - currAngle;
        const changeDifficulty = timeline();
        changeDifficulty.add($w("#difficultywheel"), {
          rotate: rotateValue,
          easing: "easeInSine",
          duration: 690,
        });
        changeDifficulty.play();
        previousDifficultystring = difficultystring;
        setTimeout(() => {
          changing = false;
        }, 1380);
      }, 300);
  }
  function showDifficulty() {
    $w(
      "#modeltext",
    ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style=#fbfbfb" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
    if (difficultystring == "easy") {
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style=#fbfbfb" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style=#fbfbfb" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
    }
    if (difficultystring == "med") {
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style=#fbfbfb" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style=#fbfbfb" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
    }
    if (difficultystring == "hard") {
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style=#fbfbfb" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style=#fbfbfb" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
    }
      bounties = null;
      let easyload = generateSrc(
        "https://static.wixstatic.com/media/cef1ec_7fc80f23505544eb89c5ea9d98362867~mv2.gif",
        "easyload.gif",
        "200x200",
      );
      const medload = generateSrc(
        "https://static.wixstatic.com/media/cef1ec_a25005cadb9e4957b5d23e8ffebb88ff~mv2.gif",
        "medload.gif",
        "200x200",
      );
      const hardload = generateSrc(
        "https://static.wixstatic.com/media/cef1ec_ecdcaa7bf32340fda6f5fd06a176688a~mv2.gif",
        "hardload.gif",
        "200x200",
      );
      const easydiff = generateSrc(
        "https://static.wixstatic.com/media/cef1ec_c50cfe59196e4d41a5c8a4a16fa81d08~mv2.png",
        "easydiff.png",
        "714x736",
      );
      const meddiff = generateSrc(
        "https://static.wixstatic.com/media/cef1ec_c2c3e55211c841d79b7fd3e1de0a1bfd~mv2.png",
        "meddiff.png",
        "1812x1868",
      );
      const harddiff = generateSrc(
        "https://static.wixstatic.com/media/cef1ec_e828fe532b8741e583ab9a2495bfedda~mv2.png",
        "harddiff.png",
        "1812x1868",
      );
      const easysrc = generateSrc(
        "https://static.wixstatic.com/media/cef1ec_bb64fd10d1934888a7806b7124e3215d~mv2.png",
        "easywheel.png",
        "1080x1080",
      );
      const medsrc = generateSrc(
        "https://static.wixstatic.com/media/cef1ec_ebd4ee6ae6d04b38a81ed19deb752063~mv2.png",
        "medwheel.png",
        "1080x1080",
      );
      const hardsrc = generateSrc(
        "https://static.wixstatic.com/media/cef1ec_53bed512872549eb8e770ca1d70d0e17~mv2.png",
        "hardwheel.png",
        "1080x1080",
      );
      $w("#easybutton").show();
      $w("#medbutton").show();
      $w("#hardbutton").show();
      $w("#submitpreview").collapse();
      $w("#claimbountyupload").reset();
      $w("#loadinggif").hide();
      $w("#costup").hide();
      $w("#costdown").hide();
      $w("#bountyamounttext").hide("fade", { delay: 100, duration: 100 });
      $w("#claimbountyupload").hide("fade", { delay: 100, duration: 100 });
      $w("#newbountybutton").hide("fade", { delay: 100, duration: 100 });
      $w("#postbountydisc").hide("fade", { delay: 100, duration: 100 });
      $w("#postbountyname").hide("roll", {
        delay: 100,
        duration: 100,
        direction: "left",
      });
      $w("#diffbg").hide("fade", { duration: 100 });
      $w("#wheel").show("fade", { duration: 100 });
      rotatedifficulties(difficultystring);
      connector.hide("roll", { direction: "left", duration: 300 });
      $w("#wheelbg").show();
      if (difficultystring === "easy") {
        $w("#loadinggif").src = easyload;
        bright = "#11ff11";
        dim = "#116611";
        $w("#diffbg").src = easydiff;
        connector = $w("#easyconnector");
      } else if (difficultystring === "med") {
        $w("#loadinggif").src = medload;
        bright = "#ffff11";
        dim = "#646111";
        $w("#diffbg").src = meddiff;
        connector = $w("#medconnector");
      } else if (difficultystring === "hard") {
        $w("#loadinggif").src = hardload;
        bright = "#ff1111";
        dim = "#521115";
        $w("#diffbg").src = harddiff;
        connector = $w("#hardconnector");
      }
      $w("#difficultybox").style.borderColor = "#ffffff";
      $w("#difficultybox").style.backgroundColor = "#CCCCCC15";
      const delay = 30;
      const spinbg = timeline();
      spinbg.add($w("#glowwheel"), {
        rotate: 345,
        easing: "easeLinear",
        duration: 690,
      });
      wixData
        .query(modelstring)
        .eq("difficulty", difficultystring)
        .find()
        .then((results) => {
          bounties = results.items.sort((a, b) => a.pos - b.pos);
          wixData
            .query(collection)
            .eq("_owner", UserID)
            .find()
            .then((results) => {
              for (let i = 0; i < results.items.length; i++) {
                submittedids.push(results.items[i].title);
              }
              for (let i = 0; i < bounties.length; i++) {
                bountybuttons[i].show("fade", {
                  delay: (bounties.length - i) * delay,
                  duration: delay,
                });
                if (
                  submittedids.includes(
                    bounties[i]._id || bounties[i]._owner === UserID,
                  )
                ) {
                  bountybuttons[i].collapse();
                } else {
                  bountybuttons[i].expand();
                }
                setTimeout(
                  function () {
                    bountybuttons[i].text = "+";
                    bountybuttons[i].html = buildhtml("30", bright, "+");
                  },
                  delay * (bounties.length - i - 2),
                );
              }
              spinbg.play();
              setTimeout(
                function () {
                  for (let j = 0; j < bounties.length; j++) {
                    setTimeout(function () {
                      let bountytitle = bounties[j].bountytitle;
                      let fontsize = (31 - bountytitle.length).toString();
                      let element = bountybuttons[j];
                      element.text = bountytitle;
                      if (bountytitle !== "+") {
                        element.show();
                        element.html = buildhtml(fontsize, dim, bountytitle);
                      } else {
                        element.html = buildhtml(
                          fontsize,
                          "#666666",
                          bountytitle,
                        );
                      }
                    }, delay * j);
                  }
                  if (difficultystring === "easy") {
                    $w("#wheelbg").src = easysrc;
                  } else if (difficultystring === "med") {
                    $w("#wheelbg").src = medsrc;
                  } else if (difficultystring === "hard") {
                    $w("#wheelbg").src = hardsrc;
                  }
                  spinbg.reverse();
                  $w("#diffbg").show("fade", { duration: 200 });
                  connector.show("roll", { direction: "left", duration: 300 });
                  $w("#bountyscreen").show("fade", {
                    delay: 200,
                    duration: 300,
                  });
                  $w("#profilescreen").show("fade", {
                    delay: 200,
                    duration: 300,
                  });
                  $w("#bountyamounttext").html = buildhtml(
                    "50",
                    bright,
                    $w("#bountyamounttext").text,
                  );
                  $w(
                    "#currentkarma",
                  ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
                    $w("#currentkarma").text
                  }</span></span></span></span></h3>`;
                  $w("#profilescreen").postMessage({
                    bountytitle: " ",
                    difficulty: difficultystring,
                    bountyDescription: " ",
                  });
                  $w("#modeltext",
                  ).html = `<h3 class="wixui-rich-text__text" style="font-size:40px"><span style="text-shadow:${dim} 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${modelstring}</span></span></span></span></h3>`;
                  $w("#bountyscreen").postMessage({
                    bountytitle: " ",
                    difficulty: difficultystring,
                    bountydescription: " ",
                  });
                  colors(dim);
                  $w("#newbountybutton").style.color = bright;
                  $w("#postbountydisc").style.color = bright;
                  $w("#postbountydisc").style.borderColor = bright;
                  $w("#postbountyname").style.color = bright;
                  $w("#postbountyname").style.borderColor = bright;
                  $w("#claimbountyupload").style.color = bright;
                  $w("#claimbountyupload").style.borderColor = bright;
                  $w("#promptlogin").style.color = bright;
                  $w("#promptlogin").style.borderColor = bright;
                  $w("#costup").style.color = bright;
                  $w("#costdown").style.color = bright;
                  $w("#difficultybox").style.borderColor = bright;
                  if (wixUsers.currentUser.loggedIn) {
                    $w("#badge").show("slide", {
                      direction: "left",
                      duration: 200,
                    });
                    $w("#currentkarma").show("slide", {
                      direction: "right",
                      duration: 200,
                    });
                  }
                },
                delay * bounties.length + 1,
              );
              for (let i = 0; i < bounties.length; i++) {
                let element = bountybuttons[i];
                if (element === selected && selected.text !== "+") {
                }

                element.onMouseIn(function () {
                  makethemdim(element);
                });
                element.onClick(function () {
                  if (!changing) {
                    if (selected !== element) {
                      $w("#scanbox").hide("fade", { duration: 200 });
                      if (!$w("#easybutton").isVisible) {
                        $w("#easybutton").show("roll", {
                          direction: "right",
                          duration: 200,
                        });
                        $w("#medbutton").show("roll", {
                          direction: "right",
                          duration: 200,
                        });
                        $w("#hardbutton").show("roll", {
                          direction: "right",
                          duration: 200,
                        });
                      }
                      pos = i;
                      $w("#costup").hide("roll", {
                        direction: "bottom",
                        duration: 100,
                      });
                      $w("#costdown").hide("roll", {
                        direction: "top",
                        duration: 100,
                      });
                      $w("#promptlogin").hide("roll", {
                        direction: "left",
                        duration: 200,
                      });
                      $w(
                        "#currentkarma",
                      ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
                        $w("#currentkarma").text
                      }</span></span></span></span></h3>`;
                      selected.show("roll", {
                        direction: "right",
                        duration: 200,
                      });
                      selected.html = buildhtml(
                        (30 - selected.text.length).toString(),
                        dim,
                        selected.text,
                      );
                      $w("#postbountydisc").hide();
                      $w("#postbountyname").hide();
                      $w("#bountyscreen").postMessage({
                        bountytitle: " ",
                        difficulty: difficultystring,
                        bountydescription: " ",
                      });
                      $w("#badge").hide("slide", {
                        direction: "left",
                        duration: 200,
                      });
                      $w("#currentkarma").hide("slide", {
                        direction: "right",
                        duration: 200,
                      });
                      $w("#bountyamounttext").hide("fade", { duration: 100 });
                      $w("#claimbountyupload").hide("fade", { duration: 100 });
                      $w("#newbountybutton").hide("fade", { duration: 100 });
                      $w("#postbountydisc").hide("fade", { duration: 100 });
                      $w("#postbountyname").hide("roll", {
                        delay: 100,
                        direction: "left",
                        duration: 100,
                      });
                      const angles = {
                        bounty00: 0,
                        bounty01: 15,
                        bounty02: 30,
                        bounty03: 45,
                        bounty04: 60,
                        bounty05: 75,
                        bounty06: 90,
                        bounty07: 105,
                        bounty08: 120,
                        bounty09: 135,
                        bounty10: 150,
                        bounty11: 165,
                        bounty12: 180,
                        bounty13: 195,
                        bounty14: 210,
                        bounty15: 225,
                        bounty16: 240,
                        bounty17: 255,
                        bounty18: 270,
                        bounty19: 285,
                        bounty20: 300,
                        bounty21: 315,
                        bounty22: 330,
                        bounty23: 345,
                      };
                      let currAngle = angles[element.id.slice(-8)];
                      let rotateValue = currAngle;
                      const spin = timeline();
                      spin.add($w("#wheel"), {
                        rotate: rotateValue,
                        easing: "easeInOutSine",
                        duration: 690,
                      });

                      spin.play();
                      changing = true;
                      setTimeout(() => {
                        reward = Number(bounties[i].reward);
                        $w("#bountyamounttext").html = buildhtml(
                          "50",
                          bright,
                          bounties[i].reward,
                        );
                        $w("#bountyscreen").show("fade", { duration: 500 });
                        $w("#profilescreen").show("fade", { duration: 500 });
                        if (element.text != "+") {
                          claimbounty(bountybuttons[i], bounties[i]);
                        } else {
                          if (wixUsers.currentUser.loggedIn) {
                            $w("#postbountydisc").expand();
                            $w("#postbountyname").expand();
                            newbounty(
                              element,
                              difficultystring,
                              bounties[i],
                              i,
                            );
                            element.hide("fade", { duration: 200 });
                            if (
                              Number($w("#currentkarma").text) <
                              Number($w("#bountyamounttext").text)
                            ) {
                              $w("#newbountybutton").disable();
                              $w(
                                "#currentkarma",
                              ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#666666" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
                                $w("#currentkarma").text
                              }</span></span></span></span></h3>`;
                              $w(
                                "#bountyamounttext",
                              ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#666666" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
                                $w("#bountyamounttext").text
                              }</span></span></span></span></h3>`;
                            } else {
                              $w("#newbountybutton").enable();
                              $w(
                                "#currentkarma",
                              ).html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
                                $w("#currentkarma").text
                              }</span></span></span></span></h3>`;
                              $w(
                                "#bountyamounttext",
                              ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${
                                $w("#bountyamounttext").text
                              }</span></span></span></span></h3>`;
                            }
                          } else {
                            setTimeout(() => {
                              $w("#promptlogin").show("roll", {
                                direction: "left",
                                duration: 200,
                              });
                            }, 1000);
                            $w("#newbountybutton").disable();
                            $w("#bountyscreen").postMessage({
                              bountytitle: " ",
                              difficulty: difficultystring,
                              bountydescription: "Sign in to post your bounty",
                            });
                            $w("#currentkarma").hide();
                          }
                        }
                        changing = false;
                        selected = element;
                      }, 690);
                    }
                  }
                });
              }
            });
          setTimeout(() => {
            if (selected != $w("#bounty00")) {
              $w("#bountyamounttext").show("roll", { duration: 500 });
              $w("#bountyscreen").show("fade", { duration: 500 });
              $w("#profilescreen").show("fade", { duration: 500 });
              if (selected.text === "+") {
                newbounty(selected, difficultystring, bounties[pos]._id);
              } else {
                if (!selected.collapsed) {
                  claimbounty(selected, bounties[pos]);
                  $w("#newbountybutton").hide();
                }
              }
              $w("#bounty00").collapse();
            } else {
              $w("#bountyscreen").postMessage({
                bountytitle: " ",
                difficulty: difficultystring,
                bountydescription: " ",
              });
            }
            $w("#profilescreen").postMessage({
              bountytitle: " ",
              difficulty: difficultystring,
              bountydescription: " ",
            });
          }, 1400);
        });
  }
  function numberToRGB(number) {
    let max = 100;
    let percentage = number / max;
    let r = Math.floor(percentage * 255) * 18;
    let g = 255;
    let b = Math.floor(percentage * 255) * 18;
    let opacity = 110 - number * 10;
    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
  }
  function initapps(){
    $w("#leaderboarddown").onClick(function () {
    let dataset = $w("#dataset1");
    let sort = wixData.sort().ascending("rank");
    dataset.setSort(sort);
    dataset.refresh();
    lock=true;
    $w("#tabsmenu").hide("roll", { delay:1200, direction: "top", duration: 200 });
    $w("#bountyamounttext").collapse();
    $w("#claimbountyupload").collapse();
    $w("#leaderboard").expand();
    $w("#leaderboardrepeater").expand();
    $w("#leaderboardvideo").expand();
    $w("#bingbutton").hide();
    $w("#chatgptbutton").hide();
    $w("#mjbutton").hide();
    $w("#costup").hide();
    $w("#costdown").hide();
    $w("#postbountydisc").hide();
    $w("#newbountybutton").hide();
    $w("#bountywheelbox").hide("fade", { duration: 500 });
    $w("#leaderboarddown").hide("fade", { delay: 1200, duration: 500 });
    $w("#leaderboardup").show("fade", { delay: 1200, duration: 500 });
    $w("#leaderboardvideo").show();
    $w("#leaderboardvideo").play();
    $w("#profilescreen").hide("fade", { duration: 500 });
    $w("#bountyscreen").hide("fade", { duration: 500 });
    $w("#difficultybox").hide("fade", { duration: 500 });
    $w("#leaderboardrepeater").show("roll", {
      delay: 1200,
      duration: 1000,
      direction: "top",
    });
    const leftLineTimeline = timeline().add($w("#profilecard"), {
      duration: 1000,
      x: -1000,
      easing: "easeInOutSine",
    });
    const rightLineTimeline = timeline().add($w("#bountybox"), {
      duration: 1000,
      x: +1000,
      easing: "easeInOutSine",
    });
    setTimeout(function () {
      leftLineTimeline.play();
      rightLineTimeline.play();
      setTimeout(function () {
        leftLineTimeline.pause();
        rightLineTimeline.pause();
      }, 1000);
    }, 500);
    });
    $w("#leaderboardup").onClick(function () {
    $w("#tabsmenu").show("roll", { delay: 1200, direction: "top", duration: 200 });
    $w("#bingbutton").show("fade", { duration: 500, delay: 1200 });
    $w("#chatgptbutton").show("fade", { duration: 500, delay: 1200 });
    $w("#mjbutton").show("fade", { duration: 500, delay: 1200 });
    $w("#bountywheelbox").show("fade", { duration: 500, delay: 1200 });
    $w("#leaderboardup").hide("fade", {duration: 500, delay: 1200,  });
    $w("#leaderboarddown").show("fade", {duration: 500, delay: 1200,  });
    $w("#leaderboardvideo").hide("roll", {
      duration: 1200,
      direction: "top",
    });
    $w("#profilescreen").show("fade", { delay: 1000, duration: 500 });
    $w("#bountyscreen").show("fade", { delay: 1000, duration: 500 });
    $w("#difficultybox").show("fade", { delay: 1000, duration: 500 });
    setTimeout(function () {
      $w("#bountyamounttext").expand();
      $w("#claimbountyupload").expand();
      showDifficulty();
    }, 1200);
    $w("#leaderboardrepeater").hide("roll", {
      duration: 1200,
      direction: "top",
    });
    const leftLineTimeline = timeline().add($w("#profilecard"), {
      duration: 1000,
      x: 0,
      easing: "easeInOutSine",
    });
    const rightLineTimeline = timeline().add($w("#bountybox"), {
      duration: 1000,
      x: 0,
      easing: "easeInOutSine",
    });
    leftLineTimeline.play();
    rightLineTimeline.play();
    setTimeout(function () {
      leftLineTimeline.pause();
      rightLineTimeline.pause();
    }, 1000);
    setTimeout(function () {
      lock=false;
      $w("#leaderboardvideo").collapse();
      $w("#leaderboardrepeater").collapse();
      $w("#leaderboard").collapse();
    }, 1200);
    });
    $w("#leaderboardrepeater").onItemReady(($item, index) => {
    $item(
      "#placing",
    ).html = `<h3 class="wixui-rich-text__text" style="color: ${numberToRGB(
      index.rank,
    )}; text-shadow: 2px 2px 4px ${numberToRGB(
      index.rank,
    )};"><span class="wixui-rich-text__text">${index.rank}</span></h3>`;
    $item("#leaderboarduser").onMouseIn(function () {
      $item("#leaderboardname").show("roll", {
        direction: "left",
        duration: 100,
      });
      $item("#leaderboardkarma").show("roll", {
        direction: "right",
        duration: 200,
      });
      $item("#leaderboardbadge").show("roll", {
        direction: "left",
        duration: 200,
      });
      $item("#lbbg").show("fade", { duration: 100 });
      const leftLineTimeline = timeline().add($item("#leftline"), {
        duration: 200,
        x: -10,
        easing: "easeInOutSine",
      });
      const rightLineTimeline = timeline().add($item("#rightline"), {
        duration: 200,
        x: +10,
        easing: "easeInOutSine",
      });
      leftLineTimeline.play();
      rightLineTimeline.play();
      setTimeout(function () {
        leftLineTimeline.pause();
        rightLineTimeline.pause();
      }, 200);
    });

    $item("#leaderboarduser").onMouseIn(function () {
      $item("#leaderboardname").hide("roll", {
        direction: "left",
        duration: 200,
      });
      $item("#leaderboardkarma").hide("roll", {
        direction: "right",
        duration: 200,
      });
      $item("#leaderboardbadge").hide("roll", {
        direction: "left",
        duration: 200,
      });
      $item("#lbbg").hide("fade", { duration: 100 });
      const leftLineTimeline = timeline().add($item("#leftline"), {
        duration: 200,
        x: -20,
        easing: "easeInOutSine",
      });
      const rightLineTimeline = timeline().add($item("#rightline"), {
        duration: 200,
        x: +20,
        easing: "easeInOutSine",
      });
      leftLineTimeline.play();
      rightLineTimeline.play();
      setTimeout(function () {
        leftLineTimeline.pause();
        rightLineTimeline.pause();
      }, 200);
    });
    $item("#leaderboarduser").onMouseOut(function () {
      $item("#leaderboardname").hide("roll", {
        direction: "left",
        duration: 200,
      });
      $item("#leaderboardkarma").hide("roll", {
        direction: "right",
        duration: 200,
      });
      $item("#leaderboardbadge").hide("roll", {
        direction: "left",
        duration: 200,
      });
      $item("#lbbg").hide("fade", { duration: 100 });
      const leftLineTimeline = timeline().add($item("#leftline"), {
        duration: 200,
        x: 0,
        easing: "easeInOutSine",
      });
      const rightLineTimeline = timeline().add($item("#rightline"), {
        duration: 200,
        x: 0,
        easing: "easeInOutSine",
      });
      leftLineTimeline.play();
      rightLineTimeline.play();
      setTimeout(function () {
        leftLineTimeline.pause();
        rightLineTimeline.pause();
      }, 200);
    });
    });
    $w("#rlhfdown").onClick(function () {
    $w("#rlswipe").expand();
    $w("#rlswipe").show();
    $w("#bingbutton").hide();
    $w("#chatgptbutton").hide();
    $w("#mjbutton").hide();
    $w("#bountywheelbox").hide("fade", { duration: 500 });
    $w("#rlhfdown").hide("fade", { duration: 500 });
    $w("#rlhfup").show("fade", { duration: 500 });
    $w("#difficultybox").hide("fade", { duration: 500 });
    $w("#bountyamounttext").collapse();
    $w("#claimbountyupload").collapse();
    $w("#costup").hide();
    $w("#costdown").hide();
    $w("#postbountydisc").hide();
    $w("#newbountybutton").hide();
    $w("#bountyscreen").postMessage(nonebounty);
    wixData.query(collection)
      .ne("_owner", UserID)
      .include('bounty')
      .find()
      .then((results) => {
        const items=results.items;
        return {items};
      }).then(({items}) => {
        let bountysubmission=items[counter];
        $w("#bountyscreen").postMessage(bountysubmission.bounty);
        $w("#rlswipe").onMessage((event) => {
          if (event.data === '1' || event.data === '-1') {
            console.log(event.data);
            counter++;
            bountysubmission.score+=Number(event.data);
            wixData.update(collection, bountysubmission);
              voted.push(bountysubmission._id);
              wixData.update("Userkarma", { "_id": UserID, "voted": voted });
            if (counter === items.length) {
              counter = 0;
              return;
            }
        }
      });
      console.log(counter);
      $w("#rlswipe").postMessage(items.map(item => item.file));
      });
    });
    $w("#rlhfup").onClick(function () {
    $w("#rlswipe").hide("fade", { duration: 500 });
    $w("#currlhf").hide("fade", { duration: 500 });
    $w("#nextrlhf").hide("fade", { duration: 500 });
    $w("#bingbutton").show("fade", { duration: 500, delay: 1200 });
    $w("#chatgptbutton").show("fade", { duration: 500, delay: 1200 });
    $w("#mjbutton").show("fade", { duration: 500, delay: 1200 });
    $w("#difficultybox").show("fade", { duration: 500, delay: 1200 });
    $w("#rlhfdown").show("fade", { duration: 500, delay: 1200 });
    $w("#rlhfup").hide("fade", { duration: 500 });
    setTimeout(() => {
      $w("#rlswipe").collapse();
      $w("#bountywheelbox").show("fade", { duration: 500 });
      $w("#bountyamounttext").expand();
      $w("#claimbountyupload").expand();
      showDifficulty();
    }, 1200);
    });
  }
});