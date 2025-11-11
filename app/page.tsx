import Introduction from "@/components/Introduction";
import Navbar from "@/components/Navbar";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col bg-linear-to-b from-background to-background/80">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "mask-[linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
      <Navbar />
      <main className="flex flex-col items-center justify-center px-3 py-24 w-full md:px-4">
        <Introduction />
      </main>
    </div>
  );
}
