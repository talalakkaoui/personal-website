export interface ColorPalette {
  name: string;
  description: string;
  colors: [number, number, number][];
}

export const cherryBlossomDream: ColorPalette = {
  name: "Cherry Blossom Dream",
  description:
    "Rich berry tones and blush pinks evoke cherry blossoms in full bloom, delivering feelings of romance, freshness, and gentle awakening.",
  colors: [
    [136, 13, 30],
    [221, 45, 74],
    [242, 106, 141],
    [244, 156, 187],
  ],
};

export const mysteriousMidnightMagic: ColorPalette = {
  name: "Mysterious Midnight Magic",
  description:
    "Lavender blue, dusky violet, moody indigo, and starlit midnight create a mysterious, enchanting night sky filled with depth and wonder.",
  colors: [
    [44, 42, 74],
    [79, 81, 140],
    [144, 122, 214],
    [218, 191, 255],
  ],
};

export const peachyCoralGlow: ColorPalette = {
  name: "Peachy Coral Glow",
  description:
    "Juicy peach and blushed coral melt into sun-toasted orange, bringing bright, friendly warmth and the inviting glow of a summer afternoon.",
  colors: [
    [242, 112, 89],
    [244, 132, 95],
    [247, 157, 101],
    [247, 178, 103],
  ],
};

export const jungleGreenBliss: ColorPalette = {
  name: "Jungle Green Bliss",
  description:
    "Lush emerald and vibrant greens burst into the vitality of thriving jungles, rich growth, and the soothing hush of wild tranquility.",
  colors: [
    [7, 59, 58],
    [11, 110, 79],
    [8, 160, 69],
    [107, 191, 89],
  ],
};

export const cozyCoffeeShop: ColorPalette = {
  name: "Cozy Coffee Shop",
  description:
    "Toasted browns, creamy beige, and gentle blush create a snug and welcoming space, brimming with warmth, comfort, and casual sophistication.",
  colors: [
    [107, 75, 62],
    [196, 158, 133],
    [255, 214, 175],
    [248, 244, 249],
  ],
};

export const palettes = [
  cherryBlossomDream,
  mysteriousMidnightMagic,
  peachyCoralGlow,
  jungleGreenBliss,
  cozyCoffeeShop,
];
