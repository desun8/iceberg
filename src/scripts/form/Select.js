import Choices from 'choices.js';

class Select {
  constructor(root) {
    this.root = root;
    this.select = this.root.querySelector('.form__select');
    this.choices = new Choices(this.select, {
      searchEnabled: false,
      shouldSort: false,
      itemSelectText: '',
    });

    this.init();
  }

  preventSpaceScroll() {
    const { element } = this.choices.containerOuter;
    const handleKeyDown = (event) => {
      const isSpaceKey = event.code === 'Space' || event.key === ' ';

      if (isSpaceKey) {
        event.preventDefault();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
  }

  clearValue() {
    this.choices.setChoiceByValue('');
  }

  init() {
    this.preventSpaceScroll();
  }
}

export default Select;
