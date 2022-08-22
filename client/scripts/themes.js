class Theme {
    constructor() {
        this.colorScheme = 0;
        this.primColors = ['#211D1E', 'black'];
        this.secColors = ['#7C7C7C', '#393939'];
        this.terColors = ['#393939', '#393939'];
        this.quaColors = ['black', 'black'];
        this.nextColors = ['black', '#211D1E'];

        this.primTextColors = ['#FFFFFF', '#7C7C7C'];
        this.secTextColors = ['#7C7C7C', '#393939'];
        this.btnTextColors = ['#211D1E', '#7C7C7C'];
    }

    toggleTheme(root) {
        this.colorScheme = (this.colorScheme + 1)%2;
        root.style.setProperty('--primary-color', this.primColors[this.colorScheme]);
        root.style.setProperty('--secondary-color', this.secColors[this.colorScheme]);
        root.style.setProperty('--tertiary-color', this.terColors[this.colorScheme]);
        root.style.setProperty('--quaternary-color', this.quaColors[this.colorScheme]);
        root.style.setProperty('--next-color', this.nextColors[this.colorScheme]);

        root.style.setProperty('--primary-text-color', this.primTextColors[this.colorScheme]);
        root.style.setProperty('--secondary-text-color', this.secTextColors[this.colorScheme]);
        root.style.setProperty('--button-text-color', this.btnTextColors[this.colorScheme]);
    }
}

const theme = new Theme();

export { theme }