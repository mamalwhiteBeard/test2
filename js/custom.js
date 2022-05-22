var obj =[];
var myColors= [];
var myCanvas =document.getElementById("ca");
var ctx= myCanvas .getContext("2d");
var extra ={};
var t={};
var txt = [];
var myLegend = document.getElementById("legend");



function addmahsol() {
    var name1 = document.getElementById("name").value;
    var price1 = document.getElementById("price").value;
	document.getElementById("name").value="";
document.getElementById("price").value="";
	

    obj.push({
        name: name1,
        price: price1,
        rang: getRandomColor()
    });
	
    ///////////============> here !!!!
    var x;
    txt=[];
    extra={};
    for (x in obj) {
        txt.push(obj[x].rang);
        extra[obj[x].name]=parseInt(obj[x].price);

     };
    console.log(txt);
    console.log(extra);
	
 	console.log(name1);
}


var getRandomColor = function()  {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
///////===============> draw Line
// function drawLine(ctx, startX, startY, endX, endY){
//     ctx.beginPath();
//     ctx.moveTo(startX,startY);
//     ctx.lineTo(endX,endY);
//     ctx.stroke();
// }
///////////////////===============> DRaw Arc
// function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, startAngle, endAngle);
//     ctx.stroke();
// }
///////////=========================>boresh zadan
//var a=0;
function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){

    //setInterval(function () {
    //     if(a+startAngle<endAngle) {
    //         ctx.fillStyle = color;
    //         ctx.beginPath();
    //         ctx.moveTo(centerX, centerY);
    //         a++;
    //         ctx.arc(centerX, centerY, radius, startAngle, a + startAngle);
    //         ctx.closePath();
    //         ctx.fill();
    //     }
    // },1000);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle,  endAngle);
    ctx.closePath();
    ctx.fill();
}
////////////=============> pie chart
var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    this.draw = function(){

        if (this.options.legend){
                color_index = 0;
                var legendHTML = "";
                for (categ in this.options.data){
                    legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
                }
                this.options.legend.innerHTML = legendHTML;
            }

        var total_value = 0;
        var color_index = 0;
        for(var categ in this.options.data)
        {
            var val = this.options.data[categ];
            total_value += val;
        }

        var start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;

            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );

            start_angle += slice_angle;
            color_index++;
        }

        //drawing a white circle over the chart
        //to create the doughnut chart
        if (this.options.doughnutHoleSize){
            start_angle = 0;
            for (categ in this.options.data){
                val = this.options.data[categ];
                slice_angle = 2 * Math.PI * val / total_value;
                var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
                var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
                var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);

                if (this.options.doughnutHoleSize){
                    var offset = (pieRadius * this.options.doughnutHoleSize ) / 2;
                    labelX = this.canvas.width/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
                    labelY = this.canvas.height/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
                }

                var labelText = Math.round(100 * val / total_value);
                this.ctx.fillStyle = "white";
                this.ctx.font = "bold 20px Arial";
                this.ctx.fillText(labelText+"%", labelX,labelY);
                start_angle += slice_angle;
            }
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                this.options.doughnutHoleSize * Math.min(this.canvas.width/2,this.canvas.height/2),
                0,
                2 * Math.PI,
                "#ffffff"
            );
        }

    }
}
//////////////====================> here !!!
function f1()
{
    // var myPiechart = new Piechart(
    //     {
    //         canvas: myCanvas,
    //         data: extra,
    //         //colors: ["#fde23e", "#f16e23", "#57d9ff", "#937e88"]
    //         colors:txt
    //     }
    // );
   // myPiechart.draw();
    var myDougnutChart = new Piechart(
        {
            canvas:myCanvas,
            data:extra,
            colors:txt,
            doughnutHoleSize:0.5,
            legend:myLegend
        }
    );
    myDougnutChart.draw();
}

