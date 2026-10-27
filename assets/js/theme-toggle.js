/*
 * theme-toggle.js
 * Dark / light mode toggle for Emmanuel Mulilo's portfolio
 * Works with both Dimension (index) and Massively (projects) templates.
 */

(function () {

	var STORAGE_KEY = 'mulilo-theme';
	var root = document.documentElement;

	function getStored() {
		try {
			return localStorage.getItem(STORAGE_KEY);
		} catch (e) {
			return null;
		}
	}

	function setTheme(theme) {
		if (theme === 'light') {
			root.classList.add('light-mode');
		} else {
			root.classList.remove('light-mode');
		}
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch (e) {}
		updateButton();
	}

	function toggleTheme() {
		setTheme(root.classList.contains('light-mode') ? 'dark' : 'light');
	}

	function updateButton() {
		var btn = document.getElementById('theme-toggle');
		if (!btn)
			return;

		var light = root.classList.contains('light-mode');

		btn.setAttribute('aria-pressed', light ? 'true' : 'false');
		btn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');

		var icon = btn.querySelector('.icon');
		if (icon) {
			if (light) {
				icon.classList.remove('fa-moon');
				icon.classList.add('fa-sun');
			} else {
				icon.classList.remove('fa-sun');
				icon.classList.add('fa-moon');
			}
		}
	}

	function init() {
		var stored = getStored();

		if (stored === 'light' || stored === 'dark') {
			setTheme(stored);
		} else {
			updateButton();
		}

		var btn = document.getElementById('theme-toggle');
		if (btn) {
			btn.addEventListener('click', toggleTheme);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

})();
