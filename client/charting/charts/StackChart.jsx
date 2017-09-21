import React from 'react'
import ReactDOM from 'react-dom'
import { D3Axis , D3Grid , D3ToolTip , D3Dots } from './utils/D3Utils.jsx'
import resizeMixin from './utils/ReactMixins.jsx'
var StackChart=React.createClass({
    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        chartId:React.PropTypes.string,
        data:React.PropTypes.array.isRequired,
        xData:React.PropTypes.string.isRequired,
        margin:React.PropTypes.object,
        keys:React.PropTypes.array,
        color:React.PropTypes.array,
        twoColorScheme:React.PropTypes.bool
    },

    mixins:[resizeMixin],

    getDefaultProps: function() {
        return {
            width: 800,
            height: 300,
            chartId: 'v1_chart',
            interpolations:'linear',
            margin:{
                top: 5, right: 5, bottom: 5, left: 5
            },
            color:[]
        };
    },
    getInitialState:function(){
        return {
            tooltip:{ display:false,data:{key:'',value:''}},
            width:500
        };
    },

    createChart:function(_self){

        if(this.props.color.length>0){
            this.color=d3.scale.ordinal()
                .range(this.props.color);
        }else{
            this.color=d3.scale.category20();
        }


        this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
        this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);


        this.stacked = d3.layout.stack()(_self.props.keys.map(function(key,i){
            return _self.props.data.map(function(d,j){
                return {x: d[_self.props.xData], y: d[key] };
            })
        }));

        this.xScale = d3.scale.ordinal()
            .rangeRoundBands([0, this.w], .35)
            .domain(this.stacked[0].map(function(d) { return d.x; }));



        this.yScale = d3.scale.linear()
            .range([this.h, 0])
            .domain([0, d3.max(this.stacked[this.stacked.length - 1], function(d) { return d.y0 + d.y; })])
            .nice();

        this.transform='translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';

    },

    createElements:function(element,i){
        var object;
        var _self=this;

        switch(element.type){

            case 'xGrid':
                object=<D3Grid h={this.h} len={this.h} scale={this.xScale} gridType="x" key={i} {...this.props} {...element.props}/>;
                break;

            case 'yGrid':
                object=<D3Grid h={this.h} len={this.w} scale={this.yScale} gridType="y" key={i} {...this.props} {...element.props}/>;
                break;

            case 'xAxis':
                object=<D3Axis h={this.h} scale={this.xScale} axisType="x" key={i} {...this.props} {...element.props}/>;
                break;

            case 'yAxis':
                object=<D3Axis h={this.h} scale={this.yScale} axisType="y" key={i} {...this.props} {...element.props}/>;
                break;
        }
        return object;
    },
    render:function(){
        this.createChart(this);

        var elements;
        var _self=this;

        if(this.props.children!=null) {
            if (Array.isArray(this.props.children)) {
                elements=this.props.children.map(function(element,i){
                    return _self.createElements(element,i)
                });
            }else{
                elements=this.createElements(this.props.children,0)
            }
        }


        var bars=_self.stacked.map(function(data,i){

            var rects=data.map(function(d,j){

                var fill="";

                if(_self.props.twoColorScheme) {

                    fill = _self.color(j);
                    if (i > 0) {
                        fill = "#e8e8e9";
                    }

                }

                return (<rect x={_self.xScale(d.x)}  y={_self.yScale(d.y + d.y0)} fill={fill}
                              height={_self.yScale(d.y0) - _self.yScale(d.y + d.y0)} width={_self.xScale.rangeBand()} key={j}/>);

            });

            var fill;
            if(!_self.props.twoColorScheme){
                fill=_self.color(i);
            }

            return <g key={i} fill={fill}>
                {rects}
            </g>
        });



        return (
            <div>
                <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
                    <g transform={this.transform}>
                        {elements}

                        {bars}

                    </g>

                </svg>
            </div>
        );
    }

});

module.exports=StackChart;