/* ============================================================
   PL101 Revise — lesson content
   Weeks 1-7, built from the course lecture slides and readings.
   Shape is different from the CS160 site on purpose: theorist
   claims, True/False + written explanation, and an essay-
   answer scaffold, not definition/algorithm flashcards.
   ============================================================ */

const WEEKS = [
  {
    "id": "w1",
    "week": 1,
    "title": "Introduction: What is Development?",
    "summary": "Week 1 is the course's orientation lecture rather than a content-heavy week: it lays out the guiding questions that the rest of PL101 will return to, including what explains inequality between and within states, how colonialism and decolonisation shaped development, whose development counts, which development models exist and whether they have worked, and whether aid actually helps. The learning outcomes frame development explicitly as a contested concept that must be explained, differentiated across competing theories, analysed against real challenges (especially in the Pacific), and evaluated with attention to politics and governance rather than treated as a purely technical or economic process. The lecture also sets administrative groundwork (readings policy, assessment structure, tutorial requirements) and closes by previewing Week 2's actual starting question - whether development has a single meaning - via the assigned first reading, Gilbert Rist's History of Development. In short, Week 1 does not yet answer 'what is development?'; it establishes that the question is contested and hands the substantive work of answering it to the following week's material.",
    "concepts": [
      {
        "term": "Development (as a contested concept)",
        "def": "The central object of the course, introduced not as a settled technical term but as a concept whose meaning is disputed and must be explained and justified.",
        "ex": "The first course learning outcome is to 'explain the concept of development, and why it is contested,' and Week 2 opens by directly asking whether we have a single meaning of development."
      },
      {
        "term": "Underdevelopment",
        "def": "The paired/opposite concept to development, used in the course to prompt students to think about what a lack of development looks like, not just what development is.",
        "ex": "Assignment 1 (the photo essay) explicitly asks students to illustrate both 'What is development?' and 'What is underdevelopment?' through two photographs with short explanations."
      },
      {
        "term": "Politics of Development",
        "def": "The course's organising framework: the claim that development is not a neutral, technical process but a political one, shaped by questions of who benefits, who decides, and how.",
        "ex": "The guiding questions include: who should 'do' development, who should benefit from it, and how can the benefits of development be evenly distributed?"
      },
      {
        "term": "Development models / development theories",
        "def": "Competing frameworks that offer different explanations of, and policy prescriptions for, achieving development.",
        "ex": "CLO2 requires students to 'differentiate between different development theories and their policy prescriptions with examples'; the guiding questions ask what the different development models are and whether they have worked."
      },
      {
        "term": "Modernization paradigm",
        "def": "One specific development model, named in the course's topic list as equating development with economic growth.",
        "ex": "Listed as the Week 5 topic: 'Development as economic growth: modernization paradigm.'"
      },
      {
        "term": "Dependency / politics of foreign aid",
        "def": "A development framework concerned with how aid relationships can perpetuate dependency between donor and recipient states rather than resolving underdevelopment.",
        "ex": "Listed as the Week 6 topic: 'Continuing dependencies: politics of foreign aid,' and echoed in the guiding question 'Is development aid making a difference? To whom? How?'"
      },
      {
        "term": "Colonialism and decolonisation",
        "def": "Historical processes identified in the course as having shaped the very concepts and practices used to talk about development today.",
        "ex": "One of the course's core guiding questions is 'How colonialism and decolonisation shaped the concepts and practices of development?'; Week 3 is dedicated to 'Colonialism and colonial mindsets.'"
      },
      {
        "term": "Governance",
        "def": "The quality and structure of political institutions and decision-making, identified as central to explaining why some development efforts succeed and others fail.",
        "ex": "CLO4 requires students to evaluate development successes and failures 'focusing on the centrality of politics and governance in these examples.'"
      },
      {
        "term": "Global South / Pacific voices",
        "def": "A term used in the course to describe the perspective and authorship the readings deliberately prioritise, as opposed to relying solely on mainstream Western development literature.",
        "ex": "The readings slide states required and supplementary readings include 'Pacific voices, critical views, authors from the Global South.'"
      },
      {
        "term": "Militarism, security and world politics (as development factors)",
        "def": "Non-economic, geopolitical forces the course treats as shaping development outcomes alongside economic and colonial factors.",
        "ex": "One guiding question asks 'What impacts have militarism, security and world politics had on development?'"
      }
    ],
    "theorists": [
      {
        "name": "Rist",
        "work": "The History of Development: From Western Origins to Global Faith (1997), Ch. 1, pp. 8-24",
        "claim": "Rist's assigned reading is framed, by its own title, around tracing development from its Western origins to its status as a near-universal ('global faith') belief system, rather than treating it as a neutral or self-evident concept.",
        "detail": "This is the first required reading of the course, set for Week 2, and previewed at the very end of the Week 1 slides directly under the heading 'First required reading.' It is assigned to open Week 2's topic questions: whether development has a single meaning and how development relates to poverty. Beyond the title and chapter/page range given (Ch. 1, pp. 8-24), the Week 1 lecture itself does not elaborate Rist's specific arguments - those are left for the Week 2 material."
      }
    ],
    "tf": [
      {
        "id": "q1",
        "q": "True or false: The Week 1 lecture presents development as a single, uncontested concept with one agreed meaning.",
        "answer": false,
        "explanation": "False. The first course learning outcome is explicitly to 'explain the concept of development, and why it is contested' - the course treats contestation over meaning as a starting premise, not something to be resolved by assertion. This is reinforced by the fact that Week 2's first topic opens with the question 'Do we have a single meaning of development?' rather than supplying a definition outright. So the lecture deliberately withholds a settled definition in Week 1 and frames the concept as disputed terrain to be worked through across the course."
      },
      {
        "id": "q2",
        "q": "True or false: One of the course's core guiding questions concerns how colonialism and decolonisation shaped the concepts and practices of development.",
        "answer": true,
        "explanation": "True. The 'Politics of Development?' slide lists as a guiding question: 'How colonialism and decolonisation shaped the concepts and practices of development?' This signals that the course does not treat development as a historically neutral, purely economic idea, but as something produced through the colonial encounter and its aftermath. It is reinforced later in the syllabus by Week 3 being dedicated specifically to 'Colonialism and colonial mindsets.'"
      },
      {
        "id": "q3",
        "q": "True or false: Assignment 1, the photo essay, asks students to illustrate both 'what is development' and 'what is underdevelopment' through photographs.",
        "answer": true,
        "explanation": "True. The assessment portfolio slide describes Assignment 1 as a photo essay worth 10%, due Week 5, requiring two photos with a 200-word explanation each (400 words total), explicitly built around the prompts 'What is development? What is underdevelopment?' This pairs the two concepts directly, asking students to visually and textually define both a positive and a negative state rather than development alone."
      },
      {
        "id": "q4",
        "q": "True or false: The mid-semester test covers lectures and readings from Weeks 1 through 13.",
        "answer": false,
        "explanation": "False. The assessment slide states the mid-semester test (Assignment 2, 15%, Week 8) is 'On required readings and lectures weeks 1-7,' not weeks 1-13. This matters practically: weeks 8 onward (e.g. gendered underdevelopment, governance in the Global South, resources and migration) are covered only by the final exam, not the MST, so revision for the MST should be scoped to the first seven weeks."
      },
      {
        "id": "q5",
        "q": "True or false: The course readings are drawn exclusively from mainstream Western development economists, with no Pacific or Global South authors.",
        "answer": false,
        "explanation": "False. The readings slide explicitly states that required and supplementary readings include 'Pacific voices, critical views, authors from the Global South,' alongside articles and book chapters more broadly. This is a deliberate curatorial choice signalled in Week 1, meant to counterbalance a purely Western/mainstream framing of development with critical and regionally grounded perspectives, consistent with the course's own guiding question of 'whose development are we talking about?'"
      },
      {
        "id": "q6",
        "q": "True or false: The first required reading assigned in the course is Gilbert Rist's The History of Development, Chapter 1.",
        "answer": true,
        "explanation": "True. The final slides of the Week 1 deck, under 'Week 2 / First required reading,' name Gilbert Rist (1997), The History of Development - from Western Origins to Global Faith, Zed Books, Chapter 1, pages 8-24, as the reading tied to Week 2's opening question of whether development has a single meaning. It is the first named academic source in the course materials."
      },
      {
        "id": "q7",
        "q": "True or false: One of the course's guiding questions asks whether development aid is making a difference, and to whom.",
        "answer": true,
        "explanation": "True. The 'Politics of Development?' slide lists the question 'Is development aid making a difference? To whom? How?' as one of the questions the course sets out to answer. This foreshadows Week 6's dedicated topic, 'Continuing dependencies: politics of foreign aid,' which returns to this same question in more depth."
      },
      {
        "id": "q8",
        "q": "True or false: According to the Week 1 topic list, Week 5 covers development as economic growth under the modernization paradigm.",
        "answer": true,
        "explanation": "True. The Topics table lists Week 5 as 'Development as economic growth: modernization paradigm.' This places modernization theory - which equates development with economic growth - as the first specific development model examined in depth after the introductory weeks on poverty, inequality and colonialism."
      },
      {
        "id": "q9",
        "q": "True or false: Tutorial attendance is optional and unmonitored for face-to-face students in this course.",
        "answer": false,
        "explanation": "False. The course requirements slide states tutorial attendance is 'mandatory for F2F students - minimum 60%,' while only online tutorial attendance is described as 'voluntary but strongly recommended.' There is also an extra-credit incentive (attending at least 8 of 11 tutorials earns 5%), underscoring that attendance is actively tracked rather than optional for on-campus students."
      },
      {
        "id": "q10",
        "q": "True or false: The final exam is open-book, and attendance at it is optional as long as coursework is completed.",
        "answer": false,
        "explanation": "False. The assessment portfolio slide describes the final exam (50% of the grade) as 'Closed book' with 'Attendance mandatory to pass the course.' This means even a student with strong coursework marks cannot pass PL101 without sitting the exam, and they cannot rely on notes or texts during it."
      },
      {
        "id": "q11",
        "q": "True or false: One of the course's guiding questions is how the benefits of development can be more evenly distributed to create a more equitable world.",
        "answer": true,
        "explanation": "True. The 'Politics of Development?' slide closes with the questions 'How can we create a more equitable world? How can the benefits of development be evenly distributed?' This positions equity of outcomes, not just aggregate growth, as one of the normative concerns threading through the course."
      }
    ]
  },
  {
    "id": "w2",
    "week": 2,
    "title": "Poverty and Global Inequalities",
    "summary": "This week pushes back on the idea that 'development' and 'poverty' are self-evident terms: both are contested, historically recent constructs rather than neutral descriptions of the world. Development emerges as a political idea only after 1945 (Truman's Point Four speech, the UN Charter, the UDHR), and thinkers like Rist treat it as closer to a modern belief system than a settled science. Poverty is equally slippery — it can be measured narrowly as income below a poverty line ($1.90, $3.20 etc. a day) or more broadly via relative deprivation, social exclusion, or Sen's capability approach, and each measure tells a different story about who counts as poor. Sitting alongside this is the question of inequality: Oxfam and Hickel both argue that the gap between rich and poor is not just a leftover problem being slowly solved, but an actively produced and in some respects worsening feature of the global economy. The throughline is that how you define and measure poverty and development is itself a political choice with consequences for what counts as progress.",
    "concepts": [
      {
        "term": "Development (as a contested concept)",
        "def": "A term with no single agreed meaning, used variously to describe a long-term process of structural societal transformation, a short-to-medium term outcome of desirable targets (e.g. SDGs), or a dominant Western discourse/ideology of modernity.",
        "ex": "The lecture presents these three senses as overlapping but distinct; Rist argues the disagreement is not incidental but reveals development's character as a belief rather than a neutral description."
      },
      {
        "term": "Third World / Global South",
        "def": "'Third World' originally denoted the group of newly independent, non-aligned states that rejected both the capitalist 'first world' and communist 'second world' during the Cold War; it was a political/ideological label, not merely a geographic or income category.",
        "ex": "As the Cold War ended and countries like China and the 'Asian Tigers' industrialised, the term lost coherence, and 'Global South' or 'developing countries' became more common substitutes, though these too are contested."
      },
      {
        "term": "Absolute poverty",
        "def": "Poverty defined by a fixed, universal threshold of resources or income needed for physical survival, independent of what others in a given society have.",
        "ex": "The World Bank's international poverty lines ($1.90, $2.15, $3.20 etc. a day) are the standard operational measure of absolute poverty."
      },
      {
        "term": "Relative poverty",
        "def": "Poverty defined in relation to the standard of living customary in a particular society; a person is poor if they lack the resources to participate in the ordinary activities, diets and living conditions widely approved of in their community (Townsend).",
        "ex": "The World Bank uses $14.40/day (1985 PPP) as a relative poverty line for industrialised countries, reflecting the higher cost of 'ordinary living' there compared with the $1-a-day line used globally."
      },
      {
        "term": "Poverty line",
        "def": "A set income or consumption threshold below which a person or household is classified as poor; the most common international versions are the World Bank's $-a-day lines (historically $1, $1.25, $1.90; more recently $2.15, $3.65, $6.85 etc.).",
        "ex": "The lecture shows Pacific poverty data using the $1.90 and $5.50/day thresholds, with countries like Timor-Leste and Solomon Islands showing very high shares of the population below $5.50/day."
      },
      {
        "term": "Human Development Index (HDI)",
        "def": "A composite UNDP measure of development combining life expectancy at birth, educational attainment (schooling), and GNI/GDP per capita, designed to go beyond income alone.",
        "ex": "The lecture ranks Pacific states by HDI (e.g. Australia and New Zealand as 'very high human development', PNG and Solomon Islands as 'medium'), illustrating that income rankings and HDI rankings don't always align."
      },
      {
        "term": "GNP/GDP per capita",
        "def": "Standard economic measures of a country's average income or output; GNP includes income earned by residents abroad, GDP measures output produced within a country's borders. Both are averages and say nothing about how income is distributed.",
        "ex": "Alan Thomas notes that GNP per capita can rise (suggesting 'development') even while inequality and the position of the poorest worsens, because it is an average that hides distribution."
      },
      {
        "term": "Gini coefficient",
        "def": "A statistical measure of income or wealth inequality within a population, ranging from 0 (perfect equality) to 1 or 100 (perfect inequality) — it measures distribution, not the average level of income.",
        "ex": "The lecture's Pacific inequality table reports a national Gini of 30.1, alongside related measures like the Top 10% share, Bottom 40% share and the Palma Index (ratio of the top 10% to the bottom 40%'s income share)."
      },
      {
        "term": "Capability approach (Sen)",
        "def": "Amartya Sen's view that poverty should be understood as a lack of capability to achieve valuable functionings and realise one's potential, not simply as a shortage of income.",
        "ex": "Quoted in the lecture: 'Poverty is not just a lack of money; it is not having the capability to realize one's full potential as a human being.'"
      },
      {
        "term": "Social exclusion",
        "def": "A multidimensional concept of deprivation focused on the processes and mechanisms by which individuals or groups are wholly or partially excluded from full participation in the society they live in, going beyond low income to include unemployment, discrimination, and lack of opportunity.",
        "ex": "Alan Thomas cites de Haan's argument that social exclusion is useful because it highlights multiple, reinforcing causes of deprivation rather than treating poverty as a single income deficit."
      },
      {
        "term": "Post-development school",
        "def": "A body of thought (Sachs, Esteva, Alvares, Rahnema) arguing that 'development' as a project has failed or was always a 'hoax' — a Western/US mechanism for maintaining global dominance under the guise of humanitarian progress — and should be abandoned as a goal.",
        "ex": "Alvares describes development as a form of 'triage', deliberately dividing populations into those worth investing in and those who are excluded or sacrificed."
      },
      {
        "term": "Least Developed Countries (LDCs)",
        "def": "A UN/UNCTAD classification of the poorest and most economically vulnerable countries, assessed using income, human assets and economic vulnerability criteria, distinct from (but related to) low-HDI classification.",
        "ex": "The lecture maps UNCTAD's LDC list, which includes several Pacific states such as Solomon Islands, Kiribati, Tuvalu and Timor-Leste."
      },
      {
        "term": "Basic Human Needs approach",
        "def": "A view of development centred on meeting needs beyond material survival — including belonging, participation, self-esteem, identity, cultural security, freedom and distributive justice — rather than income growth alone.",
        "ex": "Presented in the lecture alongside Sen's 'development as freedom' framing as an alternative to purely economic definitions of development."
      },
      {
        "term": "Wealth inequality vs income inequality",
        "def": "Income inequality measures disparities in what people earn in a given period; wealth inequality measures disparities in accumulated assets (property, savings, investments). Wealth is typically far more concentrated than income.",
        "ex": "Oxfam's 'Working for the Few' reports that the richest 1% owned almost half (46%) of global wealth in 2014, a starker imbalance than income-share figures alone would suggest."
      },
      {
        "term": "Political/opportunity capture",
        "def": "Oxfam's term for the process by which concentrated wealth translates into disproportionate political influence, allowing economic elites to shape laws, tax policy and public spending in their own favour, entrenching advantage across generations.",
        "ex": "Examples given include US financial deregulation lobbying, Pakistani parliamentarians avoiding income tax, and India's billionaires concentrated in 'rent-thick' sectors like real estate and mining."
      },
      {
        "term": "Gendered dimensions of poverty",
        "def": "The pattern, documented across the readings, that poverty and its burdens fall disproportionately on women — through unpaid/underpaid labour, unequal access to education and land, and worse outcomes on measures like maternal mortality — compounding income-based inequality.",
        "ex": "Thomas Lines notes the poorest rural households often depend on women in the most unskilled, precarious agricultural wage work; Oxfam's briefing shows Pakistani girls in the poorest quintile are far less likely to attend primary school than boys in the richest quintile (32% vs 87%)."
      }
    ],
    "theorists": [
      {
        "name": "Rist",
        "work": "The History of Development: From Western Origins to Global Faith (1997)",
        "claim": "Rist argues that 'development' is best understood not as a neutral, technical process but as a Western myth or belief system — a 'religion of modernity' — that persists despite repeated practical failures because it functions like an article of faith rather than a falsifiable theory.",
        "detail": "He defines development formally as a set of practices which, in order to reproduce society, require the general transformation and destruction of the natural environment and of social relations, aimed at increasing commodity production geared to effective demand via exchange. Rist argues conventional definitions of development (e.g. 'enlarging people's choices') are normative wish-lists rather than usable definitions, since by that standard development 'exists nowhere and probably never will'. He compares belief in development to religious belief: contradictions and failures are absorbed without undermining the belief itself, because doubting it feels like abandoning collective hope."
      },
      {
        "name": "Thomas Lines",
        "work": "Making Poverty: A History (2008), ch. 1 'Those who have fallen behind'",
        "claim": "Lines argues that the countries which have 'fallen behind' under globalisation share four common structural features — small population, geographic remoteness from world markets, dependence on primary commodity exports, and reliance on food imports despite being agrarian — and that a persistent global agricultural/rural crisis, not laziness or bad luck, explains their poverty.",
        "detail": "He warns that the widely-reported fall in absolute poverty is a 'half-truth' driven almost entirely by India and China, two atypical giants whose success (large internal markets, pre-existing industry, historically 'closed' policies) offers few directly transferable lessons to smaller, poorer countries. He shows low-HDI countries had a GDP per capita just 1/67th that of high-HDI countries in 2004, and that declining commodity prices since 1960 have made it structurally harder for agrarian economies to escape poverty through trade."
      },
      {
        "name": "Alan Thomas",
        "work": "'Poverty and the \"End of Development\"', in Poverty and Development into the 21st Century (2000)",
        "claim": "Thomas rejects the post-development claim that development has simply 'failed' or was always a 'hoax' that should now be abandoned, arguing instead that development has produced a genuine 'balance sheet' of both advances and continuing deprivation, and that the concept remains necessary because tackling poverty requires some form of organised action.",
        "detail": "He surveys competing definitions of poverty — income/GNP-based, relative/social-exclusion-based, and multidimensional (HDI/HPI-based) — and argues no single measure is sufficient on its own. While he credits post-development writers (Sachs, Esteva, Rahnema, Alvares) with valuable critique of development's coercive and 'triage'-like effects, he concludes their arguments are ultimately 'about development from a radical position' rather than a workable case for abandoning the term altogether."
      },
      {
        "name": "Hickel",
        "work": "'The truth about extreme global inequality', Al Jazeera Opinion (14 April 2013)",
        "claim": "Hickel argues that extreme global inequality is not a legacy problem being slowly fixed by aid and growth, but is actively produced by neoliberal policies (imposed via the World Bank, IMF and WTO) that generate a net flow of wealth from poor to rich countries far larger than aid flows in the opposite direction.",
        "detail": "He cites figures that the richest 200 people hold about $2.7 trillion, more than the poorest 3.5 billion people combined ($2.2 trillion), and that the rich-poor country income gap grew from roughly 3:1 in the colonial era to about 80:1 today. He estimates tax avoidance costs developing countries over $900bn/year and debt service around $600bn/year — both dwarfing aid — and argues that because institutions like the World Bank/IMF/WTO and multinational corporations are unelected and unaccountable, the problem is as much a 'democratic deficit' as an economic one, requiring new global democratic oversight rather than more aid."
      },
      {
        "name": "Sen",
        "work": "Development as Freedom (1999)",
        "claim": "Sen argues that development should be understood as the enhancement of substantive freedoms that allow people to lead the lives they have reason to value, and that poverty is best understood as a deprivation of capabilities rather than simply low income.",
        "detail": "On this view, income is only instrumentally important insofar as it expands or restricts what a person is actually able to do and be (their 'functionings'); two people with identical incomes can have very different real freedoms depending on health, education, social position and political rights. This capability approach underpins the UNDP's Human Development Index and reframes poverty reduction as expanding real opportunity, not just raising GNP per capita."
      },
      {
        "name": "Oxfam (Fuentes-Nieva & Galasso)",
        "work": "Working for the Few: Political Capture and Economic Inequality (Oxfam Briefing Paper 178, 2014)",
        "claim": "Oxfam argues that extreme economic inequality and 'political capture' by wealthy elites are mutually reinforcing: concentrated wealth buys disproportionate political influence, which in turn produces policies (tax loopholes, deregulation, austerity) that further concentrate wealth, eroding democratic accountability.",
        "detail": "Headline findings include that the richest 85 people owned as much wealth as the poorest half of humanity, and the top 1% owned 46% of global wealth in 2014. The report documents case studies (US financial deregulation lobbying, Pakistani parliamentarians' tax avoidance, India's billionaires concentrated in 'rent-thick' sectors, Mexico's Carlos Slim telecoms monopoly) to show inequality is driven by rigged rules, not natural market outcomes, but also cites Latin America and post-WWII USA/Europe as evidence the trend can be reversed through progressive taxation, social spending and stronger labour rights."
      },
      {
        "name": "Townsend",
        "work": "Poverty in the United Kingdom (1979), cited in Alan Thomas's chapter",
        "claim": "Townsend defines poverty relationally: individuals, families and groups are in poverty when their resources are so seriously below what is customary in their society that they are effectively excluded from ordinary living patterns, customs and activities.",
        "detail": "This relative-deprivation definition shifted poverty analysis away from a single, universal subsistence threshold and towards society-specific standards of what counts as an acceptable minimum, directly underpinning later 'social exclusion' approaches and higher-income-country poverty lines (e.g. the World Bank's $14.40/day line for industrialised countries)."
      },
      {
        "name": "Vaai",
        "work": "The 'Whole of Life' Way: Unburying Vakatabu Philosophies and Theologies for Pasifika Development (2024, ed. with Casimira)",
        "claim": "Vaai argues that 'development' needs to be redefined in ways that respect the will and worldview of formerly colonised, indigenous Pacific communities, rather than being driven by an externally-imposed, project-based agenda.",
        "detail": "He calls for re-examining the ideological and philosophical foundations of existing development models and policies as a precondition for genuinely changing the 'development story' in the Pacific, positioning indigenous Pasifika philosophies as a source of alternative development thinking rather than merely a variation on Western models."
      }
    ],
    "tf": [
      {
        "id": "q1",
        "q": "True or false: according to Gilbert Rist, 'development' functions like a religion of modernity, sustained by shared belief rather than by consistent empirical success.",
        "answer": true,
        "explanation": "True. Rist argues that development behaves less like a scientific theory (which would be abandoned when disproved) and more like a religious belief, which survives repeated failures because society treats questioning it as unthinkable. He notes that promises are 'tirelessly repeated and experiments constantly reproduced' despite fifty years of shortfalls, which he explains by comparing development to Christian belief surviving its own historical contradictions. This is central to his broader claim that development is a Western myth rooted in the idea of a 'natural history of humanity'."
      },
      {
        "id": "q2",
        "q": "True or false: Gilbert Rist's own working definition of 'development' centres on rising GDP per capita.",
        "answer": false,
        "explanation": "False. Rist is explicitly critical of normative, feel-good definitions of development and does not define it in terms of GDP growth. His own formal definition centres on a set of practices that transform and destroy the natural environment and social relations in order to increase the production of commodities geared, through exchange, to effective demand. He deliberately avoids GDP-based definitions because they say nothing about the underlying structural process he is trying to describe."
      },
      {
        "id": "q3",
        "q": "True or false: according to Thomas Lines, the countries that have 'fallen behind' during globalisation tend to share features such as small population, geographic remoteness from world markets, dependence on commodity exports, and reliance on food imports.",
        "answer": true,
        "explanation": "True. In 'Those who have fallen behind', Lines identifies these four characteristics as common across most low-human-development countries, regardless of continent. Small population limits economies of scale and domestic markets; remoteness (especially landlocked or small-island status) raises trade costs; commodity dependence exposes countries to volatile and declining terms of trade; and food-import dependence despite being agrarian reflects the collapse of profitable smallholder farming. He argues these are structural, not moral or cultural, explanations for persistent poverty."
      },
      {
        "id": "q4",
        "q": "True or false: Thomas Lines treats India and China's reduction in poverty as clear proof that market liberalisation delivers similar results everywhere in the developing world.",
        "answer": false,
        "explanation": "False. Lines is explicit that reported falls in global absolute poverty are 'at best a half-truth' because they derive almost entirely from two huge, atypical countries. He stresses that India and China industrialised behind partially closed economies before liberalising, and their enormous internal markets are not replicable by small, poor, commodity-dependent states. He concludes that 'the lessons that other developing countries can draw directly from their economic success are limited', and that many other developing countries have instead stagnated or declined."
      },
      {
        "id": "q5",
        "q": "True or false: Alan Thomas concludes that the post-development school is right, and that 'development' should simply be abandoned as a concept.",
        "answer": false,
        "explanation": "False. While Thomas credits post-development writers (Sachs, Esteva, Rahnema, Alvares) with useful critical insights — particularly the idea of development as a 'hoax' or as 'triage' benefiting some at others' expense — he does not accept their conclusion that the term should be dropped. He argues their arguments are really 'arguments about development from a radical position' rather than a case against acting at all, and that since poverty, powerlessness and environmental degradation remain real problems requiring some form of concerted action, the concept of development (with all its ambiguity) is still needed as a frame for analysis."
      },
      {
        "id": "q6",
        "q": "True or false: absolute poverty is typically measured using a fixed income or consumption threshold (a poverty line), applied in the same way regardless of the society a person lives in.",
        "answer": true,
        "explanation": "True. Absolute poverty measures, such as the World Bank's international $-a-day lines, set a fixed subsistence-level threshold intended to be comparable across countries once adjusted for purchasing power. This contrasts with relative poverty measures, which set the threshold according to what is considered normal or customary within a specific society, so the same income could count as poor in one country and not in another."
      },
      {
        "id": "q7",
        "q": "True or false: according to Peter Townsend, people are in poverty when their resources are so far below the average that they are excluded from the living patterns, customs and activities ordinarily approved of in their own society.",
        "answer": true,
        "explanation": "True. Townsend's influential definition of relative poverty (used in Alan Thomas's chapter) states that individuals, families and groups can be said to be in poverty when they lack the resources to obtain the diets, participate in the activities, and have the living conditions and amenities that are customary in the society to which they belong. This relational definition underlies the concept of social exclusion and higher-income-country poverty lines like the World Bank's $14.40/day measure."
      },
      {
        "id": "q8",
        "q": "True or false: the Gini coefficient measures a country's average level of income, similar to GDP per capita.",
        "answer": false,
        "explanation": "False. The Gini coefficient measures the distribution of income or wealth within a population — how unequally it is spread — not the average amount. A country could have a high GDP per capita and still have a high (very unequal) Gini coefficient if that income is concentrated among a small share of the population. This is why analysts pair GDP/GNP per capita figures with Gini coefficients or related measures (e.g. the Top 10%/Bottom 40% ratio or the Palma Index) to capture both the level and distribution of income."
      },
      {
        "id": "q9",
        "q": "True or false: according to Amartya Sen, as quoted in the lecture, poverty is not just a lack of money but a lack of the capability to realise one's full potential as a human being.",
        "answer": true,
        "explanation": "True. This is Sen's capability approach, directly quoted in the Week 2 lecture. Sen argues that income is only instrumentally useful in expanding what a person can actually do and be; poverty should therefore be assessed in terms of deprivation of capabilities (health, education, participation, freedom) rather than income alone. This underpins his broader definition of development as 'the enhancement of freedoms that allow people to lead lives that they have reason to live.'"
      },
      {
        "id": "q10",
        "q": "True or false: according to Jason Hickel, the growing gap between rich and poor countries is mainly explained by rich countries not giving enough foreign aid.",
        "answer": false,
        "explanation": "False. Hickel argues that aid is a relatively minor factor and that far larger sums flow from poor to rich countries through mechanisms such as tax avoidance (which he estimates costs developing countries over $900bn a year) and debt service (around $600bn a year), dwarfing aid flows in the opposite direction. He attributes the widening gap (from roughly 3:1 in the colonial period to about 80:1 today, by his account) primarily to neoliberal policies imposed by the World Bank, IMF and WTO, not to insufficient generosity from rich countries."
      },
      {
        "id": "q11",
        "q": "True or false: Oxfam's 'Working for the Few' report (2014) found that the richest 85 people in the world owned roughly the same amount of wealth as the poorest half of the world's population.",
        "answer": true,
        "explanation": "True. This is one of the report's headline statistics: the bottom half of the world's population (around 3.5 billion people at the time) owned the same amount of wealth as the richest 85 individuals. The report also states that the richest 1% owned almost half (46%) of global wealth, and used these figures to argue that extreme wealth concentration and 'political capture' by economic elites were undermining democratic governance and fair political representation."
      },
      {
        "id": "q12",
        "q": "True or false: the Human Development Index (HDI) is calculated using only a country's GDP per capita.",
        "answer": false,
        "explanation": "False. The HDI is a composite index combining three dimensions: life expectancy at birth (health), educational attainment (mean and expected years of schooling), and GNI/GDP per capita (adjusted for cost of living). It was designed specifically to move beyond income-only measures of development, on the basis that income alone does not capture health or education outcomes. In the lecture's Pacific rankings, this is why countries can have similar incomes but different HDI scores."
      },
      {
        "id": "q13",
        "q": "True or false: as discussed in the lecture and readings, the term 'Third World' originated as a purely geographic label, with no political or ideological content.",
        "answer": false,
        "explanation": "False. 'Third World' originated in the Cold War era as a political and ideological concept, denoting the roughly 100 newly independent, formerly colonised states that sought a 'non-aligned' path distinct from both the capitalist 'first world' and the communist 'second world' (associated with the Non-Aligned Movement). It became loosely associated with poverty and underdevelopment, but its origin was explicitly political rather than a neutral geographic or income-based classification, and it lost much of its coherence once the Cold War ended and economic differentiation grew among 'third world' states."
      },
      {
        "id": "q14",
        "q": "True or false: Upolu Lumā Vaai argues that 'development' should be redefined to respect the will of indigenous, formerly colonised Pacific communities, rather than being driven purely by an externally-imposed, project-based agenda.",
        "answer": true,
        "explanation": "True. As quoted in the lecture, Vaai argues that the word 'development' itself 'needs to be redefined in a way that respects the will of indigenous formerly colonised communities and is not defined by a project-driven agenda', and that changing the 'development story' requires re-examining the ideological and philosophical foundations of current development models and policies. This reflects a broader Pacific/indigenous critique of development as a concept historically defined from the outside by Western or donor institutions."
      }
    ]
  },
  {
    "id": "w3",
    "week": 3,
    "title": "Colonialism and Colonial Mindsets",
    "summary": "This week covers colonialism as both a historical system of territorial and economic control and an ongoing set of ideas -- a 'colonial mindset' -- that shaped how colonizers saw and represented the people and places they ruled. The readings' shared argument is that today's global inequalities are not a natural starting condition but were actively produced: colonial trade, extraction and administration enriched European powers while structurally impoverishing colonized regions, a process theorists call underdevelopment rather than simple backwardness. Edward Said's concept of Orientalism extends this to the level of knowledge and representation, showing how Western scholarship constructed non-European peoples as inferior in ways that justified ruling them. The Pacific and African case studies -- Nauru's phosphate mining, Namibia's Bushman genocide, and Britain's suppression of the Mau Mau uprising -- show how these dynamics played out concretely in extraction, environmental destruction and even genocide, while Hau'ofa's essay pushes back against the colonial habit of writing off small Pacific nations as inherently poor, small and dependent.",
    "concepts": [
      {
        "term": "Colonialism",
        "def": "The practice of one power establishing political and economic control over another territory and its people, typically through settlement, military force and/or extraction of resources, producing lasting unequal power relations between colonizer and colonized.",
        "ex": "The lecture traces colonial expansion from 1550 to 1938 through a series of world maps showing European empires steadily claiming more of the globe's surface."
      },
      {
        "term": "Colonial mindset",
        "def": "A way of thinking, held by colonizers and often internalized by the colonized, that treats non-Western or indigenous societies, knowledge and ways of life as inferior, backward, or in need of correction by outsiders.",
        "ex": "Captain Cook's journals describe Pacific Islanders as 'noble savages' living in blissful simplicity -- a flattering-sounding but still belittling frame that denied them complex political and economic life."
      },
      {
        "term": "Orientalism",
        "def": "Edward Said's term for the Western scholarly, artistic and administrative discourse that constructs 'the Orient' as a fixed, inferior, irrational Other in contrast to a rational, superior 'Occident'; a system of representation bound up with, and justifying, Western power over the East.",
        "ex": "Lord Cromer and Arthur Balfour both claimed that Britain's superior 'knowledge' of Egypt's civilization gave it the right and duty to rule Egyptians, rather than basing their claim on force alone."
      },
      {
        "term": "Underdevelopment (as an active process)",
        "def": "In Walter Rodney's usage, not an original condition of backwardness but a relationship of exploitation: wealthy nations became wealthy partly by extracting labour, resources and surplus from colonized regions, which were correspondingly and deliberately impoverished.",
        "ex": "Rodney contrasts this with development-industry language that treats poor countries as simply 'behind' on a universal path all nations travel at their own pace."
      },
      {
        "term": "Resource extraction",
        "def": "A defining feature of colonial economies in which colonies' infrastructure, labour and trade routes were organized to funnel raw materials to the metropole rather than to serve local needs or connect local communities.",
        "ex": "Colonial roads and railways in Africa ran from inland mines and plantations straight to the coast for export, not between African towns; Nauru's entire economy was reorganized around phosphate mining for Australian and New Zealand farms."
      },
      {
        "term": "Terms of trade",
        "def": "The ratio between the prices a country receives for its exports and the prices it pays for its imports; a deterioration means a country must export more just to afford the same imports.",
        "ex": "Thomas Lines shows that developing countries' terms of trade fell by over 35% between 1981-2 and 2001-3, even as many exported greater volumes -- the 'fallacy of composition' where universal advice to export more collapses world prices."
      },
      {
        "term": "Structural adjustment / Washington Consensus",
        "def": "The package of market-liberalizing policies (trade and price liberalization, privatization, reduced state spending, export orientation) imposed on indebted developing countries by the IMF and World Bank from the 1980s onward, in place of earlier state-led development planning.",
        "ex": "Lines argues these policies, first outlined in the World Bank's 1981 Berg Report on Africa, coincided with worsening terms of trade and stagnant or declining human development in many low-income countries."
      },
      {
        "term": "Development discourse",
        "def": "Arturo Escobar's term for the post-WWII 'development' project as a system of knowledge and institutional power -- not a neutral description of reality -- that defines the Global South as 'underdeveloped' and in need of Western-led intervention.",
        "ex": "Escobar traces this discourse to the aid industry, World Bank reports and NGO campaigns that all take for granted that 'development' is needed, without questioning the concept itself."
      },
      {
        "term": "Permanent Sovereignty over Natural Resources (PSNR)",
        "def": "An international law principle, asserted strongly by newly independent states after decolonization, that a people or nation holds an inalienable right to control, use and benefit from its own natural resources.",
        "ex": "PSNR was central to Nauru's 1989 case against Australia at the International Court of Justice over decades of phosphate extraction during the mandate and trusteeship periods."
      },
      {
        "term": "Mandate / Trusteeship system",
        "def": "The League of Nations (later United Nations) framework under which former German and Ottoman colonies were placed under the administration of other powers, nominally to prepare them for eventual self-government.",
        "ex": "Nauru was administered jointly by Britain, Australia and New Zealand under this system from 1919, continuing largely unchanged in practice even after the UN trusteeship replaced the League mandate in 1946."
      },
      {
        "term": "Colonial / frontier genocide",
        "def": "The extermination of indigenous groups under settler-colonial rule, often enabled less by a single order than by legal, administrative and demographic structures that made mass killing routine and largely unpunished.",
        "ex": "Robert Gordon documents the German 'Bushman patrols' of 1912-1915 in Namibia, in which colonial police and settlers hunted, shot and deported San/Bushman people with near-total impunity."
      },
      {
        "term": "Rechtsstaat",
        "def": "The German legal-political concept of a 'constitutional' or code-based state in which all subjects are formally equal before the law; Gordon argues this ideal, paradoxically, helped facilitate genocide in Namibia by legally defining Bushmen without labour contracts as 'vagrants' outside the law's protection.",
        "ex": "1907 Native Regulations stripped indigenous people of land and livestock and classed those without settler employment as punishable vagrants, giving legal cover to settler violence."
      },
      {
        "term": "Migrated / hidden colonial archives",
        "def": "The documented British practice of destroying or secretly removing sensitive colonial administrative records before granting independence, to prevent former colonies and courts from accessing evidence of abuses.",
        "ex": "The 2011 'Hanslope disclosure' revealed that Britain had secretly stored over 1,500 files removed from Kenya (and records from 37 other colonies) at a high-security facility, which helped prove systematic torture during the Mau Mau suppression."
      },
      {
        "term": "MIRAB economy",
        "def": "An acronym (Migration, Remittances, Aid, Bureaucracy) used by some social scientists to describe small Pacific Island economies as structurally dependent rather than genuinely productive.",
        "ex": "Hau'ofa criticizes this label as a demeaning, self-fulfilling narrative that ignores ordinary Islanders' own resourcefulness, mobility and kin-based exchange networks."
      },
      {
        "term": "'Sea of islands' vs 'islands in a far sea'",
        "def": "Hau'ofa's contrast between an indigenous Oceanic worldview -- a single, vast, interconnected world of voyaging, trade and kinship -- and the colonial/Western view of the Pacific as scattered, tiny, isolated and dependent territories.",
        "ex": "Hau'ofa argues 19th-century imperialism physically 'contracted' Oceania by drawing colonial borders across a once-boundless ocean, and that this contraction, not any natural smallness, is the real source of the 'small island' narrative."
      },
      {
        "term": "Non-sovereign territories",
        "def": "Contemporary Pacific territories that remain under the political authority of a former or current colonial power rather than being fully independent states.",
        "ex": "The lecture slides show present-day protests and imagery from territories like Guam and French Polynesia as evidence that colonialism's political structures persist in the Pacific today."
      },
      {
        "term": "Dependency",
        "def": "A condition in which a country's economy and policy choices remain structurally controlled by or reliant upon more powerful external states, institutions or capital, even after formal political independence.",
        "ex": "Nazzal argues Nauru's post-independence dependence on phosphate revenue, and later on offshore banking and hosting Australia's asylum-seeker detention centres, shows how formal sovereignty did not bring real economic independence."
      }
    ],
    "theorists": [
      {
        "name": "Rodney",
        "work": "How Europe Underdeveloped Africa (1972)",
        "claim": "Rodney argues that Europe's development and Africa's underdevelopment were two sides of the same historical process: colonialism did not simply fail to develop Africa, it actively organized Africa's economy, infrastructure and labour to enrich Europe.",
        "detail": "He shows colonial roads and railways ran only from inland resources to the coast for export, not to connect African communities to each other; social services such as health and education were minimal, racially skewed toward white settlers, and provided only where they served profitable extraction (e.g. mining regions); and he insists 'underdevelopment' only makes sense as a comparative, relational term describing exploitation, not an original or natural condition."
      },
      {
        "name": "Said",
        "work": "Orientalism (1978)",
        "claim": "Said argues that Orientalism is a Western system of knowledge and representation that constructed 'the Orient' as a fixed, inferior, irrational Other, and that this discourse was inseparable from -- and helped justify -- European colonial domination of the Middle East and Asia.",
        "detail": "Drawing on Foucault's notion of discourse and Gramsci's notion of hegemony, Said analyses figures such as Lord Cromer and Arthur Balfour, who claimed superior 'knowledge' of Egyptian civilization as grounds for Britain's right to rule Egypt without consent; his key point is that Orientalist texts reveal more about the West's own assumptions of superiority than about the 'Orient' they claim to describe."
      },
      {
        "name": "Hau'ofa",
        "work": "Our Sea of Islands (1994)",
        "claim": "Hau'ofa argues that the common view of Pacific Island nations as 'too small, too poor, and too isolated' to develop real autonomy is not a neutral fact but a colonially inherited, belittling narrative that ignores Islanders' own history and continuing practice of voyaging, exchange and mobility across what he calls 'a sea of islands'.",
        "detail": "He contrasts the colonial view of 'islands in a far sea' (tiny, isolated dots) with the indigenous Oceanic view of 'a sea of islands' (one vast, interconnected world); he criticizes labels like 'MIRAB economy' as reinforcing dependency, and argues that migration and remittances represent ordinary Islanders enlarging their world and exercising real agency, not passive dependence on aid."
      },
      {
        "name": "Escobar",
        "work": "Anthropology and Development (1997)",
        "claim": "Escobar argues, drawing on post-structuralist theory, that 'development' should not be treated as a neutral, natural process but studied critically as a historically invented discourse -- a system of knowledge and power dating to the late 1940s that constructs the 'Third World' as underdeveloped and in need of Western-led intervention.",
        "detail": "He distinguishes 'development anthropology' (anthropologists working inside institutions like the World Bank to make development projects more culturally sensitive) from the critical 'anthropology of development' (which, following Said and Foucault, questions development's basic assumptions and asks how the discourse itself produces power); he closes by calling for attention to 'post-development' alternatives and local, hybrid forms of knowledge and resistance."
      },
      {
        "name": "Hickel",
        "work": "The Divide: A Brief Guide to Global Inequality and its Solutions (2017)",
        "claim": "Hickel argues that the standard 'development' story -- that poor countries are simply behind on a single path of progress and will catch up with enough aid and the right policies -- is close to the opposite of the truth: today's global inequality was created by colonialism and continues to be reproduced by the rules of the current world economy.",
        "detail": "He traces the 'development' narrative to Harry Truman's 1949 'Point Four' inaugural speech, shows that global poverty (measured by realistic poverty lines rather than the World Bank's $1-a-day line) has grown rather than shrunk since 1981, and argues Western governments used covert coups against reformist post-independence governments and later imposed World Bank/IMF conditions specifically to protect their own economic and geopolitical interests."
      },
      {
        "name": "Lines",
        "work": "Making Poverty: A History, Chapter 2 'How Poverty Is Made' (2008)",
        "claim": "Lines argues that today's rural poverty in developing countries has deep roots in colonial-era trade patterns -- such as the deliberate deindustrialization of Bengal's textile industry after British conquest -- and was made worse, not solved, by the free-market 'export orientation' policies imposed by the World Bank and IMF from the 1980s.",
        "detail": "He shows that commodity export prices and developing countries' terms of trade fell across the 1980s-2000s even as export volumes rose (a 'fallacy of composition,' illustrated by the 2005 collapse of Ugandan vanilla prices), while countries that instead pursued protectionist, state-planned 'developmental state' strategies -- Botswana, Malaysia, South Korea, China -- grew successfully, undermining the claim that unmanaged free markets alone deliver development."
      },
      {
        "name": "Gordon",
        "work": "Hiding in Full View: The 'Forgotten' Bushman Genocides of Namibia (2009)",
        "claim": "Gordon argues that the German colonial killing of Bushman (San) people in Namibia between 1912 and 1915 constitutes a genuine genocide -- arguably more systemic than the better-known Herero genocide of 1904 -- yet has been almost entirely erased from historical and popular memory.",
        "detail": "He argues the genocide was made possible by 'necessary' conditions of settler land/labour hunger ('booty capitalism') combined with a distinctively German 'sufficient' condition: the Rechtsstaat legal culture, which classified Bushmen without labour contracts as punishable vagrants outside legal protection, reinforced by contemporary academic anthropologists (e.g. Passarge, Schultze) who publicly argued Bushmen could not be 'civilized' and were fit only for extermination or reservation."
      },
      {
        "name": "Nazzal",
        "work": "Nauru: An Environment Destroyed and International Law (2005)",
        "claim": "Nazzal argues Nauru is a 'parable' of colonial resource exploitation: decades of phosphate mining under German, then joint Australian/British/New Zealand mandate and trusteeship administration, left the island an environmentally devastated 'moonscape' of limestone pinnacles, while Nauruans received only a small fraction of the wealth extracted from their own land.",
        "detail": "She traces Nauru's 1989 International Court of Justice case against Australia (Certain Phosphate Lands in Nauru), grounded in the principle of Permanent Sovereignty over Natural Resources, which ended in a 1993 settlement of $107 million -- far below the estimated value of lost revenue over the trusteeship period -- and argues Nauru's post-independence continuation of mining, and later dependence on offshore banking and hosting Australia's asylum-detention centres, shows that formal sovereignty did not translate into real economic independence."
      },
      {
        "name": "Elkins",
        "work": "Britain's Gulag / Imperial Reckoning, discussed in 'Uncovering the brutal truth about the British empire' (Guardian, 2016)",
        "claim": "Historian Caroline Elkins documented that British colonial authorities used mass detention, forced labour, torture and forced 'villagization' to suppress the Mau Mau uprising in 1950s Kenya, and that far more Kikuyu were detained (an estimated 160,000-320,000) than the official figure of 80,000 admitted.",
        "detail": "Her findings were fiercely contested by other historians until the 2011 discovery of the 'migrated archive' -- over 1,500 files that British officials secretly flew out of Kenya and hid at Hanslope Park in the UK rather than hand over or destroy at independence -- which corroborated her account of systematic torture (the 'dilution technique') and led Britain in 2013 to formally compensate over 5,000 Kenyan survivors, the first time Britain admitted to committing torture anywhere in its former empire."
      }
    ],
    "tf": [
      {
        "id": "q1",
        "q": "True or false: according to Walter Rodney, colonialism actively produced Africa's underdevelopment rather than simply failing to develop the continent.",
        "answer": true,
        "explanation": "True. Rodney's central argument is that 'underdevelopment' is a relational, comparative term describing a relationship of exploitation, not an original or natural condition. He shows that European wealth and African poverty were two sides of the same historical process: colonial economies were deliberately structured (through infrastructure, labour systems and trade) to extract African surplus for European benefit. This is why he insists colonialism cannot be assessed as a 'balance sheet' of some good mixed with some bad -- the entire system was organized around extraction."
      },
      {
        "id": "q2",
        "q": "True or false: according to Rodney, colonial governments in Africa generally provided social services (health, education) at a level roughly comparable to those enjoyed by working people in Europe.",
        "answer": false,
        "explanation": "False. Rodney shows colonial social spending was tiny and badly skewed. He cites 1934 figures showing British social expenditure per person was many times higher in Britain than in colonies like Ghana or Nigeria, and that within colonies, the limited services that existed went disproportionately to white settlers and to workers in the most profitable export industries (e.g. mining), while rural subsistence-sector Africans -- the majority -- saw almost nothing. He argues it is 'brazen fraud' to weigh these paltry services against the scale of colonial exploitation."
      },
      {
        "id": "q3",
        "q": "True or false: according to Edward Said, Orientalism is best understood as a body of straightforwardly false 'lies' about the East that would simply collapse if the truth were told.",
        "answer": false,
        "explanation": "False. Said explicitly warns against this reading. He argues Orientalism should be understood as a durable, knitted-together discourse with real institutional and material power -- academic disciplines, colonial administration, literature -- rather than mere myths. Its strength comes from its systematic character and its ties to real political and economic domination (what he calls, following Gramsci, cultural 'hegemony'), which is why it persisted essentially unchanged from the mid-19th century into the 20th."
      },
      {
        "id": "q4",
        "q": "True or false: in Said's account, Lord Cromer and Arthur Balfour justified British rule over Egypt primarily by claiming military necessity rather than superior knowledge of Egyptian civilization.",
        "answer": false,
        "explanation": "False. Said quotes Balfour's 1910 speech to the House of Commons explicitly downplaying superiority/inferiority language in favour of a claim to knowledge: 'We know the civilization of Egypt better than we know the civilization of any other country.' Cromer likewise framed British rule as flowing from expert understanding of the 'Oriental mind.' Said's point is precisely that Orientalism substituted a claim to knowledge for a claim to naked force, which made domination appear rational and even benevolent rather than simply coercive."
      },
      {
        "id": "q5",
        "q": "True or false: according to Hau'ofa, the small size and poverty of Pacific Island states reflects an unavoidable geographic reality rather than a colonially shaped way of seeing the region.",
        "answer": false,
        "explanation": "False. Hau'ofa argues 'smallness is a state of mind' produced largely by the colonial contraction of a once-boundless Oceanic world into fixed national borders. He contrasts the colonial framing of 'islands in a far sea' (tiny, isolated, dependent) with the indigenous view of 'a sea of islands' (one large, interconnected world of voyaging and exchange), and argues that Islanders' continuing mobility, remittances and kin networks demonstrate real economic and cultural vitality that the 'smallness' narrative erases."
      },
      {
        "id": "q6",
        "q": "True or false: according to Jason Hickel, global poverty (measured by a realistic poverty line rather than the World Bank's minimal $1-a-day standard) has fallen substantially since measurements began in 1981.",
        "answer": false,
        "explanation": "False. Hickel argues the official 'good news' story relies on a misleadingly low poverty line and on proportional rather than absolute figures. Using a more realistic threshold (about four times the $1/day line), he estimates the poverty headcount has actually grown by over a billion people since 1981, to around 4.3 billion -- more than 60% of humanity -- even as inequality between rich and poor countries has widened rather than narrowed."
      },
      {
        "id": "q7",
        "q": "True or false: Thomas Lines uses the deindustrialization of Bengal's textile industry after British conquest as an example of how colonial trade policy could impoverish a previously wealthy region.",
        "answer": true,
        "explanation": "True. Lines describes how, after Robert Clive secured British military control of Bengal in the 1750s, British traders forced down the price paid to Bengali weavers while Britain's own industrializing cloth production (aided by the steam-powered spinning of the 1780s onward) flooded India with cheap imports. He cites estimates that this 'forced free trade' destroyed 55-99% of India's domestic textile consumption by industry between 1870 and 1900, turning a former manufacturing centre like Dhaka into an impoverished town."
      },
      {
        "id": "q8",
        "q": "True or false: according to Thomas Lines, the World Bank and IMF's structural adjustment policies of the 1980s improved developing countries' terms of trade with the rest of the world.",
        "answer": false,
        "explanation": "False. Lines shows the opposite occurred: developing countries' terms of trade deteriorated significantly after 'export orientation' policies were imposed from the 1980s Berg Report onward, while developed countries' terms of trade improved over the same period. He attributes this partly to a 'fallacy of composition' -- when many countries were all advised to export more of the same primary commodities, world prices collapsed, so countries had to export ever more just to afford the same imports."
      },
      {
        "id": "q9",
        "q": "True or false: Nauru's case against Australia at the International Court of Justice was grounded partly in the principle of Permanent Sovereignty over Natural Resources (PSNR).",
        "answer": true,
        "explanation": "True. Nazzal explains that Nauru's 1989 ICJ application argued that Australia (as the administering trustee power) had violated Nauru's right of permanent sovereignty over its phosphate wealth, alongside violations of the Trusteeship Agreement and principles of equity. This PSNR argument held that title to the phosphate always belonged to the Nauruan people, even though mining rights had been transferred between colonial companies and governments without Nauruan consent."
      },
      {
        "id": "q10",
        "q": "True or false: according to Nazzal, Nauru's 1993 settlement with Australia fully compensated Nauruans for the revenue lost during the mandate and trusteeship periods.",
        "answer": false,
        "explanation": "False. Nazzal notes the settlement -- $107 million paid over 20 years -- fell far short of the value actually lost. She calculates that the roughly $300 million in accumulated revenue loss estimated as of 1967, compounded at just 5% interest to 1993, would have exceeded a billion dollars. The settlement therefore represented only a fraction of Nauru's claim, even though it satisfied Nauru's main legal demand for rehabilitation costs."
      },
      {
        "id": "q11",
        "q": "True or false: according to Robert Gordon, the Bushman (San) genocide in German South West Africa (Namibia) has received more scholarly and public attention than the Herero genocide of 1904.",
        "answer": false,
        "explanation": "False. Gordon's whole argument is the reverse: the Bushman genocide of 1912-1915 has been almost completely 'invisibilized,' overshadowed by the more widely studied Herero genocide, to the point that even genocide scholars specializing in Namibia and contemporary Bushman/San communities themselves largely do not recall it. He attributes this partly to the narrow scholarly focus on the 'official' 1904-1907 Herero war."
      },
      {
        "id": "q12",
        "q": "True or false: according to Gordon, the German legal concept of Rechtsstaat (a formally equal, code-based rule of law) functioned mainly to restrain settlers from committing extrajudicial violence against Bushmen.",
        "answer": false,
        "explanation": "False. Gordon argues Rechtsstaat had the opposite effect: it provided a legal framework that enabled and legitimized violence. The 1907 Native Regulations classified indigenous people without labour contracts as punishable 'vagrants' effectively outside the law's protection (echoing the term Vogelfrei, or 'free birds'/outlaws), which gave settlers and officials a sense of legal cover for hunting, deporting and killing Bushmen deemed 'idle' or dangerous."
      },
      {
        "id": "q13",
        "q": "True or false: according to Arturo Escobar, mainstream 'development anthropology' and the critical 'anthropology of development' rely on the same basic theoretical assumptions about culture and knowledge.",
        "answer": false,
        "explanation": "False. Escobar explicitly distinguishes the two. Development anthropology (practitioners working within institutions like the World Bank) draws on realist, largely established theories of culture and political economy, and generally accepts development as a necessary, unquestioned goal. The anthropology of development, by contrast, draws on post-structuralist theory (language, discourse, power/knowledge, influenced by Said and Foucault) and treats 'development' itself as a historically invented discourse that should be critically examined rather than assumed."
      },
      {
        "id": "q14",
        "q": "True or false: Caroline Elkins's research found that British authorities detained roughly the same number of Kikuyu during the Mau Mau uprising as official government figures claimed.",
        "answer": false,
        "explanation": "False. Elkins found the detention system was far larger than officially admitted. Official figures put the number of detainees at around 80,000, but her archival and oral history research concluded that between 160,000 and 320,000 Kikuyu had been held in camps and enclosed villages -- a finding later corroborated by the 'Hanslope disclosure' of secretly hidden colonial documents in 2011, which helped support Kenyan survivors' 2013 torture compensation claim against Britain."
      }
    ]
  },
  {
    "id": "w4",
    "week": 4,
    "title": "Political Independence and the Promise of Development",
    "summary": "This week traces the gap between formal political independence and the promise of economic development in the postwar Global South. Decolonization accelerated rapidly after 1945 under the banner of self-determination, and newly independent states organised collectively - at the 1955 Bandung Conference and through the Non-Aligned Movement - to press for a fairer place in an international order still shaped by the former colonial powers. That collective pressure peaked with the 1973 oil shock and the 1974 UN Declaration on a New International Economic Order (NIEO), which demanded sovereignty over natural resources, better terms of trade, and regulation of transnational corporations. The NIEO's rhetorical ambition was not matched by results: critics such as Rist argue it reinforced rather than dismantled the existing order, and by the late 1970s the 'Third World' itself had fragmented along lines of wealth (oil producers, newly industrializing countries, least developed countries). Acharya's revisionist reading of Bandung further complicates any simple story of Third World unity or anti-Western defensiveness, showing that the conference's Asian and African delegates actively championed human rights and universalism rather than treating sovereignty and nonintervention as tools to evade them - the broader lesson being that political sovereignty did not translate automatically into economic development or a homogenous developing-country bloc.",
    "concepts": [
      {
        "term": "Bandung Conference (1955)",
        "def": "The Asian-African Conference held in Bandung, Indonesia, 18-24 April 1955, bringing together 29 newly independent or soon-to-be-independent Asian and African states.",
        "ex": "Sukarno called it the 'first intercontinental conference of coloured peoples in the history of mankind'; it produced a Final Communique with ten principles and strongly influenced the later Non-Aligned Movement."
      },
      {
        "term": "Non-Aligned Movement (NAM)",
        "def": "A loose grouping of states, formally established at Belgrade in 1961, that declined to formally align with either the US-led or Soviet-led blocs during the Cold War.",
        "ex": "Summed up in the lecture as a policy of 'friends for all, enemy to none'; its concerns included anti-colonialism, sovereignty, and development of the South."
      },
      {
        "term": "New International Economic Order (NIEO)",
        "def": "A programme demanded by developing countries and proclaimed in a 1974 UN General Assembly Declaration, calling for a restructured global economy based on sovereign equality, fairer terms of trade, and regulation of transnational corporations.",
        "ex": "Adopted 1 May 1974 alongside a Programme of Action and the Charter of Economic Rights and Duties of States, in the wake of the 1973 OPEC oil price rises."
      },
      {
        "term": "Third Worldism",
        "def": "A political identity and ideology that framed newly independent and developing states as a collective 'Third World' bloc distinct from the capitalist First World and communist Second World.",
        "ex": "Rist titles his chapter on the 1970s 'The Triumph of Third-Worldism', describing the decade's peak of Southern confidence before the bloc's fragmentation."
      },
      {
        "term": "Decolonization",
        "def": "The postwar process by which colonies gained formal political independence from their colonial rulers, accelerating especially from the mid-1950s through the 1970s.",
        "ex": "Illustrated in the lecture by a map of African independence dates, ranging from Libya (1951) to Zimbabwe (1980)."
      },
      {
        "term": "Self-determination",
        "def": "The principle that peoples have the right to freely determine their own political status and pursue their own economic, social and cultural development.",
        "ex": "Enshrined in Article 1 of the UN Charter (1945) and reaffirmed in the UN Declaration on the Granting of Independence to Colonial Countries and Peoples (1960)."
      },
      {
        "term": "Sovereignty / nonintervention",
        "def": "The norm that states should not interfere or intervene in the internal affairs of other states.",
        "ex": "A central and contested theme at Bandung; Acharya argues it was invoked against foreign interference, 'communist colonialism', and Cold War military pacts, not to excuse domestic abuses."
      },
      {
        "term": "Group of 77 (G-77)",
        "def": "A coalition of developing countries formed within the UN in 1964 to act as their main negotiating bloc on economic issues, including the NIEO demands.",
        "ex": "Adopted the 1967 Algiers Charter, which summed up the South's grievances against the industrial countries ahead of the NIEO."
      },
      {
        "term": "UNCTAD",
        "def": "The UN Conference on Trade and Development, established in 1964 to promote trade and economic cooperation that would benefit developing countries.",
        "ex": "Became the 'favoured platform' of the G-77 and a key site for NIEO-related demands."
      },
      {
        "term": "OPEC / 1973 oil crisis",
        "def": "The Organization of Petroleum Exporting Countries, whose 1973 decision to quadruple oil prices (during the October/Yom Kippur War) sharply disrupted Northern economies.",
        "ex": "Rist frames this as the first time Southern countries - even if only the richest among them - acted together in a way that could seriously disturb the economy of the North."
      },
      {
        "term": "The Pacific Way",
        "def": "A phrase coined by Fiji's Prime Minister Ratu Sir Kamisese Mara in a 1970 UN General Assembly speech, describing what he presented as a calm, orderly Pacific model of transition to independence.",
        "ex": "Lawson shows Mara's original version had little in common with later 'postcolonial' readings of the term, which came from Ron Crocombe's 1976 reinterpretation."
      },
      {
        "term": "Universal Declaration of Human Rights (UDHR)",
        "def": "The 1948 UN document setting out fundamental human rights; a major point of debate at the Bandung Conference's Political Committee.",
        "ex": "Because nine Bandung participants were not yet UN members, the conference's compromise text 'took note of' rather than formally endorsed the UDHR."
      },
      {
        "term": "Postcolonial discourse",
        "def": "An analytical approach concerned with the interpretation of the colonial past and its ongoing effects, generally understood as anti-hegemonic and identifying with anti-colonial resistance.",
        "ex": "Lawson argues the 'Pacific Way' only gained genuinely postcolonial/anti-colonial characteristics well after its original, conservative formulation by Mara."
      },
      {
        "term": "Collective self-reliance",
        "def": "A NIEO-era principle, first entering UN vocabulary via the 1970 Lusaka non-aligned conference, urging developing countries to cooperate economically with one another rather than depend solely on the North.",
        "ex": "Reaffirmed in the 1974 NIEO resolutions as a form of 'regional, subregional and interregional cooperation' among developing countries."
      },
      {
        "term": "Basic needs approach",
        "def": "An alternative development strategy, promoted from 1972 by the World Bank and later the ILO, prioritising the fulfilment of the poor's minimum needs (food, shelter, health, education) over pure GDP growth.",
        "ex": "Rist treats it as a 'political counter-fire' to the NIEO that let institutions like the World Bank appear to address poverty without addressing structural inequality."
      }
    ],
    "theorists": [
      {
        "name": "Acharya",
        "work": "'Who Are the Norm Makers? The Asian-African Conference in Bandung and the Evolution of Norms', Global Governance (2014)",
        "claim": "Acharya argues that Bandung Conference participants were pro-human rights, pro-universalist, and saw no contradiction between state sovereignty/nonintervention and human rights.",
        "detail": "Drawing on previously unpublished verbatim records of the Political Committee, Acharya shows human rights and self-determination was the first agenda item at Bandung, championed by figures such as Nehru and Lebanon's Charles Malik. Nonintervention was invoked against foreign interference, 'communist colonialism', and Cold War military pacts like SEATO - not to shield any delegate's own government from criticism of its human rights record. He concludes that Global South states acted as active 'norm makers' at Bandung, not passive 'norm takers' or 'norm wreckers' as often assumed, and that Western fears the conference would undermine international human rights and disarmament norms proved unfounded."
      },
      {
        "name": "Rist",
        "work": "The History of Development: From Western Origins to Global Faith (1997), Ch. 9 'The Triumph of Third-Worldism'",
        "claim": "Rist argues the NIEO did not represent a genuine break from mainstream development economics; rather than closing the gap between rich and poor countries it widened it, and its implementation would have been more dangerous than beneficial for the peoples of the South.",
        "detail": "Rist shows the NIEO rested on three orthodox concepts - economic growth, expanded world trade, and increased aid - and that 'peoples are the great actors missing from the NIEO', which centred state sovereignty and national elite interests rather than the wellbeing of ordinary populations. He argues the NIEO collapsed by the late 1970s because the 'Third World' itself fragmented into oil-rich states, newly industrializing countries and least developed countries, because Western banks recycled petrodollars into loans that fed the 1980s debt crisis, and because the whole scheme rested on a form of question-begging that could never actually be implemented without a supranational redistributive authority no state would accept."
      },
      {
        "name": "Lawson",
        "work": "\"'The Pacific Way' as Postcolonial Discourse: Towards a Reassessment\", Journal of Pacific History (2010)",
        "claim": "Lawson argues that the phrase 'the Pacific Way', coined by Fiji's Ratu Sir Kamisese Mara in his 1970 UN speech, was in its original formulation not an anti-colonial or postcolonial discourse at all, but a conservative one rooted in values shared by colonial and chiefly elites.",
        "detail": "Lawson shows Mara's own speeches and memoirs express warmth and loyalty toward the British Crown and Empire, and that Mara himself had opposed rapid decolonization and resisted extending full political rights to Indo-Fijians. It was academic Ron Crocombe's later (1976) reinterpretation - which cast the colonial experience as a shared 'humiliation' for all Pacific islanders regardless of their actual histories - that gave the Pacific Way its more critical, anti-colonial 'postcolonial' edge in subsequent decades."
      },
      {
        "name": "South Commission (chaired by Nyerere)",
        "work": "The Challenge to the South: The Report of the South Commission (1990)",
        "claim": "The Commission argues that although the South achieved real economic growth between 1950 and 1980, this growth did not fundamentally alter its subordinate, dependent position within the world economy, nor did it reduce structural inequality within Southern countries.",
        "detail": "The Report credits the 1955 Bandung Conference with 'sowing the seeds' of the Non-Aligned Movement, and documents the South's continued scientific and technological dependence on the North, a broad move away from popular participation toward militarization and authoritarian rule in many newly independent states, and rising military spending (25 per cent of world military expenditure by 1980) as key factors undercutting the promise of independence."
      }
    ],
    "tf": [
      {
        "id": "q1",
        "q": "True or false: according to Acharya, the delegates at the Bandung Conference saw human rights and state sovereignty as fundamentally opposed to one another.",
        "answer": false,
        "explanation": "False. Acharya argues there was no perceived contradiction between human rights and sovereignty/nonintervention at Bandung. Nonintervention was invoked to protect newly independent states from great-power interference and neocolonialism, not to shield domestic human rights abuses. Nehru, the conference's main proponent of nonintervention, was also its severest critic of other delegates' poor human rights records, showing the two norms were treated as complementary rather than opposed."
      },
      {
        "id": "q2",
        "q": "True or false: according to Acharya, the Bandung Conference's final compromise language on human rights declared full support for the UN Charter's human rights principles while only 'taking note of' the Universal Declaration of Human Rights.",
        "answer": true,
        "explanation": "True. Because nine of the 29 participants were not yet UN members and had not necessarily studied the UDHR, the Political Committee could not simply adopt it outright. The eventual compromise wording declared 'full support' for the human rights principles in the UN Charter but merely 'took note of' the UDHR as 'a common standard of achievement for all peoples and all nations'."
      },
      {
        "id": "q3",
        "q": "True or false: according to Acharya, non-Western states at the Bandung Conference acted mainly as 'norm takers', passively absorbing norms of human rights and sovereignty that had already been defined by the West.",
        "answer": false,
        "explanation": "False. Acharya explicitly challenges the 'norm taker/norm wrecker' framing. He argues Bandung's delegates were active 'norm makers' who widened and thickened existing norms - for example extending nonintervention to cover pressure to join Cold War military pacts like SEATO - and who pushed, successfully, for universal UN membership rather than simply accepting the postwar order as given."
      },
      {
        "id": "q4",
        "q": "True or false: the 1974 Declaration on the Establishment of a New International Economic Order called for full and permanent sovereignty of every state over its own natural resources.",
        "answer": true,
        "explanation": "True. Principle 4(e) of the Declaration explicitly affirms 'full permanent sovereignty of every State over its natural resources and all economic activities', including the right to nationalize foreign-owned assets, describing this as an expression of the state's inalienable sovereignty."
      },
      {
        "id": "q5",
        "q": "True or false: according to Rist, the NIEO succeeded in narrowing the economic gap between the industrialized 'centre' and the developing 'periphery'.",
        "answer": false,
        "explanation": "False. Rist states plainly that 'far from closing the gap between centre and periphery, the NIEO actually widened it'. He argues this was because the NIEO defined the centre as the ultimate source of 'development' - through aid, investment, technology and finance - meaning the key to the South's development still lay in the North, which confirmed rather than combated dependence."
      },
      {
        "id": "q6",
        "q": "True or false: according to Rist, one reason the NIEO could never be fully implemented was that the 'Third World' itself fragmented in the mid-1970s into oil-rich states, newly industrializing countries, and least developed countries with no common interest.",
        "answer": true,
        "explanation": "True. Rist lists this fragmentation as the first of four reasons the NIEO was 'stillborn': at the very moment the South was expressing collective demands, it ceased to exist as a unified entity, splitting into ultra-rich oil-exporting states, newly industrializing countries (NICs), and least developed countries (LDCs) with sharply diverging interests."
      },
      {
        "id": "q7",
        "q": "True or false: according to Rist, the 1973-74 OPEC oil price rises marked the first time countries of the Global South had acted together in a way that could seriously disturb the economy of the North.",
        "answer": true,
        "explanation": "True. Rist describes the October 1973 war and the subsequent quadrupling of oil prices by OPEC as an event where, 'for the first time, the countries of the South - albeit the richest among them - were acting together in a way that could seriously disturb the economy in the North', triggering alarm in the industrialized countries."
      },
      {
        "id": "q8",
        "q": "True or false: according to Lawson, the phrase 'the Pacific Way' was originally coined by Ratu Sir Kamisese Mara as an explicitly anti-colonial, postcolonial rallying cry against British rule in Fiji.",
        "answer": false,
        "explanation": "False. Lawson shows that Mara's original 1970 UN speech and later memoirs expressed considerable warmth and loyalty toward the British Crown, and that Mara himself had opposed rapid decolonization and the extension of full political rights to Indo-Fijians. It was Ron Crocombe's later, 1976 reinterpretation - casting colonialism as a shared experience of humiliation for all Pacific islanders - that gave the Pacific Way its more critical, anti-colonial 'postcolonial' character."
      },
      {
        "id": "q9",
        "q": "True or false: the Non-Aligned Movement's guiding stance is sometimes summarised in the lecture as 'friends for all, enemy to none'.",
        "answer": true,
        "explanation": "True. The lecture's concluding slide summarises non-alignment - important to newly independent states during the Cold War - with the phrase 'friends for all, enemy to none', while also noting there was no homogenous developing countries bloc behind it."
      },
      {
        "id": "q10",
        "q": "True or false: according to the South Commission report, economic growth in the South between 1950 and 1980 fundamentally transformed its subordinate position within the world economy.",
        "answer": false,
        "explanation": "False. The report acknowledges genuine GDP growth (averaging around 5-6 per cent per year through the 1960s-70s) and real social gains, but concludes that by the late 1980s the South's countries 'remained poor, subordinate, and powerless' in relation to the world economic system, with structural inequalities largely intact and dependence on Northern science and technology essentially unchanged."
      },
      {
        "id": "q11",
        "q": "True or false: political independence automatically guaranteed economic development for newly independent states, according to this week's material.",
        "answer": false,
        "explanation": "False - this is the central critical theme of the week, captured in the lecture's 'Tale of Three Worlds' framing. Independence delivered formal sovereignty but not automatic development: the NIEO failed to close the North-South gap, the South Commission found continued dependence and inequality after 1980, and the lecture concludes that newly independent states struggled to get their demands heard despite their strength in numbers."
      },
      {
        "id": "q12",
        "q": "True or false: according to Acharya, Jawaharlal Nehru argued at Bandung that one country should not interfere in the political, social or economic affairs of another.",
        "answer": true,
        "explanation": "True. Acharya quotes Nehru's statement at the 22 April 1955 session that 'we should emphasize that one country should not interfere in the internal affairs, be it political, social or economic, affairs of another country', reflecting Nehru's broad conception of nonintervention that extended beyond military aggression to economic and political pressure."
      },
      {
        "id": "q13",
        "q": "True or false: the Group of 77 (G-77), the main negotiating bloc behind NIEO demands at the UN, has kept exactly 77 member states from its founding in 1964 to today.",
        "answer": false,
        "explanation": "False. The G-77 took its name from the 77 founding developing countries that signed the 1964 'Joint Declaration' at the first UNCTAD conference, but its membership grew substantially over subsequent decades even as it retained the original name."
      },
      {
        "id": "q14",
        "q": "True or false: according to Rist, the text of the NIEO explicitly centred 'peoples' as the primary actors and intended beneficiaries of the new economic order.",
        "answer": false,
        "explanation": "False. Rist observes that 'peoples are the great actors missing from the NIEO' - the declaration's language centres sovereign states and their rights (over resources, trade terms, and non-interference), with only marginal and passing mention of 'peoples' or their wellbeing, and no real engagement with internal social conditions within Southern states."
      }
    ]
  },
  {
    "id": "w5",
    "week": 5,
    "title": "Development as Economic Growth: The Modernisation Paradigm",
    "summary": "This week treats development as essentially a problem of economic growth: countries are 'developed' or 'underdeveloped' depending on output and consumption levels, and the job of theory is to explain how the second group becomes the first. Modernisation theory, epitomised by Rostow's Stages of Economic Growth, argues that every society moves through the same linear sequence from a traditional agricultural base to a high mass-consumption, Western-style industrial economy, driven by capital investment, technology transfer and institutional change. Keynesianism supplied the post-war rationale for state and donor intervention (investment plus the multiplier effect), while from the 1970s neoliberalism reversed this, arguing that growth comes from shrinking the state and freeing the market, an approach imposed on indebted Southern states through structural adjustment programmes. The paradigm has been heavily criticised for being ethnocentric, for reading Western industrial society as the universal end-point of history, and for treating 'underdevelopment' as a starting condition to be fixed with outside capital rather than something produced by colonialism and unequal global power relations. This critique of modernisation is the direct set-up for dependency theory, covered next week.",
    "concepts": [
      {
        "term": "Modernisation theory",
        "def": "A development theory holding that all societies progress along a single, linear path from 'traditional' to 'modern' (Western-style, industrial, capitalist) society, and that 'underdeveloped' countries simply need capital, technology and institutions transferred from the West to move along this path.",
        "ex": "Rostow's Stages of Economic Growth (1960) is described by Willis as 'probably the best example' of modernisation theory."
      },
      {
        "term": "Traditional society (Rostow's Stage 1)",
        "def": "The starting stage of Rostow's model: an economy based on subsistence agriculture, pre-Newtonian science and technology, and social organisation around family/clan allegiance rather than the nation-state.",
        "ex": "Willis's US example: pre-nineteenth-century Native American subsistence and hunter-gatherer societies."
      },
      {
        "term": "Preconditions for take-off (Rostow's Stage 2)",
        "def": "The stage in which the infrastructure needed for development begins to be built: savings and investment rates rise above population growth, national institutions and new elites emerge, often triggered by external intrusion (e.g. colonial contact or trade).",
        "ex": "US example: 1815-40, growth of cotton production, the Erie Canal, and early railway networks after independence."
      },
      {
        "term": "Take-off (Rostow's Stage 3)",
        "def": "A short, decisive period of rapid growth triggered by a stimulus (political revolution, technical innovation, or a changing international economic environment), marked by investment/savings rates of 5-10% of national income and the emergence of a substantial manufacturing sector.",
        "ex": "US example: 1843-60, expansion of railways into the Mid-West, inflow of foreign capital, growth of manufacturing in the East (though the American South did not 'take off' until the 1930s)."
      },
      {
        "term": "Drive to maturity (Rostow's Stage 4)",
        "def": "A long stage in which new technology and industries spread throughout the economy, investment/savings reach 10-20% of national income, and the economy diversifies beyond its original leading sectors.",
        "ex": "US example: maturity reached by 1900, with expansion of steel production and rising agricultural productivity."
      },
      {
        "term": "Age of high mass consumption (Rostow's Stage 5)",
        "def": "The final stage of Rostow's model: widespread consumption of durable consumer goods and services, increased welfare spending, and a largely urban, non-agricultural, service-oriented economy — Rostow's operational definition of 'developed'.",
        "ex": "US example: from 1913-14 with the introduction of Ford assembly lines and mass car ownership."
      },
      {
        "term": "Keynesianism (in development)",
        "def": "Following John Maynard Keynes (1936), the view that free markets alone will not guarantee growth or full employment, and that government intervention — especially real investment in new infrastructure — drives growth via the multiplier effect.",
        "ex": "The Marshall Plan (1948-52) applied Keynesian logic to European reconstruction, and Roosevelt's 1930s New Deal applied it domestically in the US."
      },
      {
        "term": "Multiplier effect",
        "def": "The process by which an initial investment (government or private) generates direct job creation, which leads to increased local spending, indirect job creation, and further demand for goods and services, in principle in a positive feedback loop.",
        "ex": "Keynes argued the effect could also run in reverse: falling investment triggers a downward spiral into economic crisis."
      },
      {
        "term": "Neoliberalism",
        "def": "An economic philosophy, ascendant from the 1970s-80s, holding that development and growth are best achieved by reducing state intervention and allowing the market to set prices, wages and resource allocation, echoing Adam Smith's 'invisible hand'.",
        "ex": "David Harvey (2005) describes neoliberalism as 'the intensification of the influence and dominance of capital' and a project to restore the power of economic elites; Thatcher (UK) and Reagan (US) are cited as key political champions."
      },
      {
        "term": "Structural adjustment programmes (SAPs)",
        "def": "Packages of stabilisation measures (e.g. currency devaluation, wage freezes, cuts to government spending) and adjustment measures (privatisation, trade liberalisation, removal of subsidies) imposed by the IMF/World Bank on indebted Southern governments as a condition of continued lending, from the late 1970s.",
        "ex": "In Jamaica, SAP-linked cuts to government social spending (1979/80-1985/6) coincided with rising infant malnutrition, falling school pass rates, and poverty rising from 45.5% (1989) to 54.5% (1996)."
      },
      {
        "term": "Economic growth vs. development",
        "def": "Economic growth is narrowly defined as an increase in the production of goods and services in a country over time; 'development' as used by modernisation theorists is often reduced to, or equated with, this growth plus the modernisation of institutions and society.",
        "ex": "The lecture's closing question challenges this equation: does 'modernisation' necessarily mean 'Westernisation', and is growth alone sufficient for development?"
      },
      {
        "term": "GDP / GNP per capita as a development measure",
        "def": "Gross Domestic Product is the total market value of all final goods and services produced within a country in a given period; GDP/GNP per capita has been the standard proxy used by modernisation and neoliberal approaches to rank and compare countries' 'level of development'.",
        "ex": "The lecture uses 2025 Pacific Island GDP figures (e.g. Papua New Guinea $48bn vs. Tuvalu $54.8m) to illustrate the scale of measured economic difference in the region."
      },
      {
        "term": "Washington Consensus",
        "def": "A term coined by John Williamson (1990) for the package of neoliberal policy reforms (fiscal discipline, trade and financial liberalisation, privatisation, deregulation) that Washington-based institutions (IMF, World Bank, US Treasury) promoted for Latin America and, later, more widely — often used as shorthand for 'market fundamentalism'.",
        "ex": "Williamson (2000) himself notes the term became used as 'a synonym for market fundamentalism' beyond its original, narrower meaning."
      },
      {
        "term": "Dual-sector (structural change) model / industrialisation by invitation",
        "def": "W. Arthur Lewis's model of a developing economy split into a low-productivity 'traditional' subsistence sector and a capitalist 'modern' sector; development occurs as surplus rural labour migrates into the modern sector, financed partly by inviting foreign capital investment.",
        "ex": "Lewis (1955) termed the policy of attracting foreign firms to invest in domestic industry 'industrialization by invitation' — later criticised for fostering dependence."
      },
      {
        "term": "Good governance (as development conditionality)",
        "def": "A set of conditions attached to IMF/World Bank/donor lending from the 1990s, originally focused on public-sector reform and transparency (reducing corruption, improving budget management) and later expanded to include multi-party elections, press freedom and human rights.",
        "ex": "The Heavily Indebted Poor Countries (HIPC) initiative (1996) ties debt relief to governance reforms and the Poverty Reduction Strategy Paper (PRSP) process."
      }
    ],
    "theorists": [
      {
        "name": "Rostow (Walt Whitman Rostow)",
        "work": "The Stages of Economic Growth: A Non-Communist Manifesto (1960)",
        "claim": "Rostow argued that all societies can be classified into one of five sequential stages of economic growth — traditional society, preconditions for take-off, take-off, drive to maturity, and age of high mass consumption — with development consisting of moving through these stages, ending in a Western-style mass-consumption economy achieved within a capitalist (non-communist) framework.",
        "detail": "Rostow used the analogy of an aeroplane accelerating down a runway until 'take-off' into self-sustaining growth. Although he claimed in his introduction to be highlighting the 'uniqueness of each nation's experience', he opens Chapter 2 by asserting 'it is possible to identify all societies... as lying within one of five categories' (1960: 4), and supplied a table dating when different countries (mainly the US) reached each stage — implying a single, universal, comparable path. Willis (2011) calls this 'probably the best example' of modernisation theory; it treats the Western historical experience (especially the US) as the model and end-point for all 'less developed' countries, and locates development-making at the national-state scale."
      },
      {
        "name": "Keynes (John Maynard Keynes)",
        "work": "The General Theory of Employment, Interest and Money (1936)",
        "claim": "Keynes argued that the free market does not automatically self-correct toward full employment or growth, and that real government/private investment in new infrastructure is the key driver of growth via the 'multiplier effect', giving the state a central, active role in the economy.",
        "detail": "Keynes wrote in response to the 1929 Wall Street Crash and Great Depression, not specifically about Southern/underdeveloped economies, but his ideas underpinned post-war development interventions such as the Marshall Plan (1948-52) and were echoed in Truman's 1949 call for the US to share technical knowledge with poorer regions. Keynesian logic — that investment creates jobs, which creates local spending, which creates further jobs and demand — justified the strong role of the state and multilateral bodies (IMF, World Bank) in post-war development planning, before this was challenged by neoliberalism from the 1970s."
      },
      {
        "name": "Lewis (W. Arthur Lewis)",
        "work": "'Economic Development with Unlimited Supplies of Labour' (1954) / 'Industrialization of the British West Indies' (1955)",
        "claim": "Lewis argued that 'underdeveloped' economies are dualistic — split between a non-profit 'traditional' subsistence sector and a capitalist 'modern' sector — and that development occurs as surplus rural labour migrates into the modern sector, financed in part through 'industrialization by invitation' (attracting foreign capital).",
        "detail": "Because rural areas held large amounts of 'surplus' (under/unemployed) labour, Lewis argued modern-sector wages would stay low until that surplus was absorbed, driving continued rural-urban migration. His model has been criticised (Lal 1985) for assuming static wages under surplus labour, and for underrating the subsistence sector's own contribution to development; 'industrialization by invitation' has also been criticised for encouraging dependence on foreign capital — a direct anticipation of dependency-theory concerns."
      },
      {
        "name": "Hirschman (Albert Hirschman)",
        "work": "The Strategy of Economic Development (1958)",
        "claim": "Hirschman argued that spatially unbalanced growth — concentrating industrial development in 'growth poles' rather than spreading it evenly — is actually a desirable and efficient part of the development process, since benefits would eventually spread outward from these poles.",
        "detail": "Drawing on his experience in Latin America, Hirschman held that polarisation around growth poles would reduce over time as development effects diffused outward. Willis notes that, like Rostow, his model still assumes an underlying 'route of progression' toward modernisation on the Western pattern, even while allowing that poorer countries might need different specific approaches."
      },
      {
        "name": "Myrdal (Gunnar Myrdal)",
        "work": "Economic Theory and Underdeveloped Regions (1957)",
        "claim": "Myrdal argued, via the concept of 'cumulative causation', that free-market growth in one region draws people, resources and capital away from other regions ('backwash effects'), and that — unlike Hirschman — this spatial polarisation would not automatically self-correct without state planning.",
        "detail": "Myrdal did allow for limited 'spread effects' benefiting neighbouring regions, but argued the dominant tendency of unmanaged markets was a 'vicious cycle' of regional decline outside core growth areas. He advocated strong, efficient state planning to counter this, terming ineffective governments 'soft states', though he offered no detailed route to build such state capacity. Willis notes his continued faith in top-down technocratic planning fits the pattern that post-development critics would later call Eurocentric, even as he criticised leaving development purely to the market."
      },
      {
        "name": "Smith (Adam Smith)",
        "work": "An Inquiry into the Nature and Causes of the Wealth of Nations (1776)",
        "claim": "Smith argued against mercantilist protectionism, holding that economic growth and general prosperity (not just merchant wealth) are best achieved through division of labour and a self-regulating market — the 'invisible hand' — rather than state control.",
        "detail": "Smith's laissez-faire, market-centred vision of production and self-interested exchange is the classical antecedent of both Keynesian-era liberal economics and, more directly, the neoliberal 'counter-revolution' of the 1970s-80s, which explicitly revived his emphasis on markets over state intervention (Willis 2011)."
      },
      {
        "name": "Harvey (David Harvey)",
        "work": "A Brief History of Neoliberalism (2005)",
        "claim": "Harvey argues that neoliberalism is not a neutral economic technique but a political project: 'the intensification of the influence and dominance of capital... an ethic, a set of political imperatives, and a cultural logic', aimed at restoring the class power of economic elites.",
        "detail": "Quoted directly in the Week 5 lecture slides, Harvey frames neoliberalisation as, from the outset, 'a project to achieve the restoration of class power... to restore the power of economic elites' rather than a value-neutral pursuit of efficiency. This is used in the course to frame a critical reading of neoliberal development policy (including structural adjustment) as serving particular interests rather than universal development."
      },
      {
        "name": "Escobar (Arturo Escobar)",
        "work": "Encountering Development: The Making and Unmaking of the Third World (1995)",
        "claim": "Escobar argues that Truman's 1949 inaugural speech (calling for the transfer of Western technical knowledge to relieve the suffering of the world's poor) marks the starting point of a Eurocentric 'development' discourse that constructed the non-industrialised world as a deficient 'Third World' in need of Western intervention.",
        "detail": "For Escobar, the North-to-South sharing of technical know-how celebrated by Truman and later modernisation theorists represents a single, imposed path of progress that fails to recognise the diversity of Southern societies and the actual needs of local populations. Willis uses Escobar to introduce the post-development critique of the whole economic-growth/modernisation paradigm, directly anticipating the ethnocentrism critique central to this week's focus."
      },
      {
        "name": "Willis (Katie Willis)",
        "work": "Theories and Practices of Development, 2nd edn, Chapter 2: 'Modernization, Keynesianism and neoliberalism' (2011)",
        "claim": "Willis's organising argument is that modernisation theory, Keynesianism and neoliberalism are all market/growth-centred development theories that share the assumption that Southern countries should follow the same broad development path already taken by the North, differing mainly on how large a role the state should play in getting there.",
        "detail": "Willis traces a shift from state-led, Keynesian-influenced post-war development planning (aid, infrastructure, Bretton Woods institutions) to the neoliberal 'counter-revolution' from the 1970s (reduced state role, structural adjustment, the Washington Consensus), and shows each phase attracted serious criticism — Keynesian/modernisation approaches for Eurocentrism and top-down technocracy, neoliberal SAPs for worsening poverty and inequality (e.g. Jamaica) despite promising growth."
      }
    ],
    "tf": [
      {
        "id": "q1",
        "q": "In Rostow's model, the final stage of economic growth is the 'Age of High Mass Consumption'.",
        "answer": true,
        "explanation": "True. Rostow's five stages run: traditional society, preconditions for take-off, take-off, drive to maturity, and finally the age of high mass consumption. This final stage is defined by widespread consumption of durable consumer goods and services, a largely urban and non-agricultural economy, and expanded welfare spending. Rostow effectively used this stage as his operational definition of 'developed'. It represents the end-point of the single linear path he believed all economies could follow."
      },
      {
        "id": "q2",
        "q": "Rostow's stages-of-growth model claims that all societies follow fundamentally different, non-comparable paths to development, with no common underlying sequence.",
        "answer": false,
        "explanation": "False. Although Rostow's introduction claims to stress 'the uniqueness of each nation's experience', he opens Chapter 2 by stating 'it is possible to identify all societies... as lying within one of five categories', and he tabulates when different countries reached each stage. This reveals the model's real assumption: a single, universal, linear sequence of development that every country moves through, using Western (especially US) history as the template — exactly the assumption that later critiques of modernisation theory (and dependency theorists) attack as false and Eurocentric."
      },
      {
        "id": "q3",
        "q": "A central assumption of modernisation theory is that 'underdeveloped' countries mainly need capital, technology and institutions transferred from the West in order to develop.",
        "answer": true,
        "explanation": "True. This is the core policy logic behind modernisation theory: poorer countries are seen as simply 'lagging behind' on a shared path, lacking capital, technology, and appropriate institutions, which the industrialised North can supply through aid, investment, and technical assistance. Truman's 1949 speech ('the key to greater production is a wider and more vigorous application of modern scientific and technical knowledge') exemplifies this logic, and 1950s-60s aid was indeed channelled into industrial projects, agricultural technology, and large infrastructure schemes on this basis."
      },
      {
        "id": "q4",
        "q": "Rostow's book was subtitled 'A Non-Communist Manifesto', signalling that his model of development was framed as taking place within a capitalist rather than communist system.",
        "answer": true,
        "explanation": "True. Rostow's full title is The Stages of Economic Growth: A Non-Communist Manifesto (1960). The subtitle was a deliberate ideological positioning during the Cold War: Rostow was explicitly proposing his stages as the capitalist alternative to communist paths to industrialisation, reinforcing that modernisation theory was not a neutral economic model but was tied to a specific geopolitical and ideological project of the period."
      },
      {
        "id": "q5",
        "q": "In Rostow's model, the 'Preconditions for Take-off' stage is characterised by widespread consumption of durable consumer goods.",
        "answer": false,
        "explanation": "False. Widespread consumption of durable consumer goods characterises the final stage, the 'Age of High Mass Consumption', not the preconditions stage. 'Preconditions for take-off' instead involves savings and investment rates rising above population growth, the emergence of national-level institutions and new elites, and infrastructure-building, often triggered by external intrusion — this is an early, foundational stage, well before mass consumption becomes possible."
      },
      {
        "id": "q6",
        "q": "One major critique of modernisation theory is that it treats 'underdevelopment' as an original, backward starting condition rather than something historically produced, for example through colonialism.",
        "answer": true,
        "explanation": "True. Modernisation theory implicitly treats all countries as starting from the same 'traditional' baseline and simply needing to catch up, rather than asking how some countries became wealthy partly through colonial extraction from others. Critics (echoed in the set-up for next week's dependency theory) argue this ignores that 'underdevelopment' in the Global South was actively produced by colonial relationships and unequal integration into the world economy, not just a natural starting point awaiting modernisation."
      },
      {
        "id": "q7",
        "q": "Keynes argued that government intervention and real investment, rather than the free market alone, were key to driving economic growth and employment.",
        "answer": true,
        "explanation": "True. In The General Theory (1936), written in response to the Great Depression, Keynes broke from classical free-market economics by arguing that real investment (in new, not replacement, infrastructure) drives growth through the 'multiplier effect' — direct job creation leading to increased spending, indirect job creation, and further demand. He argued governments should actively intervene (via monetary policy or direct expenditure) rather than leaving outcomes to the market alone, as seen in Roosevelt's New Deal and the post-war Marshall Plan."
      },
      {
        "id": "q8",
        "q": "Neoliberalism, as covered in this course, calls for an expanded role for the state in directing economic development.",
        "answer": false,
        "explanation": "False. Neoliberalism argues the opposite: that state involvement in the economy creates inefficiency, and that development and growth are best achieved by reducing state intervention and letting the market set prices and wages. This is the direct reverse of the Keynesian approach that dominated the immediate post-war period, and it underpinned the shift toward structural adjustment programmes, which explicitly aimed to shrink the state's economic role in indebted Southern countries."
      },
      {
        "id": "q9",
        "q": "Structural adjustment programmes (SAPs) were typically imposed on Southern governments as a condition for continued financial support from the IMF and World Bank.",
        "answer": true,
        "explanation": "True. Following the debt crisis of the 1980s (triggered by Mexico's 1982 default), the IMF and World Bank made continued lending conditional on governments adopting SAPs, combining short-term 'stabilization' measures (currency devaluation, wage freezes, spending cuts) with longer-term 'adjustment' measures (privatisation, trade liberalisation, removal of subsidies). This reflected the market-centred, neoliberal philosophy of the era and demonstrated how policies developed in the North (echoing Thatcher- and Reagan-era economics) could be imposed on Southern nations as a precondition of aid."
      },
      {
        "id": "q10",
        "q": "A core critique of modernisation theory is that it is ethnocentric, treating Western industrialised society as the universal model and end-point of 'development'.",
        "answer": true,
        "explanation": "True. Rostow's model, and modernisation theory more broadly, measures 'development' against a Western template — urbanisation, industrialisation, mass consumption — and assumes non-Western societies must shed 'traditional' practices to converge on this single model. Critics (including post-development theorists like Escobar) argue this fails to recognise the diversity of Southern societies, imposes a Eurocentric definition of progress, and equates 'modernisation' too readily with 'Westernisation' — a tension the Week 5 lecture explicitly flags in its closing discussion questions."
      },
      {
        "id": "q11",
        "q": "Rostow's stages-of-growth model located development planning and policy-making primarily at the level of individual local communities rather than the nation-state.",
        "answer": false,
        "explanation": "False. Willis notes that the stages-of-growth model conceived of development and policy-making as taking place within state boundaries at a national scale, with the nation-state assumed to be the appropriate unit for pursuing and measuring development (e.g. via national savings/investment rates and national income). This national-scale framing is itself part of what later critiques challenge, since it downplays global/international structures shaping a country's prospects — the very structures dependency theory foregrounds."
      },
      {
        "id": "q12",
        "q": "In Rostow's model, the 'Take-off' stage is triggered by a stimulus such as a political revolution, technical innovation, or a changing international economic environment.",
        "answer": true,
        "explanation": "True. Rostow argued take-off required a specific stimulus to shift the economy into rapid, self-sustaining growth — examples include political revolution, technical innovation, or shifts in the international economic environment. During take-off, investment and savings rates reach roughly 5-10% of national income, a substantial manufacturing sector emerges, and appropriate institutions (e.g. banking systems) develop, as in Willis's US example of 1843-60 railway expansion and manufacturing growth in the East."
      },
      {
        "id": "q13",
        "q": "According to the Week 5 lecture's concluding discussion, most scholars now agree that economic growth and the 'modernisation' of society are entirely unrelated to each other.",
        "answer": false,
        "explanation": "False. The lecture's concluding slide states that 'many still think that development requires at least a certain amount of economic growth together with modernization of society' — i.e. the two are still widely seen as linked, not unrelated. The lecture instead raises open questions about what 'modernisation' actually means (whether it is necessarily opposed to 'tradition', and whether it necessarily equals 'Westernisation'), rather than claiming growth and modernisation are disconnected."
      },
      {
        "id": "q14",
        "q": "The 1993 World Bank report The East Asian Miracle was later criticised for underplaying the significant role that government intervention (not just free markets) played in East Asian countries' economic success.",
        "answer": true,
        "explanation": "True. While the World Bank presented East Asian growth as proof that neoliberal, market-opening policies deliver development, critics such as Amsden (1994) pointed out that countries like Hong Kong, South Korea and Taiwan achieved success partly through significant state intervention and protectionist policies (e.g. around Hong Kong's textile industry), which the report largely omitted. This is a useful comparative point for the modernisation/neoliberalism-vs-dependency debate, since it shows even the paradigm's own flagship 'success story' required qualification."
      }
    ]
  },
  {
    "id": "w6",
    "week": 6,
    "title": "Continuing Dependencies: The Politics of Foreign Aid",
    "summary": "Where Week 5 asked whether growth and modernisation lead to development, Week 6 asks why that growth paradigm has not delivered development everywhere, and looks at the critics. Dependency theory argues that Global South 'underdevelopment' is not a starting point countries simply haven't grown out of yet, but was actively produced, and is still being maintained, by colonial and ongoing economic relationships with wealthy 'core' countries. The lecture then turns to foreign aid as one of the mechanisms said to keep this dependency going, asking who gives aid, who receives it, and whether aid actually reduces poverty or just creates new debts and dependencies. The Pacific is used as the running case study, since it receives the highest per-capita aid of any region in the world, raising the lecture's closing question of who Pacific states are actually dependent on.",
    "concepts": [
      {
        "term": "Dependency theory",
        "def": "A body of Latin American-originated theory (dependistas) holding that 'underdevelopment' in poorer countries is not backwardness but a position produced by their place within the capitalist world economy, where core industrialised countries develop through exploiting non-industrialised peripheral countries.",
        "ex": "Contrast with modernisation theory and classical Marxism, which saw non-industrialised countries as simply further behind on the same development ladder; dependency theorists said the ladder itself was rigged."
      },
      {
        "term": "Core-periphery",
        "def": "A model of the global economy dividing countries into wealthy, industrialised 'core' states and poorer, resource/labour-exporting 'peripheral' states, linked by flows of resources outward from the periphery and manufactured goods back to it.",
        "ex": "The Week 6 lecture diagram shows resources flowing from periphery to core and goods flowing back, with a 'semi-periphery' layer in between (Wallerstein's addition)."
      },
      {
        "term": "Development of underdevelopment",
        "def": "Andre Gunder Frank's phrase for the idea that Latin American underdevelopment was not a natural or original condition but was itself historically produced by the same capitalist process that produced development in Europe and North America.",
        "ex": "Frank: contemporary underdevelopment is 'in large part the historical product of past and continuing economic and other relations between the satellite underdeveloped and the now developed metropolitan countries.'"
      },
      {
        "term": "World-systems theory",
        "def": "Immanuel Wallerstein's (1974) extension of dependency ideas, dividing the world into three groups - core, semi-periphery, periphery - with countries able to move between categories over time as the global economy changes, rather than being permanently fixed.",
        "ex": "The 'semi-periphery' category was added to account for newly-industrialising countries (NICs) like the Asian Tigers, which dependency theory's rigid core/periphery split could not explain."
      },
      {
        "term": "Structuralism (ECLA/CEPAL)",
        "def": "An approach associated with the UN Economic Commission for Latin America (ECLA), led by Raul Prebisch, arguing that the global free-trade system itself (not a lack of effort) obstructed Latin American development, because the global economic structure Latin America faced was different from the one Europe industrialised within.",
        "ex": "ECLA still accepted industrialisation/urbanisation as the goal of development, but argued the path to it had to differ from the Eurocentric model because global conditions had changed."
      },
      {
        "term": "Import-substitution industrialization (ISI)",
        "def": "A structuralist policy of protecting domestic 'infant' industries from foreign competition using tariff barriers, so they can establish themselves without being undercut by cheaper, more efficient foreign firms.",
        "ex": "Brazil's ISI (1940s onward) achieved 12% annual manufacturing growth 1965-73, but ISI generally stalled from limited domestic demand and the need to import machinery, prompting a shift to export-oriented industrialisation in the 1970s-80s."
      },
      {
        "term": "Neo-Marxism",
        "def": "1950s-60s reworking of Marxist theory (Paul Baran, Paul Sweezy) applied to mid-twentieth-century conditions, arguing capitalism had entered a stage of 'monopoly capitalism' in which large firms exploited poorer regions, and that decolonisation alone did not end this exploitation.",
        "ex": "Baran argued peripheral governments should intervene to stop development funds being siphoned out as profit; where they couldn't or wouldn't, the only solution was to leave the world capitalist system for state-socialism - an idea that fed directly into dependency theory."
      },
      {
        "term": "Boomerang aid",
        "def": "A term (used by economist Helen Hughes and Australian NGO AID/WATCH in its 'Australian Aid: The Boomerang Effect' reports) for the phenomenon where a large share of the aid money donor countries send to recipients does not actually stay with or benefit the recipient population, but flows back to benefit consultants, contractors and companies from the donor country itself.",
        "ex": "AID/WATCH found the GRM company (owned by an Australian billionaire) held nearly A$200 million in AusAID contracts in 2003/04, a quarter of it for work in Papua New Guinea - money that circulated back to an Australian firm rather than PNG's poor."
      },
      {
        "term": "Tied aid",
        "def": "Aid given on the condition that the recipient country spends it on goods, services or contractors from the donor country, rather than sourcing them wherever is cheapest or most useful - closely related to, and one mechanism producing, 'boomerang aid'.",
        "ex": "Hulme notes it is often hard to tell whether aid is genuinely concessional or is really tied commercial finance dressed up as aid; untying aid is repeatedly cited (Riddell) as a basic 'good practice' reform."
      },
      {
        "term": "Structural Adjustment Lending (SAL)",
        "def": "A form of World Bank lending introduced in 1980 (alongside its traditional project lending) that attached general economy-wide policy conditions - such as spending cuts, privatisation, trade liberalisation - to loans, rather than conditions tied only to a specific funded project.",
        "ex": "Hayter found that despite McNamara-era rhetoric of 'redistribution with growth' and a 'poverty orientation', SAL conditions in practice enforced orthodox stabilisation, ended land reform programmes, and pushed privatisation and import liberalisation."
      },
      {
        "term": "Conditionality",
        "def": "The attachment of policy conditions ('strings attached') to aid or loans, requiring recipient governments to adopt specific economic or political reforms in exchange for funding.",
        "ex": "Hayter's research documented World Bank/IMF 'leverage' and 'dialogue' with governments (e.g. pressuring Colombia to devalue its currency in the 1960s) as euphemisms for conditionality in practice."
      },
      {
        "term": "Official Development Assistance (ODA)",
        "def": "Finance provided by a donor country/institution to a recipient country as a grant or concessional (below-market-rate) loan; can be bilateral (government to government) or multilateral (via an institution like the World Bank or UN).",
        "ex": "The 1970 UN target for rich nations was 0.7% of gross national income; actual ODA has typically sat around 0.2-0.3%, well below this target."
      },
      {
        "term": "Aid dependency",
        "def": "A situation where a recipient country's budget, services or economy become structurally reliant on continued aid inflows, which can weaken incentives to develop domestic revenue, institutions or industries of its own.",
        "ex": "Kingsbury cites Liberia, where aid has constituted as much as 80% of the national budget; Moyo describes a 'vicious cycle of aid' that chokes off investment and entrenches dependency and corruption."
      },
      {
        "term": "Absorptive capacity",
        "def": "The capacity of a recipient country or institution to productively accept, distribute and use aid, capital or technical assistance; beyond a certain threshold, additional aid can strain government capacity rather than help.",
        "ex": "Kingsbury: relief goods can pile up at wharves for lack of logistics, or technology can sit idle for lack of trained operators, when absorptive capacity is exceeded."
      },
      {
        "term": "Delinking",
        "def": "The policy prescription, favoured by the more Marxist wing of dependency theorists (especially Frank), that peripheral countries should withdraw from or reduce engagement with the world capitalist system entirely, since within that system the periphery would always be exploited.",
        "ex": "Frank pointed to periods when Latin America was less engaged with the global economy (e.g. WWII) as periods when local development was strongest - used as evidence for delinking."
      },
      {
        "term": "Unequal terms of trade",
        "def": "The structuralist/dependency claim that the prices peripheral countries get for their raw-material exports fall relative to the price they pay for manufactured imports from the core, systematically transferring value from periphery to core through ordinary trade.",
        "ex": "This is the economic mechanism behind Prebisch's argument that free trade, far from helping Latin America catch up, structurally worked against it."
      }
    ],
    "theorists": [
      {
        "name": "Andre Gunder Frank",
        "work": "The Development of Underdevelopment / Capitalism and Underdevelopment in Latin America (1967, 1974)",
        "claim": "Frank argued that Latin American underdevelopment was not a natural or earlier stage of progress but was itself produced, historically, by centuries of capitalist exchange relations with the 'metropolitan' developed core.",
        "detail": "Using Chile and Brazil, Frank traced 'chains of dependency' running from exploited peasants, through local landowners and merchants, up to national elites, and finally out to the European/US core, with surplus value extracted at every link. He defined capitalism as production for market exchange and argued that within this system the periphery would always be exploited and marginalised, so the only real solution was to leave the capitalist system altogether. He also observed that Latin American development was strongest precisely when the region was least integrated into the world economy (e.g. during WWII)."
      },
      {
        "name": "Raul Prebisch",
        "work": "ECLA/CEPAL structuralism (Prebisch 1959)",
        "claim": "As executive secretary of the UN's Economic Commission for Latin America, Prebisch argued that following free-trade prescriptions would not raise Latin American growth or living standards, because the global trading structure itself acted as an obstacle to peripheral development.",
        "detail": "Prebisch argued the global economic structure facing Latin America in the twentieth century was fundamentally different from the one Europe industrialised within, so Latin America could not simply repeat the European path. His structuralist solution was state-led import-substitution industrialization (ISI) and land reform, protecting domestic industry with tariffs rather than opening fully to foreign competition - a 'reformist' rather than revolutionary response to dependency."
      },
      {
        "name": "Immanuel Wallerstein",
        "work": "World-systems theory (1974)",
        "claim": "Wallerstein argued that the global capitalist system, dating from the 15th-16th centuries, structures countries into three hierarchical positions - core, semi-periphery, and periphery - and that a country's position (and its development prospects) depend on its place in this global system, not just domestic factors.",
        "detail": "Unlike classical dependency theory's static core/periphery split, Wallerstein allowed countries to move between categories over time (e.g. Spain declining from core to semi-periphery historically; the Asian Tiger NICs rising into the semi-periphery in the twentieth century). Critics (e.g. Thomas Klak) argue world-systems theory is better described as a descriptive perspective than a testable, predictive theory."
      },
      {
        "name": "Walter Rodney",
        "work": "How Europe Underdeveloped Africa (1972)",
        "claim": "Rodney extended dependency-style analysis from Latin America to Africa, arguing that European intervention in African social, economic and political life throughout the nineteenth century actively created a situation of dependency and impoverishment, rather than bringing development.",
        "detail": "This continues the argument Rodney is associated with in Week 3 on colonialism: Africa's 'underdevelopment' was not its starting condition but was produced by the colonial relationship itself - extraction of resources and labour for the benefit of European economies. Samir Amin (1974) made a related argument for Africa, focusing specifically on the economic extraction of primary products."
      },
      {
        "name": "Samir Amin",
        "work": "Accumulation on a World Scale (1974)",
        "claim": "Amin applied a dependency-style analysis to Africa, arguing that African underdevelopment resulted from economic processes of exploitation, particularly the extraction of primary products for the benefit of core economies.",
        "detail": "Amin's argument runs parallel to Rodney's but is framed more in classic neo-Marxist/dependency economic terms, emphasising the structural role of primary-commodity extraction in tying African economies into a subordinate position in the world economy."
      },
      {
        "name": "David Booth",
        "work": "Marxism and Development Sociology (1985) - critique of dependency theory",
        "claim": "Booth criticised Frank's dependency framework as circular, because Frank defined 'capitalist development' as 'autonomous industrial growth' - a definition that makes it inevitable, by construction, that capitalist development will appear most successful exactly when a country's ties to the global economy are weakest.",
        "detail": "This is one of the two main lines of criticism of dependency theory (alongside the empirical challenge from the growth of the Asian NICs): Booth argued the internal logic of Frank's definitions discredits his conclusions before any evidence is even examined, since the theory is built to confirm itself."
      },
      {
        "name": "Teresa Hayter",
        "work": "Aid as Imperialism (1971); Aid: Rhetoric and Reality (1985, with C. Watson)",
        "claim": "Based on first-hand research inside the World Bank, IMF and USAID, Hayter concluded that the real purpose of foreign aid is to serve the economic interests of major capitalist powers (especially the USA) and their corporations and banks, not to develop poor countries - and that the World Bank's claims to political neutrality have no foundation in reality.",
        "detail": "Hayter documented World Bank/IMF pressure on governments (e.g. Colombia, Peru, Chile) to devalue currencies, cut public spending, end land reform, liberalise imports and privatise, often overriding domestic reformist governments; lending was cut off to states that nationalised assets or pursued socialist policies (e.g. Allende's Chile), while continuing for dictatorships (e.g. Pinochet's Chile, and Brazil after its 1964 coup) that adopted orthodox 'monetarist' policies. Her original World Bank-commissioned report was suppressed by the ODI and the Bank before being published independently by Penguin."
      },
      {
        "name": "David Hulme",
        "work": "Should Rich Nations Help the Poor? (2016)",
        "claim": "Hulme surveys the polarised aid-effectiveness debate - Jeffrey Sachs (aid works, more is needed), William Easterly (aid mostly fails, less aid/more effectiveness needed), and Dambisa Moyo (aid is actively destructive and should be stopped) - and argues the more useful question is not whether aid 'works' on average but which forms of aid work, in which countries, and why.",
        "detail": "Hulme highlights that ODA (around 0.3% of rich nations' GNI) remains well below the long-promised 0.7% target; that aid outcomes depend heavily on recipient-country politics and state capacity, not just aid volume or technical design; and that good practice includes untying aid, giving cash directly to poor people, reducing policy conditionality, and letting recipient governments set their own economic policy. He also stresses that donor self-interest (commercial, geopolitical, diplomatic) has always shaped who receives aid and how much, alongside genuine humanitarian motives."
      },
      {
        "name": "Jason Hickel",
        "work": "'Enough of aid - let's talk reparations' (The Guardian, 2015)",
        "claim": "Hickel argues that the entire 'aid' framing of rich-poor relations is misleading, because it implies wealthy countries are generously giving something to the Global South, when historically the flow of wealth ran the other way: colonialism actively extracted enormous wealth from colonised regions, funding European/Western development rather than the reverse.",
        "detail": "Hickel gives concrete examples: roughly 100 million kg of silver drained from Latin America by the early 1800s (equivalent to ~$165 trillion today if invested at 5%); up to 222 million hours of forced African slave labour extracted in North America alone; India's share of the world economy falling from 27% to 3% under British rule while up to 29 million Indians died of famine; and China's share falling from 35% to 7% after the Opium Wars. His conclusion - 'Europe didn't develop the colonies. The colonies developed Europe' - reframes development discourse away from charity/aid and towards historical debt and reparations, directly echoing dependency theory's claim that underdevelopment was actively produced, not natural."
      },
      {
        "name": "Helen Hughes",
        "work": "Aid Has Failed the Pacific (CIS Issue Analysis 33, 2003)",
        "claim": "A free-market economist and former World Bank staffer, Hughes argued nearly all aid to the Pacific was harmful (not just poorly delivered), because it funded unproductive public enterprises, bred corruption, and removed governments' incentive to reform; she also named the phenomenon of 'boomerang aid', where aid benefits donor-country consultants and firms rather than recipients.",
        "detail": "Hughes called for aid to be cut or made strictly conditional on Pacific governments adopting free-market reforms (privatisation, individualised land tenure, deregulated labour markets, export-oriented growth). Critics such as Ewan Morris argued her position was economically extreme (most aid-effectiveness research finds a small positive effect of aid, not the large negative effect she claimed), that she ignored donor self-interest and 'boomerang aid' benefiting Australian firms in her own policy prescriptions, and that her 'one size fits all' free-market model ignored how differently-structured economies (e.g. Mauritius) achieved growth without her prescribed rapid liberalisation."
      }
    ],
    "tf": [
      {
        "id": "q1",
        "q": "Dependency theory argues that 'underdevelopment' in the Global South is simply an earlier stage on the same development path that industrialised countries have already completed.",
        "answer": false,
        "explanation": "This is false. Dependency theory explicitly rejects the idea (shared by modernisation theory and classical Marxism) that poorer countries are merely 'further behind' on one universal ladder. Instead, Andre Gunder Frank's 'development of underdevelopment' argues that Northern development and Southern underdevelopment are two outcomes of the very same historical, capitalist process - core industrialisation was achieved partly through exploiting the periphery, so the periphery's poverty is not a starting point it simply hasn't grown out of yet, but an actively produced and maintained condition."
      },
      {
        "id": "q2",
        "q": "Andre Gunder Frank observed that periods when Latin American economies were less integrated into the world capitalist system, such as during the Second World War, tended to be periods of greater local development.",
        "answer": true,
        "explanation": "This is true. Frank used this observation as evidence for his broader claim that integration into the world capitalist system, rather than promoting development, produced and sustained underdevelopment in the periphery. Reduced engagement with the global economy allowed more of the local economic surplus to stay within the region instead of being drained to the 'metropolitan' core, supporting his argument that peripheral countries should ultimately delink from the capitalist world system."
      },
      {
        "id": "q3",
        "q": "'Boomerang aid' refers to food aid that is shipped back to the donor country when the recipient cannot use it before it spoils.",
        "answer": false,
        "explanation": "This is false, and is not what the term means in the course material. 'Boomerang aid' (used by economist Helen Hughes and by the Australian NGO AID/WATCH in its 'Australian Aid: The Boomerang Effect' reports) describes aid money that is nominally given to a recipient country but effectively flows back to the donor country, because it ends up paying donor-country consultants, contractors and firms rather than reaching the recipient population. AID/WATCH documented an Australian company holding nearly A$200 million in AusAID contracts in 2003/04, a quarter of it for Papua New Guinea work - money that circulated back to Australia rather than benefiting PNG's poor."
      },
      {
        "id": "q4",
        "q": "The concept of 'boomerang aid' describes how much of the aid money donor countries direct to recipients can end up benefiting consultants and companies based in the donor country itself.",
        "answer": true,
        "explanation": "This is true and is the correct definition. Helen Hughes named this phenomenon in her critique of Pacific aid, and it is documented empirically by AID/WATCH's reports on Australian aid to Papua New Guinea, where a large share of contracted aid funds went to an Australian-owned company. It is a specific critique of how aid is delivered (via donor-country experts, firms and tied procurement) rather than a critique of aid volumes as such."
      },
      {
        "id": "q5",
        "q": "Raul Prebisch, working for the UN's Economic Commission for Latin America (ECLA), argued that following free-trade principles would allow Latin American economies to naturally catch up with industrialised Europe.",
        "answer": false,
        "explanation": "This is false; Prebisch argued the opposite. He held that the global trading system built on free-trade principles acted as an obstacle to Latin American development, because the global economic structure Latin America faced in the twentieth century was fundamentally different from the one Europe had industrialised within centuries earlier. His prescription was state intervention to protect domestic industry (import-substitution industrialization) rather than free trade."
      },
      {
        "id": "q6",
        "q": "Walter Rodney's How Europe Underdeveloped Africa applied a dependency-style argument to Africa, claiming European intervention through the nineteenth century actively produced African dependency and impoverishment.",
        "answer": true,
        "explanation": "This is true. Rodney argued that European colonial intervention in African economic, social and political life was not a benign 'leg up' but actively created a structure of dependency that impoverished African peoples, extracting value from Africa to benefit European economies. This directly parallels Frank's claim about Latin America, and continues Rodney's argument (introduced in Week 3) that colonialism actively underdeveloped Africa rather than passively leaving it behind."
      },
      {
        "id": "q7",
        "q": "Immanuel Wallerstein's world-systems theory uses the same fixed two-category core/periphery model as classical dependency theory, with countries permanently locked into one category.",
        "answer": false,
        "explanation": "This is false. Wallerstein's key innovation over classical dependency theory was adding a third category, the 'semi-periphery', and allowing countries to move between core, semi-periphery, and periphery over time as global economic conditions change - for example, Spain declining from core to semi-periphery historically, or the Asian Tiger 'newly industrialising countries' rising into the semi-periphery in the late twentieth century. Classical dependency theorists, by contrast, tended to see peripheral countries as more or less permanently locked into exploitation."
      },
      {
        "id": "q8",
        "q": "David Booth criticised Andre Gunder Frank's dependency theory for being circular, since Frank's own definition of 'capitalist development' as 'autonomous industrial growth' guarantees that development will appear strongest exactly when a country's ties to the global economy are weakest.",
        "answer": true,
        "explanation": "This is true and is one of the two main academic critiques of dependency theory covered in the reading (the other being the empirical challenge posed by the economic success of Asian newly-industrialising countries in the 1970s, which undermined the claim that capitalist development was impossible for the periphery). Booth's point was a logical one: by defining capitalist development in a way that requires 'autonomy' from the global economy, Frank's framework was built to confirm his own conclusion regardless of the evidence."
      },
      {
        "id": "q9",
        "q": "Dependency theorists were broadly united in recommending that peripheral countries should open further to foreign investment and free trade in order to escape underdevelopment.",
        "answer": false,
        "explanation": "This is false. Dependency theorists split into two camps on policy: 'reformists' (like Furtado and the ECLA structuralists) wanted reform of the capitalist trade system alongside greater state intervention and protection (e.g. import-substitution industrialization); 'Marxists' or neo-Marxists (like Frank) argued the only real solution was to leave, or 'delink' from, the world capitalist system altogether, since peripheral countries would always be exploited within it. Neither camp recommended simply opening further to foreign investment and free trade - that policy direction is associated with modernisation theory and later neoliberalism, not dependency theory."
      },
      {
        "id": "q10",
        "q": "Teresa Hayter's research concluded that the World Bank and IMF operated as politically neutral institutions serving the development interests of poor and rich countries equally.",
        "answer": false,
        "explanation": "This is false. Hayter's research (including material the World Bank and ODI attempted to suppress before publication) concluded the opposite: that these institutions' claims to political neutrality had no foundation in reality, and that they served the economic interests of major capitalist powers, especially the USA, and the private banks and corporations that funded them. She documented cases where lending continued to right-wing dictatorships pursuing orthodox economic policies (e.g. Pinochet's Chile) while being cut off from elected governments pursuing land reform or nationalisation (e.g. Allende's Chile)."
      },
      {
        "id": "q11",
        "q": "Jason Hickel argues that the framing of rich-country assistance as 'aid' is misleading, and that the historical relationship should instead be understood in terms of reparations owed for wealth extracted through colonialism.",
        "answer": true,
        "explanation": "This is true. Hickel argues that mainstream development narratives erase colonial history and present the West as generously 'giving' to the Global South, when historically enormous wealth (he cites examples such as silver extracted from Latin America and forced labour extracted from enslaved Africans, together worth many trillions of dollars in today's terms) flowed from colonised regions into European economies. His conclusion, 'the colonies developed Europe,' supports reframing the relationship around reparations and historical debt rather than charity."
      },
      {
        "id": "q12",
        "q": "In Hulme's account of the foreign aid debate, Dambisa Moyo argues that rich countries should give substantially more aid in a 'big push' to achieve development targets.",
        "answer": false,
        "explanation": "This is false; that position belongs to Jeffrey Sachs, not Moyo. Hulme presents Sachs as the leading 'aid optimist', arguing a large enough infusion of aid ('big push') could have achieved the Millennium Development Goals. Dambisa Moyo, in Dead Aid, holds the opposite, most extreme anti-aid position discussed by Hulme: she argues aid perpetuates the cycle of poverty and derails growth, and that it should be stopped so that private finance and markets can operate instead."
      },
      {
        "id": "q13",
        "q": "World Bank Structural Adjustment Lending, introduced in 1980, attached general economic policy conditions to loans and in practice mainly enforced orthodox measures such as spending cuts, privatisation and import liberalisation rather than genuine poverty redistribution.",
        "answer": true,
        "explanation": "This is true. Hayter's research on the McNamara-era Bank found that despite rhetoric of 'redistribution with growth' and a stated 'poverty orientation', the actual effects of Structural Adjustment Lending conditions were confined largely to specific projects, while broader policy demands pushed privatisation, import liberalization, and an end to land reform programmes. Less than 2% of total Bank-financed investment in the Third World in the early 1980s went to genuinely 'poverty-oriented' projects, and the poverty-orientation of even those was often limited."
      }
    ]
  },
  {
    "id": "w7",
    "week": 7,
    "title": "Critical Approaches to Development",
    "summary": "Week 7 moves from mainstream growth-and-modernization accounts of development toward critiques of the concept itself. Escobar's post-development critique treats 'poverty' and the 'Third World' not as pre-given facts but as objects constructed through post-1945 development discourse, which organised new forms of expert knowledge and institutional power (the World Bank, UN, IMF) around the problem of underdevelopment. Sen offers a reformulation rather than a rejection of development, arguing it should be judged by the expansion of real freedoms and the removal of 'unfreedoms', not by GNP growth or income alone. Ha-Joon Chang attacks a different strand of mainstream thinking - cultural explanations of why some countries develop and others do not - showing that the same cultural traits (Confucianism, or 'national character') have been read as both cause of success and cause of failure depending on the era, and that causality runs more strongly from economic development to culture than the reverse. Kingsbury's comparison of the Washington Consensus and the Beijing Consensus rounds out the week with a further 'alternative paradigms' angle, showing how China's state-led, corporatist model has challenged neoliberal orthodoxy as the default template for development.",
    "concepts": [
      {
        "term": "Post-development critique",
        "def": "A body of theory (associated with Escobar, Rahnema, Sachs and others) that rejects the premises of mainstream development theory altogether, arguing that 'development' itself is a Western discourse that constructed the Third World as poor and backward in order to justify intervention.",
        "ex": "Distinct from reformist critiques (like Sen's), which try to improve development rather than reject the category."
      },
      {
        "term": "Problematization",
        "def": "A Foucauldian concept Escobar uses to describe how 'poverty' was turned into an object of knowledge and intervention after 1945, rather than being a neutral fact simply discovered by experts.",
        "ex": "Escobar: 'poverty became an organizing concept and the object of a new problematization' - it brought into existence new discourses and practices that shaped the reality it claimed to describe."
      },
      {
        "term": "Development discourse",
        "def": "Escobar's term for the historically specific system of institutions, experts, and relations (World Bank, IMF, UN, national planning agencies) established from 1945-55 that determined what could be said, thought, and done about the 'Third World'.",
        "ex": "The discourse set 'the rules of the game': who can speak, from what institutional position, and with what authority - e.g. economists were privileged over local/vernacular knowledge."
      },
      {
        "term": "Discursive homogenization",
        "def": "The process by which development discourse flattened enormous diversity among Third World peoples into a single interchangeable category: 'the poor and underdeveloped'.",
        "ex": "Escobar: a Mexico City squatter, a Nepalese peasant, and a Tuareg nomad become equivalent to each other as instances of the same problem."
      },
      {
        "term": "The 'Third World' as construct",
        "def": "In Escobar's account, the Third World is not a natural or pre-existing geographic/economic category but a product of the post-war 'tale of three worlds', produced by comparative statistics and institutional classification.",
        "ex": "The World Bank's 1948 decision to define as 'poor' any country with per capita income below $100 turned roughly two-thirds of the world's population into 'poor subjects' almost by fiat."
      },
      {
        "term": "Capability approach",
        "def": "Amartya Sen's framework for evaluating wellbeing and development in terms of people's real freedom (capability) to achieve valued states of being and doing, rather than simply their income or resources.",
        "ex": "Two people with identical income can have very different real opportunities (e.g. due to disability, discrimination, or lack of public health provision)."
      },
      {
        "term": "Development as freedom",
        "def": "Sen's central thesis: development should be understood as a process of expanding the real freedoms people enjoy, rather than being identified with GNP growth, industrialization, or rising personal incomes, which are at most means to that end.",
        "ex": "Sen argues political and civil liberties are not merely 'conducive to' development but are constituent parts of it."
      },
      {
        "term": "Unfreedoms",
        "def": "Sen's term for the sources of deprivation that development must remove: poverty, tyranny, poor economic opportunity, systematic social deprivation, neglect of public facilities, and intolerance/overactivity of repressive states.",
        "ex": "Famine can occur even amid rising aggregate food supply if people lack the political freedom to demand a response (Sen's broader argument elsewhere)."
      },
      {
        "term": "Constitutive vs instrumental (evaluative vs effectiveness) role of freedom",
        "def": "Sen distinguishes two reasons freedom is central to development: the evaluative reason (progress must be assessed by whether people's freedoms are enhanced) and the effectiveness reason (achieving development itself depends on people's free agency).",
        "ex": "Basic education is valuable both as a freedom in itself (evaluative) and because it enables people to contribute more effectively to economic growth (effectiveness)."
      },
      {
        "term": "Cultural-essentialist explanations of development",
        "def": "Theories (Huntington, Fukuyama, Landes) that attribute cross-country differences in economic development to fixed, deeply-rooted cultural values (thrift, trust, discipline, work ethic) rather than institutions or policy.",
        "ex": "Huntington's claim that South Korea outperformed Ghana in the 1960s-80s chiefly because 'Koreans valued thrift... Ghanaians had different values.'"
      },
      {
        "term": "'Dr Jekyll and Mr Hyde' critique of culture",
        "def": "Ha-Joon Chang's argument that any culture (Confucianism, Islam, Christianity) contains contradictory elements that can be selectively emphasised to explain either economic success or failure, meaning culturalist explanations are unfalsifiable and often retrospective.",
        "ex": "Confucianism was blamed for East Asian underdevelopment before the 'miracle' economies emerged, then credited for causing it afterward."
      },
      {
        "term": "Reverse causality (culture as effect, not just cause)",
        "def": "Chang's claim that the causal arrow between culture and economic development runs more strongly from development to culture than the other way round - behavioural traits like discipline and thrift are often consequences of economic conditions, not fixed causes.",
        "ex": "Early-20th-century Japanese and 19th-century Germans were widely described by contemporaries as lazy, dishonest and disorganised - traits that changed rapidly once economic structures (e.g. factory employment, lifetime employment schemes) changed."
      },
      {
        "term": "Washington Consensus",
        "def": "A policy package promoted by the IMF, World Bank and US Treasury from the 1980s-90s prescribing economic liberalisation, privatisation, reduced tariffs and government spending, and floating exchange rates as the route to development, often tied to democratisation conditions.",
        "ex": "Kingsbury notes it was often externally imposed and resented, and that its results were mixed, especially after the 2008 Global Financial Crisis."
      },
      {
        "term": "Beijing Consensus",
        "def": "A rival, more loosely-defined development model associated with China's rise, combining state ownership, managed markets, and restricted political participation ('closed corporatism') with sustained high growth.",
        "ex": "Kingsbury stresses there is no single agreed definition of the Beijing Consensus - it functions mainly as a label for 'whatever is unlike the Washington Consensus'."
      },
      {
        "term": "Resonance (state-society fit)",
        "def": "A concept (drawn from Pena) Kingsbury uses to explain why some development paradigms succeed in some countries and not others: whether an externally-promoted model 'resonates' with local political culture and institutions.",
        "ex": "Kingsbury contrasts Brazil (which 'resonated' with Washington Consensus-style transnational norms) with Argentina (whose more corporatist, Peronist political culture produced 'semantic misalignment' with the same norms)."
      }
    ],
    "theorists": [
      {
        "name": "Escobar",
        "work": "\"The Problematization of Poverty: The Tale of Three Worlds and Development\", in Encountering Development: The Making and Unmaking of the Third World (1995)",
        "claim": "Escobar argues that post-1945 development discourse actively constructed 'poverty' and the 'Third World' as objects of knowledge and intervention, rather than simply discovering and successfully treating a pre-existing problem.",
        "detail": "Using a Foucauldian method, Escobar shows how, between 1945 and 1955, a system of relations among new institutions (the World Bank, IMF, UN technical agencies), experts (economists, demographers, nutritionists) and forms of knowledge (national income accounting, comparative statistics) produced development as a coherent discourse - one that determined what could be said, studied, and done about poor countries. Nearly two-thirds of the world's population were classified as 'poor' almost overnight once the World Bank set a $100 per-capita-income threshold in 1948, illustrating that poverty on a global scale was a specific historical and discursive construction, not a self-evident fact. The discourse homogenised enormously diverse peoples into the single category of 'underdeveloped', and its 'coherence of effects' was to establish the West's authority to define, study and manage the Third World - not to successfully eliminate poverty."
      },
      {
        "name": "Sen",
        "work": "Development as Freedom (1999)",
        "claim": "Sen argues that development should be understood as the expansion of the real freedoms people enjoy, not identified with narrower measures such as GNP growth, industrialisation, or rising personal income.",
        "detail": "Freedom plays both a constitutive role (progress must be evaluated by whether substantive freedoms - political participation, health, education - are expanded) and an instrumental/effectiveness role (development depends on people's free agency to bring it about) in Sen's framework. He argues development requires removing major 'unfreedoms': poverty, tyranny, poor economic opportunities, systematic social deprivation, neglect of public facilities, and repression. Sen explicitly contrasts this with narrower views that treat GNP or income growth as ends in themselves, noting that income per head can diverge sharply from real quality-of-life outcomes such as life expectancy."
      },
      {
        "name": "Ha-Joon Chang",
        "work": "\"Lazy Japanese and Thieving Germans - Are Some Cultures Incapable of Economic Development?\", ch.9 of Bad Samaritans (2007)",
        "claim": "Chang argues that cultural-essentialist explanations of (under)development (Huntington, Fukuyama, Landes) are unreliable, because cultures are internally contradictory and because economic development shapes culture at least as much as culture shapes development.",
        "detail": "Chang documents that late-19th-century Germans and early-20th-century Japanese were routinely described by Western contemporaries (missionaries, travel writers, Beatrice Webb) as lazy, dishonest, individualistic and incapable of the discipline needed for development - the same stereotypes now applied to Africa and Latin America. Once Japan and Germany became rich, commentators retrospectively rewrote their cultures as inherently disciplined and trustworthy, which Chang uses (via the 'Dr Jekyll and Mr Hyde' analogy with Confucianism and Islam) to show culturalist theories are largely post-hoc and unfalsifiable. He concludes that apparent 'laziness' or lack of discipline usually reflects economic conditions (underemployment, absence of an 'industrial' sense of time) rather than fixed values, and that behavioural change (e.g. Japanese company loyalty, Swedish industrial cooperation) came from institutional and policy changes, not ideological exhortation about culture alone."
      },
      {
        "name": "Kingsbury",
        "work": "\"The Beijing Consensus versus the Washington Consensus\", ch.8 of Politics in Developing Countries (2019)",
        "claim": "Kingsbury argues that the neoliberal Washington Consensus, dominant since the end of the Cold War, has been credibly challenged by an alternative state-led, corporatist 'Beijing Consensus' associated with China's economic rise, especially after the 2008 Global Financial Crisis.",
        "detail": "The Washington Consensus - IMF/World Bank/US Treasury-driven liberalisation, privatisation, reduced tariffs and debt - was often externally imposed and generated resentment when it produced mixed results. The Beijing Consensus is loosely defined (Kingsbury stresses there is no agreed content to the term) but in practice involves state ownership, managed markets and restricted political participation in exchange for sustained growth. Kingsbury frames the comparative success of either model as dependent on local political 'resonance' (contrasting Brazil's and Argentina's differing fit with Washington Consensus norms), and notes that whether the trade-off of political freedom for economic growth under a Beijing-style model is 'worth it' is unknowable because citizens under such regimes are not free to express that judgement."
      }
    ],
    "tf": [
      {
        "id": "q1",
        "q": "True or false: according to Escobar, development discourse after 1945 was primarily a neutral, technical response to an objectively pre-existing problem of global poverty.",
        "answer": false,
        "explanation": "False. Escobar's whole argument is that poverty was 'problematized' - actively constructed as an object of knowledge and intervention through a specific historical discourse, not simply discovered. Drawing on Foucault, he shows that development discourse produced new categories ('the illiterate', 'the malnourished', 'small farmers') and new forms of expert authority rather than passively describing an existing reality. The discourse's coherence lay in how it organised institutions, experts and forms of knowledge into a system that determined what could be said and done - this is a claim about construction of power/knowledge, not about neutral fact-finding."
      },
      {
        "id": "q2",
        "q": "True or false: Escobar treats the World Bank's 1948 income threshold that classified roughly two-thirds of the world as 'poor' as evidence of an objective, pre-existing economic reality rather than a discursive act.",
        "answer": false,
        "explanation": "False. Escobar cites this moment (via Sachs) precisely to show the opposite: that global poverty 'was nothing more than the result of a comparative statistical operation', and that two-thirds of the world's population were transformed into poor subjects almost by fiat when the World Bank set a $100 per-capita-income line in 1948. For Escobar this exemplifies how development discourse manufactures its objects rather than neutrally measuring them."
      },
      {
        "id": "q3",
        "q": "True or false: in Escobar's account, the development apparatus that emerged after 1945 succeeded in its stated goal of eradicating Third World poverty.",
        "answer": false,
        "explanation": "False, and this is a common misreading of the piece. Escobar does not evaluate development as a poverty-alleviation project that worked or failed on its own terms; his argument is a post-development critique that the very discourse of 'poverty' and 'development' was a Western construction serving to justify intervention, expert authority and management of the Third World. He explicitly frames development's 'success' as a hegemonic form of representation - not as evidence of material poverty reduction."
      },
      {
        "id": "q4",
        "q": "True or false: Escobar argues that development discourse tended to homogenise very different Third World peoples (a Mexican squatter, a Nepalese peasant, a Tuareg nomad) into a single equivalent category of 'the poor and underdeveloped'.",
        "answer": true,
        "explanation": "True. Escobar explicitly describes this 'discursive homogenization' as part of the coherence of effects achieved by development discourse: the erasure of the complexity and diversity of Third World peoples so that radically different groups become interchangeable instances of the same problem, which in turn legitimised a single, standardised set of interventions."
      },
      {
        "id": "q5",
        "q": "True or false: Sen argues that GNP growth and rising personal income are, for practical purposes, equivalent to development.",
        "answer": false,
        "explanation": "False. Sen explicitly contrasts his freedom-centred view with 'narrower views of development, such as identifying development with the growth of gross national product, or with the rise in personal incomes'. He treats GNP growth as, at most, an important means to expanding freedom, not the end itself, arguing that development requires attention to social and economic arrangements (health, education) and political/civil rights as well."
      },
      {
        "id": "q6",
        "q": "True or false: Sen distinguishes an 'evaluative reason' and an 'effectiveness reason' for why freedom is central to development.",
        "answer": true,
        "explanation": "True. Sen gives two distinct reasons: the evaluative reason, that assessment of development progress must be made primarily in terms of whether people's freedoms have been enhanced, and the effectiveness reason, that achieving development is itself dependent on the free agency of people. Together these give freedom both a constitutive role (as the end of development) and an instrumental role (as a means to it)."
      },
      {
        "id": "q7",
        "q": "True or false: for Sen, income per head is always a reliable proxy for the real freedom people have to live long, healthy lives.",
        "answer": false,
        "explanation": "False. Sen points to a 'dissonance between income per head... and the freedom of individuals to live long and live well', using this gap to argue that focusing only on income growth can miss what actually matters for people's substantive freedoms, such as access to healthcare and basic public facilities. This is part of his case for evaluating development directly in terms of freedoms rather than through an income proxy."
      },
      {
        "id": "q8",
        "q": "True or false: Ha-Joon Chang documents that early-20th-century Western observers frequently described the Japanese as lazy and indifferent to time.",
        "answer": true,
        "explanation": "True. Chang cites multiple contemporary sources - including the American missionary Sidney Gulick (1903) and Fabian socialist Beatrice Webb (1911-12) - describing the Japanese as lazy, 'easy-going' and lacking punctuality, the same stereotype often applied to poor countries today. He uses this to show how culturalist judgements shift with a country's economic fortunes rather than tracking a fixed national character."
      },
      {
        "id": "q9",
        "q": "True or false: Chang concludes that Confucian culture is unambiguously and inherently beneficial for economic development.",
        "answer": false,
        "explanation": "False. Chang's 'Dr Jekyll and Mr Hyde' argument is that Confucianism (like any culture) contains contradictory elements - it can be read as encouraging hard work, education and discipline, or as discouraging entrepreneurship, denigrating commerce, and undermining the rule of law. Which reading prevails tends to depend on whether the society in question is currently seen as economically successful, which is why Chang treats such explanations as largely retrospective rather than genuinely explanatory."
      },
      {
        "id": "q10",
        "q": "True or false: according to Chang, the causal relationship between culture and economic development runs more strongly from economic development to culture than the reverse.",
        "answer": true,
        "explanation": "True. Chang argues that traits like thrift, discipline and time-consciousness are largely produced by economic development (e.g. factory work requiring an 'industrial' sense of time) rather than being fixed cultural causes of it. He supports this with the rapid disappearance of 'laziness' stereotypes in Japan and Germany once industrialisation took hold, and with the disappearance of 'Korean time' as Korea's economy modernised."
      },
      {
        "id": "q11",
        "q": "True or false: Chang argues that behavioural change in Japan and Sweden (e.g. Japanese company loyalty, Swedish industrial cooperation) resulted mainly from ideological campaigns promoting 'progressive values', with little role for policy or institutions.",
        "answer": false,
        "explanation": "False. Chang argues the opposite: ideological exhortation alone is insufficient to change culture. Japanese company loyalty followed institutional changes such as lifetime employment and company welfare schemes, and Swedish industrial cooperation followed the 1938 Saltsjöbaden corporatist agreement exchanging wage restraint for a welfare state. He concludes cultural change requires policy and institutional change alongside (not instead of) persuasion."
      },
      {
        "id": "q12",
        "q": "True or false: Kingsbury presents the 'Beijing Consensus' as a precisely and consistently defined alternative development model.",
        "answer": false,
        "explanation": "False. Kingsbury explicitly notes there is 'no core definition of the Beijing Consensus' and even quotes criticism that 'there is no consensus as to what this consensus stands for'. In practice he treats it as a loose label for whatever policies diverge from the Washington Consensus, combining state ownership, managed markets and restricted political participation."
      },
      {
        "id": "q13",
        "q": "True or false: according to Kingsbury, the Washington Consensus remained completely unchallenged as the dominant development paradigm from the end of the Cold War through to the time of his writing.",
        "answer": false,
        "explanation": "False. Kingsbury argues the Washington Consensus, while still influential, has 'not gone unchallenged' over the past decade, describing how the Asian financial crisis and especially the 2008 Global Financial Crisis damaged confidence in neoliberal orthodoxy and opened space for the rival Beijing Consensus model associated with China's continued growth through the crisis."
      }
    ]
  }
];

