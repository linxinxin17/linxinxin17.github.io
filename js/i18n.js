const ui = {
    en: {
        brandName: 'XIN LIN', personName: 'Xin Lin',
        home: 'HOME', works: 'WORKS', lab: 'LAB', profile: 'PROFILE', categories: 'CATEGORIES',
        physical: 'ARTWORKS', digital: 'DIGITAL ART', interactive: 'INTERACTIVE MEDIA',
        all: 'ALL', installation: '#Installation', interactiveArt: '#Interactive Art', sculpture: '#Sculpture',
        painting: '#Painting', performance: '#Performance', threeD: '#3D Modeling', game: '#Game',
        web: '#Web', dataViz: '#Data Visualisation', back: 'BACK', prev: 'PREV', next: 'NEXT', projectNavigation: 'Project navigation',
        techniques: 'TECHNIQUES:', languageLabel: 'Change language', selectionTitle: 'Select Category', homeTitle: 'Multidisciplinary Artist', image: 'image', video: 'project video',
        profileTitle: 'Profile', labTitle: 'Lab', launch: 'Launch App', original: 'Original reference', copy: 'Xin Lin copy',
        themeToLight: 'Use light theme', themeToDark: 'Use dark theme',
        slogan: 'Multidisciplinary Artist / Creative Technologist <br>"Exploring the convergence of physical matter, digital minds, and biological signals."'
    },
    es: {
        brandName: 'XIN LIN', personName: 'Xin Lin',
        home: 'INICIO', works: 'OBRAS', lab: 'LABORATORIO', profile: 'PERFIL', categories: 'CATEGORÍAS',
        physical: 'OBRAS ARTÍSTICAS', digital: 'ARTE DIGITAL', interactive: 'MEDIOS INTERACTIVOS',
        all: 'TODO', installation: '#Instalación', interactiveArt: '#Arte Interactivo', sculpture: '#Escultura',
        painting: '#Pintura', performance: '#Performance', threeD: '#Modelado 3D', game: '#Juego',
        web: '#Web', dataViz: '#Visualización de Datos', back: 'VOLVER', prev: 'ANTERIOR', next: 'SIGUIENTE', projectNavigation: 'Navegación de proyectos',
        techniques: 'TÉCNICAS:', languageLabel: 'Cambiar idioma', selectionTitle: 'Seleccionar categoría', homeTitle: 'Artista multidisciplinar', image: 'imagen', video: 'vídeo del proyecto',
        profileTitle: 'Perfil', labTitle: 'Laboratorio', launch: 'Abrir aplicación', original: 'Referencia original', copy: 'Copia de Xin Lin',
        themeToLight: 'Usar tema claro', themeToDark: 'Usar tema oscuro',
        slogan: 'Artista multidisciplinar / Tecnóloga creativa <br>"Explorando la convergencia entre materia física, mentes digitales y señales biológicas."'
    },
    zh: {
        brandName: '林欣', personName: '林欣',
        home: '首页', works: '作品', lab: '实验室', profile: '简介', categories: '分类',
        physical: '艺术作品', digital: '数字艺术', interactive: '交互媒体',
        all: '全部', installation: '#装置艺术', interactiveArt: '#互动艺术', sculpture: '#雕塑',
        painting: '#绘画', performance: '#行为艺术', threeD: '#3D建模', game: '#游戏',
        web: '#网页', dataViz: '#数据可视化', back: '返回', prev: '上一件', next: '下一件', projectNavigation: '作品切换',
        techniques: '技术：', languageLabel: '切换语言', selectionTitle: '选择分类', homeTitle: '跨学科艺术家', image: '图片', video: '项目视频',
        profileTitle: '个人简介', labTitle: '实验室', launch: '打开应用', original: '原作参考', copy: '林欣临摹',
        themeToLight: '切换为白色主题', themeToDark: '切换为黑色主题',
        slogan: '跨学科艺术家 / 创意技术研究者 <br>“探索物质、数字思维与生物信号的交汇。”'
    }
};

const THEME_STORAGE_KEY = 'xin-lin-theme';
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
document.documentElement.dataset.theme = savedTheme === 'light' ? 'light' : 'dark';

const filterKeys = {
    all: 'all', installation: 'installation', 'interactive-art': 'interactiveArt', sculpture: 'sculpture',
    painting: 'painting', performance: 'performance', '3d': 'threeD', game: 'game',
    web: 'web', 'data-viz': 'dataViz'
};

const galleryCategoryKeys = {
    'pages/work/fine_art/work1.html': 'interactiveArt',
    'pages/work/fine_art/work2.html': 'sculpture',
    'pages/work/fine_art/work3.html': 'sculpture',
    'pages/work/fine_art/work4.html': ['sculpture', 'interactiveArt'],
    'pages/work/fine_art/work5.html': 'performance',
    'pages/work/fine_art/work6.html': 'sculpture',
    'pages/work/fine_art/work7.html': 'sculpture',
    'pages/work/fine_art/work8.html': ['sculpture', 'interactiveArt'],
    'pages/work/fine_art/work9.html': 'installation',
    'pages/work/fine_art/work10.html': ['painting', 'interactiveArt'],
    'pages/work/fine_art/work11.html': 'interactiveArt',
    'pages/work/fine_art/work12.html': 'interactiveArt',
    'pages/work/fine_art/work13.html': 'installation',
    'pages/work/fine_art/work14.html': 'interactiveArt',
    'pages/work/fine_art/work15.html': 'interactiveArt',
    'pages/work/fine_art/work16.html': 'interactiveArt',
    'pages/work/fine_art/work17.html': 'painting',
    'pages/work/fine_art/work18.html': 'sculpture',
    'pages/work/fine_art/work19.html': 'sculpture',
    'pages/work/digital_art/work1.html': 'threeD',
    'pages/work/digital_art/work2.html': 'threeD',
    'pages/work/digital_art/work4.html': 'game',
    'pages/work/interactive/work1.html': 'dataViz',
    'pages/work/interactive/work2.html': 'web'
};

const spanishSourceProjects = new Set([
    'pages/work/digital_art/work1.html',
    'pages/work/fine_art/work1.html', 'pages/work/fine_art/work2.html', 'pages/work/fine_art/work3.html',
    'pages/work/fine_art/work4.html', 'pages/work/fine_art/work5.html', 'pages/work/fine_art/work6.html',
    'pages/work/fine_art/work7.html', 'pages/work/fine_art/work8.html', 'pages/work/fine_art/work9.html',
    'pages/work/fine_art/work10.html', 'pages/work/fine_art/work11.html', 'pages/work/fine_art/work12.html',
    'pages/work/fine_art/work13.html', 'pages/work/fine_art/work14.html', 'pages/work/fine_art/work15.html',
    'pages/work/interactive/work1.html', 'pages/work/interactive/work2.html'
]);

function project(title, meta, techniques, description, links = []) {
    return { title, meta, techniques, description, links };
}

