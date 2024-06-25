export default class GrahpVerticalBar {
    //CanvasVariables
    #canvasCtx;
    #canvasWidth;
    #canvasHeight;
    data = [];
    canvasOffSet = 5;
    backgroundColor = "#f2f2f2";
    
    //GraphVariables
    axisColor = "#000";
    axisBorder = 1;
    axisOffSet = 10;
    dataOffSet = 10;
    border = 1;
    showBorder = true;
    strokeBarColor = "#000";
    backgroundBarColor = "#2e2dfd";
    span = 0;
    
    xTags = true;
    yTags = true;

    //TextVariables
    offSetText = 0;
    textFamily = "Arial";
    textSize = 10; //Proportional to the canvas
    foregroundColor = "#000";
    textAngle = -75;

    /// Constructor
    /// @param {String} canvasId. The id of canvas where draw the graph
    constructor(canvasId) {
        this.#canvasCtx = document.getElementById(canvasId).getContext('2d');
        this.#canvasWidth = document.getElementById(canvasId).width;
        this.#canvasHeight = document.getElementById(canvasId).height;
    }
    /// DrawGraph
    /// @param {Array{Object}} data is an Array of Objects with the data to draw
    DrawGraph(data) {
        //Sotre the data for future use
        this.data = data;
        // Clear the canvas
        this.#canvasCtx.clearRect(0, 0, this.#canvasWidth, this.#canvasHeight);
        // Fill canvas
        this.#canvasCtx.fillStyle = this.backgroundColor;
        this.#canvasCtx.fillRect(0, 0, this.#canvasWidth, this.#canvasHeight);

        // Bar position
        let barPositionX = this.canvasOffSet + this.offSetText*2 + this.axisOffSet + this.axisBorder + this.span + this.#GetTextDimensions(this.#GetMaxValue(data) , 0 , this.yTags).width;
        const barPositionY = this.#canvasHeight - (this.canvasOffSet  + this.offSetText * 2 + this.axisBorder + this.axisOffSet + this.#GetTextDimensions(data , this.textAngle, this.xTags).height);
        const barWidth = (this.#canvasWidth - barPositionX - this.canvasOffSet - (this.#GetDataLenght(data)-1)*this.span - ((data.length - 1) * this.dataOffSet) - this.#GetTextDimensions(data , this.textAngle, this.yTags).width/2) / this.#GetDataLenght(data);
        let barHeight = 0;

        // Text position
        let textPositionX = barPositionX + barWidth/2;
        const textPositionY = this.#canvasHeight - this.offSetText - this.canvasOffSet - (this.#GetTextDimensions(data , this.textAngle, this.xTags).height) ;
        
        
        // Draw the axis
        this.#DrawAxis(
          this.canvasOffSet  + (this.offSetText * 2) + this.axisOffSet + this.#GetTextDimensions(this.#GetMaxValue(data) , 0 , this.yTags).width ,//Initial position X
          this.canvasOffSet + this.axisOffSet,//Initial position Y
          this.#canvasWidth - this.canvasOffSet - this.#GetTextDimensions(data , this.textAngle, this.yTags).width/2, //End position X
          barPositionY //End position Y
        );

        // Draw the axis Y tags
        this.#DrawLeftAxisTag(
            this.#GetMaxValue(data),
            10 , 
            this.offSetText+this.canvasOffSet, 
            barPositionY, 
            0
        );
         
        // Draw the bars and text of axis X
        data.forEach(element => {
            element.forEach(values => {                
                    barHeight = values.value * ( barPositionY - this.axisOffSet - this.canvasOffSet )/ this.#GetMaxValue(data);
                    // Draw the bar
                    this.#DrawBar(barPositionX, barPositionY, barWidth, barHeight, values.color,2,this.showBorder);
                    
                    //Draw text for axis X if would show
                    if(this.xTags==true)
                        {
                            // Draw the text of the X axis
                            this.#DrawText(values.name,textPositionX, textPositionY, this.textSize, this.textFamily, this.foregroundColor, this.textAngle);
                        }

                    barPositionX += this.span + barWidth;
                    textPositionX += this.span + barWidth;
                
            })
            barPositionX += this.dataOffSet;
            textPositionX += this.dataOffSet;
        });
        
    }
    ///GetTextDimensions
    #GetTextDimensions(data , angle = -90, textIsShow = true) {
        if(textIsShow===false){
            return {height: 0 , width: 0 };
        }
        let maxlength = 0;
        let measurement;
        this.#canvasCtx.font = `${this.textSize}px ${this.textFamily}`;
        if(typeof(data)==="object")
        {
            data.forEach(element => {
                element.forEach(values => {
                    if(values.name.length > maxlength) {
                        maxlength = values.name.length;                        
                        measurement = this.#canvasCtx.measureText(values.name);
                    }
                });
            });
        }else
        {
            measurement = this.#canvasCtx.measureText(data.toString());
        }
        //Height
        const h = Math.abs(Math.sin(angle * Math.PI / 180) * measurement.width);
        //Width
        const w = Math.abs(Math.cos(angle * Math.PI / 180) * measurement.width);
        return {height: h, width: w};
    }
    /// GetDataLenght
    /// @param {Array{Object}} data is an Array of Objects with the data to draw
    /// @return {Number} the lenght of the data
    #GetDataLenght(data) {
        let lenght = 0;
        data.forEach(element => {
            element.forEach(values => {
                lenght++;
            });         
        });
        return lenght;
    }
    /// GetMaxValue
    /// @param {Array{Object}} data is an Array of Objects with the data to draw
    /// @return {Number} the max value of the data
    #GetMaxValue(data) {
        let max = 0;
        data.forEach(element => {
            element.forEach(values => {
                if(values.value > max) {
                    max = values.value;
                }
            });         
        });
        return max;
    }
    /// Draw axis
    /// @param {Number} positionX is the position X where draw the axis
    /// @param {Number} positionY is the position Y where draw the axis
    /// @param {Number} endPositionX is the end position X where draw the axis
    /// @param {Number} endPositionY is the end position Y where draw the axis
    #DrawAxis(positionX = 0, positionY = 0, endPositionX = 0, endPositionY = 0) {

        this.#canvasCtx.save();
        this.#canvasCtx.strokeStyle = this.axisColor;
        this.#canvasCtx.lineWidth = this.axisBorder;
        this.#canvasCtx.beginPath();
        this.#canvasCtx.moveTo(positionX, positionY);
        this.#canvasCtx.lineTo(positionX, endPositionY);
        this.#canvasCtx.lineTo(endPositionX, endPositionY);
        this.#canvasCtx.stroke();
        this.#canvasCtx.restore();

    }
    /// DrawBar
    /// @param {Number} position is the position X where draw the bar
    /// @param {Number} positionY is the position Y where draw the bar
    #DrawBar(positionX, positionY, barWidth, barHeight ,color,barRadius = 4, border = true) {
        // Draw the bar
        this.#canvasCtx.save();
        this.#canvasCtx.fillStyle = color??this.backgroundBarColor;
        this.#canvasCtx.beginPath();
        this.#canvasCtx.moveTo(positionX,positionY);
        this.#canvasCtx.lineTo(positionX, -barHeight + positionY + barRadius);
        this.#canvasCtx.arc(positionX + barRadius, -barHeight + positionY + barRadius, barRadius, Math.PI, Math.PI * 1.5);
        this.#canvasCtx.lineTo(positionX + barRadius, -barHeight + positionY);
        this.#canvasCtx.arc(positionX + barWidth - barRadius, -barHeight + positionY + barRadius, barRadius, Math.PI * 1.5, Math.PI * 2);
        this.#canvasCtx.lineTo(barWidth+positionX, -barHeight + positionY + barRadius);
        this.#canvasCtx.lineTo(barWidth+positionX, positionY);
        this.#canvasCtx.lineTo(positionX, positionY);
        this.#canvasCtx.fill();
        if(border===true)
        {
            this.#canvasCtx.strokeStyle = this.strokeBarColor;
            this.#canvasCtx.lineWidth = this.border;
            this.#canvasCtx.stroke();
        }   

        this.#canvasCtx.restore();

    }
    /// DrawText
    /// @param {String} text is the text to draw
    /// @param {Number} positionX is the position X where draw the text
    /// @param {Number} positionY is the position Y where draw the text
    /// @param {Number} size is the size of the text
    /// @param {String} family is the family of the text
    /// @param {String} color is the color of the text
    #DrawText(text,positionX,positionY, size = 12, family = "Arial", color = "#000", angle = -90 , align = null) {
        //Proportions canvas
        const proportion = this.#canvasHeight / this.#canvasWidth;
        // Draw the text
        this.#canvasCtx.save();
        this.#canvasCtx.font = `${size*proportion}px ${family}`;
        this.#canvasCtx.textAlign = (align===null)?(angle<0)? "right" : "left":align;
        this.#canvasCtx.fillStyle = color;
        this.#canvasCtx.translate(positionX, positionY);
        this.#canvasCtx.rotate(angle * Math.PI / 180);
        this.#canvasCtx.fillText(text, 0 , 0);
        this.#canvasCtx.restore();
    }
    ///DrawLeftAxisTag
    /// @param {Number} maxValue is the max value of the data
    /// @param {Number} numberOfTags is the number of tags to draw
    /// @param {Number} positionX is the position X where draw the tags
    /// @param {Number} positionY is the position Y where draw the tags
    #DrawLeftAxisTag(maxValue,numberOfTags = 5, positionX = 0, positionY = 0, angle = 0) {
        
        for(let i = 0; i <= numberOfTags; i++) {
            // Draw the text
            if(this.yTags===true)
            {
                this.#DrawText(
                    (i*maxValue/numberOfTags).toFixed(0).toString(),
                    positionX + this.#GetTextDimensions(maxValue , 0, this.yTags).width,
                    positionY - (i* (positionY - this.canvasOffSet - this.axisOffSet )/(numberOfTags)) + 2.5,
                    this.textSize,
                    this.textFamily,
                    this.foregroundColor,
                    angle,
                    "right"
                );
            }
            //Draw division lines
            this.#canvasCtx.save();            
            this.#canvasCtx.strokeStyle = this.axisColor;
            this.#canvasCtx.lineWidth = this.axisBorder;
            this.#canvasCtx.beginPath();            
            this.#canvasCtx.moveTo(
                this.canvasOffSet  + (this.offSetText * 2) + this.axisOffSet + this.#GetTextDimensions(maxValue , 0, this.yTags).width -5 ,
                positionY - (i* (positionY - this.canvasOffSet - this.axisOffSet )/(numberOfTags))
            )
            this.#canvasCtx.lineTo(
                this.canvasOffSet  + (this.offSetText * 2) + this.axisOffSet + this.#GetTextDimensions(maxValue , 0,this.yTags).width + 5 ,
                positionY - (i* (positionY - this.canvasOffSet - this.axisOffSet )/(numberOfTags))
            )
            this.#canvasCtx.stroke();
            this.#canvasCtx.restore();


        }
        
    }
}