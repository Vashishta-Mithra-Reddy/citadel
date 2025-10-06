import { Dithering, GrainGradient } from "@paper-design/shaders-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center font-outfit relative">
      <div className="absolute inset-0">
        <Dithering
          colorBack="#00000000"
          colorFront="#6E6E6E"
          shape="dots"
          type="random"
          size={9}
          speed={0.05}
          className="w-full h-full rounded-xl opacity-15"
        />
        {/* <GrainGradient
          colors={["#700000", "#0080ff", "#f2ebca"]}
          colorBack="#0a0000"
          softness={1}
          intensity={1}
          noise={0}
          shape="dots"
          speed={1}
          scale={0.4}
          className="w-full h-full rounded-xl"
        /> */}
      </div>
      {children}
    </div>
  );
}
