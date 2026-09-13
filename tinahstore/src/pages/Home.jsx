import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/icons/Icon.jsx';
import SEO from '../components/common/SEO.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import { WhiskeyIllustration, GinIllustration, VodkaIllustration, WineIllustration } from '../assets/illustrations/index.js';
import { useProducts } from '../hooks/useProducts.js';

const categories = [
  ['Whiskey', 'Single malts & blends', WhiskeyIllustration],
  ['Gin', 'Botanical & refreshing', GinIllustration],
  ['Vodka', 'Premium & smooth', VodkaIllustration],
  ['Wine', 'Red, white & sparkling', WineIllustration],
];

const contactLinks = [
  { label: 'Gmail', value: 'orders@hardvendor.co.ke', href: 'mailto:orders@hardvendor.co.ke', icon: 'mail' },
  { label: 'Phone', value: '+254 726 911 763', href: 'tel:+254717272726', icon: 'phone' },
  { label: 'WhatsApp', value: 'Order on WhatsApp', href: 'https://wa.me/254717272726', icon: 'whatsapp' },
  { label: 'TikTok', value: '@hardvendor', href: 'https://www.tiktok.com/@hardvendor', icon: 'tiktok' },
];

export default function Home() {
  const { products, isLoading } = useProducts({ ordering: '-created_at' });
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HardVendor",
    "url": "https://hardvendor.store",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hardvendor.store/shop?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HardVendor",
    "url": "https://hardvendor.store",
    "logo": "https://hardvendor.store/favicon.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254-726-911-763",
      "contactType": "customer service",
      "areaServed": "KE",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://www.tiktok.com/@hardvendor"
    ]
  };

  return (
    <>
      <SEO
        schemaData={[homeSchema, orgSchema]}
      />
      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <p className="eyebrow">Karatina University's Fastest Delivery</p>
            <h1 className="h1">Premium liquor, delivered in 15 mins.</h1>
            <p className="lede">Your favorite spirits, chilled and ready to pour. Delivered to your doorstep within Karatina University Main Campus faster than you can find a glass.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">Browse Collection</Link>
              <a href="#about" className="btn btn-outline">Our Promise</a>
            </div>
          </div>
          <div className="hero-art">
            <div className="ring"></div>
            <WhiskeyIllustration color="#0D3B36" detailed />
            <div className="hero-tag">
              <div className="tline">15 Mins</div>
              <div>Doorstep Delivery</div>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="container trust-grid">
          {[
            ['clock', '15-min delivery', 'Karatina University'],
            ['shield', 'Original Brands', '100% Authentic'],
            ['ice', 'Chilled Delivery', 'Ready to serve'],
            ['refresh', 'Easy Re-orders', 'WhatsApp support'],
          ].map(([icon, title, copy]) => (
            <div className="trust-item" key={title}><Icon name={icon} className="icon icon-lg" /><div><strong>{title}</strong><span>{copy}</span></div></div>
          ))}
        </div>
      </div>

      <section>
        <div className="container">
          <div className="section-head"><div><p className="eyebrow">Explore</p><h2 className="h2">Shop by Category</h2></div></div>
          <div className="cat-grid">
            {categories.map(([name, copy, Art]) => (
              <Link to={`/shop?category=${name.toLowerCase()}`} className="cat-card" key={name}>
                <div className="art"><Art color="#0D3B36" /></div>
                <h3>{name}</h3>
                <span className="muted" style={{ fontSize: 13 }}>{copy}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="container">
          <div className="section-head">
            <div><p className="eyebrow">Trending Now</p><h2 className="h2">Top Shelf Favorites</h2></div>
            <Link to="/shop" className="view-all">View all <Icon name="arrowRight" className="icon icon-sm" /></Link>
          </div>
          <div className="product-grid">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton-card" style={{ height: 400, background: '#eee', borderRadius: 8 }}></div>)
            ) : (
              products.slice(0, 4).map((product) => <ProductCard product={product} quickAdd key={product.id} />)
            )}
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="story about-story">
            <div>
              <p className="eyebrow">About HardVendor</p>
              <h2 className="h2" style={{ marginBottom: 20 }}>More than a store. It's a service.</h2>
              <p className="lede" style={{ marginBottom: 20 }}>HardVendor was founded on a simple idea: you shouldn't have to wait for a great drink. We've optimized our logistics to ensure that your favorite premium liquor reaches you in under 15 minutes within Karatina University Main Campus, chilled and ready to enjoy.</p>
              <div className="about-points">
                <div><strong>Campus Wide</strong><span>Reaching you anywhere within Karatina University Main Campus, fast.</span></div>
                <div><strong>Curated Selection</strong><span>We only stock the finest spirits, ensuring every bottle is top-shelf quality.</span></div>
                <div><strong>Seamless Checkout</strong><span>Pay instantly with M-PESA for a frictionless experience.</span></div>
              </div>
              <div className="hero-actions">
                <Link to="/shop" className="btn btn-primary">Shop Spirits</Link>
                <a href="#contact" className="btn btn-outline">Get in touch</a>
              </div>
            </div>
            <div className="art about-panel">
              <WhiskeyIllustration color="#0D3B36" detailed />
              <div className="about-stats">
                <div><strong>15 Mins</strong><span>Delivery Time</span></div>
                <div><strong>24/7</strong><span>Support Available</span></div>
                <div><strong>Premium</strong><span>Brands Only</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
        <div className="container">
          <div className="section-head"><div><p className="eyebrow">The Experience</p><h2 className="h2">What our customers say</h2></div></div>
          <div className="testi-grid">
            {['Arrived in exactly 12 minutes at Kagochi. The bottle was perfectly chilled. Best service on campus!', 'Found a rare bottle of whiskey here that I couldn\'t find anywhere else. Delivery was incredibly fast.', 'Hosting a room party and ran out of gin. HardVendor saved the night in less than 15 minutes.'].map((quote, index) => (
              <div className="testi-card" key={quote}>
                <div className="rating">
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, i) => <Icon name="star" key={i} className="star-active" />)}
                  </div>
                </div>
                <p>"{quote}"</p>
                <footer>{['Kamau W. - Kagochi', 'Sarah M. - Main Campus', 'David O. - Hostels'][index]}</footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="h2">Need a recommendation or help with an order?</h2>
              <p className="lede">Reach out to our team for spirits advice, large order support, or delivery updates.</p>
            </div>
            <div className="contact-grid">
              {contactLinks.map((item) => (
                <a className="contact-card" href={item.href} key={item.label} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
                  <span className="contact-icon"><Icon name={item.icon} /></span>
                  <span>
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="newsletter">
      <div className="container">
        <p className="eyebrow">Stay close</p>
        <h2 className="h2">Access to Rare Drops & Events</h2>
        <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          {!submitted && <div className="newsletter-row"><input type="email" placeholder="you@email.com" required /><button className="btn btn-primary" type="submit">Subscribe</button></div>}
        </form>
        <div className={`newsletter-success ${submitted ? 'show' : ''}`}><Icon name="checkCircle" /> You're on the list for rare drops.</div>
        <p className="newsletter-fine">No spam, just exclusive access to the finest bottles.</p>
      </div>
    </section>
  );
}
