import { Component, OnInit } from '@angular/core';
import { Language, LocaleService } from 'angular-l10n';

@Component({
  selector: 'app-lang-selector',
  templateUrl: 'lang-selector.component.html',
  styleUrls: ['lang-selector.component.scss']
})
export class LangSelectorComponent implements OnInit {
  public isVisible = false;

  @Language()
  lang: string;

  constructor(private localeService: LocaleService) {}

  ngOnInit() {}

  toggle() {
    this.isVisible = !this.isVisible;
  }

  selectLang(lang: string) {
    this.localeService.setCurrentLanguage(lang);
    this.isVisible = false;
  }
}
