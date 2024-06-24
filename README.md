# GrapJs
Is a simple graph library for Vanilla JavaScript. It is designed to be simple and easy to use. It is not intended to be a full-featured graph library, but rather a simple and easy-to-use library for creating and manipulating graphs.

![imagen](https://github.com/adesduende/GraphJS/assets/29408281/4c5b9ce7-cda6-42c9-914a-395dbd167999)

## Installation
To install GrapJs, simply include the `grap.js` file in your project.

```javascript
import { GraphVerticalBar } from 'Graph.js';
```

## Usage
To create a new graph, simply import the class you want to use and create a new instance of it. In the instance include the id of the canvas where you want to draw the graph.


```javascript
import { GraphVerticalBar } from 'Graph.js';

const graph = new GraphVerticalBar("canvas");
```	

Once you have created the graph, you can draw it by calling the `DrawGraph` method and passing the data you want to display.

```javascript	
graph.DrawGraph(data)
```
Before drawing the graph, you can customize it by setting the properties of the graph object. For example, you can change the background color of the graph by setting the `backgroundColor` property.

```javascript
graph.backgroundColor ="transparent";
graph.foregroundColor = "#ffffffaa";
graph.offSetText = 15;
graph.span = 0;
graph.textSize = 25;
graph.textAngle = 45;
graph.dataOffSet = 30;
graph.axisOffSet = 10;
graph.canvasOffSet = 20;
graph.xTags = true;
graph.yTags = true;
graph.showBorder = true;
graph.axisBorder = 3;
graph.border = 4;
graph.strokeBarColor = "#0000002e";
graph.axisColor = "#000000aa";
```
