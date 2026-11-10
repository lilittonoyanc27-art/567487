export interface ExampleItem {
  id: string;
  es: string;
  hy: string;
  explanationEs?: string;
  explanationHy?: string;
  breakdown?: { label: string; text: string }[];
}

export interface TopicTable {
  headers: { es: string; hy: string }[];
  rows: { [key: string]: { es: string; hy: string } }[];
}

export interface TopicItem {
  id: number;
  category: 'figuras' | 'adverbios' | 'determinantes';
  categoryLabel: { es: string; hy: string };
  titleEs: string;
  titleHy: string;
  subtitle?: string;
  definitionEs: string;
  definitionHy: string;
  additionalNotesEs?: string;
  additionalNotesHy?: string;
  quickExamples?: { es: string; hy: string }[];
  examples: ExampleItem[];
  table?: TopicTable;
  comparisonTable?: {
    col1Title: { es: string; hy: string };
    col2Title: { es: string; hy: string };
    rows: { col1: { es: string; hy: string }; col2: { es: string; hy: string } }[];
  };
  howToRecognize?: { es: string; hy: string };
  importantRule?: { es: string; hy: string };
  extraComparison?: {
    title: { es: string; hy: string };
    items: { es: string; hy: string }[];
  };
  breakdownAnalysis?: {
    phrase: { es: string; hy: string };
    parts: { word: string; tagEs: string; tagHy: string; noteEs: string; noteHy: string }[];
  };
}

