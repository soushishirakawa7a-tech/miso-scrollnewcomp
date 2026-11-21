gsap.registerPlugin(ScrollTrigger);

/* ==================================================================
   functions.js の読み方
   ・自分で書くのは【演習】と書いてあるところだけです。
     ____ の部分を、スライドと照らし合わせて埋めてください。
   ================================================================== */

const ____ = null;   // 空欄の目印。この行は消さないでください


/* ==================================================================
   第2章 トップページ:Lottie を読み込む
   ================================================================== */
// 【演習2】Lottie のファイル名を入れる ─────────────────────────────
// トップのお椀:自動では再生しない。読み込めたら、下の playBowl で「登場 → 湯気をくり返す」
const heroAnim = lottie.loadAnimation({
  container: document.getElementById("hero-lottie"),   // どの箱に描くか
  renderer: "svg",
  loop: false,                                          // くり返さない(くり返しは playBowl で)
  autoplay: false,                                      // 勝手に再生しない
  path: "lottie/____.json",                             // ① お椀のファイル名
});

// 樽:自動では再生しない。第4章で、スクロールに合わせて1コマずつ送る
const taruAnim = lottie.loadAnimation({
  container: document.getElementById("barrel"),
  renderer: "svg",
  loop: false,                                          // くり返さない
  autoplay: false,                                      // 勝手に再生しない
  path: "lottie/____.json",                             // ② 樽のファイル名
});

// ■お椀を「登場 → 湯気をくり返す」で再生する(ページの最後のお椀でも使う)
function playBowl(anim) {
  anim.playSegments([0, 64], true);            // 0〜64コマ:お椀が現れ、具が落ちる
  const stop = anim.addEventListener("complete", () => {
    stop();                                    // この処理は一度だけ(登録を外す)
    anim.loop = true;
    anim.playSegments([64, 154], true);        // 64〜154コマ:湯気をくり返す
  });
}
heroAnim.addEventListener("DOMLoaded", () => playBowl(heroAnim));   // 読み込めたら再生


/* ==================================================================
   第3章 クイズ
   つかむ → 書き換える → 反応する
   ================================================================== */

// 【演習3-1】つかむ:HTML の id を見て、書き換える要素をつかむ ──────────
const overlay   = document.getElementById("modal-overlay");  // 背景の暗幕
const mark      = document.getElementById("____");   // ① ◯ か △
const text      = document.getElementById("verdict-text");   // 「正解」か「惜しい」
const hintBox   = document.getElementById("____");       // ② ヒントのまとまり
const hintText  = document.getElementById("hint-text");      // ヒントの文
const answerBox = document.getElementById("____");     // ③ 答えのまとまり
const closeBtn  = document.getElementById("modal-close");    // 閉じるボタン

// 【演習3-2】書き換える:モーダルを開く関数・閉じる関数 ─────────────────
// 正解なら答えを、不正解ならヒントだけを出して、モーダルを開く
function openModal(isCorrect, hint) {
  if (____) {                       // ① 正解なら(引数の名前)
    // 正解のとき
    mark.textContent = "◯";
    mark.style.color = "#9c4f24";
    text.textContent = "正解";
    hintBox.style.display   = "none";     // ヒントのまとまりは隠す
    answerBox.style.display = "block";    // 答えのまとまりは出す
    closeBtn.textContent = "先へ進む";
  } else {
    // 不正解のとき
    mark.textContent = "△";
    mark.style.color = "#a08a6a";
    text.textContent = "惜しい";
    hintText.textContent = ____;          // ② 受け取ったヒントの文(引数の名前)
    hintBox.style.display   = "block";
    answerBox.style.display = "none";
    closeBtn.textContent = "もう一度考える";
  }
  overlay.classList.add("____");          // ③ 開くときに付けるクラスの名前
}

function closeModal() {
  overlay.classList.remove("____");       // ④ 閉じるときに外すクラスの名前
}

// 【演習3-3】反応する:選択肢がクリックされたら、data 属性を読んで openModal を呼ぶ ──
document.querySelectorAll(".quiz-btn").forEach((btn) => {
  btn.addEventListener("____", () => {        // ① クリックされたら
    // ② data-correct の値 / ③ 正解のときの値 / ④ data-hint の値
    openModal(btn.dataset.____ === "____", btn.dataset.____);
  });
});

// ■閉じるボタン:閉じる
closeBtn.addEventListener("click", () => {
  closeModal();
  // 【完成形で使う】正解のあと(「先へ進む」)なら、地図の章へ進む(使うときは、下の /* と */ を消す)
  /*
  if (closeBtn.textContent === "先へ進む") {
    document.getElementById("ch2").scrollIntoView({ behavior: "smooth" });
  }
  */
});

