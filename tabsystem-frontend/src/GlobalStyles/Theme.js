import { theme } from "@chakra-ui/core";

const tabtheme = {
  ...theme,
  colors: {
    ...theme.colors,
    //space cadet (purple color)
    first100: "#222E50",
    first200: "#1F2947",
    first300: "#192139",

    //Blue Sapphire (blue color)
    second100: "#0088A3",
    second200: "#00778F",
    second300: "#00667A",

    //Illuminating Emerald (teal color)
    third100: "#4BAA94",
    third200: "#449C88",
    third300: "#3E8E7B",

    //Hunter green (green color)
    fourth100: "#44744D",
    fourth200: "#3C6744",
    fourth300: "#355A3C",

    //Gold (Gold color)
    fifth100: "#BEA423",
    fifth200: "#AC9520",
    fifth300: "#9B861C",
  },
};

export default tabtheme;
