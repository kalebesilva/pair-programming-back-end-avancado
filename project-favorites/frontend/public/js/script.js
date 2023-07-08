




let ul = document.querySelector(".lista");
let form = document.querySelector(".form");
let br = document.createElement("br")
let urlApi = 'http://localhost:3000/';

async function getLogGetAll(){
   const data = await getUrlItemData(urlApi);
   return data;
}

async function testeAqui(){
  const data = await insertNewUrlItem(urlApi, {
    id: 1,
    name: 'Nome',
    url: 'teste.com'
  });
  return data;
}

async function write(){
  const arrayObj = await getLogGetAll();
  arrayObj.forEach(element => {
    let li = document.createElement("li");
    let buttonRemove = document.createElement("button");
    li.innerText = `name: ${element.name}, url:${element.url}`;
    buttonRemove.innerText = "X";
    li.appendChild(buttonRemove);
    ul.appendChild(li);
    
  });
  document.body.append(ul);
}

write();

async function getUrlItemData(url) {
  const response = await fetch(url, { method: 'GET'});
  const data = await response.json();
  return data;
}

// Deus abencoe a mdn docs
async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}




if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (form != null || form != undefined) {
      let myformOBJ = new FormData(form);
      let data = myformOBJ.get("input");
      postData(urlApi, returnJsonFileByForm(data))
    }
  });
}

function returnJsonFileByForm(data) {
  if(data === null || data === undefined){
    console.log("data Vazia")
    return {id: 1,name:"Erro",url:"htttp://Erro.com"}
  }
  const [id, name, url] = data.split(',');
  console.log(JSON.stringify({
    id: +id,
    name: name,
    url: url
  }))
  return {
    id: +id,
    name: name,
    url: url
  }
  
}



// let form = document.getElementById(".form");
// let table = document.querySelector(".table");

// let urlApi = 'http://localhost:3000/';

// async function getLogGetAll(){
//    const data = await getUrlItemData(urlApi);
//    return data;
// }

// async function write(){

//   const arrayObj = await getLogGetAll();
//   let tbody = document.querySelector("tbody");
// arrayObj.forEach(element => {
//   if (element !== null && element !== undefined) {
//     let tr = document.createElement("tr");

//     let tdId = document.createElement("th");
//     let tdNome = document.createElement("td");
//     let tdUrl = document.createElement("td");
  
//     tdId.scope = "row";
//     tdId.innerHTML = `${element.id}`;
//     tdNome.innerHTML = `${element.name}`;
//     tdUrl.innerHTML = `${element.url}`;

    

//     tr.appendChild(tdId);
//     tr.appendChild(tdNome);
//     tr.appendChild(tdUrl);
//     console.log(tr)
//     tbody.appendChild(tr) 
//   }
// });
// document.body.appendChild(tbody);

// }

// write();

// async function getUrlItemData(url) {
//   const response = await fetch(url, { method: 'GET'});
//   const data = await response.json();
//   return data;
// }

// async function insertNewUrlItem(url, obj) {
//   const response = await fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(obj)
//   });
//   const data = await response.json();
//   return data;
// }

// console.log(form)

// if (form) {
//   console.log("if")
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     if (form != null || form != undefined) {
//       let myformOBJ = new FormData(form);
//       let data = myformOBJ.get("input");
//       if(insertNewUrlItem(urlApi,returnJsonFileByForm(data))){
//        window.alert(getLogGetAll())
//       }
//     }
//   });
// }

// function returnJsonFileByForm(data) {
//   if(data === null || data === undefined){
//     console.log("data Vazia")
//     return {id: 1,name:"Erro",url:"htttp://Erro.com"}
//   }
//   const [id, name, url] = data.split(',');
//   console.log(JSON.stringify({
//     id: +id,
//     name: name,
//     url: url
//   }))
//   return JSON.stringify({
//     id: +id,
//     name: name,
//     url: url
//   })
  
// }