export const TOPICS: TopicItem[] = [
  {
    id: 1,
    category: 'figuras',
    categoryLabel: { es: 'Figuras Retóricas', hy: 'Գեղարվեստական հնարքներ' },
    titleEs: 'Personificación',
    titleHy: 'Անձնավորում',
    definitionEs: 'La personificación consiste en atribuir cualidades, sentimientos o acciones humanas a animales, objetos o elementos de la naturaleza.',
    definitionHy: 'Անձնավորումը գեղարվեստական հնարք է, երբ կենդանիներին, առարկաներին կամ բնության երևույթներին վերագրվում են մարդուն բնորոշ գործողություններ, զգացմունքներ կամ հատկանիշներ։',
    additionalNotesHy: 'Օրինակ՝ առարկան չի կարող տխրել, իսկ լուսինը չի կարող մեզ ժպտալ։ Բայց գրականության մեջ այդպես նկարագրելով՝ հեղինակը պատկերը դարձնում է կենդանի և արտահայտիչ։',
    examples: [
      {
        id: '1-1',
        es: 'La luna sonreía sobre los tejados.',
        hy: 'Լուսինը ժպտում էր տանիքների վերևում։',
        explanationEs: 'La luna realiza una acción humana: sonreír.',
        explanationHy: 'Բացատրություն․ Ժպտալը մարդու գործողություն է։ Այստեղ այն վերագրվում է լուսնին։',
      },
      {
        id: '1-2',
        es: 'El reloj me gritaba que llegaba tarde.',
        hy: 'Ժամացույցը գոռում էր ինձ վրա, որ ուշանում եմ։',
        explanationEs: 'Un reloj puede sonar, pero no puede gritar un mensaje como una persona.',
        explanationHy: 'Բացատրություն․ Ժամացույցը կարող է ձայն հանել, բայց չի կարող մարդու նման գոռալ ու ինչ-որ բան ասել։',
      },
      {
        id: '1-3',
        es: 'La ciudad despertó lentamente.',
        hy: 'Քաղաքը դանդաղ արթնացավ։',
        explanationEs: 'La ciudad se presenta como un ser vivo que despierta.',
        explanationHy: 'Բացատրություն․ Քաղաքը ներկայացվում է որպես կենդանի էակ, որը քնից արթնանում է։',
      },
    ],
    howToRecognize: {
      es: 'Pregunta: «¿Se atribuye a algo no humano una capacidad humana?».',
      hy: 'Ինչպե՞ս ճանաչել․ Հարցրու՝ «Այստեղ ոչ մարդկային էակին կամ առարկային մարդկային հատկությո՞ւն է տրված»։',
    },
  },
  {
    id: 2,
    category: 'figuras',
    categoryLabel: { es: 'Figuras Retóricas', hy: 'Գեղարվեստական հնարքներ' },
    titleEs: 'Antítesis',
    titleHy: 'Հակադրություն',
    definitionEs: 'La antítesis consiste en contraponer palabras o ideas de significado opuesto para destacar un contraste.',
    definitionHy: 'Հակադրությունը հակառակ իմաստ ունեցող բառերի կամ գաղափարների համադրումն է՝ դրանց տարբերությունն ավելի ընդգծելու համար։',
    quickExamples: [
      { es: 'alegría / tristeza', hy: 'ուրախություն / տխրություն' },
      { es: 'luz / oscuridad', hy: 'լույս / խավար' },
      { es: 'hablar / callar', hy: 'խոսել / լռել' },
      { es: 'cerca / lejos', hy: 'մոտ / հեռու' },
    ],
    examples: [
      {
        id: '2-1',
        es: 'Ella reía; él lloraba.',
        hy: 'Նա ծիծաղում էր, իսկ տղան՝ լացում։',
        explanationEs: 'Se contraponen dos acciones: reír y llorar.',
        explanationHy: 'Բացատրություն․ Հակադրվում են երկու գործողություն՝ ծիծաղել և լացել։',
      },
      {
        id: '2-2',
        es: 'Estás cerca de mis ojos, pero lejos de mi corazón.',
        hy: 'Դու մոտ ես իմ աչքերին, բայց հեռու ես իմ սրտից։',
        explanationEs: 'Se oponen «cerca» y «lejos», y también la cercanía física y la distancia emocional.',
        explanationHy: 'Բացատրություն․ Հակադրվում են «մոտ» և «հեռու» հասկացությունները։ Մարդը կարող է ֆիզիկապես մոտ լինել, բայց հոգեպես՝ հեռու։',
      },
      {
        id: '2-3',
        es: 'De día tenía esperanza; de noche sentía miedo.',
        hy: 'Ցերեկը նա հույս ուներ, իսկ գիշերը վախ էր զգում։',
        explanationEs: 'El contraste entre el día y la noche refuerza la diferencia entre los sentimientos.',
        explanationHy: 'Բացատրություն․ Ցերեկվա և գիշերվա հակադրությունն ընդգծում է նաև զգացմունքների տարբերությունը։',
      },
    ],
    importantRule: {
      es: 'La antítesis no necesita expresar algo imposible. Dos situaciones contrarias pueden existir perfectamente.',
      hy: 'Կարևոր է․ Հակադրությունը պարտադիր չէ, որ անհնարին միտք արտահայտի։ Երկու հակառակ իրավիճակ կարող են իրականում գոյություն ունենալ։',
    },
  },
  {
    id: 3,
    category: 'figuras',
    categoryLabel: { es: 'Figuras Retóricas', hy: 'Գեղարվեստական հնարքներ' },
    titleEs: 'Paradoja',
    titleHy: 'Պարադոքս, թվացյալ հակասություն',
    definitionEs: 'La paradoja presenta una idea que parece contradictoria o ilógica, pero que, al interpretarla, expresa un sentido profundo.',
    definitionHy: 'Պարադոքսը միտք է, որն առաջին հայացքից թվում է հակասական կամ անտրամաբանական, բայց ավելի խորը մտածելու դեպքում իմաստ է ստանում։',
    examples: [
      {
        id: '3-1',
        es: 'Cuanto más aprendo, más comprendo lo poco que sé.',
        hy: 'Որքան շատ եմ սովորում, այնքան ավելի եմ հասկանում, թե որքան քիչ բան գիտեմ։',
        explanationEs: 'Parece contradictorio que aprender más nos haga sentir que sabemos menos. En realidad, el conocimiento nos permite descubrir todo lo que todavía ignoramos.',
        explanationHy: 'Բացատրություն․ Թվում է՝ եթե ավելի շատ ես սովորում, պետք է զգաս, որ ավելի շատ գիտես։ Բայց սովորելով՝ սկսում ես հասկանալ, թե որքան շատ բան դեռ չգիտես։',
      },
      {
        id: '3-2',
        es: 'En medio de tanta gente, nunca me había sentido tan solo.',
        hy: 'Այսքան մարդկանց մեջ ես երբեք ինձ այսքան միայնակ չէի զգացել։',
        explanationEs: 'Estar acompañado físicamente no impide sentirse solo emocionalmente.',
        explanationHy: 'Բացատրություն․ Մարդը շրջապատված է մարդկանցով, բայց իրեն միայնակ է զգում, որովհետև ոչ ոք իրեն չի հասկանում։',
      },
      {
        id: '3-3',
        es: 'Al aceptar mis límites, me sentí más libre.',
        hy: 'Ընդունելով իմ սահմանափակումները՝ ես ինձ ավելի ազատ զգացի։',
        explanationEs: 'Los límites parecen oponerse a la libertad, pero aceptarlos puede liberarnos de exigencias imposibles.',
        explanationHy: 'Բացատրություն․ Սահմանափակումն ու ազատությունը հակառակ գաղափարներ են թվում։ Բայց սեփական հնարավորությունների սահմաններն ընդունելը կարող է ազատել անհնար պահանջներից։',
      },
    ],
    comparisonTable: {
      col1Title: { es: 'Antítesis — Հակադրություն', hy: 'Հակադրություն' },
      col2Title: { es: 'Paradoja — Պարադոքս', hy: 'Պարադոքս' },
      rows: [
        {
          col1: { es: 'Contrapone ideas opuestas.', hy: 'Հակադրում է հակառակ գաղափարներ։' },
          col2: { es: 'Expresa una contradicción aparente con sentido.', hy: 'Արտահայտում է իմաստ ունեցող թվացյալ հակասություն։' },
        },
        {
          col1: { es: 'Uno habla y otro calla.', hy: 'Մեկը խոսում է, մյուսը՝ լռում։' },
          col2: { es: 'Su silencio lo dijo todo.', hy: 'Նրա լռությունն ամեն ինչ ասաց։' },
        },
        {
          col1: { es: 'Hablar y callar se contrastan.', hy: 'Խոսելն ու լռելը հակադրվում են։' },
          col2: { es: 'Parece imposible que el silencio diga algo, pero puede comunicar mucho.', hy: 'Թվում է՝ լռությունը չի կարող խոսել, բայց այն կարող է շատ բան հաղորդել։' },
        },
      ],
    },
    importantRule: {
      es: 'No basta con encontrar palabras opuestas para identificar una paradoja. Debe haber una idea aparentemente contradictoria que tenga una explicación coherente.',
      hy: 'Ուշադրություն․ Միայն հակառակ բառեր գտնելը բավարար չէ պարադոքս որոշելու համար։ Պետք է լինի թվացյալ հակասական միտք, որը հնարավոր է բացատրել։',
    },
  },
  {
    id: 4,
    category: 'figuras',
    categoryLabel: { es: 'Figuras Retóricas', hy: 'Գեղարվեստական հնարքներ' },
    titleEs: 'Símbolo',
    titleHy: 'Խորհրդանիշ',
    definitionEs: 'Un símbolo es un elemento concreto que representa una idea, un sentimiento o una realidad más amplia, frecuentemente abstracta.',
    definitionHy: 'Խորհրդանիշը կոնկրետ պատկեր, առարկա կամ էակ է, որը ներկայացնում է ավելի լայն գաղափար կամ զգացմունք։',
    additionalNotesHy: 'Օրինակ՝ տեսնում ենք շղթա, բայց գրական ստեղծագործության մեջ այն կարող է նշանակել անազատություն։',
    examples: [
      {
        id: '4-1',
        es: 'Una paloma blanca apareció sobre el campo de batalla.',
        hy: 'Մարտադաշտի վերևում հայտնվեց սպիտակ աղավնի։',
        explanationEs: 'En un contexto adecuado, la paloma blanca puede simbolizar la paz.',
        explanationHy: 'Բացատրություն․ Համապատասխան համատեքստում սպիտակ աղավնին կարող է խորհրդանշել խաղաղություն։',
      },
      {
        id: '4-2',
        es: 'Finalmente rompió las cadenas de su vida.',
        hy: 'Վերջապես նա կոտրեց իր կյանքի շղթաները։',
        explanationEs: 'Las cadenas pueden simbolizar la opresión, la dependencia o la falta de libertad. Romperlas representa la liberación.',
        explanationHy: 'Բացատրություն․ Շղթաները կարող են խորհրդանշել ճնշում, կախվածություն կամ անազատություն։ Դրանք կոտրելը նշանակում է ազատագրվել։',
      },
      {
        id: '4-3',
        es: 'Después de tantos años de dolor, comenzó una nueva primavera.',
        hy: 'Այսքան տարիների ցավից հետո սկսվեց նոր գարուն։',
        explanationEs: 'La primavera puede simbolizar la renovación y el comienzo de una etapa esperanzadora.',
        explanationHy: 'Բացատրություն․ Գարունը կարող է խորհրդանշել նոր սկիզբ, վերածնունդ և հույս։',
      },
    ],
    importantRule: {
      es: 'Un símbolo depende del contexto. La primavera no simboliza siempre lo mismo, y una paloma puede ser simplemente un animal dentro de una descripción.',
      hy: 'Կարևոր է․ Խորհրդանիշի իմաստը կախված է տեքստից։ Ամեն անգամ «գարուն» կամ «աղավնի» տեսնելիս չի կարելի անմիջապես ասել, որ դա խորհրդանիշ է։',
    },
  },
  {
    id: 5,
    category: 'figuras',
    categoryLabel: { es: 'Figuras Retóricas', hy: 'Գեղարվեստական հնարքներ' },
    titleEs: 'Sinestesia',
    titleHy: 'Սինեսթեզիա, զգայությունների համադրում',
    definitionEs: 'La sinestesia combina sensaciones que pertenecen a sentidos diferentes. También puede relacionar una sensación física con un sentimiento.',
    definitionHy: 'Սինեսթեզիան տարբեր զգայարաններին պատկանող զգացողությունների համադրումն է։ Երբեմն ֆիզիկական զգացողությունը կապվում է նաև զգացմունքի հետ։',
    comparisonTable: {
      col1Title: { es: 'Sentido / Հայերեն', hy: 'Զգայարան' },
      col2Title: { es: '¿Qué percibimos? — Ի՞նչ ենք ընկալում', hy: 'Ի՞նչ ենք ընկալում' },
      rows: [
        {
          col1: { es: 'Vista', hy: 'Տեսողություն' },
          col2: { es: 'Colores, formas', hy: 'գույներ, ձևեր' },
        },
        {
          col1: { es: 'Oído', hy: 'Լսողություն' },
          col2: { es: 'Sonidos', hy: 'ձայներ' },
        },
        {
          col1: { es: 'Olfato', hy: 'Հոտառություն' },
          col2: { es: 'Olores', hy: 'հոտեր' },
        },
        {
          col1: { es: 'Gusto', hy: 'Համի զգացողություն' },
          col2: { es: 'Sabores', hy: 'համեր' },
        },
        {
          col1: { es: 'Tacto', hy: 'Շոշափելիք' },
          col2: { es: 'Temperatura, textura', hy: 'ջերմություն, մակերեսի հատկություններ' },
        },
      ],
    },
    examples: [
      {
        id: '5-1',
        es: 'Su voz era dulce.',
        hy: 'Նրա ձայնը քաղցր էր։',
        explanationEs: '«Voz» se percibe con el oído; «dulce» pertenece al gusto.',
        explanationHy: 'Բացատրություն․ Ձայնը լսում ենք, իսկ քաղցրությունը զգում ենք համով։ Միավորվել են լսողությունն ու համի զգացողությունը։',
      },
      {
        id: '5-2',
        es: 'Una luz fría iluminaba la habitación.',
        hy: 'Սառը լույսը լուսավորում էր սենյակը։',
        explanationEs: 'Se combina una percepción visual, la luz, con una sensación de temperatura, el frío.',
        explanationHy: 'Բացատրություն․ Լույսը տեսնում ենք, իսկ սառնությունը զգում ենք մարմնով։ Համադրվել են տեսողությունն ու շոշափելիքը։',
      },
      {
        id: '5-3',
        es: 'Escuchamos el sonido aterciopelado del violín.',
        hy: 'Մենք լսեցինք ջութակի թավշյա ձայնը։',
        explanationEs: 'El sonido pertenece al oído; la textura del terciopelo se percibe mediante el tacto.',
        explanationHy: 'Բացատրություն․ Ձայնը լսողական զգացողություն է, իսկ թավշի փափկությունը՝ շոշափելիքի։ Համադրվել են լսողությունն ու շոշափելիքը։',
      },
    ],
    howToRecognize: {
      es: 'Identifica los sentidos que se mezclan.',
      hy: 'Ինչպե՞ս ճանաչել․ Պարզիր՝ որ զգայարաններին են պատկանում օգտագործված բառերը։',
    },
  },
  {
    id: 6,
    category: 'figuras',
    categoryLabel: { es: 'Figuras Retóricas', hy: 'Գեղարվեստական հնարքներ' },
    titleEs: 'Metáfora',
    titleHy: 'Փոխաբերություն',
    definitionEs: 'La metáfora identifica una realidad con otra porque existe una semejanza entre ellas.',
    definitionHy: 'Փոխաբերությունը մի երևույթը կամ առարկան մեկ ուրիշի միջոցով ներկայացնելն է՝ նրանց միջև եղած նմանության հիման վրա։',
    additionalNotesEs: 'Fórmula básica: A es B\n• A: término real — իրական առարկան կամ երևույթը։\n• B: término imaginario o figurado — այն պատկերը, որի միջոցով ներկայացվում է իրականը։',
    additionalNotesHy: 'Բանաձև՝ A es B (A-ն B-ն է)\n• A: término real — իրական առարկան կամ երևույթը։\n• B: término imaginario o figurado — այն պատկերը, որի միջոցով ներկայացվում է իրականը։',
    examples: [
      {
        id: '6-1',
        es: 'Tus dientes son perlas.',
        hy: 'Քո ատամները մարգարիտներ են։',
        explanationEs: 'Los dientes no son perlas de verdad. Se identifican con ellas por sus características (blancura y brillo). A = dientes, B = perlas.',
        explanationHy: 'Բացատրություն․ Ատամներն իրականում մարգարիտներ չեն։ Դրանք ներկայացվում են որպես մարգարիտներ՝ ընդհանուր հատկանիշների պատճառով (A = ատամներ, B = մարգարիտներ, նմանությունը՝ սպիտակությունն ու փայլը)։',
      },
      {
        id: '6-2',
        es: 'El tiempo es un ladrón.',
        hy: 'Ժամանակը գող է։',
        explanationEs: 'El tiempo se presenta como algo que nos quita momentos, oportunidades o juventud. A = el tiempo, B = un ladrón.',
        explanationHy: 'Բացատրություն․ Ժամանակը ներկայացվում է որպես մի բան, որը մեզնից վերցնում է պահերը, հնարավորությունները կամ երիտասարդությունը (A = ժամանակ, B = գող)։',
      },
      {
        id: '6-3',
        es: 'Su cabello es una cascada de oro.',
        hy: 'Նրա մազերը ոսկե ջրվեժ են։',
        explanationEs: 'La imagen sugiere un cabello largo, abundante y rubio.',
        explanationHy: 'Բացատրություն․ Պատկերն օգնում է պատկերացնել երկար, առատ և շիկահեր մազեր։',
      },
    ],
    comparisonTable: {
      col1Title: { es: 'Metáfora — Փոխաբերություն', hy: 'Փոխաբերություն' },
      col2Title: { es: 'Comparación o símil — Համեմատություն', hy: 'Համեմատություն' },
      rows: [
        {
          col1: { es: 'Tus dientes son perlas.', hy: 'Քո ատամները մարգարիտներ են։' },
          col2: { es: 'Tus dientes son como perlas.', hy: 'Քո ատամները մարգարիտների նման են։' },
        },
        {
          col1: { es: 'Identifica A con B.', hy: 'A-ն նույնացնում է B-ի հետ։' },
          col2: { es: 'Compara A con B explícitamente.', hy: 'A-ն բացահայտ համեմատում է B-ի հետ։' },
        },
        {
          col1: { es: 'No necesita nexos comparativos.', hy: 'Համեմատական կապեր չի պահանջում։' },
          col2: { es: 'Suele emplear «como», «parece» o «igual que».', hy: 'Հաճախ օգտագործվում են «ինչպես», «նման» (como, parece, igual que)։' },
        },
      ],
    },
    importantRule: {
      es: 'No todas las metáforas tienen literalmente la estructura «A es B». Ejemplo: «Las perlas de tu boca brillaban». Aquí «perlas» sustituye a «dientes»; el término real no está explícito, pero se sobreentiende.',
      hy: 'Կարևոր է․ Ոչ բոլոր փոխաբերություններն ունեն ուղիղ «A es B» կառույցը։ Օրինակ՝ «Las perlas de tu boca brillaban» (Քո բերանի մարգարիտները փայլում էին)։ Այստեղ «մարգարիտներ» բառը փոխարինում է «ատամներ» բառին․ իրական առարկան բացահայտ նշված չէ, բայց հասկացվում է։',
    },
  },
  {
    id: 7,
    category: 'figuras',
    categoryLabel: { es: 'Figuras Retóricas', hy: 'Գեղարվեստական հնարքներ' },
    titleEs: 'Nivel semántico',
    titleHy: 'Իմաստային մակարդակ',
    definitionEs: 'El nivel semántico se relaciona con el significado de las palabras y las expresiones. Las figuras semánticas producen un efecto literario mediante el sentido.',
    definitionHy: 'Իմաստային մակարդակը վերաբերում է բառերի և արտահայտությունների իմաստին։ Այս մակարդակի հնարքներում կարևորն այն է, թե բառերն ինչ են նշանակում և ինչ պատկեր են ստեղծում։',
    examples: [
      {
        id: '7-1',
        es: 'Su mirada era hielo.',
        hy: 'Նրա հայացքը սառույց էր։',
        explanationEs: 'Lo importante no es cómo suenan las palabras, sino que «hielo» sugiere frialdad emocional.',
        explanationHy: 'Բացատրություն․ Այստեղ կարևոր չէ բառերի հնչողությունը։ Կարևորն այն է, որ «սառույց» բառը ցույց է տալիս մարդու սառը, անտարբեր վերաբերմունքը։',
      },
    ],
    importantRule: {
      es: 'En el análisis escolar, la metáfora, la personificación, la antítesis, la paradoja, el símbolo y la sinestesia suelen estudiarse como recursos relacionados con el significado (nivel semántico).',
      hy: 'Դպրոցական վերլուծության մեջ փոխաբերությունը, անձնավորումը, հակադրությունը, պարադոքսը, խորհրդանիշը և սինեսթեզիան սովորաբար ուսումնասիրվում են որպես իմաստի հետ կապված հնարքներ (իմաստային մակարդակ)։',
    },
  },
  {
    id: 8,
    category: 'figuras',
    categoryLabel: { es: 'Figuras Retóricas', hy: 'Գեղարվեստական հնարքներ' },
    titleEs: 'Aliteración',
    titleHy: 'Ալիտերացիա, բաղաձայնույթ',
    definitionEs: 'La aliteración consiste en repetir uno o varios sonidos próximos para producir un efecto expresivo, musical o sugerente.',
    definitionHy: 'Ալիտերացիան մոտ գտնվող բառերում նույն կամ նման հնչյունների կրկնությունն է՝ արտահայտիչ հնչողություն ստեղծելու համար։',
    additionalNotesHy: 'Կրկնությունը կարող է հիշեցնել, օրինակ, շշուկ, սուլոց կամ դղրդյուն։',
    examples: [
      {
        id: '8-1',
        es: 'Sara susurra secretos al silencio.',
        hy: 'Սառան լռությանը գաղտնիքներ է շշնջում։',
        explanationEs: 'Se repite el sonido /s/, que puede sugerir un susurro.',
        explanationHy: 'Բացատրություն․ Կրկնվում է «ս» հնչյունը, որը շշուկ հիշեցնող հնչողություն է ստեղծում։',
      },
      {
        id: '8-2',
        es: 'Rugen las ruedas y retumba la carretera.',
        hy: 'Անիվները մռնչում են, և ճանապարհը դղրդում է։',
        explanationEs: 'La repetición de sonidos de «r» refuerza la impresión de ruido y vibración.',
        explanationHy: 'Բացատրություն․ «Ռ/ր» հնչյունների կրկնությունն ուժեղացնում է աղմուկի ու թրթռման տպավորությունը։',
      },
    ],
    importantRule: {
      es: 'Se repiten sonidos; no es necesario repetir palabras completas. La repetición tampoco tiene que aparecer solo al principio de las palabras.',
      hy: 'Կարևոր է․ Կրկնվում են հնչյունները․ պարտադիր չէ կրկնել ամբողջ բառը։ Հնչյունները կարող են կրկնվել նաև բառերի մեջտեղում։',
    },
  },
  {
    id: 9,
    category: 'figuras',
    categoryLabel: { es: 'Figuras Retóricas', hy: 'Գեղարվեստական հնարքներ' },
    titleEs: 'Onomatopeya',
    titleHy: 'Ձայնարկություն, բնաձայնություն',
    definitionEs: 'La onomatopeya es una palabra o expresión que imita un sonido real.',
    definitionHy: 'Բնաձայնությունը բառ կամ արտահայտություն է, որը նմանակում է իրական ձայնը՝ կենդանու, առարկայի կամ որևէ գործողության։',
    examples: [
      {
        id: '9-1',
        es: 'El reloj hacía tictac.',
        hy: 'Ժամացույցը տիկ-տակ էր անում։',
        explanationEs: '«Tictac» imita el sonido del reloj.',
        explanationHy: 'Բացատրություն․ «Tictac»-ը նմանակում է ժամացույցի ձայնը։',
      },
      {
        id: '9-2',
        es: '¡Pum! La caja cayó al suelo.',
        hy: 'Բո՛ւմ։ Արկղն ընկավ հատակին։',
        explanationEs: '«Pum» reproduce un golpe fuerte.',
        explanationHy: 'Բացատրություն․ «Pum»-ը նմանակում է ուժեղ հարվածի ձայնը։',
      },
      {
        id: '9-3',
        es: 'El gato respondió: «Miau».',
        hy: 'Կատուն պատասխանեց․ «Մյաու»։',
        explanationEs: '«Miau» imita el sonido del gato.',
        explanationHy: 'Բացատրություն․ «Miau»-ն նմանակում է կատվի ձայնը։',
      },
    ],
    comparisonTable: {
      col1Title: { es: 'Aliteración — Ալիտերացիա', hy: 'Ալիտերացիա' },
      col2Title: { es: 'Onomatopeya — Բնաձայնություն', hy: 'Բնաձայնություն' },
      rows: [
        {
          col1: { es: 'Repetición de sonidos dentro de varias palabras.', hy: 'Մի քանի բառերի մեջ հնչյունների կրկնություն։' },
          col2: { es: 'Imitación directa de un sonido mediante una palabra o expresión.', hy: 'Իրական ձայնի անմիջական նմանակում բառով կամ արտահայտությամբ։' },
        },
      ],
    },
  },
  {
    id: 10,
    category: 'adverbios',
    categoryLabel: { es: 'Adverbios', hy: 'Մակբայներ' },
    titleEs: 'Adverbios de modo',
    titleHy: 'Ձևի մակբայներ',
    definitionEs: 'Indican cómo se realiza una acción. Suelen responder a la pregunta «¿cómo?».',
    definitionHy: 'Ցույց են տալիս, թե գործողությունը ինչպես է կատարվում։ Սովորաբար պատասխանում են «ինչպե՞ս» հարցին։',
    quickExamples: [
      { es: 'bien', hy: 'լավ' },
      { es: 'mal', hy: 'վատ' },
      { es: 'despacio', hy: 'դանդաղ' },
      { es: 'deprisa', hy: 'արագ' },
      { es: 'cuidadosamente', hy: 'զգուշորեն' },
    ],
    examples: [
      {
        id: '10-1',
        es: 'Clara explica la lección claramente.',
        hy: 'Կլարան դասը պարզ է բացատրում։',
        explanationEs: '¿Cómo explica? → Claramente.',
        explanationHy: 'Ինչպե՞ս է բացատրում։ → Պարզ (Claramente)։',
      },
      {
        id: '10-2',
        es: 'El niño caminaba despacio.',
        hy: 'Երեխան դանդաղ էր քայլում։',
        explanationEs: '¿Cómo caminaba? → Despacio.',
        explanationHy: 'Ինչպե՞ս էր քայլում։ → Դանդաղ (Despacio)։',
      },
    ],
    importantRule: {
      es: 'Muchos adverbios de modo terminan en «-mente», pero no todos. Por ejemplo: bien, mal, despacio.',
      hy: 'Կարևոր է․ Ձևի շատ մակբայներ ավարտվում են -mente-ով, բայց ոչ բոլորը։ Օրինակ՝ bien, mal, despacio։',
    },
  },
  {
    id: 11,
    category: 'adverbios',
    categoryLabel: { es: 'Adverbios', hy: 'Մակբայներ' },
    titleEs: 'Adverbios de cantidad o grado',
    titleHy: 'Քանակի կամ աստիճանի մակբայներ',
    definitionEs: 'Expresan cantidad, intensidad o grado. Pueden modificar un verbo, un adjetivo u otro adverbio.',
    definitionHy: 'Արտահայտում են քանակ, ուժգնություն կամ աստիճան։ Կարող են լրացնել բային, ածականին կամ մեկ այլ մակբայի։',
    quickExamples: [
      { es: 'mucho', hy: 'շատ' },
      { es: 'poco', hy: 'քիչ' },
      { es: 'bastante', hy: 'բավական' },
      { es: 'demasiado', hy: 'չափազանց' },
      { es: 'muy', hy: 'շատ' },
      { es: 'casi', hy: 'գրեթե' },
    ],
    examples: [
      {
        id: '11-1',
        es: 'Lucía estudia mucho. (Con un verbo — Բայի հետ)',
        hy: 'Լուսիան շատ է սովորում։',
        explanationEs: '«Mucho» indica cuánto estudia (modifica al verbo «estudia»).',
        explanationHy: '«Mucho»-ն ցույց է տալիս, թե որքան է սովորում (լրացնում է «estudia» բային)։',
      },
      {
        id: '11-2',
        es: 'La actividad es muy fácil. (Con un adjetivo — Ածականի հետ)',
        hy: 'Առաջադրանքը շատ հեշտ է։',
        explanationEs: '«Muy» intensifica el adjetivo «fácil».',
        explanationHy: '«Muy»-ն ուժեղացնում է «հեշտ» (fácil) ածականի իմաստը։',
      },
      {
        id: '11-3',
        es: 'Hablas demasiado rápido. (Con otro adverbio — Մեկ այլ մակբայի հետ)',
        hy: 'Դու չափազանց արագ ես խոսում։',
        explanationEs: '«Demasiado» modifica al adverbio «rápido». Indica un grado excesivo.',
        explanationHy: '«Demasiado»-ն լրացնում է «rápido» մակբային՝ ցույց տալով արագության չափազանց բարձր աստիճանը։',
      },
    ],
    comparisonTable: {
      col1Title: { es: 'Leo mucho.', hy: 'Ես շատ եմ կարդում։' },
      col2Title: { es: 'Leo muchos libros.', hy: 'Ես շատ գրքեր եմ կարդում։' },
      rows: [
        {
          col1: { es: 'Mucho: adverbio, porque modifica al verbo «leo».', hy: 'Mucho: մակբայ է, որովհետև լրացնում է «leo» բային։' },
          col2: { es: 'Muchos: determinante cuantificador, acompaña y concuerda con «libros».', hy: 'Muchos: քանակ ցույց տվող որոշիչ է, որովհետև լրացնում է «գրքեր» գոյականին և համաձայնում է նրա հետ։' },
        },
      ],
    },
    importantRule: {
      es: 'Atención: la misma raíz puede desempeñar funciones distintas. Si acompaña a un sustantivo y cambia en género y número, es determinante. Si modifica a un verbo, adjetivo u otro adverbio e invariable, es adverbio.',
      hy: 'Ուշադրություն՝ նույն բառը կարող է տարբեր դերեր ունենալ։ Եթե փոփոխվում է և դրվում գոյականի հետ՝ որոշիչ է, իսկ եթե լրացնում է բային կամ ածականին՝ անփոփոխ մակբայ է։',
    },
  },
  {
    id: 12,
    category: 'adverbios',
    categoryLabel: { es: 'Adverbios', hy: 'Մակբայներ' },
    titleEs: 'Adverbios de afirmación',
    titleHy: 'Հաստատական մակբայներ',
    definitionEs: 'Sirven para afirmar o confirmar una información.',
    definitionHy: 'Օգտագործվում են տեղեկությունը հաստատելու համար։',
    quickExamples: [
      { es: 'sí', hy: 'այո' },
      { es: 'también', hy: 'նույնպես' },
      { es: 'ciertamente', hy: 'անշուշտ' },
      { es: 'efectivamente', hy: 'իսկապես' },
    ],
    examples: [
      {
        id: '12-1',
        es: 'Sí, he entendido la explicación.',
        hy: 'Այո՛, ես հասկացել եմ բացատրությունը։',
        explanationEs: 'Afirma la comprensión de lo explicado.',
        explanationHy: 'Բացատրություն․ Հաստատում է, որ բացատրությունը հասկացվել է։',
      },
      {
        id: '12-2',
        es: 'Yo también quiero participar.',
        hy: 'Ես նույնպես ուզում եմ մասնակցել։',
        explanationEs: '«También» suma una afirmación coincidente con otra persona.',
        explanationHy: 'Բացատրություն․ «También»-ը հաստատում է մասնակցելու ցանկությունը։',
      },
      {
        id: '12-3',
        es: 'Efectivamente, esta es la respuesta correcta.',
        hy: 'Իսկապես, սա ճիշտ պատասխանն է։',
        explanationEs: 'Confirma la veracidad de la respuesta.',
        explanationHy: 'Բացատրություն․ «Efectivamente»-ն վստահաբար հաստատում է պատասխանի ճշմարտացիությունը։',
      },
    ],
    comparisonTable: {
      col1Title: { es: 'Sí (con tilde)', hy: 'Sí (շեշտանշանով)' },
      col2Title: { es: 'Si (sin tilde)', hy: 'Si (առանց շեշտի)' },
      rows: [
        {
          col1: { es: 'Sí, voy contigo. — Expresa afirmación.', hy: 'Այո՛, գալիս եմ քեզ հետ։ — Շեշտանշանով sí-ն հաստատում է («այո»)։' },
          col2: { es: 'Si tengo tiempo, voy contigo. — Introduce una condición.', hy: 'Եթե ժամանակ ունենամ, կգամ քեզ հետ։ — Առանց շեշտի si-ն նշանակում է «եթե»։' },
        },
      ],
    },
    importantRule: {
      es: '¡Atención a «sí» y «si»! El acento gráfico (tilde diacrítica) distingue el adverbio afirmativo «sí» de la conjunción condicional «si».',
      hy: 'Ուշադրություն «sí» և «si» բառերին․ Շեշտանշանով «sí»-ն հաստատական մակբայ է («այո»), իսկ առանց շեշտի «si»-ն պայմանի շաղկապ է («եթե»)։',
    },
  },
  {
    id: 13,
    category: 'determinantes',
    categoryLabel: { es: 'Determinantes y Posesivos', hy: 'Ստացականներ և ցուցականներ' },
    titleEs: 'Posesivos',
    titleHy: 'Ստացականներ',
    definitionEs: 'Los posesivos expresan pertenencia o relación: indican a quién pertenece algo o con quién está relacionado.',
    definitionHy: 'Ստացականները ցույց են տալիս պատկանելություն կամ կապ՝ ում է պատկանում առարկան կամ ում հետ է կապված տվյալ անձը։',
    comparisonTable: {
      col1Title: { es: 'Persona — Դեմք / Formas ante el sustantivo', hy: 'Դեմք և ձևեր' },
      col2Title: { es: 'Ejemplo — Օրինակ (Հայերեն թարգմանությամբ)', hy: 'Օրինակ' },
      rows: [
        {
          col1: { es: 'Yo (ես): mi, mis', hy: '1-ին դեմք՝ mi, mis' },
          col2: { es: 'mi libro', hy: 'իմ գիրքը' },
        },
        {
          col1: { es: 'Tú (դու): tu, tus', hy: '2-րդ դեմք՝ tu, tus' },
          col2: { es: 'tus zapatos', hy: 'քո կոշիկները' },
        },
        {
          col1: { es: 'Él, ella, usted: su, sus', hy: '3-րդ դեմք (եզակի)՝ su, sus' },
          col2: { es: 'su casa', hy: 'նրա / Ձեր տունը' },
        },
        {
          col1: { es: 'Nosotros/as (մենք): nuestro/a/os/as', hy: '1-ին դեմք (հոգնակի)՝ nuestro/a/os/as' },
          col2: { es: 'nuestra clase', hy: 'մեր դասարանը' },
        },
        {
          col1: { es: 'Vosotros/as (դուք): vuestro/a/os/as', hy: '2-րդ դեմք (հոգնակի)՝ vuestro/a/os/as' },
          col2: { es: 'vuestros amigos', hy: 'ձեր ընկերները' },
        },
        {
          col1: { es: 'Ellos, ellas, ustedes: su, sus', hy: '3-րդ դեմք (հոգնակի)՝ su, sus' },
          col2: { es: 'sus libros', hy: 'նրանց / ձեր գրքերը' },
        },
      ],
    },
    examples: [
      {
        id: '13-1',
        es: 'Marcos habla con su hermana.',
        hy: 'Մարկոսը խոսում է իր քրոջ հետ։',
        explanationEs: '«Su» concuerda con «hermana» (singular).',
        explanationHy: '«Su»-ն համաձայնում է «hermana» (եզակի) գոյականի հետ։',
      },
      {
        id: '13-2',
        es: 'Marcos habla con sus hermanas.',
        hy: 'Մարկոսը խոսում է իր քույրերի հետ։',
        explanationEs: 'Cambiamos «su» por «sus» porque «hermanas» es plural.',
        explanationHy: 'Բացատրություն․ Su-ն դարձավ sus, որովհետև «քույրեր» բառը հոգնակի է։',
      },
      {
        id: '13-3',
        es: 'Esta mochila es mía.',
        hy: 'Այս ուսապարկն իմն է։',
        explanationEs: 'Forma pospuesta tónica: «mía».',
        explanationHy: 'Այլ ձև (շեշտված ստացական)՝ mía (իմն է)։',
      },
      {
        id: '13-4',
        es: 'Estos cuadernos son tuyos.',
        hy: 'Այս տետրերը քոնն են։',
        explanationEs: 'Forma pospuesta tónica: «tuyos».',
        explanationHy: 'Այլ ձև (շեշտված ստացական)՝ tuyos (քոնն են)։',
      },
    ],
    importantRule: {
      es: 'Regla importante: El posesivo concuerda con lo poseído, no con el género del poseedor. Además, «su casa» sin contexto puede significar: «նրա տունը», «նրանց տունը», «Ձեր տունը» կամ «ձեր տունը». El significado exacto depende del contexto.',
      hy: 'Կարևոր կանոն․ Ստացականի ձևը համաձայնում է այն գոյականի հետ, որին լրացնում է, ոչ թե տիրոջ սեռի հետ։ Բացի այդ, «su casa» արտահայտությունն առանց համատեքստի կարող է նշանակել «նրա տունը», «նրանց տունը», «Ձեր տունը» կամ «ձեր տունը»։ Իմաստը պարզվում է համատեքստից։',
    },
  },
  {
    id: 14,
    category: 'determinantes',
    categoryLabel: { es: 'Determinantes y Demostrativos', hy: 'Ցուցականներ' },
    titleEs: 'Demostrativos',
    titleHy: 'Ցուցականներ',
    definitionEs: 'Los demostrativos señalan personas, objetos o realidades y permiten situarlos en relación con los participantes del discurso. En la explicación básica se distinguen tres grados de distancia.',
    definitionHy: 'Ցուցականները մատնանշում են անձեր, առարկաներ կամ երևույթներ։ Հիմնական բացատրության մեջ առանձնացվում է հեռավորության երեք աստիճան։',
    comparisonTable: {
      col1Title: { es: 'Distancia — Հեռավորություն', hy: 'Հեռավորության աստիճան' },
      col2Title: { es: 'Masculino / Femenino (Singular / Plural)', hy: 'Արական և Իգական ձևեր' },
      rows: [
        {
          col1: { es: 'Cerca de quien habla', hy: 'Խոսողին մոտ' },
          col2: { es: 'este / estos  |  esta / estas', hy: 'այս (արական / իգական, եզակի / հոգնակի)' },
        },
        {
          col1: { es: 'Distancia media, a menudo cerca del interlocutor', hy: 'Միջին հեռավորություն, հաճախ՝ խոսակցին մոտ' },
          col2: { es: 'ese / esos  |  esa / esas', hy: 'այդ (արական / իգական, եզակի / հոգնակի)' },
        },
        {
          col1: { es: 'Lejos de ambos', hy: 'Երկուսից էլ հեռու' },
          col2: { es: 'aquel / aquellos  |  aquella / aquellas', hy: 'այն (արական / իգական, եզակի / հոգնակի)' },
        },
      ],
    },
    examples: [
      {
        id: '14-1',
        es: 'Este libro que tengo en la mano es interesante.',
        hy: 'Այս գիրքը, որն իմ ձեռքում է, հետաքրքիր է։',
        explanationEs: '«Este» señala un libro cercano a quien habla.',
        explanationHy: 'Բացատրություն․ Este-ն ցույց է տալիս խոսողին մոտ գտնվող գիրքը։',
      },
      {
        id: '14-2',
        es: 'Esa mochila que tienes a tu lado es bonita.',
        hy: 'Քո կողքին գտնվող այդ ուսապարկը գեղեցիկ է։',
        explanationEs: '«Esa» señala algo situado junto al interlocutor.',
        explanationHy: 'Բացատրություն․ Esa-ն ցույց է տալիս խոսակցի կողքին գտնվող առարկան։',
      },
      {
        id: '14-3',
        es: 'Aquel edificio del fondo es una biblioteca.',
        hy: 'Այն շենքը՝ հեռվում, գրադարան է։',
        explanationEs: '«Aquel» señala algo alejado de ambos.',
        explanationHy: 'Բացատրություն․ Aquel-ը մատնանշում է երկուսից էլ հեռու գտնվող առարկան։',
      },
    ],
    quickExamples: [
      { es: 'este libro (masc. sg.)', hy: 'այս գիրքը' },
      { es: 'esta mesa (fem. sg.)', hy: 'այս սեղանը' },
      { es: 'estos libros (masc. pl.)', hy: 'այս գրքերը' },
      { es: 'estas mesas (fem. pl.)', hy: 'այս սեղանները' },
    ],
    importantRule: {
      es: 'Formas neutras: «esto», «eso», «aquello». Las formas neutras no acompañan a un sustantivo. Se usan para referirse a algo no identificado, una situación o una idea.\n✅ Este libro. — Այս գիրքը։\n✅ ¿Qué es esto? — Սա ի՞նչ է։ / No entiendo eso. — Ես դա չեմ հասկանում։\n❌ Esto libro (INCORRECTO).',
      hy: 'Չեզոք ձևեր՝ «esto», «eso», «aquello»։ Չեզոք ձևերը գոյականից առաջ չեն դրվում։ Դրանք կարող են մատնանշել դեռ չճանաչված առարկա, իրավիճակ կամ միտք։\n✅ Este libro. — Այս գիրքը։\n✅ ¿Qué es esto? — Սա ի՞նչ է։ / No entiendo eso. — Ես դա չեմ հասկանում։\n❌ Esto libro (ՍԽԱԼ Է)։',
    },
    breakdownAnalysis: {
      phrase: {
        es: 'Mi hermana lee este libro muy despacio.',
        hy: 'Իմ քույրն այս գիրքը շատ դանդաղ է կարդում։',
      },
      parts: [
        {
          word: 'Mi',
          tagEs: 'posesivo',
          tagHy: 'Ստացական',
          noteEs: 'indica relación / pertenencia (¿de quién es la hermana?).',
          noteHy: 'ցույց է տալիս՝ ում քույրը։',
        },
        {
          word: 'Este',
          tagEs: 'demostrativo',
          tagHy: 'Ցուցական',
          noteEs: 'señala el libro situado cerca.',
          noteHy: 'մատնանշում է գիրքը։',
        },
        {
          word: 'Muy',
          tagEs: 'adverbio de grado',
          tagHy: 'Աստիճանի մակբայ',
          noteEs: 'intensifica el significado de «despacio».',
          noteHy: 'ուժեղացնում է «դանդաղ» բառի իմաստը։',
        },
        {
          word: 'Despacio',
          tagEs: 'adverbio de modo',
          tagHy: 'Ձևի մակբայ',
          noteEs: 'indica el modo o cómo lee la acción.',
          noteHy: 'ցույց է տալիս՝ ինչպես է կարդում։',
        },
      ],
    },
  },
];

