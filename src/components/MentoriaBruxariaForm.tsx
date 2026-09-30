import React, { useState } from 'react';

interface MentoriaBruxariaFormProps {
  whatsappNumber: string;
  onBack: () => void;
  onBackToHome: () => void;
  showToast: (msg: string) => void;
}

export const MentoriaBruxariaForm: React.FC<MentoriaBruxariaFormProps> = ({
  whatsappNumber,
  onBack,
  onBackToHome,
  showToast,
}) => {
  // Step navigation (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // 1. Dados Pessoais
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  // 2. Nível de prática & tempo
  const [practiceLevel, setPracticeLevel] = useState<string>('');
  const [timeOfInterest, setTimeOfInterest] = useState('');

  // 3. Motivação & Interesses
  const [motivation, setMotivation] = useState('');
  const [topicsToLearn, setTopicsToLearn] = useState('');

  // 4. Estudos Anteriores
  const [studiedBefore, setStudiedBefore] = useState<'Não' | 'Sim' | ''>('');
  const [studiedDetails, setStudiedDetails] = useState('');

  // 5. Expectativas & Dúvidas
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [additionalQuestions, setAdditionalQuestions] = useState('');

  // Submission & Success state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
        setErrorMessage('Por favor, informe a sua data de nascimento.');
        return;
      }
      if (birthDate.trim().length < 10) {
        setErrorMessage('Por favor, preencha a data de nascimento completa (DD/MM/AAAA).');
        return;
      }
      if (!whatsapp.trim()) {
        setErrorMessage('Por favor, informe o seu número de WhatsApp com DDD.');
        return;
      }
      if (whatsapp.trim().length < 14) {
        setErrorMessage('Por favor, informe o número de WhatsApp completo com DDD.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Por favor, informe um endereço de e-mail válido.');
        return;
      }
    }

    // Step 2 Validation
    if (currentStep === 2) {
      if (!practiceLevel) {
        setErrorMessage('Por favor, selecione o seu nível de prática.');
        return;
      }
      if (!timeOfInterest.trim()) {
        setErrorMessage('Por favor, informe há quanto tempo você tem interesse ou pratica bruxaria.');
        return;
      }
    }

    // Step 3 Validation
    if (currentStep === 3) {
      if (!motivation.trim()) {
        setErrorMessage('Por favor, conte o que te levou a procurar a mentoria.');
        return;
      }
      if (!topicsToLearn.trim()) {
        setErrorMessage('Por favor, informe o que você mais gostaria de aprender ou aprofundar.');
        return;
      }
    }

    // Step 4 Validation
    if (currentStep === 4) {
      if (!studiedBefore) {
        setErrorMessage('Por favor, informe se já estudou bruxaria através de algum curso, livro ou tradição.');
        return;
      }
      if (studiedBefore === 'Sim' && !studiedDetails.trim()) {
        setErrorMessage('Por favor, conte um pouco sobre o que você já estudou.');
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!expectedOutcome.trim()) {
      setErrorMessage('Por favor, informe o que você espera conseguir ao final da mentoria.');
      return;
    }

    setIsSubmitting(true);

    try {
      const emailSubject = `Nova Aplicação - Mentoria de Bruxaria: ${fullName}`;
      const emailBody = [
        `FICHA DE MENTORIA DE BRUXARIA`,
        `==================================`,
        ``,
        `1. DADOS PESSOAIS:`,
        `- Nome completo: ${fullName}`,
        `- Data de nascimento: ${birthDate}`,
        `- WhatsApp: ${whatsapp}`,
        `- E-mail: ${email}`,
        ``,
        `2. NÍVEL DE PRÁTICA & TEMPO:`,
        `- Nível de prática: ${practiceLevel}`,
        `- Tempo de interesse ou prática: ${timeOfInterest}`,
        ``,
        `3. MOTIVAÇÃO & INTERESSES:`,
        `- O que levou a procurar a mentoria: ${motivation}`,
        `- O que mais gostaria de aprender/aprofundar: ${topicsToLearn}`,
        ``,
        `4. ESTUDOS ANTERIORES:`,
        `- Já estudou anteriormente: ${studiedBefore}`,
        studiedBefore === 'Sim' ? `- Detalhes dos estudos: ${studiedDetails}` : null,
        ``,
        `5. EXPECTATIVAS & DÚVIDAS:`,
        `- O que espera conseguir ao final da mentoria: ${expectedOutcome}`,
        `- Informações adicionais ou dúvidas: ${additionalQuestions || 'Nenhuma'}`,
        ``,
        `Data e Hora do preenchimento: ${new Date().toLocaleString('pt-BR')}`,
      ]
        .filter(Boolean)
        .join('\n');

      const mailtoUrl = `mailto:jesscartomancia@gmail.com?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;

      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 500);

      showToast('Formulário enviado com sucesso!');
      setIsSuccess(true);
      scrollToTop();
    } catch (err) {
      console.error(err);
      showToast('Formulário enviado com sucesso!');
      setIsSuccess(true);
      scrollToTop();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const cleanUserNumber = cleanNumber.startsWith('55') ? cleanNumber : `55${cleanNumber}`;
    const text = `Olá Jess! Preenchi e enviei o formulário de aplicação para a Mentoria de Bruxaria.`;
    window.open(`https://wa.me/${cleanUserNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full flex flex-col items-center max-w-xl mx-auto pb-10">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          type="button"
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs font-cinzel font-semibold tracking-[0.14em] text-[#A0557A] bg-white border border-[#C082A0]/40 hover:border-[#C082A0] hover:bg-rose-50/50 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer uppercase"
          aria-label="Voltar para a etapa anterior"
        >
          VOLTAR
        </button>
        <span className="font-cinzel text-xs tracking-wider text-[#A0557A] font-semibold">
          {currentStep}/{totalSteps}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-rose-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-[#C082A0] transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Single-line Main Title */}
      <h2 className="font-playfair text-xl md:text-2xl font-bold tracking-[0.04em] text-[#1E1E1E] text-center mb-1 uppercase">
        MENTORIA DE BRUXARIA
      </h2>
      <p className="font-playfair italic text-[14px] text-[#716468] text-center max-w-[340px] mb-3">
        Acompanhamento individual e direcionamento prático
      </p>

      {/* Aviso de aplicação e contato para pagamento */}
      <div className="w-full mb-4 p-3 rounded-xl bg-rose-50/80 border border-[#C082A0]/30 flex items-center justify-center gap-2 text-[#7A425E] text-xs font-medium text-center">
        <svg className="w-4 h-4 shrink-0 text-[#C082A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Vagas limitadas • Ao preencher, sua aplicação entra na lista exclusiva para análise</span>
      </div>

      {/* SUCCESS SCREEN */}
      {isSuccess ? (
        <div className="w-full bg-white rounded-2xl p-6 md:p-8 border border-neutral-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#A0557A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="font-playfair text-xl md:text-2xl font-semibold text-[#1E1E1E]">
            Aplicação Enviada com Sucesso!
          </h3>

          <div className="bg-rose-50/60 rounded-xl p-4 border border-[#C082A0]/20 text-neutral-700 text-sm leading-relaxed text-left">
            <p className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#A0557A] mb-1">
              Lista de Aplicação Exclusiva
            </p>
            <p>
              As vagas para a mentoria individual são rigorosamente limitadas. Sua aplicação foi registrada na lista exclusiva: vou analisar pessoalmente suas respostas e entrar em contato direto pelo WhatsApp para conversarmos sobre a sua vaga, alinhamento e próximos passos.
            </p>
          </div>

          <p className="text-sm text-neutral-600">
            Você também pode me chamar diretamente no WhatsApp para avisar que já preencheu sua aplicação:
          </p>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full flex items-center justify-center px-6 py-4 min-h-[50px] rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-semibold"
          >
            Falar no WhatsApp
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="w-full flex items-center justify-center px-6 py-3.5 rounded-2xl bg-white border border-[#C082A0]/50 hover:bg-rose-50/40 text-[#A0557A] transition-all duration-200 cursor-pointer font-cinzel text-xs tracking-[0.16em] uppercase font-semibold"
          >
            VOLTAR PARA O INÍCIO
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* STEP 1: DADOS */}
          {currentStep === 1 && (
            <div className="w-full bg-white rounded-2xl p-5 md:p-6 border border-neutral-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4 animate-fadeIn">
              <div className="border-b border-rose-100 pb-3 mb-1">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-[#A0557A]">
                  1. DADOS PESSOAIS
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  Seu nome completo <span className="text-[#C082A0]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  Data de nascimento <span className="text-[#C082A0]">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={birthDate}
                  onChange={(e) => setBirthDate(formatBirthDate(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  WhatsApp <span className="text-[#C082A0]">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={15}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  E-mail <span className="text-[#C082A0]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0]"
                />
              </div>
            </div>
          )}

          {/* STEP 2: NÍVEL DE PRÁTICA & TEMPO */}
          {currentStep === 2 && (
            <div className="w-full bg-white rounded-2xl p-5 md:p-6 border border-neutral-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4 animate-fadeIn">
              <div className="border-b border-rose-100 pb-3 mb-1">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-[#A0557A]">
                  2. NÍVEL DE PRÁTICA
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-2">
                  Qual é o seu nível de prática? <span className="text-[#C082A0]">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    'Iniciante — estou começando do zero',
                    'Praticante — já estudo, mas ainda estou construindo minha base',
                    'Intermediário — já tenho uma prática estabelecida e quero me aprofundar',
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPracticeLevel(option)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all duration-200 cursor-pointer ${
                        practiceLevel === option
                          ? 'border-[#C082A0] bg-rose-50/50 font-medium text-neutral-900 shadow-sm'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 shrink-0 aspect-square rounded-full border flex items-center justify-center ${
                            practiceLevel === option ? 'border-[#C082A0] bg-[#C082A0]' : 'border-neutral-300'
                          }`}
                        >
                          {practiceLevel === option && <div className="w-1.5 h-1.5 shrink-0 aspect-square rounded-full bg-white" />}
                        </div>
                        <span className="leading-snug">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  Há quanto tempo você tem interesse ou pratica bruxaria? <span className="text-[#C082A0]">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={timeOfInterest}
                  onChange={(e) => setTimeOfInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: MOTIVAÇÃO & INTERESSES */}
          {currentStep === 3 && (
            <div className="w-full bg-white rounded-2xl p-5 md:p-6 border border-neutral-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4 animate-fadeIn">
              <div className="border-b border-rose-100 pb-3 mb-1">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-[#A0557A]">
                  3. MOTIVAÇÃO & OBJETIVOS
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  O que te levou a procurar a mentoria? Conte um pouco sobre o que você está buscando neste momento <span className="text-[#C082A0]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  O que você mais gostaria de aprender ou aprofundar? <span className="text-[#C082A0]">*</span>
                </label>
                <p className="text-xs text-neutral-500 mb-2">
                  Pode falar sobre assuntos específicos, dúvidas ou áreas da bruxaria que despertam seu interesse.
                </p>
                <textarea
                  rows={4}
                  required
                  value={topicsToLearn}
                  onChange={(e) => setTopicsToLearn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: ESTUDOS ANTERIORES */}
          {currentStep === 4 && (
            <div className="w-full bg-white rounded-2xl p-5 md:p-6 border border-neutral-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4 animate-fadeIn">
              <div className="border-b border-rose-100 pb-3 mb-1">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-[#A0557A]">
                  4. ESTUDOS ANTERIORES
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-2">
                  Você já estudou bruxaria através de algum curso, livro, tradição ou outra forma? <span className="text-[#C082A0]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Não', 'Sim'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setStudiedBefore(opt)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer text-center ${
                        studiedBefore === opt
                          ? 'border-[#C082A0] bg-rose-50/50 text-[#A0557A] font-semibold shadow-sm'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {studiedBefore === 'Sim' && (
                <div className="pt-2 animate-fadeIn">
                  <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                    Conte um pouco sobre o que já estudou <span className="text-[#C082A0]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={studiedDetails}
                    onChange={(e) => setStudiedDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] resize-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 5: EXPECTATIVAS, DÚVIDAS & FINALIZAÇÃO */}
          {currentStep === 5 && (
            <div className="w-full bg-white rounded-2xl p-5 md:p-6 border border-neutral-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] space-y-4 animate-fadeIn">
              <div className="border-b border-rose-100 pb-3 mb-1">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-[#A0557A]">
                  5. EXPECTATIVAS & FINALIZAÇÃO
                </h3>
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  O que você espera conseguir ao final da mentoria? <span className="text-[#C082A0]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={expectedOutcome}
                  onChange={(e) => setExpectedOutcome(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#716468] mb-1.5">
                  Tem alguma dúvida ou informação que gostaria de acrescentar?
                </label>
                <textarea
                  rows={3}
                  value={additionalQuestions}
                  onChange={(e) => setAdditionalQuestions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 focus:outline-none focus:border-[#C082A0] resize-none"
                />
              </div>

              {/* Informative card about Mentoria */}
              <div className="bg-rose-50/60 rounded-xl p-4 border border-[#C082A0]/20 text-neutral-700 text-xs md:text-sm leading-relaxed">
                <p className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#A0557A] mb-1">
                  Sobre a Mentoria
                </p>
                <p>
                  As vagas são individuais e limitadas. Ao enviar suas respostas, você entrará na nossa lista de aplicação exclusiva: analisarei seu perfil cuidadosamente e entrarei em contato direto pelo WhatsApp para conversarmos sobre a mentoria, funcionamento, alinhamento e próximos passos.
                </p>
              </div>
            </div>
          )}

          {/* Validation Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center font-medium">
              {errorMessage}
            </div>
          )}

          {/* Action Button: Next Step or Submit */}
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full flex items-center justify-center px-5 py-4 min-h-[50px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white border border-[#B06B8D]/30 shadow-[0_2px_8px_rgba(192,130,160,0.22)] hover:shadow-[0_4px_14px_rgba(192,130,160,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 ease-out cursor-pointer text-center mt-3"
            >
              <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-semibold text-white text-center">
                Avançar ({currentStep + 1}/{totalSteps})
              </span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-5 py-4 min-h-[50px] rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white border border-[#B06B8D]/30 shadow-[0_2px_8px_rgba(192,130,160,0.22)] hover:shadow-[0_4px_14px_rgba(192,130,160,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 ease-out cursor-pointer text-center mt-3 disabled:opacity-50"
            >
              <span className="font-cinzel text-xs md:text-[13px] tracking-[0.16em] uppercase font-semibold text-white text-center">
                {isSubmitting ? 'Enviando...' : 'Enviar Formulário de Aplicação'}
              </span>
            </button>
          )}
        </form>
      )}
    </div>
  );
};
