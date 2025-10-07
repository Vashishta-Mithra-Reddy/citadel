import { Dithering, GrainGradient } from "@paper-design/shaders-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center font-outfit relative">
      <div className="absolute inset-0">
        {/* <Dithering
          colorBack="#00000000"
          colorFront="#6E6E6E"
          shape="dots"
          type="random"
          size={9}
          speed={0.05}
          className="w-full h-full rounded-xl opacity-15"
        /> */}
        {/* <GrainGradient
          colors={["#3d3d3d"]}
          colorBack="#0e0d16"
          softness={0}
          intensity={0.15}
          noise={0.5}
          shape="blob"
          speed={1}
          scale={1.3}
          className="absolute inset-0 w-full h-full"
        /> */}
        <GrainGradient
          colors={["#00bfff", "#2b00ff", "#7300ff"]}
          colorBack="#0e0d16"
          softness={0.8}
          intensity={0}
          noise={0.2}
          shape="blob"
          speed={0.5}
          scale={4}
          className="absolute inset-0 w-full h-full"
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
