import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check for mobile device
    const checkMobileDevice = () => {
      setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    };

    // Run the check on mount
    checkMobileDevice();

    // Optionally, add a listener to handle screen resizing or changes
    window.addEventListener("resize", checkMobileDevice);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener("resize", checkMobileDevice);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
