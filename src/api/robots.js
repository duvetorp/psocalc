export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.send(`User-agent: *
  Disallow: /private/
  Allow: /
  Sitemap: https://psoriasis-react-74176ad4b40a.herokuapp.com/sitemap.xml`);
}
