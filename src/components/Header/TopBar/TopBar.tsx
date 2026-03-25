import { useRef, useState, useContext, useEffect } from "react";
import styles from "./Topbar.module.css";
import LogoIcon from "../../../assets/icons/pngs/logo.png"; // replace path if needed
import SearchIcon from "../../../assets/icons/pngs/search.png"; // replace
import { useNavigate } from "react-router-dom";
import { MoveRight, ArrowUpRight, Bell, Heart, MessageCircle } from "lucide-react";

/** Auth Context */
import { AuthContext } from "../../../contexts/auth/auth.context";
import type { GetSuggestionsResponse } from "../../../types/api";

import useSuggestions from "../../../hooks/server/product/useSuggestions";


const TopBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [searchSuggestions,setSearchSuggestions] = useState<GetSuggestionsResponse[] | []>([]);
  const [deBouncedQuery,setDeBouncedQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const suggestionMuatation = useSuggestions();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect( () => {
    if(query !== ""){
      const timer = setTimeout( () => setDeBouncedQuery(query),200);
      return () => clearTimeout(timer);
    }
  }, [query]);

  useEffect( () => {
    if(deBouncedQuery !== null){
      suggestionMuatation.mutate(deBouncedQuery,{
        onSuccess:(res) => {
          if(res.statusCode === 200 && res.success === true){
            setSearchSuggestions(res.data);
          }
        }
      })
    }
  }, [deBouncedQuery])

  /* HANDLE SEARCH (MAIN FUNCTION) */
  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    navigate(`/catalog?q=${encodeURIComponent(value)}`);
    setOpen(false);
  };

  const filteredSuggestions = searchSuggestions && searchSuggestions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
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

              {suggestionMuatation.isPending && (<div id={styles.suggestionId} className={styles.suggestionItem}><div className="loader"></div></div>)}
              {!suggestionMuatation.isPending && filteredSuggestions.map((item, index) => (
                <div
                  key={index}
                  className={styles.suggestionItem}
                  onClick={() => {
                    setQuery(item.title);
                    handleSearch(item.title);
                  }}
                >
                  <span>{item.title}</span>
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
            <button className={styles.iconBtn} onClick={ () => navigate("/notifications")}>
              <Bell size={18} />
              <span className={styles.notificationDot}>1</span>
            </button>

            <button onClick={ () => navigate("/favourites")} className={styles.iconBtn}>
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