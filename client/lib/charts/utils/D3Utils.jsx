import React from 'react'
import ReactDOM from 'react-dom'

module.exports = {

D3Axis: React.createClass({
    propTypes: {
        h:React.PropTypes.number,
        scale:React.PropTypes.func,
        axisType:React.PropTypes.oneOf(['x','y']),
        orient:React.PropTypes.oneOf(['left','top','right','bottom']),
        className:React.PropTypes.string,
        tickFormat:React.PropTypes.string,
        // ,removeFirst:React.PropTypes.bool
        ticks:React.PropTypes.number
    },

    componentDidUpdate: function () { this.renderAxis(); },
    componentDidMount: function () { this.renderAxis(); },
    renderAxis: function () {

        var _self=this;

        /*if(this.props.axisType=="x") {
         if (this.props.removeFirst) {

         this.props.axis.tickValues(this.props.data.map(function (d, i) {
         if (i > 0)
         return d[_self.props.xData];
         }).splice(1));
         }else{
         this.props.axis.tickValues(this.props.data.map(function (d, i) {
         return d[_self.props.xData];
         }));
         }
         }*/

        this.axis = d3.svg.axis()
            .scale(this.props.scale)
            .orient(this.props.orient)
            .ticks(this.props.ticks);

        if(this.props.tickFormat!=null && this.props.axisType==='x')
            this.axis.tickFormat(d3.time.format(this.props.tickFormat));

        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.axis);

    },
    render: function () {

        var translate = "translate(0,"+(this.props.h)+")";

        return (
            <g className={this.props.className} transform={this.props.axisType=='x'?translate:""} >
            </g>
        );
    }

}),

//  module.exports=D3Axis;

D3Grid : React.createClass({
    propTypes: {
        h:React.PropTypes.number,
        len:React.PropTypes.number,
        scale:React.PropTypes.func,
        gridType:React.PropTypes.oneOf(['x','y']),
        orient:React.PropTypes.oneOf(['left','top','right','bottom']),
        className:React.PropTypes.string,
        ticks:React.PropTypes.number
    },

    componentDidUpdate: function () { this.renderGrid(); },
    componentDidMount: function () { this.renderGrid(); },
    renderGrid: function () {

        this.grid = d3.svg.axis()
            .scale(this.props.scale)
            .orient(this.props.orient)
            .ticks(this.props.ticks)
            .tickSize(-this.props.len, 0, 0)
            .tickFormat("");


        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.grid);

    },
    render: function () {
        var translate = "translate(0,"+(this.props.h)+")";
        return (
            <g className={this.props.className} transform={this.props.gridType=='x'?translate:""}>
            </g>
        );
    }

}),

//  module.exports=D3Grid;

D3ToolTip : React.createClass({
    propTypes: {
        tooltip:React.PropTypes.object,
        bgStyle:React.PropTypes.string,
        textStyle1:React.PropTypes.string,
        textStyle2:React.PropTypes.string,
        xValue:React.PropTypes.string,
        yValue:React.PropTypes.string

    },
    render:function(){

        var visibility="hidden";
        var transform="";
        var x=0;
        var y=0;
        var width=150,height=70;
        var transformText='translate('+width/2+','+(height/2-5)+')';
        var transformArrow="";

        if(this.props.tooltip.display==true){
            var position = this.props.tooltip.pos;

            x= position.x;
            y= position.y;
            visibility="visible";

            if(y>height){
                transform='translate(' + (x-width/2) + ',' + (y-height-20) + ')';
                transformArrow='translate('+(width/2-20)+','+(height-.2)+')';
            }else if(y<height){

                transform='translate(' + (x-width/2) + ',' + (Math.round(y)+20) + ')';
                transformArrow='translate('+(width/2-20)+','+0+') rotate(180,20,0)';
            }

        }else{
            visibility="hidden"
        }

        return (
            <g transform={transform}>
                <rect class={this.props.bgStyle} is width={width} height={height} rx="5" ry="5" visibility={visibility}/>
                <polygon class={this.props.bgStyle} is points="10,0  30,0  20,10" transform={transformArrow}
                         visibility={visibility}/>
                <text is visibility={visibility} transform={transformText}>
                    <tspan is x="0" class={this.props.textStyle1} text-anchor="middle">{this.props.xValue +" : "+this.props.tooltip.data.key}</tspan>
                    <tspan is x="0" class={this.props.textStyle2} text-anchor="middle" dy="25">{this.props.yValue +" : "+this.props.tooltip.data.value}</tspan>
                </text>
            </g>
        );
    }
}),

//  module.exports=D3ToolTip;


D3Dots : React.createClass({
    propTypes: {
        data:React.PropTypes.array,
        xData:React.PropTypes.string.isRequired,
        yData:React.PropTypes.string.isRequired,
        x:React.PropTypes.func,
        y:React.PropTypes.func,
        r:React.PropTypes.string,
        format:React.PropTypes.string,
        removeFirstAndLast:React.PropTypes.bool
    },
    render:function(){

        var _self=this;

        //remove last & first point

        var data=[];

        if(this.props.removeFirstAndLast){
            for(var i=1;i<this.props.data.length-1;++i){
                data[i-1]=this.props.data[i];
            }
        }else{
            data=this.props.data;
        }



        var circles=data.map(function(d,i){

            return (<circle className="dot" r={_self.props.r} cx={_self.props.x(d[_self.props.xData])} cy={_self.props.y(d[_self.props.yData])}
                            key={i}
                            onMouseOver={_self.props.showToolTip} onMouseOut={_self.props.hideToolTip}
                            data-key={d3.time.format(_self.props.format)(d[_self.props.xData])} data-value={d[_self.props.yData]}/>)
        });

        return(
            <g>
                {circles}
            </g>
        );
    }
})

//  module.exports=D3Dots;
}