const projectTranslations = {
    'pages/work/fine_art/work1.html': {
        en: project('IMAGES OF RESONANCE', "2024 / Bachelor's graduation project, interactive installation",
            ['Water and glass', 'EEG device', 'Dimensions: tank 10 x 100 x 80 cm'],
            ["Developed as my bachelor's graduation project, this work explores inner human communication and interaction, taking the brain as its starting point. An EEG device generates images from real-time data, which are projected in an installation that simulates a cerebral space.", 'The installation visualises mental activity, emotional shifts, and interactions among people, devices and the environment.'],
            ['Bridges of Nonverbal Communication: an experimental poetic audiovisual narrative controlled by EEG signals']),
        zh: project('共振映像', '2024 / 本科毕业创作，互动装置',
            ['水与玻璃', '脑电设备', '尺寸：水槽 10 x 100 x 80 厘米'],
            ['作为我的本科毕业创作，本作品以大脑为出发点，探索人类内在的交流与互动。脑电设备采集实时数据并生成图像，再投影到模拟脑部空间的装置中。', '装置将心理活动、情绪变化，以及人与人、设备和环境之间的互动可视化。'],
            ['非语言沟通的桥梁：由脑电信号控制的实验性诗意视听叙事'])
    },
    'pages/work/fine_art/work2.html': {
        en: project('COSMIC BRAIN FANTASY SPACE', '2024 / Sculpture',
            ['Ceramics, glass and metal', 'Variable dimensions'],
            ['This work explores the relationship between the cerebral microcosm and the universal macrocosm. Organic forms and translucent materials invite the viewer into a space of reflection on the immensity of the human mind.']),
        zh: project('脑宇宙幻想空间', '2024 / 雕塑',
            ['陶瓷、玻璃与金属', '尺寸可变'],
            ['作品探索大脑微观世界与宇宙宏观世界之间的关系。通过有机形态和半透明材料，引导观众进入一个思考人类心智广阔性的空间。'])
    },
    'pages/work/fine_art/work3.html': {
        en: project('WANDERING GODS OF FUJIAN: CELESTIAL CHILD', '2024 / Wearable installation',
            ['Glass', 'Horizontal dimensions: 32 x 80 x 30 cm', 'Shandong, China'],
            ['This wearable installation explores identity and personal experience through the traditional folk culture of Fujian, my home province. It is based on the Celestial Child figure from Fujian wandering-god processions.', 'The work consists of a transparent glass hood that merges with the wearer\'s face and two glass prostheses that are said to increase intelligence when tapped against the head. Wearing them transforms the artist into a wandering deity and opens a reflection on identity.']),
        zh: project('福建游神系列：仙童', '2024 / 可穿戴装置',
            ['玻璃', '水平放置尺寸：32 x 80 x 30 厘米', '中国山东'],
            ['这件可穿戴装置从我的家乡福建传统民俗文化出发，通过游神中的仙童形象探索身份与个人经验。', '作品由三部分构成：一件与佩戴者面部融合的透明玻璃头罩，以及两件据说敲击头部便能增长智慧的透明玻璃义肢。佩戴它们使艺术家转化为游神角色，并由此反思身份。'])
    },
    'pages/work/fine_art/work4.html': {
        en: project('DICE', '2024 / Sculpture and interactive art',
            ['Glass and blanket, mixed media', 'Dimensions: 20 x 100 x 100 cm', 'Shandong, China'],
            ['This interactive installation uses transparent dice to suggest the openness of information. Their transformation from cubes to spheres introduces uncertainty and reveals unknown properties.', 'Fragile glass symbolises the risk of discovering truth, in contrast with the direct expression of the dice\'s transparent shell. The work reflects on trust, authenticity, and the relationship between inner and outer worlds.']),
        zh: project('骰子', '2024 / 雕塑、互动艺术',
            ['玻璃、毯子，综合材料', '尺寸：20 x 100 x 100 厘米', '中国山东'],
            ['这件互动装置使用透明骰子暗示信息的开放性。形态从立方体转变为球体，为作品加入不确定性并显露未知属性。', '易碎的玻璃象征发现真相的风险，与骰子透明外壳的直接表达形成对照。作品由此反思信任、真实性，以及内在与外部世界之间的关系。'])
    },
    'pages/work/fine_art/work5.html': {
        en: project('HIDDEN', '2024 / Installation and performance',
            ['Soil, silicone and jute, mixed media', 'Dimensions: 1.5 x 150 x 160 cm', 'Video: 1 min 39 sec', 'Beijing, China'],
            ['This work explores the fusion of the human body with its environment and the relationship between the individual and nature.', 'Through contact with soil, it seeks a deep and primal connection in which the body becomes part of the landscape. Organic materials emphasise this symbiosis and invite reflection on how we hide or reveal ourselves in nature.']),
        zh: project('匿', '2024 / 装置、行为艺术',
            ['泥土、硅胶与黄麻，综合材料', '尺寸：1.5 x 150 x 160 厘米', '视频：1 分 39 秒', '中国北京'],
            ['作品探索人体与环境的融合，以及个体与自然之间的关系。', '身体通过与泥土接触建立深层而原始的连接，并成为景观的一部分。有机材料强化了这种共生关系，也邀请观众思考我们如何在自然环境中隐藏或显露自身。'])
    },
    'pages/work/fine_art/work6.html': {
        en: project('PAT PAT', '2023 / Installation and performance',
            ['Purple clay, teapot cord and projector, mixed media', 'Variable dimensions', 'Video: 1 min 11 sec', 'Jingdezhen, China'],
            ['This project engages with the local ceramic culture of Jingdezhen. Traditional materials such as purple clay and teapot cords form a tactile, sensory experience.', 'A small pat initiates a chain of reactions, symbolising how minor actions can resonate through a larger system and reflecting on fragility and resonance in everyday life.']),
        zh: project('拍一拍', '2023 / 装置、行为艺术',
            ['紫砂泥、壶绳与投影仪，综合材料', '尺寸可变', '视频：1 分 11 秒', '中国景德镇'],
            ['项目与景德镇当地陶瓷文化展开互动，以紫砂泥和壶绳等传统材料构成触觉与感官体验。', '一次轻微的拍击会触发一连串反应，象征细小行动在更大系统中的影响，并反思日常生活中的脆弱性与共振。'])
    },
    'pages/work/fine_art/work7.html': {
        en: project('TRIBUTE TO JINGDEZHEN: COLLISION AND REPLICA', '2023 / Installation and performance',
            ['Ceramics, bamboo and hemp rope, mixed media', 'Variable dimensions', 'Jingdezhen, China'],
            ['This installation and performance engages with local culture and pays tribute to Jingdezhen\'s ceramic tradition and craftsmanship.', 'Local utensils are observed and recreated through collisions between clay and ceramics. A bamboo rack supports and dries the replicated objects during the making process.']),
        zh: project('致敬景德镇：碰撞与复刻', '2023 / 装置、行为艺术',
            ['陶瓷、竹子与麻绳，综合材料', '尺寸可变', '中国景德镇'],
            ['这件装置与行为作品介入当地文化，向景德镇传统陶瓷文化与工匠精神致敬。', '作品以观察者视角寻找当地器皿，通过泥土与陶瓷的碰撞复刻器物的纹样和形态；竹制架用于在创作过程中承托并晾干这些复刻物。'])
    },
    'pages/work/fine_art/work8.html': {
        en: project('INTELLIGENT REFLECTION SERIES', '2023 / Sculpture and interactive art',
            ['Casting', 'Edition I: brass masks and triangular pyramids', 'Edition II: bronze head and triangular pyramids', 'Valencia, Spain'],
            ['The Intelligent Reflection series has two editions: one formed by masks and another by geometric heads. Triangular pyramids and triangles create varied textures and invite tactile interaction.', 'The work prompts reflection on artificial intelligence. The viewer\'s interaction directly changes the form and presentation of the piece, foregrounding the importance of responsible, development-oriented uses of AI.']),
        zh: project('智能映照系列', '2023 / 雕塑、互动艺术',
            ['铸造', '第一版：黄铜面具与三角锥体', '第二版：青铜头部与三角锥体', '西班牙瓦伦西亚'],
            ['《智能映照》系列包含两个版本：一个由面具构成，另一个采用几何头部。立体三角锥与三角形形成不同质感，并邀请观众触摸互动。', '作品借互动引发对人工智能的思考。观众的参与会直接改变作品的形态和呈现，强调以负责任且有建设性的方式使用人工智能。'])
    },
    'pages/work/fine_art/work9.html': {
        en: project('INSURMOUNTABLE BORDER', '2023 / Installation',
            ['Plastic film, bulb lacquer, water, fishing line, acetate, balsa wood, red thread, charcoal powder, projector and environmental sound', 'Variable dimensions', 'Video: 1 min 51 sec', 'Valencia, Spain'],
            ['This work addresses disaster and was inspired by the 2022 fire in a building in Urumqi, Xinjiang, while also referring to the broader consequences of fires.', 'It commemorates and mourns the tragedy while drawing attention to the dangers and effects of fire through installation, interaction and empathy.', 'Presented in a dark space, the installation combines 100 painted slides, ten cubes, stepped plastic film, projected water effects and a soundtrack of fire, water and bells.']),
        zh: project('无法跨越的边界', '2023 / 装置',
            ['保鲜膜、灯泡漆、水、鱼线、醋酸片、轻木、红线、炭粉、投影仪与环境声音', '尺寸可变', '视频：1 分 51 秒', '西班牙瓦伦西亚'],
            ['作品讨论灾难，灵感来自 2022 年新疆乌鲁木齐一栋建筑发生的火灾，同时也指向所有火灾带来的负面影响。', '它一方面纪念并哀悼这场悲剧，另一方面通过装置互动和由共情引发的感受，使人们关注火灾的危险与后果。', '装置位于黑暗空间，由 100 张手绘幻灯片、10 个立方体、层叠保鲜膜、水波投影，以及火、水和钟声组成的声音共同构成。'])
    },
    'pages/work/fine_art/work10.html': {
        en: project('THE WORLD', '2022 / Painting and interactive art',
            ['Encaustic, oil, wood, glass, adhesive mirror on plywood and soil', 'Dimensions: 186 x 106 x 123 cm', 'Valencia, Spain'],
            ['Every living being perceives a different world according to environmental and personal conditions such as angle, light, shadow or illness.', 'The idea of a varied world becomes a reflection on perception, space, social relationships and interaction. Each viewer inhabits a specific and subjective world shaped by their own way of seeing.']),
        zh: project('世界', '2022 / 绘画、互动艺术',
            ['蜡画、油画颜料、木材、玻璃、胶面镜、胶合板与泥土', '尺寸：186 x 106 x 123 厘米', '西班牙瓦伦西亚'],
            ['每个生命都会因角度、光线、阴影或疾病等环境与个人因素而感知到不同的世界。', '作品把“多样的世界”转化为对感知、空间、社会关系与互动的思考，并提出每位观众都栖居在一个由自身观看方式塑造的、独特而主观的世界中。'])
    },
    'pages/work/fine_art/work11.html': {
        en: project('BLIND SPOT', '2025 / Interactive installation, sound art and video mapping',
            ['Arduino and ultrasonic sensor', 'Two cameras: DeepFace in Python and a P5.js facial mesh', 'WebSocket, MadMapper, MiniMad and two projectors', 'Cardboard boxes, Zoom H2 recorder and piezo microphone'],
            ['Blind Spot is an interactive installation combining experimental art, sound and video mapping to explore voyeurism and the shifting identity of observer and observed.', 'As visitors approach the installation, an ultrasonic sensor, Arduino and cameras capture facial data and transform identity in real time, exposing the complexity of privacy and recognition.', 'Whispers, footsteps, conversations and contact sounds between objects build an immersive soundscape in which people, objects and space enter into dialogue.'],
            ['Project video', 'Sound composition']),
        zh: project('盲区', '2025 / 互动装置、声音艺术与影像映射',
            ['Arduino 与超声波传感器', '两台摄像机：Python DeepFace 与 P5.js 面部网格', 'WebSocket、MadMapper、MiniMad 与两台投影仪', '纸箱、Zoom H2 录音机与压电麦克风'],
            ['《盲区》是一件结合实验艺术、声音与影像映射的互动装置，探索窥视，以及观察者与被观察者之间不断转换的身份。', '观众靠近装置时，超声波传感器、Arduino 和摄像机会捕捉面部数据并实时改变身份，从而揭示隐私暴露和身份识别的复杂性。', '低语、脚步、对话和物体接触声构成沉浸式声景，使人、物体与空间展开对话。'],
            ['项目视频', '声音作品'])
    },
    'pages/work/fine_art/work12.html': {
        en: project('INNERSIGHT 2.0', '2025 / Interactive installation, EEG and mobile app, current version',
            ['Sichiray EEG headset, webcam and Android mobile app', 'Flutter, Dart, Processing, TouchDesigner and OSC', 'Braille interaction, tactile drawing and EEG data visualisation', 'Volumens 2025, Centre del Carme Cultura Contemporània, Valencia'],
            ['Inspired by people with sensory disabilities or difficulties in verbal communication, the work explores art, perception, technology and communication through haptic visuality: an image can be felt as well as seen.', 'A five-page mobile app replaces the earlier sixteen-button keyboard with project information, EEG visualisation, Braille interaction, tactile drawing and a Braille reference, creating a multisensory dialogue between mind, body and technology.'],
            ['Explanatory video']),
        zh: project('内视 2.0', '2025 / 互动装置、脑电与移动应用，当前版本',
            ['Sichiray 脑电头环、摄像头与 Android 移动应用', 'Flutter、Dart、Processing、TouchDesigner 与 OSC', '盲文互动、触觉绘画与脑电数据可视化', 'Volumens 2025，Centre del Carme Cultura Contemporània，西班牙瓦伦西亚'],
            ['作品受到感官障碍者及语言沟通困难者经验的启发，从触觉视觉理论出发，探索艺术、感知、技术与交流：图像不仅可以被看见，也可以被感受。', '五页移动应用取代了早期的十六键实体键盘，包含作品介绍、脑电可视化、盲文互动、触觉绘画与盲文参考，在心智、身体和技术之间建立多感官对话。'],
            ['解说视频'])
    },
    'pages/work/fine_art/work13.html': {
        en: project('SWING OF SHADOWS', '2025 / Interactive installation with light, movement, text and shadow, team project',
            ['Arduino UNO, vibration motors, ESP32, 250V relay and speaker', 'Linestra filament LED, fishing line and servomotors', 'Wire letters, white fabric and moving-shadow system', 'Team: Xin Lin and Geovannys Rafael Balbera Pertuz', 'Valencia, Spain'],
            ['Swing of Shadows combines light, movement, text and shadow to explore the passage of time, traces of growth and the relationship between people and inhabited space.', 'An elongated LED tube replaces the swing seat and projects word-shadows upward onto white fabric. As the swing moves, the text becomes an evolving visual poem about time and memory.', 'Vibrators and speakers beneath the fabric produce a ticking rhythm and subtly move the wire letters, joining visual, auditory and tactile dimensions in one experience.']),
        zh: project('影之秋千', '2025 / 互动装置：灯光、运动、文字与影子，团队项目',
            ['Arduino UNO、振动马达、ESP32、250V 继电器与扬声器', 'Linestra 灯丝 LED、鱼线与伺服电机', '铁丝文字、白布与动态影子系统', '团队：林欣、Geovannys Rafael Balbera Pertuz', '西班牙瓦伦西亚'],
            ['《影之秋千》结合灯光、运动、文字与影子，探索时间流动、成长痕迹，以及人与所居空间之间的关系。', '秋千座椅被一根细长 LED 灯管取代，光线向上把文字影子投射到白布上。秋千摆动时，文字变成关于时间与记忆的流动视觉诗。', '白布下方的振动器与扬声器发出滴答节奏并使铁丝文字轻微位移，让视觉、听觉和触觉在同一体验中相遇。'])
    },
    'pages/work/fine_art/work14.html': {
        en: project('LIGHT POLLUTION', '2025 / Interactive audiovisual installation, team project',
            ['TouchDesigner, MediaPipe, GLSL and OBS Virtual Camera', 'Intel RealSense D455 sensor and RGB camera', 'Body tracking, audiovisual transitions and distance interaction', 'Team: Xin Lin, Carlota Roca and Deni Casas', 'Volumens 2025, Centre del Carme Cultura Contemporània, Valencia'],
            ['Light Pollution is an interactive installation presented at the Volumens 2025 International Art Festival at Centre del Carme Cultura Contemporània in Valencia. The work addresses the growth of artificial light and its impact on circadian rhythms, living beings and our ability to see the stars.', 'The work connects three elements: person, sky and city. As a visitor approaches, the sky gradually disappears and the city emerges, asking who produces this pollution and what artificial light causes us to lose.', 'A calm, ethereal natural soundscape gives way to a more overwhelming urban atmosphere, prompting critical reflection on technology and the nocturnal environment.']),
        zh: project('光污染', '2025 / 互动视听装置，团队项目',
            ['TouchDesigner、MediaPipe、GLSL 与 OBS 虚拟摄像机', 'Intel RealSense D455 传感器与 RGB 摄像机', '身体追踪、视听过渡与距离互动', '团队：林欣、Carlota Roca、Deni Casas', 'Volumens 2025，Centre del Carme Cultura Contemporània，西班牙瓦伦西亚'],
            ['《光污染》于西班牙瓦伦西亚 Centre del Carme Cultura Contemporània 举办的 Volumens 2025 国际艺术节展出。作品关注人工光线的增长，以及它对昼夜节律、生命体和观看星空能力的影响。', '作品围绕人、天空和城市三个元素展开。观众靠近时，天空逐渐消失、城市随之显现，并追问谁制造了这种污染，以及我们在人工光照下失去了什么。', '平静空灵的自然声景逐渐转化为更具压迫感的城市氛围，引导观众批判性思考技术与夜间环境的关系。'])
    },
    'pages/work/fine_art/work15.html': {
        en: project('INNERSIGHT 1.0', '2025 / Interactive installation, EEG and physical keypad, earlier version',
            ['Two screens, Arduino and 4x4 button matrix', 'Sichiray 2.0 brainwave headset', 'TouchDesigner, Arduino, Processing and TGAM', 'Valencia, Spain / prototype 05.2025'],
            ['InnerSight 1.0 is the earlier interactive prototype developed in May 2025.', 'It used two screens, a physical 4x4 Arduino button matrix and a Sichiray 2.0 EEG kit. Interaction was based on buttons and brainwave visualisation before the mobile app was introduced.', 'This version documents the project\'s technical starting point and makes the later evolution toward a more integrated, immersive and multisensory experience visible.']),
        zh: project('内视 1.0', '2025 / 互动装置、脑电与实体键盘，早期版本',
            ['两块屏幕、Arduino 与 4x4 按键矩阵', 'Sichiray 2.0 脑电头环', 'TouchDesigner、Arduino、Processing 与 TGAM', '西班牙瓦伦西亚 / 2025 年 5 月原型'],
            ['《InnerSight 1.0》是 2025 年 5 月完成的早期互动原型。', '这一阶段使用两块屏幕、Arduino 控制的 4x4 实体按键矩阵和 Sichiray 2.0 脑电设备；在移动应用加入之前，互动主要通过按键与脑电波可视化完成。', '这一版本记录了项目的技术起点，也清晰呈现出《InnerSight》后来如何发展为更完整、沉浸且多感官的体验。'])
    },
    'pages/work/digital_art/work1.html': {
        en: project('CASA GILARDI', '2025 / Group 3D virtual environment project, furniture modelling',
            ['Blender furniture modelling and rendering', 'Sculpt Mode with Grab and Clay brushes', 'Bézier curves, Spin, Inset Faces and geometric assembly', 'Group project: personal contribution in furniture modelling'],
            ['Casa Gilardi is a group virtual-environment project based on Luis Barragán\'s architecture, exploring light, colour and geometry through digital art.', 'The work shown here is my Blender furniture modelling: sculptures, ceramics, paintings, spheres and a table, created to convey the spatial character of the house through rendered objects and details.', 'The process combines Sculpt Mode, Bézier curves, Spin, Inset Faces and the assembly of geometric forms.']),
        zh: project('吉拉迪住宅', '2025 / 3D 虚拟环境团队项目，家具建模',
            ['Blender 家具建模与渲染', '使用 Grab 与 Clay 笔刷的雕刻模式', '贝塞尔曲线、Spin、Inset Faces 与几何组装', '团队项目：个人负责家具建模'],
            ['《吉拉迪住宅》是一个基于路易斯·巴拉甘建筑的虚拟环境团队项目，通过数字艺术探索光、色彩与几何。', '此处展示的是我在 Blender 中完成的家具建模，包括雕塑、陶瓷、绘画、球体与桌子，借由渲染物件和细节呈现住宅的空间特质。', '制作过程结合雕刻模式、贝塞尔曲线、Spin、Inset Faces 与几何形体组装。'])
    },
    'pages/work/interactive/work1.html': {
        en: project('BRAINWAVE ORGANISM', '2025 / Creative EEG data visualisation and interactive web interface / Valencia, Spain',
            ['Data source: OpenNeuro ds005565 v1.0.3, EEG-ERP dataset', 'Study context: semantic priming across printed English, ASL and fingerspelling', 'Data processing and development: Python, p5.js, HTML and CSS', 'Visual system: six growth environments, brainwave motion and participant matrix'],
            ['Brainwave Organism visualises how brainwave activity changes when the brain receives external information such as text, American Sign Language or fingerspelling.', 'The data comes from the OpenNeuro study Neural Associations Between Fingerspelling, Print, and Signs, which examines semantic priming in deaf readers. Its Prime-Target-Probe sequence presents printed English, ASL or fingerspelling stimuli and records semantic responses. The interface works with onset, sample and EEG-value fields; unavailable records are identified visually, and simulated values are used only to maintain continuity in the demonstration.', 'Signals are transformed into organic behaviours such as heartbeats, cell expansion, neural-network growth and particle flow. Particles indicate intensity and density; ripples and connections evoke synapses; word bubbles act as information-transfer units. The participant matrix uses blue for male, magenta for female, white for missing data and yellow for the active selection.', 'The project proposes a foundation for multisensory art and future multichannel systems connecting visualisation, touch and sound.'],
            ['View original dataset']),
        zh: project('脑波生物体', '2025 / 创意脑电数据可视化与互动网页界面 / 西班牙瓦伦西亚',
            ['数据来源：OpenNeuro ds005565 v1.0.3，EEG-ERP 脑电数据集', '研究内容：印刷英文、美国手语与手指拼写之间的语义启动', '数据处理与开发：Python、p5.js、HTML 与 CSS', '视觉系统：六种生长环境、脑波动态与参与者矩阵'],
            ['《脑波生物体》将脑波活动可视化，探索大脑接收文字、美国手语或手指拼写等外部信息时产生的变化。', '数据来自 OpenNeuro 的《手指拼写、印刷文字与手语之间的神经关联》研究，研究关注聋人阅读者的语义启动过程。Prime-Target-Probe 流程依次呈现印刷英文、美国手语或手指拼写刺激并记录语义反应。界面使用 onset、sample 与脑电值等字段；不可用记录会被明确标记，模拟数值仅用于保持演示的连续性。', '脑电信号被转化为心跳、细胞扩张、神经网络生长和粒子流动等有机行为。粒子表现活动强度与密度，波纹和连接模拟神经突触，文字气泡作为信息传递单元。参与者矩阵以蓝色表示男性、洋红色表示女性、白色表示缺失数据，黄色圆环标记当前选择。', '项目为多感官艺术实践，以及连接可视化、触觉和声音的未来多通道互动系统提出一种路径。'],
            ['查看原始数据集'])
    },
    'pages/work/interactive/work2.html': {
        en: project('PRISMA.LIVE', '2025 / Cross-platform interactive system and Live AV / Valencia, Spain',
            ['Flutter 3.29.2 and Dart 3.7.2 mobile interface', 'HTML5, CSS3, JavaScript, Node.js and WebSocket', 'Android phones, MSI laptop and Acer projector', 'Variable dimensions', 'Presented at CCCC Centre del Carme Cultura Contemporània, Valencia'],
            ['PRISMA.live is a cross-platform real-time audiovisual control system that turns an on-site audience from viewers into co-creators. It was developed for artistic workshops, VJ performances and live events.', 'Participants use an Android app or web controller to modify projected visuals and sound in real time. Deck A and Deck B provide independent audio and visual controls, while global and stereo sections shape the shared composition.', 'A Flutter and Dart mobile interface communicates through WebSocket with a Node.js server and the browser-based visual environment. This architecture synchronises multiple devices so that individual gestures become a collective, immersive Live AV experience.'],
            ['Open interactive platform']),
        zh: project('PRISMA.LIVE', '2025 / 跨平台互动系统与实时视听体验 / 西班牙瓦伦西亚',
            ['Flutter 3.29.2 与 Dart 3.7.2 移动端界面', 'HTML5、CSS3、JavaScript、Node.js 与 WebSocket', 'Android 手机、MSI 笔记本电脑与 Acer 投影仪', '尺寸可变', '展出地点：瓦伦西亚 CCCC Centre del Carme Cultura Contemporània'],
            ['《PRISMA.live》是一套跨平台实时视听控制系统，将现场观众从观看者转变为共同创作者。项目面向艺术工作坊、VJ 演出与现场活动。', '参与者通过 Android 应用或网页控制器实时改变投影视觉与声音。Deck A 和 Deck B 可分别控制两组视听素材，Global 与 Stereo 区域则共同塑造现场合成效果。', 'Flutter 与 Dart 移动端通过 WebSocket 与 Node.js 服务器及浏览器视觉界面通信，使多台设备保持同步，并把每个人的操作转化为集体、沉浸的 Live AV 体验。'],
            ['打开互动平台'])
    },
    'pages/work/fine_art/work16.html': {
        es: project('RESPIRAR ENTRE NOSOTROS', '2026 / Trabajo Fin de Máster (TFM), escultura blanda interactiva',
            ['Sensores EEG y GSR, estructura neumática flexible', 'Arduino IDE, Node.js, HTML/CSS/JavaScript y Onshape', 'Proyección, luz, sonido y aroma', 'Sichiray EEG 2.0, Grove GSR y Seeed XIAO ESP32-C6'],
            ['Desarrollada como mi Trabajo Fin de Máster, Breath Between Us es una escultura blanda interactiva que da forma al intervalo, a menudo invisible, entre la percepción corporal y la presencia emocional. Las señales EEG y GSR activan un cuerpo neumático flexible, mientras la proyección, la luz, el sonido y el aroma construyen un entorno sensorial envolvente.', 'La obra invita a acercarse, detenerse y reconocer cómo un espacio compartido responde a cambios sutiles en la atención y el afecto. Se presentó en Raiosha Gallery, Keio University, Yokohama, Japón.']),
        zh: project('呼吸之间', '2026 / 硕士毕业创作，互动软体雕塑',
            ['脑电与皮电感测、柔性气动结构', 'Arduino IDE、Node.js、HTML/CSS/JavaScript 与 Onshape', '投影、灯光、声音与气味', 'Sichiray EEG 2.0、Grove GSR 与 Seeed XIAO ESP32-C6'],
            ['作为我的硕士毕业创作，《呼吸之间》是一件互动软体雕塑，将身体感知和情感在场之间常常不可见的间隙具象化。脑电和皮电信号驱动柔性气动身体，投影、灯光、声音与气味共同构成包裹性的感官环境。', '作品邀请观众靠近、停留，并感受共享空间如何回应注意力和情绪的细微变化。作品曾于日本横滨庆应义塾大学 Raiosha Gallery 展出。'])
    },
    'pages/work/fine_art/work17.html': {
        es: project('PINTURA CHINA: COPIAS DE PAISAJE DE LAS DINASTÍAS SONG Y YUAN', '2024 / Estudios de pintura china con tinta y color',
            ['Tinta y color sobre papel', 'Copia, pincelada y estudio compositivo', 'Referencias de pintura de paisaje de las dinastías Song y Yuan'],
            ['Este conjunto estudia la pintura de paisaje tradicional china mediante la copia atenta. Cada original va seguido de mi copia para mostrar el ritmo del pincel, la construcción espacial y la estructura tonal como un diálogo visual.', 'Las referencias incluyen Dwelling in the Qingbian Mountains de Wang Meng, Boating on the Lotus Pond de Wang Shen y Waiting for the Ferry de Guo Xi.']),
        zh: project('中国画：宋元山水临摹', '2024 / 中国水墨设色绘画研究',
            ['纸本水墨设色', '临摹、笔法与构图研究', '宋元山水画参考'],
            ['这一组习作通过细致临摹理解中国传统山水画。页面按“原作参考—我的临摹”成对排列，使笔墨节奏、空间营造与墨色结构形成清晰的视觉对话。', '参考作品包括王蒙《青卞隐居图》、王诜《荷塘泛舟》以及郭熙《待渡图》。'])
    },
    'pages/work/fine_art/work18.html': {
        es: project('IMPRESIÓN 3D', '2025 / Prototipos en PLA y estudios de fabricación',
            ['Impresión 3D en PLA y prototipado físico', 'Diseño iterativo de objetos y pruebas de fabricación', 'Forma táctil, uniones modulares y escala funcional'],
            ['Esta página reúne dos estudios en PLA realizados en 2025: el prototipo conceptual de una pulsera táctil con braille y un objeto de práctica de impresión 3D. Ambos exploran cómo las formas digitales se convierten en objetos táctiles y utilizables mediante pruebas repetidas de fabricación.', 'La pulsera investiga vínculos modulares, movimiento flexible y secuencias táctiles, mientras que la pieza de práctica estudia contorno, escala y acabado superficial. En conjunto presentan la impresión 3D como método de prototipado y forma de pensar la forma.']),
        zh: project('3D 打印', '2025 / PLA 原型与制作研究',
            ['PLA 3D 打印与实体原型', '迭代式物件设计与制作测试', '触觉形态、模块连接与功能尺度'],
            ['本页汇集了两项完成于 2025 年的 PLA 研究：盲文触觉手环概念原型与一个 3D 打印练习物件。两件作品都通过反复制作测试，探索数字形态如何转化为可触摸、可使用的实体物件。', '手环研究模块连接、灵活运动与触觉序列；练习物件则测试轮廓、尺度和表面效果。它们共同呈现 3D 打印如何同时作为原型方法与形态思考方式。'])
    },
    'pages/work/fine_art/work19.html': {
        es: project('MAQUETA ARQUITECTÓNICA', '2022 / Maqueta arquitectónica de técnica mixta / 28 x 31,7 x 30 cm',
            ['Construcción de maquetas con técnica mixta', 'Estructura, superficies y detalles de cubierta realizados a mano', 'Observación espacial y reconstrucción a pequeña escala'],
            ['Esta maqueta arquitectónica reconstruye a pequeña escala una vivienda tradicional china con patio. Traslada sus tejados de teja, patio cerrado, puertas, ventanas y detalles de la vida cotidiana a un estudio espacial compacto.', 'La fotografía de referencia y la maqueta terminada se presentan juntas para mostrar el paso de la observación a la interpretación material. La obra se realizó en Valencia, España, en 2022.']),
        zh: project('建筑模型', '2022 / 综合材料建筑模型 / 28 x 31.7 x 30 厘米',
            ['综合材料模型制作', '手工搭建结构、表面与屋顶细节', '空间观察与小尺度重构'],
            ['这件建筑模型以小尺度重构一座中国传统院落民居，将瓦顶、封闭院落、门窗和日常生活细节转化为紧凑的空间研究。', '页面并置现实场景参考照片与完成模型，呈现从观察到材料转译的过程。作品于 2022 年在西班牙瓦伦西亚完成。'])
    },
    'pages/work/digital_art/work2.html': {
        es: project('MUNDO PICTÓRICO DE ESTILO CHINO', '2025 / Modelado de escena 3D y entorno virtual',
            ['Modelado, texturizado y renderizado en Blender', 'La pintura paisajística azul y verde como referencia espacial', 'Recorrido narrativo en forma de S y composición inmersiva'],
            ['Chinese-style Painted World traduce la tradición del paisaje azul y verde a un entorno 3D inmersivo. A partir de A Thousand Li of Rivers and Mountains, convierte montañas, agua y arquitectura pintadas en un mundo recorrible.', 'Un recorrido en forma de S guía a quien observa por capas espaciales cambiantes, equilibrando la atmósfera de una pintura en rollo con la escala y el ritmo de un paisaje virtual.']),
        zh: project('中国风绘境', '2025 / 3D 场景建模与虚拟环境',
            ['Blender 建模、材质与渲染', '以青绿山水画作为空间参考', 'S 形叙事路径与沉浸式场景构图'],
            ['《中国风绘境》将青绿山水传统转化为沉浸式 3D 环境。项目以《千里江山图》为视觉出发点，把绘画中的山、水与建筑变成可进入、可探索的世界。', 'S 形路径引导观者穿越不断变化的空间层次，在长卷画的氛围与虚拟景观的尺度和节奏之间取得平衡。'])
    },
    'pages/work/digital_art/work4.html': {
        es: project('VELO DE LUZ', '2025 / Juego de puzles y plataformas 2.5D, proyecto de cuatro personas',
            ['Unity, ilustración 2D, modelado de escenas e iluminación', 'Lenguaje visual de teatro de sombras chino y diseño narrativo', 'Xin Lin: concepto, dirección de arte, personajes, flujo técnico, cámara e iluminación', 'Proyecto en equipo'],
            ['Veil of Light es un juego narrativo de puzles y plataformas 2.5D inspirado en el teatro de sombras chino. La persona jugadora guía a un protagonista semejante a una marioneta por templos, bosques y una ciudad, usando luz y sombra para descubrir el camino.', 'Mi aportación estableció el concepto inicial y la dirección visual, incluyendo personajes, flujo técnico artístico, cámara, iluminación y algunos modelos de escena. El proyecto fue desarrollado por un equipo de cuatro personas.']),
        zh: project('光之帷幕', '2025 / 2.5D 解谜平台游戏，四人团队项目',
            ['Unity、2D 插画、场景建模与灯光', '中国皮影视觉语言与叙事游戏设计', '林欣：概念、艺术指导、角色美术、技术美术流程、镜头与灯光', '团队项目'],
            ['《Veil of Light》是一款以中国皮影视觉语言为灵感的叙事型 2.5D 解谜平台游戏。玩家引导木偶般的主角穿越寺庙、森林与城市，借由光和影寻找前行道路。', '我负责建立初始概念和视觉方向，包括角色美术、完整技术美术流程、镜头与灯光，以及部分场景模型。项目由四人团队协作完成。'])
    }
};

