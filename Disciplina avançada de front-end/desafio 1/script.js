let ul = document.querySelector(".my-list");
let form = document.querySelector(".form-insert-urls");
const url = "http://localhost:3000/";



if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(form);
    if (
      formData.get("name") !== null ||
      (formData.get("name") !== undefined && formData.get("url") !== null) ||
      formData.get("url") !== undefined
    ) {
      let data = {
        name: formData.get("name"),
        url: formData.get("url"),
      };

      insert(data).catch((err) => console.error(err));
      window.location.reload();
    }
  });
}


async function prepareDataForWriteInLiElement() {
  let apiData = await getAll();
  writeDataInLiElementAndAppendLiInUl(apiData);
}

prepareDataForWriteInLiElement();

function writeDataInLiElementAndAppendLiInUl(apiData) {
  for (let i = 0; i < apiData.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `${apiData[i].name} - ${apiData[i].url}`;
    li.appendChild(generateDeleteButtonForLi(li, apiData[i]));
    li.appendChild(generateEditButtonForLi(apiData[i],li));
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

function generateEditButtonForLi(apiData, li) {
  let buttonEdit = document.createElement("button");
  buttonEdit.appendChild(generateIcon("fa-solid fa-pen-to-square"));
  buttonEdit.addEventListener("click", (event) => {
    // Create edit form
    let formInEditButton = createEditForm(apiData);
    li.innerHTML = "";
    li.appendChild(formInEditButton);
    formInEditButton.appendChild(saveButtonInEditForm(apiData));

    // Add event listener to form
    formInEditButton.addEventListener("submit", (event) => {
      event.preventDefault();
      let nameInput = formInEditButton.querySelector(".input-name-editForm");
      let urlInput = formInEditButton.querySelector(".input-url-editForm");
      let updatedData = {
        name: nameInput.value,
        url: urlInput.value,
      };
      useUpdadeFunction(updatedData, apiData._id);

      // Remove edit form from HTML
      window.location.reload();
    });
  });
  return buttonEdit;
}


function createEditForm(apiData){
      let editForm = document.createElement("form")
      editForm.appendChild(addNameInputInForm(apiData.name));
      editForm.appendChild(addUrlInForm(apiData.url));
      return editForm;
}
function addNameInputInForm(name) {
  let nameInput = document.createElement("input");
  nameInput.classList.add("input-name-editForm");
  nameInput.value = name;
  return nameInput;
}

function addUrlInForm(url) {
  let urlInput = document.createElement("input");
  urlInput.classList.add("input-url-editForm")
  urlInput.value = url;
  return urlInput;
}

function saveButtonInEditForm(apiData) {
  let saveButton = document.createElement("button");
  saveButton.appendChild(generateIcon("fa-solid fa-floppy-disk"));
  saveButton.type = "submit";
  return saveButton;
}



async function useUpdadeFunction(apiData,id) {
  await updateById(apiData,id);
}

function generateIcon(iconName) {
  let icon = document.createElement("i");
  iconName = iconName.split(" ");
  icon.classList.add(iconName[0]);
  icon.classList.add(iconName[1]);
  return icon;
}

async function getAll() {
  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return data;
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

async function updateById(data,id) {
  
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
