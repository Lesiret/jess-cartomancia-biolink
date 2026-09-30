import React, { useState } from 'react';
import { PixIcon, CopyIcon, CheckIcon, WhatsAppIcon } from './Icons';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixKey?: string;
  beneficiaryName?: string;
  whatsappNumber?: string;
  amount?: string;
  onReturnHome?: () => void;
}

export const PixModal: React.FC<PixModalProps> = ({
  isOpen,
  onClose,
  pixKey = '49013412000155',
  beneficiaryName = 'Jessica C Franco',
  whatsappNumber = '5548988365882',
  amount,
  onReturnHome,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  // Format CNPJ as 49.013.412/0001-55 if 14 digits
  const formattedKey =
    pixKey.length === 14
      ? pixKey.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
      : pixKey;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(pixKey);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = pixKey;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const receiptUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    amount
      ? `Olá Jess! Realizei o pagamento via PIX no valor de ${amount} e gostaria de enviar o comprovante.`
      : 'Olá Jess! Realizei o pagamento via PIX e gostaria de enviar o comprovante.'
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[390px] rounded-3xl bg-white p-6 md:p-7 shadow-2xl border border-neutral-100/90 text-neutral-800 transition-all"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 20px 40px -10px rgba(192, 130, 160, 0.25)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mt-2 mb-5">
          <h3 className="font-playfair text-2xl font-bold text-[#1E1E1E] tracking-tight">
            Pagamento via PIX
          </h3>
          {amount && (
            <div className="mt-2 px-3.5 py-1 rounded-full bg-[#FAF0F5] border border-[#C082A0]/30 text-xs font-cinzel font-bold text-[#A0557A] tracking-wider">
              VALOR: {amount}
            </div>
          )}
          <div className="mt-2 px-3.5 py-1 rounded-full bg-rose-50/90 border border-[#C082A0]/25 text-xs text-[#716468] flex items-center gap-1.5">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Recebedor:</span>
            <span className="font-semibold text-neutral-800">{beneficiaryName}</span>
          </div>
        </div>

        {/* PIX Key Box - Click to copy */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 flex items-center justify-between">
            <span>Tipo de chave: CNPJ</span>
            <span className="text-[10px] text-[#C082A0] font-bold">Clique para copiar</span>
          </div>

          <div
            onClick={handleCopy}
            className={`group relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
              copied
                ? 'bg-emerald-50/80 border-emerald-400/80 shadow-xs'
                : 'bg-neutral-50/80 hover:bg-rose-50/40 border-neutral-200/80 hover:border-[#C082A0]/60'
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="font-mono text-sm md:text-base font-semibold text-neutral-900 tracking-wider select-all truncate">
                {formattedKey}
              </div>
              <div className="text-[10px] text-neutral-400 truncate">
                Chave sem pontuação: {pixKey}
              </div>
            </div>

            <div
              className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                copied
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-white text-[#C082A0] border border-neutral-200 group-hover:border-[#C082A0]'
              }`}
            >
              {copied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Copy CTA Button */}
        <button
          onClick={handleCopy}
          type="button"
          className={`w-full py-3.5 px-5 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer mb-3 active:scale-[0.99] ${
            copied
              ? 'bg-emerald-600 text-white shadow-emerald-200'
              : 'bg-[#C082A0] hover:bg-[#B07290] text-white'
          }`}
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4" />
              <span>Chave PIX Copiada com Sucesso!</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-4 h-4" />
              <span>Copiar Chave PIX</span>
            </>
          )}
        </button>

        {/* Toggle QR Code view */}
        <div className="text-center mb-4">
          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="text-xs text-[#C082A0] hover:underline font-medium cursor-pointer"
          >
            {showQr ? 'Ocultar QR Code' : 'Visualizar QR Code para leitura no celular'}
          </button>

          {showQr && (
            <div className="mt-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                  pixKey
                )}`}
                alt="QR Code PIX"
                className="w-36 h-36 rounded-lg bg-white p-1.5 border border-neutral-200 shadow-xs"
              />
              <span className="text-[10px] text-neutral-400 mt-1.5">
                Abra o app do seu banco e aponte a câmera
              </span>
            </div>
          )}
        </div>

        {/* Step-by-step guidance */}
        <div className="p-3 bg-rose-50/50 rounded-2xl border border-[#C082A0]/15 mb-4">
          <div className="text-[11px] text-[#716468] space-y-1">
            <p>1. Copie a chave <strong>CNPJ</strong> acima.</p>
            <p>2. No app do seu banco, escolha <strong>Área Pix &gt; Transferir &gt; Chave CNPJ</strong>.</p>
            <p>3. Cole a chave, insira o valor e confirme.</p>
          </div>
        </div>

        {/* WhatsApp Receipt Button */}
        <a
          href={receiptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl border border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
          <span>Enviar comprovante no WhatsApp</span>
        </a>

        {/* Return to Home Button */}
        <button
          type="button"
          onClick={() => {
            if (onReturnHome) {
              onReturnHome();
            } else {
              onClose();
            }
          }}
          className="w-full mt-2.5 py-3 px-4 rounded-xl bg-[#FAF4F7] hover:bg-[#F2E5EC] border border-[#EBD7E2] hover:border-[#C082A0] text-[#A0557A] active:scale-[0.98] text-xs font-cinzel font-bold tracking-[0.14em] uppercase flex items-center justify-center transition-all cursor-pointer touch-manipulation"
        >
          Voltar para o Início
        </button>
      </div>
    </div>
  );
};
