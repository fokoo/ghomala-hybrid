
import { Component, inject, signal, effect } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Translation } from '../services/translation';

// Manual Icon Registration
import { addIcons } from 'ionicons';
import { 
  swapHorizontalOutline, keypadOutline, keypad, flashOutline, 
  flash, timeOutline, volumeHighOutline, trashOutline, copyOutline 
} from 'ionicons/icons';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class Tab1Page {
  public ai = inject(Translation);
  private toastCtrl = inject(ToastController);

  inputText = signal('');
  outputText = signal('');
  sourceLang = signal('french');
  targetLang = signal('ghomala');
  isLoading = signal(false);
  history = signal<any[]>([]); // Array for storing history items
  isAutoTranslate = signal(false); // Toggle for Auto-Translate
  showSpecialChars = signal(false); // New signal for character bar
  dictionaryResults = signal<{ghomala: string, translation: string}[]>([]);
  specialChars = ['ɑ', 'i', 'o', 'ʉ', 'm', 'ŋ', '`','´', '^', 'ɔ', ' ̌']; 
  
 constructor() {
    // Register icons for Standalone mode
    addIcons({
      'swap-horizontal-outline': swapHorizontalOutline,
      'keypad-outline': keypadOutline,
      'keypad': keypad,
      'flash-outline': flashOutline,
      'flash': flash,
      'time-outline': timeOutline,
      'volume-high-outline': volumeHighOutline,
      'trash-outline': trashOutline,
      'copy-outline': copyOutline
    });

    /**
     * AUTO-TRANSLATE EFFECT
     * This watches the inputText and isAutoTranslate signals.
     * If Auto is on and user types more than 3 chars, it triggers translation.
     */
     effect(() => {
      const text = this.inputText().trim();
      const auto = this.isAutoTranslate();
      
      if (auto && text.length > 3) {
        // We use a small timeout or check to prevent API spamming
        this.handleTranslate(true);
      }
    });
  }

  async handleTranslate(isAuto?: boolean) {
    console.log('Tutə clicked!'); // Check your browser console for this!
   // if (this.isButtonDisabled()) {
   //   console.log('Button is disabled, stopping.');
   //   return;
   // }
    const text = this.inputText().trim();
    if (!text) {
      this.outputText.set('');
      return;
    }
    this.isLoading.set(isAuto ? false : true); // Don't show
   
    try {
    // Attempt translation with multiple fallbacks
   // 1. Check Locale Dictionary (Instant). quick lookup for common words/phrases
    let result = this.ai.translateLocale(text, this.sourceLang(), this.targetLang());
    
    // 2. Fallback to Offline or Cloud AI
    if (!result) {
      if (this.ai.isOfflineReady()) {
        result = await this.ai.translateOffline(text, this.sourceLang(), this.targetLang());
      } else {
        result = await this.ai.translateCloud(text, this.sourceLang(), this.targetLang());
      }
    }

    /**
     * FIX: Null Safety
     * result ?? '' ensures we never pass 'null' to a string signal
     */
    const finalResult = result ?? '';
    this.outputText.set(finalResult);
    // Example: Split input text into words and fetch dictionary meanings
  // This logic assumes your AI service has a 'getDictionary' method
  const words = text.split(' ');
  const dictData = words.map(w => ({
    ghomala: w, 
    translation: "Pending..." // Replace with actual dictionary lookup logic
  }));
  
  this.dictionaryResults.set(dictData);
   this.isLoading.set(false);

    // Add to history if we have a valid result
  if (finalResult && finalResult !== this.history()[0]?.output) {
      this.history.update(h => [
        { 
          input: text, 
          output: finalResult, 
          from: this.sourceLang(), 
          to: this.targetLang(),
          timestamp: new Date() 
        }, 
        ...h
      ]);
    }

  } catch (error) {
    console.error('Translation failed', error);
  } finally {
    this.isLoading.set(false);
  }
}

  // SWAP LOGIC (Keep this here!)
  swapLanguages() {
    const s = this.sourceLang();
    const t = this.targetLang();
    
    // Swap the language selections
    this.sourceLang.set(t);
    this.targetLang.set(s);

    // Swap the text content for better UX
    if (this.outputText()) {
      const tempInput = this.inputText();
      this.inputText.set(this.outputText());
      this.outputText.set(tempInput);
    }
  }

  /**
   * TOGGLE AUTO-TRANSLATE
   */
  toggleAuto() {
    this.isAutoTranslate.update(val => !val);
  }
  
  toggleChars() {
    this.showSpecialChars.update(v => !v);
  }

  /**
   * UTILITIES
   */
  async copyToClipboard(text: string) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      const toast = await this.toastCtrl.create({
        message: 'Copied !',
        duration: 1500,
        position: 'bottom',
        color: 'dark'
      });
      await toast.present();
    } catch (err) {
      console.error('Clipboard error', err);
    }
  }

  addChar(char: string) {
    this.inputText.update(v => v + char);
  }

  clearHistory() {
    this.history.set([]);
  }
}