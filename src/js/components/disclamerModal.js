import { modules } from "../dev/kuloverova";

function disclamerModal() {
    if (document.querySelector('.entrance')) {
        setTimeout(() => {
          modules.popup.open('#popup__arise-expert');
        }, 0);
      }
}

export default disclamerModal;