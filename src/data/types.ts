export type Data = {
  meta: {
    sophie: string;
    tucker: string;
    startDate: string;
    endDate: string;
    days: number;
  };
  volume: {
    total: number;
    sophie: number;
    tucker: number;
    photos: { sophie: number; tucker: number };
    videos: { sophie: number; tucker: number };
    links: { sophie: number; tucker: number };
  };
  timeline: { m: string; c: number; note?: string }[];
  heatmap: number[][];
  iLoveYou: {
    total: number;
    sophie: number;
    tucker: number;
    firstSaid: { who: string; date: string; days: number };
  };
  emojis: {
    sophie: { e: string; n: number }[];
    tucker: { e: string; n: number }[];
  };
  topWords: {
    sophie: { w: string; n: number }[];
    tucker: { w: string; n: number }[];
  };
  insideJokes: { phrase: string; n: number }[];
  language: {
    avgLen: { sophie: number; tucker: number };
    vocab: { sophie: number; tucker: number };
    oneWord: { sophie: number; tucker: number };
    questions: { sophie: number; tucker: number };
    exclamations: { sophie: number; tucker: number };
  };
  response: {
    avgMin: { sophie: number; tucker: number };
    firstText: { sophie: number; tucker: number };
    longestGap: { hours: number; who: string; reason: string };
    doubleTexts: { sophie: number; tucker: number };
  };
  quirks: {
    sorry: { sophie: number; tucker: number };
    swears: { sophie: number; tucker: number };
    compliments: { sophie: number; tucker: number };
    goodMornings: { total: number; sophie: number; tucker: number };
    goodNights: { total: number; sophie: number; tucker: number };
  };
  bookends: {
    first: { from: string; date: string; text: string };
    recent: { from: string; date: string; text: string };
  };
};
