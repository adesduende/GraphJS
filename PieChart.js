export default class PieChart {
    #canvasCtx;
    #canvasWidth;
    #canvasHeight;
    #centerPoint;
    #radius;

    //Canvas properties
    backgroundColor = "transparent";
    canvasOffset = 0;
    border = 0;
    pieOffset = 0;
    pieSpan = 0;
    showName = true;
    showValue = true;

    //Pie properties
    foregroundColor = "#000000";
    textFamily = "Arial Black";
    textSize = 10;
    textSpan = 2;
    textPosition = 50;

    constructor(canvasId) {
        this.#canvasCtx = document.getElementById(canvasId).getContext('2d');
        this.#canvasWidth = document.getElementById(canvasId).width;
        this.#canvasHeight = document.getElementById(canvasId).height;
        this.#centerPoint = { x: this.#canvasWidth/2, y: this.#canvasHeight/2 };
    }
    ///DrawGraph
    ///@param {Array} data: Array of data to draw the pie chart
    DrawGraph(data) {
        //Clear canvas and set background color
        this.#canvasCtx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
        this.#canvasCtx.fillStyle = this.backgroundColor;
        this.#canvasCtx.fillRect(0, 0, this.#canvasWidth, this.#canvasHeight);

        //Set font properties
        this.#canvasCtx.font = `${this.textSize}px ${this.textFamily}`;
        this.#canvasCtx.textAlign = "center";
        this.#canvasCtx.textBaseline = "middle";

        //Set radius
        this.#radius = ((this.#canvasWidth<this.#canvasHeight)?this.#canvasWidth/2:this.#canvasHeight/2)-this.canvasOffset;        

        //Get total value
        const totalValue = this.#GetTotalValue(data);

        //Set initial angle
        const angleOffset = this.#DegreeToRadians(this.pieOffset);
        const initAngle = this.#DegreeToRadians(45);
        
        //Draw Pie for each element
        let nextAngle = initAngle;
        data.forEach(element => {
            const endAngle = nextAngle + this.#GetProportionalAngle(element.value, totalValue);
            this.#DrawPie(nextAngle,endAngle- angleOffset,element.color);

            nextAngle = endAngle;

        });

        //Draw text for each element
        nextAngle = initAngle;
        data.forEach(element => {
            const endAngle = nextAngle + this.#GetProportionalAngle(element.value, totalValue);
            //Draw name
            if(this.showName)
            {
                const textAngle = nextAngle + this.#GetProportionalAngle(element.value, totalValue)/2 - angleOffset;
                const x = this.#centerPoint.x + (this.textPosition * this.#radius / 100) * Math.cos(textAngle);
                const y = this.#centerPoint.y + (this.textPosition * this.#radius / 100) * Math.sin(textAngle);
                this.#DrawText(x, y, element.name, this.foregroundColor);
            }
            if(this.showValue)
            {
                const textDimension = this.#GetTextDimensions(element.value);
                const textAngle = nextAngle + this.#GetProportionalAngle(element.value, totalValue)/2 - angleOffset;
                const x = this.#centerPoint.x + (this.textPosition * this.#radius / 100) * Math.cos(textAngle);
                const y = this.#centerPoint.y  + (this.textPosition * this.#radius / 100) * Math.sin(textAngle) + textDimension.height + this.textSpan;
                this.#DrawText(x, y, element.value, this.foregroundColor);
            }
            nextAngle = endAngle;
        });
    }
    ///DrawPie
    ///@param {number} initAngle: initial angle in radians
    ///@param {number} endAngle: end angle in radians
    ///@param {string} color: color of the pie
    #DrawPie(initAngle, endAngle, color) {

        //Set span pie
        const spanAngle = initAngle + (endAngle - initAngle)/2;

        const x = this.#centerPoint.x + this.pieSpan * Math.cos(spanAngle);
        const y = this.#centerPoint.y + this.pieSpan * Math.sin(spanAngle);
        const radius = this.#radius - this.pieOffset;

        this.#canvasCtx.save();
        this.#canvasCtx.fillStyle = color;
        this.#canvasCtx.beginPath();
        this.#canvasCtx.moveTo(x, y);
        this.#canvasCtx.arc(x, y,radius, initAngle , endAngle , false);
        this.#canvasCtx.closePath();
        this.#canvasCtx.lineWidth = this.border;
        this.#canvasCtx.fill();
        if(this.border>0)
            this.#canvasCtx.stroke();
        this.#canvasCtx.restore();
    }    
    ///Degree to Radians
    ///@param {number} degree value in degrees
    ///@returns {number} value in radians
    #DegreeToRadians(degree) {
        return degree * Math.PI / 180;
    }
    ///GetProportionAngle
    ///@param {number} value: value to calculate the angle
    ///@param {number} maxValue: max value to calculate the angle
    ///@returns {number} angle in radians
    #GetProportionalAngle(value, totalValue) {
        const proportionValue = ((value / totalValue) * 360);
        return this.#DegreeToRadians(proportionValue);
    }
    ///GetMaxValue
    ///@param {Array} DATA: Array of data
    ///@returns {number} max value of the array
    #GetMaxValue(data) {
        let maxValue = 0;
        data.forEach(element => {
            if (element.value > maxValue) {
                maxValue = element.value;
            }
        });

        return maxValue;
    }
    ///GetTotalValue
    ///@param {Array} DATA: Array of data
    ///@returns {number} total value of the array
    #GetTotalValue(data) {
        let totalValue = 0;
        data.forEach(element => {
            totalValue += element.value;
        });

        return totalValue;
    }
    ///DrawText
    ///@param {number} x: x position
    ///@param {number} y: y position
    ///@param {string} name: name of the element
    ///@param {number} value: value of the element
    ///@param {string} color: color of the element
    #DrawText(x, y, name, color) {
        this.#canvasCtx.save();
        this.#canvasCtx.fillStyle = color;
        this.#canvasCtx.fillText(name, x, y);
        this.#canvasCtx.restore();
    }
    ///GetTextDimensions
    ///@param {string} text: text to get the dimensions
    ///@returns {object} width and height of the text
    #GetTextDimensions(text) {
        const dimensions = this.#canvasCtx.measureText(text);
        return { width: dimensions.width, height: this.textSize };
    }
}