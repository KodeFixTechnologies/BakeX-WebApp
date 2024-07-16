import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'headers',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})



export class HeaderComponent implements OnInit  {
  ngOnInit(): void {
    // Toggle button and menu collapse logic
    const navbarToggler = document.querySelector("#navbarToggler");
    const navbarCollapse = document.querySelector("#navbarCollapse");

    navbarToggler?.addEventListener("click", () => {
      navbarToggler.classList.toggle("navbarTogglerActive");
      navbarCollapse?.classList.toggle("hidden");
    });

    // Close navbar-collapse when a link is clicked
    document
      .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
      .forEach((link) => {
        link.addEventListener("click", () => {
          navbarToggler?.classList.remove("navbarTogglerActive");
          navbarCollapse?.classList.add("hidden");
        });
      });

    // Sub-menu handling
    const submenuItems = document.querySelectorAll(".submenu-item");
    submenuItems.forEach((el) => {
      const anchorElement = el.querySelector("a");
      const submenuElement = el.querySelector(".submenu");

      if (anchorElement && submenuElement) {
        anchorElement.addEventListener("click", (event) => {
          event.preventDefault(); // Prevent the default link behavior
          submenuElement.classList.toggle("hidden");
        });
      }
    });
  }


  menuitems = [
    {
      title: 'Features',
      path: '#',
      children: [
        { title: 'Action', path: '/' },
        { title: 'Another action', path: '#' },
        { title: 'Dropdown Submenu', path: '#' },
        { title: '404 Page', path: '/404' },
      ],
    },
    {
      title: 'Pricing',
      path: '/pricing',
    },
    {
      title: 'About',
      path: '/about',
    },
    // {
    //   title: 'Blog',
    //   path: '/blog',
    // },
    {
      title: 'Contact',
      path: '/contact',
    }
    
  ];

  
}
