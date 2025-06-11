import { CodeInvadersGame } from './code-invaders.js';
import packageJson from '../package.json';

class CodeInvadersElement extends HTMLElement {
    constructor() {
        super();
        this.game = null;
    }

    connectedCallback() {
        const width = this.getAttribute('width') || '800';
        const height = this.getAttribute('height') || '600';
        const showVersion = this.getAttribute('show-version') !== 'false';

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
                
                .version-info {
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    font-size: 10px;
                    color: #ffb380;
                    opacity: 0.7;
                    pointer-events: none;
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
                    border: 0px solid #ff8c42;
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
                    margin: 0 8px;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .contact-link:hover {
                    color: #ffb380;
                }
                
                .github-link {
                    color: #ff8c42;
                    text-decoration: none;
                    transition: color 0.2s;
                    margin: 0 8px;
                    font-size: 12px;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .github-link:hover {
                    color: #ffb380;
                }
                
                .version-footer {
                    margin-top: 10px;
                    font-size: 11px;
                    color: #666;
                    opacity: 0.6;
                }

                .footer-links {
                    margin-top: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .icon {
                    width: 16px;
                    height: 16px;
                    stroke-width: 2;
                }

                .icon-small {
                    width: 14px;
                    height: 14px;
                    stroke-width: 2;
                }
            </style>
            
            <div class="game-container">
                ${showVersion ? `<div class="version-info">v${packageJson.version}</div>` : ''}
                
                <div class="instructions">
                    <h2>🚀 CODE INVADERS 🚀</h2>
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
                    
                    <div class="footer-links">
                        <a href="https://tobeworks.de/kontakt" class="contact-link" target="_blank">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Webentwicklung
                        </a>
                        <span style="color: #666;">|</span>
                        <a href="https://github.com/Tobeworks/code-invaders-game" class="github-link" target="_blank">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 22V18C15.1392 16.7473 14.78 15.4901 14 14.5C17 14.5 20 12.5 20 9C20.08 7.75 19.73 6.52 19 5.5C19.28 4.35 19.28 3.15 19 2C19 2 18 2 16 3.5C13.36 3 10.64 3 8.00004 3.5C6.00004 2 5.00004 2 5.00004 2C4.70004 3.15 4.70004 4.35 5.00004 5.5C4.27191 6.51588 3.91851 7.75279 4.00004 9C4.00004 12.5 7.00004 14.5 10 14.5C9.61004 14.99 9.32004 15.55 9.15004 16.15C8.98004 16.75 8.93004 17.38 9.00004 18V22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 18C4.49 20 4 16 2 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            GitHub
                        </a>
                    </div>
                </div>
                
                ${showVersion ? `<div class="version-footer">Code Invaders v${packageJson.version} - Built with ❤️ for Tobeworks | <a href="https://github.com/Tobeworks/code-invaders-game" class="github-link" target="_blank"><svg class="icon-small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 22V18C15.1392 16.7473 14.78 15.4901 14 14.5C17 14.5 20 12.5 20 9C20.08 7.75 19.73 6.52 19 5.5C19.28 4.35 19.28 3.15 19 2C19 2 18 2 16 3.5C13.36 3 10.64 3 8.00004 3.5C6.00004 2 5.00004 2 5.00004 2C4.70004 3.15 4.70004 4.35 5.00004 5.5C4.27191 6.51588 3.91851 7.75279 4.00004 9C4.00004 12.5 7.00004 14.5 10 14.5C9.61004 14.99 9.32004 15.55 9.15004 16.15C8.98004 16.75 8.93004 17.38 9.00004 18V22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 18C4.49 20 4 16 2 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>GitHub Repo</a></div>` : ''}
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