// 暗幕(箱の外)をクリックしても閉じる
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeModal();
});

// Esc キーでも閉じる
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

// 【完成形で使う】トップから下へ動かすと、クイズまで送って一度止める(使うときは、下の /* と */ を消す)
/*
const quizSection = document.getElementById("quiz");
let isMoving = false;     // 自動スクロール中は入力を受け付けない
let arrivedAt = 0;        // クイズに着いた時刻

function quizTop() {
  return Math.round(quizSection.getBoundingClientRect().top + window.scrollY);
}
function moveTo(y) {
  isMoving = true;
  window.scrollTo({ top: y, behavior: "smooth" });
  setTimeout(() => { isMoving = false; arrivedAt = Date.now(); }, 900);
}
// 下へ(+1)・上へ(-1)。true を返すと、ブラウザのスクロールを止める
function handleIntent(dir) {
  if (overlay.classList.contains("is-open")) return false;   // モーダル表示中は何もしない
  if (isMoving) return true;
  const y = window.scrollY, q = quizTop();
  if (y > q + 4) return false;                          // クイズより下は普通のスクロール
  if (dir > 0) {
    if (y < q - 4) { moveTo(q); return true; }          // トップ → クイズへ送る
    return Date.now() - arrivedAt < 700;                // 着いた直後の勢いは止める
  }
  if (y > 4 && y >= q - 4) { moveTo(0); return true; }  // クイズ → トップへ戻す
  return false;
}
window.addEventListener("wheel", (event) => {
  if (Math.abs(event.deltaY) < 2) return;
  if (handleIntent(event.deltaY > 0 ? 1 : -1)) event.preventDefault();
}, { passive: false });
let touchY = null;
window.addEventListener("touchstart", (event) => { touchY = event.touches[0].clientY; }, { passive: true });
window.addEventListener("touchmove", (event) => {
  if (touchY === null) return;
  const dy = touchY - event.touches[0].clientY;
  if (Math.abs(dy) < 8) return;
  if (handleIntent(dy > 0 ? 1 : -1)) event.preventDefault();
  touchY = null;
}, { passive: false });
window.addEventListener("keydown", (event) => {
  const down = ["ArrowDown", "PageDown", " "], up = ["ArrowUp", "PageUp"];
  const dir = down.includes(event.key) ? 1 : up.includes(event.key) ? -1 : 0;
  if (dir && handleIntent(dir)) event.preventDefault();
});
*/


/* ==================================================================
   第5章 GSAP2 レイヤーの表示/非表示(地図)
   ================================================================== */
const map = document.querySelector("#map");

// ■スマホでは表示範囲を変えて、列島を画面の中央に
const narrow = window.matchMedia("(max-width: 760px)");
function fitMap() {
  map.setAttribute("viewBox", narrow.matches ? "0 0 1000 1000" : "-280 0 1280 1000");
}
fitMap();
narrow.addEventListener("change", fitMap);

// ■最初は全レイヤーを隠す(Illustrator のレイヤー名が、そのまま id になっている)
gsap.set("#layer-soy-jp, #layer-soy-import, #layer-rice, #layer-salt, #layer-kura", { autoAlpha: 0 });

// 【演習5-1】レイヤーを出す関数 ──────────────────────────────
// 呼ばれると、①②③が同時に始まる
function showLayer(layer) {
  if (!layer) return;                        // レイヤーがないステップでは何もしない

  // ① レイヤーをふわっと出す
  gsap.to(layer, { autoAlpha: ____, duration: .5, overwrite: true });

  // ② ルートの線を、伸びていくように描く
  layer.querySelectorAll(".route").forEach((path) => {
    const len = path.getTotalLength();       // 線の長さ
    gsap.fromTo(path,
      { strokeDasharray: len, strokeDashoffset: ____ },               // 線が見えない状態から
      { strokeDashoffset: ____, duration: 1.2, ease: "power2.out" }); // 全部見える状態へ
  });

  // ③ 産地の点を、順番にポンと出す
  gsap.from(layer.querySelectorAll(".spot"),
    { scale: 0, opacity: 0, stagger: ____, ease: "back.out(2)", transformOrigin: "50% 50%" });
    //                               ↑ 何秒ずつずらすか
}

// ■レイヤーを隠す ───────────────────────────────
function hideLayer(layer) {
  if (!layer) return;
  gsap.to(layer, { autoAlpha: 0, duration: .5, overwrite: true });
}

