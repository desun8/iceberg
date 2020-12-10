import Choices from 'choices.js';
// import SlimSelect from 'slim-select';

class Select {
  constructor(root) {
    this.root = root;
    this.select = this.root.querySelector('.form__select');
    this.choices = new Choices(this.select, {
      searchEnabled: false, // change
      shouldSort: false, // change
      itemSelectText: '', // change
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
    console.log(this.choices.config.choices);
    this.choices.setChoiceByValue('');
  }

  init() {
    this.preventSpaceScroll();
  }
}

export default Select;
