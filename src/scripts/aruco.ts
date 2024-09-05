let dictJSON: any = null;
async function fetchDictJSON(): Promise<any> {
	return new Promise((resolve, reject) => {
		if (dictJSON) {
			resolve(dictJSON);
		} else {
			fetch('./assets/aruco-dict.json')
				.then(res => res.json())
				.then(json => {
					dictJSON = json;
					resolve(json);
				});
		}
	});
}

export enum ArucoDictName {
	DICT_4X4 = "4X4",
	DICT_5X5 = "5X5",
	DICT_6X6 = "6X6",
	DICT_7X7 = "7X7"
}

async function getDictData(dictName: ArucoDictName): Promise<any> {
	const dict = await fetchDictJSON();
	const dictNameStr = dictName.toString();
	for (const key in dict) {
		if (key.toUpperCase().indexOf(dictNameStr.toUpperCase()) >= 0) {
			return dict[key];
		}
	}
	return null;
}

function getMarkerSize(dictName: ArucoDictName) {
	return parseInt(dictName.toString().split("X")[0]);
}

async function getArucoBytes(dictName: ArucoDictName, id: number): Promise<number[]> {
	const dict = await getDictData(dictName);
	if (!dict) {
		console.error("Dictionary not found : " + dictName.toString());
		return [];
	}

	const dictMarkerSize = getMarkerSize(dictName);

	const bytes = dict[id];
	const bits = [];
	const bitsCount = dictMarkerSize * dictMarkerSize;

	// Parse marker's bytes
	for (const byte of bytes) {
		const start = bitsCount - bits.length;
		for (let i = Math.min(7, start - 1); i >= 0; i--) {
			bits.push((byte >> i) & 1);
		}
	}
	
	return bits;
}

async function drawAruco(ctx: CanvasRenderingContext2D, size: number, dictName: ArucoDictName, id: number, padding: number) {
	const arucoBytes = await getArucoBytes(dictName, id);
	const arucoSize = await getMarkerSize(dictName);
	const arucoSizePx = size - padding * 2;
	const arucoCellSizePx = arucoSizePx / (arucoSize+2);

	// Clear canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, size, size);

	// Draw marker background
	ctx.fillStyle = "black";
	ctx.fillRect(padding, padding, size-padding*2, size-padding*2);

	// Draw marker
	for (let i = 0; i < arucoSize; i++) {
		for (let j = 0; j < arucoSize; j++) {
			ctx.fillStyle = (arucoBytes[i * arucoSize + j])? "white": "black";
			ctx.fillRect(
				padding + j * arucoCellSizePx + arucoCellSizePx,
				padding + i * arucoCellSizePx + arucoCellSizePx,
				arucoCellSizePx + 1,
				arucoCellSizePx + 1
			);
		}
	}
}

export async function getArucoImage(size: number, padding: number, dictName: ArucoDictName, id: number) {
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		console.error("Failed to get 2D context");
		return;
	}

	if (padding < 1) padding *= size;
	await drawAruco(ctx, size, dictName, id, padding);

	const img = new Image();
	img.src = canvas.toDataURL();
	return img;
}
