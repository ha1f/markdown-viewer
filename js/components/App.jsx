"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MarkdownView from './MarkdownView.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
    }
    createRequest() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else {
            if (window.ActiveXObject) {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } else {
                return null;
            }
        }
    }
    loadText(path, onLoadHandler) {
        let req = this.createRequest();
        if (!req) {
            return;
        }
        req.onreadystatechange = () => {
            if ((req.readyState == 4) && (req.status == 200)) {
                onLoadHandler(req.responseText);
            }
        };
        req.open("GET", path);
        req.send(null);
    }
    componentDidMount() {
        let target = "./../../NSTaskを非同期で実行する.md";
        // let target = "https://raw.githubusercontent.com/jphacks/KB_1501/master/README.md";
        this.loadText(target, (text) => {
            let title = text.split(/\r\n|\r|\n/, 1)[0];
            this._headerTitle.innerHTML = title;
            this.setState({ content: text.replace(new RegExp(title + "(\r\n|\r|\n)*"), "") });
        });
    }
    render() {
        return (
            <div>
                <div className="toolbar"></div>
                <div className="body-header">
                    <div ref={ (c) => { this._headerTitle = c; } } className="header-title">タイトル</div>
                    <div className="header-text">_ha1fが9月にKobitoから投稿</div>
                </div>
                <MarkdownView content={ this.state.content }></MarkdownView>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react-root')
);
