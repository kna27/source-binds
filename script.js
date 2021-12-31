let fileInput = document.getElementById("cfg-upload");
let gameInput = document.getElementById("game");

let binds = [];
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
        }
    })
}