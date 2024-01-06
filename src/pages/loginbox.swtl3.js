import { authentication } from "wix-members-frontend";
import wixData from "wix-data";
import wixUsers from "wix-users";
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
function convertToStaticUrl(imageUrl) {
    let urlId = imageUrl.split("/")[3].split(".")[0];
    let urlExtension = imageUrl.split("/")[4].split(".")[1].split("#")[0];
    let staticUrl = `https://static.wixstatic.com/media/${urlId}.${urlExtension}`;
    return staticUrl;
  }
$w.onReady(function () {
  let script = `
  document.querySelector("#emailinput").autocomplete = "email";
  document.querySelector("#passwordinput").autocomplete = "current-password";
`;
  wixWindow.postMessage(script);
  $w("#signupbutton").hide();
  $w("#profilepicupload").hide();
  $w("#forgotpasswordbutton").hide();
  let uploadedFile="none"
  $w("#profilepicupload").onChange(function () {
    $w("#profilepicupload")
      .uploadFiles()
      .then(async (uploadedFiles) => {
        uploadedFile = convertToStaticUrl(uploadedFiles[0].fileUrl);
        $w("#pfp").src = uploadedFile;
        });
    });
  $w("#forgotpasswordbutton").onClick( async() => {
    wixUsers.promptForgotPassword()
    .then( ( ) => {
    })
    .catch( (err) => {
    let errorMsg = err;
    });
    });
$w("#loginbutton").onClick(async() => {
    if ($w("#emailinput").valid && $w("#passwordinput").valid) {
            let email = $w("#emailinput").value;
            let password = $w("#passwordinput").value;
        await authentication.login(email, password)
            .then(() => {
                $w("#signupbutton").hide();
                $w("#forgotpasswordbutton").hide();
                $w("#loginbutton").style.backgroundColor = "#00ff0020";
                $w("#emailinput").style.backgroundColor = "#00ff0020";
                $w("#passwordinput").style.backgroundColor = "#00ff0020";
                $w("#loginbutton").style.borderColor = "#00ff0050";
                $w("#emailinput").style.borderColor = "#00ff0050";
                $w("#passwordinput").style.borderColor = "#00ff0050";
                setTimeout(() => {
                    wixWindow.lightbox.close();
                    wixLocation.to("https://www.anns.ai");
                }, 1000);
            })
            .catch((error) => {
                    console.log(error);
                    if (error.message.includes("wrong password")) {
                        console.log("Wrong password entered");
                        $w("#signupbutton").hide();
                        $w("#forgotpasswordbutton").show("roll", { duration: 400,direction: "right" });
                            $w("#passwordinput").disable();
                            $w("#emailinput").style.borderColor = "#00ff0050";
                            setTimeout(() => {
                                    $w("#passwordinput").enable();
                            }, 400);
                    } else {
                        console.log("User not found");
                        $w("#signupbutton").show("roll", { duration: 400,direction: "right" });
                        $w("#forgotpasswordbutton").hide();
                        $w("#emailinput").disable();
                        setTimeout(() => {
                            $w("#emailinput").enable();
                    }, 400);
                    $w("#profilepicupload").show("roll", { duration: 400,direction: "top" });
                            $w("#signupbutton").show("roll", { duration: 400,direction: "right" });
                    }
            });
    }
});

  $w("#signupbutton").onClick(async () => {
    if (uploadedFile === "none") {
        uploadedFile = "https://static.wixstatic.com/media/cef1ec_797a3ffc7a4a4f57bf707a520e206e7a~mv2.png"
        }
    let email = $w("#emailinput").value;
    let password = $w("#passwordinput").value;
    await authentication.register(email, password, {
      contactInfo: {
      emails: [email],
      firstName: email.split("@")[0],
      picture: uploadedFile,
        }
    })
      .then(() => {
        $w("#signupbutton").hide();
        $w("#forgotpasswordbutton").hide();
        $w("#loginbutton").style.backgroundColor = "#00ff0020";
        $w("#emailinput").style.backgroundColor = "#00ff0020";
        $w("#passwordinput").style.backgroundColor = "#00ff0020";
        $w("#loginbutton").style.borderColor = "#00ff0050";
        $w("#emailinput").style.borderColor = "#00ff0050";
        $w("#passwordinput").style.borderColor = "#00ff0050";
        let UserID = wixUsers.currentUser.id;
        wixData
        .query("Userkarma")
        .descending("rank")
        .limit(1)
        .find()
        .then((results) => {
          const item = results.items[0];
          let newRank = item ? item.rank + 1 : 1;
          let newItem = {
            userId: UserID,
            karma: 0,
            likes: 0,
            title: "newbie",
            profile: UserID,
            badge:
              "https://static.wixstatic.com/shapes/cef1ec_a7ed00ab80414153934d1f76e99cd28c.svg",
            url: "https://www.anns.ai/profile/" + UserID + "/profile",
            rank: newRank,
          };
          wixData.insert("Userkarma", newItem).then((item) => {
            console.log("User registered");
          });
        });
        setTimeout(() => {
        wixWindow.lightbox.close();
        wixLocation.to("https://www.anns.ai");
    }, 1000);
    })
      .catch((error) => {
        console.log(error);
        if (error.message.includes("already exists")) {
            $w("#emailinput").disable();
            setTimeout(() => {
                    $w("#emailinput").enable();
            }, 100);
        }
    });

  });
});


