import React, { useState } from 'react';

interface FichaRealizacaoMagiaFormProps {
  initialMagiaTitle?: string;
  initialMagiaPrice?: string;
  onBack: () => void;
  onSubmitSuccess: (totalAmount: string, summary: Record<string, any>) => void;
}

export const FichaRealizacaoMagiaForm: React.FC<FichaRealizacaoMagiaFormProps> = ({
  initialMagiaTitle = 'Magia Selecionada',
  initialMagiaPrice = 'A combinar',
  onBack,
  onSubmitSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 7;

  // Step 1: Dados
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // Step 2: Magia Escolhida
  const [magiaEscolhida, setMagiaEscolhida] = useState(initialMagiaTitle);
  const [objetivoMagia, setObjetivoMagia] = useState('');

  // Step 3: Sobre a Situação
  const [situacao, setSituacao] = useState('');

  // Step 4: Caso Envolva Outra Pessoa
  const [envolveOutraPessoa, setEnvolveOutraPessoa] = useState<'nao' | 'sim'>('nao');
  const [outraPessoaNome, setOutraPessoaNome] = useState('');
  const [outraPessoaNascimento, setOutraPessoaNascimento] = useState('');
  const [outraPessoaRelacao, setOutraPessoaRelacao] = useState('');
  const [outraPessoaInfoImportante, setOutraPessoaInfoImportante] = useState('');

  // Step 5: Trabalhos Anteriores
  const [jaFezTrabalho, setJaFezTrabalho] = useState<'nao' | 'sim'>('nao');
  const [trabalhoRealizadoQuando, setTrabalhoRealizadoQuando] = useState('');
  const [trabalhoMudancaPercebida, setTrabalhoMudancaPercebida] = useState('');

  // Step 6: Informações Adicionais
  const [infoAdicional, setInfoAdicional] = useState('');

  // Step 7: Declaração
  const [concordouDeclaracao, setConcordouDeclaracao] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Masking helpers
  const handleDateChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 8);
    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    } else if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    setNascimento(formatted);
  };

  const handleOutraPessoaDateChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 8);
    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    } else if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    setOutraPessoaNascimento(formatted);
  };

  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 11);
    let formatted = cleaned;
    if (cleaned.length > 6) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length > 2) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    setWhatsapp(formatted);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    if (!concordouDeclaracao) {
      alert('Por favor, confirme a declaração para prosseguir.');
      return;
    }

    setIsSubmitting(true);

    const formData = {
      tipo: 'FICHA PARA REALIZAÇÃO DA MAGIA',
      magiaEscolhida,
      investimento: initialMagiaPrice,
      nome,
      nascimento,
      email,
      whatsapp,
      objetivoMagia,
      situacao,
      envolveOutraPessoa,
      outraPessoa:
        envolveOutraPessoa === 'sim'
          ? {
              nome: outraPessoaNome,
              nascimento: outraPessoaNascimento,
              relacao: outraPessoaRelacao,
              infoImportante: outraPessoaInfoImportante,
            }
          : null,
      trabalhosAnteriores:
        jaFezTrabalho === 'sim'
          ? {
              detalhesQuando: trabalhoRealizadoQuando,
              mudancaPercebida: trabalhoMudancaPercebida,
            }
          : 'Não realizou',
      infoAdicional,
      concordouDeclaracao,
      dataEnvio: new Date().toISOString(),
    };

    // Prepare email body
    const emailSubject = encodeURIComponent(`Ficha Realização da Magia - ${magiaEscolhida} - ${nome || 'Nova Solicitação'}`);
    const emailBody = encodeURIComponent(
      `FICHA PARA REALIZAÇÃO DA MAGIA\n` +
      `----------------------------------------\n` +
      `Magia Escolhida: ${magiaEscolhida}\n` +
      `Investimento: ${initialMagiaPrice}\n\n` +
      `1. DADOS\n` +
      `Nome: ${nome}\n` +
      `Nascimento: ${nascimento}\n` +
      `E-mail: ${email}\n` +
      `WhatsApp: ${whatsapp}\n\n` +
      `2. OBJETIVO DA MAGIA\n` +
      `${objetivoMagia}\n\n` +
      `3. SOBRE A SITUAÇÃO\n` +
      `${situacao}\n\n` +
      `4. CASO ENVOLVA OUTRA PESSOA\n` +
      `Envolve outra pessoa: ${envolveOutraPessoa === 'sim' ? 'Sim' : 'Não'}\n` +
      (envolveOutraPessoa === 'sim'
        ? `Nome: ${outraPessoaNome}\nNascimento: ${outraPessoaNascimento}\nRelação: ${outraPessoaRelacao}\nInformações sobre a pessoa/situação: ${outraPessoaInfoImportante}\n\n`
        : '\n') +
      `5. TRABALHOS ANTERIORES\n` +
      `Já realizou trabalho espiritual antes: ${jaFezTrabalho === 'sim' ? 'Sim' : 'Não'}\n` +
      (jaFezTrabalho === 'sim'
        ? `Trabalho realizado e quando: ${trabalhoRealizadoQuando}\nMudança percebida: ${trabalhoMudancaPercebida}\n\n`
        : '\n') +
      `6. INFORMAÇÕES ADICIONAIS\n` +
      `${infoAdicional || 'Nenhuma'}\n\n` +
      `7. DECLARAÇÃO\n` +
      `Li e estou de acordo: Sim (confirmado no envio)\n`
    );

    // Trigger mailto link silently
    const mailtoUrl = `mailto:jesscartomancia@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show toast message
    setToastMessage('Formulário enviado com sucesso!');

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(initialMagiaPrice, formData);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#3A2228] text-[#FDF8F9] px-6 py-3 rounded-full text-xs md:text-sm font-medium tracking-wide shadow-xl flex items-center space-x-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation & Step Indicator */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={handlePrev}
          className="text-xs font-semibold uppercase tracking-wider text-[#716468] hover:text-[#1E1E1E] transition-colors py-1 px-2 -ml-2 rounded flex items-center space-x-1"
        >
          <span>← VOLTAR</span>
        </button>
        <span className="font-playfair text-xs md:text-sm font-semibold tracking-wider text-[#A06579]">
          {currentStep}/{totalSteps}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#F5E6EC] rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-[#D48B9F] transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Main Title */}
      <h2 className="font-playfair text-xl md:text-2xl font-bold tracking-[0.03em] text-[#1E1E1E] text-center mb-5 uppercase">
        FICHA PARA REALIZAÇÃO DA MAGIA
      </h2>

      {/* STEP 1: DADOS */}
      {currentStep === 1 && (
        <div className="w-full space-y-5 animate-fadeIn">
          {/* Welcome Card */}
          <div className="bg-[#FFF9FA] border border-[#F3D7E0] rounded-2xl p-4 md:p-5 text-[#55474B] text-xs md:text-[13px] leading-relaxed space-y-2.5 shadow-[0_2px_10px_rgba(200,140,160,0.06)]">
            <h3 className="font-playfair text-[15px] font-bold text-[#8C4A60]">
              Seja bem-vinda!
            </h3>
            <p>
              Esta ficha reúne as informações necessárias para a realização da magia escolhida.
            </p>
            <p>
              Como você optou por seguir sem a consulta de avaliação, o trabalho será realizado de acordo com a magia selecionada e com as informações fornecidas neste formulário.
            </p>
            <p>
              Preencha com atenção e, caso exista alguma informação importante sobre a situação, utilize os campos disponíveis para acrescentá-la.
            </p>
            <p className="font-medium text-[#716468] pt-1 border-t border-[#F7E1E8]">
              Todas as informações são tratadas com sigilo e utilizadas exclusivamente para o atendimento.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#A06579] uppercase">
              1. DADOS
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                Nome completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all"
                placeholder=""
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                Data de nascimento
              </label>
              <input
                type="text"
                value={nascimento}
                onChange={(e) => handleDateChange(e.target.value)}
                maxLength={10}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all"
                placeholder=""
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all"
                placeholder=""
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                WhatsApp com DDD
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => handlePhoneChange(e.target.value)}
                maxLength={15}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all"
                placeholder=""
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D48B9F] to-[#C0758B] hover:from-[#C77E92] hover:to-[#B3687E] text-white font-medium text-xs md:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Avançar
          </button>
        </div>
      )}

      {/* STEP 2: MAGIA ESCOLHIDA */}
      {currentStep === 2 && (
        <div className="w-full space-y-5 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#A06579] uppercase">
              2. MAGIA ESCOLHIDA
            </h3>

            {/* Magia Escolhida Info Box */}
            <div className="bg-rose-50/50 border border-rose-100/80 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="block text-[11px] font-cinzel uppercase tracking-wider text-[#8C4A60] font-semibold mb-0.5">
                  Magia selecionada:
                </span>
                <span className="font-playfair text-base md:text-lg font-bold text-[#1E1E1E]">
                  {magiaEscolhida}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-sans uppercase tracking-wider text-[#716468]">
                  Investimento
                </span>
                <span className="font-playfair text-sm md:text-base font-bold text-[#C082A0]">
                  {initialMagiaPrice}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                Qual é o seu objetivo com esta magia?
              </label>
              <p className="text-[11px] text-[#716468] mb-2 leading-relaxed">
                Ex.: favorecer uma reconciliação, melhorar uma relação, atrair oportunidades, abrir caminhos profissionais, afastar determinada situação etc.
              </p>
              <textarea
                rows={4}
                value={objetivoMagia}
                onChange={(e) => setObjetivoMagia(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all resize-y"
                placeholder=""
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D48B9F] to-[#C0758B] hover:from-[#C77E92] hover:to-[#B3687E] text-white font-medium text-xs md:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Avançar
          </button>
        </div>
      )}

      {/* STEP 3: SOBRE A SITUAÇÃO */}
      {currentStep === 3 && (
        <div className="w-full space-y-5 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#A06579] uppercase">
              3. SOBRE A SITUAÇÃO
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                Conte o que está acontecendo e o que levou você a realizar esta magia.
              </label>
              <p className="text-[11px] text-[#716468] mb-2 leading-relaxed">
                Conte da forma que achar melhor. Essas informações me ajudam a compreender o objetivo do trabalho e realizar a magia de acordo com a situação apresentada.
              </p>
              <textarea
                rows={6}
                value={situacao}
                onChange={(e) => setSituacao(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all resize-y"
                placeholder=""
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D48B9F] to-[#C0758B] hover:from-[#C77E92] hover:to-[#B3687E] text-white font-medium text-xs md:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Avançar
          </button>
        </div>
      )}

      {/* STEP 4: CASO ENVOLVA OUTRA PESSOA */}
      {currentStep === 4 && (
        <div className="w-full space-y-5 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#A06579] uppercase">
              4. CASO ENVOLVA OUTRA PESSOA
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-2">
                A magia envolve outra pessoa?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEnvolveOutraPessoa('nao')}
                  className={`py-2.5 px-4 rounded-xl border text-xs md:text-sm font-medium transition-all ${
                    envolveOutraPessoa === 'nao'
                      ? 'border-[#C082A0] bg-rose-50/50 text-[#8C4A60] shadow-sm'
                      : 'border-neutral-200 bg-white text-[#716468] hover:border-neutral-300'
                  }`}
                >
                  Não
                </button>
                <button
                  type="button"
                  onClick={() => setEnvolveOutraPessoa('sim')}
                  className={`py-2.5 px-4 rounded-xl border text-xs md:text-sm font-medium transition-all ${
                    envolveOutraPessoa === 'sim'
                      ? 'border-[#C082A0] bg-rose-50/50 text-[#8C4A60] shadow-sm'
                      : 'border-neutral-200 bg-white text-[#716468] hover:border-neutral-300'
                  }`}
                >
                  Sim
                </button>
              </div>
            </div>

            {envolveOutraPessoa === 'sim' && (
              <div className="space-y-4 pt-3 border-t border-neutral-100 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={outraPessoaNome}
                    onChange={(e) => setOutraPessoaNome(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all"
                    placeholder=""
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                    Data de nascimento, se souber
                  </label>
                  <input
                    type="text"
                    value={outraPessoaNascimento}
                    onChange={(e) => handleOutraPessoaDateChange(e.target.value)}
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all"
                    placeholder=""
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                    Qual é a relação dessa pessoa com você?
                  </label>
                  <input
                    type="text"
                    value={outraPessoaRelacao}
                    onChange={(e) => setOutraPessoaRelacao(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all"
                    placeholder=""
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                    Existe alguma informação sobre essa pessoa ou sobre a situação que seja importante para a realização da magia?
                  </label>
                  <textarea
                    rows={3}
                    value={outraPessoaInfoImportante}
                    onChange={(e) => setOutraPessoaInfoImportante(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all resize-y"
                    placeholder=""
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D48B9F] to-[#C0758B] hover:from-[#C77E92] hover:to-[#B3687E] text-white font-medium text-xs md:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Avançar
          </button>
        </div>
      )}

      {/* STEP 5: TRABALHOS ANTERIORES */}
      {currentStep === 5 && (
        <div className="w-full space-y-5 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#A06579] uppercase">
              5. TRABALHOS ANTERIORES
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-2">
                Já realizou algum trabalho espiritual relacionado a essa situação?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setJaFezTrabalho('nao')}
                  className={`py-2.5 px-4 rounded-xl border text-xs md:text-sm font-medium transition-all ${
                    jaFezTrabalho === 'nao'
                      ? 'border-[#C082A0] bg-rose-50/50 text-[#8C4A60] shadow-sm'
                      : 'border-neutral-200 bg-white text-[#716468] hover:border-neutral-300'
                  }`}
                >
                  Não
                </button>
                <button
                  type="button"
                  onClick={() => setJaFezTrabalho('sim')}
                  className={`py-2.5 px-4 rounded-xl border text-xs md:text-sm font-medium transition-all ${
                    jaFezTrabalho === 'sim'
                      ? 'border-[#C082A0] bg-rose-50/50 text-[#8C4A60] shadow-sm'
                      : 'border-neutral-200 bg-white text-[#716468] hover:border-neutral-300'
                  }`}
                >
                  Sim
                </button>
              </div>
            </div>

            {jaFezTrabalho === 'sim' && (
              <div className="space-y-4 pt-3 border-t border-neutral-100 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                    Qual trabalho foi realizado e aproximadamente quando?
                  </label>
                  <textarea
                    rows={3}
                    value={trabalhoRealizadoQuando}
                    onChange={(e) => setTrabalhoRealizadoQuando(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all resize-y"
                    placeholder=""
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                    Houve alguma mudança percebida depois do trabalho?
                  </label>
                  <textarea
                    rows={3}
                    value={trabalhoMudancaPercebida}
                    onChange={(e) => setTrabalhoMudancaPercebida(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all resize-y"
                    placeholder=""
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D48B9F] to-[#C0758B] hover:from-[#C77E92] hover:to-[#B3687E] text-white font-medium text-xs md:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Avançar
          </button>
        </div>
      )}

      {/* STEP 6: INFORMAÇÕES ADICIONAIS */}
      {currentStep === 6 && (
        <div className="w-full space-y-5 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#A06579] uppercase">
              6. INFORMAÇÕES ADICIONAIS
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1E1E1E] mb-1.5">
                Existe alguma informação importante que não foi perguntada e que você gostaria de acrescentar?
              </label>
              <textarea
                rows={5}
                value={infoAdicional}
                onChange={(e) => setInfoAdicional(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 text-xs md:text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C082A0] focus:bg-white transition-all resize-y"
                placeholder=""
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D48B9F] to-[#C0758B] hover:from-[#C77E92] hover:to-[#B3687E] text-white font-medium text-xs md:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Avançar
          </button>
        </div>
      )}

      {/* STEP 7: DECLARAÇÃO & PAGAMENTO */}
      {currentStep === 7 && (
        <div className="w-full space-y-5 animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <h3 className="font-cinzel text-xs font-bold tracking-wider text-[#A06579] uppercase">
              7. DECLARAÇÃO
            </h3>

            <div className="bg-[#FFF9FA] border border-[#F3D7E0] rounded-xl p-4 text-[#55474B] text-xs md:text-[13px] leading-relaxed">
              <p className="mb-3">
                Declaro que escolhi realizar a magia sem a consulta de avaliação prévia e estou ciente de que, nessa modalidade, o trabalho será realizado de acordo com a magia escolhida e as informações fornecidas neste formulário.
              </p>
              <label className="flex items-start space-x-2.5 cursor-pointer pt-2 border-t border-[#F7E1E8]">
                <input
                  type="checkbox"
                  checked={concordouDeclaracao}
                  onChange={(e) => setConcordouDeclaracao(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-[#C082A0] focus:ring-[#C082A0] accent-[#C082A0]"
                />
                <span className="text-xs md:text-sm font-semibold text-[#8C4A60]">
                  Li e estou de acordo.
                </span>
              </label>
            </div>

            {/* Financial Summary */}
            <div className="bg-neutral-50/80 rounded-xl p-4 border border-neutral-100 space-y-2 text-xs md:text-[13px]">
              <div className="flex justify-between text-[#716468]">
                <span>Magia escolhida:</span>
                <span className="font-medium text-[#1E1E1E]">{magiaEscolhida}</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between font-bold text-sm md:text-base text-[#1E1E1E]">
                <span>Total a investir:</span>
                <span className="text-[#C082A0]">{initialMagiaPrice}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !concordouDeclaracao}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2 ${
              concordouDeclaracao && !isSubmitting
                ? 'bg-gradient-to-r from-[#D48B9F] to-[#C0758B] hover:from-[#C77E92] hover:to-[#B3687E] text-white hover:shadow-lg'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span>Processando...</span>
            ) : (
              <span>Enviar Ficha & Enviar Comprovante no WhatsApp</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
