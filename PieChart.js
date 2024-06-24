export default class PieChart {
    #canvasCtx;
    #canvasWidth;
    #canvasHeight;
    
    constructor() {
        this.#canvasCtx = document.getElementById(canvasId).getContext('2d');
        this.#canvasWidth = document.getElementById(canvasId).width;
        this.#canvasHeight = document.getElementById(canvasId).height;
    }
    DrawGraph() {
        console.log("PieChart draw");
    }
}