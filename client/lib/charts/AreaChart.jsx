
   import React from 'react'
   import ReactDOM from 'react-dom'
//    import D3Grid from './utils/D3Utils.jsx'
//    import D3Axis from './utils/D3Utils.jsx'
   import { D3Axis , D3Grid , D3ToolTip , D3Dots } from './utils/D3Utils.jsx'
   import resizeMixin from './utils/ReactMixins.jsx'
var D3TimeAreaChart=React.createClass({

    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        chartId:React.PropTypes.string,
        interpolations:React.PropTypes.string,
        data:React.PropTypes.array.isRequired,
        xData:React.PropTypes.string.isRequired,
        yData:React.PropTypes.string.isRequired,
        margin:React.PropTypes.object,
        yMaxBuffer:React.PropTypes.number
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
            yMaxBuffer:10
        };
    },
    getInitialState:function(){
        return {
            width:500
        };
    },

    createChart:function(_self){

        this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
        this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);

        this.xScale = d3.time.scale()
            .domain(d3.extent(this.props.data, function (d) {
                return d[_self.props.xData];
            }))
            .rangeRound([0, this.w]);

        this.yScale = d3.scale.linear()
            .domain([0,d3.max(this.props.data,function(d){
                return d[_self.props.yData]+_self.props.yMaxBuffer;
            })])
            .range([this.h, 0]);



        this.area = d3.svg.area()
            .x(function (d) {
                return this.xScale(d[_self.props.xData]);
            })
            .y0(this.h)
            .y1(function (d) {
                return this.yScale(d[_self.props.yData]);
            }).interpolate(this.props.interpolations);


        var interpolations = [
            "linear",
            "step-before",
            "step-after",
            "basis",
            "basis-closed",
            "cardinal",
            "cardinal-closed"];


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

            case 'area':

                var data=[];

                for(var k=0,j=0;k<this.props.data.length;++k){
                    if(this.props.data[k][_self.props.type]===element.props.value){
                        data[j]=this.props.data[k];
                        ++j;
                    }
                }
                object=<path className={element.props.className} d={this.area(data)} key={i} fill={element.props.fill}/>;
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

        return (
            <div>
                <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
                    <g transform={this.transform}>
                        {elements}
                    </g>
                </svg>
            </div>
        );
    }
});

module.exports=D3TimeAreaChart;