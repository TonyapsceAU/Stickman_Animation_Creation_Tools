// (x,y,z)
//x : + is left
//y : + is down
//z : + is back

// catalog : Object.keys(PoseLibrary);
const PoseLibrary = {
	"PROP_CMD" : (prop_config) => ({
		PROP_CMD:prop_config
	}),
	
	"AERIAL_CLEAVE_4": (val) => ({
		movement: val,
		pelvis : createVector(-0.14, 0.70, -0.70),
		chest : createVector(-0.16, 0.06, -0.99),
		neck : createVector(-0.03, -0.72, -0.70),
		shoulderL : createVector(0.97, 0.26, 0.00),
		elbowL : createVector(0.06, -0.43, -0.90),
		handL : createVector(-0.06, 0.91, -0.41),
		shoulderR : createVector(-0.99, 0.13, 0.08),
		elbowR : createVector(-0.82, -0.34, -0.46),
		handR : createVector(-0.87, 0.02, -0.37),
		kneeL : createVector(0.61, -0.12, 0.78),
		footL : createVector(0.11, 0.97, 0.23),
		toeL : createVector(-0.07, -0.01, 1.00),
		kneeR : createVector(-0.26, 0.83, 0.49),
		footR : createVector(-0.32, -0.10, -0.94),
		toeR : createVector(0.09, 0.99, -0.09),
	}),
	"AERIAL_CLEAVE_3": (val) => ({
		movement: val, 
		pelvis : createVector(0.57, 0.82, -0.01), // [EDITED]
		chest : createVector(0.72, 0.69, -0.00), // [EDITED]
		neck : createVector(0.76, 0.62, -0.18), // [EDITED]
		shoulderL : createVector(0.23, 0.20, -0.95), // [EDITED]
		elbowL : createVector(0.85, 0.31, -0.43), // [EDITED]
		handL : createVector(-0.10, -0.76, 0.64), // [EDITED]
		shoulderR : createVector(-0.30, -0.03, 0.95), // [EDITED]
		elbowR : createVector(0.45, -0.60, 0.66), // [EDITED]
		handR : createVector(0.43, -0.01, -0.90), // [EDITED]
		kneeL : createVector(0.05, 0.95, -0.30), // [EDITED]
		footL : createVector(-0.47, 0.87, -0.13), // [EDITED]
		toeL : createVector(0.33, 0.91, -0.24), // [EDITED]
		kneeR : createVector(0.80, 0.33, 0.50), // [EDITED]
		footR : createVector(-0.72, 0.62, -0.32), // [EDITED]
		toeR : createVector(0.41, 0.80, 0.43), // [EDITED]
	}),
	"AERIAL_CLEAVE_2": (val) => ({
		movement: val,
		pelvis : createVector(0.38, 0.93, -0.04), // [EDITED]
		chest : createVector(0.64, 0.73, 0.23), // [EDITED]
		neck : createVector(0.71, 0.67, 0.22), // [EDITED]
		shoulderL : createVector(-0.86, 0.22, 0.46), // [EDITED]
		elbowL : createVector(-0.28, 0.38, -0.88), // [EDITED]
		handL : createVector(0.72, -0.29, -0.63), // [EDITED]
		shoulderR : createVector(0.72, -0.58, -0.39), // [EDITED]
		elbowR : createVector(0.48, -0.40, -0.78), // [EDITED]
		handR : createVector(-0.80, 0.55, -0.25), // [EDITED]
		kneeL : createVector(-0.45, 0.78, -0.42), // [EDITED]
		footL : createVector(0.76, 0.65, 0.00), // [EDITED]
		toeL : createVector(-0.03, 0.96, -0.28), // [EDITED]
		kneeR : createVector(-0.53, 0.32, -0.78), // [EDITED]
		footR : createVector(0.78, 0.62, -0.00), // [EDITED]
		toeR : createVector(-0.11, 0.95, -0.28), // [EDITED]
	}),
	"AERIAL_CLEAVE_1": (val) => ({
		movement: val,
		pelvis : createVector(0.25, 0.97, -0.01), // [EDITED]
		chest : createVector(0.56, 0.83, -0.00), // [EDITED]
		neck : createVector(0.75, 0.66, -0.00), // [EDITED]
		shoulderL : createVector(0.00, 1.00, 0.01), // [EDITED]
		elbowL : createVector(-0.27, 0.53, 0.81), // [EDITED]
		handL : createVector(-0.71, -0.21, -0.67), // [EDITED]
		shoulderR : createVector(-0.00, 0.00, -1.00), // [EDITED]
		elbowR : createVector(-0.89, 0.20, -0.40), // [EDITED]
		handR : createVector(-0.05, -0.32, 0.95), // [EDITED]
		kneeL : createVector(-0.77, 0.51, 0.37), // [EDITED]
		footL : createVector(0.88, 0.47, 0.01), // [EDITED]
		toeL : createVector(-0.00, 0.99, 0.15), // [EDITED]
		kneeR : createVector(-0.92, 0.34, -0.20), // [EDITED]
		footR : createVector(0.61, 0.79, -0.02), // [EDITED]
		toeR : createVector(-0.12, 0.96, -0.25), // [EDITED]
	}),
	
	"SQUAT_JUMP_JUMP": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 1.00, 0.00), // [EDITED]
		chest : createVector(0.00, 1.00, 0.00),
		neck : createVector(0.00, 1.00, -0.10),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.43, -0.33, 0.84), // [EDITED]
		handL : createVector(-0.33, -0.92, -0.19), // [EDITED]
		shoulderR : createVector(-0.99, 0.01, 0.00),
		elbowR : createVector(-0.44, -0.26, 0.86), // [EDITED]
		handR : createVector(0.41, -0.89, 0.18), // [EDITED]
		kneeL : createVector(0.10, 1.00, 0.10),
		footL : createVector(0.05, 1.00, -0.10),
		toeL : createVector(0.00, 0.90, 0.43), // [EDITED]
		kneeR : createVector(-0.10, 1.00, 0.10),
		footR : createVector(-0.05, 1.00, -0.10),
		toeR : createVector(0.00, 0.90, 0.44), // [EDITED]
	}),
	"SQUAT_JUMP_SQUAT": (val) => ({
		movement:val,
		pelvis : createVector(0.00, 0.96, -0.27), // [EDITED]
		chest : createVector(0.00, 0.89, -0.46), // [EDITED]
		neck : createVector(0.00, 0.84, -0.55), // [EDITED]
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.51, 0.78, -0.36), // [EDITED]
		handL : createVector(-0.27, 0.63, 0.72), // [EDITED]
		shoulderR : createVector(-0.99, 0.01, 0.00),
		elbowR : createVector(-0.51, 0.81, -0.28), // [EDITED]
		handR : createVector(0.26, 0.51, 0.82), // [EDITED]
		kneeL : createVector(0.55, 0.68, 0.49), // [EDITED]
		footL : createVector(-0.08, 0.88, -0.47), // [EDITED]
		toeL : createVector(0.51, 0.01, 0.86), // [EDITED]
		kneeR : createVector(-0.46, 0.66, 0.60), // [EDITED]
		footR : createVector(-0.04, 0.90, -0.43), // [EDITED]
		toeR : createVector(0.00, 0.01, 0.99),
	}),
	
	"RUNNING_SET": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.98, -0.20), // [EDITED]
		chest : createVector(0.00, 0.95, -0.33), // [EDITED]
		neck : createVector(0.00, 0.98, -0.21), // [EDITED]
		shoulderR : createVector(-0.94, 0.06, 0.00),
		elbowR : createVector(-0.18, 0.98, 0.01), // [EDITED]
		handR : createVector(0.11, 0.79, 0.61), // [EDITED]
		shoulderL : createVector(0.94, 0.06, 0.00),
		elbowL : createVector(0.17, 0.90, -0.41), // [EDITED]
		handL : createVector(-0.12, 0.82, 0.57), // [EDITED]
		kneeR : createVector(-0.09, 0.97, -0.21),
		footR : createVector(-0.05, 0.93, -0.35),
		toeR : createVector(0.00, 0.06, 0.94),
		kneeL : createVector(0.09, 0.96, 0.27), // [EDITED]
		footL : createVector(0.04, 0.95, -0.32), // [EDITED]
		toeL : createVector(0.00, 0.06, 0.94),
	}),
	"RUNNING_POSE_1": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.85, -0.52), // [EDITED]
		chest : createVector(0.00, 0.93, -0.36), // [EDITED]
		neck : createVector(0.00, 0.89, -0.45), // [EDITED]
		shoulderL : createVector(1.00, 0.00, -0.00), // [EDITED]
		elbowL : createVector(0.09, 0.33, -0.94), // [EDITED]
		handL : createVector(-0.01, 0.85, 0.53), // [EDITED]
		shoulderR : createVector(-0.99, 0.02, 0.00),
		elbowR : createVector(-0.18, 0.90, -0.39),
		handR : createVector(0.03, 0.67, 0.72),
		kneeR : createVector(-0.20, 0.89, -0.40), // [EDITED]
		footR : createVector(-0.07, 0.58, -0.81), // [EDITED]
		toeR : createVector(0.00, 0.94, 0.35), // [EDITED]
		kneeL : createVector(0.19, 0.97, 0.15),
		footL : createVector(0.02, 0.23, -0.97), // [EDITED]
		toeL : createVector(0.00, 0.98, 0.22), // [EDITED]
	}),
	"RUNNING_POSE_2": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.87, -0.49), // [EDITED]
		chest : createVector(0.00, 0.94, -0.33),
		neck : createVector(0.00, 0.90, -0.42),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.09, -0.18, -0.98), // [EDITED]
		handL : createVector(0.04, 0.71, -0.70), // [EDITED]
		shoulderR : createVector(-0.99, 0.02, 0.00),
		elbowR : createVector(-0.19, 0.93, 0.31), // [EDITED]
		handR : createVector(-0.02, 0.28, 0.96), // [EDITED]
		
		kneeR : createVector(-0.14, 0.66, -0.74), // [EDITED]
		footR : createVector(-0.07, -0.75, -0.66), // [EDITED]
		toeR : createVector(0.00, 0.59, -0.81), // [EDITED]
		
		kneeL : createVector(0.17, 0.83, 0.52), // [EDITED]
		footL : createVector(0.10, 0.98, -0.19), // [EDITED]
		toeL : createVector(0.00, -0.01, 1.00), // [EDITED]
	}),
	"RUNNING_POSE_3": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.87, -0.49), // [EDITED]
		chest : createVector(0.00, 0.94, -0.33),
		neck : createVector(0.00, 0.90, -0.42),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.09, 0.02, -1.00), // [EDITED]
		handL : createVector(0.11, 0.90, -0.42), // [EDITED]
		shoulderR : createVector(-0.99, 0.02, 0.00),
		elbowR : createVector(-0.20, 0.97, 0.13), // [EDITED]
		handR : createVector(-0.02, 0.41, 0.91), // [EDITED]
		
		kneeR : createVector(-0.14, 0.68, -0.71),
		footR : createVector(-0.10, 0.11, -0.99), // [EDITED]
		toeR : createVector(0.00, 0.61, -0.73),
		
		kneeL : createVector(0.17, 0.83, 0.51),
		footL : createVector(0.10, 0.98, 0.14), // [EDITED]
		toeL : createVector(0.00, 0.05, 0.95),
	}),
	"RUNNING_POSE_4": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.87, -0.49), // [EDITED]
		chest : createVector(0.00, 0.94, -0.33),
		neck : createVector(0.00, 0.90, -0.42),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.23, 0.91, -0.35), // [EDITED]
		handL : createVector(-0.05, 0.81, 0.58), // [EDITED]
		shoulderR : createVector(-0.99, 0.02, 0.00),
		elbowR : createVector(-0.13, 0.61, -0.78), // [EDITED]
		handR : createVector(-0.04, 0.84, 0.53), // [EDITED]
		kneeL : createVector(0.10, 0.86, -0.51), // [EDITED]
		footL : createVector(0.09, 0.48, -0.87), // [EDITED]
		toeL : createVector(0.00, 0.86, 0.51), // [EDITED]
		kneeR : createVector(-0.18, 0.90, 0.39), // [EDITED]
		footR : createVector(-0.02, 0.17, -0.98), // [EDITED]
		toeR : createVector(0.00, 0.96, 0.27), // [EDITED]
	}),
	"RUNNING_POSE_5": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.87, -0.49), // [EDITED]
		chest : createVector(0.00, 0.94, -0.33),
		neck : createVector(0.00, 0.90, -0.42),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.20, 0.76, 0.62), // [EDITED]
		handL : createVector(-0.01, -0.48, 0.88), // [EDITED]
		shoulderR : createVector(-0.99, 0.02, 0.00),
		elbowR : createVector(-0.13, 0.07, -0.99), // [EDITED]
		handR : createVector(-0.09, 0.65, -0.75), // [EDITED]
		kneeL : createVector(0.08, 0.56, -0.82), // [EDITED]
		footL : createVector(0.09, 0.11, -0.99), // [EDITED]
		toeL : createVector(0.00, 0.84, -0.55), // [EDITED]
		kneeR : createVector(-0.15, 0.72, 0.68), // [EDITED]
		footR : createVector(-0.07, 0.99, 0.12), // [EDITED]
		toeR : createVector(0.00, 0.05, 1.00), // [EDITED]
	}),
	"RUNNING_POSE_6": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.87, -0.49), // [EDITED]
		chest : createVector(0.00, 0.94, -0.33),
		neck : createVector(0.00, 0.90, -0.42),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.23, 0.88, 0.42), // [EDITED]
		handL : createVector(-0.01, 0.28, 0.96), // [EDITED]
		shoulderR : createVector(-0.99, 0.02, 0.00),
		elbowR : createVector(-0.13, -0.13, -0.98), // [EDITED]
		handR : createVector(-0.12, 0.84, -0.53), // [EDITED]
		kneeL : createVector(0.14, 0.91, -0.40),
		footL : createVector(0.08, -0.45, -0.89),
		toeL : createVector(0.00, 0.37, -0.93), // [EDITED]
		kneeR : createVector(-0.17, 0.95, 0.25), // [EDITED]
		footR : createVector(-0.07, 0.97, -0.24), // [EDITED]
		toeR : createVector(0.00, 0.01, 1.00), // [EDITED]
	}),
	
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
			pose.movement = val;
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
		movement: val,
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
		movement:val,
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
	// 局部姿勢：左手持物 (只定義左臂)
	"HOLD_WEAPON_L": (val) => ({
		shoulderL: createVector(0.8, -0.2, 0.4),
		elbowL : createVector(0.35, 0.91, -0.23),
		handL : createVector(0.00, 0.89, 0.45)
	}),

	"SPRINT_SET": (val) => ({
		movement: val,
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
		movement: val,
		pelvis : createVector(0.00, 0.95, -0.30), // [EDITED]
		chest : createVector(0.00, 1.00, -0.09), // [EDITED]
		neck : createVector(0.00, 0.98, -0.20), // [EDITED]
		
		shoulderR : createVector(-0.99, 0.02, 0.00),
		elbowL : createVector(0.28, 0.96, 0.11),
		handL : createVector(-0.02, -0.20, 0.98),
		
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowR : createVector(-0.18, 0.89, -0.41), // [EDITED]
		handR : createVector(0.04, 0.65, 0.76),
		
		kneeR : createVector(-0.16, 0.72, 0.67), // [EDITED]
		footR : createVector(-0.06, 0.78, -0.62), // [EDITED]
		toeR : createVector(0.00, 0.56, 0.83), // [EDITED]
		
		kneeL : createVector(0.23, 0.96, -0.15), // [EDITED]
		footL : createVector(0.11, 0.94, -0.33), // [EDITED]
		toeL : createVector(0.00, 0.07, 0.93),
	}),
	"jogging_POSE_2": (val) => ({
		movement: val,
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
		movement:  val,
		pelvis : createVector(0.00, 0.96, -0.28), // [EDITED]
		chest : createVector(0.00, 0.99, -0.13),
		neck : createVector(0.00, 0.96, -0.24),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.20, 0.96, -0.21), // [EDITED]
		handL : createVector(-0.01, 0.22, 0.98), // [EDITED]
		shoulderR : createVector(-1.00, 0.02, 0.00),
		elbowR : createVector(-0.24, 0.95, -0.21), // [EDITED]
		handR : createVector(0.10, 0.49, 0.86), // [EDITED]
		kneeL : createVector(0.21, 0.89, 0.41), // [EDITED]
		footL : createVector(0.07, -0.13, -0.99), // [EDITED]
		toeL : createVector(0.08, 0.86, -0.32),
		kneeR : createVector(-0.19, 0.97, -0.12), // [EDITED]
		footR : createVector(-0.11, 0.95, -0.31), // [EDITED]
		toeR : createVector(0.00, 0.03, 0.99),
	}),
	"jogging_POSE_4": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.96, -0.28), // [EDITED]
		chest : createVector(0.00, 0.99, -0.13),
		neck : createVector(0.00, 0.96, -0.24),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.19, 0.92, -0.35),
		handL : createVector(-0.04, 0.39, 0.92),
		shoulderR : createVector(-1.00, 0.02, 0.00),
		elbowR : createVector(-0.25, 0.96, 0.10),
		handR : createVector(0.13, 0.05, 0.99),
		kneeL : createVector(0.18, 0.75, 0.64), // [EDITED]
		footL : createVector(0.02, 0.79, -0.61), // [EDITED]
		toeL : createVector(0.02, 0.84, 0.55), // [EDITED]
		kneeR : createVector(-0.19, 0.95, -0.25), // [EDITED]
		footR : createVector(-0.11, 0.95, -0.29), // [EDITED]
		toeR : createVector(0.00, 0.27, 0.96), // [EDITED]
	}),
	"jogging_POSE_5": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.96, -0.28), // [EDITED]
		chest : createVector(0.00, 0.99, -0.13),
		neck : createVector(0.00, 0.96, -0.24),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.17, 0.85, -0.50), // [EDITED]
		handL : createVector(-0.07, 0.63, 0.77), // [EDITED]
		shoulderR : createVector(-1.00, 0.02, 0.00),
		elbowR : createVector(-0.25, 0.96, 0.12), // [EDITED]
		handR : createVector(0.11, -0.49, 0.87), // [EDITED]
		kneeL : createVector(0.16, 0.85, 0.50), // [EDITED]
		footL : createVector(0.05, 0.98, 0.19), // [EDITED]
		toeL : createVector(0.01, -0.01, 1.00), // [EDITED]
		kneeR : createVector(-0.19, 0.94, -0.28), // [EDITED]
		footR : createVector(-0.12, -0.34, -0.93), // [EDITED]
		toeR : createVector(-0.02, 0.97, -0.23), // [EDITED]
	}),
	"jogging_POSE_6": (val) => ({
		movement: val,
		pelvis : createVector(0.00, 0.96, -0.28), // [EDITED]
		chest : createVector(0.00, 0.99, -0.13),
		neck : createVector(0.00, 0.96, -0.24),
		shoulderL : createVector(0.99, 0.01, 0.00),
		elbowL : createVector(0.20, 0.98, -0.04),
		handL : createVector(-0.09, -0.21, 0.97), // [EDITED]
		shoulderR : createVector(-1.00, 0.02, 0.00),
		elbowR : createVector(-0.25, 0.96, -0.08), // [EDITED]
		handR : createVector(0.11, 0.55, 0.83), // [EDITED]
		kneeL : createVector(0.17, 0.98, -0.08), // [EDITED]
		footL : createVector(0.07, 0.96, -0.27), // [EDITED]
		toeL : createVector(0.01, 0.05, 0.96),
		kneeR : createVector(-0.18, 0.91, 0.38), // [EDITED]
		footR : createVector(-0.12, -0.25, -0.89),
		toeR : createVector(-0.02, 0.92, -0.15),
	}),
	
};