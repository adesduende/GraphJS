export default class PieChart {
    #canvasCtx;
    #canvasWidth;
    #canvasHeight;
    #centerPoint;
    #radius;

    backgroundColor = "transparent";
    canvasOffset = 0;
    border = 0;
    pieOffset = 10;
    showName = true;
    showValue = true;

    constructor(canvasId) {
        this.#canvasCtx = document.getElementById(canvasId).getContext('2d');
        this.#canvasWidth = document.getElementById(canvasId).width;
        this.#canvasHeight = document.getElementById(canvasId).height;
        this.#centerPoint = { x: this.#canvasWidth/2, y: this.#canvasHeight/2 };
        this.#radius = (this.#canvasWidth<this.#canvasHeight)?this.#canvasWidth/2:this.#canvasHeight/2;
    }

    DrawGraph(data) {
        //Clear canvas and set background color
        this.#canvasCtx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
        this.#canvasCtx.fillStyle = this.backgroundColor;
        this.#canvasCtx.fillRect(0, 0, this.#canvasWidth, this.#canvasHeight);

        //Get max value
        const maxValue = this.#GetMaxValue(data);
        //Get total value
        const totalValue = this.#GetTotalValue(data);

        //Set initial angle
        let initAngle = 0;
        //Draw Pie for each element
        data.forEach(element => {
            const endAngle = initAngle + this.#GetProportionalAngle(element.value, totalValue);
            this.#DrawPie(initAngle,endAngle,element.color);
            initAngle = endAngle;
        });

        
        
    }

    #DrawPie(initAngle, endAngle, color) {

        const x = this.#centerPoint.x + this.pieOffset;
        const y = this.#centerPoint.y;
        const radius = this.#radius-this.canvasOffset;

        this.#canvasCtx.save();
        this.#canvasCtx.fillStyle = color;
        this.#canvasCtx.beginPath();
        this.#canvasCtx.moveTo(x, x);
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
        const proportionValue = (value / totalValue) * 360;
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
}