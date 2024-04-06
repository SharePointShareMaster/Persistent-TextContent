import * as React from 'react';
// import styles from './ShareMasterWysiwyg.module.scss';
import type { IShareMasterWysiwygProps } from './IShareMasterWysiwygProps';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import './sunedit.css';
import { ListService } from '../../services/listService';

export default class ShareMasterWysiwyg extends React.Component<IShareMasterWysiwygProps, {
  edit: boolean,
  listItem: any
}> {

  private _sunEditor: any;

  constructor(props: IShareMasterWysiwygProps) {
    super(props);

    this.state = {
      edit: false,
      listItem: props.listItem
    };

    this.onEdit = this.onEdit.bind(this);
    this.getSunEditorInstance = this.getSunEditorInstance.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  private onEdit(): void {
    this.setState({ edit: !this.state.edit });
  }

  private getSunEditorInstance(sunEditor: any) {
    this._sunEditor = sunEditor;
    console.log(sunEditor);

    sunEditor.setContents(this.state.listItem.Content);

    sunEditor.onBlur = this.onBlur;
  };

  private async onBlur() {
    if (!this._sunEditor.readOnly()) {
      await this.props.spfi.web.lists.getByTitle(ListService.listTitle).items.getById(this.state.listItem.ID).update({
        Content: this._sunEditor.getContents()
      });

    }
  }


  public render(): React.ReactElement<IShareMasterWysiwygProps> {



    return (
      <div className={!this.props.editMode ? "se-readOnly" : ""}>
        <SunEditor
          hideToolbar={!this.props.editMode}
          readOnly={!this.props.editMode}

          getSunEditorInstance={this.getSunEditorInstance}
          setOptions={{
            showPathLabel: true,
            defaultStyle: `font-family: 'Segoe UI', Arial, sans-serif; font-size: 18px;`,
            font: ['Segoe UI', 'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Times New Roman', 'Courier New'], // Add Segoe UI as the first option
            buttonList: [
              ['undo', 'redo'],
              ['font', 'fontSize', 'formatBlock'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              '/', // Line break
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'table'],
              ['link', 'image', 'video', 'audio'],
              ['fullScreen', 'showBlocks', 'codeView', 'preview']
            ]
          }}

        />
      </div>
    );
  }
}
