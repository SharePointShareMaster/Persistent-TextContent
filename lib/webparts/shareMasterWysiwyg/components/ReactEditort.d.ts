import * as React from 'react';
import { EditorPlugin, UndoService } from 'roosterjs-editor-core';
import { DefaultFormat } from 'roosterjs-editor-types';
import { EditorViewState } from 'roosterjs-react';
export interface ReactEditorProps {
    viewState: EditorViewState;
    className?: string;
    plugins?: EditorPlugin[];
    updateViewState?: (viewState: EditorViewState, content: string, isInitializing: boolean) => void;
    undo?: UndoService;
    isRtl?: boolean;
    hyperlinkToolTipCallback?: (href: string) => string;
    defaultFormat?: DefaultFormat;
    onBlur?: (ev: React.FocusEvent<HTMLDivElement>) => void;
}
export default class ReactEditor extends React.Component<ReactEditorProps, {}> {
    private contentDiv;
    private editor;
    private updateViewStateWhenUnmount;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateContentToViewState(isInitializing?: boolean): void;
    setUpdateViewStateWhenUnmount(updateViewStateWhenUnmount: boolean): void;
    private getEditorOptions;
    private updateViewState;
    private onBlur;
    private onContentDivRef;
}
//# sourceMappingURL=ReactEditort.d.ts.map