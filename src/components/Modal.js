import { CloseSvg } from "../svg/CloseSvg";
import { ModalStyled } from "./styled_components/ModalStyled";
import { OverlayStyled } from "./styled_components/OverlayStyled";
import ReactDom from "react-dom";
import { CloseBtnStyled } from "./styled_components/CloseBtnStyled";
import { useEffect } from "react";
import { SettingsElemStyled } from "./styled_components/SettingsElemStyled";
import Switch from "./Switch";
import SOUNDS from "../sounds";

const Modal = ({ modalOpen, onClose, theme, toggleTheme, setSound }) => {
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <>
      <OverlayStyled onClick={onClose} />
      <ModalStyled>
        <CloseBtnStyled onClick={onClose}>
          <CloseSvg />
        </CloseBtnStyled>
        <p>CONFIGURACIÓN</p>
        <hr />
        <SettingsElemStyled>
          <label htmlFor="darkThemeOp">Tema Oscuro</label>
          <Switch theme={theme} toggleTheme={toggleTheme} />
        </SettingsElemStyled>
        <SettingsElemStyled>
          <label htmlFor="soundOp">Sonido de alarma</label>
          <select
            name="sounds"
            id="soundOp"
            onChange={(e) => {
              setSound(SOUNDS[e.target.value]);
              var audio = new Audio(SOUNDS[e.target.value]);
              audio.play();
            }}
          >
            <option value="Campana">Campana</option>
            <option value="TuTu">TuTu</option>
            <option value="Beep">Beep</option>
            <option value="Mail">Mail</option>
            <option value="WinXp">WinXp</option>
          </select>
        </SettingsElemStyled>
        <SettingsElemStyled>
          <div>Notificaciones</div>
        </SettingsElemStyled>
      </ModalStyled>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
