
import React from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

export default class MarkdownView extends React.Component {
    constructor(props) {
        super(props);
        this._markedRenderer = new marked.Renderer;
        this._highlight = (code, lang, callback) => {
            return hljs.highlight(lang ? lang : 'sh', code).value;
        }
    }
    componentDidMount() {
        marked.setOptions({
            langPrefix: '',
            gfm: true,
            tables: true,
            highlight: this._highlight,
            renderer: this._markedRenderer
        });
        this._markedRenderer.code = function(code, fileInfo, escaped) {
            // 参考: http://qiita.com/59naga/items/7d46155715416561aa60
            const delimiter = ':';
            let info = fileInfo ? fileInfo.split(delimiter) : [];
            const lang = info.shift();
            const fileName = info.join(delimiter);
            const fileTag = fileName != '' || lang ? `<code class="filename">${fileName != '' ? fileName : lang}</code>` : ''

            if (this.options.highlight) {
                let out = this.options.highlight(code, lang);
                if (out != null/* && out !== code*/) {
                    escaped = true;
                    code = out;
                }
            }

            let escapedCode = escaped ? code : escape(code, true);
            let className = `${lang ? this.options.langPrefix + escape(lang, true) : ''} hljs ${fileTag != '' ? 'named' : ''}`;
            return `<pre>${fileTag}<code class="${className}">${escapedCode}\n</code></pre>`;
        };
    }
    render() {
        return (
            <div className="markdown-content" dangerouslySetInnerHTML={{__html: marked(this.props.content)}}>
            </div>
        );
    }
}
