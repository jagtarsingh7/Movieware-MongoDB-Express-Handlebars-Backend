function jwt () {
  var JWT="";
    if(document.getElementById("jwt"))
    {   
        console.log("5555"+document.getElementById("jwt").innerHTML)
        JWT=document.getElementById("jwt").innerHTML;
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
  window.location.replace(`http://localhost:8000/movies/all/?page=${page}`);
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
  window.location.replace(`http://localhost:8000/movies/all/?page=${page}`);
}



function update() {
  let result = document.getElementById("result");

  let id = document.getElementById("value").value;
  const titleval = document.getElementById("titleValue").value;
  const formData = new FormData();
  formData.append("title", titleval);
  console.log(formData);
  console.log(titleval);

  fetch(`http://localhost:8000/movies/update/${id}`, {
    method: "put",
    headers: new Headers({
      Authorization:
        "Bearer " +localStorage.getItem("JWT"),
        "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: `title=${titleval}`,
  })
}




function del() {
  console.log("del");

  let result = document.getElementById("result");

  let id = document.getElementById("value").value;
  console.log(id);
  fetch(`http://localhost:8000/movies/delete/${id}`, {
    headers: new Headers({
      Authorization:
        "Bearer " +localStorage.getItem("JWT"),
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    method: "DELETE",
  })
    
}
