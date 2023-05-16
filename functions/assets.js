export async function onRequest(context) {
  const { env } = context;
  return env.ASSETS.fetch("https://example.com/");
}
