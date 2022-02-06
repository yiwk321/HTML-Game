class Helicopter extends Rotatable {
    constructor(x, y, velocity_x, velocity_y) {
        super(x, y, velocity_x, velocity_y);
        this.body = document.getElementById("heli");
        this.rotor = document.getElementById("rotor");
        this.rotor_offset_x = 40;
        this.rotor_offset_y = 0;
        this.rotor_angle = 0;
        this.rotation_speed = 0.03 * Math.PI;
        this.cooldown = 120;
        this.score = 0;
        this.death = 0;
        this.respawn_timer = 480;
        this.dead = false;
    }

    draw(context) {
        if (this.dead) return;

        context.save();
        context.translate(this.x, this.y);
        context.beginPath();

        context.font = "15px Arial";
        context.fillText("S: " + this.score + " D: " + this.death, -10, -10)

        this.drawRotatedImage(context, this.body, this.rotate_angle);

        context.translate(-this.rotor.naturalWidth / 2, -this.rotor.naturalHeight / 2);
        context.translate(this.rotor_offset_x, this.rotor_offset_y);
        this.drawRotatedImage(context, this.rotor, this.rotor_angle);

        context.closePath();
        context.restore();
    }

    update() {
        if (this.dead) {
            this.respawn_timer--;
            if (this.respawn_timer == 0) this.respawn();
            return;
        }
        super.update();
        if (this.cooldown % 10 == 0) {
            var random_x = (Math.random() - 0.5) * 0.2;
            var random_y = (Math.random() - 0.5) * 0.2;
            if (random_x * this.velocity_x < 0 && Math.abs(this.velocity_x + random_x) > 1) this.velocity_x += random_x;
            if (random_y * this.velocity_y < 0 && Math.abs(this.velocity_y + random_y) > 1) this.velocity_y += random_y;
            if (this.cooldown % 50 == 0) {
                this.updateRotateAngle();
            }
        }
        this.rotor_angle += this.rotation_speed;
        this.cooldown--;
    }

    respawn() {
        this.dead = false;
        this.x = Math.random() * 0.7 * this.canvas.width;
        this.y = Math.random() * 0.7 * this.canvas.height;
        this.velocity_x = (Math.random() - 0.5) * 8;
        this.velocity_y = (Math.random() - 0.5) * 8;
        var velocity = Math.sqrt(this.velocity_x * this.velocity_x + this.velocity_y * this.velocity_y);
        if (velocity < 2) {
            this.velocity_x *= 2 / velocity;
            this.velocity_y *= 2 / velocity;
        }
        this.cooldown = 120;
        this.respawn_timer = 480;
    }

    maybeShoot() {
        if (this.cooldown <= 0) {
            this.cooldown = 300;
            return new Missile(this.x + this.body.naturalWidth / 2, this.y + this.body.naturalHeight / 2,
                this.velocity_x * 2 + Math.random(), this.velocity_y * 2 + Math.random(),
                this, this.canvas.width, this.canvas.height);
        }
        return null;
    }

    changeScore(score) { this.score += score; }

    die() {
        this.dead = true;
        this.death++;
    }
}