// ■左上のパネルの文章を入れ替える ─────────────────────
const panel      = document.querySelector("#panel");
const panelTitle = document.querySelector("#panel-title");
const panelText  = document.querySelector("#panel-text");
function showPanel(step) {
  gsap.to(panel, { autoAlpha: 0, duration: .2, onComplete: () => {
    if (!step.dataset.title) return;          // 文章のないステップではパネルを出さない
    panelTitle.textContent = step.dataset.title;
    panelText.textContent  = step.dataset.text;
    gsap.to(panel, { autoAlpha: 1, duration: .4 });
  } });
}

// 【演習5-2】スクロールのきっかけを作る:コールバックの名前を書く ─────────
// ステップ(見えない div)ごとに、data-layer に書いたレイヤーを1枚ずつ足していく
document.querySelectorAll(".step").forEach((step) => {
  const layer = document.getElementById("layer-" + step.dataset.layer);
  ScrollTrigger.create({
    trigger: step,
    start: "top 60%",                        // ステップの上端が、画面の上から60%に来たら
    end: "bottom 60%",
    // markers: true,                        // ← 位置を確かめたいときはコメントを外す
    ____: () => { showLayer(layer); showPanel(step); },  // ① 下に進んで入った
    ____: () => showPanel(step),                     // ② 上に戻って入った
    ____: () => hideLayer(layer),                    // ③ 上に戻って出た
  });
});


/* ==================================================================
   第6章 GSAP3 一枚絵のズームと移動(蔵)
   注目点(px, py)を倍率 s で画面中央に置くには
   x = 800 - s × px、y = 500 - s × py(800, 500 は絵の中心)
   ================================================================== */
const camera = document.querySelector("#viewport3 .camera");
gsap.set(camera, { svgOrigin: "0 0" });     // 拡大の基準を絵の左上にそろえる

// ■釜の湯気はスクロールと関係なくゆらゆら動かす
gsap.to("#viewport3 .steam path", {
  y: -20, opacity: .2, duration: 1.6, stagger: .4, repeat: -1, yoyo: true, ease: "sine.inOut"
});

// 【演習6-1】巡る地点のリスト:座標と倍率を書く ──────────────────────
// 座標は assets/svg/kura.svg を Illustrator で開き、ウィンドウ → 情報 で、見せたい場所の X・Y を調べる
// s は拡大の倍率(2〜3 くらい)
// 「all」と「mushi」は見本。koji / mix / taru の ____ を埋める
const stops = [
  { id: "all",   x: 800,  y: 500, s: 1,   title: "味噌蔵をのぞく",
    text: "大豆が味噌になるまでを、蔵の中で順番に見ていきます。左の釜から、右の樽へ。" },
  { id: "mushi", x: 255,  y: 680, s: 2.6, title: "浸す・蒸す",
    text: "乾いた大豆を一晩水に浸けると、2倍ほどにふくらみます。それを大きな釜で、指でつぶせるほどやわらかく蒸します。" },
  { id: "koji",  x: ____, y: ____, s: ____, title: "麹をつくる",
    text: "蒸した米に麹菌をふりかけ、30℃前後に保った部屋で2日ほど。米の表面が白い菌糸でおおわれ、「麹」になります。" },
  { id: "mix",   x: ____, y: ____, s: ____, title: "混ぜる",
    text: "蒸した大豆に、麹と塩を加えてつぶしながら混ぜます。この時点では、まだ淡い黄色のペースト。麹と塩の割合が、味噌の個性を決めます。" },
  { id: "taru",  x: ____, y: ____, s: ____, title: "寝かせる",
    text: "大人の背丈を超える木桶に詰め、石を積んで重しにします。八丁味噌では石を円すい状に積み、2年以上寝かせます。" },
  { id: "dive",  x: 1230, y: 700, s: 5,   title: "樽の中へ",
    text: "仕込みを終えた味噌は、この樽の中で長い眠りにつきます。ここから先は、樽の中の時間の話です。" },
];

// ■キャプションのHTMLを、リストから作る
const capBox = document.querySelector(".captions");
stops.forEach((p) => {
  capBox.insertAdjacentHTML("beforeend",
    `<div class="caption" id="cap-${p.id}"><h3>${p.title}</h3><p>${p.text}</p></div>`);
});

// 【演習6-2】地点を巡るタイムライン ─────────────────────────────
const tlKura = gsap.timeline({
  scrollTrigger: {
    trigger: "____",                       // ① どの要素で(蔵の章)
    start: "____",                      // ② 章の上端が画面の上端に来たら開始
    end: "+=" + stops.length * ____,       // ③ 地点の数 × 1200px スクロールする
    scrub: ____,                              // ④ スクロールに合わせて進める(1秒遅れでなめらかに)
    pin: ____,                             // ⑤ その間、蔵の章を画面に固定する
  }
});

