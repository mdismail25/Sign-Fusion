export const YES = (ref) => {
    let animations = [];

    // Initial pose: Hand near chin
    animations.push(["mixamorigRightForeArm", "rotation", "x", Math.PI/5, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", Math.PI/5, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", -Math.PI/6, "-"]);
    ref.animations.push(animations);

    animations = [];
    // Move outward
    animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI/3, "+"]);
    ref.animations.push(animations);

    animations = [];
    // Default pose from home.js
    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "z", 0, "+"]);
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigLeftForeArm", "rotation", "y", -Math.PI/1.5, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "y", Math.PI/1.5, "+"]);
    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
};