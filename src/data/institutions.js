// Instituições: Universidades moçambicanas e provedores online reconhecidos
export const MOZ_INSTITUTIONS = [
  // Universidades públicas e privadas (Mozambique)
  'Universidade Eduardo Mondlane (UEM)',
  'Universidade Pedagógica de Maputo (UP-Maputo)',
  'Universidade Pedagógica de Moçambique (UP)',
  'Universidade Lúrio (UniLúrio)',
  'Universidade Zambeze (UniZambeze)',
  'Universidade Rovuma (UniRovuma)',
  'Universidade Licungo (UniLicungo)',
  'Universidade Púnguè (UniPúnguè)',
  'Universidade Save (UniSave)',
  'Universidade Católica de Moçambique (UCM)',
  'Universidade São Tomás de Moçambique (USTM)',
  'A Politécnica (Universidade Politécnica)',
  'Universidade Mussa Bin Bique (UMB)',
  // Institutos e escolas superiores
  'ISCTEM (Instituto Superior de Ciências e Tecnologia de Moçambique)',
  'ISUTC (Instituto Superior de Transportes e Comunicações)',
  'ISCISA (Instituto Superior de Ciências de Saúde)',
  'ISRI (Instituto Superior de Relações Internacionais)'
];

export const ONLINE_PROVIDERS = [
  'Coursera','edX','Udacity','Udemy','Alison','FutureLearn','Khan Academy','Pluralsight','LinkedIn Learning','Codecademy','DataCamp','freeCodeCamp',
  'IBM SkillsBuild','Microsoft Learn','Google Digital Garage','Google Career Certificates','AWS Training and Certification','Harvard Online','MITx','Stanford Online'
];

export const INSTITUTION_SUGGESTIONS = Array.from(new Set([...MOZ_INSTITUTIONS, ...ONLINE_PROVIDERS]));

export default INSTITUTION_SUGGESTIONS;

