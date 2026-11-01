import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { SLUSH_FLAVOURS, WHATSAPP_DISPLAY } from '../data/menuData';
import {
  buildSingleOrderWhatsAppMessage,
  buildWhatsAppUrl,
} from '../utils/cartAndOrder';

export interface OrderPreviewState {
  mode: 'single' | 'cart';
  title: string;
  productName?: string;
  price?: number;
  isSlush?: boolean;
  initialMessage: string;
}

interface WhatsAppOrderModalProps {
  orderState: OrderPreviewState | null;
  onClose: () => void;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  orderState,
  onClose,
}) => {
  const [selectedSlushFlavour, setSelectedSlushFlavour] = useState<string>(
    SLUSH_FLAVOURS[0]
  );
  const [copied, setCopied] = useState(false);

  if (!orderState) return null;

  const finalMessage =
    orderState.mode === 'single' &&
    orderState.isSlush &&
    orderState.productName &&
    orderState.price
      ? buildSingleOrderWhatsAppMessage(
          orderState.productName,
          orderState.price,
          `Flavour: ${selectedSlushFlavour}`
        )
      : orderState.initialMessage;

  const waUrl = buildWhatsAppUrl(finalMessage);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-choco/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-modal-title"
        className="bg-white rounded-2xl border border-cream-border max-w-md w-full p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-cream-border pb-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <h3
              id="wa-modal-title"
              className="font-headline text-lg font-bold text-choco"
            >
              {orderState.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close order modal"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-cream text-choco transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderState.isSlush && (
          <div>
            <label
              htmlFor="slush-flavour-select"
              className="block text-xs font-bold text-choco mb-1.5"
            >
              Choose Your Slush Flavour (14 Flavours Available):
            </label>
            <select
              id="slush-flavour-select"
              value={selectedSlushFlavour}
              onChange={(e) => setSelectedSlushFlavour(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-cream border border-cream-border text-xs font-semibold text-choco focus:outline-none focus:border-amber-brand"
            >
              {SLUSH_FLAVOURS.map((flavour) => (
                <option key={flavour} value={flavour}>
                  {flavour}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <span className="text-[11px] font-semibold text-choco/60 block mb-1">
            Order Message Preview (Hotline: {WHATSAPP_DISPLAY})
          </span>
          <pre
            data-testid="whatsapp-message-preview"
            className="p-3.5 rounded-xl bg-cream border border-cream-border text-xs text-choco whitespace-pre-wrap font-body leading-relaxed"
          >
            {finalMessage}
          </pre>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-choco text-choco text-xs font-bold hover:bg-cream transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-pistachio" />
                <span>Copied Order</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Text</span>
              </>
            )}
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send on WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
