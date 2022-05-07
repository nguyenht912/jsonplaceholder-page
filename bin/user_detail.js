import { fetchUrl } from "../js/fetchUrl.js";

const container = document.querySelector(".container");

let searchParams = new URLSearchParams(window.location.search);
const userId = searchParams.get("userId");
const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;

window.addEventListener("load", (event) => {
  //console.clear();
  const user = fetchUrl(userUrl);
  console.log(user);
  //console.log(resolve);
  user.then((userResolve) => {
    const user = userResolve;
    var userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `
      <h5>${user["name"]}
      </h5>
      <p>user id: ${user["id"]}</p>
      <p>username: ${user["username"]}
      </p>
      <p>email: ${user["email"]}
      </p>
      <p>address</p>
        <ul>
          <li>Street: ${user["address"]["street"]}</li>
          <li>Suite: ${user["address"]["suite"]}</li>
          <li>City: ${user["address"]["city"]}</li>
          <li>Zipcode: ${user["address"]["zipcode"]}</li>
          <li>
          Geo:
            <ul>
              <li>Latitude: ${user["address"]["geo"]["lat"]}</li>
              <li>Longitude: ${user["address"]["geo"]["lng"]}</li>
            </ul>
          </li>
        </ul>
      <p>Phone: ${user["phone"]}</p>
      <p>Website: ${user["website"]}</p>
      <p>Company:</p>
        <ul>
          <li>Name: ${user["company"]["name"]}</li>
          <li>catchPhrase: ${user["company"]["catchPhrase"]}</li>
          <li>bs: ${user["company"]["bs"]}</li>
        </ul>
      `;
    var navigationDiv = document.createElement("div");
    navigationDiv.classList.add("navigation");
    navigationDiv.innerHTML = `
    <a href='#'>Google Map</a>
    <a href='./albums.html?userId=${user["id"]}'>Albums</a>
    <a href='#'>Posts</a>
    <a href='#'>Todos</a>
    `;
    container.append(userDiv);
    container.append(navigationDiv);
  });
});
