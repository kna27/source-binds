let fileInput = document.getElementById("cfg-upload");
let gameInput = document.getElementById("game");

let cfg = "";
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
    // TODO: clean up cfg
    cfg = c
}