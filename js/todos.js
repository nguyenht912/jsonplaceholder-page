"use strict";
import { fetchUrl } from "./dist/fetchUrl.js";

const body = document.querySelector("body");
const container = body.querySelector(".container");
const todosDiv = container.querySelector(".todos");

let searchParams = new URLSearchParams(window.location.search);
const userId = searchParams.get("userId");
const todosUrl = `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;

if (userId === "none") {
  alert("pick a user!");
  window.close();
}

async function main() {
  const todos = fetchUrl(todosUrl);
  todos.then((usersResolve) => {
    const resolve = [...usersResolve];
    let i = 1;
    resolve.forEach((todo) => {
      console.log(todo);
      var todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      // <a href="https://jsonplaceholder.typicode.com/todos/${todo["id"]}" target="_blank">${todo["title"]}</a>
      let status, statusColor, check;
      if (todo.completed == true) {
        status = "completed";
        statusColor = "rgba(50,200,50,1)";
        check = "checked";
      }
      if (todo.completed == false) {
        status = "on-going";
        statusColor = "red";
        check = "";
      }
      todoDiv.innerHTML = `
        <div class='task'>
          <p>${i++}. ${todo["title"]}</p>
        </div>
        <div class='status'>
          <p class='statusState' style="color: ${statusColor}">${status}</p>
          <input type='checkbox' ${check}>

        </div>
      `;
      todosDiv.append(todoDiv);
      //
      let checkboxes = todosDiv.querySelectorAll("input[type=checkbox]");
      // console.log(checkboxes);
      checkboxes.forEach((checkbox) => {
        // console.log(checkbox.checked)
        let statusState = checkbox.parentElement.querySelector("p");
        // console.log(statusState);
        checkbox.addEventListener("change", (event) => {
          if (checkbox.checked) {
            statusState.textContent = "completed";
            statusState.style.color = "rgba(50,200,50,1)";
          } else {
            statusState.textContent = "on-going";
            statusState.style.color = "red";
          }
        });
      });
    });
    return resolve;
  });
}

main();
