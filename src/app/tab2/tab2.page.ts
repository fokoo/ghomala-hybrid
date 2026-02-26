
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonIcon, IonButton, IonSearchbar,
  IonSelect, IonSelectOption, IonModal, IonSegment, IonSegmentButton, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  logoYoutube, logoFacebook, bookOutline, 
  helpCircleOutline, heartOutline, openOutline,
  chevronUp, chevronDown, listOutline, searchOutline,
  chevronForwardOutline, linkOutline, volumeHighOutline,
  chatboxEllipsesOutline, languageOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonItem, IonIcon, IonButton, IonSelect, IonSelectOption, 
    IonModal, IonSearchbar, IonSegment, IonSegmentButton, IonLabel
  ]
})
export class Tab2Page {
  selectedTopic = signal<string>('family'); 
  searchQuery = signal<string>('');
  appLanguage = signal<'en' | 'fr'>('fr'); 
  isModalOpen = signal<boolean>(false);
  expandedIndex = signal<number | null>(null); // Tracks which item is expanded
  // ... inside export class Tab2Page ...


  // 2. Ensure the links array exists
  otherLinks = [
    { label: 'Facebook Page', icon: 'app-facebook', url: 'https://facebook.com' },
    { label: 'Grammar Books', icon: 'app-book', url: '#' },
    { label: 'Mobile App FAQ', icon: 'app-help', url: '#' },
    { label: 'Support Project', icon: 'app-heart', url: '#' }
  ];

  topics = [
    { id: 'family', ghomala: 'Cátshʉ̀', fr: 'Famille', en: 'Family' },
    { id: 'animals', ghomala: 'Bǎ nyàm', fr: 'Animaux', en: 'Animals' },
    { id: 'market', ghomala: 'Kǎm', fr: 'Marché', en: 'Market' },
    // ... add your other topics here
    { id: 'food', ghomala: 'Mǐ', fr: 'Nourriture', en: 'Food' },
    { id: 'clothing', ghomala: 'Sǐ', fr: 'Vêtements', en: 'Clothing' },
    { id: 'transportation', ghomala: 'Tǎm', fr: 'Transport', en: 'Transportation' },
    { id: 'nature', ghomala: 'Nàtʉ̀r', fr: 'Nature', en: 'Nature' },
    { id: 'body', ghomala: 'Sǐn', fr: 'Corps', en: 'Body' },
    { id: 'emotions', ghomala: 'Fǐl', fr: 'Émotions', en: 'Emotions' },

  ];

  keywords = [
    { 
      topic: 'family', 
      word: 'Mámá', 
      fr: 'Mère', en: 'Mother', 
      ex_ghomala: 'Mámá à fʉ̀ kǎm.',
      ex_fr: 'Ma mère va au marché.', 
      ex_en: 'My mother is going to the market.' 
    },
    { 
      topic: 'animals', 
      word: 'Bʉ́', 
      fr: 'Chien', en: 'Dog', 
      ex_ghomala: 'Bʉ́ yà bǐ.',
      ex_fr: 'Le chien aboie.', 
      ex_en: 'The dog is barking.' 
    },
    { 
      topic: 'market', 
      word: 'Kǎm', 
      fr: 'Marché', en: 'Market', 
      ex_ghomala: 'Kǎm à fʉ̀ mǐ.',
      ex_fr: 'Le marché vend de la nourriture.', 
      ex_en: 'The market sells food.' 
    },
     { 
      topic: 'food',
      word: 'Mǐ',
      fr: 'Nourriture',
      en: 'Food',
      ex_ghomala: 'Mǐ à fʉ̀ sǐ.',
      ex_fr: 'La nourriture est délicieuse.',
      ex_en: 'The food is delicious.'
    },
     { 
      topic: 'clothing',
      word: 'Sǐ',
      fr: 'Vêtements',
      en: 'Clothing',
      ex_ghomala: 'Sǐ à fʉ̀ tǎm.',
      ex_fr: 'Les vêtements sont chers.',
      ex_en: 'The clothing is expensive.'
    },
     { 
      topic: 'transportation',
      word: 'Tǎm',
      fr: 'Transport',
      en: 'Transportation',
      ex_ghomala: 'Tǎm à fʉ̀ nàtʉ̀r.',
      ex_fr: 'Le transport est rapide.',
      ex_en: 'The transportation is fast.'
    },
     { 
      topic: 'nature',
      word: 'Nàtʉ̀r',
      fr: 'Nature',
      en: 'Nature',
      ex_ghomala: 'Nàtʉ̀r à fʉ̀ sǐn.',
      ex_fr: 'La nature est belle.',
      ex_en: 'The nature is beautiful.'
    },
     { 
      topic: 'body',
      word: 'Sǐn',
      fr: 'Corps',
      en: 'Body',
      ex_ghomala: 'Sǐn à fʉ̀ fǐl.',
      ex_fr: 'Le corps est fatigué.',
      ex_en: 'The body is tired.'
    },
     { 
      topic: 'emotions',
      word: 'Fǐl',
      fr: 'Émotions',
      en: 'Emotions',
      ex_ghomala: 'Fǐl à fʉ̀ sǐn.',
      ex_fr: 'Les émotions sont fortes.',
      ex_en: 'The emotions are strong.'
    }
  ];


  constructor() {
    addIcons({ 
      'app-youtube': logoYoutube, 'app-facebook': logoFacebook, 'app-book': bookOutline,
      'app-help': helpCircleOutline, 'app-heart': heartOutline, 'app-open': openOutline,
      'app-up': chevronUp, 'app-down': chevronDown, 'app-list': listOutline, 
      'app-search': searchOutline, 'app-forward': chevronForwardOutline, 'app-link': linkOutline,
      'app-volume': volumeHighOutline, 'app-example': chatboxEllipsesOutline, 'app-lang': languageOutline
    });
  }

  getTranslation(item: any) {
    return this.appLanguage() === 'fr' ? item.fr : item.en;
  }

  filteredKeywords = computed(() => {
    const topic = this.selectedTopic();
    const query = this.searchQuery().toLowerCase();
    const lang = this.appLanguage();
    
    return this.keywords.filter(k => {
      const matchesTopic = k.topic === topic;
      const translation = lang === 'fr' ? k.fr : k.en;
      return matchesTopic && (k.word.toLowerCase().includes(query) || translation.toLowerCase().includes(query));
    });
  });

  toggleExpand(index: number) {
    this.expandedIndex.set(this.expandedIndex() === index ? null : index);
  }

  updateLanguage(event: any) {
    const val = event.detail.value as 'en' | 'fr';
    if (val) this.appLanguage.set(val);
  }

  handleSearch(event: any) {
    this.searchQuery.set(event.detail.value || '');
  }

  playAudio(word: string, event: Event) {
    event.stopPropagation(); // Prevents expanding the row when clicking play
    console.log('Playing:', word);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen.set(isOpen);
  }

  openLink(url: string) {
    if(url && url !== '#') window.open(url, '_blank');
  }


}