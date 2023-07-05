let ul: Element | null = document.querySelector(".lista");
let form: HTMLFormElement | null = document.querySelector(".form");
let li: HTMLElement = document.createElement("li");




if (form) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault;
    
    if (form != null || form != undefined) {

      let myformOBJ: FormData = new FormData(form);
      let data: string | null =  myformOBJ.get("input") as string;
      let [name, url]: string[] = data.split(",");
      let obj: Object | null = returnObj(name, url);
      li.textContent = `${obj}`;
      ul?.appendChild(li);

      console.log(ul)

      
      
    }
  });
}


function returnObj(name: string, url: string): Object | null{
  return {
    name: name,
    url: url
  }
}
