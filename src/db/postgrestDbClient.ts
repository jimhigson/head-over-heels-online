import type {
  CampaignDbClient,
  DbFunctionReturns,
  RpcError,
} from "./CampaignDbClient";
import { supabaseAnonKey, supabaseUrl } from "./supabaseEnvironmentVariables";

/**
 * minimal, anonymous-access, rpc-only client for the game build: posts straight to
 * PostgREST's `/rpc/<function>` endpoint, without bundling any supabase client.
 * The headers match what supabase-js sends when no user is logged in.
 *
 * Not used by the editor, which needs saving, logging in, etc
 */
export const postgrestDbClient: CampaignDbClient = {
  async rpc(functionName, args) {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${functionName}`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    if (!response.ok) {
      return { data: null, error: await rpcErrorOfResponse(response) };
    }
    return {
      // successful bodies are the function's return value, as json
      data: (await response.json()) as DbFunctionReturns<typeof functionName>,
      error: null,
    };
  },
};

/**
 * PostgREST errors are json, but a gateway in front of it (eg a 502) may
 * respond with html or plain text
 */
const rpcErrorOfResponse = async (response: Response): Promise<RpcError> => {
  const responseText = await response.text();
  try {
    return JSON.parse(responseText) as RpcError;
  } catch {
    return {
      message: responseText || response.statusText,
      code: String(response.status),
      details: null,
      hint: null,
    };
  }
};
