import { fetchUrl } from "./fetchUrl.js";
import { fetchTxt } from "./fetchTxt.js";

const test = document.querySelector(".test");
const regBtn = document.querySelector("#requestBtn");
regBtn.addEventListener("click", (event) => {
  const txt = fetchTxt("user-detail.txt");
  txt.then((txtResolve) => {
    const text = txtResolve;
    test.innerHTML = text.toString();
  });
});