const galleryTitles = {
    'pages/work/fine_art/work1.html': { en: 'Images of Resonance', es: 'Imágenes de Resonancia', zh: '共振映像' },
    'pages/work/fine_art/work2.html': { en: 'Cosmic Brain Fantasy Space', es: 'Espacio de Fantasía Cerebral Cósmica', zh: '脑宇宙幻想空间' },
    'pages/work/fine_art/work3.html': { en: 'Wandering Gods of Fujian', es: 'Dioses Itinerantes de Fujian', zh: '福建游神系列' },
    'pages/work/fine_art/work4.html': { en: 'Dice', es: 'Dado', zh: '骰子' },
    'pages/work/fine_art/work5.html': { en: 'Hidden', es: 'Oculto', zh: '匿' },
    'pages/work/fine_art/work6.html': { en: 'Pat Pat', es: 'Golpecito', zh: '拍一拍' },
    'pages/work/fine_art/work7.html': { en: 'Tribute to Jingdezhen', es: 'Tributo a Jingdezhen', zh: '致敬景德镇' },
    'pages/work/fine_art/work8.html': { en: 'Intelligent Reflection', es: 'Reflejo Inteligente', zh: '智能映照' },
    'pages/work/fine_art/work9.html': { en: 'Insurmountable Border', es: 'Frontera Insuperable', zh: '无法跨越的边界' },
    'pages/work/fine_art/work10.html': { en: 'The World', es: 'El Mundo', zh: '世界' },
    'pages/work/fine_art/work11.html': { en: 'Blind Spot', es: 'Punto Ciego', zh: '盲区' },
    'pages/work/fine_art/work12.html': { en: 'InnerSight 2.0', es: 'InnerSight 2.0', zh: '内视 2.0' },
    'pages/work/fine_art/work13.html': { en: 'Swing of Shadows', es: 'Columpio de Sombras', zh: '影之秋千' },
    'pages/work/fine_art/work14.html': { en: 'Light Pollution', es: 'Contaminación Lumínica', zh: '光污染' },
    'pages/work/fine_art/work15.html': { en: 'InnerSight 1.0', es: 'InnerSight 1.0', zh: '内视 1.0' },
    'pages/work/fine_art/work16.html': { en: 'Breath Between Us', es: 'Respirar Entre Nosotros', zh: '呼吸之间' },
    'pages/work/fine_art/work17.html': { en: 'Chinese Painting Copies', es: 'Copias de Pintura China', zh: '宋元山水画临摹' },
    'pages/work/fine_art/work18.html': { en: '3D Printing', es: 'Impresión 3D', zh: '3D 打印' },
    'pages/work/fine_art/work19.html': { en: 'Architectural Model', es: 'Maqueta Arquitectónica', zh: '建筑模型' },
    'pages/work/digital_art/work1.html': { en: 'Casa Gilardi', es: 'Casa Gilardi', zh: '吉拉迪住宅' },
    'pages/work/digital_art/work2.html': { en: 'Chinese-style Painted World', es: 'Mundo Pictórico de Estilo Chino', zh: '中国风绘境' },
    'pages/work/digital_art/work4.html': { en: 'Veil of Light', es: 'Velo de Luz', zh: '光之帷幕' },
    'pages/work/interactive/work1.html': { en: 'Brainwave Organism', es: 'Organismo de Ondas Cerebrales', zh: '脑波生物体' },
    'pages/work/interactive/work2.html': { en: 'PRISMA.live', es: 'PRISMA.live', zh: 'PRISMA.live' }
};

