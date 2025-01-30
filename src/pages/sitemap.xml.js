export async function getServerSideProps({ res }) {
  const response = await fetch("https://api.offertrunk.com/api/getOffers");
  const offers = await response.json();

  const urls = offers
    .map(
      (offer) =>
        `<url><loc>https://api.offertrunk.com/api/getOffers/offer/${offer.slug}</loc></url>`
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://api.offertrunk.com/api/getOffers/</loc></url>
        ${urls}
      </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
