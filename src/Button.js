import React from "react";

export default class Button extends React.Component{
    render(){
        let uname="hah";
        let name = `${uname} hello world`;
        return <button disabled type="button">{{name}}</button>
    }
}