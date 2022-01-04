var fileInput = document.getElementById("cfg-upload");
var gameInput = document.getElementById("game");

var binds = [];
var bindsdict = {};
var nonbinds = [];
var game = gameInput.value;

class BindType {
    constructor(binds, color) {
        this.binds = binds;
        this.color = color;
    }

    has(s) {
        let hasSubStr = false;
        this.binds.forEach(e => {
            if (s.startsWith(e) || s.includes(e)) {
                hasSubStr = true;
            }
        });
        return hasSubStr || this.binds.some(e => e.includes(s));
    };
}

// CSGO
const movement = new BindType(["+moveleft", "+moveright", "+jumpthrow", "+back", "+forward", "+jump", "+duck", "noclip"], "#f00");
const buy = new BindType(["buyammo1", "buyammo2", "autobuy", "rebuy", "buy "], "#0f0");
const commmunication = new BindType(["+voicerecord", "messagemode2", "messagemode", "radio", "+radialradio", "playerradio ", "say ", "say_team "], "#00f");
const weapons = new BindType(["slot1", "slot2", "slot3", "slot4", "slot5", "slot6", "slot7", "slot8", "slot9", "buymenu", "+lookatweapon", "drop", "show_loadout_toggle", "lastinv", "+reload", "use weapon_"], "#0ff");

fileInput.onchange = () => {
    binds = [];
    bindsdict = {};
    nonbinds = [];
    clearKeyboard();
    const reader = new FileReader();
    reader.onload = (e) => parseCfg(e.target.result);
    reader.readAsText(fileInput.files[0]);
}

gameInput.onchange = () => {
    game = gameInput.value;
}

function parseCfg(c) {
    let lines = c.split("\n");
    lines.forEach(line => {
        if (!line.startsWith("bind")) {
            nonbinds.push(line);
        } else {
            binds.push(line);
            bindsdict[line.match(/"(.*?)"/g)[0].replaceAll('"', '').toLowerCase()] = line.match(/"(.*?)"/g)[1].replaceAll('"', '');
        }
    });
    colorKeyboard(bindsdict);
}

function colorKeyboard(b) {
    for (var key in b) {
        let kb = b[key];
        let fc = "#ff0";
        switch (game) {
            case "csgo":
                if (document.getElementById(key)) {
                    if (movement.has(kb)) {
                        fc = movement.color;
                    }
                    else if (buy.has(kb)) {
                        fc = buy.color;
                    }
                    else if (commmunication.has(kb)) {
                        fc = commmunication.color;
                    } else if (weapons.has(kb)) {
                        fc = weapons.color;
                    }
                }
                break;
            default:
                fc = "#ff0";
        }
        if (document.getElementById(key)) {
            document.getElementById(key).childNodes[1].setAttribute("fill", fc);
        }
    }
}

function clearKeyboard() {
    document.getElementById("keys").childNodes.forEach(e => {
        if (e.childNodes.length > 0) {
            e.childNodes[1].setAttribute("fill", "#f4f4f4");
        }
    })
}

window.onload = function () {
    fetch("./img/keyboard.svg")
        .then(x => x.text())
        .then(data => {
            var svg = document.createElement("svg");
            svg.innerHTML = data;
            document.getElementById("svgContainer").appendChild(svg);
        });
};
