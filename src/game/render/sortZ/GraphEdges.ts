import { type Graph } from "../../../utils/graph/Graph";

export type ZGraph<NodeId> = Graph<
  NodeId,
  // in a BackFrontGraph, the Edge is the boolean status of if the link has
  // been broken for cyclic dependencies
  boolean
>;
