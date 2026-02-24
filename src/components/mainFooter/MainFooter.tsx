import styles from "./MainFooter.module.css";
import { SendHorizontal } from "lucide-react";

const MainFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* LEFT */}
        <div className={styles.about}>
          <p>
            This is a community-driven marketplace. We don’t hold or
            sell inventory. All items are listed by independent
            sellers.
          </p>

          <div className={styles.subscribe}>
            <input placeholder="Your Email" />
            <button>
              <SendHorizontal size={18}  />
            </button>
          </div>
        </div>

        {/* MIDDLE */}
        <div className={styles.links}>
          <h4>Home</h4>
          <ul>
            <li>About Us</li>
            <li>How it Works</li>
            <li>Careers</li>
            <li>Selling</li>
            <li>Buying</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className={styles.links}>
          <h4>Customer Support</h4>
          <ul>
            <li>Complaint Center</li>
            <li>Dealing Partners</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Trust and Safety</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;







