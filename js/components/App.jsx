"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import MarkdownView from './MarkdownView.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: ''
        };
    }
    handleClick() {
        const newUri = this._input.value;
        location.href = `?filepath=${encodeURIComponent(newUri)}`
    }
    componentDidMount() {
        if (this.props.location.query.filepath) {
            this.setState({ uri: this.props.location.query.filepath });
        }
    }
    render() {
        //
        if (this.state.uri != '') {
            return (
                <MarkdownPage target={this.state.uri}></MarkdownPage>
            );
        } else {
            return (
                <div>
                    <input ref={ (c) => { this._input = c; } } type="text" size="40" />
                    <input type="button" value="表示" onClick={this.handleClick.bind(this)} />
                </div>
            )
        }
    }
}

class MarkdownPage extends React.Component {
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
    setTitle(title) {
        this._headerTitle.innerHTML = title;
    }
    componentDidMount() {
        let target = this.props.target;
        this.loadText(target, (text) => {
            let title = text.split(/\r\n|\r|\n/, 1)[0];
            this.setTitle(title);
            let res = (title[0] == '#') ? text : text.replace(new RegExp(title + "(\r\n|\r|\n)*"), "");
            this.setState({ content: res });
        });
    }
    componentWillReceiveProps(nextProps) {
        let target = this.props.target;
        this.loadText(taget, (text) => {
            let title = text.split(/\r\n|\r|\n/, 1)[0];
            this.setTitle(title);
            let res = (title[0] == '#') ? text : text.replace(new RegExp(title + "(\r\n|\r|\n)*"), "");
            this.setState({ content: res });
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
    <Router history={browserHistory}>
        <Route path="/" component={ App }>
            <Route path="markdown-viewer" component={ App } />
            <Route path="*" component={ App } />
        </Route>
  </Router>,
    document.getElementById('react-root')
);
