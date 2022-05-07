"use strict";
import { fetchUrl } from "./dist/fetchUrl.js";

const body = document.querySelector("body");
const container = body.querySelector(".container");
const albumsDiv = container.querySelector(".albums");
const photosDiv = container.querySelector(".photos");

let searchParams = new URLSearchParams(window.location.search);
const userId = searchParams.get("userId");
const albumsUrl = `https://jsonplaceholder.typicode.com/albums?userId=${userId}`;

if (userId === "none") {
  alert("pick a user!");
  window.close();
}

async function main() {
  const albums = fetchUrl(albumsUrl);
  albums.then((usersResolve) => {
    const resolve = [...usersResolve];
    resolve.forEach((album) => {
      console.log(album);
      var div = document.createElement("div");
      div.classList.add("album");
      // <a href="https://jsonplaceholder.typicode.com/albums/${album["id"]}" target="_blank">${album["title"]}</a>
      div.innerHTML = `
      <div>
        <h5>Album title:</h5>
        <p href="#">${album["title"]}</p>
      </div>
      
      `;
      albumsDiv.append(div);

      let albumId = album["id"];
      let anchor = div.querySelector("div");

      anchor.addEventListener("click", (event) => {
        console.log(container.children);
        // let photosDiv;
        // if (container.children.length < 2) {
        //   photosDiv = document.createElement("div");
        //   photosDiv.classList.add("photos");
        //   container.append(photosDiv);
        // } else {
        //   photosDiv = container.querySelector(".photos");
        // }
        photosDiv.innerHTML = `
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
        const photos = fetchUrl(
          `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
        );
        photos.then((r) => {
          photosDiv.innerHTML = "";
          const photos = [...r];
          let i = 1;
          photos.forEach((photo) => {
            var photoDiv = document.createElement("div");
            photoDiv.classList.add("photo");
            console.log(photo);
            photoDiv.innerHTML = `
            <p>${i++}. ${photo["title"]}</p>
            <img src="${photo["thumbnailUrl"]}" loading="lazy">
          `;
            photosDiv.append(photoDiv);
            //
            let img = photoDiv.querySelector("img");
            img.addEventListener("click", (event) => {
              let fullImgDiv = document.createElement("div");
              fullImgDiv.classList.add("full-img");
              fullImgDiv.innerHTML = `
              <h2 style="color: white;">${photo["title"]}</h2>
              <img src="${photo["url"]}" loading="lazy">
              <button class='closeBtn'>Close</button>
              `;
              body.append(fullImgDiv);
              //
              let closeBtn = fullImgDiv.querySelector("button.closeBtn");
              closeBtn.addEventListener("click", (event) => {
                body.removeChild(fullImgDiv);
              });
            });
          });
        });
      });
    });
    return resolve;
  });
}

main();
