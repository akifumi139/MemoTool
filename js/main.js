let isDrawing = false;
let x = 0;
let y = 0;

const drawcolor = ['black', 'red', 'blue'];
let color_ID = 0;

const InportButton = document.getElementById('inport')
const ExportButton = document.getElementById('export')
const DeleteButton = document.getElementById('delete')
const ClearButton = document.getElementById('clear')

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

const background = document.getElementById('background');
const context2 = background.getContext('2d');




window.onload = function onLoad() {
	context2.fillStyle = 'white';
	context2.fillRect(0, 0, canvas.width, canvas.height);
}
window.addEventListener('beforeunload', function (e) {
	e.returnValue = '';
}, false);

canvas.addEventListener('mousedown', e => {
	switch (e.button) {
		case 0://left
			x = e.clientX - rect.left;
			y = e.clientY - rect.top;
			isDrawing = true;
			context.beginPath();
			break;
		case 1: //middle
			color_ID = color_ID + 1
			if (color_ID == drawcolor.length) color_ID = 0;
			changeColor(color_ID);
			break;
		case 2: //right
			break;
		default: alert('Unexpected code: ' + e.button);
	}
});

canvas.addEventListener('mousemove', e => {
	switch (e.button) {
		case 0://left
			if (isDrawing === true) {
				drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
				x = e.clientX - rect.left;
				y = e.clientY - rect.top;
			}
			break;
		case 1: //middle
			break;
		case 2: //right
			break;
		default: alert('Unexpected code: ' + e.button);
	}
});

window.addEventListener('mouseup', e => {
	switch (e.button) {
		case 0://left
			if (isDrawing === true) {
				drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
				context.closePath();
				x = 0;
				y = 0;
				isDrawing = false;
			}
			break;
		case 1: //middle
			break;
		case 2: //right
			break;
		default: alert('Unexpected code: ' + e.button);
	}
});

ExportButton.addEventListener('click', function (ev) {
	context2.drawImage(canvas, 0, 0, canvas.width, canvas.height)
	let link = document.createElement('a');
	link.download = "my-image.png";
	link.href = background.toDataURL("image/png");
	link.click();
}, false);

DeleteButton.addEventListener('click', function (ev) {
	context.clearRect(0, 0, canvas.width, canvas.height);
}, false);

ClearButton.addEventListener('click', function (ev) {
	context2.fillStyle = 'white';
	context2.fillRect(0, 0, canvas.width, canvas.height);
}, false);

InportButton.addEventListener('change', function (ev) {
	let fileData = this.files[0]
	let imgType = fileData.type;
	if (!imgType.match(/^image/)) {
		alert('画像を選択してください');
		InportButton.value = '';
		return;
	}
	let reader = new FileReader()
	reader.readAsDataURL(fileData)
	reader.onload = function () {
		drawImage(reader.result)
	}
}, false);

function drawLine(context, x1, y1, x2, y2) {
	console.log(drawcolor[color_ID])
	context.strokeStyle = drawcolor[color_ID];
	context.lineCap = 'round';
	context.lineJoin = 'round';
	context.lineWidth = 1;
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}

function changeColor(id) {
	for (i = 0; i < drawcolor.length; i++) document.getElementById(drawcolor[i]).style.borderColor = 'lightgrey';
	color_ID = id
	document.getElementById(drawcolor[id]).style.borderColor = 'yellowgreen';
}

function drawImage(url) {
	let image = new Image()
	image.src = url
	image.onload = () => {
		context2.drawImage(image, 0, 0, canvas.width, canvas.height)
	}
}