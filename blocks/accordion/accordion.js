/**
 * TODO: 
 * - add svg icon to summary with js (so it can be styled with css) 
 */

class Accordion {
  constructor(el) {
    this.details = el;
    this.summary = el.querySelector('summary');
    this.content = el.querySelector('.accordion-item-body');
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    this.details.style.overflow = 'hidden';

    if (this.isClosing || !this.details.open) {
      this.open();
    } else if (this.isExpanding || this.details.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;
    
    const startHeight = `${this.details.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;
    
    if (this.animation) {
      this.animation.cancel();
    }
    
    this.animation = this.details.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-in-out'
    });
    
    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    this.details.style.height = `${this.details.offsetHeight}px`;
    this.details.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.details.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    
    if (this.animation) {
      this.animation.cancel();
    }
    
    this.animation = this.details.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    this.details.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.details.style.height = this.details.style.overflow = '';
  }
}

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);

    new Accordion(details);
  });
}
