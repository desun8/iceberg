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
      // classNames: {
      //   containerOuter: 'choices',
      //   containerInner: 'choices__inner',
      //   input: 'choices__input',
      //   inputCloned: 'choices__input--cloned',
      //   list: 'choices__list',
      //   listItems: 'choices__list--multiple',
      //   listSingle: 'choices__list--single',
      //   listDropdown: 'choices__list--dropdown',
      //   item: 'choices__item',
      //   itemSelectable: 'choices__item--selectable',
      //   itemDisabled: 'choices__item--disabled',
      //   itemChoice: 'choices__item--choice',
      //   placeholder: 'choices__placeholder',
      //   group: 'choices__group',
      //   groupHeading: 'choices__heading',
      //   button: 'choices__button',
      //   activeState: 'is-active',
      //   focusState: 'is-focused',
      //   openState: 'is-open',
      //   disabledState: 'is-disabled',
      //   highlightedState: 'is-highlighted',
      //   selectedState: 'is-selected',
      //   flippedState: 'is-flipped',
      //   loadingState: 'is-loading',
      //   noResults: 'has-no-results',
      //   noChoices: 'has-no-choices',
      // },
      // Choices uses the great Fuse library for searching. You
      // can find more options here: https://github.com/krisk/Fuse#options
      // fuseOptions: {
      //   include: 'score',
      // },
      // callbackOnInit: null,
      // callbackOnCreateTemplates: null,
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

  init() {
    this.preventSpaceScroll();
  }
}

export default Select;
