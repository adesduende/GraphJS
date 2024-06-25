import {GrahpVerticalBar, PieChart} from "../Graphs.js";

const COLORS = 
{
    antenas: "#ff000088",
    televisores: "#00ff0088",
    electricidad: "#0000ff88"
}

const DATA = [    
    [{name: "Antenas", value: 100000, color: COLORS.antenas},{name: "Televisores", value: 200000, color: COLORS.televisores}],
    [{name: "Antenas", value: 200000, color: COLORS.antenas},{name: "Televisores", value: 400000, color: COLORS.televisores},{name: "Electricidad", value: 1000000, color: COLORS.electricidad}],
    [{name: "Antenas", value: 300000, color: COLORS.antenas},{name: "Televisores", value: 1110000, color:COLORS.televisores}],
    [{name: "Antenas", value: 170000, color: COLORS.antenas},{name: "Televisores", value: 540000, color: COLORS.televisores}],
    [{name: "Antenas", value: 400000, color: COLORS.antenas},{name: "Televisores", value: 800000, color: COLORS.televisores},{name: "Electricidad", value: 700000, color: COLORS.electricidad}],
    [{name: "Antenas", value: 570000, color: COLORS.antenas},{name: "Televisores", value: 330000, color: COLORS.televisores},{name: "Electricidad", value: 990000, color: COLORS.electricidad}],
    [{name: "Antenas", value: 100000, color: COLORS.antenas},{name: "Televisores", value: 200000, color: COLORS.televisores}],
    [{name: "Antenas", value: 200000, color: COLORS.antenas},{name: "Televisores", value: 400000, color: COLORS.televisores},{name: "Electricidad", value: 1000000, color: COLORS.electricidad}],
    [{name: "Antenas", value: 300000, color: COLORS.antenas},{name: "Televisores", value: 1110000, color:COLORS.televisores}],
    [{name: "Antenas", value: 120000, color: COLORS.antenas},{name: "Televisores", value: 540000, color: COLORS.televisores}],
    [{name: "Antenas", value: 400000, color: COLORS.antenas},{name: "Televisores", value: 800000, color: COLORS.televisores},{name: "Electricidad", value: 700000, color: COLORS.electricidad}],
]


let g = new GrahpVerticalBar("canvas0");
g.backgroundColor ="transparent";
g.foregroundColor = "#ffffffaa";
g.offSetText = 15;
g.span = 0;
g.textSize = 25;
g.textAngle = 45;
g.dataOffSet = 30;
g.axisOffSet = 10;
g.canvasOffSet = 60;
g.xTags = true;
g.yTags = true;
g.axisBorder = 3;
g.showBorder = true;
g.border = 4;
g.axisColor = "#000000aa";
g.strokeBarColor = "#0000002e";
g.DrawGraph(DATA);

const PCOLORS = 
{
    color1: "red",
    color2: "blue",
    color3: "green",
    color4: "grey",
    color5: "darkred",
    color6: "#ff00ff"
}

const PDATA = [
    {name: "Snakes", value: 50, color: PCOLORS.color1},
    {name: "Birds", value: 120, color: PCOLORS.color2},
    {name: "Fish", value: 50, color: PCOLORS.color3},
    {name: "Cats", value: 100, color: PCOLORS.color4},
    {name: "Dogs", value: 60, color: PCOLORS.color5},
    {name: "Rabbits", value: 30, color: PCOLORS.color6}
]

let p = new PieChart("canvas1");
p.backgroundColor = "#2e2e2eaa";
p.canvasOffset = 200;
p.border = 2;
p.pieOffset = 2;
p.pieSpan = 10;
p.textSize = 30;
p.textSpan = 1;
p.textPosition = 120;
p.foregroundColor = "#ffffffaa";
p.DrawGraph(PDATA);

console.log('main.js loaded');