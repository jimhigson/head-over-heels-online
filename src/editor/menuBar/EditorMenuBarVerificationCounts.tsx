import { store } from "../../store/store";
import { showVerifyIssuesThunk } from "../toolbar/showVerifyIssuesThunk";
import { useVerificationCounts } from "../verify/useVerifyCampaign";

type VerificationCountProps = {
  count: number;
  /**
   * what is being counted, eg "error"
   */
  noun: string;
  class: string;
};

/**
 * one count, opening the verification issues when clicked
 */
const VerificationCount = ({
  count,
  noun,
  class: className,
}: VerificationCountProps) =>
  count > 0 && (
    <button
      type="button"
      class={`text-single-line whitespace-nowrap pl-1 hover:text-white ${className}`}
      title={`${count} ${noun}${count === 1 ? "" : "s"}`}
      onClick={() => store.dispatch(showVerifyIssuesThunk())}
    >
      {count}
    </button>
  );

/**
 * how many errors and warnings the open campaign's verification found
 */
export const EditorMenuBarVerificationCounts = () => {
  const { errors: errorCount, warnings: warningCount } =
    useVerificationCounts();

  return (
    <>
      <VerificationCount count={errorCount} noun="error" class="text-midRed" />
      <VerificationCount
        count={warningCount}
        noun="warning"
        class="text-highlightBeige"
      />
    </>
  );
};
