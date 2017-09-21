import React from 'react'
   import ReactDOM from 'react-dom'
   import resizeMixin from './utils/ReactMixins.jsx'
var DonutChartShadow=React.createClass({
    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        data:React.PropTypes.array,
        pie:React.PropTypes.func,
        color:React.PropTypes.func,
        innerRadiusRatio:React.PropTypes.number,
        shadowSize:React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            shadowSize:10
        };
    },

    componentWillMount:function(){

        var radius=this.props.height;

        var outerRadius=radius/this.props.innerRadiusRatio+1;
        var innerRadius=outerRadius-this.props.shadowSize;

        this.arc=d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        this.transform='translate('+radius/2+','+radius/2+')';

    },
    createChart:function(_self){

        var paths = (this.props.pie(this.props.data)).map(function(d, i) {

            var c=d3.hsl(_self.props.color(i));
            c=d3.hsl((c.h+5), (c.s -.07), (c.l -.10));

            return (
                <path fill={c} d={_self.arc(d)} key={i}/>
            )
        });
        return paths;
    },

    render:function(){


        var paths = this.createChart(this);

        return(
            <g transform={this.transform}>
                {paths}
            </g>
        )
    }
});


var DonutChartPath=React.createClass({
    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        data:React.PropTypes.array,
        pie:React.PropTypes.func,
        color:React.PropTypes.func,
        innerRadiusRatio:React.PropTypes.number
    },
    componentWillMount:function(){

        var radius=this.props.height;

        var outerRadius=radius/2;
        var innerRadius=radius/this.props.innerRadiusRatio;

        this.arc=d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        this.transform='translate('+radius/2+','+radius/2+')';

    },
    createChart:function(_self){

        var paths = (this.props.pie(this.props.data)).map(function(d, i) {

            return (
                <path fill={_self.props.color(i)} d={_self.arc(d)} key={i}/>
            )
        });
        return paths;
    },

    render:function(){


        var paths = this.createChart(this);

        return(
            <g transform={this.transform}>
                {paths}
            </g>
        )
    }
});

var DonutChartLegend=React.createClass({
    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        data:React.PropTypes.array,
        pie:React.PropTypes.func,
        color:React.PropTypes.func,
        label:React.PropTypes.string,
        radius:React.PropTypes.number
    },
    createChart:function(_self){

        var texts = (this.props.pie(this.props.data)).map(function(d, i) {

            var transform="translate(10,"+i*30+")";

            var rectStyle = {
                fill:_self.props.color(i),
                stroke:_self.props.color(i)

            };

            var textStyle = {
                fill:_self.props.color(i)
            };

            return (
                <g transform={transform} key={i}>
                    <rect width="20" height="20" style={rectStyle} rx={_self.props.radius} ry={_self.props.radius}/>
                    <text x="30" y="15" className="browser-legend" style={textStyle}>{d.data[_self.props.label]}</text>
                </g>
            )
        });
        return texts;
    },

    render:function(){

        var style={
            visibility:'visible'
        };

        if(this.props.width<=this.props.height+70){
            style.visibility='hidden';
        }

        var texts = this.createChart(this);
        var legendY=this.props.height/2-this.props.data.length*30/2;


        var transform="translate("+(this.props.width/2+80)+","+legendY+")";
        return(
            <g is transform={transform} style={style}>
                {texts}
            </g>
        )
    }
});


var DonutChart=React.createClass({
    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        padAngle:React.PropTypes.number,
        id:React.PropTypes.string.isRequired,
        data:React.PropTypes.array.isRequired,
        color:React.PropTypes.array,
        enable3d:React.PropTypes.bool,
        innerRadiusRatio:React.PropTypes.number,
        label:React.PropTypes.string,
        point:React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            width: 500,
            height: 250,
            padAngle:0,
            color:[],
            innerRadiusRatio:3.3
        };
    },
    getInitialState:function(){
        return {
            width:0
        };
    },

    mixins:[resizeMixin],

    componentWillMount:function(){

        var _self=this;

        this.pie=d3.layout.pie()
            .value(function(d){return d[_self.props.point]})
            .padAngle(this.props.padAngle)
            .sort(null);

        this.color = d3.scale.ordinal()
            .range(this.props.color);

        this.setState({width:this.props.width});
    },
    render:function(){

        var shadow;
        if(this.props.enable3d){
            shadow=(<DonutChartShadow width={this.state.width} height={this.props.height} innerRadiusRatio={this.props.innerRadiusRatio}
                                      pie={this.pie} color={this.color} data={this.props.data} shadowSize={this.props.shadowSize}/>  );
        }

        var legend;

        if(this.props.children!=null){
            if(!Array.isArray(this.props.children)){
                if(this.props.children.type==='legend'){
                    legend=(<DonutChartLegend pie={this.pie} color={this.color} data={this.props.data}
                                              width={this.state.width} height={this.props.height}
                                              label={this.props.label} radius={this.props.children.props.radius}/>);
                }
            }
        }

        return (
            <div>
                <svg id={this.props.id} width={this.state.width}

                     height={this.props.height}>

                    {shadow}

                    <DonutChartPath width={this.state.width} height={this.props.height} innerRadiusRatio={this.props.innerRadiusRatio}
                                    pie={this.pie} color={this.color} data={this.props.data}
                                    />

                    {legend}

                </svg>
            </div>
        );
    }
});

module.exports = DonutChart;