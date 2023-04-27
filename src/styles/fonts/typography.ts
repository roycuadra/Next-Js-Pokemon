import { MantineTheme } from "@mantine/core";
import { Karla } from "@next/font/google"

// This isn't a variable font, so we need to set the corresponding weights we need to load
const karla = Karla({
  subsets: ["latin"],
});

const karlaWithWeight = Karla({
  weight: ["700", "500", "400", "300"],
})

const Typography: Partial<MantineTheme> = {
  fontFamily: karla.style.fontFamily,
  fontFamilyMonospace: karlaWithWeight.style.fontFamily,
  headings: {
    fontFamily: karlaWithWeight.style.fontFamily,
    fontWeight: 400,
    sizes: {
      h1: {
        fontSize: "48px",
        fontWeight: 700,
        lineHeight: "54px",
      },
      h2: {
        fontSize: "40px",
        fontWeight: 500,
        lineHeight: "44px",
      },
      h3: {
        fontSize: "32px",
        fontWeight: 400,
        lineHeight: "36px",
      },
      h4: {
        fontSize: "28px",
        fontWeight: 300,
        lineHeight: "32px",
      },
      h5: {
        fontSize: "24px",
        fontWeight: 300,
        lineHeight: "28px",
      },
      h6: {
        fontSize: "20px",
        fontWeight: 300,
        lineHeight: "24px",
      },
    },
  },
  components: {
    Alert: {
      styles: {
        root: {
          fontFamily: karla.style.fontFamily
        },
        message: {
          fontFamily: karla.style.fontFamily,
          fontWeight: 300
        }
      }
    }
  }
};

export default Typography;