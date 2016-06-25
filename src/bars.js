update();

function update(){
    var n = Math.round(Math.random()*30);
    var data = d3.range(n);
    d3.select('body').data(data).enter().append('div').attr('class','test').style({'width':random_range,'background-color':random_color});
    d3.selectAll('.test').data(data).exit().remove();
    console.log(n)
}

function random_color(){
    var clr = "#"+((1<<24)*Math.random()|0).toString(16);
    console.log(clr);
    return clr
}

function random_width(mi,ma){
    var range = ma - mi;
    var rndStr = (Math.round(mi + Math.random()*range)).toString()+'px';
    console.log(rndStr);
    return rndStr
}

function random_range()
{
    return random_width(300,500)
}
setInterval(update,2000);




