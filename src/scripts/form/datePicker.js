import flatpickr from 'flatpickr';
import RU from 'flatpickr/dist/l10n/ru.js';

flatpickr.localize(RU);

class DatePicker {
  constructor(input, locale = 'ru') {
    this.input = input;
    this.spanMonth = undefined;
    this.flatpickr = undefined;
    this.locale = locale;
    this.svgArrow = '<svg width="6" height="6"><path d="M1.777 1.11C.775 1.907.775 1.92.731 2.776l-.044.87.987.795c.545.427 1.046.78 1.09.78.059 0 .103-.338.103-.765 0-.693-.059-.796-.56-1.194l-.545-.427.56-.471c.516-.442.56-.53.501-1.267l-.044-.81-1.002.825zM4.281 1.155l-.957.736v1.783l.957.78c.53.428 1.032.767 1.09.767.06 0 .118-.34.118-.752 0-.707-.044-.81-.56-1.208l-.56-.427.56-.486c.502-.427.56-.56.56-1.193 0-.398-.058-.722-.132-.722-.074 0-.56.324-1.076.722z"/></svg>';
    this.options = {
      locale: this.locale,
      monthSelectorType: 'static',
      nextArrow: this.svgArrow,
      prevArrow: this.svgArrow,
      onReady: this.hook(this.onReady),
      onMonthChange: this.hook(this.onMonthChange),
      onChange: this.hook(this.onChange),
    };

    this.placeholder = 'Дата';

    this.init();
  }

  hook(fn) {
    return () => setTimeout(fn.bind(this), 0);
  }

  formatDate(string) {
    if (!string) {
      return this.placeholder;
    }

    const opts = {
      day: 'numeric',
      month: 'short',
    };

    return new Intl.DateTimeFormat(this.locale, opts).format(new Date(string));
  }

  createSpanMonth() {
    const span = document.createElement('span');
    span.className = 'cur-month cur-month--custom';
    this.spanMonth = span;
  }

  static getSpanText(month, year) {
    return `${month} ${year}`;
  }

  setSpanText(text) {
    if (this.spanMonth) {
      this.spanMonth.innerText = text;
    }
  }

  // Получаем месяц и год, объединяем в одну строку и добавляем в элемент
  onMonthChange() {
    const {
      monthElements,
      currentYear,
    } = this.flatpickr;

    setTimeout(() => {
      const month = monthElements[0].innerText.trim();
      const text = DatePicker.getSpanText(month, currentYear);
      this.setSpanText(text);
    }, 0);
  }

  // Обновляем значение инпута (визуальное)
  onChange() {
    const { _input } = this.flatpickr;
    const { value } = _input;
    const parent = _input.parentElement;
    parent.dataset.date = this.formatDate(value);
  }

  onReady() {
    console.log('onReady -> this');
    console.log(this);
    const {
      monthElements,
      monthNav,
      isMobile,
    } = this.flatpickr;

    if (!isMobile) {
      this.createSpanMonth();
      monthElements[0].style.display = 'none';
      const target = monthNav.querySelector('.flatpickr-current-month');
      if (target) {
        target.appendChild(this.spanMonth);
      }

      this.onMonthChange();
    }
  }

  clear() {
    this.flatpickr.clear();
  }

  init() {
    this.flatpickr = flatpickr(this.input, this.options);
  }
}

export default DatePicker;
