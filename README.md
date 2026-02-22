# Stickman Animation Creation Tools ：火柴人動畫創作工具

## Vector Aim 3D: 高動態向量驅動動畫引擎

> **「當火柴人的流暢動感遇上 3D 空間的精確控制。」**  
> *(Place your AERIAL_CLEAVE or HOP_BACKWARD demo GIF here)*

---

## 1. 專案簡介 (Introduction)

### 開發初衷與目標

本專案深受 Hyun's Dojo 的火柴人戰鬥動畫啟發。  
我們旨在開發一個輕量級、基於程式碼驅動的 3D 動畫環境，在跳脫傳統 3D 軟體沉重負擔的同時，獲得對骨骼向量與道具物理極致的控制權。

**核心目標：**  
讓動畫師能以最直觀的「向量指向」邏輯，快速編排具備衝擊力與流暢度的 3D 動作。

---

## 2. 技術細節 (Technical Details)

### 系統架構

本引擎基於自定義的 **向量驅動骨架系統 (Vector-Driven Skeleton)**。  
不同於傳統的歐拉角旋轉（容易產生萬向鎖問題），本系統直接操作標準化向量來定義關節朝向，確保動畫插值過程平滑無死角。

- **Core Library:** https://p5js.org/  
- **Renderer:** WebGL (3D Mode)

#### 技術特點

- **空間坐標系**
  - X → 左  
  - Y → 下（重力方向）  
  - Z → 後  

- **Interpolation Logic**
  - Vector-based Linear Interpolation (Lerp)
  - Dynamic Lerp Speed Supported

---

### 檔案結構 (Project Structure)

```text
├── assets/
│   ├── SourceCodePro-Bold.otf
│   └── image/
├── index.html
├── mySketch.js
└── scr/
    ├── Actor.js
    ├── Choreography.js
    ├── HUD.js
    ├── PoseLibrary.js
    ├── Prop_ATTACHED.js
    ├── Reference_Image.js
    └── editor/
        ├── editor_camera.js
        ├── editor_config.js
        ├── editor_control.js
        └── editor_display.js
```

---

## 3. 動畫製作流程 (Workflow)

1. **Stage Setup**
   - Define 3D scene via code

2. **Prop Configuration**
   - Use `Prop_ATTACHED` to create weapons or tools

3. **Actor Initialization**
   - Setup Actor instance and initial vPose

4. **Reference Import**
   - Load motion reference images into WebGL space

5. **Choreography**

   - Reference Image Positioning  
   - Joint Vector Editing  
   - Actor Translation  
   - Prop Direction Adjustment  
   - Prop Offset Editing  
   - HUD Data Export  
   - Store into `poselib.js`  
   - Connect in `Choreography.js`

---

## 4. HUD Controls

- HUD Control Panel → Bottom Right  
- Press `TAB` → Toggle HUD  
- Press `V` → Switch Mode:
  - Joint Mode
  - Position Mode
  - Reference Mode
  - Prop Mode

---

## 5. Future Plans

### UI & Feature Enhancement

- Multi Actor Support (`M` to Switch)
- Built-in Prop / Stage Modeling
- Runtime Reference Image Loader
- One-click Frame Export
- Auto Pose Naming & Storage

---

### Pose Library Modularization

| Module | Content |
|--------|--------|
| FullBody.js | Idle / Sitting |
| Locomotion.js | Walk / Run |
| Combat.js | Attack / Defense |
| Partial.js | Hand Grip |

---

### Cinematic Upgrade

- Script-driven Camera Motion
- Camera Shake
- Vector Slash VFX
- Afterimage System
- Hit Particles

---

## 6. Install and Run

### Clone Project

```bash
git clone https://github.com/yourusername/vector-anim-3d.git
```

### Run

- Open `index.html` directly in browser  
- Recommended: VS Code + Live Server

### Start Editing

- Press `K` → Enable Editor  
- Press `TAB` → View Shortcut List