import { type Database } from "../_generated/db";

type DbFunctions = Database["public"]["Functions"];

export type DbFunctionName = keyof DbFunctions;

/**
 * overloaded functions also list an argument-less variant as `Args: never`,
 * which is dropped so the args with parameters are what calls are checked against
 */
export type DbFunctionArgs<FunctionName extends DbFunctionName> = Exclude<
  DbFunctions[FunctionName],
  { Args: never }
>["Args"];

export type DbFunctionReturns<FunctionName extends DbFunctionName> =
  DbFunctions[FunctionName]["Returns"];

/**
 * the error body PostgREST responds with on failure
 */
export type RpcError = {
  message: string;
  code: string;
  details: null | string;
  hint: null | string;
};

export type RpcResponse<Returns> =
  { data: null; error: RpcError } | { data: Returns; error: null };

/**
 * the subset of client the campaign db functions need: calling database
 * functions. Satisfied structurally both by the full supabase client (authed -
 * the editor) and by the rpc-only anonymous client (the game)
 */
export type CampaignDbClient = {
  rpc: <FunctionName extends DbFunctionName>(
    functionName: FunctionName,
    args: DbFunctionArgs<FunctionName>,
  ) => PromiseLike<RpcResponse<DbFunctionReturns<FunctionName>>>;
};
