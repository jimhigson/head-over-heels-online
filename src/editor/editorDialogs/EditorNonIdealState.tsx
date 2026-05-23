import { useState } from "react";

import { BlockyMarkdown } from "../../game/components/BlockyMarkdown";
import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { useAppDispatch } from "../../store/hooks";
import { clearAllData } from "../../store/slices/clearAllData";
import { Button } from "../../ui/Button";
import { ErrorDialog, ErrorDialogReport } from "../../ui/ErrorDialog";
import { type SerialisableError } from "../../utils/redux/createSerialisableErrors";

const markdownIntro = (
  whatCrashed: string,
) => `## Uh-oh! The ${whatCrashed} crashed!
You could:

* Open an [issue on GitHub](https://github.com/jimhigson/head-over-heels-online/issues)
* Email [jim@blockstack.ing](mailto:jim@blockstack.ing)
* Rant on the [Discord server](https://discord.gg/XmV9QNWY)`;

export type EditorNonIdealStateProps = {
  errors: SerialisableError[];
  onDismiss: () => void;
  asDialog?: boolean;
  componentName: string;
};

export const EditorNonIdealState = ({
  errors,
  onDismiss,
  asDialog = false,
  componentName,
}: EditorNonIdealStateProps) => {
  const dispatch = useAppDispatch();
  const [copied, setCopied] = useState(false);

  const WrapperComponent = asDialog ? ErrorDialog : ErrorDialogReport;

  return (
    <WrapperComponent
      errors={errors}
      intro={<BlockyMarkdown markdown={markdownIntro(componentName)} />}
    >
      {(errorsReportText) => (
        <div className="flex gap-1 flex-wrap mt-1">
          <Button
            onClick={() => {
              navigator.clipboard
                .writeText(errorsReportText)
                .then(() => setCopied(true));
            }}
            className="px-1 py-half"
          >
            <BitmapText>{copied ? "Copied" : "Copy error"}</BitmapText>
          </Button>
          <div className="flex-grow" />
          <Button onClick={onDismiss} className="px-1 py-half">
            <BitmapText>Dismiss</BitmapText>
          </Button>
          <Button
            onClick={() => {
              dispatch(clearAllData());
              onDismiss();
            }}
            className="bg-midRed px-1 py-half"
          >
            <BitmapText>Clear all data</BitmapText>
          </Button>
        </div>
      )}
    </WrapperComponent>
  );
};
