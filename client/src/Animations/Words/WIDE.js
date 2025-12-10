export const WIDE = (ref) => {
  let animations = [];

  animations.push(["mixamorigLeftArm", "rotation", "x", Math.PI / 6, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI / 6, "+"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", -Math.PI / 1.8, "-"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 1.8, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", Math.PI / 6, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI / 6, "-"]);

  const fingers = ["Index", "Middle", "Ring", "Pinky"];
  fingers.forEach((finger) => {
    [1, 2, 3].forEach((joint) => {
      animations.push([`mixamorigLeftHand${finger}${joint}`, "rotation", "z", 0, "+"]);
      animations.push([`mixamorigRightHand${finger}${joint}`, "rotation", "z", 0, "+"]);
    });
  });

  animations.push(["mixamorigLeftHandThumb1", "rotation", "y", -Math.PI / 8, "-"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "y", Math.PI / 8, "+"]);

  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigLeftHandThumb1", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "y", 0, "-"]);

  ref.animations.push(animations);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};