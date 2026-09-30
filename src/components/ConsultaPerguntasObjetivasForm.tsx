import React, { useState } from 'react';
import { ConsultationItem } from './ScheduleNavFlow';

interface ConsultaPerguntasObjetivasFormProps {
  consultation: ConsultationItem;
  whatsappNumber: string;
  onProceedToPayment: (totalAmount: string, summaryText: string) => void;
  onBack: () => void;
  showToast: (msg: string) => void;
}

export const ConsultaPerguntasObjetivasForm: React.FC<ConsultaPerguntasObjetivasFormProps> = ({
  consultation,
  whatsappNumber,
  onProceedToPayment,
  onBack,
  showToast,
}) => {
  // Step navigation (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 1. Dados
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consultedBefore, setConsultedBefore] = useState<'Sim' | 'Não' | ''>('');

  // Package options for Perguntas Tabela or Consulta Livre
  const isPerguntasTabela = consultation.id === 'perguntas_tabela';
  const isConsultaLivre = consultation.id === 'consulta_livre';

  const [selectedPackage, setSelectedPackage] = useState<string>(() => {
    if (isPerguntasTabela) return '1 pergunta (R$ 20,00)';
    if (isConsultaLivre) return '60 minutos (R$ 125,00)';
    return consultation.price;
  });

  const [packagePrice, setPackagePrice] = useState<number>(() => {
    if (isPerguntasTabela) return 20;
    if (isConsultaLivre) return 125;
    return parseFloat(consultation.price.replace(/[^\d,]/g, '').replace(',', '.')) || 20;
  });

  // 2. Suas Perguntas
  const [questions, setQuestions] = useState('');

  // 3. Caso envolva outra pessoa
  const [involvesThirdParty, setInvolvesThirdParty] = useState<'Não' | 'Sim' | ''>('');
  const [thirdPartyName, setThirdPartyName] = useState('');
  const [thirdPartyBirthDate, setThirdPartyBirthDate] = useState('');
  const [thirdPartyRelation, setThirdPartyRelation] = useState('');

  // 4. Informações Adicionais
  const [additionalInfo, setAdditionalInfo] = useState('');

  // 5. Registro da Consulta
  const [wantsPdf, setWantsPdf] = useState<'Não' | 'Sim'>('Não');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Helper mask for birth date: 00/00/0000
  const handleBirthDateChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, '').slice(0, 8);
    let formatted = digitsOnly;
    if (digitsOnly.length > 2 && digitsOnly.length <= 4) {
      formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
    } else if (digitsOnly.length > 4) {
      formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4)}`;
    }
    setBirthDate(formatted);
  };

  const handleThirdPartyBirthDateChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, '').slice(0, 8);
    let formatted = digitsOnly;
    if (digitsOnly.length > 2 && digitsOnly.length <= 4) {
      formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
    } else if (digitsOnly.length > 4) {
      formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4)}`;
    }
    setThirdPartyBirthDate(formatted);
  };

  // Helper mask for whatsapp: (00) 00000-0000
  const handleWhatsappChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, '').slice(0, 11);
    let formatted = digitsOnly;
    if (digitsOnly.length > 0 && digitsOnly.length <= 2) {
      formatted = `(${digitsOnly}`;
    } else if (digitsOnly.length > 2 && digitsOnly.length <= 7) {
      formatted = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2)}`;
    } else if (digitsOnly.length > 7) {
      formatted = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7)}`;
    }
    setWhatsapp(formatted);
  };

  const handleSelectPackage = (label: string, price: number) => {
    setSelectedPackage(label);
    setPackagePrice(price);
  };

  // Calculate total
  const totalValue = wantsPdf === 'Sim' ? packagePrice + 50 : packagePrice;
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
      if (!questions.trim()) {
        setErrorMessage('Por favor, escreva suas perguntas de forma clara e enumerada.');
        return;
      }
    }

    // Step 3 Validation (se envolve outra pessoa)
    if (currentStep === 3) {
      if (involvesThirdParty === 'Sim' && !thirdPartyName.trim()) {
        setErrorMessage('Por favor, informe o nome da outra pessoa envolvida.');
        return;
      }
    }

    // Proceed to next step
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const formDataPayload = {
      _subject: `[Ficha Pré-Consulta Perguntas Objetivas] ${fullName} - ${consultation.title}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: email,
      'Tipo de Consulta': consultation.title,
      'Opção Escolhida': selectedPackage,
      'Valor Base': `R$ ${packagePrice.toFixed(2).replace('.', ',')}`,
      'Deseja PDF': wantsPdf === 'Sim' ? 'Sim (+ R$ 50,00)' : 'Não',
      'Valor Total': totalFormatted,
      '1. Nome Completo': fullName,
      '1. Data de Nascimento': birthDate,
      '1. E-mail': email,
      '1. WhatsApp': whatsapp,
      '1. Já consultou antes': consultedBefore,
      '2. Suas Perguntas': questions,
      '3. Envolve Outra Pessoa': involvesThirdParty || 'Não informado',
      '3. Nome da Outra Pessoa': thirdPartyName || 'Não se aplica / Não informado',
      '3. Data de Nasc da Outra Pessoa': thirdPartyBirthDate || 'Não informado',
      '3. Relação com a Outra Pessoa': thirdPartyRelation || 'Não informado',
      '4. Informações Adicionais': additionalInfo || 'Nenhuma',
    };

    try {
      await fetch('https://formsubmit.co/ajax/jesscartomancia@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formDataPayload),
      });

      showToast('Formulário enviado com sucesso!');
      const summaryText = `Olá Jess! Acabei de preencher a Ficha Pré-Consulta Perguntas Objetivas para "${consultation.title}" (${selectedPackage}). Meu nome é ${fullName}. Valor total: ${totalFormatted} (${wantsPdf === 'Sim' ? 'com PDF incluso' : 'sem PDF'}). Vou enviar o comprovante do pagamento a seguir.`;
      onProceedToPayment(totalFormatted, summaryText);
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      showToast('Formulário enviado com sucesso!');
      const summaryText = `Olá Jess! Preenchi a Ficha Pré-Consulta Perguntas Objetivas para "${consultation.title}". Meu nome é ${fullName}. Valor total: ${totalFormatted}.`;
      onProceedToPayment(totalFormatted, summaryText);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsAppBackup = () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const message = `Olá Jess! Preenchi minha Ficha Pré-Consulta Perguntas Objetivas no site para "${consultation.title}" (${selectedPackage}):\n\nNome: ${fullName}\nNascimento: ${birthDate}\nWhatsApp: ${whatsapp}\nE-mail: ${email}\nJá consultou antes: ${consultedBefore}\nRegistro em PDF: ${wantsPdf}\nValor total: ${totalFormatted}\n\nEnviei a ficha completa também por e-mail e gostaria de confirmar o pagamento.`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn">
      {/* Top back navigation & Step Counter (1/5) */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          type="button"
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-cinzel font-semibold tracking-[0.14em] text-[#A0557A] bg-white border border-[#C082A0]/40 hover:border-[#C082A0] hover:bg-rose-50/50 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer uppercase touch-manipulation"
          aria-label="Voltar para a etapa anterior"
        >
          VOLTAR
        </button>

        {/* Counter indicator 1/5, 2/5, etc. */}
        <div className="px-3.5 py-1 rounded-full bg-rose-50 border border-[#C082A0]/30 text-xs font-cinzel font-bold text-[#A0557A] tracking-widest select-none">
          {currentStep}/5
        </div>
      </div>

      {/* Main Title - single line */}
      <h2 className="font-playfair text-[13px] sm:text-[15px] md:text-base font-bold tracking-[0.02em] text-[#1E1E1E] text-center mb-1 whitespace-nowrap">
        FICHA PRÉ-CONSULTA — PERGUNTAS OBJETIVAS
      </h2>

      {/* Progress Bar (1/5 to 5/5) */}
      <div className="w-full bg-[#F3E5EC] h-1.5 rounded-full overflow-hidden mt-1 mb-4">
        <div
          className="bg-[#C082A0] h-full transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>

      {/* Intro Card (visible on Step 1) */}
      {currentStep === 1 && (
        <div className="w-full bg-[#FAF5F8] border border-[#EBD7E2] rounded-2xl p-3.5 sm:p-4 text-[#55474B] text-xs sm:text-[13px] leading-relaxed mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <p className="font-playfair font-bold text-sm sm:text-base text-[#1E1E1E] mb-1.5">
            Seja bem-vinda!
          </p>
          <p className="mb-2">
            Este formulário é preenchido antes da consulta para que eu possa organizar suas perguntas e direcionar a tiragem. Quanto mais detalhes você fornecer, mais direcionada e aprofundada poderá ser a nossa tiragem.
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
          <div className="w-full p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 font-medium leading-snug mb-3.5">
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
                Etapa 1 de 5
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
                  onChange={(e) => handleBirthDateChange(e.target.value)}
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
                  onChange={(e) => handleWhatsappChange(e.target.value)}
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
                    name="consultedBeforeObj"
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
                    name="consultedBeforeObj"
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
                  Avançar para Suas Perguntas
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: 2. SUAS PERGUNTAS */}
        {currentStep === 2 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                2. SUAS PERGUNTAS
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 2 de 5
              </span>
            </div>

            {/* Package selector if Perguntas Tabela */}
            {isPerguntasTabela && (
              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  Selecione a quantidade de perguntas:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: '1 pergunta (R$ 20,00)', price: 20 },
                    { label: '2 perguntas (R$ 35,00)', price: 35 },
                    { label: '3 perguntas (R$ 55,00)', price: 55 },
                    { label: '4 perguntas (R$ 75,00)', price: 75 },
                    { label: '5 perguntas (R$ 95,00)', price: 95 },
                  ].map((pkg) => (
                    <label
                      key={pkg.label}
                      onClick={() => handleSelectPackage(pkg.label, pkg.price)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                        selectedPackage === pkg.label
                          ? 'border-[#C082A0] bg-[#FAF4F7] font-semibold text-neutral-900'
                          : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                      }`}
                    >
                      <span>{pkg.label}</span>
                      <input
                        type="radio"
                        name="pkgSelect"
                        checked={selectedPackage === pkg.label}
                        onChange={() => handleSelectPackage(pkg.label, pkg.price)}
                        className="w-3.5 h-3.5 text-[#C082A0] accent-[#C082A0]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Package selector if Consulta Livre */}
            {isConsultaLivre && (
              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  Selecione o tempo da consulta:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: '60 minutos (R$ 125,00)', price: 125 },
                    { label: '1h30 (90 minutos) (R$ 155,00)', price: 155 },
                  ].map((pkg) => (
                    <label
                      key={pkg.label}
                      onClick={() => handleSelectPackage(pkg.label, pkg.price)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                        selectedPackage === pkg.label
                          ? 'border-[#C082A0] bg-[#FAF4F7] font-semibold text-neutral-900'
                          : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                      }`}
                    >
                      <span>{pkg.label}</span>
                      <input
                        type="radio"
                        name="pkgSelectLivre"
                        checked={selectedPackage === pkg.label}
                        onChange={() => handleSelectPackage(pkg.label, pkg.price)}
                        className="w-3.5 h-3.5 text-[#C082A0] accent-[#C082A0]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Escreva suas perguntas de forma objetiva e clara, sempre enumerando-as (1, 2, 3...) *
              </label>
              <textarea
                required
                rows={5}
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
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
                  Avançar para Caso Envolva Outra Pessoa
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: 3. CASO ENVOLVA OUTRA PESSOA */}
        {currentStep === 3 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                3. CASO ENVOLVA OUTRA PESSOA
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 3 de 5
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-2">
                A consulta envolve outra pessoa?
              </label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    name="involvesThirdPartyObj"
                    value="Não"
                    checked={involvesThirdParty === 'Não'}
                    onChange={() => setInvolvesThirdParty('Não')}
                    className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                  />
                  <span>Não</span>
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    name="involvesThirdPartyObj"
                    value="Sim"
                    checked={involvesThirdParty === 'Sim'}
                    onChange={() => setInvolvesThirdParty('Sim')}
                    className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                  />
                  <span>Sim</span>
                </label>
              </div>
            </div>

            {involvesThirdParty === 'Sim' && (
              <div className="space-y-3.5 pt-1 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                      Nome da pessoa *
                    </label>
                    <input
                      type="text"
                      value={thirdPartyName}
                      onChange={(e) => setThirdPartyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                      Data de nascimento, se souber
                    </label>
                    <input
                      type="text"
                      value={thirdPartyBirthDate}
                      onChange={(e) => handleThirdPartyBirthDateChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                    Qual é a relação dessa pessoa com você?
                  </label>
                  <input
                    type="text"
                    value={thirdPartyRelation}
                    onChange={(e) => setThirdPartyRelation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
                  />
                </div>
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

        {/* STEP 4: 4. INFORMAÇÕES ADICIONAIS */}
        {currentStep === 4 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                4. INFORMAÇÕES ADICIONAIS
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 4 de 5
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Existe alguma informação sobre alguma das perguntas que você considera importante acrescentar?
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

        {/* STEP 5: 5. REGISTRO DA CONSULTA & FINALIZAÇÃO */}
        {currentStep === 5 && (
          <form onSubmit={handleSubmit} className="w-full space-y-4 animate-fadeIn">
            <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5">
              <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
                <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                  5. REGISTRO DA CONSULTA
                </span>
                <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                  Etapa 5 de 5
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
                        name="wantsPdfObj"
                        value="Não"
                        checked={wantsPdf === 'Não'}
                        onChange={() => setWantsPdf('Não')}
                        className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                      />
                      <span className="text-xs sm:text-sm font-medium text-neutral-800">
                        Não
                      </span>
                    </div>
                    <span className="text-xs text-[#716468] font-cinzel font-bold">
                      R$ {packagePrice.toFixed(2).replace('.', ',')}
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
                        name="wantsPdfObj"
                        value="Sim"
                        checked={wantsPdf === 'Sim'}
                        onChange={() => setWantsPdf('Sim')}
                        className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                      />
                      <span className="text-xs sm:text-sm font-medium text-neutral-800">
                        Sim, quero receber o PDF (+ R$ 50,00)
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
                <span className="font-semibold text-neutral-800">{selectedPackage}</span>
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
