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
$w("#bgvideo").mute();
$w("#bgvideo").play();
$w("#bgvideo").onEnded(function () {
    $w("#homebutton").show("slide",{delay: 500,duration:500,direction:"bottom",distance: 300});
$w("#bg").show("fade",{duration:200});
let changing = false;
$w("#bgvideo").delete();
$w("#bgvideo").hide("fade",{duration:200});
$w("#loadinggif").hide("fade",{duration:100});
$w("#bingbutton").show("fade",{duration:500});
//$w("#brighttext").show("fade",{duration:100});
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
//   let bgfoundation = generateSrc('https://static.wixstatic.com/media/cef1ec_9a5ddb378f934c1c8d6fab201b9d4c18~mv2.png','bg.png','1500x1500');
//   let difffoundation = generateSrc('https://static.wixstatic.com/media/cef1ec_cabc1e8aefd7461f82b0ba0f87f95a07~mv2.png','diffbg.png','3000x3000');
//   let easyload= generateSrc('https://static.wixstatic.com/media/cef1ec_7fc80f23505544eb89c5ea9d98362867~mv2.gif','easyload.gif','200x200');
//   let medload= generateSrc('https://static.wixstatic.com/media/cef1ec_a25005cadb9e4957b5d23e8ffebb88ff~mv2.gif','medload.gif','200x200');
//   let hardload= generateSrc('https://static.wixstatic.com/media/cef1ec_ecdcaa7bf32340fda6f5fd06a176688a~mv2.gif','hardload.gif','200x200');
//   let glow= generateSrc('https://static.wixstatic.com/media/cef1ec_c764f5ac7c02466b8ad2795ed8e55448~mv2.png','glow.png','1080x1080');
//   let easydiff= generateSrc('https://static.wixstatic.com/media/cef1ec_afb593aac8e7415da536a322f8b8692a~mv2.png','easydiff.png','714x736');
//   let meddiff= generateSrc('https://static.wixstatic.com/media/cef1ec_92619dc20d5f4ca6bc57db6ee74490f3~mv2.png','meddiff.png','1812x1868');
//   let harddiff= generateSrc('https://static.wixstatic.com/media/cef1ec_17716182358a444d804a1905d764d91b~mv2.png','harddiff.png','714x736');
//   let offscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_8a0b09eca19d41c5a8c9985529c06060~mv2.png','offscreen.png','1762x2395');
//   let onscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_eb3bd6d4e085446b80832d572a4b85f0~mv2.png','onscreen.png','1773x2392');
//   let easyscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_998cfe0a4de44cfd97929b4302348a50~mv2.png','easyscreen.png','1751x2392');
//   let medscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_aa1d2839f5b140cda2e7ef7160831b93~mv2.png','medscreen.png','1744x2389');
//   let hardscreen = generateSrc('https://static.wixstatic.com/media/cef1ec_1f082a1769fd41eb9949fa5fc6b021f6~mv2.png','hardscreen.png','1772x2402');
//   let urgreykarma = generateSrc("https://static.wixstatic.com/media/cef1ec_c219e2b0ec964c5ea756a123a913df14~mv2.png",'urkarmagrey.png','400x400');
//   let ureasykarma = generateSrc("https://static.wixstatic.com/media/cef1ec_0d21b8f5fdce411da0731663e00a849c~mv2.png",'urkarmaeasy.png','400x400');
//   let urmedkarma = generateSrc("https://static.wixstatic.com/media/cef1ec_9faef6f514254437bc35fd9debbe7955~mv2.png",'uurkarmamed.png','400x400');
//   let urhardkarma = generateSrc("https://static.wixstatic.com/media/cef1ec_cad8a95588444f6f9aefc6d62870cede~mv2.png",'urkarmahard.png','400x400');
//   let greykarma = generateSrc("https://static.wixstatic.com/media/cef1ec_9dd10dc4e1af46e0952dae5198f47f6b~mv2.png",'greykarma.png','400x400');
//   let easykarma = generateSrc("https://static.wixstatic.com/media/cef1ec_4fd98c76e75b4443aa7c5cf831b4ce45~mv2.png",'easykarma.png','400x400');
//   let medkarma = generateSrc("https://static.wixstatic.com/media/cef1ec_82443ae08d2e44b4a1998420664d5c43~mv2.png",'medkarma.png','400x400');
//   let hardkarma = generateSrc("https://static.wixstatic.com/media/cef1ec_512399b8d0b74b4797897c26a68857f3~mv2.png",'medkarma.png','400x400');
//   let easysrc = generateSrc("https://static.wixstatic.com/media/cef1ec_95ed5648d7fa45f2bc7089605143079d~mv2.png",'easywheel.png','1080x1080');
//   let medsrc = generateSrc("https://static.wixstatic.com/media/cef1ec_8d7ccaa7f2874aaf8368ae95b8f0e1c6~mv2.png",'medwheel.png', '1080x1080');
//   let hardsrc = generateSrc("https://static.wixstatic.com/media/cef1ec_f4bb8440dda548b78ee488bef0d63af8~mv2.png",'hardwheel.png', '1080x1080');
//   let easylight = generateSrc("https://static.wixstatic.com/media/cef1ec_6f441b2712ad4bd4a08428fd31f25634~mv2.png",'easylight.png','264x113');
//   let easydark = generateSrc("https://static.wixstatic.com/media/cef1ec_c5047475c2664a9985b54a81f4f899a5~mv2.png",'easydark.png','264x113');
//   let medlight = generateSrc("https://static.wixstatic.com/media/cef1ec_de90c58e5e0744c59b1a5cc93abe4ceb~mv2.png",'midlight.png','204x107');
//   let meddark = generateSrc("https://static.wixstatic.com/media/cef1ec_8631bfa97e52483899e314301572acee~mv2.png",'middark.png','204x107');
//   let hardlight = generateSrc("https://static.wixstatic.com/media/cef1ec_b13f49f69aeb48b98011a7b4090e3701~mv2.png",'hardlight.png','258x112');
//   let harddark = generateSrc("https://static.wixstatic.com/media/cef1ec_8f1a6e1846e3445cba9a1f37e9f863c4~mv2.png",'harddark.png','258x112');
  let mjlight = generateSrc("https://static.wixstatic.com/media/cef1ec_9191c6b8f0e04b14942163074a25d0b0~mv2.png",'mjlight.png','613x262');
  let mjdark = generateSrc("https://static.wixstatic.com/media/cef1ec_6a96031542944866ab5f5db9d8c888a2~mv2.png",'mjdark.png','613x262');
//   let chatlight = generateSrc("https://static.wixstatic.com/media/cef1ec_40c894a85bef4ba88340a008ef260e02~mv2.png",'chatlight.png','225x192');
//   let chatdark = generateSrc("https://static.wixstatic.com/media/cef1ec_f0c48cffdcaf4aebb4884ee55e2d5960~mv2.png",'chatdark.png','225x192');
  let bingdark = generateSrc("https://static.wixstatic.com/media/cef1ec_6d32706a633244f099dd77a31e0c7934~mv2.png",'bingdark.png','190x103');
  let binglight = generateSrc("https://static.wixstatic.com/media/cef1ec_cceb11cad6f94dfe96368f826f94c434~mv2.png",'binglight.png','190x103');
//   let spiderdark = generateSrc("https://static.wixstatic.com/media/cef1ec_85a90685ba8349ad891a3232e025c01f~mv2.png",'spiderdark.png','478x137');
//   let spiderlight = generateSrc("https://static.wixstatic.com/media/cef1ec_6fa1071d6f6b4ad7830402cdbad4def1~mv2.png",'spiderlight.png','478x137');
//   let description;
//   let connector=$w("#easyconnector");
//   let selected=$w("#bounty00");
//   let bright;
//   let dim;
//   let bounties;
//   let modelstring;
//   let reward;
//   let collection;
//   let fileType;
//   let submittedids;
//   let previousDifficultystring = "_";
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
    }
  ];
  //   {
  //     name: "chatgpt",
  //     angle: 180,
  //     darksrc: chatdark,
  //     brightsrc: chatlight,
  //     text: $w("#chatgptdark"),
  //     button: $w("#chatgptbutton")
  //   }
  // ];
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
});