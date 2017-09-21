   //var data = require('./stats.json');
// var React = require('react');
   const stats = require('json-loader!../../monitor/stats.json');
   import React from 'react'
   import ReactDOM from 'react-dom'
   import D3TimeAreaChart from './charts/AreaChart.jsx'
   import D3TimeLineChart from './charts/LineChart.jsx'
   import BarChart from './charts/BarChart.jsx'
   import DonutChart from './charts/DonutChart.jsx'
   import ProgressChart from './charts/ProgressChart.jsx'
   import StackChart from './charts/StackChart.jsx'
   import { D3Axis , D3Grid , D3ToolTip , D3Dots } from './charts/utils/D3Utils.jsx'
//    import D3Grid from './charts/utils/D3Utils.jsx'
   import { InsetShadow , Gradient } from './charts/utils/SVGDefs.jsx'
   import resizeMixin from './charts/utils/ReactMixins.jsx'
   import SunBurstChart from './charts/SunBurstChart.jsx'
//    import EventEmitter from './EventEmitter.js'
// import stats from "./stats.json"
console.log('stats', stats)
var eventEmitter=new EventEmitter();

var Range=React.createClass({
    propTypes: {
        loadData:React.PropTypes.func,
        defaultSelection:React.PropTypes.bool,
        master:React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            defaultSelection:false,
            master:false
        };
    },
    getInitialState:function(){
        return {
            defaultSelection:false
        };
    },

    componentWillReceiveProps: function(newProps) {

        if (newProps.defaultSelection != this.state.defaultSelection) {
            this.setState({defaultSelection: newProps.defaultSelection});
        }
    },

    componentWillMount:function(){
        this.setState({defaultSelection:this.props.defaultSelection});
    },

    toggleSection:function(){
        if(this.props.master){

            eventEmitter.emitEvent("reload",[!this.state.defaultSelection]);
        }else {
            this.props.loadData(!this.state.defaultSelection);
        }
        this.setState({defaultSelection:!this.state.defaultSelection});
    },

    selectColor:function(){
        if(this.state.defaultSelection){
            this.fill7='#e58c72';
            this.fill30='#8f8f8f';
        }else{
            this.fill30='#e58c72';
            this.fill7='#8f8f8f';
        }
    },

    render:function(){

        this.selectColor();

        return(
            <div onClick={this.toggleSection} className="filter-selection">
                <span className="range-span" >
                    <svg width="10" height="10">
                        <circle cx="5" cy="5" r="5" fill={this.fill7}/>
                    </svg>
                    <span className="padding-left-5">7 days</span>
                </span>
                <span className="range-span">
                    <svg width="10" height="10">
                        <circle cx="5" cy="5" r="5" fill={this.fill30}/>
                    </svg>
                    <span className="padding-left-5">30 days</span>
                </span>
            </div>
        );
    }
});

var Panel=React.createClass({
    render:function() {
        return (
            <div className="bg">
                {this.props.children}
            </div>
        );
    }
});

var PanelHeader=React.createClass({
    propTypes: {
        title:React.PropTypes.string
    },
    render: function () {
        return (
            <div className="panel-header">
                <div className="pull-left panel-title">{this.props.title}</div>
                <div className="pull-right line-height-30">
                    {this.props.children}
                </div>

            </div>
        );
    }
});


var MainRangeSelection=React.createClass({
    render:function(){
        return(
            <div className="row range-custom">
                <div className="range-custom-child">
                    <Range master={true}/>
                </div>
            </div>
        );
    }
});