const paintingComparisonCaptions = {
    en: [
        '01 | Original: Dwelling in the Qingbian Mountains - Wang Meng, Yuan dynasty',
        '01 | Copy by Xin Lin',
        '02 | Original: Boating on the Lotus Pond - Wang Shen, Northern Song dynasty',
        '02 | Copy by Xin Lin',
        '03 | Original: Waiting for the Ferry - Guo Xi, Northern Song dynasty',
        '03 | Copy by Xin Lin'
    ],
    es: [
        '01 | Original: Morada en las montañas Qingbian - Wang Meng, dinastía Yuan',
        '01 | Copia de Xin Lin',
        '02 | Original: Paseo en barca por el estanque de lotos - Wang Shen, dinastía Song del Norte',
        '02 | Copia de Xin Lin',
        '03 | Original: Esperando el transbordador - Guo Xi, dinastía Song del Norte',
        '03 | Copia de Xin Lin'
    ],
    zh: [
        '01 | 原作：王蒙《青卞隐居图》，元代',
        '01 | 林欣临摹',
        '02 | 原作：王诜《荷塘泛舟》，北宋',
        '02 | 林欣临摹',
        '03 | 原作：郭熙《待渡图》，北宋',
        '03 | 林欣临摹'
    ]
};

const projectOrder = [
    'pages/work/fine_art/work16.html',
    'pages/work/fine_art/work18.html',
    'pages/work/fine_art/work14.html',
    'pages/work/fine_art/work13.html',
    'pages/work/fine_art/work12.html',
    'pages/work/fine_art/work15.html',
    'pages/work/fine_art/work11.html',
    'pages/work/fine_art/work1.html',
    'pages/work/fine_art/work17.html',
    'pages/work/fine_art/work2.html',
    'pages/work/fine_art/work3.html',
    'pages/work/fine_art/work4.html',
    'pages/work/fine_art/work5.html',
    'pages/work/fine_art/work6.html',
    'pages/work/fine_art/work7.html',
    'pages/work/fine_art/work8.html',
    'pages/work/fine_art/work9.html',
    'pages/work/fine_art/work10.html',
    'pages/work/fine_art/work19.html',
    'pages/work/digital_art/work4.html',
    'pages/work/digital_art/work2.html',
    'pages/work/digital_art/work1.html',
    'pages/work/interactive/work1.html',
    'pages/work/interactive/work2.html'
];

