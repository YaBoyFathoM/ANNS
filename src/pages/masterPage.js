// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from 'wix-data';
$w.onReady (function () {
  // wixData.query("Members/PrivateMembersData")
  //   .find()
  //   .then(results => {
  //     for (let user of results.items) {
  //       wixData.query("Paste")
  //         .eq("owner", user._id)
  //         .count()
  //         .then(count => {
  //           if (count === 0) {
  //             let newItem = {
  //               "title": user.firstName + " " + user.lastName, // Set the title to the user's name
  //               "owner": user._id, // Set the owner to the user's ID
  //               "contentpaste": "Paste prompts here for LLMs to read", // Set the contentpaste to "paste here"
  //               "slug": user.slug // Set the slug to the user's slug
  //             };
  //             wixData.insert("Paste", newItem)
  //               .then(() => {
  //                 console.log("Insert successful");
  //               })
  //               .catch(err => {
  //                 console.error(err);
  //               });
  //           }
  //         })
  //         .catch(err => {
  //           console.error(err);
  //         });
  //     }
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
});



