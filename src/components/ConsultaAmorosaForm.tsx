import React, { useState } from 'react';
import { ConsultationItem } from './ScheduleNavFlow';

interface ConsultaAmorosaFormProps {
  consultation: ConsultationItem;
  whatsappNumber: string;
  onProceedToPayment: (totalAmount: string, summaryText: string) => void;
  onBack: () => void;
  showToast: (msg: string) => void;
}

export const ConsultaAmorosaForm: React.FC<ConsultaAmorosaFormProps> = ({
  consultation,
  whatsappNumber,
  onProceedToPayment,
  onBack,
  showToast,
}) => {
  // Step navigation (1 to 6)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 1. Dados
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consultedBefore, setConsultedBefore] = useState<'Sim' | 'Não' | ''>('');

  // 2. Sobre a Situação
  const [situation, setSituation] = useState('');
  const [mainDoubt, setMainDoubt] = useState('');
  const [whatToUnderstand, setWhatToUnderstand] = useState('');
  const [specificInvestigation, setSpecificInvestigation] = useState('');

  // 3. Sobre a Outra Pessoa
  const [otherPersonName, setOtherPersonName] = useState('');
  const [otherPersonBirthDate, setOtherPersonBirthDate] = useState('');
  const [otherPersonRelation, setOtherPersonRelation] = useState('');
  const [otherPersonCommunication, setOtherPersonCommunication] = useState('');

  // 4. Trabalhos Espirituais
  const [spiritualWorkDone, setSpiritualWorkDone] = useState<'Não' | 'Sim' | ''>('');
  const [spiritualWorkDetails, setSpiritualWorkDetails] = useState('');

  // 5. Informações Adicionais
  const [additionalInfo, setAdditionalInfo] = useState('');

  // 6. Registro da Consulta
  const [wantsPdf, setWantsPdf] = useState<'Não' | 'Sim'>('Não');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Formatting helpers
  const formatBirthDate = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const formatWhatsApp = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  // Calculate total
  const baseValue =
    parseFloat(consultation.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  const totalValue = wantsPdf === 'Sim' ? baseValue + 50 : baseValue;
  const totalFormatted = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    } else {
      onBack();
    }
  };

  const handleNextStep = () => {
    setErrorMessage('');

    // Step 1 Validation
    if (currentStep === 1) {
      if (!fullName.trim()) {
        setErrorMessage('Por favor, preencha o seu nome completo.');
        return;
      }
      if (!birthDate.trim()) {
        setErrorMessage('Por favor, informe sua data de nascimento.');
        return;
      }
      if (!email.trim()) {
        setErrorMessage('Por favor, informe seu e-mail.');
        return;
      }
      if (!whatsapp.trim()) {
        setErrorMessage('Por favor, informe seu WhatsApp.');
        return;
      }
      if (!consultedBefore) {
        setErrorMessage('Por favor, responda se já realizou consulta anteriormente.');
        return;
      }
    }

    // Step 2 Validation
    if (currentStep === 2) {
      if (!situation.trim()) {
        setErrorMessage('Por favor, preencha o relato sobre a situação amorosa.');
        return;
      }
      if (!mainDoubt.trim()) {
        setErrorMessage('Por favor, informe sua principal dúvida sobre essa situação.');
        return;
      }
      if (!whatToUnderstand.trim()) {
        setErrorMessage('Por favor, informe o que você gostaria de compreender através da consulta.');
        return;
      }
    }

    // Step 3 (Sobre a Outra Pessoa) is optional

    // Step 4 Validation
    if (currentStep === 4) {
      if (!spiritualWorkDone) {
        setErrorMessage('Por favor, informe se já realizou algum trabalho espiritual relacionado.');
        return;
      }
    }

    // Proceed to next step
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const formDataPayload = {
      _subject: `[Ficha Pré-Consulta Amorosa] ${fullName} - ${consultation.title}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: email,
      'Tipo de Consulta': consultation.title,
      'Valor Base': consultation.price,
      'Deseja PDF': wantsPdf === 'Sim' ? 'Sim (+ R$ 50,00)' : 'Não',
      'Valor Total': totalFormatted,
      '1. Nome Completo': fullName,
      '1. Data de Nascimento': birthDate,
      '1. E-mail': email,
      '1. WhatsApp': whatsapp,
      '1. Já consultou antes': consultedBefore,
      '2. Relato da Situação': situation,
      '2. Principal Dúvida': mainDoubt,
      '2. O que compreender': whatToUnderstand,
      '2. Investigação Específica': specificInvestigation || 'Não informado',
      '3. Outra Pessoa - Nome': otherPersonName || 'Não se aplica / Não informado',
      '3. Outra Pessoa - Nascimento': otherPersonBirthDate || 'Não informado',
      '3. Outra Pessoa - Relação Atual': otherPersonRelation || 'Não informado',
      '3. Outra Pessoa - Comunicação': otherPersonCommunication || 'Não informado',
      '4. Trabalho Espiritual Realizado': spiritualWorkDone,
      '4. Detalhes do Trabalho': spiritualWorkDetails || 'Nenhum',
      '5. Informações Adicionais': additionalInfo || 'Nenhuma',
    };

    try {
      // Send directly to jesscartomancia@gmail.com using FormSubmit AJAX
      await fetch('https://formsubmit.co/ajax/jesscartomancia@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formDataPayload),
      });

      showToast('Formulário enviado com sucesso!');
      const summaryText = `Olá Jess! Acabei de preencher a Ficha Pré-Consulta Amorosa para "${consultation.title}". Meu nome é ${fullName}. Valor total: ${totalFormatted} (${wantsPdf === 'Sim' ? 'com PDF incluso' : 'sem PDF'}). Vou enviar o comprovante do pagamento a seguir.`;
      onProceedToPayment(totalFormatted, summaryText);
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      showToast('Formulário enviado com sucesso!');
      const summaryText = `Olá Jess! Preenchi a Ficha Pré-Consulta Amorosa para "${consultation.title}". Meu nome é ${fullName}. Valor total: ${totalFormatted}.`;
      onProceedToPayment(totalFormatted, summaryText);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsAppBackup = () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const message = `Olá Jess! Preenchi minha Ficha Pré-Consulta Amorosa no site para "${consultation.title}":\n\nNome: ${fullName}\nNascimento: ${birthDate}\nWhatsApp: ${whatsapp}\nE-mail: ${email}\nJá consultou antes: ${consultedBefore}\nRegistro em PDF: ${wantsPdf}\nValor total: ${totalFormatted}\n\nEnviei a ficha completa também por e-mail e gostaria de confirmar o pagamento.`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn">
      {/* Top back navigation & Step Counter (1/6) */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          type="button"
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-cinzel font-semibold tracking-[0.14em] text-[#A0557A] bg-white border border-[#C082A0]/40 hover:border-[#C082A0] hover:bg-rose-50/50 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer uppercase touch-manipulation"
          aria-label="Voltar para a etapa anterior"
        >
          VOLTAR
        </button>

        {/* Counter indicator 1/6, 2/6, etc. */}
        <div className="px-3.5 py-1 rounded-full bg-rose-50 border border-[#C082A0]/30 text-xs font-cinzel font-bold text-[#A0557A] tracking-widest select-none">
          {currentStep}/6
        </div>
      </div>

      {/* Main Title - reduced font size to keep on a single line */}
      <h2 className="font-playfair text-[15px] sm:text-base md:text-lg font-bold tracking-[0.02em] text-[#1E1E1E] text-center mb-1 whitespace-nowrap">
        FICHA PRÉ-CONSULTA — AMOROSA
      </h2>

      {/* Progress Bar (1/6 to 6/6) */}
      <div className="w-full bg-[#F3E5EC] h-1.5 rounded-full overflow-hidden mt-1 mb-3.5">
        <div
          className="bg-[#C082A0] h-full transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / 6) * 100}%` }}
        />
      </div>

      {/* Compact Intro Card (visible on Step 1) */}
      {currentStep === 1 && (
        <div className="w-full bg-[#FAF5F8] border border-[#EBD7E2] rounded-xl p-3 sm:p-3.5 text-[#55474B] text-xs leading-relaxed mb-3 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <p className="font-playfair font-bold text-[13px] sm:text-sm text-[#1E1E1E] mb-1">
            Seja bem-vinda!
          </p>
          <p className="mb-1 text-xs text-[#55474B] leading-snug">
            Este formulário é preenchido antes da consulta e me ajuda a entender melhor a situação que você deseja investigar. Quanto mais detalhes você fornecer, mais direcionada e aprofundada poderá ser a nossa tiragem.
          </p>
          <p className="text-[11px] text-[#716468] italic">
            As informações fornecidas são tratadas com sigilo e utilizadas exclusivamente para o atendimento.
          </p>
        </div>
      )}

      {/* Form Container */}
      <div className="w-full">
        {/* Error notification */}
        {errorMessage && (
          <div className="w-full p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 font-medium leading-snug mb-3">
            {errorMessage}
          </div>
        )}

        {/* STEP 1: 1. DADOS */}
        {currentStep === 1 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                1. DADOS
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 1 de 6
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Nome completo *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                  Data de nascimento *
                </label>
                <input
                  type="text"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(formatBirthDate(e.target.value))}
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                  WhatsApp com DDD *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                  maxLength={15}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                E-mail *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-2">
                Você já realizou uma consulta comigo anteriormente? *
              </label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    name="consultedBefore"
                    value="Sim"
                    checked={consultedBefore === 'Sim'}
                    onChange={() => setConsultedBefore('Sim')}
                    className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                  />
                  <span>Sim</span>
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    name="consultedBefore"
                    value="Não"
                    checked={consultedBefore === 'Não'}
                    onChange={() => setConsultedBefore('Não')}
                    className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                  />
                  <span>Não</span>
                </label>
              </div>
            </div>

            {/* Next step button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  Avançar para Sobre a Situação
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: 2. SOBRE A SITUAÇÃO */}
        {currentStep === 2 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                2. SOBRE A SITUAÇÃO
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 2 de 6
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Conte um pouco sobre a situação amorosa que deseja consultar *
              </label>
              <textarea
                required
                rows={4}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Qual é a sua principal dúvida sobre essa situação? *
              </label>
              <textarea
                required
                rows={3}
                value={mainDoubt}
                onChange={(e) => setMainDoubt(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                O que você gostaria de compreender através da consulta? *
              </label>
              <textarea
                required
                rows={3}
                value={whatToUnderstand}
                onChange={(e) => setWhatToUnderstand(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Existe alguma situação específica que gostaria que fosse investigada na leitura?
              </label>
              <textarea
                rows={2}
                value={specificInvestigation}
                onChange={(e) => setSpecificInvestigation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
              />
            </div>

            {/* Navigation buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  Avançar para Sobre a Outra Pessoa
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: 3. SOBRE A OUTRA PESSOA */}
        {currentStep === 3 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                3. SOBRE A OUTRA PESSOA
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 3 de 6
              </span>
            </div>
            <p className="text-xs text-[#8A797E] -mt-1">
              Caso a consulta envolva outra pessoa, preciso de algumas informações:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={otherPersonName}
                  onChange={(e) => setOtherPersonName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                  Data de nascimento, se souber
                </label>
                <input
                  type="text"
                  value={otherPersonBirthDate}
                  onChange={(e) => setOtherPersonBirthDate(formatBirthDate(e.target.value))}
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Qual é a relação atual de vocês?
              </label>
              <input
                type="text"
                value={otherPersonRelation}
                onChange={(e) => setOtherPersonRelation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Como está a comunicação entre vocês atualmente?
              </label>
              <textarea
                rows={2}
                value={otherPersonCommunication}
                onChange={(e) => setOtherPersonCommunication(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
              />
            </div>

            {/* Navigation buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  Avançar para Trabalhos Espirituais
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: 4. TRABALHOS ESPIRITUAIS */}
        {currentStep === 4 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                4. TRABALHOS ESPIRITUAIS
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 4 de 6
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-2">
                Já realizou algum trabalho espiritual relacionado a essa situação? *
              </label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    name="spiritualWorkDone"
                    value="Não"
                    checked={spiritualWorkDone === 'Não'}
                    onChange={() => setSpiritualWorkDone('Não')}
                    className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                  />
                  <span>Não</span>
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    name="spiritualWorkDone"
                    value="Sim"
                    checked={spiritualWorkDone === 'Sim'}
                    onChange={() => setSpiritualWorkDone('Sim')}
                    className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                  />
                  <span>Sim</span>
                </label>
              </div>
            </div>

            {spiritualWorkDone === 'Sim' && (
              <div className="pt-2 animate-fadeIn">
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                  Se sim, qual trabalho foi realizado e aproximadamente quando?
                </label>
                <textarea
                  rows={2}
                  value={spiritualWorkDetails}
                  onChange={(e) => setSpiritualWorkDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
                />
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  Avançar para Informações Adicionais
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: 5. INFORMAÇÕES ADICIONAIS */}
        {currentStep === 5 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                5. INFORMAÇÕES ADICIONAIS
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 5 de 6
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Existe alguma informação importante que não foi perguntada e que você gostaria de acrescentar antes da consulta?
              </label>
              <textarea
                rows={4}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
              />
            </div>

            {/* Navigation buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  Avançar para Registro da Consulta
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: 6. REGISTRO DA CONSULTA & FINALIZAÇÃO */}
        {currentStep === 6 && (
          <form onSubmit={handleSubmit} className="w-full space-y-4 animate-fadeIn">
            <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5">
              <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
                <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                  6. REGISTRO DA CONSULTA
                </span>
                <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                  Etapa 6 de 6
                </span>
              </div>

              <div>
                <h4 className="font-playfair text-base font-bold text-[#1E1E1E] mb-1">
                  Deseja receber sua consulta em PDF?
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55474B] leading-relaxed mb-1.5">
                  O PDF inclui o registro escrito da leitura, fotos das cartas e a descrição da consulta.
                </p>
                <div className="inline-block px-2.5 py-1 rounded-full bg-rose-50 text-[11px] font-cinzel font-semibold text-[#A0557A] border border-[#C082A0]/25 mb-3">
                  Acréscimo de R$ 50,00 | Prazo de envio de até 4 dias úteis.
                </div>

                <div className="space-y-2 mt-1">
                  <label
                    onClick={() => setWantsPdf('Não')}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      wantsPdf === 'Não'
                        ? 'border-[#C082A0] bg-[#FAF4F7]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="wantsPdf"
                        value="Não"
                        checked={wantsPdf === 'Não'}
                        onChange={() => setWantsPdf('Não')}
                        className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                      />
                      <span className="text-xs sm:text-sm font-medium text-neutral-800">
                        Não, apenas a consulta tradicional
                      </span>
                    </div>
                    <span className="text-xs text-[#716468] font-cinzel font-bold">
                      {consultation.price}
                    </span>
                  </label>

                  <label
                    onClick={() => setWantsPdf('Sim')}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      wantsPdf === 'Sim'
                        ? 'border-[#C082A0] bg-[#FAF4F7]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="wantsPdf"
                        value="Sim"
                        checked={wantsPdf === 'Sim'}
                        onChange={() => setWantsPdf('Sim')}
                        className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                      />
                      <span className="text-xs sm:text-sm font-medium text-neutral-800">
                        Sim, desejo receber em PDF (+ R$ 50,00)
                      </span>
                    </div>
                    <span className="text-xs text-[#A0557A] font-cinzel font-bold">
                      + R$ 50,00
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Resumo Financeiro */}
            <div className="w-full bg-[#FAF5F8] border border-[#EBD7E2] rounded-2xl p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm text-[#55474B]">
                <span>Consulta: {consultation.title}</span>
                <span className="font-semibold text-neutral-800">{consultation.price}</span>
              </div>

              {wantsPdf === 'Sim' && (
                <div className="flex justify-between items-center text-xs sm:text-sm text-[#55474B]">
                  <span>Registro em PDF (envio em até 4 dias)</span>
                  <span className="font-semibold text-[#A0557A]">+ R$ 50,00</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#EBD7E2] flex justify-between items-center text-neutral-900">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#716468]">
                  Total do Investimento
                </span>
                <span className="font-playfair text-xl sm:text-2xl font-bold text-[#C082A0]">
                  {totalFormatted}
                </span>
              </div>
            </div>

            {/* Submit button */}
            <div className="w-full pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  {isSubmitting ? 'Enviando Ficha...' : 'Enviar Ficha & Enviar Comprovante no WhatsApp'}
                </span>
              </button>
            </div>

            {/* Alternative link for WhatsApp */}
            <div className="w-full text-center pt-1">
              <button
                type="button"
                onClick={handleSendWhatsAppBackup}
                className="text-xs font-cinzel font-semibold tracking-wider text-[#A0557A] hover:underline cursor-pointer uppercase py-1"
              >
                Ou clique aqui para enviar seus dados diretamente no WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
