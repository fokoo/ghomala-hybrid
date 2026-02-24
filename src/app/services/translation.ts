
import { Injectable, signal } from '@angular/core';
import { pipeline } from '@huggingface/transformers';

@Injectable({
  providedIn: 'root',
})
export class Translation {
  private localPipe: any;
  
  // App State Signals
  public isOfflineReady = signal(false);
  public downloadProgress = signal(0);
  public currentAppLang = signal('fr'); 

// TIER 1: Locale Dictionary (Instant lookup for common words)
  private localeData: any = {
    'french': { 'ghomala': { 'Bonjour': 'A nshǐ', 'Merci': 'Mshǐ' } },
    'german': { 'ghomala': { 'Hallo': 'A nshǐ', 'Danke': 'Mshǐ' } },
    'english': { 'ghomala': { 'Hello': 'A nshǐ', 'Thank you': 'Mshǐ' } }
  };

  // DUAL LANGUAGE UI DICTIONARY (Ghomálá' + Choice)
  private uiLocales: any = {
    'en': { 'title': 'Ghomálá’ / English', 'btn': 'Gǎm / Translate', 'input': 'Tsé nù / Type...', 'offline': 'Offline' },
    'fr': { 'title': 'Ghomálá’ / Français', 'btn': 'Gǎm / Traduire', 'input': 'Tsé nù / Écrire...', 'offline': 'Hors-ligne' },
    'de': { 'title': 'Ghomálá’ / Deutsch', 'btn': 'Gǎm / Übersetzen', 'input': 'Tsé nù / Schreiben...', 'offline': 'Offline' }
  };

  // AI Language Codes (NLLB-200 standard)
  private codes: any = {
    'ghomala': 'bbj_Latn',
    'french': 'fra_Latn',
    'english': 'eng_Latn',
    'german': 'deu_Latn'
  };

  getUI(key: string) {
    return this.uiLocales[this.currentAppLang()][key] || key;
  }

  translateLocale(text: string, from: string, to: string): string | null {
    try {
      return this.localeData[from][to][text] || null;
    } catch {
      return null;
    }
  }

  // TIER 2: Offline GPU Translation
  async downloadOfflineModel() {
    this.localPipe = await pipeline('translation', 'Xenova/nllb-200-distilled-600M', {
      device: 'webgpu', 
      dtype: 'q4',      
      progress_callback: (p: any) => {
        if (p.status === 'progress') this.downloadProgress.set(Math.round(p.progress));
        if (p.status === 'ready') this.isOfflineReady.set(true);
      }
    });
  }

  async translateOffline(text: string, from: string, to: string) {
    if (!this.isOfflineReady()) return "Model not ready.";
    const output = await this.localPipe(text, {
      src_lang: this.codes[from],
      tgt_lang: this.codes[to]
    });
    return output[0].translation_text;
  }

  // TIER 3: Cloud Translation (Fallback)
  async translateCloud(text: string, from: string, to: string) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/nllb-200-distilled-600M",
        {
          headers: { 
            Authorization: "Bearer hf_YOUR_TOKEN_HERE", 
            "Content-Type": "application/json" 
          },
          method: "POST",
          body: JSON.stringify({
            inputs: text,
            parameters: { src_lang: this.codes[from], tgt_lang: this.codes[to] }
          }),
        }
      );
      const result = await response.json();
      return result[0].translation_text;
    } catch (error) {
      return "Network Error";
    }
  }

  // Add this inside your Translation class
  speak(text: string, lang: string) {
    const utterance = new SpeechSynthesisUtterance(text);
  
    // Map our codes to TTS locales
    const voiceMap: any = {
    'french': 'fr-FR',
    'english': 'en-US',
    'ghomala': 'fr-FR' // Ghomálá' often uses the French phonetics engine
    };

    utterance.lang = voiceMap[lang] || 'en-US';
    utterance.rate = 0.9; // Slightly slower for better clarity
    window.speechSynthesis.speak(utterance);
  }


}