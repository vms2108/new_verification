import { Component, HostListener, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { TranslationService, Language, LocaleService } from 'angular-l10n';

@Component({
  selector: 'app-header-lang',
  template: `
    <button class="lang-btn" (click)="toggleLangDropdown($event)">
      <span class="lang-btn-text">{{ lang }}</span>
      <span class="lang-btn-arrow"></span>
    </button>
    <div
      class="lang-dropdown"
      [class.show]="langDropdownVisible">
      <div class="lang-dropdown__container">
        <div (click)="selectLang('en', $event)" class="lang-dropdown-item">EN</div>
        <div (click)="selectLang('ru', $event)" class="lang-dropdown-item">RU</div>
      </div>
    </div>
  `,
  styles: [`
  :host{position: relative;}
    .lang-btn{
      display: flex;
      align-items: center;
      padding: 0 18px;
      font-family: "Ubuntu";
      font-size: 13px;
      line-height: 17px;
      letter-spacing: 0.01em;
      font-weight: bold;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      color: #ffffff;
      height: 100%;
    }
    @media screen and (min-width: 1280px) {
      .lang-btn{
        font-size: 14px;
        line-height: 16px;
      }
    }
    .lang-btn-text{
      display: inline-block;
      vertical-align: middle;
    }
    .lang-btn-arrow{
      display: inline-block;
      vertical-align: middle;
      width: 10px;
      height: 10px;
      background-image: url('/assets/icons/lang-dropdown-arrow.svg');
      background-size: 10px;
      background-position: center center;
      background-repeat: no-repeat;
      margin-left: 5px;
    }
    @keyframes langdropdown-show {
      0% {
        height: 0;
      }
      100% {
        height: 94px;
      }
    }
    @keyframes langdropdown-show-text {
      0% {
        opacity: 0;
      }
      40% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .lang-dropdown{
      position: absolute;
      background-color: #4f4f4f;
      border-radius: 10px;
      padding: 10px 0;
      right: 0;
      top: 48px;
      margin-top: -10px;
      box-shadow: 0px 3px 16px 0px rgba(45, 45, 55, 0.24);
      display: none;
    }
    .lang-dropdown.show{
      display: block;
      overflow: hidden;
      animation: langdropdown-show 0.25s;
    }

    .lang-dropdown-item{
      display: block;
      padding: 8px 24px;
      font-size: 14px;
      letter-spacing: 0.01em;
      color: #fff;
      cursor: pointer;
      white-space: nowrap;
    }
    .lang-dropdown-item:hover{
      background-color: #2d2d37;
    }
    .lang-dropdown__container{
      animation: langdropdown-show-text 0.35s;
    }
  `]
})
export class HeaderLangComponent implements OnInit {

  @Language() lang: string;
  @Output() toggleLangDropDown = new EventEmitter();

  @Input() langDropdownVisible = false;

  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.toggleLangDropDown.emit(false);
  }

  constructor(
    private localeService: LocaleService
  ) {}

  ngOnInit() {}

  toggleLangDropdown(e: Event) {
    e.stopPropagation();
    this.toggleLangDropDown.emit(!this.langDropdownVisible);
  }

  selectLang(lang: string, e: Event) {
    e.stopPropagation();
    this.toggleLangDropDown.emit(false);
    this.localeService.setCurrentLanguage(lang);
  }

}
