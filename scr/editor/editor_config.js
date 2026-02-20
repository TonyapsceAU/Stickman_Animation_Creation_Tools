// 在 Editor.js 頂部定義
const EDIT_MODES = {
    JOINT: "JOINT",         // 調整關節向量
    ACTOR_POS: "ACTOR_POS", // 調整 Actor 整體位置與旋轉
    REF_IMAGE: "REF_IMAGE", // 調整參考圖
    PROP: "PROP"            // 調整道具偏移 (即將加入)
};
let currentEditMode = EDIT_MODES.JOINT;
let viewState = {
    frontBack: 0,
    leftRight: 0,
    upDown: 0,
    diagonal: 0
};
const camDist = 400; // 相機距離
let currentJointIndex = 0;
let currentPropIndex = 0;//new for looping prop, used in draw() and editor
let showAxes = true; // 視覺輔助開關
let showActor = true;// Actor開關
let editedJoints = new Set(); // 用來儲存被修改過的關節名稱
let editModeEnable = true;
let tweakStep = 0.02;
// actorHeightedit removed
// actorPositionedit removed
let editPropDir = false;//T:editing direction ; F:editing offset
let canExport = true;//make sure wont fill console with same message


/**
 * 根據 bones 清單自動尋找父節點
 * 例如：輸入 'neck' 返回 'head'；輸入 'elbowL' 返回 'shoulderL'
 */
function getParentJoint(jointName) {
    const bones = [
        ['head', 'neck'], ['neck', 'chest'], ['chest', 'pelvis'],
        ['neck', 'shoulderL'], ['shoulderL', 'elbowL'], ['elbowL', 'handL'], 
        ['neck', 'shoulderR'], ['shoulderR', 'elbowR'], ['elbowR', 'handR'],
        ['pelvis', 'kneeL'], ['kneeL', 'footL'], ['footL', 'toeL'],
        ['pelvis', 'kneeR'], ['kneeR', 'footR'], ['footR', 'toeR']
    ];

    for (let [parent, child] of bones) {
        if (child === jointName) return parent;
    }
    return null; // 如果是 head 則沒有父節點
}