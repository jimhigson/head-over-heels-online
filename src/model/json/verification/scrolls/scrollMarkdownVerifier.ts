import { withHeadingSpaceAdded } from "../../../../utils/markdown/headingsMissingSpace";
import { replaceMarkdownImageTextureClass } from "../../../../utils/markdown/markdownImageTextureClasses";
import { octantIndexOfDirection } from "../../../../utils/vectors/octantIndexOfDirection";
import {
  directionIndexXy8,
  directionsXy8,
  type DirectionXy8,
} from "../../../../utils/vectors/vectors";
import type {
  CampaignVerificationIssue,
  CampaignVerifier,
} from "../CampaignVerification";
import { itemIdMd, valueMd } from "../helpers/messageMarkdown";
import type {
  VerificationCampaign,
  VerificationRoomId,
  VerificationRoomItemId,
} from "../verificationTypes";
import { inlineScrolls, withInlineScrollMarkdownMapped } from "./inlineScrolls";
import { knownImageTextureClassNames } from "./knownImageTextureClassNames";
import { type MarkdownProblem, markdownValid } from "./markdownValid";

type ScrollMarkdownProblem = {
  roomId: VerificationRoomId;
  itemId: VerificationRoomItemId;
  problem: MarkdownProblem;
};

const isDirectionXy8 = (name: string): name is DirectionXy8 =>
  name in directionIndexXy8;

/**
 * a direction name as one part of a texture class - longest names first, so
 * eg `awayLeft` is never read as `away`
 */
const directionNamePartRegex = new RegExp(
  `_(${directionsXy8
    .toSorted((a, b) => b.length - a.length)
    .join("|")})(?=_|$)`,
  "g",
);

/**
 * the texture class with its direction names (`_left`, `_towards`...) given
 * as octant numbers (`_d0`, `_d6`...), as textures are named
 */
const textureClassWithOctantNumbers = (textureClass: string): string =>
  textureClass.replaceAll(directionNamePartRegex, (part, direction: string) =>
    isDirectionXy8(direction) ? `_d${octantIndexOfDirection(direction)}` : part,
  );

/**
 * the known texture class an unknown one can be changed to, if any
 */
const replacementTextureClass = (textureClass: string): string | undefined => {
  const withOctantNumbers = textureClassWithOctantNumbers(textureClass);
  return knownImageTextureClassNames.has(withOctantNumbers) ? withOctantNumbers
    : undefined;
};

/**
 * the order a scroll's problems are fixed in, by type - a heading fix finds
 * its line by its text, which an image fix can change
 */
const fixOrderOfProblemType = {
  headingMissingSpace: 0,
  unknownImageTexture: 1,
} as const satisfies Record<MarkdownProblem["type"], number>;

/**
 * each problem in a scroll's markdown once, however many times it is
 * repeated, in an order they can all be fixed in turn
 */
const distinctProblems = (markdowns: readonly string[]): MarkdownProblem[] =>
  new Map(
    markdowns
      .values()
      .flatMap(markdownValid)
      // problems are plain, flat objects, so equal ones stringify the same
      .map((problem): [string, MarkdownProblem] => [
        JSON.stringify(problem),
        problem,
      ]),
  )
    .values()
    .toArray()
    .sort(
      (a, b) => fixOrderOfProblemType[a.type] - fixOrderOfProblemType[b.type],
    );

const describeProblem = ({
  roomId,
  itemId,
  problem,
}: ScrollMarkdownProblem): Pick<
  CampaignVerificationIssue<ScrollMarkdownProblem>,
  "fixable" | "fixText" | "msg"
> => {
  const scrollMd = `Scroll ‘${itemIdMd(itemId)}’ in ‘${valueMd(roomId)}’`;
  const scrollText = `scroll ‘${itemId}’ in ‘${roomId}’`;
  switch (problem.type) {
    case "headingMissingSpace":
      return {
        msg: `${scrollMd} shows ${valueMd(problem.heading)} as text: a heading needs a space after its #s`,
        fixable: true,
        fixText: `Add a space after the #s of ‘${problem.heading}’ in ${scrollText}`,
      };
    case "unknownImageTexture": {
      const replacement = replacementTextureClass(problem.textureClass);
      return {
        msg: `${scrollMd} has an image of ${valueMd(problem.textureClass)}, which is not a texture`,
        fixable: replacement !== undefined,
        fixText:
          replacement !== undefined ?
            `Change image ‘${problem.textureClass}’ to ‘${replacement}’ in ${scrollText}`
          : `No texture is like ‘${problem.textureClass}’ - change the image to a texture that exists`,
      };
    }
    default:
      problem satisfies never;
      throw new Error(`unknown markdown problem ${JSON.stringify(problem)}`);
  }
};

const fixedMarkdown = (
  problem: MarkdownProblem,
): ((markdown: string) => string) => {
  switch (problem.type) {
    case "headingMissingSpace":
      return (markdown) => withHeadingSpaceAdded(markdown, problem.heading);
    case "unknownImageTexture": {
      const replacement = replacementTextureClass(problem.textureClass);
      if (replacement === undefined) {
        throw new Error(
          `cannot auto-fix image ‘${problem.textureClass}’: no texture is like it`,
        );
      }
      return (markdown) =>
        replaceMarkdownImageTextureClass(
          markdown,
          problem.textureClass,
          replacement,
        );
    }
    default:
      problem satisfies never;
      throw new Error(`unknown markdown problem ${JSON.stringify(problem)}`);
  }
};

/**
 * a scroll whose markdown the game can't show as it is meant - see
 * {@link MarkdownProblem}
 */
export const scrollMarkdownVerifier: CampaignVerifier<ScrollMarkdownProblem> = {
  name: "Scroll markdown",
  *check(campaign) {
    for (const { roomId, itemId, markdowns } of inlineScrolls(campaign)) {
      for (const problem of distinctProblems(markdowns)) {
        const issueData = { roomId, itemId, problem };
        yield {
          severity: "warning",
          roomId,
          itemIds: [itemId],
          ...describeProblem(issueData),
          issueData,
          verifier: scrollMarkdownVerifier,
        };
      }
    }
  },
  fix(
    campaign: VerificationCampaign,
    { roomId, itemId, problem }: ScrollMarkdownProblem,
  ) {
    return withInlineScrollMarkdownMapped(
      campaign,
      roomId,
      itemId,
      fixedMarkdown(problem),
    );
  },
};
