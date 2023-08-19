// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';
import {timeline} from 'wix-animations';
import wixUsers from 'wix-users';
import { authentication } from 'wix-members-frontend';
import wixLocation from 'wix-location';
import {newsubmision,claimBounty,adduser} from 'backend/karma'
let userid=wixUsers.currentUser.id
adduser(userid);
$w("#homebutton").onClick(function () {
    wixLocation.to ("/home");
});
$w("#hoverbutto").onMouseIn (function () {
  if(wixUsers.currentUser.loggedIn) {
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
  $w(`#bounty23`)
];
$w("#bgvideo").mute();
$w("#bgvideo").play();
$w("#bgvideo").onEnded(function () {
$w('#profilescreen').postMessage({bountytitle: "_", difficulty: "none", bountydescription: "_"});
$w('#bountyscreen').postMessage({bountytitle: "_", difficulty: "none", bountydescription: "_"});
$w("#bg").show("fade",{duration:200});
let changing = false;
$w("#bgvideo").delete();
$w("#bgvideo").hide("fade",{duration:200});
$w("#loadinggif").hide("fade",{duration:100});
$w("#bingbutton").show("fade",{duration:500});
$w("#brighttext").show("fade",{duration:100});
$w("#cwbutton").show("fade",{duration:100});
$w("#ccwbutton").show("fade",{duration:100});
$w("#modelwheel").show("fade",{duration:100});

//$w("#accountbox").show("fade",{duration:200});
//$w("#openaibountybutton").show("fade",{duration:200});
// $w("#bingdark").show("fade",{duration:100});
// $w("#spiderdark").show("fade",{duration:100});
// $w("#chatgptdark").show("fade",{duration:100});
// $w("#mjdark").show("fade",{duration:100});
// if(wixUsers.currentUser.loggedIn) {
// $w("#hoverbutton").onMouseIn (function () {
//  $w("#homebutton").show("roll",{direction:"top",duration: 200,delay:200})
//  $w("#badge").show("slide",{direction:"left",duration: 200})
//  });
//   $w("#accountbox").onMouseOut (function () {
//   $w("#badge").hide("slide",{direction:"left",duration: 200})
//   $w("#homebutton").hide("roll",{direction:"top",duration: 200})
// });
// }else{
//   $w("#currentkarma").collapse();
//   $w("#hoverbutton").onMouseIn (function () {
//    $w("#homebutton").show("roll",{direction:"top",duration: 200,delay:200})
//    });
//   $w("#accountbox").onMouseOut (function () {
//   $w("#homebutton").hide("roll",{direction:"top",duration: 200})
// });
// }
  function generateSrc(url, name, resolution) {
    let src = "wix:image://v1/";
    let urlId = url.split("/")[4];
    let width = resolution.split("x")[0];
    let height = resolution.split("x")[1];
    src += urlId + "/" + name + "#originWidth=" + width + "&originHeight=" + height; // append the id, name and resolution to the src
    return src;
  }
  function buildhtml(fontsize,color,text) {
    return `<h3 class="wixui-rich-text__text" style="font-size:${fontsize}px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${color}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${text}</span></span></span></span></h3>`;
  }
  let bgfoundation = generateSrc('https://static.wixstatic.com/media/cef1ec_9a5ddb378f934c1c8d6fab201b9d4c18~mv2.png','bg.png','1500x1500');
  let difffoundation = generateSrc('https://static.wixstatic.com/media/cef1ec_c5571e32565c46cf9263794206de26d1~mv2.png','diffbackground.png','3000x3000');
  let easyload= generateSrc('https://static.wixstatic.com/media/cef1ec_7fc80f23505544eb89c5ea9d98362867~mv2.gif','easyload.gif','200x200');
  let medload= generateSrc('https://static.wixstatic.com/media/cef1ec_a25005cadb9e4957b5d23e8ffebb88ff~mv2.gif','medload.gif','200x200');
  let hardload= generateSrc('https://static.wixstatic.com/media/cef1ec_ecdcaa7bf32340fda6f5fd06a176688a~mv2.gif','hardload.gif','200x200');
  let glow= generateSrc('https://static.wixstatic.com/media/cef1ec_c764f5ac7c02466b8ad2795ed8e55448~mv2.png','glow.png','1080x1080');
  let easydiff= generateSrc('https://static.wixstatic.com/media/cef1ec_afb593aac8e7415da536a322f8b8692a~mv2.png','easydiff.png','714x736');
  let meddiff= generateSrc('https://static.wixstatic.com/media/cef1ec_92619dc20d5f4ca6bc57db6ee74490f3~mv2.png','meddiff.png','1812x1868');
  let harddiff= generateSrc('https://static.wixstatic.com/media/cef1ec_17716182358a444d804a1905d764d91b~mv2.png','harddiff.png','714x736');
  let offscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_8a0b09eca19d41c5a8c9985529c06060~mv2.png','offscreen.png','1762x2395');
  let onscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_eb3bd6d4e085446b80832d572a4b85f0~mv2.png','onscreen.png','1773x2392');
  let easyscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_998cfe0a4de44cfd97929b4302348a50~mv2.png','easyscreen.png','1751x2392');
  let medscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_aa1d2839f5b140cda2e7ef7160831b93~mv2.png','medscreen.png','1744x2389');
  let hardscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_1f082a1769fd41eb9949fa5fc6b021f6~mv2.png','hardscreen.png','1772x2402');
  let urgreykarma = generateSrc("https://static.wixstatic.com/media/cef1ec_c219e2b0ec964c5ea756a123a913df14~mv2.png",'urkarmagrey.png','400x400');
  let ureasykarma = generateSrc("https://static.wixstatic.com/media/cef1ec_0d21b8f5fdce411da0731663e00a849c~mv2.png",'urkarmaeasy.png','400x400');
  let urmedkarma = generateSrc("https://static.wixstatic.com/media/cef1ec_9faef6f514254437bc35fd9debbe7955~mv2.png",'uurkarmamed.png','400x400');
  let urhardkarma = generateSrc("https://static.wixstatic.com/media/cef1ec_cad8a95588444f6f9aefc6d62870cede~mv2.png",'urkarmahard.png','400x400');
  let greykarma = generateSrc("https://static.wixstatic.com/media/cef1ec_9dd10dc4e1af46e0952dae5198f47f6b~mv2.png",'greykarma.png','400x400');
  let easykarma = generateSrc("https://static.wixstatic.com/media/cef1ec_4fd98c76e75b4443aa7c5cf831b4ce45~mv2.png",'easykarma.png','400x400');
  let medkarma = generateSrc("https://static.wixstatic.com/media/cef1ec_82443ae08d2e44b4a1998420664d5c43~mv2.png",'medkarma.png','400x400');
  let hardkarma = generateSrc("https://static.wixstatic.com/media/cef1ec_512399b8d0b74b4797897c26a68857f3~mv2.png",'medkarma.png','400x400');
  let easysrc = generateSrc("https://static.wixstatic.com/media/cef1ec_95ed5648d7fa45f2bc7089605143079d~mv2.png",'easywheel.png','1080x1080');
  let medsrc = generateSrc("https://static.wixstatic.com/media/cef1ec_8d7ccaa7f2874aaf8368ae95b8f0e1c6~mv2.png",'medwheel.png', '1080x1080');
  let hardsrc = generateSrc("https://static.wixstatic.com/media/cef1ec_f4bb8440dda548b78ee488bef0d63af8~mv2.png",'hardwheel.png', '1080x1080');
  let easylight = generateSrc("https://static.wixstatic.com/media/cef1ec_6f441b2712ad4bd4a08428fd31f25634~mv2.png",'easylight.png','264x113');
  let easydark = generateSrc("https://static.wixstatic.com/media/cef1ec_c5047475c2664a9985b54a81f4f899a5~mv2.png",'easydark.png','264x113');
  let medlight = generateSrc("https://static.wixstatic.com/media/cef1ec_de90c58e5e0744c59b1a5cc93abe4ceb~mv2.png",'midlight.png','204x107');
  let meddark = generateSrc("https://static.wixstatic.com/media/cef1ec_8631bfa97e52483899e314301572acee~mv2.png",'middark.png','204x107');
  let hardlight = generateSrc("https://static.wixstatic.com/media/cef1ec_b13f49f69aeb48b98011a7b4090e3701~mv2.png",'hardlight.png','258x112');
  let harddark = generateSrc("https://static.wixstatic.com/media/cef1ec_8f1a6e1846e3445cba9a1f37e9f863c4~mv2.png",'harddark.png','258x112');
  let mjlight = generateSrc("https://static.wixstatic.com/media/cef1ec_9191c6b8f0e04b14942163074a25d0b0~mv2.png",'mjlight.png','613x262');
  let mjdark = generateSrc("https://static.wixstatic.com/media/cef1ec_6a96031542944866ab5f5db9d8c888a2~mv2.png",'mjdark.png','613x262');
  let chatlight = generateSrc("https://static.wixstatic.com/media/cef1ec_40c894a85bef4ba88340a008ef260e02~mv2.png",'chatlight.png','225x192');
  let chatdark = generateSrc("https://static.wixstatic.com/media/cef1ec_f0c48cffdcaf4aebb4884ee55e2d5960~mv2.png",'chatdark.png','225x192');
  let bingdark = generateSrc("https://static.wixstatic.com/media/cef1ec_6d32706a633244f099dd77a31e0c7934~mv2.png",'bingdark.png','190x103');
  let binglight = generateSrc("https://static.wixstatic.com/media/cef1ec_cceb11cad6f94dfe96368f826f94c434~mv2.png",'binglight.png','190x103');
  let connector=$w("#easyconnector");
  let selected=$w("#bounty00");
  let bright;
  let dim;
  let bounties;
  let modelstring;
  let reward;
  let collection;
  let fileType;
  let submittedids;
  let previousDifficultystring = "_";
const models = [
    {
      name: "bing",
      angle: 0,
      darksrc: bingdark,
      brightsrc: binglight,
      button: $w("#bingbutton")
    },
    {
      name: "mj",
      angle: 90,
      darksrc: mjdark,
      brightsrc: mjlight,
      button: $w("#mjbutton")
    },
    {
      name: "chatgpt",
      angle: 180,
      darksrc: chatdark,
      brightsrc: chatlight,
      button: $w("#chatgptbutton")
    }
  ];
  let currentmodel = models[0];
  function nextModel(current, direction) {
    let index = models.findIndex(model => model.name === current.name);
    if (direction === "cw") {
      return models[(index + 1) % models.length];
    } else {
      return models[(index - 1 + models.length) % models.length];
    }
  }
  let wheelAngle = 0;
  function rotateModelWheel(direction) {
      let next = nextModel(currentmodel, direction);
      currentmodel.button.hide("fade", {duration: 400});
      $w("#brighttext").src = next.brightsrc;
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
        duration: 1000
      });
      changemodel.play();
      setTimeout(() => {
        setTimeout(() => {
        changing = false;
        currentmodel = next;
        }, 600);
        $w("#brighttext").show("fade", {delay:500,duration: 200});
        next.button.show("fade", {delay:500,duration: 200});
      }, 500);
  }
  $w("#cwbutton").onMouseIn(function () {
    if (!changing){
      changing=true
    $w("#brighttext").hide();
    rotateModelWheel("cw");
  }
  });
  $w("#ccwbutton").onMouseIn(function () {
    if (!changing){
      changing=true
    $w("#brighttext").hide();
    rotateModelWheel("ccw");
  }
  });
  function hidestuff() {
    $w("#wheel").hide("fade", { duration: 300 });
    for (let i = 0; i < bountybuttons.length; i++) {
    bountybuttons[i].hide();
    }
    $w("#bg").src=difffoundation;
    $w("#cwbutton").hide();
    $w("#ccwbutton").hide();
    $w("#currentkarma").show("fade",{duration:500});
    $w("#difficultywheel").show("fade",{duration:500});
    $w("#brighttext").hide("fade",{duration:500});
    $w('#bountyscreen').postMessage({bountytitle: "_", difficulty: previousDifficultystring, bountydescription: "_"});
    $w('#profilescreen').postMessage({bountytitle: "_", difficulty: "none", bountyDescription: "_"});
    $w("#postbountyamount").hide("fade", {duration:100});
    $w("#diffbg").hide("roll",{direction:"left",duration:400});
    $w('#bountyscreen').hide();
    $w("#accountbox").hide("fade", { duration: 100 });
    $w("#bountyamounttext").hide("fade", { duration: 100 });
    $w("#claimbountyupload").hide("fade", { duration: 100 });
    $w("#newbountybutton").hide("fade", { duration: 100 });
    $w("#postbountydisc").hide("fade", { duration: 100 });
  }
  $w("#chatgptbutton").onClick(function () {
    hidestuff();
    $w("#bingbutton").hide();
    $w("#mjbutton").hide();
    modelstring = "chatgpt";
    collection = "ChatGPTSubmissions";
    fileType = "URL";
    showDifficulty("easy")
  });
  $w("#mjbutton").onClick(function () {
    hidestuff();
    $w("#bingbutton").hide();
    $w("#chatgptbutton").hide();
    modelstring = "mj";
    collection = "MJSubmissions";
    fileType = "Image";
    showDifficulty("easy")
  });
  $w("#bingbutton").onClick(function () {
    hidestuff();
    $w("#mjbutton").hide();
    $w("#chatgptbutton").hide();
    modelstring = "bing";
    collection = "BingSubmissions";
    fileType = "Document";
    showDifficulty("easy")
  });
  $w("#easydark").onMouseIn(function () {
    if (!changing){
      $w('#bountyscreen').hide();
      $w('#profilescreen').hide();
  $w("#meddark").src = meddark;
  $w("#harddark").src = harddark;
      $w("#easydark").src = easylight;
      setTimeout(() => {
      showDifficulty("easy");
      }, 200);
    }
});
$w("#meddark").onMouseIn(function () {
    if (!changing){
      $w('#bountyscreen').hide();
      $w('#profilescreen').hide();
        $w("#easydark").src = easydark;
  $w("#harddark").src = harddark;
      $w("#meddark").src = medlight;
      setTimeout(() => {
      showDifficulty("med");
      }, 200);
    }
});
$w("#harddark").onMouseIn(function () {
    if (!changing){
      $w('#bountyscreen').hide();
      $w('#profilescreen').hide();
        $w("#easydark").src = easydark;
  $w("#meddark").src = meddark;
      $w("#harddark").src = hardlight;
      setTimeout(() => {
      showDifficulty("hard");
      }, 200);
    }
});
  function newbounty(element,difficultystring,bounty) {
    // if (difficultystring === "easy") {
    //   $w("#postbountyamount").step = 5;
    //     $w("#postbountyamount").min = 10;
    //     $w("#postbountyamount").max = 50;
    // } else if (difficultystring === "med") {
    //   $w("#postbountyamount").step = 5;
    //     $w("#postbountyamount").min = 50;
    //     $w("#postbountyamount").max = 100;
    // } else if (difficultystring === "hard") {
    //   $w("#postbountyamount").step = 10;
    //     $w("#postbountyamount").min = 100;
    //     $w("#postbountyamount").max = 500;
    // }
    $w("#postbountydisc").value="";
    $w("#postbountyname").value="";
    $w("#badge").show("slide",{direction:"left",duration: 200})
    $w("#currentkarma").show("slide",{direction:"right",duration: 200})
    $w("#postbountyamount").show();
    $w("#postbountydisc").show();
    $w("#postbountyname").show();
    $w("#claimbountyupload").hide();
    $w("#accountbox").show("roll", {duration: 500,direction:"right"});
    $w("#newbountybutton").show("roll",{delay:500,direction:"top",duration:200});
    $w("#postbountydisc").show("roll",{delay:300,direction:"top",duration:500});
    $w("#postbountyname").show("roll", {delay:100,duration: 500 });
    $w("#bountyamounttext").show("roll",{direction:"top", duration:500});
    $w("#bountyamounttext").text=($w("#postbountyamount").selectedIndex).toString();
    let tempwallet = (Number($w("#currentkarma").text)-$w("#postbountyamount").selectedIndex).toString();
    let t=0
  function updateText(added) {
  if (t<added){
    t++
      let currentKarma = Number(tempwallet);
      let bountyAmount = Number($w("#bountyamounttext").text);
      $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#000000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${tempwallet}</span></span></span></span></h3>`;
      $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#000000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
          currentKarma--;
          bountyAmount++;
          tempwallet = currentKarma.toString();
          $w("#bountyamounttext").text = bountyAmount.toString();
          setTimeout(function(){
              $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${tempwallet}</span></span></span></span></h3>`;
              $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
          }, 100);
          setTimeout(updateText,200,added);
      } else {
        changing=false
          $w("#loadinggif").hide();
          $w("#newbountybutton").hide();
          element.text=$w("#postbountyname").value
          $w("#newbountybutton").hide("fade", { duration: 100 });
          $w("#postbountydisc").hide("fade", { duration: 100 });
          $w("#postbountyname").hide("roll",{direction:"left", duration: 100 });
          $w('#bountyscreen').postMessage({bountytitle: $w("#postbountyname").value, difficulty: difficultystring, bountydescription: $w("#postbountydisc").value});
          $w('#profilescreen').postMessage({bountytitle: "_", difficulty: difficultystring, bountyDescription: "_"});
          element.show("roll", {delay:100,duration: 500 });
          $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${tempwallet}</span></span></span></span></h3>`;
        $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
      }

  }
$w("#postbountyamount").onChange(() => {
  $w("#bountyamounttext").text = $w("#postbountyamount").selectedIndex.toString();
  tempwallet = (Number(tempwallet) - $w("#postbountyamount").selectedIndex).toString();
  if (Number(tempwallet) < Number($w("#bountyamounttext").text)) {
    $w("#newbountybutton").disable();
    tempwallet = Math.max(Number(tempwallet), 0).toString(); // set tempwallet to 0 if it is negative
    $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#000000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${tempwallet}</span></span></span></span></h3>`;
    $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#000000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
  } else {
    $w("#newbountybutton").enable();
    $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${tempwallet}</span></span></span></span></h3>`;
    $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
  }
});
  $w("#newbountybutton").onClick( () => {
    let spentkarma=$w("#postbountyamount").selectedIndex
    changing=true
    if (Number(tempwallet)-spentkarma >= 0) {
      let newbountysubmission = {
        "reward": $w("#postbountyamount").selectedIndex.toString(),
        "bountytitle": $w("#postbountyname").value,
        "bountydescription": $w("#postbountydisc").value,
        "difficulty":difficultystring,
      };
                // newsubmision(modelstring, newbountysubmission,spentkarma,userid)
                // $w("#bountyamounttext").text = $w("#postbountyamount").min.toString();
                // $w("#loadinggif").show();
                // updateText($w("#postbountyamount").selectedIndex-$w("#postbountyamount").min);
                }
            });
  }
  function claimbounty(element,bounty) {
  let t=0
  element.hide();
  $w('#bountyscreen').show();
  $w('#profilescreen').show();
  $w('#bountyscreen').postMessage(bounty);
  $w('#profilescreen').postMessage({bountytitle: "_", difficulty: previousDifficultystring, bountyDescription: "_"});
  $w("#claimbountyupload").enable();
  $w("#claimbountyupload").show();
  $w("#postbountydisc").hide();
  $w("#postbountyname").hide();
  $w("#badge").show("slide",{direction:"left",duration: 200})
  $w("#currentkarma").show("slide",{direction:"right",duration: 200})
  $w("#accountbox").show("roll", { duration: 500,direction:"right"});
  $w("#bountyamounttext").show("roll", { duration: 500 });
$w('#bountyscreen').postMessage(bounty);
  $w("#claimbountyupload").show("roll",{delay:200,duration:200});
  let tempwallet = Number($w("#currentkarma").text);
  let bountyAmount = Number($w("#bountyamounttext").text);
  function updateText(reward) {
  if (t<reward){
    t++;
    $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#currentkarma").text}</span></span></span></span></h3>`;
    $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#ffffff" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
    tempwallet++;
    bountyAmount--;
    $w("#currentkarma").text = tempwallet.toString();
    $w("#bountyamounttext").text = bountyAmount.toString();
    setTimeout(function() {
      $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#currentkarma").text}</span></span></span></span></h3>`;
      $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${dim}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
    }, 100);
    setTimeout(updateText,200,reward);
  } else {
      $w("#loadinggif").hide();
      $w("#claimbountyupload").hide("roll",{direction:"top", duration: 200 });
$w('#bountyscreen').postMessage({bountytitle: "_", difficulty: previousDifficultystring, bountyDescription: "_"});
$w('#profilescreen').postMessage({bountytitle: "_", difficulty: previousDifficultystring, bountyDescription: "_"});
      $w("#bountyamounttext").hide("roll",{delay:600,direction:"right", duration: 100 });
      element.hide("roll",{delay:800,direction:"left", duration: 100 });
      setTimeout(function() {
      $w('#bountyscreen').postMessage({bountytitle: "_", difficulty: previousDifficultystring, bountyDescription: "Bounty Complete"});
      element.collapse();
      setTimeout(function() {
      $w('#bountyscreen').postMessage({bountytitle: "_", difficulty: previousDifficultystring, bountyDescription: "_"});
      $w('#profilescreen').postMessage({bountytitle: "_", difficulty: previousDifficultystring, bountyDescription: "_"});
      $w("#bountyscreen").hide("fade",{delay:2000,duration:200});
      connector.hide("roll",{delay:2000,duration:300,direction:"right"});
        }, 1200);
      changing=false;
      $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#currentkarma").text}</span></span></span></span></h3>`;
      $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
    }, 1200);
    return;
  }
  }
  $w("#claimbountyupload").enable();
  $w("#claimbountyupload").fileType = fileType;
$w("#claimbountyupload").onChange(function() {
    changing=true;
    $w("#claimbountyupload").uploadFiles()
        .then(uploadedFiles => {
          uploadedFiles.forEach(uploadedFile => {
            let claim = {
                "file": uploadedFile.fileUrl,
                "bounty": bounty,
            };
            console.log(bounty.id);
            claimBounty(collection, claim, userid);
            $w("#claimbountyupload").hide("fade", {duration: 200});
            $w("#loadinggif").show();
            updateText(reward);
        })
        })
        .catch(uploadError => {
            console.log(`Error: ${uploadError.errorCode}`);
            console.log(uploadError.errorDescription);
        });
});
  }
  function makethemdim(element) {
    if (changing === false) {
        for (let i = 0; i < bounties.length; i++){
        let bountytitle = bounties[i].bountytitle;
        if (bountytitle.length) {
        let fontsize = (30 - bountytitle.length).toString();
        if (bountybuttons[i] == element) {
          bountybuttons[i].html = buildhtml(fontsize, bright, bounties[i].bountytitle);
        } else if (bountybuttons[i] == selected) {
          bountybuttons[i].html = buildhtml(fontsize, bright, bounties[i].bountytitle);
        } else if (bounties[i].bountytitle != "+") {
          bountybuttons[i].html = buildhtml(fontsize, dim, bounties[i].bountytitle);
        } else {
          bountybuttons[i].html = buildhtml(fontsize, "#000000", "+");
        }
      }
      }
    }
  }
  function rotatedifficulties(difficultystring){
    if (difficultystring !== previousDifficultystring) {
      if (selected!==$w("#bounty00")){
      selected.expand();
    }
      const angles = {
        easy: 270,
        med:  315,
        hard: 360
      };
      let currAngle = angles[difficultystring];
      let rotateValue = (270 - currAngle)
      const changeDifficulty = timeline();
      changeDifficulty.add($w("#difficultywheel"), {
        rotate: rotateValue,
        easing: "easeInSine",
        duration: 690
      });
      changeDifficulty.play();
      previousDifficultystring = difficultystring;
      setTimeout(() => {
        changing = false;
      }, 1380);
    }
  }
  function showDifficulty(difficultystring) {
    changing = true;
    bounties=null
    $w("#easydark").show("fade",{duration:500});
    $w("#meddark").show("fade",{delay:200,duration:500});
    $w("#harddark").show("fade",{delay:400,duration:500});
    $w("#postbountyamount").hide("fade", {delay:100,duration:200});
    $w("#bountyamounttext").hide("fade", { delay:100,duration: 100 });
    $w("#claimbountyupload").hide("fade", { delay:100,duration: 100 });
    $w("#newbountybutton").hide("fade", { delay:100,duration: 100 });
    $w("#postbountydisc").hide("fade", { delay:100,duration: 100 });
    $w('#bountyscreen').postMessage({bountytitle: "_", difficulty: difficultystring, bountydescription: "_"});
    $w('#profilescreen').postMessage({bountytitle: "_", difficulty: difficultystring, bountyDescription: "_"});
    $w("#postbountyname").hide("roll", {delay:100,duration: 100,direction:"left"});
    $w("#accountbox").hide("fade", { duration: 100 });
    $w("#diffbg").hide("fade", { duration: 100 });
    $w("#wheel").show("fade", { duration: 100 });
    rotatedifficulties(difficultystring);
    connector.hide("roll",{direction:"left",duration:300});
    $w("#wheelbg").show();
    if (difficultystring === "easy") {
      $w("#loadinggif").src=easyload
      bright = "#00ff00";
      dim = "#006600";
      $w("#diffbg").src = easydiff;
      connector = $w("#easyconnector");
    } else if (difficultystring === "med") {
      $w("#loadinggif").src=medload
      bright = "#ffff00";
      dim = "#646000";
      $w("#diffbg").src = meddiff;
      connector = $w("#medconnector");
    } else if (difficultystring === "hard") {
      $w("#loadinggif").src=hardload
      bright = "#ff0000";
      dim = "#520005";
      $w("#diffbg").src = harddiff;
      connector = $w("#hardconnector");
    }
    console.log(medscreen)
    const delay = 30;
    const spinbg = timeline();
    spinbg.add($w("#glowwheel"), {
    rotate: 345,
    easing: "easeLinear",
    duration: 690
    });
  wixData.query(modelstring)
      .eq("difficulty", difficultystring)
      .find()
      .then(results => {
    return results;
  })
  .then(results => {
    bounties = results.items;
    wixData.query(collection)
      .eq("_owner", userid)
      .find()
      .then(results => {
        submittedids = results.items.map(item => item.bountyid);
        for (let i = 0; i < bounties.length; i++) {
          bountybuttons[i].show("fade", { delay: (bounties.length - i) * delay, duration: delay });
          let element = bountybuttons[i];
          // if (submittedids.includes(bounties[i]._id)){
          //   element.collapse();
          // }
          // if (bounties[i]._owner===userid){
          //   element.collapse();
          // }
          setTimeout(function () {
            element.text = "+";
            element.html = buildhtml("40", bright, "+");
          }, delay * (bounties.length - i - 2));
      }
      spinbg.play();
      setTimeout(function () {
        for (let j = 0; j < bounties.length; j++) {
          setTimeout(function () {
            let bountytitle = bounties[j].bountytitle
            let fontsize = (30 - bountytitle.length).toString();
            let element = bountybuttons[j];
            element.text = bountytitle;
              if (bountytitle !== "+") {
                element.show("fade");
                element.html = buildhtml(fontsize, dim, bountytitle);
              } else {
                element.html = buildhtml(fontsize, "#000000", bountytitle);
              }
          }, delay * j);
        }
      spinbg.reverse();
      if (difficultystring === "easy") {
      $w("#easydark").hide("fade",{duration:300});
      $w("#wheelbg").src = easysrc;
      } else if (difficultystring === "med") {
      $w("#meddark").hide("fade",{duration:300});
      $w("#wheelbg").src = medsrc;
      } else if (difficultystring === "hard") {
      $w("#harddark").hide("fade",{duration:300});
      $w("#wheelbg").src = hardsrc;
      }
      $w("#diffbg").show("fade", { duration: 200 });
      connector.show("roll",{direction:"left",duration:300});
      $w("#bountyscreen").show("fade", {delay:200,duration: 300});
      $w('#profilescreen').show("fade", {delay:200,duration: 300});
      $w("#bountyamounttext").html = buildhtml("50",bright,$w("#bountyamounttext").text);
      $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#currentkarma").text}</span></span></span></span></h3>`;
      $w("#accountbox").show("roll", { duration: 500,direction:"right"});
      $w("#currentkarma").show("roll", { duration: 500,direction:"right"});
      $w("#newbountybutton").style.color = bright;
      $w("#postbountydisc").style.color = bright;
      $w("#postbountydisc").style.borderColor = bright;
      $w("#postbountyname").style.color = bright;
      $w("#postbountyname").style.borderColor = bright;
      $w("#claimbountyupload").style.color = bright;
      $w("#claimbountyupload").style.borderColor = bright;
      }, delay * bounties.length);
    for (let i = 0; i < bounties.length; i++) {
        let bountytitle = bounties[i].bountytitle
        let fontsize = (30 - bountytitle.length).toString();
        let element = bountybuttons[i];
        if (element === selected&&selected.text !== "+"){
        setTimeout(() => {
        $w('#bountyscreen').postMessage(bounties[i]);
        }, 690);
        }

        element.onMouseIn(function () {
            element.html = buildhtml(fontsize, bright, bountytitle);
            makethemdim(element);
        });
    element.onClick(function () {
      if (!changing){
      if (selected !== element) {
        $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#currentkarma").text}</span></span></span></span></h3>`;
        selected.show("fade", { duration: 100 })
        selected.html = buildhtml((30 - selected.text.length).toString(), dim, selected.text);
        $w("#currentkarma").text=($w("#currentkarma").text).toString();
        $w("#postbountydisc").hide();
        $w("#postbountyname").hide();
        $w('#bountyscreen').hide();
        $w("#badge").hide("slide",{direction:"left",duration: 200})
        $w("#currentkarma").hide("slide",{direction:"right",duration: 200})
        $w("#postbountyamount").hide("fade", {duration:100});
        $w("#bountyamounttext").hide("fade", { duration: 100 });
        $w("#claimbountyupload").hide("fade", { duration: 100 });
        $w("#newbountybutton").hide("fade", { duration: 100 });
        $w('#bountyscreen').postMessage({bountytitle: "_", difficulty: difficultystring, bountydescription: "_"});
        $w('#profilescreen').postMessage({bountytitle: "_", difficulty: difficultystring, bountyDescription: "_"});
        $w("#postbountydisc").hide("fade", { duration: 100 });
        $w("#postbountyname").hide("roll",{delay:100,direction:"left", duration: 100 });
        connector.hide("roll",{direction:"left",duration:100});
        const angles = {
          bounty00:0,
          bounty01:15,
          bounty02:30,
          bounty03:45,
          bounty04:60,
          bounty05:75,
          bounty06:90,
          bounty07:105,
          bounty08:120,
          bounty09:135,
          bounty10:150,
          bounty11:165,
          bounty12:180,
          bounty13:195,
          bounty14:210,
          bounty15:225,
          bounty16:240,
          bounty17:255,
          bounty18:270,
          bounty19:285,
          bounty20:300,
          bounty21:315,
          bounty22:330,
          bounty23:345
        };
          let currAngle = angles[element.id.slice(-8)];
          let rotateValue = (currAngle)
          const spin = timeline();
          spin.add($w("#wheel"), {
            rotate: rotateValue,
            easing: 'easeInOutSine',
            duration: 690
        });
        spin.play();
        changing=true
        setTimeout(() => {
        reward=Number(bounties[i].reward);
        $w("#bountyamounttext").html = buildhtml("50", bright, bounties[i].reward);
        $w('#bountyscreen').postMessage(bounties[i])
        connector.show("roll",{direction:"left",duration:100});
        $w("#bountyscreen").show("fade",{duration:500});
        $w('#profilescreen').show("fade", {duration: 500});
        if (element.text !="+"){
        claimbounty(element,bounties[i]);
        }else{
          if(wixUsers.currentUser.loggedIn) {
          $w("#postbountydisc").expand();
          $w("#postbountyname").expand();
          newbounty(element,difficultystring,bounties[i]._id);
          element.hide("fade",{duration:200});
          if (Number($w("#currentkarma").text) < $w("#postbountyamount").selectedIndex) {
          $w("#newbountybutton").disable();
          $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#000000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#currentkarma").text}</span></span></span></span></h3>`;
          $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:#000000" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
          } else {
          $w("#newbountybutton").enable();
          $w("#currentkarma").html = `<h3 class="wixui-rich-text__text" style="text-align:right;font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#currentkarma").text}</span></span></span></span></h3>`;
          $w("#bountyamounttext").html = `<h3 class="wixui-rich-text__text" style="font-size:50px"><span style="text-shadow:#ffffff 0px 0px 6px" class="wixui-rich-text__text"><span style="font-weight:bold" class="wixui-rich-text__text"><span style="color:${bright}" class="wixui-rich-text__text"><span style="font-family:wfont_edfbfb_ee9003cfe4fb457aa3af4884ade40b22,wf_ee9003cfe4fb457aa3af4884a,orig_neon_sans" class="wixui-rich-text__text">${$w("#bountyamounttext").text}</span></span></span></span></h3>`;
          }
          }else{$w("#newbountybutton").disable();
          $w("#currentkarma").hide();
          authentication.promptLogin();
          }
        }
        changing=false
        selected = element;
        }, 690);
        }
      }
    });
    }
    });
    setTimeout(() => {
      if (selected != $w("#bounty00")){
      $w("#accountbox").show("roll", { duration: 500,direction:"right"});
      $w("#bountyamounttext").show("roll", { duration: 500 });
      $w("#bountyscreen").show("fade",{duration:500});
      $w('#profilescreen').show("fade", {duration: 500});
      if (selected.text ==="+"){
        newbounty(selected,difficultystring);
      }else{claimbounty(selected);$w("#newbountybutton").hide();$w("#bounty00").collapse();}
      }
      }, 1400);
  });
  }
});