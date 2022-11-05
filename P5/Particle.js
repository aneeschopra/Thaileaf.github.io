function Particle(x, y) {
    this.pos = createVector(x,y);
    this.startingVel = 2;
    this.vel = createVector(random(this.startingVel),random(this.startingVel));
    this.acc = createVector(0,0);
    this.opacity = 75;
    this.opacityIncr = 0.20;

    this.color = color(random(255), random(255),random(255), this.opacity);
    this.maxspeed = 2;
    this.life = 10 * fr;

    this.prevpos = this.pos.copy();


    this.update = function() {
        this.updatePrev();

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(this.maxspeed);
        this.life -= 1;
        if(this.life < 0) {
            return false;
        }

    }

    this.updatePrev = function () {
        this.prevpos.x = this.pos.x;
        this.prevpos.y = this.pos.y;
    }

    this.follow = function(vectors) {
        var x = floor(this.pos.x/SCALE);
        var y = floor(this.pos.y/SCALE);

        var index = x + y * COLS;
        this.applyForce(vectors[index]);
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.show = function() {
        // stroke(255,90);
        strokeWeight(1);
        stroke(this.color);
        this.color.setAlpha(this.opacity);
        this.opacity -= this.opacityIncr;
        // opacity(0.5);
        // point(this.prevpos.x, this.prevpos.y);
        // console.log(this.prevpos);
        line(this.pos.x, this.pos.y, this.prevpos.x, this.prevpos.y);
        // line(this.pos.x, this.pox)
    }
}