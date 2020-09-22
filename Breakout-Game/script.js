const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

rulesBtn.addEventListener('click', () => {
  rules.classList.add('show')
})
closeBtn.addEventListener('click', () => {
  rules.classList.remove('show')
})

let score = 0

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
}

function drawPaddle() {
  roundedRect(ctx, paddle.x, paddle.y, paddle.w, paddle.h, paddle.h / 2)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  // ctx.stroke();
}

function draw() {
  drawBall()
  drawPaddle()
  drawScore()
}

function drawScore() {
  ctx.font = '20px Arial'
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}


draw()