const profileCopy = {
    en: {
        kicker: 'Artist / Creative Technologist', pills: ['Multidisciplinary Art', 'Interactive Installations'],
        bio: [
            'Xin Lin, born in 2000 in Fujian, China, is a multidisciplinary artist working at the intersection of art and technology. Beginning with traditional Chinese painting, she gradually expanded her practice into sculpture, installation and interactive art, continually exploring the relationships between embodied perception, nonverbal communication and multisensory experience.',
            "She holds a Bachelor's degree in Fine Arts and a Master's degree in Visual Arts and Multimedia from the Universitat Politècnica de València. Across her undergraduate and master's studies, she explored the artistic translation of physiological signals including EEG and GSR, using real-time interactive systems to transform invisible bodily changes into perceptible visual, sonic and spatial experiences.",
            'She has participated in exhibitions in Spain, China and Japan, and her work El Mundo received the Gold Award of the Chinese Visual Arts Annual 2022–2023. During an exchange at the Central Academy of Fine Arts, she conducted material research in ceramics and glass while deepening her practice in Chinese painting, calligraphy and seal carving. In 2025, she presented InnerSight and the collaborative project Lux Obscura at Volumens, and created the real-time audiovisual platform PRISMA.live during the Queerxata workshop.',
            'During her 2026 exchange at MikiLab, Keio University, she completed her graduate work Breath Between Us within the framework of her master\'s thesis, DMC — Dynamic Multisensory Canvas. The project uses a modular audiovisual soft interface to investigate multisensory interaction. She also curated Breath Between Us: MikiLab Exhibition 2026, where the work was presented at Raiosha Gallery, Keio University, Yokohama, Japan.'
        ],
        imageCaption: 'Resonance Images, 2024 / Interactive installation view',
        focusLabel: 'Research focus',
        focus: 'Physiological sensing / multisensory interaction / material and spatial practice',
        cvLabel: 'Download CV',
        sections: ['Education', 'Exhibitions and Curatorial Experience', 'Research Methods', 'Contact'],
        education: [
            { date: 'Sep 2024 - Sep 2026', title: 'Universitat Politècnica de València', detail: "Master's Program in Visual Arts and Multimedia", note: 'Thesis: DMC - Dynamic Multisensory Canvas. Modular artistic audiovisual soft-interface for multisensory interaction.' },
            { date: 'Mar 2026 - Aug 2026', title: 'Keio University', detail: 'International Exchange Program, Department of Mechanical Engineering, MikiLab' },
            { date: 'Sep 2023 - Jun 2024', title: 'Central Academy of Fine Arts', detail: 'International Exchange Program in Sculpture' },
            { date: 'Sep 2020 - Jul 2024', title: 'Universitat Politècnica de València', detail: "Bachelor's Program in Fine Arts", note: 'Thesis: Bridge of Nonverbal Communication: An Experimental Poetic Audiovisual Narrative Controlled by EEG Signals.' }
        ],
        exhibitions: [
            { date: 'Jul 2026', title: 'Breath Between Us', role: 'Curator / Exhibiting Artist', detail: 'MikiLab Exhibition 2026, Raiosha Gallery, Keio University, Yokohama, Japan' },
            { date: 'Jan 2026', title: 'Queerxata Art Workshop', role: 'Curator', detail: 'Centre del Carme Cultura Contemporània, Valencia, Spain' },
            { date: 'Oct 2025', title: 'Volumens 2025 International Art Festival', detail: 'Centre del Carme Cultura Contemporània, Valencia, Spain' },
            { date: 'Feb 2025', title: 'Spanish Radio Art 101st Anniversary Exhibition', detail: 'SGAE, Valencia, Spain' },
            { date: 'Jun 2024', title: 'Pengci, Ceramic Works Exhibition', detail: 'Corridor Gallery, Department of Sculpture, Central Academy of Fine Arts' },
            { date: 'Jun 2024', title: 'Liu Guang Li Ying, Glass Works Exhibition', detail: 'Corridor Gallery, Department of Sculpture, Central Academy of Fine Arts' },
            { date: 'Jun 2023', title: 'Yi Wu Yi Wu, Materials Exhibition', detail: 'Corridor Gallery, Department of Sculpture, Central Academy of Fine Arts' },
            { date: 'Jun 2023', title: 'Roent, Casting Works Exhibition', detail: 'Ribarroja Municipal Art Gallery, Spain' },
            { date: 'Feb 2023', title: '15th MundoArti International Virtual Gallery Exhibition', detail: 'MundoArti platform' }
        ],
        skillTitles: ['Physiological Sensing', 'Interactive Systems', 'Multisensory Installation', 'Material & Fabrication', 'Visual Inquiry'],
        skillTools: ['EEG, GSR, biosignal mapping', 'p5.js, HTML/CSS, Python, Flutter, Arduino, TouchDesigner, Unity', 'Projection, sound, touch, kinetic devices', 'Sculpture, ceramics, glass, Blender, Onshape, 3D printing, mould making', 'Chinese painting, oil painting, moving image, editorial design'],
        skillDescriptions: ['Translating invisible bodily processes into responsive visual, sonic and tactile material.', 'Building real-time interfaces and participatory audiovisual environments.', 'Composing cross-modal encounters through image, sound, movement and material response.', 'Connecting material research, digital fabrication and spatial prototyping.', 'Using image-making as a method for observation, narration and cross-media research.'],
        contact: 'For research collaborations, exhibitions and commissions.', email: 'Email:', instagram: 'Instagram:'
    },
    es: {
        kicker: 'Artista / Tecnóloga creativa', pills: ['Arte interdisciplinar', 'Instalaciones interactivas'],
        bio: [
            'Xin Lin, nacida en 2000 en Fujian, China, es una artista interdisciplinar que desarrolla su práctica en la intersección entre el arte y la tecnología. Partiendo de la pintura tradicional china, amplió progresivamente su trabajo hacia la escultura, la instalación y el arte interactivo, explorando de forma continua las relaciones entre la percepción corporal, la comunicación no verbal y la experiencia multisensorial.',
            'Es graduada en Bellas Artes y máster en Artes Visuales y Multimedia por la Universitat Politècnica de València. Durante sus estudios de grado y máster investigó la traducción artística de señales fisiológicas como EEG y GSR mediante sistemas interactivos en tiempo real, transformando cambios corporales invisibles en experiencias visuales, sonoras y espaciales perceptibles.',
            'Ha participado en exposiciones en España, China y Japón, y su obra El Mundo recibió el Premio de Oro de la Chinese Visual Arts Annual 2022–2023. Durante un intercambio en la Central Academy of Fine Arts, desarrolló investigaciones materiales en cerámica y vidrio y profundizó en la pintura china, la caligrafía y el grabado de sellos. En 2025 presentó InnerSight y el proyecto colectivo Lux Obscura en Volumens, y creó la plataforma audiovisual en tiempo real PRISMA.live durante el taller Queerxata.',
            'Durante su intercambio de 2026 en MikiLab, Keio University, completó su obra de fin de máster Breath Between Us en el marco de su tesis DMC — Dynamic Multisensory Canvas. El proyecto explora la interacción multisensorial mediante una interfaz audiovisual blanda y modular. También comisarió Breath Between Us: MikiLab Exhibition 2026, donde la obra se presentó en Raiosha Gallery, Keio University, Yokohama, Japón.'
        ],
        imageCaption: 'Imágenes de resonancia, 2024 / Vista de instalación interactiva',
        focusLabel: 'Líneas de investigación',
        focus: 'Percepción fisiológica / interacción multisensorial / práctica material y espacial',
        cvLabel: 'Descargar CV',
        sections: ['Educación', 'Exposiciones y experiencia curatorial', 'Métodos de investigación', 'Contacto'],
        education: [
            { date: 'Sep 2024 - Sep 2026', title: 'Universitat Politècnica de València', detail: 'Máster en Artes Visuales y Multimedia', note: 'TFM: DMC - Dynamic Multisensory Canvas. Interfaz artística audiovisual blanda y modular para la interacción multisensorial.' },
            { date: 'Mar 2026 - Ago 2026', title: 'Keio University', detail: 'Programa de intercambio internacional, Departamento de Ingeniería Mecánica, MikiLab' },
            { date: 'Sep 2023 - Jun 2024', title: 'Central Academy of Fine Arts', detail: 'Programa de intercambio internacional en Escultura' },
            { date: 'Sep 2020 - Jul 2024', title: 'Universitat Politècnica de València', detail: 'Grado en Bellas Artes', note: 'TFG: Puente de comunicación no verbal: narrativa poética audiovisual experimental controlada por señales EEG.' }
        ],
        exhibitions: [
            { date: 'Jul 2026', title: 'Breath Between Us', role: 'Comisaria / Artista expositora', detail: 'MikiLab Exhibition 2026, Raiosha Gallery, Keio University, Yokohama, Japón' },
            { date: 'Ene 2026', title: 'Taller artístico Queerxata', role: 'Comisaria', detail: 'Centre del Carme Cultura Contemporània, Valencia, España' },
            { date: 'Oct 2025', title: 'Festival Internacional de Arte Volumens 2025', detail: 'Centre del Carme Cultura Contemporània, Valencia, España' },
            { date: 'Feb 2025', title: 'Exposición del 101.º aniversario del arte radiofónico español', detail: 'SGAE, Valencia, España' },
            { date: 'Jun 2024', title: 'Pengci, exposición de obras cerámicas', detail: 'Galería del Corredor, Departamento de Escultura, Central Academy of Fine Arts' },
            { date: 'Jun 2024', title: 'Liu Guang Li Ying, exposición de obras en vidrio', detail: 'Galería del Corredor, Departamento de Escultura, Central Academy of Fine Arts' },
            { date: 'Jun 2023', title: 'Yi Wu Yi Wu, exposición de materiales', detail: 'Galería del Corredor, Departamento de Escultura, Central Academy of Fine Arts' },
            { date: 'Jun 2023', title: 'Roent, exposición de fundición', detail: 'Galería Municipal de Arte de Ribarroja, España' },
            { date: 'Feb 2023', title: '15.ª Exposición Internacional de Galería Virtual MundoArti', detail: 'Plataforma MundoArti' }
        ],
        skillTitles: ['Percepción fisiológica', 'Sistemas interactivos', 'Instalación multisensorial', 'Material y fabricación', 'Investigación visual'],
        skillTools: ['EEG, GSR, mapeo de bioseñales', 'p5.js, HTML/CSS, Python, Flutter, Arduino, TouchDesigner, Unity', 'Proyección, sonido, tacto, dispositivos cinéticos', 'Escultura, cerámica, vidrio, Blender, Onshape, impresión 3D, moldes', 'Pintura china, pintura al óleo, imagen en movimiento, diseño editorial'],
        skillDescriptions: ['Transformación de procesos corporales invisibles en material visual, sonoro y táctil sensible.', 'Desarrollo de interfaces en tiempo real y entornos audiovisuales participativos.', 'Composición de encuentros intermodales mediante imagen, sonido, movimiento y respuesta material.', 'Conexión entre investigación material, fabricación digital y prototipado espacial.', 'Uso de la imagen como método de observación, narración e investigación transmedia.'],
        contact: 'Para colaboraciones de investigación, exposiciones y encargos.', email: 'Correo:', instagram: 'Instagram:'
    },
    zh: {
        kicker: '艺术家 / 创意技术研究者', pills: ['跨学科艺术', '互动装置'],
        bio: [
            '林欣，2000 年出生于中国福建，是一位在艺术与科技交汇处展开实践的跨学科艺术家。她以中国传统绘画为起点，逐步将创作拓展至雕塑、装置与互动艺术，持续探索身体感知、非语言沟通与多感官经验之间的关系。',
            '她本科毕业于瓦伦西亚理工大学美术专业，并于该校获得视觉艺术与多媒体硕士学位。在本科及硕士阶段，她探索脑电（EEG）与皮肤电反应（GSR）等生理信号的艺术转化，通过实时互动系统，将身体内部不可见的生理变化转化为可感知的视觉、声音与空间体验。',
            '她曾参加西班牙、中国及日本的展览，作品《世界》获 Chinese Visual Arts Annual 2022–2023 金奖。在中央美术学院交换期间，她开展陶瓷与玻璃材料研究，并深化中国画、书法与篆刻等传统艺术实践。2025 年，她在 Volumens 展出作品《InnerSight》及团队项目《Lux Obscura》，并于 Queerxata 工作坊中创作实时视听平台 PRISMA.live。',
            '2026 年，她在日本庆应义塾大学 MikiLab 交换期间，围绕硕士论文“DMC — Dynamic Multisensory Canvas”完成毕业作品《BREATH BETWEEN US》，通过模块化视听软界面探索多感官交互，并策划展览《呼吸之间》（MikiLab Exhibition 2026），于日本横滨庆应义塾大学 Raiosha Gallery 呈现该作品。'
        ],
        imageCaption: '《共振映像》，2024 / 互动装置现场',
        focusLabel: '研究方向',
        focus: '生理信号感知 / 多感官互动 / 材料与空间实践',
        cvLabel: '下载简历',
        sections: ['教育经历', '展览与策展经历', '研究方法', '联系方式'],
        education: [
            { date: '2024.09 - 2026.09', title: '瓦伦西亚理工大学', detail: '视觉艺术与多媒体专业硕士', note: '硕士论文：DMC - 动态多感官画布：用于多感官互动的模块化艺术视听软界面。' },
            { date: '2026.03 - 2026.08', title: '庆应义塾大学', detail: '机械工程系国际交换项目，MikiLab' },
            { date: '2023.09 - 2024.06', title: '中央美术学院', detail: '雕塑专业国际交换项目' },
            { date: '2020.09 - 2024.07', title: '瓦伦西亚理工大学', detail: '纯艺术专业本科', note: '本科毕业论文：非语言沟通的桥梁：由脑电信号控制的实验性诗意视听叙事。' }
        ],
        exhibitions: [
            { date: '2026.07', title: '《呼吸之间》', role: '策展 / 参展艺术家', detail: 'MikiLab Exhibition 2026，庆应义塾大学 Raiosha Gallery，日本横滨' },
            { date: '2026.01', title: 'Queerxata 艺术工作坊', role: '策展', detail: 'Centre del Carme Cultura Contemporània，西班牙瓦伦西亚' },
            { date: '2025.10', title: 'Volumens 2025 国际艺术节', detail: 'Centre del Carme Cultura Contemporània，西班牙瓦伦西亚' },
            { date: '2025.02', title: '西班牙广播艺术 101 周年展览', detail: 'SGAE，西班牙瓦伦西亚' },
            { date: '2024.06', title: '《碰瓷》陶瓷作品展', detail: '中央美术学院雕塑系走廊画廊' },
            { date: '2024.06', title: '《琉光璃影》玻璃作品展', detail: '中央美术学院雕塑系走廊画廊' },
            { date: '2023.06', title: '《以物以物》材料作品展', detail: '中央美术学院雕塑系走廊画廊' },
            { date: '2023.06', title: 'Roent 铸造作品展', detail: '西班牙 Ribarroja 市立艺术画廊' },
            { date: '2023.02', title: '第 15 届 MundoArti 国际虚拟画廊展', detail: 'MundoArti 平台' }
        ],
        skillTitles: ['生理信号感知', '互动系统', '多感官装置', '材料与制作', '视觉研究'],
        skillTools: ['EEG、GSR、生物信号映射', 'p5.js、HTML/CSS、Python、Flutter、Arduino、TouchDesigner、Unity', '投影、声音、触觉、动力装置', '雕塑、陶瓷、玻璃、Blender、Onshape、3D 打印、模具制作', '中国画、油画、动态图像、编辑设计'],
        skillDescriptions: ['将不可见的身体过程转化为可响应的视觉、声音与触觉材料。', '构建实时界面与参与式视听环境。', '通过图像、声音、运动与材料反馈组织跨感官体验。', '连接材料研究、数字制造与空间原型。', '以图像创作作为观察、叙事与跨媒介研究的方法。'],
        contact: '欢迎就学术研究、展览与创作委托进行联系。', email: '邮箱：', instagram: 'Instagram：'
    }
};

