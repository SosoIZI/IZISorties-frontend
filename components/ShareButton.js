import { useState } from 'react';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
} from 'react-share';
import styles from '../styles/ShareButton.module.css';

const ShareButton = ({ url, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const mailtoLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent("Check this out: " + url)}`;
  const smsLink = `sms:?body=${encodeURIComponent(title + " " + url)}`;

  return (
    <div className={styles.shareContainer}>
      <button className={styles.iconButton} onClick={toggleMenu}>
        <i className="bx bx-share"></i>
      </button>

      {isOpen && (
        <div className={styles.shareMenu}>
          <WhatsappShareButton url={url} title={title} className={styles.shareItem}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <FacebookShareButton url={url} quote={title} className={styles.shareItem}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <a href="https://www.messenger.com/" target="_blank" rel="noopener noreferrer" className={styles.shareItem}>
            <img src='/messenger_icon.png' alt="Messenger" style={{ width: 32, borderRadius: '50%' }} />
          </a>

          <TwitterShareButton url={url} title={title} className={styles.shareItem}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton url={url} title={title} className={styles.shareItem}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <EmailShareButton url={url} subject={title} body="Check this out:" className={styles.shareItem}>
            <EmailIcon size={32} round />
          </EmailShareButton>

          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className={styles.shareItem}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={{ width: 32, borderRadius: '50%' }} />
          </a>

          <a href="https://www.snapchat.com/" target="_blank" rel="noopener noreferrer" className={styles.shareItem}>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1200px-Snapchat_logo.svg.png" alt="Snapchat" style={{ width: 32, borderRadius: '50%' }} />
          </a>

          <a href={smsLink} className={styles.shareItem}>
            <img src='/sms_icon.png' alt="SMS" style={{ width: 32, borderRadius: '50%' }} />
          </a>
        </div>
      )}
    </div>
  );
};

export default ShareButton;