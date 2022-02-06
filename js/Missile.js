class Missile extends Rotatable {
    constructor(x, y, velocity_x, velocity_y, owner) {
        super(x, y, velocity_x, velocity_y);
        this.body = document.getElementById("missile");
        this.safe = true;
        this.count = 0;
        this.owner = owner;
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();

        this.drawRotatedImage(context, this.body, this.rotate_angle);

        context.closePath();
        context.restore();
    }

    update() {
        super.update();
        if (this.safe) {
            this.count++;
            if (this.count > 100) {
                this.safe = false;
            }
        }
    }

    getOwner() { return this.owner; }
}