let ul = document.querySelector(".my-list");
let form = document.querySelector(".form-insert-urls");
const url = "http://localhost:3000/";

console.log(ul);

async function getAll() {
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
}

prepareDataForWriteInLiElement();

async function prepareDataForWriteInLiElement() {
  let apiData = await getAll();
  writeDataInLiElementAndAppendLiInUl(apiData);
}

function writeDataInLiElementAndAppendLiInUl(apiData) {
  for (let i = 0; i < apiData.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `${apiData[i].name} - ${apiData[i].url}`;
    li.appendChild(generateDeleteButtonForLi(li, apiData[i]));
    li.appendChild(generateEditButtonFor(apiData[i]));
    ul.appendChild(li);
  }
}

function generateDeleteButtonForLi(li, apiData) {
  let buttonDelete = document.createElement("button");
  buttonDelete.appendChild(generateIcon("fa-solid fa-trash"));
  buttonDelete.classList.add("remove-button");
  return generateEventForButtonDelete(buttonDelete, apiData);
}

function generateEventForButtonDelete(buttonDelete, apiData) {
  buttonDelete.addEventListener("click", async () => {
    await deleteById(apiData._id);
    li.remove();
    window.location.reload();
  });
  return buttonDelete;
}

function generateEditButtonFor(apiData) {
  let editButton = document.createElement("button");
  editButton.appendChild(generateIcon("fa-solid fa-pen-to-square"));
  return editButton;//createEventListenerForForm(editButton,apiData);
}

function createEventListenerForForm(editButton, apiData){
  editButton.addEventListener("click", () => {
    editButton.appendChild(generateFormForEditButton(apiData));
    
  })
}

function generateFormForEditButton(apiData) {
  let editForm = document.createElement("form");
  editForm.appendChild(addNameInputInForm(apiData.name));
  editForm.appendChild(addUrlInForm(apiData.url));
  editForm.appendChild(addSaveButtonInEditForm());
  return editForm
}

function addNameInputInForm(name) {
  let nameInput = document.createElement("input");
  nameInput.value = name;
  return nameInput;
}

function addUrlInForm(url) {
  let urlInput = document.createElement("input");
  urlInput.value = url;
  return urlInput;
}

function addSaveButtonInEditForm() {
  let saveButton = document.createElement("button");
  saveButton.appendChild(generateIcon("fa-solid fa-floppy-disk"));
  return saveButton;
}

function generateIcon(iconName) {
  let icon = document.createElement("i");
  iconName = iconName.split(" ");
  icon.classList.add(iconName[0]);
  icon.classList.add(iconName[1]);
  return icon;
}

async function insert(data) {
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

async function updateById(data, id) {
  // Default options are marked with *
  const response = await fetch(url + id, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
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

async function deleteById(id) {
  // Default options are marked with *
  const response = await fetch(url + id, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
