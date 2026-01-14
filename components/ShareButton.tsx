
import React from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url = window.location.href, className, children }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.log('Erro ao compartilhar', error);
      }
    } else {
      // Fallback: Copiar para área de transferência ou abrir WhatsApp
      const shareText = `${title}\n\n${text}\n\n${url}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <button onClick={handleShare} className={className}>
      {children || (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )}
    </button>
  );
};

export default ShareButton;
