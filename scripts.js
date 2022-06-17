const canvas = document.getElementById("fortress");
const ctx = canvas.getContext("2d");
var audio = new Audio('Cannon2.mp3')
var boom = new Audio('Grenade.mp3')
let score = 10;
const width = canvas.width;
const height = canvas.height;
const tankWidth = 60;
const tankHeight = 50;
let tankX = 0;
const tankDx = 3;
let tankLeftPressed = false;
let tankRightPressed = false;
let tankCenterX;
let tankCenterY;
let cannonAngle = Math.PI / 4;
const cannonAngleDIF = Math.PI / 60;
const cannonLength = 60;
const targetWidth = Math.floor(Math.random() * 70 + 20);
const targetHeight = Math.floor(Math.random() * 70 + 10);
const targetX = Math.floor(Math.random() * (1000 - targetWidth) + 500);
const targetY = height - targetHeight;

const target2Width = Math.floor(Math.random() * 70 + 20);
const target2Height = Math.floor(Math.random() * 70 + 10);
const target2X = Math.floor(Math.random() * (1000 - target2Width) + 500);
const target2Y = height - target2Height;

const target3Width = Math.floor(Math.random() * 70 + 20);
const target3Height = Math.floor(Math.random() * 70 + 10);
const target3X = Math.floor(Math.random() * (1000 - target3Width) + 500);
const target3Y = height - target3Height;

const target4Width = Math.floor(Math.random() * 70 + 20);
const target4Height = Math.floor(Math.random() * 70 + 10);
const target4X = Math.floor(Math.random() * (1000 - target4Width) + 500);
const target4Y = height - target4Height;

let target5Width;
let target5Height;
let target5X;
let target5Y;
let target5draw=false;
let target5turn=false;

let target6Width;
let target6Height;
let target6X;
let target6Y;
let target6draw=false;
let target6turn=false;

let target7Width;
let target7Height;
let target7X;
let target7Y;
let target7draw=false;
let target7turn=false;

let missileRadius = 5;
let missileX;
let missileY;
let isCharging = false;
let isFired = false;
let isHitted = false;
let isHitted2 = false;
let isHitted3 = false;
let isHitted4 = false;
let isHitted5 = false;
let isHitted6 = false;
let isHitted7 = false;
let gauge = Math.PI;
const gaugeDIF = Math.PI / 60;
const gaugeBarRadius = 30;
let missilePower;
let missileDx;
let missileDy;
const GRAVITY_ACCELERATION = 0.098;
let gamecount = Math.floor(Math.random() * 10 % 10) + 2;

