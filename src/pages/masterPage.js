// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
import wixData from 'wix-data';
$w.onReady (function () {
  wixData.query("Members/PrivateMembersData")
    .find()
    .then(results => {
      // Loop through each user
      for (let user of results.items) {
        // Check if the user already has a row in the Paste collection
        wixData.query("Paste")
          .eq("owner", user._id)
          .count()
          .then(count => {
            // If the user does not have a row, create a new item for the Paste collection
            if (count === 0) {
              let newItem = {
                "title": user.firstName + " " + user.lastName, // Set the title to the user's name
                "owner": user._id, // Set the owner to the user's ID
                "contentpaste": "Paste prompts here for LLMs to read", // Set the contentpaste to "paste here"
                "slug": user.slug // Set the slug to the user's slug
              };
              // Insert the new item into the Paste collection
              wixData.insert("Paste", newItem)
                .then(() => {
                  console.log("Insert successful");
                })
                .catch(err => {
                  console.error(err);
                });
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    })
    .catch(err => {
      console.error(err);
    });
});



