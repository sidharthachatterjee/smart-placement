export async function onRequest(context) {
  const { env, request } = context;
  const init = {
    headers: {
      Authorization: `Bearer ${env.TOKEN}`,
    },
  };
  const resp = await fetch(
    "https://us1-healthy-man-39212.upstash.io/incr/count",
    init
  );
  const resp2 = await fetch(
    "https://us1-healthy-man-39212.upstash.io/incr/count",
    init
  );
  const eyeballColo = request.cf.colo;
  const currentColo = await getCurrentColo();

  return new Response(
    `Hit Upstash in us-west-1 2 times. Eyeball colo: ${eyeballColo}, Function colo: ${currentColo}`
  );
}

export async function getCurrentColo() {
  const res = await fetch("https://cloudflare.com/cdn-cgi/trace");
  const text = await res.text();
  const coloIdx = text.indexOf("colo=");
  const colo = text.substring(coloIdx + 5, text.indexOf("\n", coloIdx));

  return colo;
}
