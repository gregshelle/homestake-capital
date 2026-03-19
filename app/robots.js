export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://website-build-ivory.vercel.app/sitemap.xml',
  };
}
