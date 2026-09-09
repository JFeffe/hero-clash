import assert from "node:assert/strict";
import {
  BASTION_SCENES,
  sceneForFloor,
  loadScene,
  drawBastionBackdrop,
} from "../docs/bastion.js";
for (const [floor, id] of [
  [1, "lower"],
  [5, "lower"],
  [6, "middle"],
  [10, "middle"],
  [11, "upper"],
  [14, "upper"],
  [15, "summit"],
])
  assert.equal(sceneForFloor(floor).id, id);
for (const value of [undefined, null, NaN, "broken", -10])
  assert.equal(sceneForFloor(value).id, "lower");
assert.equal(sceneForFloor(99).id, "summit");
assert.equal(BASTION_SCENES.length, 4);
assert.equal(await loadScene(15), false);
assert.equal(drawBastionBackdrop({}, 720, 400, 15), false);
// Test landscape and narrow combat canvases without deforming architecture.
const requests = [];
globalThis.Image = class {
  naturalWidth = 1200;
  naturalHeight = 800;
  set src(value) {
    requests.push(value);
    queueMicrotask(() => this.onload());
  }
};
await Promise.all([loadScene(15), loadScene(15)]);
assert.equal(requests.length, 1);
const calls = [],
  ctx = { drawImage: (...args) => calls.push(args) };
assert.equal(drawBastionBackdrop(ctx, 720, 400, 15), true);
assert.deepEqual(calls[0].slice(1), [0, 0, 720, 480]);
assert.equal(drawBastionBackdrop(ctx, 540, 400, 15), true);
assert.deepEqual(calls[1].slice(1), [-30, 0, 600, 400]);
assert(requests[0].endsWith("/assets/bastion/summit.webp"));
// Failed loads remain cached: animation frames cannot create a request storm.
let failedRequests = 0;
globalThis.Image = class {
  set src(value) {
    failedRequests++;
    queueMicrotask(() => this.onerror());
  }
};
assert.equal(await loadScene(6), false);
assert.equal(drawBastionBackdrop({}, 720, 400, 6), false);
assert.equal(await loadScene(6), false);
assert.equal(failedRequests, 1);
delete globalThis.Image;
console.log(
  "Four floor bands, cached loading, missing-image fallback and undistorted desktop/mobile framing verified.",
);
