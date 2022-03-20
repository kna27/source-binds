var fileInput = document.getElementById("cfg-upload");
var gameInput = document.getElementById("game");
var legendHolder = document.getElementById("legend");
var binds = [];
var bindsdict = {};
var nonbinds = [];
var game = gameInput.value;

class BindType {
    constructor(name, binds, color) {
        this.name = name;
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

const CSGO_BINDS = [
    new BindType("Movement",
        ["+moveleft", "+moveright", "+jumpthrow", "+back", "+forward", "+jump",
            "+duck", "noclip"], "#6ca0dc"),
    new BindType("Buy Binds",
        ["buyammo1", "buyammo2", "autobuy", "rebuy", "buy "], "#35ab6e"),
    new BindType("Communication",
        ["+voicerecord", "messagemode2", "messagemode", "radio", "+radialradio",
            "playerradio ", "say ", "say_team "], "#ed905f"),
    new BindType("Weapons",
        ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6", "slot7", "slot8",
            "slot9", "buymenu", "+lookatweapon", "drop", "show_loadout_toggle",
            "lastinv", "+reload", "use weapon_"], "#ccba7c")
];
const TF2_BINDS =
    [
        new BindType("Movement",
            ["+moveleft", "+moveright", "+back", "+forward", "+jump", "+duck", "noclip", "+strafe", "+use_action_slot_item", "+moveup", "+movedown", "+lookup", "+lookdown"], "#6ca0dc"),
        new BindType("Communication",
            ["+voicerecord", "say_party ", "say ", "say_team ", "voice_menu_", "voicemenu "], "#ed905f"),
        new BindType("Weapons",
            ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6", "slot7", "slot8", "slot9", "slot10", "dropitem", "lastinv", "+reload", "+inspect", "load_itempreset ", "+attack", "invprev", "invnext"], "#ccba7c"),
        new BindType("UI/Interface",
            ["showmapinfo", "open_charinfo_direct", "open_charinfo_backpack", "cl_decline_first_notification", "cl_trigger_first_notification", "toggleconsole", "changeclass", "changeteam", "+showscores", "cancelselect", "+showroundinfo", "pause", "show_quest_log", "show_matchmaking", "screenshot", "save_replay", "abuse_report_queue", "quit", "replay_togglereplaytips"], "#32cd32")
    ];

const MISC_COLOR = "#d8546f";
const UNBOUND_COLOR = "#f4f4f4";
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
            bindsdict[line.match(/"(.*?)"/g)[0].replaceAll('"', '').toLowerCase()] =
                line.match(/"(.*?)"/g)[1].replaceAll('"', '');
        }
    });
    colorKeyboard(bindsdict);
    createLegend();
}

function colorKeyboard(b) {
    for (var key in b) {
        let kb = b[key];
        let fc = MISC_COLOR;
        if (document.getElementById(key)) {
            switch (game) {
                case "csgo":
                    CSGO_BINDS.forEach(e => {
                        if (e.has(kb)) {
                            fc = e.color;
                        }
                    });
                case "tf2":
                    TF2_BINDS.forEach(e => {
                        if (e.has(kb)) {
                            fc = e.color;
                        }
                    });
                    break;
                default:
                    fc = MISC_COLOR;
            }
            document.getElementById(key).childNodes[1].setAttribute("fill", fc);
        }
    }
}

function createLegend() {
    legendHolder.style.visibility = "visible";
    while (legendHolder.lastElementChild) {
        legendHolder.removeChild(legendHolder.lastElementChild);
    }
    addLegendLabel("Legend", "#EEE", "h3");
    var chosenBinds;
    switch (game) {
        case "csgo":
            chosenBinds = CSGO_BINDS;
            break;
        case "tf2":
            chosenBinds = TF2_BINDS;
            break;
        default:
            chosenBinds = CSGO_BINDS;
    }
    chosenBinds.forEach(e => addLegendLabel(e.name, e.color));
    addLegendLabel("Miscellaneous", MISC_COLOR);
    addLegendLabel("Unbound", UNBOUND_COLOR);
}

function addLegendLabel(text, color, type = "p") {
    let e = document.createElement(type);
    e.innerHTML = text;
    e.style.color = color;
    legendHolder.appendChild(e);
}

function clearKeyboard() {
    document.getElementById("keys").childNodes.forEach(e => {
        if (e.childNodes.length > 0) {
            e.childNodes[1].setAttribute("fill", "#f4f4f4");
        }
    });
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
