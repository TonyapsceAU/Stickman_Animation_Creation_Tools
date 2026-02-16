## 3D Actor Pose Editor & Choreographer

A custom p5.js WEBGL tool for designing, exporting, and choreographing 3D character poses with real-time HUD feedback.

---

### 🚀 How to Use

**1. Navigating the Editor**

* **Orbit Control:** Click and drag the mouse to rotate the camera.
* **Edit Mode (I):** Toggle global manual vector tweaking.
* **Image Mode (L):** Toggle reference image manipulation.
* **Cycle Joints ([ / ]):** Switch between bones (Head, Chest, etc.).

**2. Editing & Exporting Poses**
When Edit Mode is active, use the following keys:

* **W / S**: Move Forward / Backward (Z-axis)
* **A / D**: Move Left / Right (X-axis)
* **Q / E**: Move Up / Down (Y-axis)
* **F / G**: Step Size Inc / Dec (Adjust precision)
* **R**: Rotate Reference Image (90° increments)
* **ENTER**: Export Full Pose (Copy JSON to console)
* **P**: Export Partial Pose (Copy only edited joints)

---

### 🛠 Adding to Pose Library

To save an exported pose permanently:

1. Open **src/PoseLibrary.js**.
2. Add a new key to the **PoseLib** object.
3. Paste the exported vector data into the return object.

**Example Entry:**
"BREATHING": (val) => {
let cycle = sin(val);
return {
chest: createVector(0, 0.9 + (cycle * 0.01), 0.4 + (cycle * 0.02)),
neck:  createVector(0, 0.8, 0.6)
};
}

---

### 🎭 Choreography: Sequencing Actions

To add commands in **src/Choreography.js**:

1. **Define a Trigger:** Add a condition inside the update loop.
2. **Apply Pose:** Call myActor.applyPose() using a library pose.
3. **Blend:** Use lerpPose for smooth transitions.

**Example Logic:**
if (isWaiting) {
let pose = PoseLib["BREATHING"](frameCount * 0.05);
myActor.applyPose(pose);
}

---

### 📂 Project Structure

* **mySketch.js**: Entry point (Setup/Draw).
* **src/Actor.js**: Character class logic.
* **src/HUD.js**: 2D Interface and instructions.
* **src/PoseLibrary.js**: Saved pose data.
* **src/editor/**: Config, Camera, and Control modules.
* **assets/images/**: Reference PNG files.