export interface QuizQuestion {
  id: string;
  questionEs: string;
  questionHy: string;
  contextHint?: string;
  options: { textEs: string; textHy: string; isCorrect: boolean }[];
  explanation: { es: string; hy: string };
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    questionEs: '¿Qué figura retórica se utiliza en «La luna sonreía sobre los tejados»?',
    questionHy: 'Ի՞նչ գեղարվեստական հնարք է կիրառված «La luna sonreía sobre los tejados» արտահայտության մեջ։',
    options: [
      { textEs: 'Personificación', textHy: 'Անձնավորում', isCorrect: true },
      { textEs: 'Antítesis', textHy: 'Հակադրություն', isCorrect: false },
      { textEs: 'Onomatopeya', textHy: 'Բնաձայնություն', isCorrect: false },
      { textEs: 'Símbolo', textHy: 'Խորհրդանիշ', isCorrect: false },
    ],
    explanation: {
      es: 'Se atribuye una acción humana (sonreír) a la luna, un elemento no humano.',
      hy: 'Լուսնին վերագրվում է մարդուն բնորոշ գործողություն՝ ժպտալը (sonreír)։',
    },
  },
  {
    id: 'q2',
    questionEs: 'En «Estás cerca de mis ojos, pero lejos de mi corazón», ¿cuál es la figura principal?',
    questionHy: '«Estás cerca de mis ojos, pero lejos de mi corazón» նախադասության մեջ ո՞րն է գլխավոր հնարքը։',
    options: [
      { textEs: 'Antítesis', textHy: 'Հակադրություն', isCorrect: true },
      { textEs: 'Aliteración', textHy: 'Ալիտերացիա', isCorrect: false },
      { textEs: 'Sinestesia', textHy: 'Սինեսթեզիա', isCorrect: false },
      { textEs: 'Paradoja', textHy: 'Պարադոքս', isCorrect: false },
    ],
    explanation: {
      es: 'Se contraponen «cerca» y «lejos» para enfatizar el contraste entre cercanía física y distancia emocional.',
      hy: 'Հակադրվում են «cerca» (մոտ) և «lejos» (հեռու) բառերը՝ ֆիզիկական մոտիկությունն ու հոգեբանական հեռավորությունն ընդգծելու համար։',
    },
  },
  {
    id: 'q3',
    questionEs: '«Su voz era dulce» combina el oído con el gusto. ¿Cómo se llama este recurso?',
    questionHy: '«Su voz era dulce» միավորում է լսողությունն ու համի զգացողությունը։ Ինչպե՞ս է կոչվում այս հնարքը։',
    options: [
      { textEs: 'Sinestesia', textHy: 'Սինեսթեզիա', isCorrect: true },
      { textEs: 'Metáfora', textHy: 'Փոխաբերություն', isCorrect: false },
      { textEs: 'Aliteración', textHy: 'Ալիտերացիա', isCorrect: false },
      { textEs: 'Símbolo', textHy: 'Խորհրդանիշ', isCorrect: false },
    ],
    explanation: {
      es: 'La sinestesia combina sensaciones de sentidos distintos (oído + gusto).',
      hy: 'Սինեսթեզիան տարբեր զգայարանների (լսողություն + համ) զգացողությունների համադրումն է։',
    },
  },
  {
    id: 'q4',
    questionEs: '¿Cuál es la diferencia entre «Tus dientes son perlas» y «Tus dientes son como perlas»?',
    questionHy: 'Ո՞րն է տարբերությունը «Tus dientes son perlas»-ի և «Tus dientes son como perlas»-ի միջև։',
    options: [
      { textEs: 'La primera es metáfora (A es B); la segunda es comparación (usa «como»).', textHy: 'Առաջինը փոխաբերություն է (A=B), երկրորդը՝ համեմատություն («como»-ով)։', isCorrect: true },
      { textEs: 'Ambas son exactamente lo mismo.', textHy: 'Երկուսն էլ նույնն են։', isCorrect: false },
      { textEs: 'La primera es antítesis y la segunda sinestesia.', textHy: 'Առաջինը հակադրություն է, երկրորդը՝ սինեսթեզիա։', isCorrect: false },
    ],
    explanation: {
      es: 'La metáfora identifica directamente (A es B), mientras que el símil o comparación usa nexos explícitos como «como».',
      hy: 'Փոխաբերությունը նույնացնում է առարկաները, իսկ համեմատությունն օգտագործում է «ինչպես» (como) կապը։',
    },
  },
  {
    id: 'q5',
    questionEs: '¿Qué diferencia ortográfica y semántica existe entre «sí» y «si» en español?',
    questionHy: 'Ի՞նչ տարբերություն կա շեշտանշանով «sí»-ի և առանց շեշտի «si»-ի միջև։',
    options: [
      { textEs: '«Sí» con tilde es afirmación (այո); «si» sin tilde es condición (եթե).', textHy: '«Sí» շեշտով հաստատում է (այո), իսկ «si» առանց շեշտի՝ պայման (եթե)։', isCorrect: true },
      { textEs: 'Ambas palabras significan lo mismo.', textHy: 'Երկու բառերն էլ նույնն են նշանակում։', isCorrect: false },
      { textEs: '«Si» es adverbio de cantidad.', textHy: '«Si»-ն քանակի մակբայ է։', isCorrect: false },
    ],
    explanation: {
      es: 'La tilde diacrítica distingue el adverbio de afirmación «sí» de la conjunción condicional «si».',
      hy: 'Շեշտը տարբերում է հաստատական մակբայ «sí»-ն (այո) պայմանի շաղկապ «si»-ից (եթե)։',
    },
  },
  {
    id: 'q6',
    questionEs: 'En la frase «Mi hermana lee este libro muy despacio», ¿qué función cumple la palabra «muy»?',
    questionHy: '«Mi hermana lee este libro muy despacio» նախադասության մեջ ի՞նչ դեր ունի «muy» բառը։',
    options: [
      { textEs: 'Adverbio de grado / cantidad (intensifica a «despacio»).', textHy: 'Աստիճանի / քանակի մակբայ (ուժեղացնում է «despacio»-ն)։', isCorrect: true },
      { textEs: 'Determinante posesivo.', textHy: 'Ստացական որոշիչ։', isCorrect: false },
      { textEs: 'Demostrativo neutro.', textHy: 'Չեզոք ցուցական։', isCorrect: false },
      { textEs: 'Adverbio de modo.', textHy: 'Ձևի մակբայ։', isCorrect: false },
    ],
    explanation: {
      es: '«Muy» modifica al adverbio de modo «despacio», aumentando su intensidad.',
      hy: '«Muy»-ն լրացնում է «despacio» ձևի մակբային՝ ցույց տալով աստիճանը։',
    },
  },
  {
    id: 'q7',
    questionEs: '¿Por qué la frase «Esto libro» es gramaticalmente incorrecta?',
    questionHy: 'Ինչո՞ւ է «Esto libro» արտահայտությունը քերականորեն սխալ։',
    options: [
      { textEs: 'Porque las formas neutras (esto, eso, aquello) no acompañan a sustantivos; debe ser «Este libro».', textHy: 'Որովհետև չեզոք ձևերը (esto, eso, aquello) գոյականների հետ չեն դրվում, պետք է լինի «Este libro»։', isCorrect: true },
      { textEs: 'Porque «libro» es femenino.', textHy: 'Որովհետև «libro»-ն իգական է։', isCorrect: false },
      { textEs: 'Porque debe ser plural.', textHy: 'Որովհետև պետք է հոգնակի լինի։', isCorrect: false },
    ],
    explanation: {
      es: 'Las formas neutras nunca acompañan directamente a un sustantivo.',
      hy: 'Չեզոք ցուցականները երբեք անմիջապես գոյականի հետ չեն գործածվում։',
    },
  },
];
