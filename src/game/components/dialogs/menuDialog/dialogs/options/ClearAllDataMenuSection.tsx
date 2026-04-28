import { clearAllData } from "../../../../../../store/slices/clearAllData";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { BlockyMarkdown } from "../../../../BlockyMarkdown";
import { optionsHintMarkdownClassname } from "../../../dialogClasses";
import { MenuItem } from "../../MenuItem";

const clearAllDataMarkdown = `##Rest all data

Wipes saved games, key bindings, display and sound preferences, and all other state. **Cannot be undone.**`;

export const ClearAllDataMenuSection = () => (
  <>
    <div className="col-span-3 pb-1 mt-3">
      <BlockyMarkdown
        markdown={clearAllDataMarkdown}
        className={optionsHintMarkdownClassname}
      />
    </div>
    <MenuItem
      hintInline
      className="sprites-double-height"
      verticalAlignItemsCentre
      id="clearAllData"
      label="Reset"
      onSelect={useDispatchActionCallback(clearAllData)}
    />
  </>
);
