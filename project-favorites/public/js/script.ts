let ul: Element | null = document.querySelector(".lista");
let form: HTMLFormElement | null = document.querySelector(".form");
let li: Element = document.createElement("li");

interface myObjForAddInList {
  name: string;
  url: string;
}

if (form) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    if (form != null || form != undefined) {
      let myformOBJ: FormData = new FormData(form);
      let data: string | null = myformOBJ.get("input") as string;
      let [name, url]: string[] = data.split(",");
      let obj: myObjForAddInList | null = returnObj(name, url);
      fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))

    }
  });
}

function returnObj(name: string, url: string): myObjForAddInList {
  return {
    name: name,
    url: url,
  };
}
