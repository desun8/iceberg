export const loadRecaptcha = () => {
  if (window.grecaptcha === undefined) {
    const siteKey = "6Lf4h2IbAAAAAEUP39XfYoMe17xWsxuai_kNP5vf";
    const url = "https://www.google.com/recaptcha/api.js?render=";

    const script = document.createElement("script");
    script.src = `${url}${siteKey}`;
    document.head.appendChild(script);
  }
};
