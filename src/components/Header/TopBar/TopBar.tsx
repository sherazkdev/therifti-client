import { useRef, useState, useContext } from "react";
import styles from "./Topbar.module.css";
import LogoIcon from "../../../assets/icons/logo.png";
import SearchIcon from "../../../assets/icons/search.png";
import { useNavigate } from "react-router-dom";
import { MoveRight, ArrowUpRight, Bell, Heart, MessageCircle } from "lucide-react";

/** Auth Context */
import { AuthContext } from "../../../contexts/auth/auth.context";

const MOCK_SUGGESTIONS = [
  "mens clothes",
  "men’s clothing",
  "men’s walking boots",
  "mens fleece jacket",
  "men’s shorts summer",
  "mens denim jacket",
  "men’s canvas jacket",
  "men’s trucker cap",
  "men's winter jacket",
  "mens faux leather jacket",
];

const TopBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  /* HANDLE SEARCH (MAIN FUNCTION) */
  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    navigate(`/search?q=${encodeURIComponent(value)}`);
    setOpen(false);
  };

  const filteredSuggestions = MOCK_SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.topBar}>
      {/* LEFT SIDE */}
      <div className={styles.topLeft}>
        <img
          src={LogoIcon}
          alt="Logo"
          className={styles.logo}
          onClick={() => navigate("/")}
        />

        {/* SEARCH */}
        <div className={styles.searchWrapper} ref={wrapperRef}>
          <img src={SearchIcon} alt="Search" className={styles.searchIcon} />

          <input
            className={styles.searchInput}
            placeholder='Search in "Men & clothing & shirts"'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(query);
              }
            }}
            onFocus={() => query && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
          />

          {/* SUGGESTIONS */}
          {open && query && (
            <div className={styles.suggestionBox}>
              {filteredSuggestions.map((item, index) => (
                <div
                  key={index}
                  className={styles.suggestionItem}
                  onClick={() => {
                    setQuery(item);
                    handleSearch(item);
                  }}
                >
                  <span>{item}</span>
                  <ArrowUpRight size={16} className={styles.suggestionArrow} />
                </div>
              ))}

              {/* SEARCH ALL */}
              <div
                className={styles.searchAll}
                onClick={() => handleSearch(query)}
              >
                Search "<strong>{query}</strong>"
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.topRight}>
        {!isAuthenticated ? (
          <>
            <button
              type="button"
              className={styles.signIn}
              onClick={() => navigate("/login")}
            >
              <span className={styles.btnText}>Sign in</span>
              <MoveRight size={16} className={styles.btnIcon} />
            </button>

            <button
              type="button"
              className={styles.startSelling}
              onClick={() => navigate("/sell")}
            >
              Start Selling
            </button>
          </>
        ) : (
          <>
            <button className={styles.iconBtn}>
              <Bell size={18} />
              <span className={styles.notificationDot}>1</span>
            </button>

            <button className={styles.iconBtn}>
              <Heart size={18} />
            </button>

            <button
              className={styles.iconBtn}
              onClick={() => navigate("/inbox")}
            >
              <MessageCircle size={18} />
            </button>

            <div className={styles.profileWrapper}>
              <button
                className={styles.profileBtn}
                onClick={() => setProfileOpen((p) => !p)}
              >
                M
              </button>

              {profileOpen && (
                <div className={styles.profileMenu}>
                  <div className={styles.menuItem}>My Profile</div>
                  <div className={styles.menuItem}>Settings</div>
                  <div className={styles.menuItem}>Personalizations</div>
                  <div className={styles.menuItem}>Balance</div>
                  <div className={styles.menuItem}>My orders</div>
                  <div className={styles.menuItem}>Donations</div>
                  <div className={styles.menuItem}>Invite friends</div>
                  <div className={styles.menuDivider} />
                  <div className={styles.menuItem}>Logout</div>
                </div>
              )}
            </div>

            <button
              className={styles.sellNowBtn}
              onClick={() => navigate("/sell")}
            >
              Sell Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;