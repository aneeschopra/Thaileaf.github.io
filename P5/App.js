var SCALE = 20;
var ROWS;
var COLS;
var flowfield;
var particles = [];
var fr = 60; // frame rate
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    ROWS = floor(height/SCALE);
    COLS = floor(width/SCALE);


    flowfield = new Array(COLS*ROWS);

    // stroke(255);
    // for(let i = 0; i < 500; i++) {
    //   particles[i] = new Particle(random(width), random(height));
    // }
    background(255);

    frameRate(fr);
}



var inc = 0.1;
var zOff = 0;

function draw() {
    var yoff = 0;
    for(let y = 0; y < ROWS; y++) {
        var xoff = 0;
        for(let x = 0; x < COLS; x++) {
            var index = x + y * COLS;

            ang = noise(xoff, yoff, zOff) * TWO_PI;
            var v = p5.Vector.fromAngle(ang);
            v.setMag(1);
            flowfield[index] = v;
            // console.log(v);
            // rect(x * SCALE, y * SCALE, SCALE, SCALE);
            // stroke(255);
            // strokeWeight(1);
            // push();
            // translate(x*SCALE,y*SCALE);
            // rotate(v.heading());
            // line(0, 0, SCALE, 0);
            // pop();

            xoff += inc;
            // noLoop();
        }
        yoff += inc;
        zOff += 0.0001;
    }
    for(let i = 0; i < particles.length; i++) {
        let living = particles[i].update();
        particles[i].follow(flowfield);
        particles[i].show();
        if(living === false) {
            particles.splice(i, 1);
        }
    }

    if(mouseIsPressed == true) {
        drawParticles(mouseX, mouseY, 200, 5);
    }
}

function drawParticles(x, y , rad, amt) {
    let xoff = random(-rad, rad);
    let yoff = random(-rad, rad)
    // console.log(x - rad);

    for(let i = 0; i < amt; i++) {
        // particles.append(new Particle(x + xOff, y + yOff));
        append(particles, new Particle(x + xoff, y + yoff));
    }
    // console.log(x);
    // console.log(x + xOff);

}