const draw = () => {
    ctx.clearRect(0, 0, width, height);
    tankCenterX = tankX + 0.6 * tankWidth;
    tankCenterY = height - 0.75 * tankHeight;
    ctx.font ="20pt Fira";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText(score, 300, 150);
    ctx.fillText("남은 포탄 개수", 100, 150);
    ctx.fillText("Fortressgame", 100, 100);
    if (tankLeftPressed && tankX > 0) {
        tankX -= tankDx;
    }
    if (tankRightPressed && tankX + tankWidth < width / 4) {
        tankX += tankDx;
    }
    if (isCharging && !isFired) {
        if (gauge < Math.PI * 2) {
        gauge += gaugeDIF;
        }
        drawGausing();
    }
    if (!isFired) {
        missileX = tankCenterX + cannonLength * Math.cos(cannonAngle);
        missileY = tankCenterY - cannonLength * Math.sin(cannonAngle);
    } else {
        missileDy -= GRAVITY_ACCELERATION;
        missileX = missileX + missileDx;
        missileY = missileY - missileDy;
    }
    if (!target5draw)
    {
        target5Width = 29;
        target5Height = 50;
        target5X = 1200;
        target5Y = 650;
        target5draw = true;
    }
    else
    {
        if (target5X <= width/1.5)
        {
            target5turn = true;
        }
        if (target5X >= width)
        {
            target5turn = false;
        }
        if (!target5turn)
        {
            target5X -= 4;
        }
        if (target5turn)
        {
            target5X += 4;
        }
    }
    if (!target6draw)
    {
        target6Width = 29;
        target6Height = 50;
        target6X = 1100;
        target6Y = 670;
        target6draw = true;
    }
    else
    {
        if (target6X <= width/1.5)
        {
            target6turn = false;
        }
        if (target6X >= width)
        {
            target6turn = true;
        }
        if (!target6turn)
        {
            target6X += 5;
        }
        if (target6turn)
        {
            target6X -= 5;
        }
    }
    if (!target7draw)
    {
        target7Width = 29;
        target7Height = 50;
        target7X = 1300;
        target7Y = 650;
        target7draw = true;
    }
    else
    {
        if (target7X <= width/1.5)
        {
            target7turn = true;
        }
        if (target7X >= width)
        {
            target7turn = false;
        }
        if (!target7turn)
        {
            target7X -= 6;
        }
        if (target7turn)
        {
            target7X += 6;
        }
    }
    checkMissile();
    drawTank();
    if (!isHitted) {
        drawTarget();
        drawMissile();
    }
    if (!isHitted2) {
        drawTarget2();
        drawMissile();
    }
    if (!isHitted3) {
        drawTarget3();
        drawMissile();
    }
    if (!isHitted4) {
        drawTarget4();
        drawMissile();
    }
    if (!isHitted5) {
        drawTarget5();
        drawMissile();
    }
    if (!isHitted6) {
        drawTarget6();
        drawMissile();
    }
    if (!isHitted7) {
        drawTarget7();
        drawMissile();
    }
};
const checkMissile = () => {
    if (missileX <= 0 || missileX >= width || missileY >= height) {
        isFired = false;
    }
    if (
        missileX >= targetX &&
        missileX <= targetX + targetWidth &&
        missileY >= targetY
    ) {
        p_sound();
        isHitted = true;
        ctx.clearRect(targetX, targetY, targetWidth, targetHeight);
    }
    if (
        missileX >= target2X &&
        missileX <= target2X + target2Width &&
        missileY >= target2Y)
        {
            p_sound();
            isHitted2 = true;
            ctx.clearRect(target2X, target2Y, target2Width, target2Height);
        }
    if (
        missileX >= target3X &&
        missileX <= target3X + target3Width &&
        missileY >= target3Y)
        {
            p_sound();
            isHitted3 = true;
            ctx.clearRect(target3X, target3Y, target3Width, target3Height);
        }
    if (
        missileX >= target4X &&
        missileX <= target4X + target4Width &&
        missileY >= target4Y)
        {
            p_sound();
            isHitted4 = true;
            ctx.clearRect(target4X, target4Y, target4Width, target4Height);
        }
    if (
        missileX >= target5X &&
        missileX <= target5X + target5Width &&
        missileY >= target5Y)
        {
            p_sound();
            isHitted5 = true;
            ctx.clearRect(target5X, target5Y, target5Width, target5Height);
        }
    if (
        missileX >= target6X &&
        missileX <= target6X + target6Width &&
        missileY >= target6Y)
        {
            p_sound();
            isHitted6 = true;
            ctx.clearRect(target6X, target6Y, target6Width, target6Height);
        }
    if (
        missileX >= target7X &&
        missileX <= target7X + target7Width &&
        missileY >= target7Y)
        {
            p_sound();
            isHitted7 = true;
            ctx.clearRect(target7X, target7Y, target7Width, target7Height);
        }
        if ((isHitted && isHitted2 && isHitted3 && isHitted4 && isHitted5 && isHitted6 && isHitted7))
        {
            clearInterval(start);
            if (confirm("모두 명중하셨습니다! 다시 하시겠습니까?")) {
                location.reload();
            }    
        }
        if (score == -1)
        {
            clearInterval(start);
            if (confirm("미션 실패입니다. 재도전 하시겠습니까?")) {
                location.reload();
            }    
        }
};
const drawMissile = () => {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(missileX, missileY, missileRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
};
const drawGausing = () => {
    ctx.beginPath();
    ctx.arc(
        tankCenterX,
        tankCenterY - cannonLength,
        gaugeBarRadius,
        Math.PI,
        gauge,
        false
    );
    ctx.stroke();
};
const drawTank = () => {
    ctx.lineWidth = 10;
    ctx.strokeStyle = "green";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(tankX, height - tankHeight/2);
    ctx.lineTo(tankX + tankWidth, height - tankHeight/2);
    ctx.lineTo(tankX + tankWidth, height);
    ctx.lineTo(tankX, height);
    ctx.lineTo(tankX, height - tankHeight/2);

    ctx.moveTo(tankX + 10, height - tankHeight);
    ctx.lineTo(tankX + tankWidth - 10, height  - tankHeight);
    ctx.lineTo(tankX + tankWidth - 10, height - tankHeight/2);
    ctx.lineTo(tankX + 10, height - tankHeight/2);
    ctx.lineTo(tankX + 10, height - tankHeight);
    ctx.moveTo(tankCenterX, tankCenterY);
    ctx.lineTo(
        tankCenterX + cannonLength * Math.cos(cannonAngle),
        tankCenterY - cannonLength * Math.sin(cannonAngle)
        );
        ctx.stroke();
        ctx.closePath();
};

const drawTarget = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(targetX, targetY, targetWidth, targetHeight);
    console.log(targetX, targetY,targetWidth, targetHeight);
};

