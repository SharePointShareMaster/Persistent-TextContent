import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {  SPFI } from "@pnp/sp";

import ShareMasterWysiwyg from './components/ShareMasterWysiwyg';
import { IShareMasterWysiwygProps } from './components/IShareMasterWysiwygProps';
import { getSP } from '../../pnpjsConfig';
import { ListService } from '../services/listService';

export interface IShareMasterWysiwygWebPartProps {
  listItemId: string
}

export default class ShareMasterWysiwygWebPart extends BaseClientSideWebPart<IShareMasterWysiwygWebPartProps> {
  private _spfi: SPFI;
  private _listService: ListService;
  private _listItem:any;

  constructor(){
    super();
  }

  protected async onInit(): Promise<void> {
    this._spfi = getSP(this.context, true);
    this._listService = new ListService(this._spfi);

    await this._listService.ensureListExists();
    this._listItem = await this._listService.ensureListItem(this.instanceId);
    
  }

  

  public render(): void {
    const element: React.ReactElement<IShareMasterWysiwygProps> = React.createElement(
      ShareMasterWysiwyg,
      {
        listItemId: this.instanceId,
        spfi: this._spfi,
        listItem: this._listItem,
        editMode: this.displayMode == 2
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "No Configuration necessary"
          },
          groups: [
          ]
        }
      ]
    };
  }
}