const THEORY_PROFILES = {
  "modernisation": {
    "corePremise": "Modernisation theory holds that all societies lie on a single, linear developmental continuum running from 'traditional' (agricultural, pre-industrial, communally organised) to 'modern' (urban, industrial, mass-consumption, Western-style capitalist) society. 'Underdevelopment' is treated as an original, shared starting condition rather than something produced by history or global relations, and 'more developed' status is simply a later point on the same universal path that industrialised Western countries have already reached.",
    "keyThinkers": [
      "Rostow (central figure)",
      "W. Arthur Lewis",
      "Albert Hirschman",
      "Gunnar Myrdal"
    ],
    "mechanism": "Development happens by moving sequentially through defined stages (in Rostow's model: traditional society, preconditions for take-off, take-off, drive to maturity, age of high mass consumption), driven by rising savings/investment rates, capital accumulation, technology transfer, infrastructure-building, and the adoption of Western institutions and cultural/economic practices. Related structural-change variants (Lewis's dual-sector model, Hirschman's growth poles) frame this same underlying shift as the movement of labour and investment from a 'traditional' low-productivity sector into a 'modern' industrial one.",
    "policyImplications": "Practically, modernisation theory recommends channelling foreign aid, capital, technical expertise and technology from the industrialised North to the South, typically via bilateral and multilateral (Bretton Woods) institutions, to fund large-scale infrastructure and industrial projects and lift savings/investment rates. It supports 'top-down', externally-designed development planning at the national scale, on the assumption that the path which worked for the West (or the US specifically) can and should be replicated elsewhere via technology transfer and institution-building (e.g. Lewis's 'industrialization by invitation', Truman-era technical assistance).",
    "critiques": [
      "Ethnocentrism: it takes Western industrialised society as the single universal model and end-point of 'development', with 'modernisation' too often collapsed into 'Westernisation'.",
      "It ignores colonial history and unequal global power structures, treating 'underdevelopment' as a natural, shared starting point rather than something actively produced through colonialism and unequal integration into the world economy — the opening this leaves for dependency theory's critique.",
      "It assumes one linear path applies to all countries regardless of vastly different resources, histories and positions in the international system (e.g. Rostow's own claim to respect 'uniqueness' sits uneasily with his insistence that all societies fit into one of five universal categories).",
      "Its policy offshoots have had poor real-world outcomes: top-down infrastructure-led aid caused serious social and environmental harm, and the later neoliberal turn (structural adjustment) frequently increased poverty, unemployment and inequality rather than delivering the promised growth (e.g. Jamaica under SAPs).",
      "Even its celebrated 'success stories' (the East Asian NICs) relied heavily on state intervention and protectionism that the paradigm's free-market/modernisation narrative downplays or omits."
    ]
  },
  "dependency": {
    "corePremise": "Dependency theory holds that 'underdevelopment' in the Global South is not a natural or original starting condition that countries simply have not yet grown out of, but was actively produced, and continues to be actively maintained, by past and ongoing economic relationships between wealthy 'core'/'metropolitan' countries and poorer 'satellite'/peripheral countries within a single, integrated capitalist world economy. As Frank put it, contemporary underdevelopment is 'in large part the historical product of past and continuing economic and other relations' between the underdeveloped periphery and the developed core, and these relations are 'an essential part of the structure and development of the capitalist system on a world scale as a whole.'",
    "keyThinkers": [
      "Andre Gunder Frank",
      "Raul Prebisch",
      "Immanuel Wallerstein",
      "Walter Rodney",
      "Samir Amin",
      "Celso Furtado",
      "Paul Baran"
    ],
    "mechanism": "Underdevelopment is produced and sustained through a chain of unequal exchange running from local level to global level: peasants/workers are paid below the value of what they produce, merchants and local elites take a further cut, and the accumulated surplus is ultimately extracted out of the periphery to the core. At the international level this is compounded by unequal terms of trade (Prebisch) - peripheral raw-material exports losing value relative to core manufactured imports - and by the periphery's structural position as a supplier of resources/labour and market for the core's manufactured goods, a position first established under colonialism and then reproduced through 'independent' trade, investment and (per the aid material) foreign aid relationships.",
    "policyImplications": "Dependency theorists split into two camps. 'Reformists' (e.g. Furtado and the ECLA/CEPAL structuralists led by Prebisch) argued for reforming the capitalist trade system from within: greater state intervention, protective tariffs, import-substitution industrialization (ISI), and land reform, to let domestic industry develop without being undercut by more efficient foreign competition. The more Marxist/neo-Marxist wing (led by Frank) argued reform within capitalism could never work, because the periphery would always be exploited as long as it remained part of the capitalist system - their prescription was to 'delink' from or overthrow the capitalist system altogether in favour of state-socialism.",
    "critiques": [
      "Empirical challenge: the rapid capitalist-led economic success of the Asian 'Tiger' newly-industrialising countries (South Korea, Hong Kong, Singapore, Taiwan) and others in the 1970s-80s directly contradicted the claim that capitalist development was impossible for peripheral countries within the existing global system.",
      "Circularity (David Booth, 1985): Frank defined capitalist development as 'autonomous industrial growth', a definition that guarantees development will appear most successful exactly when a country's ties to the global economy are weakest - making the theory unfalsifiable by its own design.",
      "Narrow economic focus: dependency theory was criticised for being overly concerned with economic factors and (unlike its historical framing might suggest) for not seriously considering the social, cultural or political contexts in which development or underdevelopment actually took place.",
      "Wallerstein's world-systems theory, though it addressed some of these weaknesses (adding a mobile 'semi-periphery'), has itself been criticised (Thomas Klak) as difficult to test and better understood as a descriptive perspective than a predictive theory, and for still focusing mainly on state-level action while excluding local-level processes."
    ]
  }
};

