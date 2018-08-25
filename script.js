const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = '#FF0000';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 30, 100, 40);
ctx.strokeStyle = 'rgba(20, 38, 54, 0.5)';
ctx.stroke();
ctx.closePath();

