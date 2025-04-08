import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Stop being soft—get rowdy or get lost!",
        1000,
        "Speak loud, act wild, own the room!",
        2000,
        "Drop the manners, bring the madness",
        1000,
        "Talk like a storm, walk like a riot.",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
