// Tell IndexNow search engines (Bing, Yandex, Seznam, Naver) that pages changed.
// Bing's index powers ChatGPT search and Copilot, so this is the fastest way to
// get updates in front of them. Run after a deploy:
//   node scripts/indexnow.mjs            # submit every URL in the live sitemap
//   node scripts/indexnow.mjs /locations/augusta-mall /services   # specific paths
const KEY = "6a9cb9439bd6e0e43a263113daceb61d"
const HOST = "mobilecareusa.com"
const SITE = `https://${HOST}`

async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

const args = process.argv.slice(2)
const urlList = args.length > 0 ? args.map((p) => new URL(p, SITE).href) : await sitemapUrls()

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
})
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`)
if (!res.ok) process.exitCode = 1
