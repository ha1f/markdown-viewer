markdown-viewer

## 概要
指定したuriに存在するmarkdownファイルを読み込み・表示

## ライブラリ

- React.js
- marked.js
- hilight.js


## 流れ

1. 指定したURIに存在するmarkdownをXMLHttpRequestで取得、markedでhtmlに変換
1. コード部分はhighlight.jsでハイライト
1. 表示

## 表示サンプル

```swift:ViewController.swift
class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // some comment
    }
}
```

```javascript
import React from 'react';

export default class MarkdownView extends React.Component {
    render() {
        return (
            <div className="markdown-content"></div>
        );
    }
}
```

```html:index.html
<body>
    <script>alert(1);</script>
</body>
```

```python:main.py
class Some(object):
    @staticmethod
    def hoge():
        print("hoge")
    def fuga(self):
        Some.hoge()
```
