
import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";


export class ListService {

    public static listTitle = "SM WSIWYG Content";

    private spfi: SPFI;

    constructor(spfi: SPFI) {
        this.spfi = spfi;
    }

    public async ensureListItem(listItemTitle: string): Promise<any> {
        try {

            var listItems = await this.spfi.web.lists.getByTitle(ListService.listTitle).items.filter(`Title eq '${listItemTitle}'`)();

            if (listItems == null || listItems.length == 0) {
                await this.spfi.web.lists.getByTitle(ListService.listTitle).items.add({
                    Title: listItemTitle
                });

                var listItems = await this.spfi.web.lists.getByTitle(ListService.listTitle).items.filter(`Title eq '${listItemTitle}'`)();
                return listItems[0];
            } else {
                return listItems[0];
            }

        } catch (error) {

            console.log(`Error creatign list Item "${listItemTitle}"...`);

        }

    }

    public async ensureListExists(): Promise<void> {

        try {
            // Attempt to get the list, which will throw an error if it doesn't exist
            await this.spfi.web.lists.getByTitle(ListService.listTitle)();
            console.log(`List "${ListService.listTitle}" already exists.`);
        } catch (error) {
            // If the list doesn't exist, create it
            console.log(`Creating list "${ListService.listTitle}"...`);
            await this.createList(ListService.listTitle);
        }
    }

    /**
     * Creates a SharePoint list.
     * @param listTitle The title of the list to create.
     * @param description The description of the list.
     * @returns Promise<void>
     */
    private async createList(listTitle: string): Promise<void> {
        try {
            var description = "ShareMaster WYSIWYG addon";
            const createListResult = await this.spfi.web.lists.add(listTitle, description, 100, false);
            await createListResult.list.fields.addMultilineText("Content", { NumberOfLines: 1000, RichText: false, RestrictedMode: false, AppendOnly: false, AllowHyperlink: true });
        } catch (error) {
            console.error(`Error creating list "${listTitle}":`, error);
        }
    }
}