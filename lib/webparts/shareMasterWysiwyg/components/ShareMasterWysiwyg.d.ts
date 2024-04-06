import * as React from 'react';
import type { IShareMasterWysiwygProps } from './IShareMasterWysiwygProps';
import 'suneditor/dist/css/suneditor.min.css';
import './sunedit.css';
export default class ShareMasterWysiwyg extends React.Component<IShareMasterWysiwygProps, {
    edit: boolean;
    listItem: any;
}> {
    private _sunEditor;
    constructor(props: IShareMasterWysiwygProps);
    private onEdit;
    private getSunEditorInstance;
    private onBlur;
    render(): React.ReactElement<IShareMasterWysiwygProps>;
}
//# sourceMappingURL=ShareMasterWysiwyg.d.ts.map