import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
export declare class ListService {
    static listTitle: string;
    private spfi;
    constructor(spfi: SPFI);
    ensureListItem(listItemTitle: string): Promise<any>;
    ensureListExists(): Promise<void>;
    /**
     * Creates a SharePoint list.
     * @param listTitle The title of the list to create.
     * @param description The description of the list.
     * @returns Promise<void>
     */
    private createList;
}
//# sourceMappingURL=listService.d.ts.map