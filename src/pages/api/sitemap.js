export default async function handler(req, res) {
  const API_URLS = {
    offers: "https://api.offertrunk.com/api/getOffers",
    networks: "https://api.offertrunk.com/api/getNetworks",
    trafficSources: "https://api.offertrunk.com/api/getTrafficSources",
  };

  // Fetch all data
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return data?.data || [];
  };

  const [offers, networks, trafficSources] = await Promise.all([
    fetchData(API_URLS.offers),
    fetchData(API_URLS.networks),
    fetchData(API_URLS.trafficSources),
  ]);

  // Function to create URLs
  const createUrl = (slug, type) => {
    return `<url>
        <loc>https://offer-trunk.vercel.app/${type}/${slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>`;
  };

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://offer-trunk.vercel.app/</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>1.00</priority>
        </url>
        <url>
          <loc>https://offer-trunk.vercel.app/auth/login</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.80</priority>
        </url>
        <url>
          <loc>https://offer-trunk.vercel.app/auth/register</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.80</priority>
        </url>
        ${offers
          .map((offer) =>
            createUrl(offer.name.toLowerCase().replace(/\s+/g, "-"), "offer")
          )
          .join("\n")}
        ${networks
          .map((network) =>
            createUrl(
              network.name.toLowerCase().replace(/\s+/g, "-"),
              "network"
            )
          )
          .join("\n")}
        ${trafficSources
          .map((traffic) =>
            createUrl(
              traffic.name.toLowerCase().replace(/\s+/g, "-"),
              "traffic"
            )
          )
          .join("\n")}
      </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}
