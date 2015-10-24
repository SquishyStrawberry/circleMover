document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d");

    var keys = {},
        lastCall = +new Date();

    var keyConstants = {
        37: "left",
        39: "right",
        38: "up",
        40: "down"
    };
    
    var player = {
        x: 0,
        y: 0,
        radius: 100,
        speed: 10,
        stroke: "#ff0000",
        fill: "#e1e1e1"
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener("keydown", function(e) {
        if (e.keyCode in keyConstants) {
           keys[keyConstants[e.keyCode]] = true; 
        }
    });
    window.addEventListener("keyup", function(e) {
        if (e.keyCode in keyConstants) {
           keys[keyConstants[e.keyCode]] = false; 
        }
    });

    function init() {
        document.body.appendChild(canvas);
        window.requestAnimationFrame(loop);
    }

    function update(dt) {
        if (keys.left) player.x -= player.speed * dt;
        if (keys.right) player.x += player.speed * dt;
        if (keys.up) player.y -= player.speed * dt;
        if (keys.down) player.y += player.speed * dt;
        player.x = Math.min(canvas.width, Math.max(player.x, 0));
        player.y = Math.min(canvas.height, Math.max(player.y, 0));
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = player.fill;
        context.strokeStyle = player.stroke;
        context.arc(player.x + player.radius, 
                    player.y + player.radius, 
                    player.radius, 
                    0, Math.PI * 2);
        context.fill();
        context.stroke();
    }

    function loop() {
        var newCall = +new Date();
        var delta = (newCall - lastCall) / 1000.0;
        update(delta);
        draw();
        lastCall = newCall;
        window.requestAnimationFrame(loop);
    }

    init();
});

