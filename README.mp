3D Actor Animation Engine (Vector-Based)
這是一個基於 p5.js (WEBGL) 開發的高效能、輕量級 3D 角色動作編輯器與動畫引擎。不同於傳統的旋轉角度控制，本系統採用**向量指向（Vector Interpolation）**技術，能精確控制骨骼朝向與道具掛載。

🚀 核心特性
向量驅動骨架 (Vector-Based Skeleton)：使用 vPose 儲存各關節的朝向向量，透過插值（Lerp）實現極致平滑的動作切換。

動態道具系統 (Prop Attachment System)：支援道具（如劍與鞘）在不同關節間即時交接（Parent-Switching），自動處理偏移（Offset）與指向（SocketDir）。

強大的劇本功能 (Choreography)：透過指令隊列（Command Queue）實作複雜動作，支援動作融合（Pose Blending）與呼吸待機（Breathing Idle）。

專業級 HUD 編輯介面：即時顯示關節向量、道具座標與世界狀態。

🛠 系統組件
檔案	描述
Actor.js	核心引擎。處理向量插值、骨架求解（Forward Kinematics）與座標變換。
editor_control.js	提供 WASDQE、M/N 鍵等專業編輯快捷鍵。
PoseLibrary.js	動作資源庫。儲存所有經由編輯器導出的姿勢數據。
Prop_ATTACHED.js	道具類別。處理動態掛載與渲染邏輯。
Choreography.js	劇本管理。定義如「空中大砍」、「跑步」等連續動作序列。
⌨️ 快捷鍵指南 (Editor Mode)
1. 檢視切換 (Camera Controls)

1 / 2 / 3：前、側、頂正交視角循環切換。

4：8 個對角線象限視角循環。

2. 編輯功能 (Editing)

K：Master Edit Toggle（總開關）。

V：切換編輯模式（關節 / 道具 / 參考圖 / 角色位置）。

M：切換下一個編輯對象（下一個關節或道具）。

N：(道具模式下) 切換編輯 偏移 (Offset) 或 方向 (Direction)。

F / G：調整微調步長（Step Size）。

W A S D Q E：三維軸向數值微調。

3. 輸出與序列

ENTER：導出全量姿勢數據至 Console。

P：導出部分姿勢數據。

SPACE：播放 / 暫停動畫序列。

🏗 動畫製作流程
開啟編輯器：執行 mysketch.js 並進入 EDIT ACTIVE 模式。

調整姿勢：透過鍵盤微調關節向量，觀察 HUD 中的向量數值變化。

導出數據：按下 ENTER，將 Console 中的 createVector 數值貼回 PoseLibrary.js。

編排劇本：在 Choreography.js 中使用 addCommand 串聯動作。

📦 安裝與運行
確保環境中有 p5.js 函式庫。

將本專案所有檔案放入相同目錄。

使用 Live Server 開啟 index.html 即可開始編輯。