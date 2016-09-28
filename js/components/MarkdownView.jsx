
import React from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

export default class MarkdownView extends React.Component {
    componentDidUpdate() {
        let blocks = document.querySelectorAll("pre code");
        blocks.forEach( (block) => {
            hljs.highlightBlock(block);
        });
    }
    componentDidMount() {
        marked.setOptions({
            langPrefix: '',
            gfm: true,
            tables: true
        });
    }
    render() {
        return (
            <div className="markdown-content" dangerouslySetInnerHTML={{__html: marked(this.props.content)}}>
            </div>
        );
    }
}