const SCAFFOLD_PROMPTS = [
  {
    "id": "rist-development",
    "title": "Practice — Rist on \"development\" as a belief system",
    "q": "Short-answer practice: \"Explain Rist’s argument that development functions like a religion of modernity.\" Draft your answer using the structure below, then compare it to the model.",
    "hints": [
      "Name the specific theorist and the specific claim — not \"some people think development doesn’t work.\"",
      "Explain what \"functions like a religion\" actually means here — what does Rist say sustains belief in development despite failure?",
      "Back it up with something concrete from the reading, and say what this implies for how we should read development discourse."
    ],
    "model": [
      "Gilbert Rist argues, in *The History of Development*, that \"development\" is best understood not as a neutral, technical process but as a Western myth or belief system — a \"religion of modernity.\"",
      "By this he means development survives evidence of its own repeated failure the way religious belief survives its historical contradictions: promises are \"tirelessly repeated and experiments constantly reproduced\" despite fifty years of shortfalls, because questioning development feels like abandoning collective hope rather than like updating a falsifiable theory.",
      "This is why Rist rejects normative, feel-good definitions of development (e.g. \"enlarging people’s choices\") as wish-lists rather than usable definitions — on that standard, he notes, development \"exists nowhere and probably never will.\" His own working definition instead centres on a concrete set of practices (the transformation of social relations and the environment to increase commodity production for exchange), because a belief-system account of development has to explain what actually keeps recurring in practice, not just what people hope for."
    ]
  },
  {
    "id": "rodney-underdevelopment",
    "title": "Practice — Rodney on how Europe underdeveloped Africa",
    "q": "Short-answer practice: \"Explain Rodney’s argument about the relationship between European colonialism and African underdevelopment.\" Draft using the structure below.",
    "hints": [
      "Name Rodney and the specific claim: is underdevelopment a starting condition, or something produced?",
      "Explain the mechanism — what did the colonial relationship actually do?",
      "Link it to the broader dependency-theory framing this course sets up around Frank’s \"development of underdevelopment.\""
    ],
    "model": [
      "Walter Rodney, in *How Europe Underdeveloped Africa*, argues that European intervention in African economic, social and political life through the nineteenth and twentieth centuries actively produced African underdevelopment — it was not a pre-existing condition Europe simply failed to fix.",
      "He means that the colonial relationship extracted resources and labour from Africa for the benefit of European economies, restructuring African societies around that extraction rather than around their own development. \"Underdevelopment\" here names an active, relational outcome, not a synonym for \"not yet developed.\"",
      "This is the same move Andre Gunder Frank makes for Latin America with his phrase \"the development of underdevelopment\" (Week 6) — both treat Northern development and Southern underdevelopment as two outputs of the same historical process, which is exactly why this course pairs Rodney’s colonial history with dependency theory rather than with modernisation theory."
    ]
  },
  {
    "id": "escobar-problematization",
    "title": "Practice — Escobar on the \"problematization\" of poverty",
    "q": "Short-answer practice: \"Explain what Escobar means when he says poverty was ‘problematized’ after 1945.\" Draft using the structure below.",
    "hints": [
      "Name Escobar and the specific concept (\"problematization\") rather than just saying \"he criticises development.\"",
      "Explain what problematization means — constructed as an object of knowledge/intervention, not simply discovered.",
      "Support it with the concrete example (the World Bank’s 1948 income threshold) and say what it implies."
    ],
    "model": [
      "Arturo Escobar argues that post-1945 development discourse \"problematized\" poverty — meaning it turned poverty into a constructed object of expert knowledge and intervention, rather than a neutral fact the new institutions simply discovered and set out to fix.",
      "Drawing on Foucault, he means that a specific system of institutions (the World Bank, IMF, UN technical agencies), experts (economists, demographers) and forms of knowledge (national income accounting, comparative statistics) came together between 1945 and 1955 to decide what could be said, studied and done about the \"Third World\" — the discourse produced its object as much as it described it.",
      "His concrete example is the World Bank’s 1948 decision to classify any country under $100 per-capita income as \"poor,\" which reclassified roughly two-thirds of the world’s population as poor almost overnight — a statistical/discursive act, not a discovery. The implication, and the reason this is an exam-relevant distinction, is that Escobar is not arguing development succeeded or failed at alleviating poverty; he is arguing the entire frame of \"poverty\" as something development manages was itself manufactured."
    ]
  },
  {
    "id": "acharya-bandung",
    "title": "Practice — Acharya on Bandung, sovereignty and human rights",
    "q": "Short-answer practice: \"Explain Acharya’s argument about the relationship between sovereignty/nonintervention and human rights at the Bandung Conference.\" Draft using the structure below.",
    "hints": [
      "Name Acharya and be precise about what he is arguing against (a common assumption).",
      "Explain the actual relationship he found between nonintervention and human rights at Bandung.",
      "Support with a specific detail (Nehru) and state the broader implication (\"norm makers\" not \"norm takers\")."
    ],
    "model": [
      "Amitav Acharya argues that Bandung Conference delegates in 1955 did not treat state sovereignty and nonintervention as being in tension with human rights — a corrective to the assumption that newly independent, postcolonial states used sovereignty as a shield against human rights scrutiny.",
      "He shows nonintervention was invoked specifically against foreign interference — Western and communist alike — and against pressure to join Cold War military pacts like SEATO, never to excuse a delegate’s own government’s human rights record.",
      "His clearest evidence is Nehru, the conference’s chief proponent of nonintervention, who was simultaneously its sharpest critic of other participants’ human rights failures — showing the two norms were held together, not traded off. Acharya’s broader point is that Global South states acted at Bandung as active \"norm makers,\" shaping the postwar human-rights and sovereignty regime, rather than as passive \"norm takers\" who simply inherited it from the West."
    ]
  }
];

