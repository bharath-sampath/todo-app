export interface Theme {
  name: string;
  properties: any;
}
export const light: Theme = {
  name: "light",
  properties: {
    "--foreground-default": "hsl(235, 19%, 35%)",
    "--foreground-primary":"hsl(236, 9%, 61%)",
    "--foreground-secondary": "hsl(0, 0%, 100%)",
    "--foreground-tertiary":"hsl(236, 33%, 92%)",
    "--background-default": "hsl(0, 0%, 98%)",
    "--background-primary": "linear-gradient(hsl(280, 87%, 65%),hsl(192, 100%, 67%))",
    "--primary-default": "hsl(220, 98%, 61%)",
    "--background-tertiary-shadow": "0 5px 10px 0 rgba(233, 234, 239, 0.75)",
     "--background-image-desktop": "url('/assets/images/bg-desktop-light.jpg')",
    "--background-image-mobile": "url('/assets/images/bg-mobile-light.jpg')",
    "--toggle-image":"url('/assets/images/icon-moon.svg')"
  }
}
export const dark: Theme = {
  name: "dark",
  properties: {
    "--foreground-default": "hsl(234, 39%, 85%)",
    "--foreground-primary":"hsl(234, 11%, 52%)",
    "--foreground-secondary": "hsl(235, 24%, 19%)",
    "--foreground-tertiary":"hsl(237, 14%, 26%)",
    "--background-default": "hsl(235, 21%, 11%)",
    "--background-primary": "linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))",
    "--primary-default": "hsl(220, 98%, 61%)",
    "--background-tertiary-shadow": "none",
    "--background-image-desktop": "url('/assets/images/bg-desktop-dark.jpg')",
    "--background-image-mobile": "url('/assets/images/bg-mobile-dark.jpg')",
    "--toggle-image":"url('/assets/images/icon-sun.svg')",

  }
}
