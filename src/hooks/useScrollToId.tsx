import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// [CHORE] - Read more about <ScrollRestoration /> component in react-router-dom v6.24.0 to replace this
const useScrollToId = () => {
  const { hash, search } = useLocation();

  useEffect(() => {
    if (hash) {
      console.log(hash.substring(1).split("?")[0]);
      const elementId = hash.substring(1).split("?")[0];
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [search, hash]);
};

export default useScrollToId;
