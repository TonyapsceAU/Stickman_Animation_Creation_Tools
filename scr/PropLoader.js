class PropLoader {
    constructor() {
        this.activeProps = [];
        this.isReady = false;
    }

    // 在 preload 中呼叫此函數
    init() {
        // 第一層：讀取註冊表
        // p5 的 loadJSON 會自動阻塞 preload 直到完成
        loadJSON('instances/prop_registry.json', (registry) => {
            console.log("Registry loaded:", registry);
            if (registry && registry.activeProps) {
                this.loadAllProps(registry.activeProps);
            }
        });
    }

    loadAllProps(propList) {
        let loadedCount = 0;

        propList.forEach(item => {
            const folderPath = `instances/props/${item.folder}`;
            
            loadJSON(`${folderPath}/config.json`, (config) => {
                // 檢查類別是否已存在 (避免重複定義報錯)
                if (window[config.type]) {
                    this.finalizeInstance(config, propList.length, ++loadedCount);
                } else {
                    // 如果不存在，則動態注入腳本
                    this.loadScript(`${folderPath}/model.js`, () => {
                        console.log(`腳本載入完成: ${config.type}`);
                        this.finalizeInstance(config, propList.length, ++loadedCount);
                    });
                }
            });
        });
    }

    finalizeInstance(config, total, currentCount) {
        // 這裡建立 Prop_ATTACHED，它會去呼叫我們剛改好的 initPropModel
        const propInstance = new Prop_ATTACHED({
            type: config.type,
            jointName: config.jointName,
            offset: createVector(config.offset.x, config.offset.y, config.offset.z),
            socketDir: createVector(config.socketDir.x, config.socketDir.y, config.socketDir.z),
            model_val: config.visuals || [],
            scale: config.scale || 1,
        });

        this.activeProps.push(propInstance);
        
        // 當最後一個道具也處理完畢時
        if (this.activeProps.length === total) {
            this.isReady = true;
            console.log(">>> 所有道具實例已準備就緒！");
        }
    }

    // 改回回調模式，避免 Promise 造成的 Unhandled Rejection
    loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }
}