import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

interface CaptchaImage {
  url: string;
  isCorrect: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-root',
  imports: [NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showCaptcha = true;
  showQuestion = false;
  showCelebration = false;
  captchaError = false;

  noBtnStyle = {
    left: '50%',
    top: '0px',
    transform: 'translateX(-50%)'
  };

  captchaImages: CaptchaImage[] = [
    { url: 'me1.jpeg', isCorrect: true, selected: false },
    { url: 'me2.jpeg', isCorrect: true, selected: false },
    { url: 'notme1.jpeg', isCorrect: false, selected: false },
    { url: 'me3.jpeg', isCorrect: true, selected: false },
    { url: 'notme2.jpeg', isCorrect: false, selected: false },
    { url: 'notme3.jpeg', isCorrect: false, selected: false },
    { url: 'me4.jpeg', isCorrect: true, selected: false },
    { url: 'notme4.jpeg', isCorrect: false, selected: false },
    { url: 'me5.jpeg', isCorrect: true, selected: false },
  ];

  toggleImageSelection(image: CaptchaImage): void {
    image.selected = !image.selected;
    this.captchaError = false;
  }

  verifyCaptcha(): void {
    const allCorrectSelected = this.captchaImages
    .filter(img => img.isCorrect)
    .every(img => img.selected);

    const noIncorrectSelected = this.captchaImages
    .filter(img => !img.isCorrect)
    .every(img => !img.selected);

    if (allCorrectSelected && noIncorrectSelected) {
      this.showCaptcha = false;
      this.showQuestion = true;
    } else {
      this.captchaError = true;
      // Reset selections
      this.captchaImages.forEach(img => img.selected = false);
    }
  }

  onYesClick(): void {
    this.showCelebration = true;
  }

  onNoHover(): void {
    this.moveNoButton();
  }

  onNoClick(): void {
    this.moveNoButton();
  }

  private moveNoButton(): void {
    // Generate random position ensuring it moves a decent distance
    // Use percentage-based positioning for better responsiveness
    const minDistance = 150; // Minimum distance to move in pixels
    const maxX = 80; // Max percentage (80% to keep within bounds)
    const maxY = 60; // Max percentage for vertical movement

    // Generate random position in percentage
    const randomXPercent = Math.random() * maxX;
    const randomYPercent = Math.random() * maxY;

    // Add some randomness to direction
    const randomOffsetX = (Math.random() - 0.5) * minDistance;
    const randomOffsetY = (Math.random() - 0.5) * minDistance;

    this.noBtnStyle = {
      left: `${randomXPercent}%`,
      top: `${randomYPercent}%`,
      transform: `translate(${randomOffsetX}px, ${randomOffsetY}px)`
    };
  }
}