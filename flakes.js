
/* flakes.js */

let $canvas;
let ctx;
let width;
let height;

//Flake
let flakes;
let max_flakes;

//Timer
let addFlake_timer;
let flake_timer;

/* キャンバス初期化 */
function init_flakeAnimation() {
  //
  $canvas = document.querySelector("canvas#flakes");
  ctx = $canvas.getContext("2d");

  //初期化
  stopFlakes();
  setCanvasSize();

  //フレーク生成開始
  flakes = [];
  addFlake_timer = setInterval(makeFlake, 250);

  //アニメ開始
  flake_animation();

  //リサイズ時イベント
  window.addEventListener("resize", setCanvasSize);
}

/* キャンバスサイズ設定 */
function setCanvasSize() {
  width  = $canvas.clientWidth;
  height = $canvas.clientHeight;
  
  $canvas.width  = width;
  $canvas.height = height;
  max_flakes = height * 0.8;
}

/* アニメーション終了 */
function stopFlakes() {
  if (ctx) ctx.clearRect(0,0, width,height); //画面をクリア

  if (addFlake_timer) clearInterval(addFlake_timer);

  window.cancelAnimationFrame(flake_timer);
  window.removeEventListener("resize", setCanvasSize);
}


/** フレーク生成 */
class Flake {
  constructor() {
    //速度・大きさ・不透明度・色
    this.speed = (Math.random() + 1) * 1.5;
    this.radius = (Math.random() + 2) * 2.5;
    this.opacity = this.speed * 0.5;
    this.color = `hsla(${(Math.random() * 360)}, 75%, 75%, ${this.opacity})`;

    //位置
    this.x = Math.random() * width;
    this.y = -(this.radius * 3);
  }
}
//フレークリストにフレークを追加
function makeFlake() {
    flakes.push(new Flake());
    if (flakes.length >= max_flakes) clearInterval(addFlake_timer);
}

//フレークごとの状態を更新
function updateFlakes() {
    for (const flake of flakes) {
        flake.y += flake.speed;

        //画面の外に出た時
        if (flake.y > (height + flake.radius)) {
            flake.x = Math.random() * width;
            flake.y = -(flake.radius * 2);
            flake.speed = (Math.random() + 1) * 1.5;
            flake.color = `hsla(${(Math.random() * 360)}, 75%, 75%, ${flake.opacity})`
        }
    }
}

/* アニメーション */
function flake_animation() {
    updateFlakes();
    drawFlakes();

    flake_timer = window.requestAnimationFrame(flake_animation);
}
function drawFlakes() {
    //クリア
    ctx.clearRect(0,0, width,height);

    //フレーク描画
    for (const flake of flakes) {
        ctx.fillStyle = flake.color;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, 2*Math.PI, false);
        ctx.fill();
    }
}