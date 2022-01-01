let fileInput = document.getElementById("cfg-upload");
let gameInput = document.getElementById("game");

let binds = [];
let bindsdict = {};
let nonbinds = [];
let game = gameInput.value;

fileInput.onchange = () => {
    const reader = new FileReader()
    reader.onload = (e) => parseCfg(e.target.result)
    reader.readAsText(fileInput.files[0])
}

gameInput.onchange = () => {
    game = gameInput.value;
}

function parseCfg(c) {
    let lines = c.split("\n");
    lines.forEach(line => {
        if (!line.startsWith("bind")) {
            nonbinds.push(line)
        } else {
            binds.push(line)
            bindsdict[line.match(/"(.*?)"/g)[0].replaceAll('"', '').toLowerCase()] = line.match(/"(.*?)"/g)[1].replaceAll('"', '')
        }
    })
    colorKeyboard(bindsdict);
}

function colorKeyboard(b) {
    for (var key in b) {
        if (document.getElementById(key)) {
            document.getElementById(key).childNodes[1].setAttribute("fill", "#ff0")
            console.log(key, b[key]);
        }
    }
}
