var ul = document.querySelector(".lista");
var form = document.querySelector(".form");
var li = document.createElement("li");
var input = document.querySelector("input").value;
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault;
        if (form != null || form != undefined) {
            var myformOBJ = new FormData(form);
            var data = myformOBJ.get("input");
            var _a = data.split(","), name_1 = _a[0], url = _a[1];
            var obj = returnObj(name_1, url);
        }
    });
}
function returnObj(name, url) {
    return {
        name: name,
        url: url
    };
}
