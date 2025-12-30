import React from 'react';
import { Building2, Database, Cloud, RefreshCw, FolderOpen, Wrench, GraduationCap, ArrowDownToLine, Binary, LineChart, Zap, ShieldCheck, FileCheck, Search, Lightbulb, Book, ListOrdered, CalendarClock, Server } from 'lucide-react';
import { DiagramNode, Arrow, Layer, BenefitCard } from './Diagram';
import { SlideContentProps } from '../types';

// Helper for consistency
const SlideContainer: React.FC<{ children: React.ReactNode; title: string; subtitle: string }> = ({ children, title, subtitle }) => (
  <div className="flex flex-col h-full min-h-0">
    <div className="text-center mb-6 sm:mb-10 shrink-0">
      <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-2 sm:mb-3">{title}</h1>
      <p className="text-slate-500 text-sm sm:text-lg">{subtitle}</p>
    </div>
    <div className="flex-1 overflow-y-auto px-2 sm:px-4 pb-4 custom-scrollbar min-h-0">
      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  </div>
);

// Slide 1: Ingestão
export const IngestionSlide: React.FC<SlideContentProps> = () => {
  return (
    <SlideContainer title="📊 1. Ingestão de Dados" subtitle="Consolidação de múltiplas fontes de dados">
      {/* Architecture */}
      <div className="mb-8 sm:mb-12">
        <Layer className="mb-2">
          <DiagramNode variant="external" icon={<Building2 />} title="ERP Protheus" subtitle="Dados transacionais" />
          <DiagramNode variant="external" icon={<Database />} title="SQL Server" subtitle="Banco relacional" />
          <DiagramNode variant="external" icon={<Cloud />} title="Salesforce" subtitle="CRM & Vendas" />
        </Layer>

        <Arrow label="Ingestão automatizada" />

        <Layer>
          <DiagramNode variant="dms" icon={<RefreshCw />} title="AWS DMS / Glue" subtitle="Orquestração de dados" />
        </Layer>

        <Arrow label="Armazena dados brutos" />

        <Layer>
          <DiagramNode variant="s3" icon={<FolderOpen />} title="S3 Bucket" subtitle="/raw" />
        </Layer>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <BenefitCard icon={<Zap />} title="Conectividade Universal" text="Integra qualquer fonte de dados sem código customizado complexo." />
        <BenefitCard icon={<ShieldCheck />} title="Dados Seguros" text="Criptografia em repouso e em trânsito com padrões AWS." />
        <BenefitCard icon={<ArrowDownToLine />} title="Processamento Rápido" text="Ingestão paralela de múltiplas fontes simultaneamente." />
      </div>
    </SlideContainer>
  );
};

// Slide 2: Processamento
export const ProcessingSlide: React.FC<SlideContentProps> = () => {
  return (
    <SlideContainer title="⚙️ 2. Processamento de Dados" subtitle="Limpeza e preparação para ML">
      <div className="mb-8 sm:mb-12">
        <Layer>
          <DiagramNode variant="s3" icon={<FolderOpen />} title="S3 Bucket" subtitle="/raw" />
        </Layer>

        <Arrow label="Limpeza e preparação" />

        <Layer>
          <DiagramNode variant="sagemaker" icon={<Wrench />} title="SageMaker Processing" subtitle="ETL e Feature Engineering" />
        </Layer>

        <Arrow label="Dados prontos" />

        <Layer>
          <DiagramNode variant="s3" icon={<FileCheck />} title="S3 Bucket" subtitle="/processed" />
        </Layer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <BenefitCard icon={<Binary />} title="Qualidade de Dados" text="Tratamento automatizado de nulos, outliers e inconsistências." />
        <BenefitCard icon={<LineChart />} title="Feature Engineering" text="Criação de variáveis otimizadas para performance do modelo." />
        <BenefitCard icon={<RefreshCw />} title="Reusabilidade" text="Pipeline modular reutilizável para novos conjuntos de dados." />
      </div>
    </SlideContainer>
  );
};

// Slide 3: Treinamento
export const TrainingSlide: React.FC<SlideContentProps> = () => {
  return (
    <SlideContainer title="🤖 3. Treinamento do Modelo" subtitle="Batch agendado com otimização de custos">
      <div className="mb-8 sm:mb-12">
        <Layer>
          <DiagramNode variant="s3" icon={<FileCheck />} title="S3 Bucket" subtitle="/processed" />
        </Layer>

        <Arrow label="Lê dados processados" />

        <Layer>
          <DiagramNode variant="sagemaker" icon={<GraduationCap />} title="SageMaker Training" subtitle="Batch Agendado (Semanal)" />
        </Layer>

        <Arrow label="Armazena artefato" />

        <Layer>
          <DiagramNode variant="s3" icon={<Database />} title="S3 Bucket" subtitle="/models" />
        </Layer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <BenefitCard icon={<Zap />} title="95% Redução de Custo" text="Instâncias Spot e pagamento apenas durante os minutos de execução." />
        <BenefitCard icon={<RefreshCw />} title="Versionamento" text="Registro completo de experimentos e modelos no Model Registry." />
        <BenefitCard icon={<Wrench />} title="Automação Total" text="Zero intervenção manual, execução disparada por EventBridge." />
      </div>
    </SlideContainer>
  );
};

