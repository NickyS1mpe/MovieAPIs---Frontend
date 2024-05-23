import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";

function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        // Show footer when scrolled to 50px from bottom
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showFooter && (
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Footer Content</Navbar.Brand>
      </Navbar>
    )
  );
}

export default Footer;
