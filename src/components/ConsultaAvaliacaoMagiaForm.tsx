import React, { useState } from 'react';
import { ConsultationItem } from './ScheduleNavFlow';

interface ConsultaAvaliacaoMagiaFormProps {
  consultation: ConsultationItem;
  whatsappNumber: string;
  onProceedToPayment: (totalAmount: string, summaryText: string) => void;
  onBack: () => void;
  showToast: (msg: string) => void;
}

export const ConsultaAvaliacaoMagiaForm: React.FC<ConsultaAvaliacaoMagiaFormProps> = ({
  consultation,
  whatsappNumber,
  onProceedToPayment,
  onBack,
  showToast,
}) => {
  // Step navigation (1 to 7)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 1. Dados
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // 2. Sobre a Magia
  const [magicType, setMagicType] = useState<string>('');
  const [magicObjective, setMagicObjective] = useState('');
  const [detailedSituation, setDetailedSituation] = useState('');

  // 3. Caso envolva outra pessoa
  const [involvesThirdParty, setInvolvesThirdParty] = useState<'Não' | 'Sim' | ''>('');
  const [thirdPartyName, setThirdPartyName] = useState('');
  const [thirdPartyBirthDate, setThirdPartyBirthDate] = useState('');
  const [thirdPartyRelation, setThirdPartyRelation] = useState('');
  const [currentSituationBetween, setCurrentSituationBetween] = useState('');

  // 4. Trabalhos Anteriores
  const [previousWorkDone, setPreviousWorkDone] = useState<'Não' | 'Sim' | ''>('');
  const [previousWorkDetails, setPreviousWorkDetails] = useState('');

  // 5. Informações Adicionais
  const [additionalInfo, setAdditionalInfo] = useState('');

  // 6. Registro da Análise
  const [wantsPdf, setWantsPdf] = useState<'Não' | 'Sim'>('Não');

  // 7. Declaração
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Helper mask for birth date: 00/00/0000
  const handleBirthDateChange = (val: string, setter: (v: string) => void) => {
    const digitsOnly = val.replace(/\D/g, '').slice(0, 8);
    let formatted = digitsOnly;
    if (digitsOnly.length > 2 && digitsOnly.length <= 4) {
      formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
    } else if (digitsOnly.length > 4) {
      formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4)}`;
    }
    setter(formatted);
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

  // Base price and total calculation
  const baseValue =
    parseFloat(consultation.price.replace(/[^\d,]/g, '').replace(',', '.')) || 60;
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
        setErrorMessage('Por favor, informe seu nome completo.');
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
        setErrorMessage('Por favor, informe seu WhatsApp com DDD.');
        return;
      }
    }

    // Step 2 Validation
    if (currentStep === 2) {
      if (!magicType) {
        setErrorMessage('Por favor, selecione qual tipo de magia deseja realizar.');
        return;
      }
      if (!magicObjective.trim()) {
        setErrorMessage('Por favor, descreva qual é o seu objetivo com este trabalho.');
        return;
      }
      if (!detailedSituation.trim()) {
        setErrorMessage('Por favor, conte detalhadamente o que está acontecendo.');
        return;
      }
    }

    // Step 3 Validation
    if (currentStep === 3) {
      if (involvesThirdParty === 'Sim') {
        if (!thirdPartyName.trim()) {
          setErrorMessage('Por favor, informe o nome completo da outra pessoa envolvida.');
          return;
        }
      }
    }

    // Step 4 Validation
    if (currentStep === 4) {
      if (!previousWorkDone) {
        setErrorMessage('Por favor, informe se já realizou algum trabalho espiritual relacionado.');
        return;
      }
    }

    // Advance
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!acceptedTerms) {
      setErrorMessage('Por favor, leia e aceite a declaração para concluir o envio.');
      return;
    }

    setIsSubmitting(true);

    const formDataPayload = {
      _subject: `[Ficha Avaliação de Magia] ${fullName} - ${consultation.title}`,
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
      '2. Tipo de Magia Desejada': magicType,
      '2. Objetivo com o Trabalho': magicObjective,
      '2. Situação Detalhada': detailedSituation,
      '3. Envolve Outra Pessoa': involvesThirdParty || 'Não informado',
      '3. Nome da Outra Pessoa': thirdPartyName || 'Não se aplica / Não informado',
      '3. Data de Nascimento Outra Pessoa': thirdPartyBirthDate || 'Não informado',
      '3. Relação com a Pessoa': thirdPartyRelation || 'Não informado',
      '3. Situação Atual Entre Vocês': currentSituationBetween || 'Não informado',
      '4. Trabalho Anterior Realizado': previousWorkDone,
      '4. Detalhes Trabalhos Anteriores': previousWorkDetails || 'Nenhum',
      '5. Informações Adicionais': additionalInfo || 'Nenhuma',
      '7. Declaração Aceita': 'Sim, declaro que as informações são verdadeiras e estou ciente.',
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
      const summaryText = `Olá Jess! Acabei de enviar minha Ficha de Avaliação de Magia no site. Meu nome é ${fullName}. Tipo de Magia: ${magicType}. Valor total: ${totalFormatted} (${wantsPdf === 'Sim' ? 'com PDF incluso' : 'sem PDF'}). Vou enviar o comprovante do pagamento a seguir.`;
      onProceedToPayment(totalFormatted, summaryText);
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      showToast('Formulário enviado com sucesso!');
      const summaryText = `Olá Jess! Preenchi a Ficha de Avaliação de Magia no site. Meu nome é ${fullName}. Valor total: ${totalFormatted}.`;
      onProceedToPayment(totalFormatted, summaryText);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsAppBackup = () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const message = `Olá Jess! Preenchi minha Ficha de Avaliação de Magia no site:\n\nNome: ${fullName}\nNascimento: ${birthDate}\nWhatsApp: ${whatsapp}\nE-mail: ${email}\nTipo de Magia: ${magicType}\nRegistro em PDF: ${wantsPdf}\nValor total: ${totalFormatted}\n\nEnviei a ficha completa também por e-mail e gostaria de confirmar o pagamento.`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const magicTypeOptions = [
    'Magia Amorosa',
    'Magia de Prosperidade',
    'Magia Pessoal',
    'Magia de Dano',
    'Magia Personalizada',
    'Ainda não sei e gostaria de orientação',
  ];

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn">
      {/* Top back navigation & Step Counter (1/7 to 7/7) */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          type="button"
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-cinzel font-semibold tracking-[0.14em] text-[#A0557A] bg-white border border-[#C082A0]/40 hover:border-[#C082A0] hover:bg-rose-50/50 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer uppercase touch-manipulation"
          aria-label="Voltar para a etapa anterior"
        >
          VOLTAR
        </button>

        {/* Counter indicator */}
        <div className="px-3.5 py-1 rounded-full bg-rose-50 border border-[#C082A0]/30 text-xs font-cinzel font-bold text-[#A0557A] tracking-widest select-none">
          {currentStep}/7
        </div>
      </div>

      {/* Main Title - single line */}
      <h2 className="font-playfair text-[14px] sm:text-base md:text-lg font-bold tracking-[0.02em] text-[#1E1E1E] text-center mb-1 whitespace-nowrap">
        FICHA AVALIAÇÃO DE MAGIA
      </h2>

      {/* Progress Bar (1/7 to 7/7) */}
      <div className="w-full bg-[#F3E5EC] h-1.5 rounded-full overflow-hidden mt-1 mb-4">
        <div
          className="bg-[#C082A0] h-full transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / 7) * 100}%` }}
        />
      </div>

      {/* Intro Card (visible on Step 1) */}
      {currentStep === 1 && (
        <div className="w-full bg-[#FAF5F8] border border-[#EBD7E2] rounded-2xl p-3.5 sm:p-4 text-[#55474B] text-xs sm:text-[13px] leading-relaxed mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <p className="font-playfair font-bold text-sm sm:text-base text-[#1E1E1E] mb-1.5">
            Seja bem-vinda!
          </p>
          <p className="mb-2">
            Esta ficha será utilizada para preparar sua análise antes da realização da magia. Ela me ajuda a compreender melhor a situação, seu objetivo e o que está acontecendo no momento.
            Quanto mais detalhes você fornecer, mais direcionada poderá ser a análise.
          </p>
          <p className="text-[11px] text-[#716468] italic">
            Todas as informações são tratadas com sigilo e utilizadas exclusivamente para o atendimento.
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
                Etapa 1 de 7
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
                  onChange={(e) => handleBirthDateChange(e.target.value, setBirthDate)}
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

            {/* Next step button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  Avançar para Sobre a Magia
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: 2. SOBRE A MAGIA */}
        {currentStep === 2 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                2. SOBRE A MAGIA
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 2 de 7
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-2">
                Qual tipo de magia você deseja realizar? *
              </label>
              <div className="space-y-2">
                {magicTypeOptions.map((opt) => (
                  <label
                    key={opt}
                    onClick={() => setMagicType(opt)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      magicType === opt
                        ? 'border-[#C082A0] bg-[#FAF4F7]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="magicTypeChoice"
                      value={opt}
                      checked={magicType === opt}
                      onChange={() => setMagicType(opt)}
                      className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                    />
                    <span className="text-xs sm:text-sm font-medium text-neutral-800">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Qual é o seu objetivo com este trabalho? *
              </label>
              <p className="text-xs text-[#8A797E] mb-1.5">
                Ex.: melhorar uma relação, favorecer uma reconciliação, atrair oportunidades profissionais, trabalhar autoestima, afastar uma situação, abrir caminhos etc.
              </p>
              <textarea
                required
                rows={3}
                value={magicObjective}
                onChange={(e) => setMagicObjective(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Conte detalhadamente o que está acontecendo *
              </label>
              <p className="text-xs text-[#8A797E] mb-1.5">
                Explique a situação da forma que achar melhor. Você pode contar como começou, o que aconteceu até agora e o que considera importante para a análise.
              </p>
              <textarea
                required
                rows={4}
                value={detailedSituation}
                onChange={(e) => setDetailedSituation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
              />
            </div>

            {/* Next step button */}
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
                Etapa 3 de 7
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-2">
                Essa magia envolve outra pessoa?
              </label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    name="involvesThirdPartyChoice"
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
                    name="involvesThirdPartyChoice"
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
              <div className="space-y-3.5 pt-2 border-t border-[#F2E5EC] animate-fadeIn">
                <div>
                  <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                    Nome completo da pessoa *
                  </label>
                  <input
                    type="text"
                    value={thirdPartyName}
                    onChange={(e) => setThirdPartyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                      Data de nascimento (se souber)
                    </label>
                    <input
                      type="text"
                      value={thirdPartyBirthDate}
                      onChange={(e) => handleBirthDateChange(e.target.value, setThirdPartyBirthDate)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors"
                    />
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

                <div>
                  <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                    Como está a situação entre vocês atualmente?
                  </label>
                  <textarea
                    rows={3}
                    value={currentSituationBetween}
                    onChange={(e) => setCurrentSituationBetween(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Next step button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  Avançar para Trabalhos Anteriores
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: 4. TRABALHOS ANTERIORES */}
        {currentStep === 4 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                4. TRABALHOS ANTERIORES
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 4 de 7
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
                    name="previousWorkChoice"
                    value="Não"
                    checked={previousWorkDone === 'Não'}
                    onChange={() => setPreviousWorkDone('Não')}
                    className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                  />
                  <span>Não</span>
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    name="previousWorkChoice"
                    value="Sim"
                    checked={previousWorkDone === 'Sim'}
                    onChange={() => setPreviousWorkDone('Sim')}
                    className="w-4 h-4 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                  />
                  <span>Sim</span>
                </label>
              </div>
            </div>

            {previousWorkDone === 'Sim' && (
              <div className="pt-2 animate-fadeIn">
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                  Se sim, qual trabalho foi realizado, quando aproximadamente e qual foi o resultado percebido?
                </label>
                <textarea
                  rows={3}
                  value={previousWorkDetails}
                  onChange={(e) => setPreviousWorkDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
                />
              </div>
            )}

            {/* Next step button */}
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
                Etapa 5 de 7
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1">
                Existe alguma informação importante que não foi perguntada e que você gostaria de acrescentar à análise?
              </label>
              <textarea
                rows={4}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] transition-colors resize-none"
              />
            </div>

            {/* Next step button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  Avançar para Registro da Análise
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: 6. REGISTRO DA ANÁLISE */}
        {currentStep === 6 && (
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5 animate-fadeIn">
            <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                6. REGISTRO DA ANÁLISE
              </span>
              <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                Etapa 6 de 7
              </span>
            </div>

            <div>
              <h4 className="font-playfair text-base font-bold text-[#1E1E1E] mb-1">
                Deseja receber a análise em PDF?
              </h4>
              <p className="text-xs sm:text-[13px] text-[#55474B] leading-relaxed mb-1.5">
                O PDF inclui o registro escrito da análise, fotos das cartas e a descrição da leitura.
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
                      name="wantsPdfChoiceAvaliacao"
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
                      name="wantsPdfChoiceAvaliacao"
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

            {/* Next step button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 min-h-[52px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white shadow-[0_4px_14px_rgba(192,130,160,0.28)] hover:shadow-[0_6px_20px_rgba(192,130,160,0.38)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer text-center touch-manipulation select-none"
              >
                <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-bold text-white text-center">
                  Avançar para Declaração
                </span>
                <span className="font-cinzel text-base text-white">→</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: 7. DECLARAÇÃO & FINALIZAÇÃO */}
        {currentStep === 7 && (
          <form onSubmit={handleSubmit} className="w-full space-y-4 animate-fadeIn">
            <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EBD7E2] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
              <div className="border-b border-[#F2E5EC] pb-2 flex items-center justify-between">
                <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#C082A0]">
                  7. DECLARAÇÃO
                </span>
                <span className="text-[11px] font-cinzel text-[#8A797E] tracking-wider">
                  Etapa 7 de 7
                </span>
              </div>

              <div className="bg-[#FAF5F8] border border-[#EBD7E2] rounded-xl p-3.5 sm:p-4 text-xs sm:text-[13px] text-[#55474B] leading-relaxed">
                <p className="mb-3">
                  Declaro que as informações fornecidas neste formulário são verdadeiras e estou ciente de que a análise pré-magia tem como objetivo avaliar a situação e orientar sobre a possibilidade e adequação do trabalho, não representando garantia de resultado.
                </p>
                <label className="flex items-center gap-2.5 cursor-pointer font-medium text-neutral-900">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 text-[#C082A0] rounded border-neutral-300 focus:ring-[#C082A0] accent-[#C082A0]"
                  />
                  <span>Li e estou de acordo. *</span>
                </label>
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
                  <span>Registro em PDF (envio em até 4 dias úteis)</span>
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
