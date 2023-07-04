let ul: Element | null = document.querySelector(".lista");
let form: HTMLFormElement | null = document.querySelector(".form");
let li: HTMLElement = document.createElement("li");
let input: HTMLElement | null = document.querySelector("input").value;



if (form) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault;
    
    if (form != null || form != undefined) {

      let myformOBJ: FormData = new FormData(form);
      let data: string | null =  myformOBJ.get("input") as string;
      let [name, url]: string[] = data.split(",");
      let obj: Object = returnObj(name, url);
      
      
    }
  });
}


function returnObj(name: string, url: string): Object | null{
  return {
    name: name,
    url: url
  }
}
