// (x,y,z)
//x : + is left
//y : + is down
//z : + is back
const PoseLibrary = {
    // 輔助工具：複製當前關節狀態
	"EDIT_SLOT": (actor) => {
        let snapshot = {};
        for (let part in actor.vPose) {
            snapshot[part] = actor.vPose[part].copy();
        }
        return snapshot;
    },
	
	"Combine_Poses": (pose)=>{
		return pose;
	},
	
	// 全身姿勢：站立
	"STAND": (val) => {
		// 1. 先定義標準的骨骼姿態物件
		let pose = {
			// 軀幹
			neck:      createVector(0, 1, -0.1),
			chest:     createVector(0, 1, 0),
			pelvis:    createVector(0, 1, 0),
			
			// 肩膀
			shoulderL: createVector(1, 0, 0),
			shoulderR: createVector(-1, 0, 0),
			
			// 手臂 (elbow 為大臂，hand 為小臂)
			elbowL:    createVector(0.2, 1, -0.1),
			handL:     createVector(0.15, 1, 0.2),
			elbowR:    createVector(-0.2, 1, -0.1),
			handR:     createVector(-0.15, 1, 0.2),
			
			// 腿部 (knee 為大腿，foot 為小腿)
			kneeL:     createVector(0.1, 1, 0.1),
			footL:     createVector(0.05, 1, -0.1),
			toeL:      createVector(0, 0, 1),
			
			kneeR:     createVector(-0.1, 1, 0.1),
			footR:     createVector(-0.05, 1, -0.1),
			toeR:      createVector(0, 0, 1)
		};
		
		// 2. 只有當 val 有被明確賦值時 (包含 0)，才加入 rotation 屬性
		// 這樣在 update() 遍歷時，若無此屬性就不會更動 Actor 的 config.rotation
		if (val !== null && typeof val !== 'undefined') {
			pose.rotation = radians(val);
		}
		
		return pose;
	},
	
	"Breathing": (intensity) => {
		let val = intensity/2;
		return {
			shoulderL: createVector(1, val, 0),
			shoulderR: createVector(-1, val, 0)
		}
		
	},
	
	"GLOBAL_TURN":(val) => ({// 這不是轉x度，而是轉去x度
		rotation: radians(val)
	}),

	"STEP_TURN": (val) => {
		// 計算骨骼應該旋轉的角度 (弧度)
		let cv = cos(radians(val/2));
		let sv = sin(radians(val/2));
		let vShoulderL = createVector(cv,0,-sv);
		let vShoulderR = createVector(-cv, 0, sv);
		cv = cos(radians(val));
		sv = sin(radians(val));
		let vElbowL =    createVector(0.2*cv-0.1*sv, 1, -0.2*sv-0.1*cv);
		let vHandL =     createVector(0.15*cv+0.2*sv, 1, -0.15*sv+0.2*cv);
		let vKneeL =     createVector(0.1*(cv+sv), 1, -0.1*sv+0.1*cv);
		let vFootL =     createVector(0.05*cv-0.1*sv, 1, -0.1*(cv+sv));
		let vToeL =      createVector(sv, 0, cv);

		return {
			// 同時包含世界旋轉屬性，讓 Actor 在 update 時平滑轉動地盤
			// rotation: radians(val), 
			// 動態旋轉後的骨骼向量

			// need to add head turn
			
			shoulderL: vShoulderL,
			elbowL: vElbowL,
			handL: vHandL,
			shoulderR: vShoulderR,
			kneeL:     vKneeL,
			footL:     vFootL,
			toeL:      vToeL
		};
	},

    "OVER_THE_SHOULDER_REST": (val) => ({
        neck:      createVector(0, 1, -0.1),
        chest:     createVector(0, 1, 0),
        pelvis:     createVector(0, 1, 0.1),
        
        shoulderL: createVector(1, 0, 0),
        shoulderR: createVector(-1, 0, 0),
        
        // 左手扛肩動作：大臂向上後方 (-Y, +Z)，小臂折回
        elbowL:    createVector(0.5, 0.75, 0.25), 
        handL:     createVector(0.5, -0.75, 0.5), 
        
        elbowR:    createVector(-0.3, 1, -0.1),
        handR:     createVector(0.25, 1, 0.3),
        
        kneeL:     createVector(0.2, 1, 0.1),
        footL:     createVector(0.2, 1, -0.1),
        toeL:      createVector(0, 0, 1),
        
        kneeR:     createVector(-0.15, 1, 0.2),
        footR:     createVector(-0.1, 1, -0.2),
        toeR:      createVector(0, 0, 1)
    }),

    "Orthodox_stand": (val) => ({
		pelvis : createVector(0.01, 1.00, -0.08), // [EDITED]
		chest : createVector(0.00, 0.98, -0.18), // [EDITED]
		neck : createVector(0.00, 0.96, -0.28),
		shoulderL : createVector(0.99, 0.00, 0.15),
		elbowL : createVector(0.49, 0.78, 0.35),
		handL : createVector(-0.27, -0.60, 0.63),
		shoulderR : createVector(-1.00, 0.00, 0.06),
		elbowR : createVector(-0.45, 0.86, 0.24),
		handR : createVector(0.16, -0.61, 0.38),
		kneeL : createVector(0.36, 0.81, 0.44),
		footL : createVector(0.09, 1.00, -0.00), // [EDITED]
		toeL : createVector(0.31, 0.00, 0.95),
		kneeR : createVector(-0.34, 0.84, 0.43), // [EDITED]
		footR : createVector(-0.04, 0.94, -0.35), // [EDITED]
		toeR : createVector(-0.68, 0.00, 0.70),
    }),
	
	"LEFT_HADSHAKE": (val) => ({
		pelvis : createVector(0.00, 1.00, 0.00),
		chest : createVector(0.00, 1.00, 0.00),
		neck : createVector(0.00, 1.00, -0.10),
		shoulderL : createVector(0.94, 0.00, 0.33),
		elbowL : createVector(0.23, 0.89, 0.39),
		handL : createVector(0.06, 0.37, 0.93),
		shoulderR : createVector(-1.00, 0.00, 0.00),
		elbowR : createVector(-0.20, 0.98, -0.10),
		handR : createVector(-0.14, 0.97, 0.19),
		kneeL : createVector(0.10, 0.99, 0.10),
		footL : createVector(0.05, 0.99, -0.10),
		toeL : createVector(0.00, 0.00, 1.00),
		kneeR : createVector(-0.10, 0.99, 0.10),
		footR : createVector(-0.05, 0.99, -0.10),
		toeR : createVector(0.00, 0.00, 1.00),
	}),

	// 局部姿勢：左手持物 (只定義左臂)
	"HOLD_WEAPON_L": (val) => ({
		shoulderL: createVector(0.8, -0.2, 0.4),
		elbowL : createVector(0.35, 0.91, -0.23),
		handL : createVector(0.00, 0.89, 0.45)
	}),
	

	"SPRINT_SET": (val) => ({
		pelvis : createVector(0.00, 0.99, -0.16), // [EDITED]
		chest : createVector(0.00, 0.91, -0.41), // [EDITED]
		neck : createVector(0.00, 0.80, -0.59), // [EDITED]
		shoulderL : createVector(1.00, 0.01, 0.00), // [EDITED]
		elbowL : createVector(0.30, 0.78, -0.55), // [EDITED]
		handL : createVector(-0.03, 0.79, 0.62), // [EDITED]
		shoulderR : createVector(-1.00, 0.00, 0.00), // [EDITED]
		elbowR : createVector(-0.20, 0.98, -0.03), // [EDITED]
		handR : createVector(0.17, 0.28, 0.95), // [EDITED]
		kneeL : createVector(0.30, 0.77, 0.56), // [EDITED]
		footL : createVector(0.05, 1.00, -0.09),
		toeL : createVector(0.00, 0.07, 0.93),
		kneeR : createVector(-0.23, 0.92, 0.30), // [EDITED]
		footR : createVector(-0.10, 1.28, -0.94),
		toeR : createVector(0.00, 0.07, 0.93),
	}),
	
	"jogging_POSE_1": (val) => ({
		pelvis : createVector(0.00, 0.95, -0.30), // [EDITED]
		chest : createVector(0.00, 1.00, -0.09), // [EDITED]
		neck : createVector(0.00, 0.98, -0.20), // [EDITED]
		
		shoulderR : createVector(-0.99, 0.02, 0.00),
		elbowR : createVector(-0.27, 0.89, -0.38), // [EDITED]
		handR : createVector(0.13, 0.12, 0.98), 
		
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.18, 0.89, -0.41), // [EDITED]
		handL : createVector(0.04, 0.65, 0.76),
		
		kneeR : createVector(-0.16, 0.72, 0.67), // [EDITED]
		footR : createVector(-0.06, 0.78, -0.62), // [EDITED]
		toeR : createVector(0.00, 0.56, 0.83), // [EDITED]
		
		kneeL : createVector(0.23, 0.96, -0.15), // [EDITED]
		footL : createVector(0.11, 0.94, -0.33), // [EDITED]
		toeL : createVector(0.00, 0.07, 0.93),
	}),

	"jogging_POSE_2": (val) => ({
		pelvis : createVector(0.00, 0.96, -0.28), // [EDITED]
		chest : createVector(0.00, 0.99, -0.13),
		neck : createVector(0.00, 0.96, -0.24),
		
		shoulderR : createVector(-1.00, 0.02, 0.00), // [EDITED]
		elbowR : createVector(-0.20, 0.77, -0.61), // [EDITED]
		handR : createVector(0.09, 0.64, 0.76), // [EDITED]
		
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.20, 0.97, 0.14), // [EDITED]
		handL : createVector(-0.04, -0.46, 0.89), // [EDITED]
		
		kneeR : createVector(-0.16, 0.84, 0.51), // [EDITED]
		footR : createVector(-0.11, 0.97, 0.20), // [EDITED]
		toeR : createVector(-0.00, 0.00, 1.00), // [EDITED]
		
		kneeL : createVector(0.22, 0.94, -0.26), // [EDITED]
		footL : createVector(0.06, -0.30, -0.95), // [EDITED]
		toeL : createVector(0.09, 0.91, -0.40), // [EDITED]
	}),

	"jogging_POSE_3": (val) => ({
		pelvis : createVector(0.00, 0.96, -0.28), // [EDITED]
		chest : createVector(0.00, 0.99, -0.13),
		neck : createVector(0.00, 0.96, -0.24),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.20, 0.96, 0.11),
		handL : createVector(-0.04, -0.39, 0.88),
		shoulderR : createVector(-1.00, 0.02, 0.00),
		elbowR : createVector(-0.20, 0.78, -0.59),
		handR : createVector(0.09, 0.61, 0.77),
		kneeL : createVector(0.21, 0.89, 0.41), // [EDITED]
		footL : createVector(0.07, -0.13, -0.99), // [EDITED]
		toeL : createVector(0.08, 0.86, -0.32),
		kneeR : createVector(-0.19, 0.97, -0.12), // [EDITED]
		footR : createVector(-0.11, 0.95, -0.31), // [EDITED]
		toeR : createVector(0.00, 0.03, 0.99),
	}),

	
	"SPRINT_DYNAMIC": (val) => {
		let [state, intensity] = val; // state: -1~1, intensity: 0~1
		
		// 1.1 計算傾斜角度 (5 到 25 度)
		let leanDegree = 5 + (45 * intensity); 
		let leanRad = radians(leanDegree); // 轉為弧度供 sin/cos 使用
		// 1.2 計算向量
		// y 控制高度 (垂直分量)，z 控制前傾 (水平分量)
		let trunkY = cos(leanRad);
		let trunkZ = sin(leanRad);
		
		// --- 2 肩膀扭轉 (Shoulder Twist) ---
		// 強度越高，扭轉角度越大 (0~15度)
		let twistDegree = (15 * intensity) * state; 
		let tRad = radians(twistDegree);
		// 計算肩膀向量 (在水平面 X-Z 平面上旋轉)
		let tCos = cos(tRad), tSin = sin(tRad);

		// 3 手臂擺幅計算 (上臂 Elbow)
		// 衝刺時前擺角度可達 70 度，後擺約 40 度
		let armSwingDeg = (70 * intensity) * state; 
		let armRad = radians(armSwingDeg);
		let sY = cos(armRad); // 手肘的垂直分量
		let sZ = sin(armRad); // 手肘的前後分量
		// 當上臂向前(sZ+)下擺(sY+)時，下臂應該向上(y-)折回
		// 我們讓下臂的方向與上臂成直角
		// 3.2.1 左側擺幅計算 (sZ 為負代表向前)
		let armRadL = radians(70 * intensity * state);
		let sYL = cos(armRadL), sZL = -sin(armRadL);
		let hYL = -sZL, hZL = sYL;
		
		// 3.2.2 右側擺幅計算 (相位與左側相反)
		let armRadR = radians(70 * intensity * -state);
		let sYR = cos(armRadR), sZR = -sin(armRadR);
		let hYR = -sZR, hZR = sYR;

		// --- 4. 腿部擺幅計算 (大腿 Knee) ---
		// 大腿擺動與同側手臂相反。我們用 state 控制左大腿 (KneeL)
		// 衝刺時抬膝角度很大 (約 80 度)，後蹬角度較小 (約 30 度)
		
		// 左大腿 (與 state 相反，因為 state 跟隨左手)
		// 當 state 為負 (-1)，左手向後，此時左大腿向前抬起
		let legRadL = radians(80 * intensity * -state); 
		let kYL = cos(legRadL);
		let kZL = sin(legRadL); // 正值代表向後，負值代表向前

		// 右大腿 (與 state 同步)
		let legRadR = radians(80 * intensity * state);
		let kYR = cos(legRadR);
		let kZR = sin(legRadR);

		// --- 5. 小腿擺幅計算 (Foot) ---
		// 小腿相對於大腿的角度。
		// 當大腿向前抬 (legRad 為負) 時，小腿要向後折 (角度變正)
		// 衝刺時後折可達 100 度 (radians(100))
		
		let foldPower = 100 * intensity; // 衝刺時最大摺疊角度
		
		// 左小腿：當 -state 為正(抬起)時摺疊
		let fRadL = radians(foldPower * (state > 0 ? -state : 0.2)); 
		let fYL = cos(fRadL);
		let fZL = sin(fRadL); // 正值代表向後折，踢向屁股

		// 右小腿：當 state 為正(抬起)時摺疊
		let fRadR = radians(foldPower * (state < 0 ? state : 0.2));
		let fYR = cos(fRadR);
		let fZR = sin(fRadR);
		
		return {
			pelvis :	createVector(0, 0.9+trunkY, -0.4-trunkZ),
			chest :	createVector(0, 0.9+trunkY, -0.4-trunkZ),
			neck :	createVector(0, 0.8+trunkY, -0.6-trunkZ),

			shoulderL: createVector(tCos,  0, tSin),
			shoulderR: createVector(-tCos, 0, -tSin),
			
			// 4. 左手臂
			elbowL: createVector(0.3*(tCos * 0.2 - tSin * sZL),  0.7*sYL,         0.5*(tSin * 0.2 + tCos * sZL) ),
			handL:  createVector(0.1*(tCos * -0.1 - tSin * hZL), 0.7*(hYL * 0.8), 0.6*(tSin * -0.1 + tCos * hZL)),
			
			// 5. 右手臂 (修正重點：X 軸基礎偏移為 -0.2，且使用右側專屬的 sZR/hZR)
			elbowR: createVector(0.3*(-tCos * 0.2 - tSin * sZR),  0.7*sYR,         0.5*(-tSin * 0.2 + tCos * sZR)),
			handR:  createVector(0.1*(-tCos * -0.1 - tSin * hZR), 0.7*(hYR * 0.8), 0.6*(tSin * -0.1 + tCos * hZR)),

			// 7. 左大腿 (KneeL)
			// x: 0.15 保持雙腳間距，不隨肩膀旋轉，但受骨盆位置連動
			kneeL: createVector(0.15, kYL, kZL),
			
			// 8. 右大腿 (KneeR)
			kneeR: createVector(-0.15, kYR, kZR),

			// 9. 左小腿 (FootL)
			// 注意：小腿是從膝蓋往回長的，fY 往下，fZ 往後
			footL: createVector(0, fYL, fZL),
			
			// 10. 右小腿 (FootR)
			footR: createVector(0, fYR, fZR),

			// 11. 腳掌 (Toe) - 衝刺時腳尖向下
			//toeL: createVector(0, 0.2 * intensity, 0.8),
			//toeR: createVector(0, 0.2 * intensity, 0.8)

			
			//kneeL : createVector(0.30, 0.77, 0.56), // [EDITED]
			//footL : createVector(0.05, 1.00, -0.09),
			//toeL :  createVector(0.00, 0.07, 0.93),
			
			//kneeR : createVector(-0.23, 0.92, 0.30), // [EDITED]
			//footR : createVector(-0.10, 1.28, -0.94),
			//toeR : createVector(0.00, 0.07, 0.93),

			
				
		};
}
};