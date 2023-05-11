function jwt() {
  var JWT = "";
  if (document.getElementById("jwt")) {
    console.log("5555" + document.getElementById("jwt").innerHTML)
    JWT = document.getElementById("jwt").innerHTML;
    localStorage.setItem("JWT", JWT);
    alert("saved");

  }

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
  console.log("clcscs");
  var url_string = window.location.href;
  var url = new URL(url_string);
  var page = url.searchParams.get("page");

  console.log(page);
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
  console.log(formData);
  console.log(titleval);

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

    if (res.status === 401) {
      alert("Login first !");
    }


  })
  document.addEventListener("DOMContentLoaded", function () {
    let shouldHideButtons = "https://shy-red-camel-coat.cyclic.app/movies/all";
    if (!window.location.href.toLowerCase().includes(shouldHideButtons)) {
      document.getElementById("prevButton").style.display = "none";
      document.getElementById("nextButton").style.display = "none";
    }
  });
}
