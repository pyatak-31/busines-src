//Класс делающий меню из статического фиксированным и наоборот, когда проскроливаем нижнюю границу
// элемента находящегося над меню, меню становится фиксированным и наоборот, соответственно
class Fixed {
	constructor (mainEl, aboveEl) {
		this.mainEl = mainEl;
		this.aboveEl = aboveEl;
	}

	fix () {
		window.addEventListener('scroll', () => {
			if (Math.abs(this.aboveEl.getBoundingClientRect().y) > this.aboveEl.clientHeight) {
				this.mainEl.classList.add('header__menu--fixed'); // Добавляем класс со стилем со свойством position: fixed
				this.mainEl.classList.remove('header__menu--static'); // Удаляем класс со стилем со свойством position: static
			} else {
				this.mainEl.classList.add('header__menu--static'); // Добавляем класс со стилем со свойством position: fixed
				this.mainEl.classList.remove('header__menu--fixed'); // Удаляем класс со стилем со свойством position: static
			}
		});
	}
}

//Класс открывающий и закрывающий мобильное меню при нажатии по кнопке, при этом блокируется/разбдлокируется
//перемещение по странице и доступность к другим компонентам помимо меню
class Hamburger {
	constructor(hamburgerIcon, linksList, linksItem, inactive) {
		this.hamburgerIcon = hamburgerIcon;
		this.linksList = linksList;
		this.linksItem = linksItem;
		this.inactive = inactive;
	}
	
	create() {
		this.hamburgerIcon.addEventListener('click', () => {
			if(this.linksList.classList.contains('active')) {
				this.closeMenu(this.hamburgerIcon, this.linksList, this.inactive);
			} else {
				this.openMenu(this.hamburgerIcon, this.linksList, this.linksItem, this.inactive);
			}
		});
	}
	
	openMenu(hamburgerIcon, linksList, linksItem,inactive) {
		document.body.classList.add('lock');
		inactive.style.display = "block";
        linksList.classList.add("flex");
        hamburgerIcon.classList.add("activeHamburger");
		setTimeout(function() { linksList.classList.add("active"); }, 100);
		for (let i of linksItem) {
			i.addEventListener('click', () => {
				this.closeMenu(hamburgerIcon, linksList, inactive);
			})
		}
	}
	
	closeMenu(hamburgerIcon, linksList, inactive) {
		document.body.classList.remove('lock');
		inactive.style.display = "none";
        linksList.classList.remove("active");
		hamburgerIcon.classList.remove("activeHamburger");
		setTimeout(function() { linksList.classList.remove("flex"); }, 300);
	}
}	
	
//Инициализируем работу экземпляров классов после загрузки DOM
window.addEventListener('DOMContentLoaded', function() {
	const menu = document.querySelector(".menu"),
		above = document.querySelector(".contacts"),
		menuHamburger = menu.querySelector(".menu__hamburger"),
		menuList = menu.querySelector(".menu__list"),
		menuItem = menu.querySelectorAll(".menu__link"),
		inactive = document.querySelector('.menu__bl');
	new Fixed(menu, above).fix();
	new Hamburger(menuHamburger, menuList, menuItem, inactive).create();
})	
