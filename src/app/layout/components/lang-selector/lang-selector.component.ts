import { Component, OnInit, HostListener } from '@angular/core';
import { Language, LocaleService } from 'angular-l10n';

@Component({
  selector: 'app-lang-selector',
  templateUrl: 'lang-selector.component.html',
  styleUrls: ['lang-selector.component.scss']
})
export class LangSelectorComponent implements OnInit {
  @Language()
  lang: string;

  public isVisible = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.close();
  }

  constructor(private localeService: LocaleService) {}

  ngOnInit() {}

  toggle(e: Event) {
    e.stopPropagation();
    this.isVisible = !this.isVisible;
  }

  close() {
    this.isVisible = false;
  }

  selectLang(lang: string, e: Event) {
    e.stopPropagation();
    this.localeService.setCurrentLanguage(lang);
    this.isVisible = false;
  }
}