const drawTarget2 = () => {
    ctx.fillStyle = "yellow";
    ctx.fillRect(target2X, target2Y, target2Width, target2Height);
};

const drawTarget3 = () => {
    ctx.fillStyle = "purple";
    ctx.fillRect(target3X, target3Y, target3Width, target3Height);
};

const drawTarget4 = () => {
    ctx.fillStyle = "blue";
    ctx.fillRect(target4X, target4Y, target4Width, target4Height);
};
const drawTarget5 = () => {
    ctx.fillStyle = "pink";
    ctx.fillRect(target5X, target5Y, target5Width, target5Height);
};
const drawTarget6 = () => {
    ctx.fillStyle = "green";
    ctx.fillRect(target6X, target6Y, target6Width, target6Height);
};
const drawTarget7 = () => {
    ctx.fillStyle = "orange";
    ctx.fillRect(target7X, target7Y, target7Width, target7Height);
};
draw();

const p_sound = () => {
    if (!isHitted)
    {
        boom.play();
    }
};
const p_sound2 = () => {
    if (!isHitted2)
    {
        boom.play();
    }
};
const p_sound3 = () => {
    if (!isHitted3)
    {
        boom.play();
    }
};
const p_sound4 = () => {
    if (!isHitted4)
    {
        boom.play();
    }
};
const p_sound5 = () => {
    if (!isHitted5)
    {
        boom.play();
    }
};
const p_sound6 = () => {
    if (!isHitted6)
    {
        boom.play();
    }
};
const p_sound7 = () => {
    if (!isHitted7)
    {
        boom.play();
    }
};

const keydownHandler = event => {
    if (event.keyCode === 37) {
        tankLeftPressed = true;
    } 
    else if (event.keyCode === 39) {
        tankRightPressed = true;
    } 
    else if (event.keyCode === 38 && cannonAngle <= Math.PI / 2) {
        cannonAngle += cannonAngleDIF;
    } 
    else if (event.keyCode === 40 && cannonAngle >= 0) {
        cannonAngle -= cannonAngleDIF;
    } 
    else if (event.keyCode === 32 && !isFired) {
        isCharging = true;
    }
};
const keyupHandler = event => {
    if (event.keyCode === 37) {
        tankLeftPressed = false;
    } 
    else if (event.keyCode === 39) {
        tankRightPressed = false;
    } 
    else if (event.keyCode === 32 && !isFired) {
        isCharging = false;
        isFired = true;
        score--;
        audio.play();
        missilePower = gauge * 1.6;
        missileDx = missilePower * Math.cos(cannonAngle);
        missileDy = missilePower * Math.sin(cannonAngle);
        gauge = Math.PI;
    }
};
const start = setInterval(draw, 10);
document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyupHandler, false);