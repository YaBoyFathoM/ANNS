$w.onReady(function () {
    setTimeout(() => {
    $w("#name").postMessage("Cameron Smith");
    $w("#job").postMessage("AI researcher");
    }, 1000);
    $w("#certbutton").onClick(() => {
        $w("#work").hide("roll", { direction: "top", duration: 400 });
        setTimeout(() => {
            $w("#certs").expand();
            $w("#certs").show("roll", { direction: "top", duration: 400 });
            $w("#work").collapse();
        }, 500);
    });
    $w("#workbutton").onClick(() => {
        $w("#certs").hide("roll", { direction: "top", duration: 400 });
        setTimeout(() => {
            $w("#work").expand();
            $w("#work").show("roll", { direction: "top", duration: 400 });
            $w("#certs").collapse();
            setTimeout(() => {
                $w("#work").postMessage("blah blah blah");
            }, 500);
        }, 500);
    });
    $w("#TFdevcert").onMouseIn(() => {
        $w("#certreader").show("roll", { "direction": "left", "duration":400 });
        $w("#certreader").postMessage("Tensorflow Developer");
        $w("#certreader1").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader2").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader3").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader4").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader5").hide("roll", { "direction": "right", "duration":400 });
    });
    $w("#GenAIcert").onMouseIn(() => {
        $w("#certreader1").show('roll', { "direction": "left", "duration":400 });
        $w("#certreader1").postMessage("Generative AI Specialization");
        $w("#certreader").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader2").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader3").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader4").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader5").hide("roll", { "direction": "right", "duration":400 });
    });
    $w("#TensorflowAIcert").onMouseIn(() => {
        $w("#certreader2").show('roll', { "direction": "left", "duration":400 });
        $w("#certreader2").postMessage("Tensorflow ML Specialization");
        $w("#certreader").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader1").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader3").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader4").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader5").hide("roll", { "direction": "right", "duration":400 });
    });
    $w("#deeplearningcert").onMouseIn(() => {
        $w("#certreader3").show('roll', { "direction": "left", "duration":400 });
        $w("#certreader3").postMessage("Deep Learning Specialization");
        $w("#certreader").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader1").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader2").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader4").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader5").hide("roll", { "direction": "right", "duration":400 });
    });
    $w("#pythoncert").onMouseIn(() => {
        $w("#certreader4").show('roll', { "direction": "left", "duration":400 });
        $w("#certreader4").postMessage("Python for Data Science");
        $w("#certreader").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader1").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader2").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader3").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader5").hide("roll", { "direction": "right", "duration":400 });
    });
    $w("#MLcert").onMouseIn(() => {
        $w("#certreader5").show('roll', { "direction": "left", "duration":400 });
        $w("#certreader5").postMessage("Machine Learning in Python");
        $w("#certreader").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader1").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader2").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader3").hide("roll", { "direction": "right", "duration":400 });
        $w("#certreader4").hide("roll", { "direction": "right", "duration":400 });
    });
    });