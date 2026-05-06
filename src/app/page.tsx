import data from "@/data/data.json";
import type { Data } from "@/data/types";
import { Cover, Volume, Timeline, Heatmap } from "@/components/sections-a";
import { ILoveYouSlide, Emojis, Words } from "@/components/sections-b";
import { Response, Quirks, Media, Bookends, Finale } from "@/components/sections-c";

const typedData = data as Data;

export default function Page() {
  return (
    <>
      <main>
        <Cover data={typedData} />
        <Volume data={typedData} />
        <Timeline data={typedData} />
        <Heatmap data={typedData} />
        <ILoveYouSlide data={typedData} />
        <Words data={typedData} />
        <Emojis data={typedData} />
        <Response data={typedData} />
        <Quirks data={typedData} />
        <Media data={typedData} />
        <Bookends data={typedData} />
        <Finale data={typedData} />
      </main>
      <footer>made with love · may 2026</footer>
    </>
  );
}
