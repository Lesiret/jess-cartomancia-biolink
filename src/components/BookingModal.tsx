import React, { useState } from 'react';
import { ColorTheme } from '../types';
import { WhatsAppIcon, ExternalLinkIcon, CheckIcon } from './Icons';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ColorTheme;
  whatsappNumber: string;
}

type MainCategory = 'magias' | 'consultas' | 'mentoria' | 'ebooks';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  theme,
  whatsappNumber,
}) => {
  // Navigation State
  const [activeCategory, setActiveCategory] = useState<MainCategory>('magias');

  // Magias Sub-flow State
  const [magiaFlow, setMagiaFlow] = useState<'decision' | 'avaliacao' | 'direta'>('decision');
  const [selectedMagiaType, setSelectedMagiaType] = useState<string>('Magia Amorosa');

  // Consultas Sub-flow State
  const [selectedConsulta, setSelectedConsulta] = useState<string>('Amorosa');

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [intention, setIntention] = useState('');

  // Mentoria Form Fields
  const [mentoriaExperience, setMentoriaExperience] = useState('Iniciante (começando do zero)');
  const [mentoriaInterests, setMentoriaInterests] = useState<string[]>([
    'Rituais & Feitiçaria Prática',
  ]);
  const [mentoriaGoal, setMentoriaGoal] = useState('');
  const [mentoriaPhone, setMentoriaPhone] = useState('');

  // Ebooks URL (User can configure or customize)
  const [ebooksUrl] = useState('');

  if (!isOpen) return null;

  const cleanNumber = whatsappNumber.replace(/\D/g, '');

  // Submit Handler for MAGIAS
  const handleMagiaSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let messageLines: (string | null)[] = [];

    if (magiaFlow === 'avaliacao') {
      messageLines = [
        `🔮 *Solicitação de Consulta de Avaliação para Magia - Jess* 🔮`,
        ``,
        `*Nome:* ${clientName || 'Cliente'}`,
        `*Tipo de Atendimento:* Consulta Prévia de Avaliação e Alinhamento Energético`,
        intention ? `*Situação / Objetivo:* ${intention}` : null,
        ``,
        `Olá Jess! Li suas orientações e gostaria de agendar a consulta de avaliação para analisarmos meu caso antes de definir a magia. Gratidão! ✨`,
      ];
    } else {
      messageLines = [
        `✨ *Solicitação Direta de Magia / Ritual - Jess* ✨`,
        ``,
        `*Nome:* ${clientName || 'Cliente'}`,
        `*Magia Escolhida:* ${selectedMagiaType}`,
        `*Opção de Fluxo:* Trabalho direto solicitado sem consulta de avaliação prévia`,
        intention ? `*Detalhes da intenção / objetivo:* ${intention}` : null,
        ``,
        `Olá Jess! Já sei qual trabalho desejo e gostaria de dar andamento nesta magia. ✨`,
      ];
    }

    const encoded = encodeURIComponent(messageLines.filter(Boolean).join('\n'));
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  // Submit Handler for CONSULTAS
  const handleConsultaSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const messageLines = [
      `🃏 *Agendamento de Consulta - Jess Cartomancia* 🃏`,
      ``,
      `*Nome:* ${clientName || 'Cliente'}`,
      `*Categoria da Consulta:* ${selectedConsulta}`,
      intention ? `*Principal questão ou objetivo:* ${intention}` : null,
      ``,
      `Olá Jess! Gostaria de confirmar disponibilidade para agendar a minha consulta. Gratidão! ✨`,
    ].filter(Boolean);

    const encoded = encodeURIComponent(messageLines.join('\n'));
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  // Submit Handler for MENTORIA
  const handleMentoriaSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const messageLines = [
      `🌙 *Formulário de Aplicação: Mentoria de Bruxaria* 🌙`,
      ``,
      `*Nome Completo:* ${clientName || 'Interessada(o)'}`,
      mentoriaPhone ? `*WhatsApp de contato:* ${mentoriaPhone}` : null,
      `*Nível de Conhecimento:* ${mentoriaExperience}`,
      mentoriaInterests.length > 0 ? `*Áreas de Maior Interesse:* ${mentoriaInterests.join(', ')}` : null,
      mentoriaGoal ? `*Principal Objetivo:* ${mentoriaGoal}` : null,
      ``,
      `Olá Jess! Preenchi o formulário de aplicação para a Mentoria de Bruxaria e gostaria de verificar informações sobre vagas e valores. ✨`,
    ].filter(Boolean);

    const encoded = encodeURIComponent(messageLines.join('\n'));
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  // Ebooks WhatsApp handler
  const handleEbooksWhatsApp = () => {
    const message = encodeURIComponent(
      'Olá Jess! Gostaria de saber mais sobre os seus E-books e materiais digitais de bruxaria e tarot. ✨'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const toggleInterest = (interest: string) => {
    setMentoriaInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const consultaOptions = [
    {
      id: 'Amorosa',
      title: 'Amorosa',
      desc: 'Vida afetiva, sentimentos, reconciliação, alma gêmea e caminhos do coração.',
      icon: '❤️',
    },
    {
      id: 'Financeira/Profissional',
      title: 'Financeira / Profissional',
      desc: 'Carreira, empreendimentos, prosperidade, novos projetos e tomadas de decisão.',
      icon: '🌿',
    },
    {
      id: 'Avaliacao ou Acompanhamento de feitiço',
      title: 'Avaliação ou Acompanhamento de Feitiço',
      desc: 'Diagnóstico energético prévio ou checagem da evolução de rituais e magias.',
      icon: '🔮',
    },
    {
      id: 'Autoconhecimento',
      title: 'Autoconhecimento',
      desc: 'Cura energética, identificação de bloqueios emocionais e reconexão com sua força.',
      icon: '🪞',
    },
    {
      id: 'Mensal/Mesa Real',
      title: 'Mensal / Mesa Real',
      desc: 'A leitura panorâmica mais completa: todas as 36 casas do baralho cigano para o ciclo.',
      icon: '✨',
    },
    {
      id: 'Perguntas Objetivas',
      title: 'Perguntas Objetivas',
      desc: 'Respostas rápidas e precisas via áudio ou texto para dúvidas pontuais e urgentes.',
      icon: '🎯',
    },
  ];

  const magiaOptions = [
    {
      id: 'Magia Amorosa',
      title: 'Magia Amorosa',
      desc: 'Adoçamento, atração magnética, reconciliação, fortalecimento de laços e paixão.',
      icon: '🕯️',
    },
    {
      id: 'Magia Prosperidade',
      title: 'Magia Prosperidade',
      desc: 'Abertura de caminhos financeiros, atração de clientes, sucesso e fartura.',
      icon: '🪙',
    },
    {
      id: 'Magias Pessoais',
      title: 'Magias Pessoais',
      desc: 'Autoestima, magnetismo, proteção áurica, banimento de energias densas e vitalidade.',
      icon: '🛡️',
    },
    {
      id: 'Magias de Dano',
      title: 'Magias de Dano',
      desc: 'Corte definitivo de cordões tóxicos, neutralização de inveja e demandas espirituais.',
      icon: '⚔️',
    },
    {
      id: 'Magias Personalizadas',
      title: 'Magias Personalizadas',
      desc: 'Trabalho ritualístico exclusivo e sob medida estruturado para sua necessidade.',
      icon: '⚡',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[500px] max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-neutral-100 text-neutral-800 transition-all"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 20px 45px -10px rgba(192, 130, 160, 0.28)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer z-10"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Top Header */}
        <div className="text-center mt-1 mb-5">
          <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-2 bg-rose-50 text-[#C082A0] border border-[#C082A0]/25">
            ATENDIMENTO EXCLUSIVO
          </span>
          <h3 className="font-playfair text-2xl sm:text-[26px] font-bold text-[#1E1E1E] tracking-tight">
            Agendar um Atendimento
          </h3>
          <p className="font-editorial italic text-sm text-[#716468] mt-0.5">
            Selecione a categoria desejada e personalize seu direcionamento
          </p>
        </div>

        {/* 4 Main Categories Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveCategory('magias')}
            className={`py-2.5 px-2 rounded-2xl text-xs font-semibold transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer border ${
              activeCategory === 'magias'
                ? 'bg-[#C082A0] text-white border-[#C082A0] shadow-sm'
                : 'bg-neutral-50/80 text-neutral-700 border-neutral-200/80 hover:bg-rose-50/40 hover:border-[#C082A0]/40'
            }`}
          >
            <span className="text-base">🔮</span>
            <span className="tracking-wide">Magias</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('consultas')}
            className={`py-2.5 px-2 rounded-2xl text-xs font-semibold transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer border ${
              activeCategory === 'consultas'
                ? 'bg-[#C082A0] text-white border-[#C082A0] shadow-sm'
                : 'bg-neutral-50/80 text-neutral-700 border-neutral-200/80 hover:bg-rose-50/40 hover:border-[#C082A0]/40'
            }`}
          >
            <span className="text-base">🃏</span>
            <span className="tracking-wide">Consultas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('mentoria')}
            className={`py-2.5 px-2 rounded-2xl text-xs font-semibold transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer border ${
              activeCategory === 'mentoria'
                ? 'bg-[#C082A0] text-white border-[#C082A0] shadow-sm'
                : 'bg-neutral-50/80 text-neutral-700 border-neutral-200/80 hover:bg-rose-50/40 hover:border-[#C082A0]/40'
            }`}
          >
            <span className="text-base">🌙</span>
            <span className="tracking-wide">Mentoria</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('ebooks')}
            className={`py-2.5 px-2 rounded-2xl text-xs font-semibold transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer border ${
              activeCategory === 'ebooks'
                ? 'bg-[#C082A0] text-white border-[#C082A0] shadow-sm'
                : 'bg-neutral-50/80 text-neutral-700 border-neutral-200/80 hover:bg-rose-50/40 hover:border-[#C082A0]/40'
            }`}
          >
            <span className="text-base">📖</span>
            <span className="tracking-wide">E-books</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* 1. CATEGORIA: MAGIAS                                           */}
        {/* ============================================================== */}
        {activeCategory === 'magias' && (
          <div className="space-y-4">
            {/* Aviso informativo solicitado */}
            <div className="bg-rose-50/60 border border-[#C082A0]/30 rounded-2xl p-4.5 text-neutral-800">
              <h4 className="font-playfair text-base font-bold text-[#1E1E1E] flex items-center gap-1.5 mb-2">
                Antes de escolher sua magia ✨
              </h4>
              <p className="text-xs text-neutral-700 leading-relaxed mb-2.5">
                Cada situação é única. Por isso, antes de realizar uma magia, recomendo uma consulta de avaliação, onde analisamos o seu caso e verificamos se aquele trabalho é realmente adequado para o seu objetivo.
              </p>
              <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                A consulta não é obrigatória. Caso você já saiba qual magia deseja realizar e opte por seguir sem a avaliação, o trabalho será realizado conforme a sua solicitação, sem uma análise prévia da situação.
              </p>
              <p className="text-xs font-bold text-[#1E1E1E]">
                Como você deseja prosseguir?
              </p>

              {/* 2 Opções de escolha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setMagiaFlow('avaliacao')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                    magiaFlow === 'avaliacao'
                      ? 'bg-white border-[#C082A0] shadow-sm ring-2 ring-[#C082A0]/20'
                      : 'bg-white/80 border-rose-200/70 hover:border-[#C082A0]/60'
                  }`}
                >
                  <span className="text-base shrink-0">🌙</span>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 leading-tight">
                      Quero fazer a consulta de avaliação
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      Recomendado • Análise energética prévia
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMagiaFlow('direta')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                    magiaFlow === 'direta'
                      ? 'bg-white border-[#C082A0] shadow-sm ring-2 ring-[#C082A0]/20'
                      : 'bg-white/80 border-rose-200/70 hover:border-[#C082A0]/60'
                  }`}
                >
                  <span className="text-base shrink-0">✨</span>
                  <div>
                    <div className="text-xs font-bold text-neutral-900 leading-tight">
                      Já sei qual magia quero
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      Escolher ritual diretamente
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* SE JÁ SABE QUAL QUER: Exibe subcategorias de Magia */}
            {magiaFlow === 'direta' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Selecione o tipo de magia:
                </label>
                <div className="space-y-2">
                  {magiaOptions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMagiaType(item.title)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        selectedMagiaType === item.title
                          ? 'border-[#C082A0] bg-rose-50/50 shadow-xs'
                          : 'border-neutral-200 hover:border-[#C082A0]/50 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base shrink-0">{item.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-neutral-900">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-neutral-500 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selectedMagiaType === item.title
                            ? 'border-[#C082A0] bg-[#C082A0] text-white'
                            : 'border-neutral-300'
                        }`}
                      >
                        {selectedMagiaType === item.title && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formulário comum de Magia (Avaliação ou Direta) */}
            {magiaFlow !== 'decision' && (
              <form onSubmit={handleMagiaSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Seu Nome Completo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Como prefere ser chamada(o)?"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#C082A0] focus:ring-1 focus:ring-[#C082A0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {magiaFlow === 'avaliacao'
                      ? 'Resumo do caso ou dúvida principal (opcional):'
                      : 'Intenção ou foco principal do ritual:'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Conte resumidamente seu objetivo ou situação..."
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#C082A0]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>
                    {magiaFlow === 'avaliacao'
                      ? 'Agendar Consulta de Avaliação'
                      : `Solicitar ${selectedMagiaType}`}
                  </span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. CATEGORIA: CONSULTAS                                        */}
        {/* ============================================================== */}
        {activeCategory === 'consultas' && (
          <form onSubmit={handleConsultaSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Selecione o tipo de Consulta:
              </label>
              <div className="space-y-2">
                {consultaOptions.map((item) => {
                  const isSelected = selectedConsulta === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedConsulta(item.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#C082A0] bg-rose-50/50 shadow-xs'
                          : 'border-neutral-200 hover:border-[#C082A0]/50 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base shrink-0">{item.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-neutral-900">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-neutral-500 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#C082A0] bg-[#C082A0] text-white'
                            : 'border-neutral-300'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-1 border-t border-neutral-100">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Seu Nome Completo:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Como prefere ser chamada(o)?"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#C082A0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Objetivo ou Dúvida (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Vida afetiva, decisão de trabalho..."
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#C082A0]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Confirmar Consulta no WhatsApp</span>
              </button>
            </div>
          </form>
        )}

        {/* ============================================================== */}
        {/* 3. CATEGORIA: MENTORIA DE BRUXARIA (Formulário)                 */}
        {/* ============================================================== */}
        {activeCategory === 'mentoria' && (
          <form onSubmit={handleMentoriaSubmit} className="space-y-4">
            <div className="bg-rose-50/50 border border-[#C082A0]/25 rounded-2xl p-4 text-center">
              <h4 className="font-playfair text-base font-bold text-[#1E1E1E] mb-1">
                Mentoria Individual de Bruxaria ✨
              </h4>
              <p className="text-xs text-neutral-600">
                Acompanhamento personalizado para o seu despertar mágico, práticas ritualísticas, consagração de instrumentos e oráculos.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Nome Completo:
              </label>
              <input
                type="text"
                required
                placeholder="Seu nome"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#C082A0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                WhatsApp com DDD:
              </label>
              <input
                type="tel"
                placeholder="(DDD) 99999-9999"
                value={mentoriaPhone}
                onChange={(e) => setMentoriaPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#C082A0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Nível de Experiência na Prática Mágica:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Iniciante (estou começando do zero)',
                  'Praticante (já realizo práticas básicas)',
                  'Intermediário / Avançado (aprofundamento)',
                ].map((level) => (
                  <div
                    key={level}
                    onClick={() => setMentoriaExperience(level)}
                    className={`px-3 py-2 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      mentoriaExperience === level
                        ? 'border-[#C082A0] bg-rose-50/60 font-semibold text-neutral-900'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <span>{level}</span>
                    {mentoriaExperience === level && (
                      <CheckIcon className="w-3.5 h-3.5 text-[#C082A0]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Áreas de Maior Interesse na Mentoria:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Ervas & Cristais',
                  'Velas & Fogo Mágico',
                  'Rituais & Feitiçaria',
                  'Divinação & Tarot',
                  'Conexão com Deidades',
                  'Proteção & Banimento',
                ].map((item) => {
                  const isChecked = mentoriaInterests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`px-2.5 py-2 rounded-xl border text-[11px] text-left transition-all cursor-pointer flex items-center gap-1.5 ${
                        isChecked
                          ? 'border-[#C082A0] bg-rose-50 text-neutral-900 font-medium'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <span className="text-xs">{isChecked ? '✓' : '•'}</span>
                      <span className="truncate">{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Qual o seu objetivo principal com a mentoria?
              </label>
              <textarea
                rows={2}
                placeholder="O que você mais deseja aprender ou transformar?"
                value={mentoriaGoal}
                onChange={(e) => setMentoriaGoal(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#C082A0]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Enviar Aplicação para a Mentoria</span>
            </button>
          </form>
        )}

        {/* ============================================================== */}
        {/* 4. CATEGORIA: EBOOKS (link configurável)                       */}
        {/* ============================================================== */}
        {activeCategory === 'ebooks' && (
          <div className="space-y-4">
            <div className="bg-rose-50/50 border border-[#C082A0]/25 rounded-2xl p-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-rose-100 flex items-center justify-center text-xl mx-auto mb-3">
                📚
              </div>
              <h4 className="font-playfair text-lg font-bold text-[#1E1E1E] mb-1">
                E-books & Grimórios Digitais
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
                Guias práticos, oráculos e rituais preparados pela Jess para você estudar e praticar em qualquer lugar.
              </p>
            </div>

            {/* Link dos Ebooks */}
            <div className="p-4 rounded-2xl border border-neutral-200/90 bg-neutral-50/60 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                <span>Catálogo de E-books</span>
                <span className="text-[10px] text-[#C082A0] font-bold">Link em Destaque</span>
              </div>

              {ebooksUrl ? (
                <a
                  href={ebooksUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#C082A0] hover:bg-[#B07290] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Acessar Página de E-books</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
                    📖 <strong className="text-neutral-800">Catálogo em fase final de lançamento:</strong> Caso queira a lista de e-books disponíveis ou reservar com valor exclusivo, chame a Jess no WhatsApp!
                  </div>

                  <button
                    type="button"
                    onClick={handleEbooksWhatsApp}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#C082A0] hover:bg-[#B07290] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Consultar E-books no WhatsApp</span>
                  </button>
                </div>
              )}
            </div>

            <p className="text-center text-[11px] text-neutral-400">
              Disponível em PDF com acesso imediato após a confirmação.
            </p>
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <span>Jess Cartomancia</span>
          <span>•</span>
          <span>Atendimento Humanizado</span>
        </div>
      </div>
    </div>
  );
};
