// keeps one deploy-preview comment per pr, rewriting it on each push rather
// than adding another. Found by the marker html comment the body opens with
const marker = "<!-- deploy-preview -->";

module.exports = async ({ github, context, body }) => {
  const { owner, repo } = context.repo;
  const issue_number = context.payload.pull_request.number;

  const comments = await github.paginate(github.rest.issues.listComments, {
    owner,
    repo,
    issue_number,
  });
  const existing = comments.find(
    (comment) =>
      comment.user.type === "Bot" && comment.body?.startsWith(marker),
  );

  if (existing) {
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existing.id,
      body,
    });
    return;
  }

  await github.rest.issues.createComment({ owner, repo, issue_number, body });
};
