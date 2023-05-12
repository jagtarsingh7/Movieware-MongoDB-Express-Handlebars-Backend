
document.addEventListener("DOMContentLoaded", function () {


  let v = "https://shy-red-camel-coat.cyclic.app/"

  let shouldHideButtons = `${v}movies/all`;
  if (!window.location.href.toLowerCase().includes(shouldHideButtons)) {
    document.getElementById("prevButton").style.display = "none";
    document.getElementById("nextButton").style.display = "none";
  }
  let saveJwt = `${v}login`;

  if (window.location.href.toLowerCase().includes(saveJwt)) {
    document.getElementById("loginform").addEventListener("submit", function (event) {
      event.preventDefault();

      const data = {
        email: document.getElementById("email").value,
        pass: document.getElementById("password").value

      };

      const urlEncodedData = new URLSearchParams(data).toString();
      // Do something here when the submit button is clicked
      fetch(`${v}loginjwt`, {


        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlEncodedData
      })
        .then(res => res.json())
        .then(token => {


          localStorage.setItem("JWT", token);
          alert("success");
          window.location.replace(`${v}movies/all/?page=${0}`);

        })
        .catch(error => {
          console.error(error);
          alert("error");
        });
    });

  }



});

function loginBack() {

  window.location.replace("https://shy-red-camel-coat.cyclic.app/login");
}


function next() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var page = url.searchParams.get("page");

  console.log(page);
  page = parseInt(page) + 1;
  window.location.replace(`https://shy-red-camel-coat.cyclic.app/movies/all/?page=${page}`);
}
function prev() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var page = url.searchParams.get("page");

  page = parseInt(page);
  if (page > 0) {
    page = page - 1;
  }
  window.location.replace(`https://shy-red-camel-coat.cyclic.app/movies/all/?page=${page}`);
}



function update() {
  let result = document.getElementById("result");

  let id = document.getElementById("value").value;
  const titleval = document.getElementById("titleValue").value;
  const formData = new FormData();
  formData.append("title", titleval);
 

  fetch(`https://shy-red-camel-coat.cyclic.app/movies/update/${id}`, {
    method: "put",
    headers: new Headers({
      Authorization:
        "Bearer " + localStorage.getItem("JWT"),
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: `title=${titleval}`,
  }).then(res => {

    if (res.status === 401) {
      alert("Login first");
    }
    if (res.status === 200) {
      alert("Successfully changed");
    }



  })
}


function del() {
  console.log("del");

  let result = document.getElementById("result");

  let id = document.getElementById("value").value;
  console.log(id);
  fetch(`https://shy-red-camel-coat.cyclic.app/movies/delete/${id}`, {
    headers: new Headers({
      Authorization:
        "Bearer " + localStorage.getItem("JWT"),
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    method: "DELETE",
  }).then(res => {

    console.log(res)

    if (res.status === 401) {
      alert("Please login first!");
    }
    if (res.status === 200) {
      alert("Successfully deleted!");
    }


  })


}
