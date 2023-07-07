
let ul = document.querySelector(".lista");
let form = document.querySelector(".form");
let br = document.createElement("br")
let urlApi = 'http://localhost:3000/';

async function getLogGetAll(){
   const data = await getUrlItemData(urlApi);
   return data;
}

async function write(){
  const arrayObj = await getLogGetAll();
  arrayObj.forEach(element => {
    let li = document.createElement("li");
    li.innerText = `name: ${element.name}, url:${element.url}`;
    
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

async function insertNewUrlItem(url, obj) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(obj)
  });
  const data = await response.json();
  return data;
}


if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (form != null || form != undefined) {
      let myformOBJ = new FormData(form);
      let data = myformOBJ.get("input");
      if(insertNewUrlItem(urlApi,returnJsonFileByForm(data))){
        getLogGetAll()
      }
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
  return JSON.stringify({
    id: +id,
    name: name,
    url: url
  })
  
}
