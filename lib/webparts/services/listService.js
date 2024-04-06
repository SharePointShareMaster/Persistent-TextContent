var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
var ListService = /** @class */ (function () {
    function ListService(spfi) {
        this.spfi = spfi;
    }
    ListService.prototype.ensureListItem = function (listItemTitle) {
        return __awaiter(this, void 0, void 0, function () {
            var listItems, listItems, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.spfi.web.lists.getByTitle(ListService.listTitle).items.filter("Title eq '".concat(listItemTitle, "'"))()];
                    case 1:
                        listItems = _a.sent();
                        if (!(listItems == null || listItems.length == 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.spfi.web.lists.getByTitle(ListService.listTitle).items.add({
                                Title: listItemTitle
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.spfi.web.lists.getByTitle(ListService.listTitle).items.filter("Title eq '".concat(listItemTitle, "'"))()];
                    case 3:
                        listItems = _a.sent();
                        return [2 /*return*/, listItems[0]];
                    case 4: return [2 /*return*/, listItems[0]];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.log("Error creatign list Item \"".concat(listItemTitle, "\"..."));
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ListService.prototype.ensureListExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        // Attempt to get the list, which will throw an error if it doesn't exist
                        return [4 /*yield*/, this.spfi.web.lists.getByTitle(ListService.listTitle)()];
                    case 1:
                        // Attempt to get the list, which will throw an error if it doesn't exist
                        _a.sent();
                        console.log("List \"".concat(ListService.listTitle, "\" already exists."));
                        return [3 /*break*/, 4];
                    case 2:
                        error_2 = _a.sent();
                        // If the list doesn't exist, create it
                        console.log("Creating list \"".concat(ListService.listTitle, "\"..."));
                        return [4 /*yield*/, this.createList(ListService.listTitle)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a SharePoint list.
     * @param listTitle The title of the list to create.
     * @param description The description of the list.
     * @returns Promise<void>
     */
    ListService.prototype.createList = function (listTitle) {
        return __awaiter(this, void 0, void 0, function () {
            var description, createListResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        description = "ShareMaster WYSIWYG addon";
                        return [4 /*yield*/, this.spfi.web.lists.add(listTitle, description, 100, false)];
                    case 1:
                        createListResult = _a.sent();
                        return [4 /*yield*/, createListResult.list.fields.addMultilineText("Content", { NumberOfLines: 1000, RichText: false, RestrictedMode: false, AppendOnly: false, AllowHyperlink: true })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error creating list \"".concat(listTitle, "\":"), error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ListService.listTitle = "SM WSIWYG Content";
    return ListService;
}());
export { ListService };
//# sourceMappingURL=listService.js.map