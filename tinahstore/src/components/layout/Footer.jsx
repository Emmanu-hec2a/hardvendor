import { Link } from 'react-router-dom';
import Icon from '../icons/Icon.jsx';

export default function Footer({ compact = false }) {
  if (compact) {
    return (
      <footer className="site-footer">
        <div className="container footer-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
          <span>© 2026 HardVendor. All rights reserved.</span>
          <div className="contact-line" style={{ margin: 0 }}><Icon name="mail" className="icon icon-sm" /> Need help? hello@hardvendor.co.ke</div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer" id="footer-contact">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo">Hard<span>Vendor</span></Link>
          <p>Premium liquor delivered to your doorstep within Karatina University Main Campus in under 15 minutes. Original brands, chilled, and ready to pour.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram"><Icon name="instagram" /></a>
            <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
            <a href="#" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          {['Whiskey', 'Gin', 'Vodka', 'Wine & Champagne', 'Rare Drops'].map((item) => <Link to="/shop" key={item}>{item}</Link>)}
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          {['Track an order', 'Shipping & returns', 'Cocktail Recipes', 'FAQs'].map((item) => <a href="#" key={item}>{item}</a>)}
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <div className="contact-line"><Icon name="mapPin" className="icon icon-sm" /> Karatina University Main Campus, Nyeri</div>
          <div className="contact-line"><Icon name="phone" className="icon icon-sm" /> +254 726 911 763</div>
          <div className="contact-line"><Icon name="mail" className="icon icon-sm" /> petniqueke@gmail.com</div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 HardVendor. All rights reserved.</span>
        <div className="pay-icons">
          <span className="pay-chip">M-PESA</span>
          <span className="pay-chip">AIRTEL</span>
          <span className="pay-chip">PAYPAL</span>
        </div>
      </div>
    </footer>
  );
}
