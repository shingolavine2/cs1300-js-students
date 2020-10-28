var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=PUT_TOKEN_HERE";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      parseResponse(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const parseResponse = (requestResponse) => { 
  const jsonified = JSON.parse(requestResponse);
  const plants = jsonified.data;
  console.log(plants);
  /*
  const newplants = plants.filter((arrayItem) => {
    return arrayItem.year > 1753;
  });
  */
  plants.map((arrayItem) => {
    const wrapper = document.createElement("div");
    const image = document.createElement("img");
    const header = document.createElement("h4");
    header.innerText = arrayItem.common_name;
    image.setAttribute("src", arrayItem.image_url);
    wrapper.appendChild(header);
    wrapper.appendChild(image);
    document.getElementById("plants").appendChild(wrapper);
  })
}