const PAST_MST = {
  "note": "The actual released 2025 mid-semester test. Shown for format and phrasing familiarity only — draft your own answers using the structure above rather than treating this as a graded answer key.",
  "parts": [
    {
      "title": "Part 1 — True/False + explanation (20 points)",
      "note": "Five statements. Each is worth 1 point for True/False and 3 points for a short supporting explanation.",
      "items": [
        {
          "label": "Worked example given on the paper",
          "q": "True or false: gender impacts poverty? <strong>True.</strong> Studies provide support to the feminisation of poverty, meaning that the majority of people living in absolute poverty are women and girls. This is due to many factors, including women’s role and status in society, lack of access to education and job market, and underrepresentation in political decision-making."
        },
        {
          "label": "a)",
          "q": "True or false: The Third World refers to developing countries?"
        },
        {
          "label": "b)",
          "q": "True or false: boomerang aid refers to the benefits of aid to the recipient countries?"
        },
        {
          "label": "c)",
          "q": "True or false: according to Escobar, development practice has been successful in alleviating poverty?"
        },
        {
          "label": "d)",
          "q": "True or false: according to Acharya, the participants at the Bandung Conference were hostile to human rights and state sovereignty?"
        },
        {
          "label": "e)",
          "q": "True or false: relative poverty means living below 3USD a day?"
        }
      ]
    },
    {
      "title": "Part 2 — Compare and contrast essay (10 points)",
      "items": [
        {
          "q": "Compare and contrast modernisation and dependency theory: a) how are they similar (5 points); b) how are they different (5 points)?"
        }
      ]
    }
  ]
};
