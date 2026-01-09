export const Footer = () => {
  return (
    <footer>
      <div className="newsletter">
        <h3>Sigh up for our newsletter</h3>
        <p>
          Don not worry, we reserve our newsletter for important news so we only
          send a few updates a year.
        </p>
        <button className="subscribe-btn">Subscribe</button>
      </div>
      <div className="services">
        <ul>
          <li>
            <a href="#">How does it work</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">FAQS</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Accommodations</a>
          </li>
          <li>
            <a href="#">Experiences</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Give Away</a>
          </li>
          <li>
            <a href="#">Subscribe</a>
          </li>
        </ul>
      </div>

      <div className="copyright">
        <hr />
        <p>© 2022 Justinnmind</p>
        <div className="icons">
          <a href="#">⌚</a>
          <a href="#">✅</a>
          <a href="#">♏</a>
        </div>
      </div>
    </footer>
  );
};