const labCopy = {
    en: { description: 'An open research space for interactive systems, real-time audiovisual practice, and creative technology prototypes.', project: 'PRISMA.live is an interactive platform that turns audiences into creators. Designed for parties and workshops, it lets participants use a phone or web browser to control large-screen sound and visuals in real time, co-creating an immersive audiovisual experience.', viewProject: 'View Project', launch: 'Launch App' },
    es: { description: 'Un espacio abierto de investigación para sistemas interactivos, prácticas audiovisuales en tiempo real y prototipos de tecnología creativa.', project: 'PRISMA.live es una plataforma interactiva que transforma al público en creador. Diseñada para fiestas y talleres, permite controlar desde el móvil o navegador el sonido y las imágenes de una pantalla grande en tiempo real, creando conjuntamente una experiencia audiovisual inmersiva.', viewProject: 'Ver proyecto', launch: 'Abrir aplicación' },
    zh: { description: '交互系统、实时视听与创意技术原型的开放研究空间。', project: 'PRISMA.live 是一个把观众转化为创作者的互动平台。它面向派对与工作坊，让参与者通过手机或网页浏览器实时控制大屏幕上的声音与视觉，共同生成沉浸式现场视听体验。', viewProject: '查看作品', launch: '打开应用' }
};

let sourceProjectCopy = null;

