import { CodeInvadersGame } from './code-invaders.js';

class CodeInvadersElement extends HTMLElement {
    constructor() {
        super();
        this.game = null;
    }

    connectedCallback() {
        const width = this.getAttribute('width') || '800';
        const height = this.getAttribute('height') || '600';

        this.innerHTML = `
            <style>
                .game-container {
                    text-align: center;
                    position: relative;
                    font-family: 'Courier New', monospace;
                    color: #ff8c42;
                    background: #0a0a0a;
                    padding: 20px;
                    border-radius: 10px;
                }
                
                .instructions {
                    margin-bottom: 20px;
                    color: #ffb380;
                }
                
                .instructions h2 {
                    margin: 0 0 10px 0;
                    color: #ff8c42;
                }
                
                .instructions p {
                    margin: 5px 0;
                    font-size: 14px;
                }
                
                #gameCanvas {
                    border: 2px solid #ff8c42;
                    background: linear-gradient(180deg, #000000 0%, #111111 100%);
                    box-shadow: 0 0 20px rgba(255, 140, 66, 0.3);
                    display: block;
                    margin: 0 auto;
                }
                
                .stats {
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    max-width: ${width}px;
                    color: #ffb380;
                    font-size: 16px;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .game-over {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.9);
                    padding: 30px;
                    border: 2px solid #ff8c42;
                    border-radius: 10px;
                    text-align: center;
                    display: none;
                    color: #ff8c42;
                }
                
                .game-over h3 {
                    margin: 0 0 15px 0;
                    color: #ff8c42;
                }
                
                .game-over p {
                    margin: 10px 0;
                    color: #ffb380;
                }
                
                .restart-btn {
                    background: #ff8c42;
                    color: #000;
                    border: none;
                    padding: 10px 20px;
                    font-family: 'Courier New', monospace;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 15px;
                    border-radius: 5px;
                    transition: background-color 0.2s;
                }
                
                .restart-btn:hover {
                    background: #ff7a28;
                }
                
                .contact-link {
                    color: #ff8c42;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .contact-link:hover {
                    color: #ffb380;
                }
            </style>
            
            <div class="game-container">
                <div class="instructions">
                    <h2>🚀 CODE INVADERS - TOBEWORKS 🚀</h2>
                    <p>Pfeiltasten: Bewegen | Leertaste: Schießen | Eliminiere alle Bugs!</p>
                </div>
                
                <canvas id="gameCanvas" width="${width}" height="${height}"></canvas>
                
                <div class="stats">
                    <div>Score: <span id="score">0</span></div>
                    <div>Level: <span id="level">1</span></div>
                    <div>Leben: <span id="lives">3</span></div>
                </div>
                
                <div class="game-over" id="gameOver">
                    <h3 id="gameOverTitle">BUGS ELIMINIERT! 🎉</h3>
                    <p id="gameOverText">Deine Website ist sicher!</p>
                    <p>Finaler Score: <span id="finalScore">0</span></p>
                    <button class="restart-btn" onclick="this.closest('code-invaders').restartGame()">Neues Spiel</button>
                    <div style="margin-top: 15px;">
                        <a href="https://tobeworks.de/kontakt" class="contact-link" target="_blank">Lust auf echte Webentwicklung? 💻</a>
                    </div>
                </div>
            </div>
        `;

        const canvas = this.querySelector('#gameCanvas');
        this.game = new CodeInvadersGame(canvas);
    }

    restartGame() {
        if (this.game) {
            this.game.restart();
        }
    }

    disconnectedCallback() {
        if (this.game) {
            this.game = null;
        }
    }
}

customElements.define('code-invaders', CodeInvadersElement);

export { CodeInvadersGame, CodeInvadersElement };