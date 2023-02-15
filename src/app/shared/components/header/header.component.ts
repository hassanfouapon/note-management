import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const logoSrc = {
      white: './assets/images/white-logo.svg',
      dark: './assets/images/logo.svg'
    };
    const logo = $('.logo');
    const colorTheme = $('.color-theme');

    $('.color-theme').on('click', () => {
      if (colorTheme.hasClass('active-moon')) {
          colorTheme.removeClass('active-moon');
          colorTheme.addClass('active-sun');
          document.body.classList.remove('dark-mode');
          logo.attr('src', logoSrc.dark);
      } else {
          $('body').addClass('dark-mode');
          colorTheme.addClass('active-moon');
          colorTheme.removeClass('active-sun');

          logo.attr('src', logoSrc.white);
      }
  });
  }

}
