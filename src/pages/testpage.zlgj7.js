// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world

$w.onReady(function () {
    $w('#box2').postMessage({bountytitle: "_", difficulty: "none", bountydescription: "_"});
    setTimeout(function () {
        $w('#box2').show("fade");
    }, 1000);
});
