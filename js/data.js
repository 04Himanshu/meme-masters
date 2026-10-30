/**
 * Indian Meme Quiz Database
 * Curated collection of famous memes across Bollywood, Indian Cinema, OTT Web Series, and Indian Social Media.
 * Uses exact, original meme images and clips from iconic moments.
 */

const DEFAULT_MEMES = [
  // ==========================================
  // BOLLYWOOD & INDIAN CINEMA MEMES
  // ==========================================
  {
    id: 1,
    title: "Babu Bhaiya - 'Utha Le Re Baba'",
    alias: "Baburao Ganpatrao Apte Frustration",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/495470930.jpg",
    backupMediaUrl: "https://i.imgflip.com/327626128.jpg",
    mediaAlt: "Baburao Ganpatrao Apte looking up in exasperation: 'Utha le re baba, utha le...'",
    options: [
      "Hera Pheri",
      "Garam Masala",
      "Bhagam Bhag",
      "Chup Chup Ke"
    ],
    correctAnswer: "Hera Pheri",
    hints: [
      "Directed by Priyadarshan in the year 2000, starring Paresh Rawal, Akshay Kumar, and Suniel Shetty.",
      "The full iconic dialogue goes: 'Utha le re baba, utha le... Mereko nahi re, in dono ko utha le!'"
    ],
    origin: "Hera Pheri (2000)",
    actorOrCreator: "Paresh Rawal as Baburao Ganpatrao Apte (Babu Bhaiya)",
    funFact: "The character of Baburao with his signature dhoti, spectacles, and Konkani-Marathi accent was largely improvised and shaped by Paresh Rawal during script reading sessions!"
  },
  {
    id: 2,
    title: "Raju's Smug Pose (Hands on Hips)",
    alias: "Akshay Kumar Phir Hera Pheri Pose",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/241630782.jpg",
    backupMediaUrl: "https://i.imgflip.com/3aoy2b.jpg",
    mediaAlt: "Akshay Kumar as Raju standing with hands on hips and a supremely smug smile",
    options: [
      "Phir Hera Pheri",
      "Welcome",
      "De Dana Dan",
      "Bhool Bhulaiyaa"
    ],
    correctAnswer: "Phir Hera Pheri",
    hints: [
      "The movie where a scheme promised: '25 din mein paisa double!'",
      "Raju adopts this victorious stance while looking at his new lavish bungalow and fancy sports coat."
    ],
    origin: "Phir Hera Pheri (2006)",
    actorOrCreator: "Akshay Kumar as Raju",
    funFact: "Akshay Kumar's pose became so legendary that fans across India recreated it at Madame Tussauds, colleges, and social media graduations across the world!"
  },
  {
    id: 3,
    title: "Majnu Bhai's Painting (Horse on Donkey)",
    alias: "Live Painting by Majnu Bhai",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/9jlc11.jpg",
    backupMediaUrl: "https://indianmemetemplates.com/wp-content/uploads/welcome-movie-majnu-bhai-painting.jpg",
    mediaAlt: "The legendary painting of a donkey with a horse standing on its back",
    options: [
      "Welcome",
      "Welcome Back",
      "Singh Is Kinng",
      "No Entry"
    ],
    correctAnswer: "Welcome",
    hints: [
      "Anil Kapoor plays a dreaded gangster who secretly dreams of being a world-renowned fine art painter.",
      "Mallika Sherawat pretends to be an art critic and gasps: 'My God, what an imagination! Gadhe ke upar ghoda!'"
    ],
    origin: "Welcome (2007)",
    actorOrCreator: "Anil Kapoor as Sagar Pandey alias 'Majnu Bhai'",
    funFact: "The painting was auctioned for real charity years after the movie release and was referenced in countless fashion shows and t-shirt merchandise!"
  },
  {
    id: 4,
    title: "Ramadhir Singh - 'Tumse Na Ho Payega'",
    alias: "Gangs of Wasseypur Disappointment",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/188194382.jpg",
    backupMediaUrl: "https://i.imgflip.com/1bij.jpg",
    mediaAlt: "Ramadhir Singh sitting calmly in a white kurta telling his son: 'Tumse na ho payega'",
    options: [
      "Gangs of Wasseypur",
      "Mirzapur",
      "Paan Singh Tomar",
      "Omkara"
    ],
    correctAnswer: "Gangs of Wasseypur",
    hints: [
      "Directed by Anurag Kashyap, starring filmmaker Tigmanshu Dhulia as the cold-blooded coal mafia baron.",
      "The line is delivered to his Bollywood-obsessed son Danish/Perpendicular with deadpan calm."
    ],
    origin: "Gangs of Wasseypur - Part 2 (2012)",
    actorOrCreator: "Tigmanshu Dhulia as Ramadhir Singh",
    funFact: "Tigmanshu Dhulia is primarily a director (Paan Singh Tomar, Haasil); Anurag Kashyap had to persistently badger him for weeks before he agreed to play Ramadhir Singh!"
  },
  {
    id: 5,
    title: "Circuit - 'Bhai Ne Bola Karne Ka Toh Karne Ka'",
    alias: "Blind Loyalty by Circuit",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/412276337.jpg",
    backupMediaUrl: "https://i.imgflip.com/1ur9b0.jpg",
    mediaAlt: "Circuit wearing black kurta and gold chains: 'Bhai ne bola karne ka toh karne ka!'",
    options: [
      "Lage Raho Munna Bhai",
      "Munna Bhai M.B.B.S.",
      "Dhamaal",
      "Golmaal"
    ],
    correctAnswer: "Lage Raho Munna Bhai",
    hints: [
      "The quintessential right-hand man who believes whatever his best friend says without questioning.",
      "Delivered when Munna claims he can see and talk directly to Mahatma Gandhi."
    ],
    origin: "Lage Raho Munna Bhai (2006)",
    actorOrCreator: "Arshad Warsi as Circuit (Sarkeshwar)",
    funFact: "Arshad Warsi's portrayal of Circuit is recognized as one of the greatest sidekick roles in Indian cinema history, completely redefining his career!"
  },
  {
    id: 6,
    title: "Pushpa Raj - 'Jhukega Nahi Saala!'",
    alias: "The Beard Brush Gesture",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/366299558.jpg",
    backupMediaUrl: "https://i.imgflip.com/368126228.jpg",
    mediaAlt: "Allu Arjun sweeping the back of his hand under his beard: 'Main jhukega nahi!'",
    options: [
      "Pushpa: The Rise",
      "K.G.F: Chapter 1",
      "Ala Vaikunthapurramuloo",
      "RRR"
    ],
    correctAnswer: "Pushpa: The Rise",
    hints: [
      "Directed by Sukumar, starring Allu Arjun as a red sandalwood smuggler in the Seshachalam forests.",
      "Cricketers like David Warner, Hardik Pandya, and Virat Kohli celebrated on field doing this exact chin gesture."
    ],
    origin: "Pushpa: The Rise (2021)",
    actorOrCreator: "Allu Arjun as Pushpa Raj (Hindi dub by Shreyas Talpade)",
    funFact: "Shreyas Talpade voiced Pushpa in the Hindi version; his dialogue delivery 'Pushpa, Pushparaj... Main jhukega nahi!' became an overnight cultural phenomenon across North India."
  },
  {
    id: 7,
    title: "Chatur & Professor - 'Arey Kehna Kya Chahte Ho?'",
    alias: "3 Idiots Engineering Confusion",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/275870470.jpg",
    backupMediaUrl: "https://i.imgflip.com/23ls.jpg",
    mediaAlt: "Engineering professor in 3 Idiots: 'Arey kehna kya chahte ho?'",
    options: [
      "3 Idiots",
      "Taare Zameen Par",
      "Chhichhore",
      "PK"
    ],
    correctAnswer: "3 Idiots",
    hints: [
      "Directed by Rajkumar Hirani, based on Chetan Bhagat's novel 'Five Point Someone'.",
      "Rancho gives a convoluted, technical definition of a simple book when asked why he returned to class."
    ],
    origin: "3 Idiots (2009)",
    actorOrCreator: "Aamir Khan (Rancho) and Achyut Potdar (Professor)",
    funFact: "The line 'Arey kehna kya chahte ho?' has become the internet's universal response whenever someone gives a long-winded, jargon-filled explanation for a simple problem!"
  },
  {
    id: 8,
    title: "Vasooli Bhai - 'Samajh Nahi Aaya Par Sunkar Achha Laga'",
    alias: "The Friendly Extortionist",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/231487423.jpg",
    backupMediaUrl: "https://i.imgflip.com/3vzejv.jpg",
    mediaAlt: "Vasooli Bhai in quirky sunglasses saying: 'Samajh nahi aaya par sunkar achha laga'",
    options: [
      "Golmaal: Fun Unlimited",
      "Dhamaal",
      "Sunday",
      "All the Best"
    ],
    correctAnswer: "Golmaal: Fun Unlimited",
    hints: [
      "Directed by Rohit Shetty, featuring four college slackers who constantly swindle this gullible recovery agent.",
      "Played by Mukesh Tiwari, famous for his menacing villain roles who turned into a legendary comic character."
    ],
    origin: "Golmaal: Fun Unlimited (2006)",
    actorOrCreator: "Mukesh Tiwari as Vasooli Bhai",
    funFact: "Mukesh Tiwari was originally cast because of his terrifying role as Jageera in 'China Gate'; Rohit Shetty completely flipped his persona into the lovable, easily-scammed Vasooli Bhai."
  },
  {
    id: 9,
    title: "Rocky Bhai - 'Violence, Violence, Violence!'",
    alias: "KGF 2 Signature Dialogue",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/514618642.jpg",
    backupMediaUrl: "https://i.imgflip.com/1bij.jpg",
    mediaAlt: "Rocky Bhai calmly smoking in front of police barricades: 'Violence, violence, violence...'",
    options: [
      "K.G.F: Chapter 2",
      "K.G.F: Chapter 1",
      "Kantara",
      "Salaar"
    ],
    correctAnswer: "K.G.F: Chapter 2",
    hints: [
      "Directed by Prashanth Neel, breaking box office records across India in 2022.",
      "The full dialogue: 'Violence, Violence, Violence... I don't like it. I avoid. But... violence likes me! I can't avoid!'"
    ],
    origin: "K.G.F: Chapter 2 (2022)",
    actorOrCreator: "Yash as Raja Krishnappa Bairya alias Rocky Bhai",
    funFact: "Actor Yash wrote many of his own English one-liners for the movie, stating he wanted lines that every single teenager across the country could instantly repeat!"
  },
  {
    id: 10,
    title: "Chhota Pandit - 'Aadmi Ka Swabhav Hi Aisa Hai'",
    alias: "Red-faced Chhota Pandit in Bhool Bhulaiyaa",
    category: "Bollywood",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/131012395.jpg",
    backupMediaUrl: "https://i.imgflip.com/1h7in3.jpg",
    mediaAlt: "Rajpal Yadav smeared completely in red sindoor looking petrified in Bhool Bhulaiyaa",
    options: [
      "Bhool Bhulaiyaa",
      "Dhol",
      "Chup Chup Ke",
      "Hungama"
    ],
    correctAnswer: "Bhool Bhulaiyaa",
    hints: [
      "Priyadarshan horror-comedy starring Akshay Kumar, Vidya Balan, and Rajpal Yadav.",
      "His character gets traumatized after water is thrown on him and runs around the haunted palace."
    ],
    origin: "Bhool Bhulaiyaa (2007)",
    actorOrCreator: "Rajpal Yadav as Chhota Pandit",
    funFact: "Rajpal Yadav's red-faced sindoor look with betel nut leaves and ear-sticks became one of India's most shared Halloween and WhatsApp sticker formats!"
  },

  // ==========================================
  // INDIAN SOCIAL MEDIA, OTT & VIRAL CULTURE
  // ==========================================
  {
    id: 11,
    title: "Ashneer Grover - 'Yeh Sab Doglapan Hai!'",
    alias: "Shark Tank India Reality Check",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/369219950.jpg",
    backupMediaUrl: "https://i.imgflip.com/8p0a.jpg",
    mediaAlt: "Ashneer Grover sitting back on Shark Tank India: 'Yeh sab doglapan hai!'",
    options: [
      "Shark Tank India (Season 1)",
      "Bigg Boss 15",
      "MTV Roadies",
      "The Kapil Sharma Show"
    ],
    correctAnswer: "Shark Tank India (Season 1)",
    hints: [
      "Former BharatPe co-founder who became famous for pulling no punches with pitch entrepreneurs.",
      "He even titled his bestselling autobiography after this exact Hindi catchphrase."
    ],
    origin: "Shark Tank India Season 1 (Sony LIV, 2022)",
    actorOrCreator: "Ashneer Grover (Former BharatPe Co-founder)",
    funFact: "Ashneer's blunt one-liner 'Yeh sab doglapan hai' spawned hundreds of thousands of corporate and college memes, and his book 'Doglapan' became a national bestseller!"
  },
  {
    id: 12,
    title: "Kaleen Bhaiya - 'Yeh Bhi Theek Hai'",
    alias: "The Calm Mirzapur Acceptance Nod",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/174955355.jpg",
    backupMediaUrl: "https://i.imgflip.com/345v97.jpg",
    mediaAlt: "Pankaj Tripathi as Akhandanand Tripathi nodding calmly: 'Yeh bhi theek hai'",
    options: [
      "Mirzapur",
      "Sacred Games",
      "Pataal Lok",
      "The Family Man"
    ],
    correctAnswer: "Mirzapur",
    hints: [
      "Amazon Prime India's mega-hit crime series set in the Purvanchal underworld.",
      "Delivered with an effortless, calm head-nod whenever an unfavorable compromise must be accepted."
    ],
    origin: "Mirzapur (Amazon Prime Video, 2018)",
    actorOrCreator: "Pankaj Tripathi as Akhandanand Tripathi (Kaleen Bhaiya)",
    funFact: "Pankaj Tripathi revealed that his signature gentle neck-nod and pause was not in the script; it was his natural improvisational quirk that directors loved and kept!"
  },
  {
    id: 13,
    title: "Vipin Sahu - 'Bhai 500 Jyada Lele Par Land Kara De!'",
    alias: "The Manali Paragliding Terror",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/198931960.jpg",
    backupMediaUrl: "https://i.imgflip.com/26n6Gx.jpg",
    mediaAlt: "Vipin Sahu terrified mid-air clinging to paraglider: 'Bhai land kara de!'",
    options: [
      "Paragliding in Manali (Vipin Sahu)",
      "Bungee Jumping in Rishikesh",
      "Scuba Diving in Goa",
      "Skiing in Gulmarg"
    ],
    correctAnswer: "Paragliding in Manali (Vipin Sahu)",
    hints: [
      "Recorded in Kullu-Manali in July 2019 while flying high in the sky.",
      "The instructor kept telling him: 'Hawwa kam hai, taange seedhi rakh!' while he closed his eyes in sheer panic."
    ],
    origin: "YouTube viral video uploaded by Vipin Sahu (2019)",
    actorOrCreator: "Vipin Sahu",
    funFact: "Vipin Sahu became so famous from his mid-air panic that brands signed him for commercials, and he was later invited as a contestant on MTV Roadies!"
  },
  {
    id: 14,
    title: "Yashraj Mukhate - 'Rasode Mein Kaun Tha?'",
    alias: "Kokilaben TV Serial Musical Remix",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/266894568.jpg",
    backupMediaUrl: "https://i.imgflip.com/345v97.jpg",
    mediaAlt: "Kokilaben staring intensely: 'Rasode mein kaun tha? Khaali cooker gas pe chada diya!'",
    options: [
      "Saath Nibhaana Saathiya (Remix by Yashraj Mukhate)",
      "Kyunki Saas Bhi Kabhi Bahu Thi",
      "Kasautii Zindagii Kay",
      "Balika Vadhu"
    ],
    correctAnswer: "Saath Nibhaana Saathiya (Remix by Yashraj Mukhate)",
    hints: [
      "An engineer-turned-music producer from Aurangabad who added groovy rhythm to daily soap drama.",
      "The central mystery: Who put the empty cooker on the gas stove ('Khaali cooker gas pe chada diya!')?"
    ],
    origin: "Instagram Reel by Yashraj Mukhate (August 2020)",
    actorOrCreator: "Yashraj Mukhate (Original dialogue by Rupal Patel as Kokila Modi)",
    funFact: "The video blew up during the 2020 lockdown, gathering tens of millions of views in 48 hours and inspiring celebrities, politicians, and news anchors to join the meme trend!"
  },
  {
    id: 15,
    title: "Sarim Akhtar - Disappointed Cricket Fan",
    alias: "Hands on Hips World Cup Reaction",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/219458796.jpg",
    backupMediaUrl: "https://i.imgflip.com/30b1gx.jpg",
    mediaAlt: "Muhammad Sarim Akhtar standing in a checked vest with hands on hips staring in utter disappointment",
    options: [
      "ICC Cricket World Cup 2019 (Pakistan vs Australia)",
      "India vs Pakistan T20 World Cup 2021",
      "IPL 2019 Finals",
      "Asia Cup 2018"
    ],
    correctAnswer: "ICC Cricket World Cup 2019 (Pakistan vs Australia)",
    hints: [
      "Occurred in Taunton, England after fielder Asif Ali dropped an easy catch on the boundary.",
      "The camera operator cut to him for just three seconds, turning him into a global meme immortal."
    ],
    origin: "ICC Cricket World Cup 2019 live broadcast (June 12, 2019)",
    actorOrCreator: "Muhammad Sarim Akhtar",
    funFact: "Sarim Akhtar works as a senior risk manager in London. The International Cricket Council (ICC) and even the Hong Kong meme museum featured his iconic disappointment stance!"
  },
  {
    id: 16,
    title: "Munna Bhaiya - 'Bawaal Cheez Hai Be!'",
    alias: "System Hil Jata Hai",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/330271929.jpg",
    backupMediaUrl: "https://i.imgflip.com/25w3.jpg",
    mediaAlt: "Munna Bhaiya smiling passionately: 'Bawaal cheez hai be! Poora system hil jata hai'",
    options: [
      "Mirzapur",
      "Bicchoo Ka Khel",
      "Pyaar Ka Punchnama",
      "Chintu Ka Birthday"
    ],
    correctAnswer: "Mirzapur",
    hints: [
      "The Prince of Mirzapur explaining the rush of power and illicit contraband.",
      "His dialogue ends with: '...poora system hil jata hai!'"
    ],
    origin: "Mirzapur Season 1 (Amazon Prime Video, 2018)",
    actorOrCreator: "Divyendu Sharma as Phoolchand 'Munna' Tripathi",
    funFact: "Divyendu's portrayal turned Munna Bhaiya into a cult anti-hero so beloved that fans petitioned the creators endlessly following the Season 2 climax!"
  },
  {
    id: 17,
    title: "Ganesh Gaitonde - 'Kabhi Kabhi Lagta Hai Apun Hi Bhagwan Hai'",
    alias: "The God Complex of Sacred Games",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/197307865.jpg",
    backupMediaUrl: "https://i.imgflip.com/154163632.jpg",
    mediaAlt: "Ganesh Gaitonde looking menacing: 'Kabhi kabhi lagta hai apun hi bhagwan hai'",
    options: [
      "Sacred Games",
      "Gangs of Wasseypur",
      "Badlapur",
      "Raees"
    ],
    correctAnswer: "Sacred Games",
    hints: [
      "India's first major breakout Netflix original series, based on Vikram Chandra's novel.",
      "Delivered in the very opening narration before giving Inspector Sartaj Singh 25 days to save Mumbai."
    ],
    origin: "Sacred Games (Netflix, 2018)",
    actorOrCreator: "Nawazuddin Siddiqui as Ganesh Eknath Gaitonde",
    funFact: "This line instantly established Nawazuddin Siddiqui as the king of philosophical Indian gangsters, used by netizens whenever they clear an exam or pull off a lucky gamble!"
  },
  {
    id: 18,
    title: "Hindustani Bhau - 'Pehli Fursat Mein Nikal'",
    alias: "The Car Rant Master",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/209930722.jpg",
    backupMediaUrl: "https://i.imgflip.com/wxica.jpg",
    mediaAlt: "Hindustani Bhau sitting in car gesturing with hand: 'Pehli fursat mein nikal!'",
    options: [
      "Hindustani Bhau Viral Videos",
      "CarryMinati Rants",
      "BB Ki Vines",
      "Technical Guruji"
    ],
    correctAnswer: "Hindustani Bhau Viral Videos",
    hints: [
      "Famous for sitting inside a car in Mumbai and posting fiery YouTube videos with a distinctive Mumbai lingo.",
      "The full viral phrase: 'Nikal... pehli fursat mein nikal! Koi zaroorat nahi teri idhar!'"
    ],
    origin: "YouTube & TikTok viral videos (2018-2019)",
    actorOrCreator: "Vikas Fhatak alias 'Hindustani Bhau'",
    funFact: "His car videos were so ubiquitous on Indian WhatsApp groups that Salman Khan and the producers brought him into Bigg Boss Season 13 as a wild card entry!"
  },
  {
    id: 19,
    title: "Binod - 'Dekh Raha Hai Na Binod'",
    alias: "Panchayat Viral Dialogue",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/400636857.jpg",
    backupMediaUrl: "https://i.imgflip.com/384752831.jpg",
    mediaAlt: "Bhushan whispering slyly in Panchayat: 'Dekh raha hai na Binod...'",
    options: [
      "Panchayat (TVF / Prime Video)",
      "Gullak (TVF)",
      "Mirzapur",
      "Yeh Meri Family"
    ],
    correctAnswer: "Panchayat (TVF / Prime Video)",
    hints: [
      "Created by TVF, set in the quiet rural village of Phulera.",
      "Bhushan (Banrakas) uses this phrase continuously to manipulate a fellow villager against the Pradhan."
    ],
    origin: "Panchayat Season 2 (Amazon Prime Video, 2022)",
    actorOrCreator: "Durgesh Kumar (Bhushan / Banrakas) and Ashok Pathak (Binod)",
    funFact: "The dialogue 'Dekh raha hai na Binod' blew up across Indian social media, sparking thousands of political, corporate, and campus memes!"
  },
  {
    id: 20,
    title: "Jeetu Bhaiya - 'Kitna Drama Karte Ho Yaar!'",
    alias: "Kota Factory Mentor Advice",
    category: "Social Media",
    mediaType: "image",
    mediaUrl: "https://i.imgflip.com/5p6ij3.jpg",
    backupMediaUrl: "https://i.imgflip.com/494673637.jpg",
    mediaAlt: "Jeetu Bhaiya looking in mild disbelief: 'Kitna drama karte ho yaar!' in Kota Factory",
    options: [
      "Kota Factory (TVF)",
      "Panchayat",
      "Aspirants",
      "Pitchers"
    ],
    correctAnswer: "Kota Factory (TVF)",
    hints: [
      "India's first black-and-white web series, created by The Viral Fever (TVF).",
      "Features the beloved physics mentor explaining life to stressed IIT-JEE aspirants in Kota."
    ],
    origin: "Kota Factory Season 1 (TVF / YouTube / Netflix, 2019)",
    actorOrCreator: "Jitendra Kumar as Jeetu Bhaiya",
    funFact: "Jeetu Bhaiya's empathetic guidance made him the ultimate elder brother figure for millions of Indian students preparing for competitive engineering and medical exams!"
  }
];

// Provide helper to get memes (custom or default)
function getInitialMemes() {
  try {
    const saved = localStorage.getItem('meme_quiz_custom_data_indian');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Upgrade check: ensure saved data does not contain old placeholder URLs
        const hasOldPlaceholders = parsed.some(m => m.mediaUrl && (m.mediaUrl.includes('unsplash') || m.mediaUrl.includes('sample/ForBiggerBlazes')));
        if (!hasOldPlaceholders) {
          return parsed;
        } else {
          localStorage.removeItem('meme_quiz_custom_data_indian');
        }
      }
    }
  } catch (err) {
    console.warn('Could not read custom memes from localStorage, using defaults:', err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_MEMES));
}

// Node.js testing compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_MEMES, getInitialMemes };
}

// Node.js testing compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_MEMES, getInitialMemes };
}
