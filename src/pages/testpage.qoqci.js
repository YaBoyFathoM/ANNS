

import * as tf from "@tensorflow/tfjs";
$w.onReady(function () {
  async function urlToTensor(imageUrl) {
    // Fetch the image data from the URL
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    // Convert the buffer to a Uint8Array
    const imageData = new Uint8Array(buffer);
    // Decode the Uint8Array to raw image pixels
    const imagePixels = new Uint8Array(500 * 500 * 3);
    for (let i = 0; i < 500 * 500; i++) {
      for (let channel = 0; channel < 3; ++channel) {
        imagePixels[i * 3 + channel] = imageData[i * 4 + channel];
      }
    }
    // Create a tensor from the pixels array
    const tensor = tf.tensor4d(imagePixels, [1,500, 500, 3]);
    return tensor;
  }
  async function classify() {
    try {
      const model = await tf.loadLayersModel(tf.io.browserHTTPRequest('https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/classifier_tfjs/model.json'));
      const url = 'https://static.wixstatic.com/media/cef1ec_9bac447d536041678c57a1cf6310142e~mv2.jpg';
      const tensor = await urlToTensor(url);
      const predictions = await model.predict(tensor);
      console.log(tf.argMax(predictions,1).dataSync().toString());
    } catch (error) {
      console.error('Failed to classify image:', error);
      console.log(error);
      return null;
    }
  }
classify().catch((error) => {
  console.error('Failed to classify image:', error);
  console.log(error);
  return null;
});
});