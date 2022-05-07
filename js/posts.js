"use strict";
import { fetchUrl } from "./dist/fetchUrl.js";

const body = document.querySelector("body");
const container = body.querySelector(".container");
const postsDiv = container.querySelector(".posts");

let searchParams = new URLSearchParams(window.location.search);
const userId = searchParams.get("userId");
const postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

if (userId === "none") {
  alert("pick a user!");
  window.close();
}

async function main() {
  const posts = fetchUrl(postsUrl);
  posts.then((usersResolve) => {
    const resolve = [...usersResolve];
    let i = 1;
    resolve.forEach((post) => {
      console.log(post);
      var postDiv = document.createElement("div");
      postDiv.classList.add("post");
      // <a href="https://jsonplaceholder.typicode.com/posts/${post["id"]}" target="_blank">${post["title"]}</a>
      postDiv.innerHTML = `
      <div class='post-container'>
        <div class='post-body'>
          <h3>${i++}. ${post["title"]}</h3>
          <p>${post["body"]}</p>
          <div></div>
        </div>
        <div class="post-interact">
          <button><p>Like</p></button>
          <button class='read-more'> <p>Comments</p> </button>
          <button><p>Share</p></button>
        </div>
      </div>
      <div class='comments' style="display:none"></div>
      `;
      postsDiv.append(postDiv);
      let commentsDiv = postDiv.querySelector(".comments");
      let postId = post["id"];
      let commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
      //
      let anchor = postDiv.querySelector("button.read-more");
      anchor.addEventListener("click", (event) => {
        commentsDiv.innerHTML = "loading...";
        let buttonP = anchor.querySelector("p");
        if (buttonP.textContent === "Comments") {
          buttonP.textContent = "Close";
          commentsDiv.style.display = "block";
          const comments = fetchUrl(commentsUrl);
          comments.then((r) => {
            commentsDiv.innerHTML = "";
            r.forEach((comment) => {
              let commentDiv = document.createElement("div");
              commentDiv.classList.add("comment-container");
              commentDiv.innerHTML = `
              <div class='comment-author'>
                <p>user: ${comment["name"]}</p>
                <p>${comment["email"]}</p>
              </div>
              <div class='comment-body'>
                <p>${comment["body"]}</p>
              </div>
              
              `;
              commentsDiv.append(commentDiv);
            });
          });
        } else if (buttonP.textContent === "Close") {
          buttonP.textContent = "Comments";
          commentsDiv.innerHTML = "";
          commentsDiv.style.display = "none";
        }
      });
    });
    return resolve;
  });
}

main();
