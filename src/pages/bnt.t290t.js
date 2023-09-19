import wixUsers from "wix-users";
import wixData from "wix-data";
import { timeline } from "wix-animations";
import { authentication } from "wix-members-frontend";
import * as tf from "@tensorflow/tfjs";
$w.onReady(function () {
  const screen_model = tf.loadLayersModel(tf.io.browserHTTPRequest('https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/classifier_tfjs/model.json'));
  async function screenbounty(url) {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      const imageData = new Uint8Array(buffer);
      const imagePixels = new Uint8Array(500 * 500 * 3);
      for (let i = 0; i < 500 * 500; i++) {
        for (let channel = 0; channel < 3; ++channel) {
          imagePixels[i * 3 + channel] = imageData[i * 4 + channel];
        }
      }
      const tensor = tf.tensor4d(imagePixels, [1,500, 500, 3]);
      const predictions = await screen_model.predict(tensor);
      if (tf.argMax(predictions,1).dataSync().toString() == '0') {
        return false;
      } else {
        return true;
      }
    }
  $w("#foundation").expand();
  if (wixUsers.currentUser.loggedIn) {
    $w("#loginbutton").collapse();
  }
  $w("#loginbutton").onClick(function () {
    if (!wixUsers.currentUser.loggedIn) {
      authentication.promptLogin();
      return;
    }
  });
  let UserID = wixUsers.currentUser.id;

  function generateSrc(url, name, resolution) {
    let src = "wix:image://v1/";
    let urlId = url.split("/")[4];
    let width = resolution.split("x")[0];
    let height = resolution.split("x")[1];
    src +=
      urlId + "/" + name + "#originWidth=" + width + "&originHeight=" + height;
    return src;
  }
  function adduser(userid) {
    wixData
      .query("Userkarma")
      .eq("userId", userid)
      .find()
      .then((results) => {
        if (results.items.length > 0) {
          $w("#currentkarma").text = results.items[0].karma.toString();
          console.log(`User ${userid} already exists`);
          return;
        }
        wixData
          .query("Userkarma")
          .descending("rank")
          .limit(1)
          .find()
          .then((results) => {
            const item = results.items[0];
            let newRank = item ? item.rank + 1 : 1;
            let newItem = {
              userId: userid,
              karma: 0,
              likes: 0,
              title: "newbie",
              profile: userid,
              badge:
                "https://static.wixstatic.com/shapes/cef1ec_a7ed00ab80414153934d1f76e99cd28c.svg",
              url: "https://www.anns.ai/profile/" + userid + "/profile",
              rank: newRank,
            };
            wixData.insert("Userkarma", newItem).then((item) => {
              console.log("Userkarma item created");
            });
          });
      });
  }
  function claimBounty(collection, claim, userid) {
    console.log(claim.bounty);
    wixData
      .insert(collection, claim)
      .then((item) => {
        console.log("Claim item inserted");
        const newkarma = Number(claim.reward);
        return wixData
          .query("Userkarma")
          .eq("userId", userid)
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
  adduser(UserID);
  const difffoundation = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_d26b49973d6e43758e58940aa9fdbacb~mv2.png",
    "diffbg.png",
    "3000x3000",
  );
  const easyload = generateSrc(
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
    "https://static.wixstatic.com/media/cef1ec_afb593aac8e7415da536a322f8b8692a~mv2.png",
    "easydiff.png",
    "714x736",
  );
  const meddiff = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_c2c3e55211c841d79b7fd3e1de0a1bfd~mv2.png",
    "meddiff.png",
    "1812x1868",
  );
  const harddiff = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_17716182358a444d804a1905d764d91b~mv2.png",
    "harddiff.png",
    "714x736",
  );
  const easysrc = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_95ed5648d7fa45f2bc7089605143079d~mv2.png",
    "easywheel.png",
    "1080x1080",
  );
  const medsrc = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_8d7ccaa7f2874aaf8368ae95b8f0e1c6~mv2.png",
    "medwheel.png",
    "1080x1080",
  );
  const hardsrc = generateSrc(
    "https://static.wixstatic.com/media/cef1ec_f4bb8440dda548b78ee488bef0d63af8~mv2.png",
    "hardwheel.png",
    "1080x1080",
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
  let connector = $w("#easyconnector");
  let selected = $w("#bounty00");
  let bright;
  let dim;
  let bounties = [];
  let modelstring;
  let reward;
  let collection;
  let fileType;
  let submittedids;
  let difficultystring = "easy";
  let previousDifficultystring = "none";
  let pos = 0;
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
  $w("#bgvideo").onEnded(function () {
    $w("#bg").show("fade", { duration: 200 });
    let changing = false;
    $w("#bgvideo").delete();
    $w("#leaderboard").show("fade", { duration: 500 });
    $w("#bgvideo").hide("fade", { duration: 200 });
    $w("#loadinggif").hide("fade", { duration: 100 });
    $w("#bingbutton").show("fade", { duration: 500 });
    $w("#brighttext").show("fade", { duration: 100 });
    $w("#cwbutton").show("fade", { duration: 100 });
    $w("#ccwbutton").show("fade", { duration: 100 });
    $w("#modelwheel").show("fade", { duration: 100 });
    $w("#profilescreen").postMessage({
      bountytitle: "_",
      difficulty: "none",
      bountydescription: "_",
    });
    $w("#bountyscreen").postMessage({
      bountytitle: "_",
      difficulty: "none",
      bountydescription: "_",
    });

    function buildhtml(fontsize, color, text) {
      return `<h3 class="wixui-rich-text__text" style="font-size:${fontsize}px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${color}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${text}</span></span></span></span></h3>`;
    }

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
    function nextModel(current, direction) {
      let index = models.findIndex((model) => model.name === current.name);
      if (direction === "cw") {
        return models[(index + 1) % models.length];
      } else {
        return models[(index - 1 + models.length) % models.length];
      }
    }
    let wheelAngle = 0;
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
      $w("#wheel").hide("fade", { duration: 300 });
      for (let i = 0; i < bountybuttons.length; i++) {
        bountybuttons[i].hide();
      }
      $w(
        "#easybutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
      $w(
        "#medbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      $w(
        "#hardbutton",
      ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      $w("#bg").src = difffoundation;
      $w("#leaderboarddown").show("fade", { delay: 1500, duration: 200 });
      $w("#brighttext").hide("fade", { duration: 100 });
      $w("#difficultybox").show("fade", { delay: 1500, duration: 200 });
      $w("#easydark").show();
      $w("#cwbutton").hide();
      $w("#ccwbutton").hide();
      $w("#difficultywheel").show("fade", { duration: 500 });
      $w("#costup").hide("fade", { duration: 100 });
      $w("#costdown").hide("fade", { duration: 100 });
      $w("#diffbg").hide("roll", { direction: "left", duration: 400 });
      $w("#accountbox").hide("fade", { duration: 100 });
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
      fileType = "URL";
      showDifficulty();
    });
    $w("#mjbutton").onClick(function () {
      hidestuff();
      difficultystring = "easy";

      $w("#bingbutton").collapse();
      $w("#chatgptbutton").collapse();
      modelstring = "mj";
      collection = "MJSubmissions";
      fileType = "Image";
      showDifficulty();
    });
    $w("#bingbutton").onClick(function () {
      hidestuff();
      difficultystring = "easy";
      $w("#mjbutton").collapse();
      $w("#chatgptbutton").collapse();
      modelstring = "bing";
      collection = "BingSubmissions";
      fileType = "Document";
      showDifficulty();
    });

    $w("#easybutton").onClick(function () {
      if (!changing) {
        difficultystring = "easy";
        if (difficultystring !== previousDifficultystring) {
          $w(
            "#easybutton",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
          $w(
            "#medbutton",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
          $w(
            "#hardbutton",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
          $w("#bountyscreen").postMessage({
            bountytitle: "_",
            difficulty: "none",
            bountydescription: "_",
          });
          $w("#profilescreen").postMessage({
            bountytitle: "_",
            difficulty: "none",
            bountydescription: "_",
          });
          $w("#meddark").hide();
          $w("#harddark").hide();
          $w("#easydark").show();
          showDifficulty();
        }
      }
    });
    $w("#medbutton").onClick(function () {
      if (!changing) {
        difficultystring = "med";
        if (difficultystring !== previousDifficultystring) {
          $w(
            "#medbutton",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
          $w(
            "#easybutton",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
          $w(
            "#hardbutton",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
          $w("#bountyscreen").postMessage({
            bountytitle: "_",
            difficulty: "none",
            bountydescription: "_",
          });
          $w("#profilescreen").postMessage({
            bountytitle: "_",
            difficulty: "none",
            bountydescription: "_",
          });
          $w("#easydark").hide();
          $w("#harddark").hide();
          $w("#meddark").show();
          showDifficulty();
        }
      }
    });
    $w("#hardbutton").onClick(function () {
      if (!changing) {
        difficultystring = "hard";
        if (difficultystring !== previousDifficultystring) {
          $w(
            "#hardbutton",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
          $w(
            "#easybutton",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
          $w(
            "#medbutton",
          ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
          $w("#bountyscreen").postMessage({
            bountytitle: "_",
            difficulty: "none",
            bountydescription: "_",
          });
          $w("#profilescreen").postMessage({
            bountytitle: "_",
            difficulty: "none",
            bountydescription: "_",
          });
          $w("#easydark").hide();
          $w("#meddark").hide();
          $w("#harddark").show();
          showDifficulty();
        }
      }
    });
    $w("#easybutton").onMouseIn(function () {
      if (!changing) {
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      }
    });
    $w("#medbutton").onMouseIn(function () {
      if (!changing) {
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      }
    });
    $w("#hardbutton").onMouseIn(function () {
      if (!changing) {
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      }
    });

    $w("#difficultybox").onMouseIn(function () {
      if (difficultystring == "easy") {
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      }
      if (difficultystring == "med") {
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      }
      if (difficultystring == "hard") {
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      }
    });
    $w("#difficultybox").onMouseOut(function () {
      if (difficultystring == "easy") {
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#00ff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#00ff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      }
      if (difficultystring == "med") {
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffff00 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffff00" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
      }
      if (difficultystring == "hard") {
        $w(
          "#hardbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ff0000 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ff0000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">HARD</span></span></span></span></h3>`;
        $w(
          "#easybutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">EASY</span></span></span></span></h3>`;
        $w(
          "#medbutton",
        ).html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#333333" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">MED</span></span></span></span></h3>`;
      }
    });
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
      $w("#accountbox").show("roll", { duration: 500, direction: "right" });
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
        console.log(bounty._id);
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
      $w("#claimbountyupload").reset();
      element.hide("roll", { direction: "right", duration: 200 });
      $w("#bountyscreen").show();
      $w("#profilescreen").show();
      $w("#claimbountyupload").enable();
      $w("#claimbountyupload").show();
      $w("#postbountydisc").hide();
      $w("#postbountyname").hide();
      $w("#accountbox").show("roll", { duration: 500, direction: "right" });
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
            setTimeout(function () {
              $w("#bountyscreen").hide("fade", { delay: 2000, duration: 200 });
              connector.hide("roll", {
                delay: 2000,
                duration: 300,
                direction: "right",
              });
              return;
            }, 500);
            changing = false;
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
            $w("#loadinggif").hide();
          }, 1000);
        }
      }
      $w("#claimbountyupload").enable();
      $w("#claimbountyupload").fileType = fileType;
      $w("#claimbountyupload").onChange(function () {
        if (!wixUsers.currentUser.loggedIn) {
          authentication.promptLogin();
          $w("#claimbountyupload").reset();
          return;
        }
        changing = true;
        $w("#loadinggif").show();
        $w("#claimbountyupload")
          .uploadFiles()
          .then((uploadedFiles) => {
            uploadedFiles.forEach((uploadedFile) => {
              if (await screenbounty(uploadedFile.fileUrl)) {
              let claim = {
                file: uploadedFile.fileUrl,
                bounty: bounty,
                reward: Number($w("#bountyamounttext").text),
              };
              claimBounty(collection, claim, UserID);
              $w("#loadinggif").hide();
              $w("#claimbountyupload").hide("fade", { duration: 200 });
              updateText(reward);
            } else {
              return;
            }
            });
          })
          .catch((uploadError) => {
            console.log(uploadError);
          }
        );
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
        if (selected !== $w("#bounty00")) {
          selected.expand();
        }
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
      changing = true;
      bounties = null;
      $w("#bountyamounttext").hide("fade", { delay: 100, duration: 100 });
      $w("#claimbountyupload").hide("fade", { delay: 100, duration: 100 });
      $w("#newbountybutton").hide("fade", { delay: 100, duration: 100 });
      $w("#postbountydisc").hide("fade", { delay: 100, duration: 100 });
      $w("#postbountyname").hide("roll", {
        delay: 100,
        duration: 100,
        direction: "left",
      });
      $w("#accountbox").hide("fade", { duration: 100 });
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
              submittedids = results.items.map((item) => item.bountyid);
              for (let i = 0; i < bounties.length; i++) {
                console.log(i);
                console.log(bountybuttons[i]);
                bountybuttons[i].show("fade", {
                  delay: (bounties.length - i) * delay,
                  duration: delay,
                });
                if (submittedids.includes(bounties[i]._id)) {
                  bountybuttons[i].collapse();
                }
                if (bounties[i]._owner === UserID) {
                  bountybuttons[i].collapse();
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
                  $w("#accountbox").show("roll", {
                    duration: 500,
                    direction: "right",
                  });
                  $w("#newbountybutton").style.color = bright;
                  $w("#postbountydisc").style.color = bright;
                  $w("#postbountydisc").style.borderColor = bright;
                  $w("#postbountyname").style.color = bright;
                  $w("#postbountyname").style.borderColor = bright;
                  $w("#claimbountyupload").style.color = bright;
                  $w("#claimbountyupload").style.borderColor = bright;
                  $w("#loginbutton").style.color = bright;
                  $w("#loginbutton").style.borderColor = bright;
                  $w("#costup").style.color = bright;
                  $w("#costdown").style.color = bright;
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
                      pos = i;
                      $w("#costup").hide("roll", {
                        direction: "bottom",
                        duration: 100,
                      });
                      $w("#costdown").hide("roll", {
                        direction: "top",
                        duration: 100,
                      });
                      $w("#loginbutton").hide("roll", {
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
                      $w("#currentkarma").text =
                        $w("#currentkarma").text.toString();
                      $w("#postbountydisc").hide();
                      $w("#postbountyname").hide();
                      $w("#profilescreen").postMessage({
                        bountytitle: "_",
                        difficulty: difficultystring,
                        bountyDescription: "_",
                      });
                      $w("#bountyscreen").postMessage({
                        bountytitle: "_",
                        difficulty: difficultystring,
                        bountydescription: "_",
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
                      connector.hide("roll", {
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
                        $w("#bountyscreen").postMessage(bounties[i]);
                        connector.show("roll", {
                          direction: "left",
                          duration: 100,
                        });
                        $w("#bountyscreen").show("fade", { duration: 500 });
                        $w("#profilescreen").show("fade", { duration: 500 });
                        if (element.text != "+") {
                          claimbounty(element, bounties[i]);
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
                              $w("#loginbutton").show("roll", {
                                direction: "left",
                                duration: 200,
                              });
                            }, 1000);
                            $w("#newbountybutton").disable();
                            $w("#bountyscreen").postMessage({
                              bountytitle: "_",
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
              $w("#accountbox").show("roll", {
                duration: 500,
                direction: "right",
              });
              $w("#bountyamounttext").show("roll", { duration: 500 });
              $w("#bountyscreen").show("fade", { duration: 500 });
              $w("#profilescreen").show("fade", { duration: 500 });
              if (selected.text === "+") {
                newbounty(selected, difficultystring, bounties[pos]._id);
              } else {
                claimbounty(selected, bounties[pos]);
                $w("#newbountybutton").hide();
              }
              $w("#bounty00").collapse();
            } else {
              $w("#bountyscreen").postMessage(bounties[0]);
            }
            $w("#profilescreen").postMessage({
              bountytitle: "_",
              difficulty: difficultystring,
              bountydescription: "_",
            });
          }, 1400);
        });
    }
  });
  function numberToRGB(number) {
    let max = 100;
    let percentage = number / max;
    let r = Math.floor(percentage * 255) * 18;
    let g = 255;
    let b = Math.floor(percentage * 255) * 18;
    let opacity = 110 - number * 10;
    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
  }

  $w("#hoverbutto").onMouseIn(function () {
    if (wixUsers.currentUser.loggedIn) {
      $w("#currentkarma").expand();
      $w("#hoverbutto").expand();
      $w("#accountbox").expand();
      $w("#logou").show("slide", { direction: "bottom", duration: 200 });
      $w("#logou").onClick((event) => {
        wixUsers.logout();
      });
      $w("#accountbox").onMouseOut(function () {
        $w("#logou").hide("slide", { direction: "top", duration: 200 });
      });
    } else {
      $w("#hoverbutto").collapse();
      $w("#currentkarma").collapse();
    }
  });

  $w("#leaderboarddown").onClick(function () {
    let dataset = $w("#dataset1");
    let sort = wixData.sort().ascending("rank"); // sort by ascending rank
    dataset.setSort(sort);
    dataset.refresh();
    $w("#leaderboard").expand();
    $w("#leaderboardrepeater").expand();
    $w("#leaderboardvideo").expand();
    $w("#bingbutton").hide("fade", { duration: 200 });
    $w("#chatgptbutton").hide("fade", { duration: 200 });
    $w("#mjbutton").hide("fade", { duration: 200 });
    $w("#bountywheelbox").hide("fade", { duration: 500 });
    $w("#leaderboarddown").hide("fade", { delay: 1200, duration: 500 });
    $w("#leaderboardup").show("fade", { delay: 1200, duration: 500 });
    $w("#leaderboardvideo").show();
    $w("#leaderboardvideo").play();
    $w("#profilescreen").hide("fade", { duration: 500 });
    $w("#bountyscreen").hide("fade", { duration: 500 });
    $w("#difficultybox").hide("fade", { duration: 500 });
    $w("#accountbox").hide("fade", { duration: 500 });
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
    $w("#bingbutton").show("fade", { duration: 200 });
    $w("#chatgptbutton").show("fade", { duration: 200 });
    $w("#mjbutton").show("fade", { duration: 200 });
    $w("#bountywheelbox").show("fade", { duration: 500, delay: 1200 });
    $w("#leaderboardup").hide("fade", { delay: 1200, duration: 500 });
    $w("#leaderboarddown").show("fade", { delay: 1200, duration: 500 });
    $w("#leaderboardvideo").hide("roll", { duration: 1200, direction: "top" });
    $w("#profilescreen").show("fade", { delay: 1000, duration: 500 });
    $w("#bountyscreen").show("fade", { delay: 1000, duration: 500 });
    $w("#difficultybox").show("fade", { delay: 1000, duration: 500 });
    $w("#accountbox").show("fade", { delay: 1000, duration: 500 });
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
      $w("#leaderboardvideo").collapse();
      $w("#leaderboardrepeater").collapse();
      $w("#leaderboard").collapse();
    }, 1200);
  });
  $w("#leaderboardrepeater").onItemReady(($item, index) => {
    $item(
      "#placing",
    ).html = `<h3 class="wixui-rich-text__text" style="color: ${numberToRGB(
      index.rank + 1,
    )}; text-shadow: 2px 2px 4px ${numberToRGB(
      index.rank + 1,
    )};"><span class="wixui-rich-text__text">${index.rank + 1}</span></h3>`;
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

});
