import courseMotoniveladora from '@/assets/course-motoniveladora.jpg';
import courseTratorAgricola from '@/assets/course-trator-agricola.jpg';

export interface CourseDetail {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  badges: string[];
  duration: string;
  modality: string;
  certification: string;
  validity: string;
  targetAudience: string;
  learningTopics: string[];
  requirements: string[];
  modules: { title: string; hours: string }[];
  faq: { question: string; answer: string }[];
}

export const coursesDetailData: Record<string, CourseDetail> = {
  'motoniveladora': {
    slug: 'motoniveladora',
    title: 'Capacitação para Operadores de Motoniveladoras',
    subtitle: 'Capacitar profissionais na operação segura de motoniveladoras, abordando conceitos técnicos, normas de segurança, manutenção e técnicas operacionais recomendadas pelos fabricantes e pelas Normas Regulamentadoras (NRs) do Ministério do Trabalho.',
    image: courseMotoniveladora,
    badges: ['Curso obrigatório', 'Presencial'],
    duration: '20 horas',
    modality: 'Presencial',
    certification: 'Atestado de participação + Carteirinha válida por 1 ano',
    validity: '1 ano',
    targetAudience: 'Operadores de motoniveladoras e profissionais envolvidos na operação, manutenção, transporte e movimentação desses equipamentos.',
    learningTopics: [
      'Legislação aplicável e regulamentos de referência',
      'Definição e classificação das motoniveladoras',
      'Conjuntos e componentes das motoniveladoras',
      'Riscos e medidas preventivas no uso do equipamento',
      'Procedimentos operacionais e normas de segurança',
      'Introdução à terraplanagem aplicada',
      'Trabalho em solos instáveis e lama',
      'Inspeção preliminar (Checklist) e manutenção aplicada',
    ],
    requirements: [
      'Idade mínima: 18 anos',
      'CNH categorias B, C, D ou E',
      'Ensino fundamental completo',
    ],
    modules: [
      { title: 'Teoria – Legislação e Normas', hours: '8h' },
      { title: 'Teoria – Equipamentos e Segurança', hours: '6h' },
      { title: 'Prática – Inspeção e Operação', hours: '6h' },
    ],
    faq: [
      {
        question: 'Qual o prazo de conclusão do curso?',
        answer: 'O curso deve ser concluído em até 30 dias após a matrícula. As aulas são agendadas conforme disponibilidade do aluno e do instrutor.',
      },
      {
        question: 'Como funciona o acesso às aulas?',
        answer: 'As aulas teóricas podem ser realizadas online ou presencialmente. As aulas práticas são exclusivamente presenciais, em campo de treinamento autorizado.',
      },
      {
        question: 'Como faço para emitir o certificado?',
        answer: 'Após a conclusão de todas as etapas do curso (teórica e prática), o certificado e a carteirinha são emitidos automaticamente em até 5 dias úteis.',
      },
      {
        question: 'O suporte está disponível durante todo o curso?',
        answer: 'Sim! Nosso suporte via WhatsApp está disponível durante todo o período do curso para tirar dúvidas e auxiliar no que for necessário.',
      },
    ],
  },
  'trator-agricola': {
    slug: 'trator-agricola',
    title: 'Treinamento de Operação de Trator Agrícola',
    subtitle: 'Treinar para a operação segura de trator agrícola, relacionando as principais atividades desenvolvidas pelo profissional com as técnicas de operação adequadas conforme Normas Regulamentadoras 11, 12 e 31.',
    image: courseTratorAgricola,
    badges: ['Curso obrigatório', 'Presencial'],
    duration: '24 horas',
    modality: 'Presencial',
    certification: 'Certificado de conclusão',
    validity: '2 anos',
    targetAudience: 'Operadores de tratores agrícolas e profissionais do setor agrícola.',
    learningTopics: [
      'Legislação de segurança e saúde no trabalho (NR 11, NR 12, NR 31)',
      'Tipos de tratores agrícolas e componentes',
      'Componentes de segurança dos tratores agrícolas',
      'Características e competências do operador',
      'Planejamento e conceitos de operação',
      'Riscos ambientais na operação',
      'Técnicas de operação e sinalização de segurança',
      'Procedimentos de emergência e primeiros socorros',
    ],
    requirements: [
      'Idade mínima: 18 anos',
      'Habilitação compatível',
    ],
    modules: [
      { title: 'Legislação e Normas', hours: '4h' },
      { title: 'Tipos e Componentes', hours: '4h' },
      { title: 'Segurança e Riscos', hours: '6h' },
      { title: 'Técnicas de Operação', hours: '6h' },
      { title: 'Prática Supervisionada', hours: '4h' },
    ],
    faq: [
      {
        question: 'Qual o prazo de conclusão do curso?',
        answer: 'O curso deve ser concluído em até 30 dias após a matrícula. As aulas são agendadas conforme disponibilidade do aluno e do instrutor.',
      },
      {
        question: 'Como funciona o acesso às aulas?',
        answer: 'As aulas teóricas podem ser realizadas online ou presencialmente. As aulas práticas são exclusivamente presenciais, em campo de treinamento autorizado.',
      },
      {
        question: 'Como faço para emitir o certificado?',
        answer: 'Após a conclusão de todas as etapas do curso (teórica e prática), o certificado é emitido automaticamente em até 5 dias úteis.',
      },
      {
        question: 'O suporte está disponível durante todo o curso?',
        answer: 'Sim! Nosso suporte via WhatsApp está disponível durante todo o período do curso para tirar dúvidas e auxiliar no que for necessário.',
      },
    ],
  },
};
