var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { Editor } from 'roosterjs-editor-core';
import { HtmlSanitizer } from 'roosterjs-html-sanitizer';
import { ContentEdit, HyperLink, Paste } from 'roosterjs-editor-plugins';
var ReactEditor = /** @class */ (function (_super) {
    __extends(ReactEditor, _super);
    function ReactEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onBlur = function (ev) {
            _this.updateContentToViewState();
            if (_this.props.onBlur) {
                _this.props.onBlur(ev);
            }
        };
        _this.onContentDivRef = function (ref) {
            _this.contentDiv = ref;
        };
        return _this;
    }
    ReactEditor.prototype.render = function () {
        var _a = this.props, className = _a.className, isRtl = _a.isRtl;
        return React.createElement("div", { dir: isRtl ? 'rtl' : 'ltr', className: className, onBlur: this.onBlur, ref: this.onContentDivRef });
    };
    ReactEditor.prototype.componentDidMount = function () {
        this.editor = new Editor(this.contentDiv, this.getEditorOptions());
        this.updateViewStateWhenUnmount = true;
        this.updateContentToViewState(true /*isInitializing*/);
    };
    ReactEditor.prototype.componentWillUnmount = function () {
        if (this.updateViewStateWhenUnmount) {
            this.updateContentToViewState();
            this.updateViewStateWhenUnmount = false;
        }
        this.editor.dispose();
        this.editor = null;
    };
    ReactEditor.prototype.updateContentToViewState = function (isInitializing) {
        if (this.editor) {
            var updateViewState = this.props.updateViewState || this.updateViewState;
            updateViewState(this.props.viewState, this.editor.getContent(), isInitializing);
        }
    };
    ReactEditor.prototype.setUpdateViewStateWhenUnmount = function (updateViewStateWhenUnmount) {
        this.updateViewStateWhenUnmount = updateViewStateWhenUnmount;
    };
    ReactEditor.prototype.getEditorOptions = function () {
        var _a = this.props, plugins = _a.plugins, viewState = _a.viewState, undo = _a.undo, hyperlinkToolTipCallback = _a.hyperlinkToolTipCallback, defaultFormat = _a.defaultFormat;
        var allPlugins = [new ContentEdit(), new HyperLink(hyperlinkToolTipCallback), new Paste(true /*useDirectPaste*/)];
        if (plugins) {
            allPlugins = allPlugins.concat(plugins);
        }
        var initialContent = HtmlSanitizer.convertInlineCss(viewState.content);
        var options = {
            plugins: allPlugins,
            defaultFormat: defaultFormat,
            undo: undo,
            initialContent: initialContent
        };
        return options;
    };
    ReactEditor.prototype.updateViewState = function (viewState, content, isInitializing) {
        if (viewState.content != content) {
            viewState.content = content;
            if (!isInitializing) {
                viewState.isDirty = true;
            }
        }
    };
    return ReactEditor;
}(React.Component));
export default ReactEditor;
//# sourceMappingURL=ReactEditort.js.map