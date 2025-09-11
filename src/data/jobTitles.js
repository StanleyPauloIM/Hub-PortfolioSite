// Ampla lista de títulos/profissões (PT e EN)
// Inclui engenheiros, gestores, médicos e várias áreas.
export const JOB_TITLES = [
  // Engenharia de Software / TI
  'Engenheiro de Software', 'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Web Developer',
  'Mobile Developer', 'iOS Developer', 'Android Developer', 'DevOps Engineer', 'Site Reliability Engineer', 'SRE', 'Data Engineer',
  'Data Scientist', 'Cientista de Dados', 'Engenheiro de Dados', 'Machine Learning Engineer', 'AI Engineer', 'Cloud Engineer',
  'Cloud Architect', 'Solutions Architect', 'Security Engineer', 'Engenheiro de Segurança', 'Cybersecurity Analyst', 'Analista de Cibersegurança',
  'QA Engineer', 'Test Automation Engineer', 'QA Analyst', 'UI/UX Designer', 'Product Designer', 'UX Researcher', 'Interaction Designer',
  'Graphic Designer', 'Motion Designer', 'Game Developer', 'Game Designer', 'AR/VR Developer', 'Database Administrator', 'DBA',
  'Systems Administrator', 'Network Engineer', 'IT Support Specialist', 'IT Manager', 'IT Director', 'CTO', 'CIO',

  // Outras Engenharias
  'Engenheiro Civil', 'Civil Engineer', 'Engenheiro Mecânico', 'Mechanical Engineer', 'Engenheiro Eletrotécnico', 'Electrical Engineer',
  'Engenheiro Eletrónico', 'Electronics Engineer', 'Engenheiro de Mecatrónica', 'Mechatronics Engineer', 'Engenheiro Industrial', 'Industrial Engineer',
  'Engenheiro Químico', 'Chemical Engineer', 'Engenheiro de Petróleo', 'Petroleum Engineer', 'Engenheiro de Minas', 'Mining Engineer',
  'Engenheiro Ambiental', 'Environmental Engineer', 'Engenheiro Biomédico', 'Biomedical Engineer', 'Engenheiro Agrónomo', 'Agricultural Engineer',
  'Engenheiro de Materiais', 'Materials Engineer', 'Engenheiro Nuclear', 'Nuclear Engineer',

  // Gestão / Liderança
  'Gestor de Projetos', 'Project Manager', 'Gestor de Programa', 'Program Manager', 'Gestor de Produto', 'Product Manager',
  'Product Owner', 'Scrum Master', 'Agile Coach', 'Engineering Manager', 'Technical Lead', 'Team Lead',
  'Operations Manager', 'Diretor de Operações', 'General Manager', 'Business Development Manager', 'Sales Manager', 'Marketing Manager',
  'Growth Manager', 'Community Manager', 'Office Manager', 'HR Manager', 'Gestor de Recursos Humanos', 'Talent Acquisition Specialist',
  'Recruitment Consultant', 'Finance Manager', 'Accounting Manager', 'Risk Manager', 'Compliance Manager', 'Legal Counsel',
  'Procurement Manager', 'Supply Chain Manager', 'Logistics Manager', 'Customer Success Manager', 'Support Manager',

  // Saúde
  'Médico', 'Medical Doctor', 'Clínico Geral', 'General Practitioner', 'Family Physician', 'Pediatra', 'Pediatrician', 'Cardiologista', 'Cardiologist',
  'Neurologista', 'Neurologist', 'Dermatologista', 'Dermatologist', 'Psiquiatra', 'Psychiatrist', 'Cirurgião', 'Surgeon',
  'Ortopedista', 'Orthopedic Surgeon', 'Anestesiologista', 'Anesthesiologist', 'Radiologista', 'Radiologist', 'Oncologista', 'Oncologist',
  'Obstetra/Ginecologista', 'OB-GYN', 'Oftalmologista', 'Ophthalmologist', 'Otorrinolaringologista', 'ENT Specialist', 'Dentista', 'Dental Surgeon',
  'Farmacêutico', 'Pharmacist', 'Enfermeiro', 'Registered Nurse', 'Nurse Practitioner', 'Fisioterapeuta', 'Physiotherapist',
  'Terapeuta Ocupacional', 'Occupational Therapist', 'Nutricionista', 'Dietitian', 'Psicólogo', 'Psychologist',
  'Técnico de Laboratório', 'Medical Laboratory Scientist', 'Radiologic Technologist',

  // Educação & Pesquisa
  'Professor', 'Teacher', 'Lecturer', 'Assistente de Ensino', 'Teaching Assistant', 'Investigador', 'Researcher',
  'School Counselor', 'Diretor', 'Principal', 'Dean', 'Education Coordinator', 'Instructional Designer', 'Curriculum Developer',

  // Negócios e Análise
  'Empreendedor', 'Entrepreneur', 'Founder', 'Co-Founder', 'CEO', 'COO', 'CFO', 'CMO', 'CSO', 'CPO', 'CAO',
  'Product Marketing Manager', 'Brand Manager', 'Content Manager', 'Social Media Manager', 'Digital Marketing Specialist',
  'Especialista de Marketing Digital', 'SEO Specialist', 'SEM Specialist', 'Data Analyst', 'Analista de Dados', 'Business Analyst', 'Analista de Negócios',
  'Financial Analyst', 'Investment Analyst', 'Analista Financeiro',

  // Direito, Arquitetura, Comunicação
  'Advogado', 'Lawyer', 'Attorney', 'Paralegal', 'Arquitet[o/a]', 'Architect', 'Urbanista', 'Urban Planner',
  'Agente Imobiliário', 'Real Estate Agent', 'Jornalista', 'Journalist', 'Editor', 'Copywriter', 'Tradutor', 'Translator', 'Intérprete', 'Interpreter',
  'Fotógrafo', 'Photographer', 'Videógrafo', 'Videographer', 'Realizador', 'Film Director', 'Produtor', 'Producer', 'Músico', 'Musician', 'Engenheiro de Som', 'Sound Engineer',

  // Serviços & Oficios
  'Chefe de Cozinha', 'Chef', 'Cozinheiro', 'Cook', 'Padeiro', 'Baker', 'Barista', 'Barman', 'Bartender', 'Empregado de Mesa', 'Waiter',
  'Motorista', 'Driver', 'Piloto', 'Pilot', 'Assistente de Voo', 'Flight Attendant', 'Mecânico', 'Mechanic', 'Eletricista', 'Electrician',
  'Canalizador', 'Plumber', 'Carpinteiro', 'Carpenter', 'Soldador', 'Welder', 'Alfaiate', 'Tailor', 'Designer de Moda', 'Fashion Designer',
  'Cabeleireiro', 'Hair Stylist', 'Esteticista', 'Beauty Therapist', 'Segurança', 'Security Guard', 'Polícia', 'Police Officer', 'Bombeiro', 'Firefighter',
  'Soldado', 'Soldier', 'Fuzileiro', 'Marine',

  // Outras funções comuns em tecnologia
  'No-Code Developer', 'Low-Code Developer', 'RPA Developer', 'Growth Hacker', 'DevRel', 'Developer Advocate', 'Community Lead',
  'Content Strategist', 'Tech Writer', 'Analista de Suporte', 'Suporte Técnico', 'Customer Support Specialist', 'Account Manager',
];
