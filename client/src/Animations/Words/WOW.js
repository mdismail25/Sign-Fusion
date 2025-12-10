export const WOW = (ref) => {
    let animations = [];

    // === Position arms naturally close to chest ===
    animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 6, "-"]);
    animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "-"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "x", -Math.PI / 3, "-"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", -Math.PI / 3, "-"]);

    // === Make palms straight vertical (90°) ===
    animations.push(["mixamorigLeftHand", "rotation", "z", Math.PI / 2, "+"]);   // Left palm upright
    animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 2, "-"]); // Right palm upright

    // === Keep all fingers straight ===
    ["Index", "Middle", "Ring", "Pinky"].forEach(finger => {
        for (let i = 1; i <= 3; i++) {
            animations.push([`mixamorigLeftHand${finger}${i}`, "rotation", "x", 0, "+"]);
            animations.push([`mixamorigRightHand${finger}${i}`, "rotation", "x", 0, "+"]);
        }
    });

    // Slight thumb adjustment so palms touch
    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", -Math.PI / 6, "-"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", -Math.PI / 6, "-"]);

    ref.animations.push(animations);

    // === Reset to default ===
    animations = [];
    animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);

    animations.push(["mixamorigLeftForeArm", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightForeArm", "rotation", "x", 0, "+"]);

    animations.push(["mixamorigLeftHand", "rotation", "z", 0, "-"]);
    animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);

    ["Index", "Middle", "Ring", "Pinky"].forEach(finger => {
        for (let i = 1; i <= 3; i++) {
            animations.push([`mixamorigLeftHand${finger}${i}`, "rotation", "x", 0, "+"]);
            animations.push([`mixamorigRightHand${finger}${i}`, "rotation", "x", 0, "+"]);
        }
    });

    animations.push(["mixamorigLeftHandThumb1", "rotation", "x", 0, "+"]);
    animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "+"]);

    ref.animations.push(animations);

    if (ref.pending === false) {
        ref.pending = true;
        ref.animate();
    }
};
