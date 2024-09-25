const url = process.env.NEXT_PUBLIC_BASE_URL;

module.exports = {
  contentful: {
    space_id: process.env.CONTENTFUL_SPACE_ID || '',
    cda_token: process.env.CONTENTFUL_ACCESS_TOKEN || '',
    cpa_token: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || '',
  },
  meta: {
    title: 'Rooted Community',
    description: `We are a grassroots collective of BIPOC community organizers, cultural workers, and volunteers who are, respectively, formerly incarcerated, family members, and/or system impacted folks who are invested in organizing efforts committed to abolition.  ${url
      .replace('https://', '')
      .replace('http://', '')}`,
    url,
    image:
      'https://images.ctfassets.net/xfft4jkhgxwt/4hID0fg1acCAi4WLQGqm0U/83c1172bad023a651217d154ddf49334/meta-image.jpg',
  },
  icon: {
    light:
      'https://images.ctfassets.net/w8vf7dk7f259/llZXwDCnl9NqdyuVvjn1n/d20cea90225e7f53dfbf8a18a46e972d/gocoin-icon-light.svg',
    dark: 'https://images.ctfassets.net/w8vf7dk7f259/i9iu6GU6dFWQJJwJzwxCT/952cc3bab415e28f521c22933072a09c/gocoin-icon.svg',
    width: 66,
    height: 64,
  },
};
