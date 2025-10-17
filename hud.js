(function() {
  console.log("[BetterHUD] Loaded!");

  // === Create HUD container ===
  const hud = document.createElement("div");
  hud.id = "better-hud";
  document.body.appendChild(hud);

  hud.innerHTML = `
    <div class="hud-box">
      <div>Airspeed: <span id="hud-airspeed">0</span> kt</div>
      <div>Altitude: <span id="hud-altitude">0</span> ft</div>
      <div>Vertical Speed: <span id="hud-vspeed">0</span> fpm</div>
      <div>Heading: <span id="hud-heading">0</span>°</div>
      <div>Throttle: <span id="hud-throttle">0</span>%</div>
      <div>Pitch: <span id="hud-pitch">0</span>°</div>
    </div>
  `;

  // === Update HUD ===
  function updateHUD() {
    if (!geofs.aircraft || !geofs.aircraft.instance) return;

    const a = geofs.aircraft.instance;
    const airspeed = (a.groundSpeed * 1.94384).toFixed(0);
    const altitude = (a.llaLocation[2] * 3.281).toFixed(0);
    const vspeed = (a.verticalSpeed * 196.85).toFixed(0);
    const heading = geofs.animation.values.heading360.toFixed(0);
    const throttle = (geofs.animation.values.throttle * 100).toFixed(0);
    const pitch = (geofs.animation.values.pitch * (180 / Math.PI)).toFixed(1);

    document.getElementById("hud-airspeed").textContent = airspeed;
    document.getElementById("hud-altitude").textContent = altitude;
    document.getElementById("hud-vspeed").textContent = vspeed;
    document.getElementById("hud-heading").textContent = heading;
    document.getElementById("hud-throttle").textContent = throttle;
    document.getElementById("hud-pitch").textContent = pitch;
  }

  setInterval(updateHUD, 250);

  console.log("[BetterHUD] Running smoothly!");
})();
