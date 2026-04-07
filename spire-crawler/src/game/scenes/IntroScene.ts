import { Scene } from 'phaser';

/**
 * IntroScene : joue la vidéo d'introduction sceneIn.mp4.
 * Cliquer, appuyer sur Espace/Entrée ou attendre la fin passe au MainMenu.
 */
export class IntroScene extends Scene {
    private video!: Phaser.GameObjects.Video;
    private skipHint!: Phaser.GameObjects.Text;
    private transitioning = false;

    constructor() {
        super('IntroScene');
    }

    create(): void {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        // Fond noir
        this.add.rectangle(cx, cy, width, height, 0x000000);

        // Vidéo centrée, mise à l'échelle pour remplir l'écran
        this.video = this.add.video(cx, cy, 'intro_video');
        this.video.setOrigin(0.5, 0.5);
        this.scaleVideoToFill();

        // Fondu entrant depuis le noir
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // Texte "passer"
        this.skipHint = this.add.text(width - 40, height - 40, 'PASSER  ▶', {
            fontSize: '18px',
            fontFamily: 'Georgia, serif',
            color: '#ffffff',
            alpha: 0.7,
            stroke: '#000000',
            strokeThickness: 3,
        }).setOrigin(1, 1).setDepth(10);

        // Animation de clignotement discret sur le hint
        this.tweens.add({
            targets: this.skipHint,
            alpha: { from: 0.4, to: 1 },
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        // Lancer la lecture — muted pour contourner l'autoplay policy des navigateurs
        this.video.play(false);
        this.video.setMute(false);

        // Si le navigateur bloque l'autoplay, montrer "Cliquer pour lancer"
        this.video.on('unlocked', () => {
            this.video.play(false);
        });

        // Fin de la vidéo → transition
        this.video.on('complete', () => {
            this.goToMainMenu();
        });

        // Clic sur la scène → passer
        this.input.on('pointerdown', () => {
            this.goToMainMenu();
        });

        // Espace ou Entrée → passer
        this.input.keyboard?.on('keydown-SPACE', () => this.goToMainMenu());
        this.input.keyboard?.on('keydown-ENTER', () => this.goToMainMenu());
        this.input.keyboard?.on('keydown-ESC',   () => this.goToMainMenu());
    }

    private scaleVideoToFill(): void {
        const { width, height } = this.scale;
        this.time.delayedCall(100, () => {
            const vw = this.video.width  || width;
            const vh = this.video.height || height;
            // Math.min → contient la vidéo entière dans la fenêtre (pas de crop)
            const scale = Math.min(width / vw, height / vh);
            this.video.setScale(scale);
        });
    }

    private goToMainMenu(): void {
        if (this.transitioning) return;
        this.transitioning = true;

        this.video.stop();
        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('MainMenu');
        });
    }
}
