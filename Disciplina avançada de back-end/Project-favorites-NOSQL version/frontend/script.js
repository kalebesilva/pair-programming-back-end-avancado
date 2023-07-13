let form = document.querySelector(".form-class");
let table = document.querySelector(".table-name-url");

const url = "http://localhost:3000";


    getAll().then(data =>console.log(data))



async function writeElementInWindow(){
    let tbody = document.createElement("tbody")
    let arrayData = await getAll();
    for(let i = 0; i < arrayData.length ; i++){

        let tr = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdUrl = document.createElement("td");
        tdName.innerText = `${arrayData[i].name}`;
        tdUrl.innerText = `${arrayData[i].url}`;
        tr.appendChild(tdName);
        tr.appendChild(tdUrl);
        tbody.appendChild(tr);
        
    }
    table.appendChild(tbody);
    document.body.appendChild(table);

   
    
}

writeElementInWindow().catch(error =>console.log(error))

if(form){
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        if(form !== null ||form !== undefined){
            
        }
        
        
        
    })
}


function getFormInputData(form){
    let myformOBJ = new FormData(form);
    return myformOBJ.get("input");
}

async function insertOnDatabase(data){

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

async function getAll() {
    const response = await fetch(url, { method: 'GET'});
    const data = await response.json();
    return data;
  }
