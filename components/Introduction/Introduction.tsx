import TerminalAnimation from "./TerminalAnimation";
import Information from "./Information";

const Introduction = () => {
  return (
    <div className="mx-auto grid w-full flex-1 grid-cols-1 place-items-center gap-12 text-center xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:items-start xl:justify-items-start xl:text-left">
      <Information />
      <TerminalAnimation />
    </div>
  );
};

export default Introduction;
