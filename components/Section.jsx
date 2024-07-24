import { useRef } from "react";
import gsap from "gsap";
import { InView } from "react-intersection-observer";

const Section = ({ children }) => {
  const divRef = useRef(null);

  return (
    <InView className="w-full h-[100vh] px-[30px] flex flex-col text-center items-center justify-center"
      threshold={0.4}
      onChange={(isInView) => {
        if (isInView)
          gsap.to(divRef.current, { duration: 2, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: '0px' });
        else
          gsap.to(divRef.current, { duration: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', y: '-50px' });
      }}
    >
      <div ref={divRef} className="w-full flex justify-center items-center text-center">
        {children}
      </div>
    </InView>
  )
}

export default Section