var Cards=React.createClass({

    getInitialState:function(){
        return {
            defaultSelection:false
        };
    },
    componentWillMount:function(){
        eventEmitter.addListener("reload",this.reloadData);

    },
    componentWillUnmount:function(){
        eventEmitter.removeListener("reload",this.reloadData);

    },
    reloadData:function(defaultValue){
        this.setState({defaultSelection:defaultValue});
    },
    getData:function(){
        var color=['#53c79f','#64b0cc','#7a6fca','#ca6f96','#e58c72','#e5c072'];
        var heading=['FUN Size','Chunks','Modules','Assets','Errors','Flag'];

        var count=2000;

        if(this.state.defaultSelection){
            count=200;
        }

        var cards=color.map(function(d,i){
            var style={
                'backgroundColor':d
            };

            var up_down;
            if(i%2==0){
                up_down=(<span>&#8595;</span>);
            }else{
                up_down=(<span>&#8593;</span>);
            }

            return (
                <div className="col-xs-2 custom_padding margin-below-20" key={i}>
                    <div className="card" style={style}>
                        <div className="card_header">
                            <div className="pull-left" >
                                {heading[i]}
                            </div>
                            <div className="pull-right">
                                {up_down}{" "}
                                <span className="header_text">
                                    {/* Note: Number for Card % */}
                                    {Math.floor((Math.random() * 90) + 50)+'%'}
                                </span>
                            </div>
                        </div>
                        <hr className="hr-custom"/>
                        <div className="card_body">
                            {/* Note: Number for Card */}
                            {Math.floor((Math.random() * count) + 3000)}
                        </div>
                    </div>
                </div>
            );
        });

        return cards;
    },
    render:function(){


        var cards=this.getData();


        return(
            <div className="row">
                {cards}
            </div>
        );
    }
});

var SubContainer=React.createClass({
    getInitialState:function(){
        return {
            defaultBar:false,
            defaultPie:false,
            dataPie:[],
            dataBar:[]
        };
    },
    componentWillMount:function(){
        this.reloadBarData();
        this.reloadPieData();
        eventEmitter.addListener("reload",this.reloadData);

    },
    componentWillUnmount:function(){
        eventEmitter.removeListener("reload",this.reloadData);

    },
    reloadData:function(defaultValue){
        this.reloadBarData(defaultValue);
        this.reloadPieData(defaultValue);
    },
    reloadBarData:function(defaultValue){
        var dataBar=[
            { month:'Jan', new:20, old:30 },
            { month:'Feb', new:29, old:83 },
            { month:'Mar', new:86, old:75 },
            { month:'Apr', new:13, old:57 },
            { month:'May', new:30, old:23 },
            { month:'Jun', new:50, old:27 }

        ];

        for(var i=0,j=5;i<6;++i,--j){

            var d=dataBar[i];
            d.new=Math.floor((Math.random() * 200) + 5);
            d.old=Math.floor((Math.random() * 200) + 5);


            dataBar[i]=d;
        }

        //Note: dataBar
        console.log('dataBar', dataBar)
        this.setState({dataBar:dataBar,defaultBar:defaultValue});
    },
    reloadPieData:function(defaultValue){

        var dataPie = [
            { name: 'Maintenance' },
            { name: 'New Development' },
            { name: 'Support'},
            { name: 'ISLA'},
            { name: 'Others'}

        ];

        for(var i=0,j=4;i<5;++i,--j){

            var d=dataPie[j];
            d.count=Math.floor((Math.random() * 50) + 5);
            dataPie[j]=d;
        }

        //Note: dataPie
        console.log('dataPie',dataPie)
        this.setState({dataPie:dataPie,defaultPie:defaultValue});

    },
    render:function(){

        var color=['#53c79f','#e58c72','#7a6fca','#ca6f96','#64b0cc','#e5c072'];

        var margin={
            top: 20, right: 30, bottom: 40, left: 50
        };

        var keys=['new','old'];

        return(
            
            <div className="row">
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Individual Components">
                            <Range loadData={this.reloadBarData} defaultSelection={this.state.defaultBar}/>
                        </PanelHeader>
                        <div className="text-center">
                            <StackChart data={this.state.dataBar} xData="month" margin={margin}
                                        id="stacked-bar" keys={keys} color={color} twoColorScheme={true}>
                                <yGrid orient="left" className="y-grid" ticks={5}/>
                                <xAxis orient="bottom" className="axis" ticks={5}/>
                                <yAxis orient="left" className="axis" ticks={5}/>
                            </StackChart>
                        </div>
                    </Panel>
                </div>
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Individual Components">
                            <Range loadData={this.reloadPieData} defaultSelection={this.state.defaultBar}/>
                        </PanelHeader>
                        <div className="text-center padding-top-10">
                            <DonutChart id="bs_chart" data={this.state.dataPie} color={color} height={300} width={500}
                                        enable3d={true} innerRadiusRatio={3} label="name" point="count">
                                <legend radius={10}></legend>
                            </DonutChart>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
});

var SubContainer2=React.createClass({
    getInitialState:function(){
        return {
            defaultBar:false,
            defaultPie:false,
            dataPie:[],
            dataBar:[]
        };
    },
    componentWillMount:function(){
        this.reloadBarData();
        this.reloadPieData();
        eventEmitter.addListener("reload",this.reloadData);

    },
    componentWillUnmount:function(){
        eventEmitter.removeListener("reload",this.reloadData);

    },
    reloadData:function(defaultValue){
        this.reloadBarData(defaultValue);
        this.reloadPieData(defaultValue);
    },
    reloadBarData:function(defaultValue){
        var dataBar=[
            { month:'Jan', new:20, old:30 },
            { month:'Feb', new:29, old:83 },
            { month:'Mar', new:86, old:75 },
            { month:'Apr', new:13, old:57 },
            { month:'May', new:30, old:23 },
            { month:'Jun', new:50, old:27 }

        ];

        for(var i=0,j=5;i<6;++i,--j){

            var d=dataBar[i];
            d.new=Math.floor((Math.random() * 200) + 5);
            d.old=Math.floor((Math.random() * 200) + 5);


            dataBar[i]=d;
        }

        //Note: dataBar
        console.log('dataBar', dataBar)
        this.setState({dataBar:dataBar,defaultBar:defaultValue});
    },
    reloadPieData:function(defaultValue){

        var dataPie = [
            { name: 'Maintenance' },
            { name: 'New Development' },
            { name: 'Support'},
            { name: 'ISLA'},
            { name: 'Others'}

        ];

        for(var i=0,j=4;i<5;++i,--j){

            var d=dataPie[j];
            d.count=Math.floor((Math.random() * 50) + 5);
            dataPie[j]=d;
        }

        //Note: dataPie
        console.log('dataPie',dataPie)
        this.setState({dataPie:dataPie,defaultPie:defaultValue});

    },
    render:function(){

        var color=['#53c79f','#e58c72','#7a6fca','#ca6f96','#64b0cc','#e5c072'];

        var margin={
            top: 20, right: 30, bottom: 40, left: 50
        };

        var keys=['new','old'];

        return(
            
            <div className="row">
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Individual Components">
                            <Range loadData={this.reloadBarData} defaultSelection={this.state.defaultBar}/>
                        </PanelHeader>
                        <div className="text-center">
                            <StackChart data={this.state.dataBar} xData="month" margin={margin}
                                        id="stacked-bar" keys={keys} color={color} twoColorScheme={true}>
                                <yGrid orient="left" className="y-grid" ticks={5}/>
                                <xAxis orient="bottom" className="axis" ticks={5}/>
                                <yAxis orient="left" className="axis" ticks={5}/>
                            </StackChart>
                        </div>
                    </Panel>
                </div>
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Individual Components">
                            <Range loadData={this.reloadPieData} defaultSelection={this.state.defaultBar}/>
                        </PanelHeader>
                        <div className="text-center padding-top-10">
                            <SunBurstChart></SunBurstChart>
                            {/* <DonutChart id="bs_chart" data={this.state.dataPie} color={color} height={300} width={500}
                                        enable3d={true} innerRadiusRatio={3} label="name" point="count">
                                <legend radius={10}></legend>
                            </DonutChart> */}
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
});


var MainContainer=React.createClass({
    getInitialState:function(){
        return {
            defaultLine:false,
            defaultArea:false,
            dataLine:true,
            dataArea:true
        };
    },
    componentWillMount:function(){
        this.loadLineChart();
        this.loadAreaChart();
        eventEmitter.addListener("reload",this.reloadData);
    },
    componentWillUnmount:function(){
        eventEmitter.removeListener("reload",this.reloadData);
    },
    reloadData:function(defaultValue){
        this.loadLineChart(defaultValue);
        this.loadAreaChart(defaultValue);
    },
    loadLineChart:function(defaultValue){

        var count=7;

        if(!defaultValue){
            count=30;
        }

        var parseDate = d3.time.format("%m-%d-%Y").parse;
        var data=[];
        for(var i=0;i<count;++i){

            var d={day:moment().subtract(i, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 80) + 5)};
            d.date = parseDate(d.day);
            data[i]=d;
        }

        //Note: dataLine
        console.log('dataLine', data)

        var bundleSizes = [];
        var statsLine = [];
        for(var i = 0; i < stats.length; i++){
 
          bundleSizes.push(stats[i].size/1000)
        //   console.log(data[i].size)
          statsLine.push({ 
            // "day" : moment.unix(stats[i].timeStamp).format('MM-DD-YYYY'),
            "build" : i,
            "count" : stats[i].size/1000,
            "date" : parseDate(moment().subtract(i, 'days').format('MM-DD-YYYY')),
        })
        }
        // console.log(bundleSizes)
        console.log('statsLine', statsLine)
        console.log('defaultValue', defaultValue)
        let currentBundleSize = bundleSizes[bundleSizes.length-1];

        this.setState({dataLine:statsLine,defaultLine:defaultValue});
    },

    loadAreaChart:function(defaultValue) {

        var count=7;
        if(!defaultValue){
            count=30;
        }

        var parseDate = d3.time.format("%m-%d-%Y").parse;
        var dataArea=[];

        for(var i=0,j=0;i<count;++i,++j){

            var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 30) + 5),type:'A'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }
        for(var i=count,j=0;i<count*2;++i,++j){

            var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 40) + 200),type:'B'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }
        for(var i=count*2,j=0;i<count*3;++i,++j){

            var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 50) + 30),type:'C'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }
    
        //Note: dataArea
        console.log('dataArea', dataArea)
        

        this.setState({dataArea:dataArea,defaultArea:defaultValue});

    },

    render:function(){

        var margin={
            top: 20, right: 30, bottom: 20, left: 50
        };

        return(
            <div className="row">
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Modules">
                            <Range loadData={this.loadAreaChart} defaultSelection={this.state.defaultArea}/>
                        </PanelHeader>

                        <D3TimeAreaChart data={this.state.dataArea} xData="date" yData="count" type="type" margin={margin}
                                         yMaxBuffer={10} id="multi-area-chart" interpolations="basis">
                            <yGrid orient="left" className="y-grid" ticks={5}/>
                            <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                            <yAxis orient="left" className="axis" ticks={5}/>
                            <area className="area" fill="#ca6f96" value="C"/>
                            <area className="area" fill="#53c79f" value="B"/>
                            <area className="area" fill="#e58c72" value="A"/>

                        </D3TimeAreaChart>

                    </Panel>
                </div>
                <div className="col-md-6 custom_padding" >
                    <Panel>
                        <PanelHeader title="Bundle Size Over Time">
                            <Range loadData={this.loadLineChart} defaultSelection={this.state.defaultLine}/>
                        </PanelHeader>
                        <D3TimeLineChart data={this.state.dataLine} xData="date" yData="count" margin={margin}
                                         yMaxBuffer={10} id="line-chart">
                            <defs>
                                <gradient color1="#fff" color2="#53c79f" id="area"/>
                            </defs>
                            {/*<xGrid orient="bottom" className="y-grid" ticks={4}/>*/}
                            <yGrid orient="left" className="y-grid" ticks={5}/>
                            <xAxis orient="bottom" className="axis" tickFormat="Build %d" ticks={10}/>
                            <yAxis orient="left" className="axis" ticks={5}/>
                            <area className="area" fill="url(#area)"/>
                            <path className="line shadow" strokeLinecap="round"/>
                            <dots r="5" format="%b %e" removeFirstAndLast={false}/>
                            <tooltip textStyle1="tooltip-text1" textStyle2="tooltip-text1" bgStyle="tooltip-bg" xValue="Date" yValue="Count"/>
                        </D3TimeLineChart>
                    </Panel>
                </div>
            </div>
        );
    }
});


var Page=React.createClass({
    render:function(){
        return(
            <div className="container">
                <MainRangeSelection/>
                <Cards />
                <MainContainer />
                <SubContainer />
                <SubContainer2 />
            </div>
        );
    }
});



// ReactDOM.render(<Page/>,document.getElementById("body"));
module.exports = Page