// 地点ごとに「移動 → キャプションを出す → 読む時間をあけて消す」を順に並べる
stops.forEach((p) => {
  // カメラをその地点へ動かす(式は上の説明のとおり)
  tlKura.to(camera, { x: 800 - p.s * p.x, y: 500 - p.s * p.y, scale: p.s, duration: 1, ease: "power2.inOut" });
  tlKura.to("#cap-" + p.id, { autoAlpha: ____, duration: .3 });          // ⑥ キャプションを出す
  tlKura.to("#cap-" + p.id, { autoAlpha: ____, duration: .3 }, "+=1.2"); // ⑦ 1.2 秒読ませてから、消す
});


/* ==================================================================
   第4章 GSAP1 スクロールと連動するアニメ(樽)
   ================================================================== */

// ■日数に合わせて、表示を切り替える ─────────────────────
// showYears(日数):「約1年3か月」のような言いかえを出す
const yearsEl = document.querySelector("#years");
function showYears(day) {
  if (day < 30) {
    yearsEl.textContent = "仕込んだばかり";
  } else if (day < 365) {
    yearsEl.textContent = "約" + Math.floor(day / 30.4) + "か月";
  } else {
    yearsEl.textContent = "約" + Math.floor(day / 365) + "年" + Math.floor((day % 365) / 30.4) + "か月";
  }
}

// showStage(日数):その日数に合った味噌の説明(#stage0〜#stage4)だけを出す
const stageDays = [0, 10, 70, 400, 725];    // 何日目から、その説明を出すか(天然醸造の目安)
let currentStage = -1;
function showStage(day) {
  let n = 0;
  stageDays.forEach((d, i) => {
    if (day >= d) n = i;                     // day を超えている、いちばん後ろの説明
  });
  if (n === currentStage) return;            // 変わっていなければ何もしない
  currentStage = n;
  gsap.to(".stage", { autoAlpha: 0, duration: .2, overwrite: true });   // 途中の動きを止めてから隠す
  gsap.to("#stage" + n, { autoAlpha: 1, duration: .3, overwrite: true });
}
showStage(0);                                // 最初の説明を出しておく

const daysEl = document.querySelector("#days");
const taru = { f: 0 };                       // Lottie のコマ番号を入れておく箱(0〜300)

// 【演習4-1】スクロールに合わせて、コマ番号を 0 → 300 へ動かす ──────────
gsap.to(taru, {
  f: ____,                 // ① 最後のコマ番号
  ease: "____",            // ② スクロールと同じ割合で進める ease の名前
  onUpdate: showTaru,      // 動くたびに showTaru を呼ぶ
  scrollTrigger: {
    trigger: "____",       // ③ どの要素で(樽の章)
    start: "____",      // ④ #ch1 の上端が画面の上端に来たら開始
    end: "____",        // ⑤ そこから 10700px 分スクロールしたら終了
    scrub: ____,           // ⑥ スクロールに合わせて進める(1秒遅れでなめらかに)
    pin: ____,             // ⑦ その間、#ch1 を画面に固定する
    // markers: true,
  },
});

// コマ番号が変わるたびに呼ばれる:絵を送り、そのコマから日数を計算して表示する
function showTaru() {
  taruAnim.goToAndStop(taru.f, true);        // taru.f のコマを表示する

  // 【演習4-2】コマ番号から日数を計算する ───────────────────────
  // 0〜75コマは仕込み(0日)。75〜300コマの「225コマ」を、0〜1095日(3年)に置きかえる
  //   日数 = (今のコマ - 仕込みが終わるコマ) ÷ 熟成のコマ数 × 3年の日数
  const day = Math.max(0, Math.round((taru.f - ____) / ____ * ____));
  //                                         ↑①          ↑②     ↑③

  daysEl.textContent = day.toLocaleString("ja-JP");   // 3桁ごとにカンマを付けて表示
  showYears(day);
  showStage(day);
}


/* ==================================================================
   ページの最後のお椀:トップと同じお椀を、画面に入ったら一度だけ再生する
   ================================================================== */
const finaleAnim = lottie.loadAnimation({
  container: document.getElementById("bowl"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "lottie/bowl.json",                     // トップと同じお椀
});

ScrollTrigger.create({
  trigger: "#finale",
  start: "top 65%",
  once: true,                                   // 一度だけ
  onEnter: () => playBowl(finaleAnim),          // トップと同じ「登場 → 湯気をくり返す」
});