function setText(element, value) {
    if (element && value !== undefined) element.textContent = value;
}

function pathFromHref(href) {
    try {
        return new URL(href, window.location.href).pathname.replace(/^\/+/, '');
    } catch {
        return '';
    }
}

function currentPath() {
    return window.location.pathname.replace(/^\/+/, '');
}

function categoryKeyFromHref(href) {
    if (href.includes('gallery-art.html')) return 'physical';
    if (href.includes('gallery-digital.html')) return 'digital';
    if (href.includes('gallery-web.html')) return 'interactive';
    return null;
}

function configureProjectBackButtons() {
    const path = currentPath();
    const fallbackHref = path.includes('/fine_art/')
        ? '../../gallery/gallery-art.html'
        : path.includes('/digital_art/')
            ? '../../gallery/gallery-digital.html'
            : path.includes('/interactive/')
                ? '../../gallery/gallery-web.html'
                : null;
    if (!fallbackHref) return;

    document.querySelectorAll('.project-detail-container .back-btn').forEach((button) => {
        button.href = fallbackHref;
    });
}

function createProjectNavigation() {
    const path = currentPath();
    const index = projectOrder.indexOf(path);
    const container = document.querySelector('.project-info-sticky');
    if (index < 0 || !container) return;

    let navigation = container.querySelector('.project-nav');
    if (!navigation) {
        navigation = document.createElement('nav');
        navigation.className = 'project-nav';
        container.appendChild(navigation);
    }
    navigation.replaceChildren();

    const links = [
        ['prev', projectOrder[index - 1]],
        ['next', projectOrder[index + 1]]
    ];
    links.forEach(([direction, targetPath]) => {
        if (!targetPath) return;
        const link = document.createElement('a');
        link.className = 'nav-link project-nav-link project-nav-' + direction;
        link.href = '../../../' + targetPath;
        link.dataset.direction = direction;
        link.dataset.target = targetPath;
        const label = document.createElement('span');
        label.className = 'project-nav-label';
        link.appendChild(label);
        navigation.appendChild(link);
    });
}

function createGalleryCategoryLabels() {
    document.querySelectorAll('.gallery-item').forEach((item) => {
        const path = pathFromHref(item.getAttribute('href') || '');
        const configuredKeys = galleryCategoryKeys[path];
        const categoryKeys = Array.isArray(configuredKeys) ? configuredKeys : [configuredKeys];
        const title = item.querySelector('.gallery-title');
        if (!configuredKeys || !title || item.querySelector('.gallery-category-label')) return;

        const captionRow = document.createElement('div');
        captionRow.className = 'gallery-caption-row';
        title.before(captionRow);
        captionRow.appendChild(title);

        const label = document.createElement('span');
        label.className = 'gallery-category-label';
        label.dataset.categoryKeys = categoryKeys.join(',');
        captionRow.appendChild(label);
    });
}

function captureProjectCopy() {
    if (!document.querySelector('.project-title')) return null;
    return {
        title: document.querySelector('.project-title').textContent.trim(),
        meta: document.querySelector('.project-meta')?.textContent.trim() || '',
        techniques: Array.from(document.querySelectorAll('.project-tech li')).slice(1).map((item) => (item.querySelector('.project-tech-text') || item).textContent.trim()),
        description: Array.from(document.querySelectorAll('.project-desc > p')).filter((item) => !item.querySelector('.project-desc-link')).map((item) => item.textContent.trim()),
        links: Array.from(document.querySelectorAll('.project-desc-link')).map((item) => item.textContent.trim())
    };
}

function applyProjectContent(language, copy) {
    const path = currentPath();
    if (!document.querySelector('.project-title')) return;

    const sourceLanguage = spanishSourceProjects.has(path) ? 'es' : 'en';
    const content = language === sourceLanguage ? sourceProjectCopy : projectTranslations[path]?.[language];
    if (!content) {
        console.warn(`Missing ${language} translation for ${path}`);
        return;
    }

    setText(document.querySelector('.project-title'), content.title);
    setText(document.querySelector('.project-meta'), content.meta);
    document.title = `${content.title} | ${copy.brandName}`;

    const techniqueItems = document.querySelectorAll('.project-tech li');
    techniqueItems.forEach((item, index) => {
        const textTarget = item.querySelector('.project-tech-text') || item;
        const languageKey = language.charAt(0).toUpperCase() + language.slice(1);
        const customHeading = item.dataset[`label${languageKey}`];
        setText(textTarget, index === 0 ? customHeading || copy.techniques : content.techniques[index - 1]);
    });

    const paragraphs = Array.from(document.querySelectorAll('.project-desc > p')).filter((item) => !item.querySelector('.project-desc-link'));
    paragraphs.forEach((paragraph, index) => setText(paragraph, content.description[index]));
    document.querySelectorAll('.project-desc-link').forEach((link, index) => setText(link, content.links[index]));
    document.querySelectorAll('.project-media-scroll img').forEach((image, index) => {
        image.alt = `${content.title} - ${copy.image} ${index + 1}`;
    });
    document.querySelectorAll('.project-media-scroll iframe').forEach((frame) => {
        frame.title = copy.video;
    });
    const captionLanguage = language.charAt(0).toUpperCase() + language.slice(1);
    document.querySelectorAll('[data-caption-en]').forEach((caption) => {
        setText(caption, caption.dataset[`caption${captionLanguage}`]);
    });

    document.querySelectorAll('.paired-media figcaption').forEach((caption, index) => {
        const pairNumber = String(Math.floor(index / 2) + 1).padStart(2, '0');
        const comparisonCaption = path === 'pages/work/fine_art/work17.html'
            ? paintingComparisonCaptions[language]?.[index]
            : null;
        setText(caption, comparisonCaption || `${index % 2 === 0 ? copy.original : copy.copy} ${pairNumber}`);
    });
}

function applyProfileTimeline(selector, entries) {
    document.querySelectorAll(selector).forEach((item, index) => {
        const entry = entries[index];
        if (!entry) return;
        setText(item.querySelector('.timeline-date'), entry.date);
        const title = item.querySelector('.timeline-content h3');
        setText(title, entry.title);
        if (title && entry.role) {
            const role = document.createElement('span');
            role.className = 'timeline-role';
            role.textContent = entry.role;
            title.appendChild(role);
        }
        setText(item.querySelector('.timeline-content p:not(.profile-note)'), entry.detail);

        const note = item.querySelector('.profile-note');
        if (note) {
            setText(note, entry.note || '');
            note.hidden = !entry.note;
        }
    });
}

