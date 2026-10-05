const state = {
  lambda: 550,
  slit: 0.50,
  distance: 1.00,
  source: true,
  doubleSlit: true,
  mode: "intensity",
  detected: false,
  hitTimer: null
};

const $ = id => document.getElementById(id);
const marker = $("marker");
const intensityBars = $("intensityBars");
const hits = $("hits");
const screen = $("screen");

function setStatus(t){ $("status").textContent = t; }

function normalizeIntensity(x){
  // educational normalized double-slit intensity:
  // envelope * interference
  const lambda = state.lambda / 550;
  const d = state.slit;
  const L = state.distance;
  const beta = Math.PI * x / (0.28 * lambda * L);
  const envelope = Math.pow(Math.sin(beta) / (beta || 1), 2);
  const alpha = Math.PI * d * x / (0.20 * lambda * L);
  const interference = state.doubleSlit ? Math.pow(Math.cos(alpha),2) : 1;
  return Math.max(0, Math.min(1, envelope * interference));
}

function clearEntityChildren(el){
  while(el.firstChild) el.removeChild(el.firstChild);
}

function renderIntensity(){
  clearEntityChildren(intensityBars);
  clearEntityChildren(hits);
  if(state.mode !== "intensity") return;

  const n = 25;
  for(let i=0;i<n;i++){
    const x = -0.34 + i*(0.68/(n-1));
    const I = normalizeIntensity(x);
    const h = 0.02 + I*0.50;
    const bar = document.createElement("a-box");
    bar.setAttribute("position", `0.02 ${0.01+h/2} ${x}`);
    bar.setAttribute("width", "0.025");
    bar.setAttribute("height", h);
    bar.setAttribute("depth", "0.018");
    bar.setAttribute("color", I > 0.55 ? "#3ee8ff" : "#1669a8");
    bar.setAttribute("emissive", I > 0.55 ? "#1dc8ff" : "#0a3150");
    intensityBars.appendChild(bar);
  }
}

function gaussianRand(){
  let u=0,v=0;
  while(u===0)u=Math.random();
  while(v===0)v=Math.random();
  return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
}

function sampleX(){
  for(let k=0;k<30;k++){
    const x = (Math.random()*2-1)*0.34;
    if(Math.random() < normalizeIntensity(x)) return x;
  }
  return (Math.random()*2-1)*0.34;
}

function addHit(){
  const x = sampleX();
  const z = x;
  const y = 0.02 + Math.random()*0.52;
  const dot = document.createElement("a-sphere");
  dot.setAttribute("position", `0.03 ${y} ${z}`);
  dot.setAttribute("radius", "0.008");
  dot.setAttribute("color", "#ffffff");
  dot.setAttribute("emissive", "#ffffff");
  hits.appendChild(dot);
  if(hits.children.length > 140) hits.removeChild(hits.firstChild);
}

function startHits(){
  clearInterval(state.hitTimer);
  state.hitTimer = null;
  if(state.mode !== "hits" || !state.source) return;
  state.hitTimer = setInterval(addHit, 90);
}

function render(){
  $("lambdaVal").textContent = `${state.lambda} nm`;
  $("slitVal").textContent = state.slit.toFixed(2);
  $("distVal").textContent = state.distance.toFixed(2);
  $("sourceBtn").textContent = state.source ? "Sumber ON" : "Sumber OFF";
  $("sourceBtn").className = state.source ? "active" : "off";
  $("slitBtn").textContent = state.doubleSlit ? "Dua Celah" : "Satu Celah";
  $("modeBtn").textContent = state.mode === "intensity" ? "Intensity" : "Hits";
  renderIntensity();
  startHits();
}

$("lambda").addEventListener("input", e => { state.lambda = +e.target.value; render(); });
$("slit").addEventListener("input", e => { state.slit = +e.target.value; render(); });
$("distance").addEventListener("input", e => { state.distance = +e.target.value; render(); });

$("sourceBtn").onclick = () => { state.source=!state.source; render(); };
$("slitBtn").onclick = () => { state.doubleSlit=!state.doubleSlit; render(); };
$("modeBtn").onclick = () => { state.mode = state.mode==="intensity" ? "hits" : "intensity"; render(); };
$("clearBtn").onclick = () => { clearEntityChildren(hits); render(); };
$("fullscreenBtn").onclick = () => {
  if(document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
};

marker.addEventListener("markerFound", () => {
  state.detected = true;
  $("controls").classList.remove("hidden");
  $("status").textContent = "Marker terdeteksi • eksperimen siap.";
});
marker.addEventListener("markerLost", () => {
  state.detected = false;
  $("status").textContent = "Marker hilang • arahkan kamera kembali.";
});

$("startBtn").onclick = () => {
  $("intro").classList.add("hidden");
  setStatus("Mencari Hiro Marker...");
};

render();

// Animate wave rings to make the source visually active.
let t = 0;
function animateWaves(){
  t += 0.02;
  ["wave1","wave2","wave3"].forEach((id,i)=>{
    const el = $(id);
    const s = 1 + ((t + i*0.7)%2.2)*0.45;
    el.object3D.scale.set(s,s,s);
    el.setAttribute("visible", state.source);
  });
  $("sourceGlow").setAttribute("visible", state.source);
  requestAnimationFrame(animateWaves);
}
animateWaves();
