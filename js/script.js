import { el, setChildren } from 'redom';

const createCreditCard = () => {
  const card = el('.card');
  const secure = el('p.secure', 'Secure Checkout');

  const creditCard = el('.credit-card');
  const cardNumber = el('span.card__number', 'xxxx xxxx xxxx xxxx');
  const cardPersonal = el('.card__personal');
  const cardName = el('span.card__name', 'John Doe');
  const cardDate = el('span.card__date', '04/24');

  const form = el('form', { action: '#', className: 'form', id: 'form' }, [
    el('div', { className: 'form__input-wrap form__input-wrap_holder' }, [
      el(
        'label',
        { for: 'holder', className: 'form__label form__holder-label' },
        'Card Holder',
      ),
      el('input', {
        type: 'text',
        className: 'input input__holder',
        id: 'holder',
        oninput() {
          this.value = this.value.replace(/[\d]/g, '');
          cardName.textContent = this.value || 'John Doe';
        },
      }),
    ]),
    el('div', { className: 'form__input-wrap form__input-wrap_number' }, [
      el(
        'label',
        { for: 'cardNumber', className: 'form__label form__number-label' },
        'Card Number',
      ),
      el('input', {
        type: 'text',
        className: 'input input__number',
        id: 'cardNumber',
        maxlength: 19,
        oninput() {
          const num = this.value;
          if (num.match(/\d{4}$/g) !== null) {
            this.value = this.value.length < 19 ? num + ' ' : num;
          }
          cardNumber.textContent = this.value || 'xxxx xxxx xxxx xxxx';
        },
      }),
    ]),
    el('div', { className: 'form__input-wrap form__input-wrap_date' }, [
      el(
        'label',
        { for: 'date', className: 'form__label form__date-label' },
        'Card Expiry',
      ),
      el('input', {
        type: 'text',
        className: 'input input__date',
        id: 'date',
        oninput() {
          const num = this.value;
          if (num.match(/\d{2}$/g) !== null) {
            this.value = this.value.length < 5 ? num + '/' : num;
          }
          cardDate.textContent = this.value || '04/24';
        },
      }),
    ]),
    el('div', { className: 'form__input-wrap form__input-wrap_cvv' }, [
      el(
        'label',
        { for: 'cvv', className: 'form__label form__cvv-label' },
        'CVV',
      ),
      el('input', {
        type: 'text',
        className: 'input input__cvv',
        id: 'cvv',
        maxlength: 3,
        oninput() {
          this.value = this.value.replace(/[^\d]/g, '');
        },
      }),
    ]),
    el('button', { className: 'form__button' }, 'CHECK OUT'),
  ]);

  setChildren(cardPersonal, [cardName, cardDate]);
  setChildren(creditCard, [cardNumber, cardPersonal]);
  setChildren(card, [secure, creditCard, form]);

  return el('div', { className: 'wrapper' }, card);
};

setChildren(document.body, createCreditCard());
