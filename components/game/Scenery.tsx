'use client';

import { forwardRef } from 'react';

/*
  Parallax backdrop: tiled pixel-art SVGs on fixed layers. Game.tsx moves each
  layer by scrollY * speed (modulo the tile height) so they repeat forever.
*/

// build pixel art from a string grid: '#' = filled cell
function pixels(grid: string[], x0: number, y0: number, px: number, fill: string) {
  let out = '';
  grid.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c === '#') out += `<rect x="${x0 + x * px}" y="${y0 + y * px}" width="${px}" height="${px}" fill="${fill}"/>`;
    }),
  );
  return out;
}

const CLOUD = ['...####....', '..######...', '.#########.', '###########', '.#########.'];
const PINE = ['...#...', '..###..', '.#####.', '..###..', '.#####.', '#######', '...#...', '...#...'];
const ROCK = ['..###.', '.#####', '######'];
const STAR = ['.#.', '###', '.#.'];

const svg = (w: number, h: number, body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' shape-rendering='crispEdges'>${body}</svg>`)}")`;

export const TILE_FAR = 900;
export const TILE_NEAR = 1100;

const FAR = svg(
  700,
  TILE_FAR,
  pixels(CLOUD, 40, 80, 8, '#1d2248') +
    pixels(CLOUD, 470, 330, 10, '#191d3f') +
    pixels(CLOUD, 180, 600, 7, '#1d2248') +
    pixels(STAR, 380, 60, 3, '#3b4380') +
    pixels(STAR, 620, 520, 3, '#3b4380') +
    pixels(STAR, 90, 420, 3, '#343b72') +
    pixels(STAR, 300, 800, 3, '#3b4380'),
);

const SIDE_L = svg(
  150,
  TILE_NEAR,
  pixels(PINE, 20, 60, 10, '#16203a') +
    pixels(PINE, 80, 140, 7, '#131b33') +
    pixels(ROCK, 30, 420, 9, '#1a1f3d') +
    pixels(PINE, 50, 640, 12, '#16203a') +
    pixels(PINE, 10, 900, 8, '#131b33'),
);

const SIDE_R = svg(
  150,
  TILE_NEAR,
  pixels(PINE, 60, 250, 11, '#16203a') +
    pixels(ROCK, 40, 520, 8, '#1a1f3d') +
    pixels(PINE, 20, 760, 8, '#131b33') +
    pixels(PINE, 80, 820, 6, '#16203a') +
    pixels(ROCK, 70, 1040, 7, '#1a1f3d'),
);

const Scenery = forwardRef<HTMLDivElement>(function Scenery(_, ref) {
  return (
    <div ref={ref} className="scenery" aria-hidden>
      <div className="scene-layer scene-far" data-speed="0.12" data-tile={TILE_FAR} style={{ backgroundImage: FAR }} />
      <div
        className="scene-layer scene-side scene-left"
        data-speed="0.45"
        data-tile={TILE_NEAR}
        style={{ backgroundImage: SIDE_L }}
      />
      <div
        className="scene-layer scene-side scene-right"
        data-speed="0.45"
        data-tile={TILE_NEAR}
        style={{ backgroundImage: SIDE_R }}
      />
    </div>
  );
});

export default Scenery;