function applyProfile(language) {
    if (!document.querySelector('.profile-container')) return;
    const content = profileCopy[language];
    const name = ui[language].personName;
    setText(document.querySelector('.profile-name'), name);
    const profileImage = document.querySelector('.profile-img');
    if (profileImage) profileImage.alt = name;
    setText(document.querySelector('.profile-kicker'), content.kicker);
    document.querySelectorAll('.profile-pill').forEach((item, index) => setText(item, content.pills[index]));
    document.querySelectorAll('.profile-bio > p').forEach((item, index) => setText(item, content.bio[index]));
    setText(document.querySelector('.profile-image-caption'), content.imageCaption);
    setText(document.querySelector('.profile-focus-label'), content.focusLabel);
    setText(document.querySelector('.profile-focus-text'), content.focus);
    setText(document.querySelector('.profile-cv-label'), content.cvLabel);
    setText(document.querySelector('.profile-section-title--education'), content.sections[0]);
    setText(document.querySelector('.profile-section-title--exhibitions'), content.sections[1]);
    setText(document.querySelector('.profile-section-title--practice'), content.sections[2]);
    setText(document.querySelector('.profile-section-title--contact'), content.sections[3]);
    applyProfileTimeline('.education-list .timeline-item', content.education);
    applyProfileTimeline('.exhibitions-list .timeline-item', content.exhibitions);
    document.querySelectorAll('.skill-card h3').forEach((item, index) => setText(item, content.skillTitles[index]));
    document.querySelectorAll('.skill-tools').forEach((item, index) => setText(item, content.skillTools[index]));
    document.querySelectorAll('.skill-card p:not(.skill-tools)').forEach((item, index) => setText(item, content.skillDescriptions[index]));

    const contactSection = document.querySelector('.profile-section--contact');
    if (contactSection) {
        setText(contactSection.querySelector('.profile-contact-intro'), content.contact);
        const paragraphs = contactSection.querySelectorAll('.profile-contact-links p');
        setLeadingLabel(paragraphs[0], content.email);
        setLeadingLabel(paragraphs[1], content.instagram);
    }
    document.title = `${ui[language].profileTitle} | ${ui[language].brandName}`;
}

function setLeadingLabel(paragraph, label) {
    if (!paragraph) return;
    const textNode = Array.from(paragraph.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.nodeValue = `${label} `;
}

function applyLab(language) {
    if (!document.querySelector('.lab-grid')) return;
    setText(document.querySelector('.lab-description'), labCopy[language].description);
    setText(document.querySelector('.lab-info p'), labCopy[language].project);
    setText(document.querySelector('.btn-project'), labCopy[language].viewProject);
    setText(document.querySelector('.btn-launch'), labCopy[language].launch);
    document.title = `${ui[language].labTitle} | ${ui[language].brandName}`;
}

function translatePage(language) {
    const copy = ui[language];
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;

    document.querySelectorAll('.brand').forEach((brand) => setText(brand, copy.brandName));


    document.querySelectorAll('.nav-btn').forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (href.includes('index.html')) setText(link, copy.home);
        if (href.includes('selection.html')) setText(link, copy.works);
        if (href.includes('lab.html')) setText(link, copy.lab);
        if (href.includes('profile.html')) setText(link, copy.profile);
    });

    document.querySelectorAll('.dropdown-content a, .selection-card').forEach((link) => {
        const key = categoryKeyFromHref(link.getAttribute('href') || '');
        if (!key) return;
        const label = link.classList.contains('selection-card') ? link.querySelector('.card-title') : link;
        setText(label, copy[key]);
    });

    document.querySelectorAll('.back-btn').forEach((button) => {
        const isProjectBack = Boolean(button.closest('.project-detail-container'));
        setText(button, isProjectBack ? copy.back : copy.categories);
    });

    const projectNavigation = document.querySelector('.project-nav');
    if (projectNavigation) projectNavigation.setAttribute('aria-label', copy.projectNavigation);
    document.querySelectorAll('.project-nav-link').forEach((link) => {
        const direction = link.dataset.direction;
        const label = copy[direction];
        const targetTitle = galleryTitles[link.dataset.target]?.[language];
        setText(link.querySelector('.project-nav-label'), label);
        link.title = targetTitle ? `${label}: ${targetTitle}` : label;
        link.setAttribute('aria-label', link.title);
    });

    document.querySelectorAll('.filter-btn').forEach((button) => {
        const key = filterKeys[button.dataset.filter];
        if (key) setText(button, copy[key]);
    });

    document.querySelectorAll('.gallery-item').forEach((item) => {
        const path = pathFromHref(item.getAttribute('href') || '');
        const title = galleryTitles[path]?.[language];
        setText(item.querySelector('.gallery-title'), title);
        const categoryLabel = item.querySelector('.gallery-category-label');
        if (categoryLabel) {
            const categoryKeys = categoryLabel.dataset.categoryKeys.split(',');
            setText(categoryLabel, categoryKeys.map((key) => copy[key]).join(' · '));
        }
        const image = item.querySelector('img');
        if (image && title) image.alt = title;
    });

    const path = currentPath();
    const headingKey = path.includes('gallery-art.html') ? 'physical'
        : path.includes('gallery-digital.html') ? 'digital'
            : path.includes('gallery-web.html') ? 'interactive' : null;
    if (headingKey) {
        setText(document.querySelector('.gallery-container h1'), copy[headingKey]);
        document.title = `${copy[headingKey]} | ${copy.brandName}`;
    }


    if (path.endsWith('pages/selection.html')) {
        setText(document.querySelector('.selection-heading'), copy.selectionTitle);
        document.title = `${copy.selectionTitle} | ${copy.brandName}`;
    }
    applyProjectContent(language, copy);
    applyProfile(language);
    applyLab(language);
    updateLanguageMenu(language);
}

function createUtilityControls() {
    const controls = document.createElement('div');
    controls.className = 'utility-switchers';
    document.body.appendChild(controls);
    return controls;
}

function activeLanguage() {
    const language = localStorage.getItem('xin-lin-language');
    return ui[language] ? language : 'en';
}

function updateThemeControl(language = activeLanguage()) {
    const trigger = document.querySelector('.theme-trigger');
    if (!trigger) return;

    const isLight = document.documentElement.dataset.theme === 'light';
    const label = isLight ? ui[language].themeToDark : ui[language].themeToLight;
    trigger.setAttribute('aria-label', label);
    trigger.setAttribute('aria-pressed', String(isLight));
    trigger.title = label;
}

function createThemeSwitcher(controls) {
    const trigger = document.createElement('button');
    trigger.className = 'theme-trigger';
    trigger.type = 'button';
    trigger.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
            <g class="theme-icon-sun">
                <circle cx="12" cy="12" r="3.4"></circle>
                <path d="M12 2.6v2M12 19.4v2M2.6 12h2M19.4 12h2M5.35 5.35l1.4 1.4M17.25 17.25l1.4 1.4M18.65 5.35l-1.4 1.4M6.75 17.25l-1.4 1.4"></path>
            </g>
            <path class="theme-icon-moon" d="M19.1 15.1A7.7 7.7 0 0 1 8.9 4.9 7.8 7.8 0 1 0 19.1 15.1Z"></path>
        </svg>`;
    trigger.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        updateThemeControl();
    });
    controls.appendChild(trigger);
    updateThemeControl();
}

function createLanguageSwitcher(controls) {
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.innerHTML = `
        <button class="language-trigger" type="button" aria-haspopup="true" aria-expanded="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M3 12h18M12 3c2.4 2.5 3.7 5.5 3.7 9S14.4 18.5 12 21M12 3C9.6 5.5 8.3 8.5 8.3 12S9.6 18.5 12 21"></path>
            </svg>
        </button>
        <div class="language-options" role="menu"></div>`;

    const trigger = switcher.querySelector('.language-trigger');
    const options = switcher.querySelector('.language-options');
    [['zh', '中文'], ['en', 'English'], ['es', 'Español']].forEach(([language, label]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'language-option';
        button.dataset.language = language;
        button.textContent = label;
        button.setAttribute('role', 'menuitemradio');
        button.addEventListener('click', () => {
            localStorage.setItem('xin-lin-language', language);
            translatePage(language);
            switcher.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
            button.blur();
        });
        options.appendChild(button);
    });

    trigger.addEventListener('click', () => {
        const isOpen = switcher.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (event) => {
        if (!switcher.contains(event.target)) {
            switcher.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        }
    });
    controls.appendChild(switcher);
}

function updateLanguageMenu(language) {
    document.querySelectorAll('.language-option').forEach((button) => {
        const active = button.dataset.language === language;
        button.classList.toggle('active', active);
        button.setAttribute('aria-current', active ? 'true' : 'false');
        button.setAttribute('aria-checked', String(active));
    });
    const trigger = document.querySelector('.language-trigger');
    if (trigger) {
        trigger.setAttribute('aria-label', ui[language].languageLabel);
        trigger.title = ui[language].languageLabel;
    }
    updateThemeControl(language);
}

function setupNavigationDropdowns() {
    document.querySelectorAll('.nav-item.dropdown').forEach((dropdown, index) => {
        const trigger = dropdown.querySelector(':scope > .nav-btn');
        const menu = dropdown.querySelector(':scope > .dropdown-content');
        if (!trigger || !menu) return;

        if (!menu.id) menu.id = `works-menu-${index + 1}`;
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-controls', menu.id);
        trigger.setAttribute('aria-expanded', 'false');

        const closeMenu = () => {
            dropdown.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        };

        const openMenu = () => {
            document.querySelectorAll('.nav-item.dropdown.open').forEach((openDropdown) => {
                if (openDropdown !== dropdown) {
                    openDropdown.classList.remove('open');
                    openDropdown.querySelector(':scope > .nav-btn')?.setAttribute('aria-expanded', 'false');
                }
            });
            dropdown.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
        };

        // Keep WORKS as a normal, single-click link on every page. Hover opens
        // the categories in CSS; ArrowDown provides keyboard access below.

        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                openMenu();
                menu.querySelector('a')?.focus();
            }
        });

        dropdown.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeMenu();
                trigger.focus();
            }
        });

        dropdown.addEventListener('focusout', () => {
            window.requestAnimationFrame(() => {
                if (!dropdown.contains(document.activeElement)) closeMenu();
            });
        });

        menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) closeMenu();
        });
    });
}

function setupEmbeddedVideoReplay() {
    document.querySelectorAll('[data-video-replay]').forEach((button) => {
        const figure = button.closest('.project-media-figure');
        const iframe = figure?.querySelector('iframe[data-replayable-embed]');
        if (!iframe) return;

        const source = iframe.getAttribute('src');
        button.addEventListener('click', () => {
            iframe.setAttribute('src', 'about:blank');
            window.requestAnimationFrame(() => iframe.setAttribute('src', source));
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    sourceProjectCopy = captureProjectCopy();
    configureProjectBackButtons();
    createGalleryCategoryLabels();
    createProjectNavigation();
    setupNavigationDropdowns();
    setupEmbeddedVideoReplay();
    const utilityControls = createUtilityControls();
    createThemeSwitcher(utilityControls);
    createLanguageSwitcher(utilityControls);
    document.querySelectorAll('.nav-btn.active').forEach((link) => link.setAttribute('aria-current', 'page'));
    const language = localStorage.getItem('xin-lin-language');
    translatePage(ui[language] ? language : 'en');
});
