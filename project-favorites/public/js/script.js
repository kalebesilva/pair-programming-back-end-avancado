var ul = document.querySelector(".lista");
var form = document.querySelector(".form");
var li = document.createElement("li");
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (form != null || form != undefined) {
            var myformOBJ = new FormData(form);
            var data = myformOBJ.get("input");
            var _a = data.split(","), name_1 = _a[0], url = _a[1];
            var obj = returnObj(name_1, url);
            fetch('http://localhost:5000', {
                method: 'POST',
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) { return console.log(data); })
                .catch(function (error) { return console.error(error) });
        }
    });
    fetch('http://localhost:5001', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (data) {
        console.log(data.json());
    });
}
function returnObj(name, url) {
    return {
        name: name,
        url: url,
    };
}