// Slide 4: Inferência
export const InferenceSlide: React.FC<SlideContentProps> = () => {
  return (
    <SlideContainer title="🎯 4. Geração de Previsões" subtitle="Inferência sob demanda ou agendada">
      <div className="mb-8 sm:mb-8">
        <Layer>
          <DiagramNode variant="external" icon={<ArrowDownToLine />} title="Novos Dados" subtitle="Entrada para previsão" />
        </Layer>
        
        <Arrow />

        <Layer>
          <DiagramNode variant="s3" icon={<FolderOpen />} title="S3 Bucket" subtitle="/inputs" />
        </Layer>

        <Arrow label="Batch Transform" />

        <Layer>
          <DiagramNode variant="sagemaker" icon={<Lightbulb />} title="SageMaker Batch" subtitle="Inferência em lote" />
        </Layer>

        <Arrow label="Resultados" />

        <Layer>
          <DiagramNode variant="s3" icon={<Database />} title="S3 Bucket" subtitle="/predictions" />
        </Layer>

        <Arrow label="Visualização" />

        <Layer>
          <DiagramNode variant="athena" icon={<LineChart />} title="Athena + Tableau" subtitle="Visualização e BI" />
        </Layer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <BenefitCard icon={<Zap />} title="Flexibilidade" text="Escalabilidade automática para processar milhões de registros." />
        <BenefitCard icon={<Search />} title="Insights Acionáveis" text="Integração nativa com ferramentas de BI para decisão rápida." />
        <BenefitCard icon={<ShieldCheck />} title="Governança" text="Rastreabilidade completa desde o dado bruto até a decisão." />
      </div>
    </SlideContainer>
  );
};

// Slide 5: Dicionário de Serviços
export const DictionarySlide: React.FC<SlideContentProps> = () => {
  const ServiceCard = ({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) => (
    <div className={`flex flex-col p-4 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-shadow duration-300 border-l-4 ${color}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl">{icon}</div>
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );

  return (
    <SlideContainer title="📚 Dicionário de Serviços AWS" subtitle="Definição e propósito de cada componente">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ServiceCard 
          icon={<Cloud color="#FF9900" />} 
          title="Amazon SageMaker" 
          desc="Plataforma completa de Machine Learning. Utilizamos os módulos 'Processing' para limpeza, 'Training' para criar modelos e 'Batch Transform' para gerar previsões em massa."
          color="border-l-[#FF9900]"
        />
        <ServiceCard 
          icon={<FolderOpen color="#1e3a8a" />} 
          title="Amazon S3" 
          desc="Serviço de armazenamento de objetos altamente escalável. Funciona como nosso Data Lake, armazenando dados brutos (/raw), processados (/processed) e modelos treinados (/models)."
          color="border-l-[#1e3a8a]"
        />
        <ServiceCard 
          icon={<RefreshCw color="#334155" />} 
          title="AWS DMS" 
          desc="Database Migration Service. Ferramenta que conecta nos bancos de dados de origem (ERP, SQL Server) e replica as alterações continuamente para o Data Lake."
          color="border-l-[#334155]"
        />
        <ServiceCard 
          icon={<Server color="#334155" />} 
          title="AWS Glue" 
          desc="Serviço de integração de dados serverless. Utilizado para catalogar os dados no S3 e executar tarefas leves de transformação (ETL) antes do processamento pesado."
          color="border-l-[#334155]"
        />
        <ServiceCard 
          icon={<Search color="#059669" />} 
          title="Amazon Athena" 
          desc="Serviço de consultas interativas. Permite usar SQL padrão para analisar dados diretamente no S3, servindo como a camada de conexão para ferramentas de BI."
          color="border-l-[#059669]"
        />
        <ServiceCard 
          icon={<CalendarClock color="#db2777" />} 
          title="Amazon EventBridge" 
          desc="Barramento de eventos serverless. Responsável pela orquestração e agendamento, disparando os jobs de treinamento e inferência semanalmente ou sob demanda."
          color="border-l-[#db2777]"
        />
      </div>
    </SlideContainer>
  );
};

// Slide 6: Fluxo Detalhado
export const FlowSlide: React.FC<SlideContentProps> = () => {
  const Step = ({ number, title, text }: { number: string, title: string, text: string }) => (
    <div className="flex gap-4 relative">
      {/* Line connector */}
      <div className="absolute left-[15px] top-8 bottom-[-16px] w-0.5 bg-slate-200 last:hidden"></div>
      
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF9900] text-white flex items-center justify-center font-bold shadow-md z-10">
        {number}
      </div>
      <div className="pb-6">
        <h3 className="font-bold text-lg text-slate-800 mb-1">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{text}</p>
      </div>
    </div>
  );

  return (
    <SlideContainer title="📝 Fluxo Passo a Passo" subtitle="Detalhamento completo do ciclo de vida do pipeline">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-3xl mx-auto">
        <Step 
          number="1" 
          title="Extração e Ingestão" 
          text="O AWS DMS monitora transações em tempo real no ERP Protheus e SQL Server, replicando novos dados para a camada 'Raw' do S3. O Glue executa crawlers para catalogar esses dados."
        />
        <Step 
          number="2" 
          title="Pré-processamento (ETL)" 
          text="Um job do SageMaker Processing é disparado. Ele lê os dados crus do S3, remove duplicatas, trata valores nulos e cria novas features estatísticas, salvando o resultado na camada 'Processed'."
        />
        <Step 
          number="3" 
          title="Treinamento do Modelo" 
          text="Semanalmente, o EventBridge dispara um SageMaker Training Job. Este utiliza os dados processados para treinar o algoritmo (ex: XGBoost), gerando um artefato de modelo versionado no S3."
        />
        <Step 
          number="4" 
          title="Inferência (Previsão)" 
          text="Novos dados de entrada chegam. O SageMaker Batch Transform carrega o modelo mais recente treinado e processa esses dados em lote, gerando previsões de vendas/demanda."
        />
        <Step 
          number="5" 
          title="Consumo e Análise" 
          text="As previsões são salvas no S3 e mapeadas pelo Athena. O Tableau conecta no Athena via JDBC, atualizando dashboards executivos com os novos insights gerados."
        />
      </div>
    </SlideContainer>
  );
};