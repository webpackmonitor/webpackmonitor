import React from 'react'
   import ReactDOM from 'react-dom'
   import { D3Axis , D3Grid , D3ToolTip , D3Dots } from './utils/D3Utils.jsx'
   import resizeMixin from './utils/ReactMixins.jsx'
var BarChart=React.createClass({
    getDefaultProps: function() {
        return {
            width: 300,
            height: 70,
            chartId: 'v_chart'
        };
    },
    getInitialState:function(){
        return {
            width:0
        };
    },
    mixins:[resizeMixin],

    render:function(){


        var margin={top:5,right:5,bottom:5,left:5},
        w=this.state.width-(margin.left+margin.right),
        h=this.props.height-(margin.top+margin.bottom);

        var transform='translate('+margin.left+','+margin.top+')';

        var x=d3.scale.ordinal()
            .domain(this.props.data.map(function(d){
                return d.month;
            }))
            .rangeRoundBands([0,this.state.width],.35);

        var y=d3.scale.linear()
            .domain([0,100])
            .range([this.props.height,0]);


        var rectBackground=(this.props.data).map(function(d, i) {

            return (
                <rect fill="#58657f" rx="3" ry="3" key={i}
                      x={x(d.month)} y={margin.top-margin.bottom}
                      height={h}
                      width={x.rangeBand()}/>
            )
        });
        var rectForeground=(this.props.data).map(function(d, i) {

            return (
                <rect fill="#74d3eb" rx="3" ry="3" key={i}
                      x={x(d.month)} y={y(d.value)} className="shadow"
                      height={h-y(d.value)}
                      width={x.rangeBand()}/>
            )
        });

        return(
            <div>
                <svg id={this.props.chartId} width={this.state.width}
                     height={this.props.height}>

                    <g transform={transform}>
                        {rectBackground}
                        {rectForeground}
                    </g>
                </svg>
            </div>
            );
    }

});

module.exports=BarChart;