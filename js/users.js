"use strict";
// import { fetchTxt } from "./fetchTxt.js";
import { fetchUrl } from "./dist/fetchUrl.js";

const container = document.querySelector(".container");
const usersDiv = document.querySelector(".users");
const userDetailDiv = document.querySelector(".user-detail");
// const regBtn = document.querySelector("#requestBtn");
const usersUrl = "https://jsonplaceholder.typicode.com/users";

async function main() {
  const users = fetchUrl(usersUrl);
  users.then((usersResolve) => {
    const resolve = [...usersResolve];
    resolve.forEach((user) => {
      console.log(user);
      var div = document.createElement("div");
      div.classList.add("user");
      div.innerHTML = `
      <p>${user["name"]}
      </p>
      
      <a>
        More info
      </a>
      `;
      usersDiv.append(div);
      //
      let userId = user["id"];
      let anchor = div.querySelector("a");

      anchor.addEventListener("click", (event) => {
        userDetailDiv.innerHTML = `
        <link rel="stylesheet" href="../css/loading.css">
        <div class="loading-container">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div style="color:white; font-size:2rem;">
            <br>
            <p> Loading...
            </p>
          </div>
        </div>
        
        `;
        setTimeout((event) => {
          const user = fetchUrl(
            `https://jsonplaceholder.typicode.com/users/${userId}`
          );
          user.then((userResolve) => {
            const user = userResolve;
            userDetailDiv.innerHTML = "";
            var userDiv = document.createElement("div");
            userDiv.classList.add("user-info");
            userDiv.innerHTML = `
            <p class='user-name'>${user["name"]}</p>
            <div class='about'>
              <div class='about-personal'>
                <h5>Personal information</h5>
                <div class='info-content'>
                  <p><span>User ID:</span> ${user["id"]}</p>
                  <p><span>Username:</span> ${user["username"]}</p>
                  <p>
                    <span>Email:</span>
                    <a href="mailto:${user["email"]}">${user["email"]}</a>
                  </p>
                  <p>
                    <span>Phone:</span>
                    <a href="tel:${user["phone"]}">${user["phone"]}</a>
                  </p>
                  <p>
                    <span>Website:</span>
                    <a href="${user["website"]}">${user["website"]}</a>
                  </p>
                </div>
              </div>
              
              <div class='about-address'>
                <h5>Personal Address</h5>
                <div class='info-content'>
                  <p><span>Street:</span> ${user["address"]["street"]}</p>
                  <p><span>Suite:</span>${user["address"]["suite"]}</p>
                  <p><span>City:</span>${user["address"]["city"]}</p>
                  <p><span>Zipcode:</span> ${user["address"]["zipcode"]}</p>
                </div>
              </div>
              
              <div class='about-company'>
                <h5>Company information</h5>
                <div class='info-content'>
                  <p><span>Name:</span> ${user["company"]["name"]}</p>
                  <p><span>CatchPhrase:</span> ${user["company"]["catchPhrase"]}</p>
                  <p><span>Bs:</span> ${user["company"]["bs"]}</p>
                </div>
              </div> 
              
            </div>
           
          `;
            var navigationDiv = document.createElement("div");
            navigationDiv.classList.add("navigation");
            navigationDiv.innerHTML = `
            <a href='#' onclick="window.location.reload()">Home</a>
            <a href='./albums.html?userId=${user["id"]}' target="_blank">Albums</a>
            <a href='./posts.html?userId=${user["id"]}' target="_blank">Posts</a>
            <a href='./todos.html?userId=${user["id"]}' target="_blank">Todos</a>
          `;
            var mapDiv = document.createElement("div");
            mapDiv.classList.add("about-map");
            mapDiv.innerHTML = `
            <h5>Google Maps</h5>
            <div class='info-content'>
              <iframe frameborder="0" style="width:100%; aspect-ratio: 16/9" referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?q=${user.address.geo.lat},${user.address.geo.lng}&zoom=1&key=AIzaSyAZqcpPkf7f-54Pd03IIHnvVcU6W0eei8g"
              allowfullscreen loading='lazy'>
              </iframe>
            </div>
          `;
            userDetailDiv.append(navigationDiv);
            userDetailDiv.append(userDiv);
            userDiv.lastElementChild.append(mapDiv);
          });
        }, 300);
      });
    });
    
    return resolve;
  });

  return;
}

function ready(fn) {
  fn;
  if (document.readyState != "loading") {
    fn;
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(main());
ready(startupOverlay());

function startupOverlay() {
  usersDiv.classList.add("overlay-opacity");
  userDetailDiv.classList.add("overlay-opacity");
  const startupDiv = document.createElement("DIV");
  startupDiv.classList.add("startup");
  startupDiv.innerHTML = `
    <div class="users">
      <p>Choose a user from this panel to start viewing their <span style="color:blue;">profile page!</span></p>
    </div>
    <div class="user-detail">
      <p>After choosing a user, you can view their information here - the profile page.</p>
      <p>You can also view their collections of posts, photo albums and to-do lists by clicking the equivalent links on the navbar above!</p>
      <div>
        <button class="finish-startup">I understand!</button>
      </div>
    </div>
  `;
  container.prepend(startupDiv);

  const finishStartup = document.querySelector(".finish-startup");
  finishStartup.addEventListener("click", (event) => {
    usersDiv.classList.remove("overlay-opacity");
    userDetailDiv.classList.remove("overlay-opacity");
    container.removeChild(startupDiv);
  });
}
