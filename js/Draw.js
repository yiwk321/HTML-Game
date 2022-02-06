window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var helicopters = new Array();
    var missiles = new Array();
    var explosions = new Array();
    const num_helicopters = 5;
    createHelicopters(num_helicopters);
    requestAnimationFrame(mainLoop);

    function mainLoop() {
        update();
        draw();
        requestAnimationFrame(mainLoop);
    }

    function update() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        for (var i = 0; i < helicopters.length; i++) {
            helicopters[i].update();
            var missile = helicopters[i].maybeShoot();
            if (missile != null) {
                missiles.push(missile);
            }
        }
        for (var i = 0; i < missiles.length; i++) {
            missiles[i].update();
        }
        checkCollision();
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var arr = Array.from(helicopters);
        for (var i = 0; i < arr.length; i++) {
            arr[i].draw(context);
        }
        arr = Array.from(missiles);
        for (var i = 0; i < arr.length; i++) {
            arr[i].draw(context);
        }
        for (var i = 0; i < explosions.length; i++) {
            explosions[i].draw(context);
            if (explosions[i].getCount() > 20) {
                explosions.splice(i, 1);
            }
        }
    }

    function checkCollision() {
        for (var i = 0; i < missiles.length; i++) {
            if (missiles[i].safe) continue;
            for (var j = i + 1; j < missiles.length; j++) {
                if (missiles[j].safe) continue;
                if (missiles[i].collideWith(missiles[j])) {
                    explosions.push(new Explosion(missiles[i].x, missiles[i].y));
                    missiles.splice(j, 1);
                    missiles.splice(i, 1);
                    i--;
                    break;
                }
            }
        }

        for (var j = 0; j < helicopters.length; j++) {
            for (var i = 0; i < missiles.length; i++) {
                if (missiles[i].safe) continue;
                if (helicopters[j].collideWith(missiles[i])) {
                    explosions.push(new Explosion(missiles[i].x, missiles[i].y));
                    var owner = missiles[i].getOwner();
                    if (owner == helicopters[j]) {
                        owner.changeScore(-1);
                    } else {
                        owner.changeScore(1);
                    }
                    // helicopters.splice(j, 1);
                    helicopters[j].die();
                    missiles.splice(i, 1);
                    j--;
                    break;
                }
            }
        }
    }

    function createHelicopters(num_helicopters) {
        for (var i = 0; i < num_helicopters; i++) {
            createHelicopter(i);
        }
    }

    function createHelicopter() {
        var x = Math.random() * 0.7 * canvas.width;
        var y = Math.random() * 0.7 * canvas.height;
        var velocity_x = (Math.random() - 0.5) * 5;
        var velocity_y = (Math.random() - 0.5) * 5;
        helicopters.push(new Helicopter(x, y, velocity_x, velocity_y));
    }
};