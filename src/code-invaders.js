export class CodeInvadersGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.gameRunning = true;

        this.player = {
            x: 400,
            y: 550,
            width: 40,
            height: 30,
            speed: 5
        };

        this.bullets = [];
        this.invaders = [];
        this.invaderBullets = [];
        this.powerUps = [];
        this.stars = [];
        this.codeLines = [];
        this.explosions = [];
        this.bonusLogo = null;
        this.logoSpawnTimer = 0;

        this.keys = {};
        this.lastShot = 0;
        this.invaderDirection = 1;
        this.invaderMoveTimer = 0;
        this.invaderMoveDelay = 60;

        this.bugTypes = ['🐛', '🐞', '🕷️', '🦗', '🪲'];
        this.bugNames = ['ERROR', '404', 'NULL', 'CRASH', 'SPAM'];

        this.init();
    }

    init() {
        this.createLogoSVG();
        this.createStars();
        this.createCodeLines();
        this.createInvaders();

        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (e.key === ' ') e.preventDefault();
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        this.gameLoop();
    }

    createLogoSVG() {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="42" fill="none">
                <path fill="#EB5E28" d="M.134 21v21H72V0H.134v21Zm69.729 0v18.88H2.27V2.12h67.592V21Z"/>
                <path fill="#EB5E28" d="M10.019 11.063v1.656h5.343v19.609h3.473V12.72h5.343V9.407h-14.16v1.656Zm16.457-.888c2.832 4.956 13.144 22.55 13.21 22.55.054 0 1.577-2.557 3.407-5.697l3.313-5.683.214.357c.12.199 1.63 2.77 3.34 5.724s3.152 5.419 3.205 5.472c.094.106 8.857-14.813 8.857-15.091 0-.133-1.884-3.498-1.964-3.498-.027 0-1.563 2.624-3.42 5.83l-3.393 5.816-.213-.357c-.12-.2-1.203-2.04-2.391-4.095l-2.164-3.736 2.404-4.134c1.336-2.265 2.418-4.147 2.418-4.173 0-.027-.922-.053-2.03-.053h-2.044l-4.743 8.148c-2.604 4.478-4.768 8.148-4.809 8.148-.04 0-2.19-3.67-4.795-8.148l-4.729-8.148h-4.114l.44.768Z"/>
            </svg>
        `;

        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        this.logoImage = new Image();
        this.logoImage.src = url;
    }

    createStars() {
        for (let i = 0; i < 50; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.1
            });
        }
    }

    createCodeLines() {
        const codeSymbols = ['<>', '{}', '//', '[]', '()', '&&', '||', '=='];
        for (let i = 0; i < 20; i++) {
            this.codeLines.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                text: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
                speed: Math.random() * 0.3 + 0.1,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    createInvaders() {
        this.invaders = [];
        const rows = 3;
        const cols = 6;
        const startX = 200;
        const startY = 30;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const bugIndex = Math.floor(Math.random() * this.bugTypes.length);
                this.invaders.push({
                    x: startX + col * 80,
                    y: startY + row * 80,
                    width: 40,
                    height: 30,
                    alive: true,
                    type: this.bugTypes[bugIndex],
                    name: this.bugNames[bugIndex]
                });
            }
        }
    }

    update() {
        if (!this.gameRunning) return;

        this.updatePlayer();
        this.updateBullets();
        this.updateInvaders();
        this.updateInvaderBullets();
        this.updatePowerUps();
        this.updateExplosions();
        this.updateBonusLogo();
        this.updateBackground();
        this.checkCollisions();
        this.checkGameState();
    }

    updatePlayer() {
        if (this.keys['ArrowLeft'] && this.player.x > 0) {
            this.player.x -= this.player.speed;
        }
        if (this.keys['ArrowRight'] && this.player.x < this.canvas.width - this.player.width) {
            this.player.x += this.player.speed;
        }

        if (this.keys[' '] && Date.now() - this.lastShot > 200) {
            this.bullets.push({
                x: this.player.x + this.player.width / 2,
                y: this.player.y,
                width: 3,
                height: 10,
                speed: -7
            });
            this.lastShot = Date.now();
        }
    }

    updateBullets() {
        this.bullets = this.bullets.filter(bullet => {
            bullet.y += bullet.speed;
            return bullet.y > 0;
        });
    }

    updateInvaders() {
        this.invaderMoveTimer++;

        if (this.invaderMoveTimer < this.invaderMoveDelay) {
            return;
        }

        this.invaderMoveTimer = 0;

        let moveDown = false;
        let leftMost = this.canvas.width;
        let rightMost = 0;

        const aliveInvaders = this.invaders.filter(invader => invader.alive);
        if (aliveInvaders.length === 0) return;

        aliveInvaders.forEach(invader => {
            leftMost = Math.min(leftMost, invader.x);
            rightMost = Math.max(rightMost, invader.x + invader.width);
        });

        if (rightMost >= this.canvas.width - 50 || leftMost <= 50) {
            moveDown = true;
            this.invaderDirection *= -1;
        }

        this.invaders.forEach(invader => {
            if (invader.alive) {
                if (moveDown) {
                    invader.y += 15;
                } else {
                    invader.x += this.invaderDirection * 20;
                }
            }
        });

        if (Math.random() < 0.3 && aliveInvaders.length > 0) {
            const randomInvader = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
            this.invaderBullets.push({
                x: randomInvader.x + randomInvader.width / 2,
                y: randomInvader.y + randomInvader.height,
                width: 3,
                height: 8,
                speed: 1
            });
        }
    }

    updateInvaderBullets() {
        this.invaderBullets = this.invaderBullets.filter(bullet => {
            bullet.y += bullet.speed;
            return bullet.y < this.canvas.height;
        });
    }

    updatePowerUps() {
        this.powerUps = this.powerUps.filter(powerUp => {
            powerUp.y += 2;
            return powerUp.y < this.canvas.height;
        });
    }

    updateExplosions() {
        this.explosions = this.explosions.filter(explosion => {
            explosion.timer--;
            explosion.scale += 0.1;
            explosion.opacity -= 0.05;
            return explosion.timer > 0;
        });
    }

    updateBonusLogo() {
        this.logoSpawnTimer++;

        if (this.logoSpawnTimer > 1800 && !this.bonusLogo && Math.random() < 0.02) {
            this.bonusLogo = {
                x: Math.random() * (this.canvas.width - 80) + 40,
                y: -50,
                width: 72,
                height: 42,
                speed: 1,
                wobble: 0
            };
            this.logoSpawnTimer = 0;
        }

        if (this.bonusLogo) {
            this.bonusLogo.y += this.bonusLogo.speed;
            this.bonusLogo.wobble += 0.1;
            this.bonusLogo.x += Math.sin(this.bonusLogo.wobble) * 0.5;

            if (this.bonusLogo.y > this.canvas.height + 50) {
                this.bonusLogo = null;
            }
        }
    }

    updateBackground() {
        this.stars.forEach(star => {
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
        });

        this.codeLines.forEach(line => {
            line.y += line.speed;
            if (line.y > this.canvas.height) {
                line.y = -20;
                line.x = Math.random() * this.canvas.width;
            }
        });
    }

    checkCollisions() {
        this.bullets.forEach((bullet, bulletIndex) => {
            this.invaders.forEach((invader, invaderIndex) => {
                if (invader.alive &&
                    bullet.x < invader.x + invader.width &&
                    bullet.x + bullet.width > invader.x &&
                    bullet.y < invader.y + invader.height &&
                    bullet.y + bullet.height > invader.y) {

                    invader.alive = false;
                    this.bullets.splice(bulletIndex, 1);
                    this.score += 10;

                    this.explosions.push({
                        x: invader.x + invader.width / 2,
                        y: invader.y + invader.height / 2,
                        timer: 20,
                        scale: 0.5,
                        opacity: 1
                    });

                    if (Math.random() < 0.1) {
                        const powerUpTypes = ['☕', '💡', '🚀'];
                        this.powerUps.push({
                            x: invader.x,
                            y: invader.y,
                            type: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)],
                            width: 20,
                            height: 20
                        });
                    }
                }
            });
        });

        for (let i = this.invaderBullets.length - 1; i >= 0; i--) {
            const bullet = this.invaderBullets[i];
            if (bullet.x < this.player.x + this.player.width &&
                bullet.x + bullet.width > this.player.x &&
                bullet.y < this.player.y + this.player.height &&
                bullet.y + bullet.height > this.player.y) {

                this.invaderBullets.splice(i, 1);
                this.lives--;

                this.explosions.push({
                    x: this.player.x + this.player.width / 2,
                    y: this.player.y + this.player.height / 2,
                    timer: 15,
                    scale: 0.8,
                    opacity: 1
                });

                break;
            }
        }

        if (this.bonusLogo) {
            this.bullets.forEach((bullet, bulletIndex) => {
                if (bullet.x < this.bonusLogo.x + this.bonusLogo.width &&
                    bullet.x + bullet.width > this.bonusLogo.x &&
                    bullet.y < this.bonusLogo.y + this.bonusLogo.height &&
                    bullet.y + bullet.height > this.bonusLogo.y) {

                    this.bullets.splice(bulletIndex, 1);
                    this.score += 500;
                    this.lives++;

                    this.explosions.push({
                        x: this.bonusLogo.x + this.bonusLogo.width / 2,
                        y: this.bonusLogo.y + this.bonusLogo.height / 2,
                        timer: 30,
                        scale: 1,
                        opacity: 1
                    });

                    this.bonusLogo = null;
                }
            });
        }

        this.powerUps.forEach((powerUp, powerUpIndex) => {
            if (powerUp.x < this.player.x + this.player.width &&
                powerUp.x + powerUp.width > this.player.x &&
                powerUp.y < this.player.y + this.player.height &&
                powerUp.y + powerUp.height > this.player.y) {

                this.powerUps.splice(powerUpIndex, 1);

                switch (powerUp.type) {
                    case '☕':
                        this.lives++;
                        break;
                    case '💡':
                        this.score += 50;
                        break;
                    case '🚀':
                        this.score += 100;
                        break;
                }
            }
        });
    }

    checkGameState() {
        const aliveInvaders = this.invaders.filter(invader => invader.alive);

        if (aliveInvaders.length === 0) {
            this.level++;
            this.invaderMoveDelay = Math.max(20, this.invaderMoveDelay - 5);
            this.createInvaders();
        }

        if (this.lives <= 0) {
            this.gameOver();
            return;
        }

        let gameOverTriggered = false;
        aliveInvaders.forEach(invader => {
            if (invader.y + invader.height >= this.player.y - 30) {
                gameOverTriggered = true;
            }
        });

        if (gameOverTriggered) {
            this.gameOver();
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.renderBackground();
        this.renderPlayer();
        this.renderBullets();
        this.renderInvaders();
        this.renderInvaderBullets();
        this.renderExplosions();
        this.renderBonusLogo();
        this.renderPowerUps();

        this.updateUI();
    }

    renderBackground() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.stars.forEach(star => {
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        });

        this.ctx.font = '12px Courier New';
        this.codeLines.forEach(line => {
            this.ctx.fillStyle = `rgba(255, 140, 66, ${line.opacity})`;
            this.ctx.fillText(line.text, line.x, line.y);
        });
    }

    renderPlayer() {
        this.ctx.fillStyle = '#ff8c42';
        this.ctx.fillRect(this.player.x + 10, this.player.y + 20, 20, 10);
        this.ctx.fillRect(this.player.x + 15, this.player.y + 10, 10, 15);
        this.ctx.fillRect(this.player.x + 18, this.player.y, 4, 15);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '8px Courier New';
        this.ctx.fillText('T', this.player.x + 18, this.player.y + 8);
    }

    renderBullets() {
        this.ctx.fillStyle = '#ffb380';
        this.bullets.forEach(bullet => {
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    renderInvaders() {
        this.ctx.font = '40px Courier New';
        this.invaders.forEach(invader => {
            if (invader.alive) {
                this.ctx.fillStyle = '#ff0000';
                this.ctx.fillText(invader.type, invader.x, invader.y + 30);

                this.ctx.fillStyle = '#ff6666';
                this.ctx.font = '14px Courier New';
                this.ctx.fillText(invader.name, invader.x, invader.y + 50);
                this.ctx.font = '40px Courier New';
            }
        });
    }

    renderInvaderBullets() {
        this.ctx.fillStyle = '#ff0000';
        this.invaderBullets.forEach(bullet => {
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    renderExplosions() {
        this.explosions.forEach(explosion => {
            this.ctx.save();
            this.ctx.globalAlpha = explosion.opacity;
            this.ctx.translate(explosion.x, explosion.y);
            this.ctx.scale(explosion.scale, explosion.scale);

            this.ctx.fillStyle = '#ff8c42';
            this.ctx.font = '30px Courier New';
            this.ctx.fillText('💥', -15, 10);

            this.ctx.fillStyle = '#ffb380';
            this.ctx.font = '20px Courier New';
            this.ctx.fillText('*', -20, -10);
            this.ctx.fillText('*', 10, -5);
            this.ctx.fillText('*', -5, 20);
            this.ctx.fillText('*', 15, 15);

            this.ctx.restore();
        });
    }

    renderBonusLogo() {
        if (!this.bonusLogo) return;

        this.ctx.save();
        this.ctx.translate(this.bonusLogo.x, this.bonusLogo.y);

        const glow = Math.sin(this.bonusLogo.wobble * 2) * 0.3 + 0.7;
        this.ctx.shadowColor = '#ff8c42';
        this.ctx.shadowBlur = 15 * glow;

        if (this.logoImage && this.logoImage.complete) {
            this.ctx.drawImage(this.logoImage, 0, 0, 72, 42);
        } else {
            this.ctx.fillStyle = '#ff8c42';
            this.ctx.fillRect(0, 0, 72, 42);
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(2, 2, 68, 38);
            this.ctx.fillStyle = '#ff8c42';
            this.ctx.font = 'bold 12px Courier New';
            this.ctx.fillText('TW', 6, 16);
        }

        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = '#ffb380';
        this.ctx.font = 'bold 10px Courier New';
        this.ctx.fillText('BONUS!', 2, -5);
        this.ctx.fillText('+500P', 2, 55);

        this.ctx.restore();
    }

    renderPowerUps() {
        this.ctx.font = '16px Courier New';
        this.powerUps.forEach(powerUp => {
            this.ctx.fillText(powerUp.type, powerUp.x, powerUp.y + 16);
        });
    }

    updateUI() {
        const scoreEl = document.getElementById('score');
        const levelEl = document.getElementById('level');
        const livesEl = document.getElementById('lives');

        if (scoreEl) scoreEl.textContent = this.score;
        if (levelEl) levelEl.textContent = this.level;
        if (livesEl) livesEl.textContent = this.lives;
    }

    gameOver() {
        this.gameRunning = false;
        const gameOverEl = document.getElementById('gameOver');
        const finalScoreEl = document.getElementById('finalScore');
        const gameOverTitle = document.getElementById('gameOverTitle');
        const gameOverText = document.getElementById('gameOverText');

        if (finalScoreEl) finalScoreEl.textContent = this.score;

        if (this.invaders.filter(invader => invader.alive).length === 0) {
            if (gameOverTitle) gameOverTitle.textContent = 'BUGS ELIMINIERT! 🎉';
            if (gameOverText) gameOverText.textContent = 'Deine Website ist sicher!';
        } else {
            if (gameOverTitle) gameOverTitle.textContent = 'GAME OVER 💥';
            if (gameOverText) gameOverText.textContent = 'Die Bugs haben gewonnen...';
        }

        if (gameOverEl) gameOverEl.style.display = 'block';
    }

    restart() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.gameRunning = true;
        this.bullets = [];
        this.invaderBullets = [];
        this.powerUps = [];
        this.explosions = [];
        this.bonusLogo = null;
        this.logoSpawnTimer = 0;
        this.invaderDirection = 1;
        this.invaderMoveTimer = 0;
        this.invaderMoveDelay = 60;
        this.player.x = 400;
        this.player.y = 550;

        this.createInvaders();
        const gameOverEl = document.getElementById('gameOver');
        if (gameOverEl) gameOverEl.style.display = 'none';
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}