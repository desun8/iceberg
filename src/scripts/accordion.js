/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   Simple accordion pattern example
*/
class Accordion {
  constructor(accordion) {
    this.accordion = accordion;
    // Allow for multiple accordion sections to be expanded at the same time
    this.allowMultiple = this.accordion.hasAttribute('data-allow-multiple');
    // Allow for each toggle to both open and close individually
    this.allowToggle = (this.allowMultiple) || this.accordion.hasAttribute('data-allow-toggle');

    // Create the array of toggle elements for the accordion group
    this.triggers = Array.from(this.accordion.querySelectorAll('.accordion__trigger'));
    this.panels = Array.prototype.slice.call(this.accordion.querySelectorAll('.accordion__panel'));
  }

  handleClick(event) {
    const { target } = event;

    if (target.classList.contains('accordion__trigger')) {
      event.preventDefault();
      // Check if the current toggle is expanded.
      const isExpanded = target.getAttribute('aria-expanded') === 'true';

      // without allowMultiple, close the open accordion
      if (!this.allowMultiple) {
        const active = this.accordion.querySelector('[aria-expanded="true"]');

        if (active && active !== target) {
          // Set the expanded state on the triggering element
          active.setAttribute('aria-expanded', 'false');
          // Hide the accordion sections, using aria-controls to specify the desired section
          document.getElementById(active.getAttribute('aria-controls'))
            .setAttribute('hidden', '');

          // When toggling is not allowed, clean up disabled state
          if (!this.allowToggle) {
            active.removeAttribute('aria-disabled');
          }
        }
      }

      if (!isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute('aria-expanded', 'true');
        // Hide the accordion sections, using aria-controls to specify the desired section
        document.getElementById(target.getAttribute('aria-controls'))
          .removeAttribute('hidden');

        // If toggling is not allowed, set disabled state on trigger
        if (!this.allowToggle) {
          target.setAttribute('aria-disabled', 'true');
        }
      } else if (this.allowToggle && isExpanded) {
        // Set the expanded state on the triggering element
        target.setAttribute('aria-expanded', 'false');
        // Hide the accordion sections, using aria-controls to specify the desired section
        document.getElementById(target.getAttribute('aria-controls'))
          .setAttribute('hidden', '');
      }
    }
  }

  handleKeyDown(event) {
    // Bind keyboard behaviors on the main accordion container
    const { target } = event;
    const key = event.which.toString();

    // const isExpanded = target.getAttribute('aria-expanded') == 'true';
    // const allowToggle = (this.allowMultiple) || this.accordion.hasAttribute('data-allow-toggle');

    // 33 = Page Up, 34 = Page Down
    const ctrlModifier = (event.ctrlKey && key.match(/33|34/));

    // Is this coming from an accordion header?
    if (target.classList.contains('accordion__trigger')) {
      // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
      // 38 = Up, 40 = Down
      if (key.match(/38|40/) || ctrlModifier) {
        const index = this.triggers.indexOf(target);
        const direction = (key.match(/34|40/)) ? 1 : -1;
        const { length } = this.triggers;
        const newIndex = (index + length + direction) % length;

        this.triggers[newIndex].focus();

        event.preventDefault();
      } else if (key.match(/35|36/)) {
        // 35 = End, 36 = Home keyboard operations
        switch (key) {
          // Go to first accordion
          case '36':
            this.triggers[0].focus();
            break;
          // Go to last accordion
          case '35':
            this.triggers[this.triggers.length - 1].focus();
            break;
          default:
            break;
        }
        event.preventDefault();
      }
    }
  }

  addEvents() {
    this.accordion.addEventListener('click', this.handleClick.bind(this));
    this.accordion.addEventListener('keydown', this.handleKeyDown.bind(this));

    // These are used to style the accordion when one of the buttons has focus
    this.triggers.forEach((trigger) => {
      trigger.addEventListener('focus', () => {
        this.accordion.classList.add('focus');
      });

      trigger.addEventListener('blur', () => {
        this.accordion.classList.remove('focus');
      });
    });
  }

  init() {
    this.addEvents();

    // Minor setup: will set disabled state, via aria-disabled, to an
    // expanded/ active accordion which is not allowed to be toggled close
    if (!this.allowToggle) {
      // Get the first expanded/ active accordion
      const expanded = this.accordion.querySelector('[aria-expanded="true"]');

      // If an expanded/ active accordion is found, disable
      if (expanded) {
        expanded.setAttribute('aria-disabled', 'true');
      }
    }
  }
}

export default Accordion;
