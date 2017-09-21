import React from 'react'
import ReactDOM from 'react-dom'


module.exports = {

InsetShadow : React.createClass({

    propTypes: {
        id:React.PropTypes.string,
        stdDeviation:React.PropTypes.string,
        floodColor:React.PropTypes.string,
        floodOpacity:React.PropTypes.string
    },
    render:function(){
        return(
            <defs>
                <filter id={this.props.id}>
                    <feOffset dx="0" dy="0"/>
                    <feGaussianBlur is stdDeviation={this.props.stdDeviation} result="offset-blur"/>
                    <feComposite is operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
                    <feFlood is flood-color={this.props.floodColor} flood-opacity={this.props.floodOpacity} result="color"/>
                    <feComposite is operator="in" in="color" in2="inverse" result="shadow"/>
                    <feComposite is operator="over" in="shadow" in2="SourceGraphic"/>
                </filter>
            </defs>
        );
    }


}),

// window.InsetShadow=InsetShadow;


D3Gradient : React.createClass({

    propTypes: {
        id:React.PropTypes.string,
        color1:React.PropTypes.string,
        color2:React.PropTypes.string

    },
    render:function(){
        return(
            <defs>
                <linearGradient is id={this.props.id} x1="0%" y1="100%" x2="0%" y2="0%" spreadMethod="pad">
                    <stop is offset="10%" stop-color={this.props.color1} stop-opacity={.4}/>
                    <stop is offset="80%" stop-color={this.props.color2} stop-opacity={1}/>
                </linearGradient>
            </defs>
        );
    }


})

// window.D3Gradient=Gradient;

}