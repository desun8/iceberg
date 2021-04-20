// <script src="https://www.google.com/recaptcha/api.js?render=6LeDFv8ZAAAAADvO8QeneqiQyoJE0f9UOIRvt8uG"></script>
// TODO: Переделать
import SmoothScrollbar from "smooth-scrollbar";

declare global {
  interface Window {
    grecaptcha: any;
    APP: {
      scrollbar: SmoothScrollbar | undefined
    }
  }
}

export const loadRecaptcha = () => {
  if (window.grecaptcha === undefined) {
    const siteKey = "6LeDFv8ZAAAAADvO8QeneqiQyoJE0f9UOIRvt8uG";
    const url = "https://www.google.com/recaptcha/api.js?render=";

    const script = document.createElement("script");
    script.src = `${url}${siteKey}`;
    document.head.appendChild(script);
  }
}
