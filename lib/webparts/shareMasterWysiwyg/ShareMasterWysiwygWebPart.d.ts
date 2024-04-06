import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IShareMasterWysiwygWebPartProps {
    listItemId: string;
}
export default class ShareMasterWysiwygWebPart extends BaseClientSideWebPart<IShareMasterWysiwygWebPartProps> {
    private _spfi;
    private _listService;
    private _listItem;
    constructor();
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ShareMasterWysiwygWebPart.d.ts.map