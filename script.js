let fileInput = document.getElementById("cfg-upload");
let gameInput = document.getElementById("game");

let binds = [];
let bindsdict = {};
let nonbinds = [];
let game = gameInput.value;


// csgo
movement = ["+moveleft", "+moveright", "+jumpthrow", "+back", "+forward", "+jump", "+duck", "noclip"]
buy = ["buyammo1", "buyammo2", "autobuy", "rebuy", "buy "]
commmunication = ["+voicerecord", "messagemode2", "messagemode", "radio", "+radialradio", "playerradio ", "say ", "say_team "]
weapons = ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6", "slot7", "slot8", "slot9", "buymenu", "+lookatweapon", "drop", "show_loadout_toggle", "lastinv", "+reload", "use weapon_"]

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
        let kb = b[key];
        let fillColor = "#ff0";
        switch (game) {
            case "csgo":
                if (document.getElementById(key)) {
                    if (movement.has(kb)) {
                        fillColor = "#f00"
                    }
                    else if (buy.has(kb)) {
                        fillColor = "#0f0"
                    }
                    else if (commmunication.has(kb)) {
                        fillColor = "#00f"
                    } else if (weapons.has(kb)) {
                        fillColor = "#0ff"
                    }
                }
                break;
            default:
                fillColor = "#ff0"
        }
        if (document.getElementById(key)) {
            document.getElementById(key).childNodes[1].setAttribute("fill", fillColor);
        }
    }
}

Array.prototype.has = function (s) {
    let hasSubStr = false;
    this.forEach(e => {
        if (s.startsWith(e)) {
            hasSubStr = true;
        }
    });
    return hasSubStr || this.some(e => e.includes(s));
};