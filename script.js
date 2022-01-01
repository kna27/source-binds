let fileInput = document.getElementById("cfg-upload");
let gameInput = document.getElementById("game");

let binds = [];
let bindsdict = {};
let nonbinds = [];
let game = gameInput.value;


// csgo
movement = ["+moveleft", "+moveright", "+jumpthrow", "+back", "+forward", "+jump", "+duck", "noclip"]

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
            if (movement.includes(b[key])) {
                document.getElementById(key).childNodes[1].setAttribute("fill", "#f00")
            }
            else if (b[key].startsWith("buy ")) {
                document.getElementById(key).childNodes[1].setAttribute("fill", "#0f0")
            }
            else {
                document.getElementById(key).childNodes[1].setAttribute("fill", "#ff0")
            }

            console.log(key, b[key]);
        }
    }
}
