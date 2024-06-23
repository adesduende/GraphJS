import {GrahpVerticalBar} from "../Graphs.js";

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


let g = new GrahpVerticalBar("canvas");
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


console.log('main.js loaded');