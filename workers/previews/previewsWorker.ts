/**
 * serves pr deploy previews out of the one previews bucket.
 *
 * R2 custom domains bind a host to a bucket's root, so they cannot give a host
 * per pr. This worker does that mapping instead: the first label of the host is
 * the key prefix the preview was uploaded under, so
 * `pr1234-abc1234.blockstack.dev/assets/x.js` serves
 * `pr1234-abc1234/assets/x.js`.
 */

type Env = {
  PREVIEWS: R2Bucket;
};

/** `pr<number>-<sha>`, optionally `ed-` prefixed for the editor's own origin */
const previewHostLabel = /^(?:ed-)?pr\d+-[0-9a-f]{7,40}$/;

const notFound = (body: string) =>
  new Response(body, {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });

const respondWith = (object: R2ObjectBody, status: number) => {
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  return new Response(object.body, { status, headers });
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("method not allowed", {
        status: 405,
        headers: { allow: "GET, HEAD" },
      });
    }

    const url = new URL(request.url);
    const [label] = url.hostname.split(".");

    if (!previewHostLabel.test(label)) {
      return notFound("no such preview");
    }

    // a bare directory path means the app shell, as R2 has no index document
    const path =
      url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname;
    const key = `${label}${path}`;

    const object = await env.PREVIEWS.get(key);
    if (object !== null) {
      return respondWith(object, 200);
    }

    // client-side routes have no object of their own, so fall back to the shell
    // the way the live sites' rewrite rule does. Asset paths must 404 instead,
    // or a missing chunk would arrive as html
    if (/\.[a-z0-9]+$/i.test(path)) {
      return notFound(`not in preview ${label}: ${path}`);
    }

    const shell = await env.PREVIEWS.get(`${label}/index.html`);
    return shell === null ?
        notFound(`no such preview: ${label}`)
      : respondWith(shell, 200);
  },
};
