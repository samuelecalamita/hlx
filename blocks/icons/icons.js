export default function decorate(block) {
  [...block.children].forEach((child) => {
    const iconName = child.children[0].innerText;
    const icon = document.createElement('icon-component');
    const iconContainer = document.createElement('div');
    const iconLabel = document.createElement('span');

    iconContainer.addEventListener('click', () => {
      copyNameToClipboard(iconName);
    });
    
    iconContainer.classList.add('icon-container');
    icon.setAttribute('src', `${window.hlx.codeBasePath}/icons/${iconName}.svg`);
    icon.classList.add('icon-component');
    iconLabel.classList.add('icon-label');
    iconLabel.innerText = iconName;
    iconContainer.append(icon);
    iconContainer.append(iconLabel);
    child.replaceWith(iconContainer);
  });
}

function copyNameToClipboard(name) {
  navigator.clipboard.writeText(name);
  addToastNotification();
}

function addToastNotification() {
  const toast = document.createElement('div');
  toast.classList.add('icons-toast');
  toast.innerText = 'Icon name copied to clipboard!';
  document.body.append(toast);
  setTimeout(() => {
    toast.remove();
  }, 2000);
}