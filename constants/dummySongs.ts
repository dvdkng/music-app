export type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
};

export const dummySongs: Song[] = [
  {
    id: "1",
    title: "Rainy Day",
    artist: "Lo-Fi Chill",
    duration: "2:31",
  },
  {
    id: "2",
    title: "Sunset Drive",
    artist: "Synthwave",
    duration: "3:45",
  },
  {
    id: "3",
    title: "Ocean Breeze",
    artist: "Chillwave",
    duration: "4:00",
  },
  {
    id: "4",
    title: "Summer Nights",
    artist: "Electronic Beats",
    duration: "3:15",
  },
];
