/**
 * Kids Geo Arcade - Master Geography Data Store (50 Cities & 24 Overlapping Suspects)
 * Strict witness category separation and overlapping criminal physical traits matrix.
 */

window.GeoData = {
    // -------------------------------------------------------------------------
    // 1. CARMEN SANDIEGO DETECTIVE DATA (50 World Cities across 6 Continents)
    // -------------------------------------------------------------------------
    cities: [
        // --- EUROPE (12 Cities) ---
        {
            id: 'paris', name: 'Paris', country: 'France', continent: 'Europe',
            lat: 48.8566, lng: 2.3522, flag: '🇫🇷', currency: 'Euro (€)', language: 'French',
            landform: 'Seine River & Eiffel Tower', export: 'Haute Couture & Perfume', food: 'Croissant & Baguette', greeting: 'Bonjour',
            clues: {
                bank: "The suspect exchanged their money into blue Euro (€) banknotes depicting European bridges.",
                library: "They were researching Gothic flying buttresses at Notre-Dame Cathedral near the Seine River.",
                airport: "They boarded an airliner carrying a tricolor blue-white-red tail emblem with French flag markings.",
                chef: "They ordered a warm butter Croissant and greeted the staff with 'Bonjour'!"
            }
        },
        {
            id: 'rome', name: 'Rome', country: 'Italy', continent: 'Europe',
            lat: 41.9028, lng: 12.4964, flag: '🇮🇹', currency: 'Euro (€)', language: 'Italian',
            landform: 'Seven Hills & Tiber River', export: 'Leather Goods & Olive Oil', food: 'Neapolitan Pizza & Gelato', greeting: 'Ciao',
            clues: {
                bank: "The suspect withdrew Euros marked with European Union symbols.",
                library: "They researched ancient Roman gladiators who fought inside the stone Colosseum.",
                airport: "They checked in at a gate displaying a green, white, and red flag banner.",
                chef: "They ordered wood-fired Neapolitan pizza and pistachio gelato saying 'Ciao'!"
            }
        },
        {
            id: 'london', name: 'London', country: 'United Kingdom', continent: 'Europe',
            lat: 51.5074, lng: -0.1278, flag: '🇬🇧', currency: 'British Pound (£)', language: 'English',
            landform: 'Thames River Basin', export: 'Financial Services & Books', food: 'Fish & Chips', greeting: 'Cheerio',
            clues: {
                bank: "The thief asked for Bank of England Pound Sterling (£) notes.",
                library: "They studied the historic clockwork mechanisms inside Big Ben tower along the Thames.",
                airport: "They took off for Heathrow Airport carrying a Union Jack flag pin.",
                chef: "They ordered crisp battered fish with malt vinegar chips and said 'Cheerio'!"
            }
        },
        {
            id: 'oslo', name: 'Oslo', country: 'Norway', continent: 'Europe',
            lat: 59.9139, lng: 10.7522, flag: '🇳🇴', currency: 'Norwegian Krone (kr)', language: 'Norwegian',
            landform: 'Oslofjord & Glaciers', export: 'Seafood & Petroleum', food: 'Smoked Salmon & Waffles', greeting: 'Hei',
            clues: {
                bank: "The suspect traded for Norwegian Kroner (kr) depicting Viking longships.",
                library: "They read about deep coastal fjords carved by ancient glaciers.",
                airport: "They boarded a flight flying towards Scandinavia with a red flag bearing a blue Scandinavian cross.",
                chef: "They ate fresh smoked salmon on crispbread and said 'Hei'!"
            }
        },
        {
            id: 'athens', name: 'Athens', country: 'Greece', continent: 'Europe',
            lat: 37.9838, lng: 23.7275, flag: '🇬🇷', currency: 'Euro (€)', language: 'Greek',
            landform: 'Acropolis Rock & Aegean Sea', export: 'Olives & Marble', food: 'Gyro & Moussaka', greeting: 'Kalimera',
            clues: {
                bank: "The thief exchanged cash into Euro (€) coins stamped with the Athenian Owl.",
                library: "They were studying marble Doric columns at the Parthenon temple overlooking the Aegean Sea.",
                airport: "Their flight ticket showed a blue and white striped flag emblem.",
                chef: "They ordered a lamb Gyro wrap with tzatziki sauce saying 'Kalimera'!"
            }
        },
        {
            id: 'madrid', name: 'Madrid', country: 'Spain', continent: 'Europe',
            lat: 40.4168, lng: -3.7038, flag: '🇪🇸', currency: 'Euro (€)', language: 'Spanish',
            landform: 'Meseta Central Plateau', export: 'Saffron & Olive Oil', food: 'Paella & Churros', greeting: 'Hola',
            clues: {
                bank: "They requested Euros and mentioned spending them on Iberian ham.",
                library: "They studied Spanish royal paintings at the Prado Museum.",
                airport: "They checked in for a flight under a red and yellow flag banner.",
                chef: "They ate warm Churros dipped in thick chocolate and shouted 'Hola'!"
            }
        },
        {
            id: 'berlin', name: 'Berlin', country: 'Germany', continent: 'Europe',
            lat: 52.5200, lng: 13.4050, flag: '🇩🇪', currency: 'Euro (€)', language: 'German',
            landform: 'Spree River Basin', export: 'Automobiles & Machinery', food: 'Currywurst & Pretzel', greeting: 'Guten Tag',
            clues: {
                bank: "The thief converted their money into Euro (€) bills.",
                library: "They took notes on the Brandenburg Gate sandstone arch.",
                airport: "Their aircraft displayed a black, red, and gold tricolor emblem.",
                chef: "They ate spicy Currywurst with a freshly baked Pretzel and said 'Guten Tag'!"
            }
        },
        {
            id: 'reykjavik', name: 'Reykjavik', country: 'Iceland', continent: 'Europe',
            lat: 64.1466, lng: -21.9426, flag: '🇮🇸', currency: 'Icelandic Króna (kr)', language: 'Icelandic',
            landform: 'Geysers & Blue Lagoon Volcanic Fields', export: 'Geothermal Energy & Fish', food: 'Skyr Yogurt & Lamb Soup', greeting: 'Halló',
            clues: {
                bank: "They asked for Icelandic Krónur (kr) depicting codfish.",
                library: "They researched eruption cycles of active volcanic geysers.",
                airport: "They boarded a flight heading towards the Arctic Circle under an ice blue cross flag.",
                chef: "They ate creamy Skyr yogurt and greeted the staff with 'Halló'!"
            }
        },
        {
            id: 'vienna', name: 'Vienna', country: 'Austria', continent: 'Europe',
            lat: 48.2082, lng: 16.3738, flag: '🇦🇹', currency: 'Euro (€)', language: 'German',
            landform: 'Danube River Basin', export: 'Classical Instruments & Pastries', food: 'Wiener Schnitzel & Sachertorte', greeting: 'Servus',
            clues: {
                bank: "The suspect asked for crisp Euro banknotes.",
                library: "They researched Mozart's classical compositions at the Hofburg Palace.",
                airport: "Their flight banner displayed a red-white-red horizontal stripe flag.",
                chef: "They enjoyed a slice of chocolate Sachertorte cake and said 'Servus'!"
            }
        },
        {
            id: 'prague', name: 'Prague', country: 'Czech Republic', continent: 'Europe',
            lat: 50.0755, lng: 14.4378, flag: '🇨🇿', currency: 'Czech Koruna (Kč)', language: 'Czech',
            landform: 'Vltava River & Charles Bridge', export: 'Crystal Glass & Beer', food: 'Goulash & Trdelník', greeting: 'Ahoj',
            clues: {
                bank: "The thief traded currency into Czech Korunas (Kč).",
                library: "They studied gothic towers along the stone Charles Bridge.",
                airport: "Their boarding pass featured a blue triangle over white and red stripes.",
                chef: "They ate cinnamon Trdelník pastry and waved saying 'Ahoj'!"
            }
        },
        {
            id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', continent: 'Europe',
            lat: 52.3676, lng: 4.9041, flag: '🇳🇱', currency: 'Euro (€)', language: 'Dutch',
            landform: 'Amstel River Canals & Polders', export: 'Tulips & Cheese', food: 'Stroopwafel & Herring', greeting: 'Hallo',
            clues: {
                bank: "They withdrew Euros at a canal-side banking kiosk.",
                library: "They researched historic wooden windmills and tulip cultivation.",
                airport: "Their flight had a red, white, and blue horizontal stripe tail logo.",
                chef: "They ate warm caramel Stroopwafels and said 'Hallo'!"
            }
        },
        {
            id: 'dublin', name: 'Dublin', country: 'Ireland', continent: 'Europe',
            lat: 53.3498, lng: -6.2603, flag: '🇮🇪', currency: 'Euro (€)', language: 'Irish / English',
            landform: 'Liffey River & Emerald Hills', export: 'Software & Dairy', food: 'Irish Stew & Soda Bread', greeting: 'Fáilte',
            clues: {
                bank: "The suspect exchanged cash for Euro (€) notes carrying Celtic harp symbols.",
                library: "They studied the illuminated Book of Kells manuscript at Trinity College.",
                airport: "Their airplane displayed a green, white, and orange tricolor flag.",
                chef: "They ate warm Irish beef stew with soda bread and shouted 'Fáilte'!"
            }
        },

        // --- ASIA (12 Cities) ---
        {
            id: 'tokyo', name: 'Tokyo', country: 'Japan', continent: 'Asia',
            lat: 35.6762, lng: 139.6503, flag: '🇯🇵', currency: 'Yen (¥)', language: 'Japanese',
            landform: 'Mount Fuji & Pacific Coast', export: 'Robotics & Bullet Trains', food: 'Shoyu Ramen & Sushi', greeting: 'Konnichiwa',
            clues: {
                bank: "The thief requested Japanese Yen (¥) coins stamped with cherry blossoms.",
                library: "They read about the snow-capped peak of Mount Fuji and Shinto wooden Torii gates.",
                airport: "They boarded a long-haul jet displaying a red sun emblem on its wings.",
                chef: "They ate warm Shoyu Ramen with chopsticks and bowed saying 'Konnichiwa'!"
            }
        },
        {
            id: 'agra', name: 'Agra', country: 'India', continent: 'Asia',
            lat: 27.1767, lng: 78.0081, flag: '🇮🇳', currency: 'Indian Rupee (₹)', language: 'Hindi',
            landform: 'Yamuna River & Gangetic Plain', export: 'Spices & Marble Inlay', food: 'Butter Chicken & Naan', greeting: 'Namaste',
            clues: {
                bank: "The thief exchanged cash into Indian Rupees (₹) depicting Mahatma Gandhi.",
                library: "They took notes on white marble Mughal architecture built along the Yamuna River bank.",
                airport: "Their flight ticket showed an airline emblem featuring an orange, white, and green tricolor wheel.",
                chef: "They ate garlic Naan bread with butter chicken and greeted us with 'Namaste'!"
            }
        },
        {
            id: 'beijing', name: 'Beijing', country: 'China', continent: 'Asia',
            lat: 39.9042, lng: 116.4074, flag: '🇨🇳', currency: 'Renminbi Yuan (¥)', language: 'Mandarin',
            landform: 'Yanshan Mountains & Forbidden City', export: 'Silk & Tea', food: 'Peking Duck & Dumplings', greeting: 'Nǐ Hǎo',
            clues: {
                bank: "They requested Chinese Yuan (¥) notes depicting Mount Guilin.",
                library: "They studied stone ramparts stretching thousands of miles along the Great Wall.",
                airport: "They booked a flight east across Asia towards the Forbidden City.",
                chef: "They ate steamed pork dumplings with tea and said 'Nǐ Hǎo'!"
            }
        },
        {
            id: 'bangkok', name: 'Bangkok', country: 'Thailand', continent: 'Asia',
            lat: 13.7563, lng: 100.5018, flag: '🇹🇭', currency: 'Thai Baht (฿)', language: 'Thai',
            landform: 'Chao Phraya River Delta', export: 'Jasmine Rice & Silk', food: 'Pad Thai & Mango Sticky Rice', greeting: 'Sawatdee',
            clues: {
                bank: "The suspect requested Thai Baht (฿) notes.",
                library: "They researched golden spire stupas at the Grand Palace along the Chao Phraya River.",
                airport: "They boarded a plane featuring red, white, and blue horizontal tail stripes.",
                chef: "They ate spicy Pad Thai noodles and bowed with a 'Sawatdee'!"
            }
        },
        {
            id: 'istanbul', name: 'Istanbul', country: 'Turkey', continent: 'Asia / Europe',
            lat: 41.0082, lng: 28.9784, flag: '🇹🇷', currency: 'Turkish Lira (₺)', language: 'Turkish',
            landform: 'Bosphorus Strait', export: 'Carpets & Spices', food: 'Baklava & Kebab', greeting: 'Merhaba',
            clues: {
                bank: "They traded for Turkish Lira (₺) banknotes.",
                library: "They studied the grand dome and minarets of Hagia Sophia along the Bosphorus Strait.",
                airport: "Their flight ticket showed a red flag carrying a white crescent star.",
                chef: "They ate sweet honey Baklava pastry and said 'Merhaba'!"
            }
        },
        {
            id: 'seoul', name: 'Seoul', country: 'South Korea', continent: 'Asia',
            lat: 37.5665, lng: 126.9780, flag: '🇰🇷', currency: 'South Korean Won (₩)', language: 'Korean',
            landform: 'Han River & Namsan Mountain', export: 'Semiconductors & Automobiles', food: 'Kimchi & Samgyeopsal', greeting: 'Annyeonghaseyo',
            clues: {
                bank: "They exchanged cash for South Korean Won (₩) currency.",
                library: "They researched royal Joseon dynasty wooden architecture at Gyeongbokgung Palace.",
                airport: "They boarded a jet featuring a blue and red Yin-Yang circle flag emblem.",
                chef: "They ate spicy Kimchi stew and bowed saying 'Annyeonghaseyo'!"
            }
        },
        {
            id: 'kathmandu', name: 'Kathmandu', country: 'Nepal', continent: 'Asia',
            lat: 27.7172, lng: 85.3240, flag: '🇳🇵', currency: 'Nepalese Rupee (NPR)', language: 'Nepali',
            landform: 'Himalayan Range & Mount Everest', export: 'Pashmina Shawls & Tea', food: 'Momo Dumplings & Dal Bhat', greeting: 'Namaste',
            clues: {
                bank: "The suspect withdrew Nepalese Rupees depicting Himalayan mountain peaks.",
                library: "They studied high-altitude climbing routes up Mount Everest in the Himalayas.",
                airport: "Their boarding pass featured a unique non-quadrilateral double-triangle flag logo.",
                chef: "They ate steamed vegetable Momo dumplings saying 'Namaste'!"
            }
        },
        {
            id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', continent: 'Asia',
            lat: 25.2048, lng: 55.2708, flag: '🇦🇪', currency: 'UAE Dirham (AED)', language: 'Arabic',
            landform: 'Arabian Gulf Coast & Desert Dunes', export: 'Petroleum & Gold', food: 'Shawarma & Stuffed Dates', greeting: 'Marhaba',
            clues: {
                bank: "The thief asked for crisp UAE Dirhams (AED).",
                library: "They were researching the world's tallest skyscraper, the Burj Khalifa.",
                airport: "They checked in for an airliner displaying red, green, white, and black tail colors.",
                chef: "They ate spiced chicken Shawarma wraps and said 'Marhaba'!"
            }
        },
        {
            id: 'singapore', name: 'Singapore', country: 'Singapore', continent: 'Asia',
            lat: 1.3521, lng: 103.8198, flag: '🇸🇬', currency: 'Singapore Dollar (S$)', language: 'English / Malay / Mandarin',
            landform: 'Marina Bay & Straits of Singapore', export: 'Electronics & Shipping', food: 'Hainanese Chicken Rice', greeting: 'Hello',
            clues: {
                bank: "They requested Singapore Dollars (S$) featuring the Merlion statue.",
                library: "They researched supertree botanical structures at Gardens by the Bay.",
                airport: "Their flight ticket showed a red and white flag carrying a crescent moon and 5 stars.",
                chef: "They ate savory Hainanese Chicken Rice and waved saying 'Hello'!"
            }
        },
        {
            id: 'hanoi', name: 'Hanoi', country: 'Vietnam', continent: 'Asia',
            lat: 21.0285, lng: 105.8542, flag: '🇻🇳', currency: 'Vietnamese Dong (₫)', language: 'Vietnamese',
            landform: 'Red River Delta & Ha Long Bay', export: 'Coffee & Textiles', food: 'Pho Beef Noodles & Banh Mi', greeting: 'Xin Chào',
            clues: {
                bank: "The thief exchanged cash for polymer Vietnamese Dong (₫).",
                library: "They studied emerald waters and limestone pillars in Ha Long Bay.",
                airport: "Their aircraft displayed a bright red flag carrying a large golden star.",
                chef: "They ate steaming hot beef Pho noodle soup and said 'Xin Chào'!"
            }
        },
        {
            id: 'manila', name: 'Manila', country: 'Philippines', continent: 'Asia',
            lat: 14.5995, lng: 120.9842, flag: '🇵🇭', currency: 'Philippine Peso (₱)', language: 'Filipino / English',
            landform: 'Manila Bay & Luzon Volcanic Arc', export: 'Semiconductors & Coconut', food: 'Adobo & Halo-Halo', greeting: 'Kamusta',
            clues: {
                bank: "They converted cash into Philippine Pesos (₱).",
                library: "They studied Spanish stone fortress walls at Intramuros in Manila.",
                airport: "Their flight banner featured a blue and red flag with an 8-rayed sun.",
                chef: "They enjoyed savory pork Adobo over rice and greeted the chef with 'Kamusta'!"
            }
        },
        {
            id: 'taipei', name: 'Taipei', country: 'Taiwan', continent: 'Asia',
            lat: 25.0330, lng: 121.5654, flag: '🇹🇼', currency: 'New Taiwan Dollar (NT$)', language: 'Mandarin',
            landform: 'Taroko Gorge & Taipei Basin', export: 'Microchips & Laptops', food: 'Boba Milk Tea & Beef Noodle Soup', greeting: 'Nǐ Hǎo',
            clues: {
                bank: "The suspect requested New Taiwan Dollars (NT$).",
                library: "They studied earthquake dampening tuned mass dampers inside the Taipei 101 tower.",
                airport: "Their plane displayed a blue canton flag emblem containing a white sun.",
                chef: "They drank sweet tapioca Boba Milk Tea and said 'Nǐ Hǎo'!"
            }
        },

        // --- AFRICA (8 Cities) ---
        {
            id: 'cairo', name: 'Cairo', country: 'Egypt', continent: 'Africa',
            lat: 30.0444, lng: 31.2357, flag: '🇪🇬', currency: 'Egyptian Pound (E£)', language: 'Arabic',
            landform: 'Nile River Delta & Great Pyramids', export: 'Egyptian Cotton & Papyrus', food: 'Koshary & Falafel', greeting: 'Ahlan wa Sahlan',
            clues: {
                bank: "The suspect converted their funds into crisp Egyptian Pounds (E£).",
                library: "They were studying ancient hieroglyphic papyrus scrolls and the Giza Sphinx.",
                airport: "Their boarding pass was stamped for the Nile River Delta in North Africa.",
                chef: "They enjoyed a spicy bowl of Koshary and said 'Ahlan wa Sahlan' to the cook!"
            }
        },
        {
            id: 'nairobi', name: 'Nairobi', country: 'Kenya', continent: 'Africa',
            lat: -1.2921, lng: 36.8219, flag: '🇰🇪', currency: 'Kenyan Shilling (KSh)', language: 'Swahili / English',
            landform: 'Great Rift Valley & Savanna', export: 'Black Tea & Coffee Beans', food: 'Ugali & Sukuma Wiki', greeting: 'Jambo',
            clues: {
                bank: "The suspect traded for Kenyan Shillings (KSh).",
                library: "They were reading about the annual Great Wildebeest Migration across the Serengeti.",
                airport: "They departed for East Africa near the Great Rift Valley.",
                chef: "They sampled warm Ugali cornmeal porridge and said 'Jambo'!"
            }
        },
        {
            id: 'port_louis', name: 'Port Louis', country: 'Mauritius', continent: 'Africa',
            lat: -20.1609, lng: 57.5012, flag: '🇲🇺', currency: 'Mauritian Rupee (Rs)', language: 'English / French / Creole',
            landform: 'Indian Ocean Coral Reefs', export: 'Sugar Cane & Textiles', food: 'Dholl Puri & Curry', greeting: 'Bonjur',
            clues: {
                bank: "They exchanged currency into Mauritian Rupees (Rs).",
                library: "They researched extinct Dodo bird fossils discovered in the Indian Ocean lagoon.",
                airport: "Their aircraft displayed red, blue, yellow, and green horizontal stripes.",
                chef: "They ate savory warm Dholl Puri flatbread with bean curry!"
            }
        },
        {
            id: 'cape_town', name: 'Cape Town', country: 'South Africa', continent: 'Africa',
            lat: -33.9249, lng: 18.4241, flag: '🇿🇦', currency: 'South African Rand (R)', language: 'Zulu / Xhosa / Afrikaans / English',
            landform: 'Table Mountain & Cape of Good Hope', export: 'Diamonds & Gold', food: 'Bobotie & Biltong', greeting: 'Sawubona',
            clues: {
                bank: "The thief requested South African Rands (R) depicting wildlife.",
                library: "They studied flat-topped sandstone cliffs at Table Mountain where two oceans meet.",
                airport: "Their flight ticket showed a colorful 6-color 'Rainbow Nation' flag emblem.",
                chef: "They ate spiced Bobotie minced meat bake and said 'Sawubona'!"
            }
        },
        {
            id: 'marrakech', name: 'Marrakech', country: 'Morocco', continent: 'Africa',
            lat: 31.6295, lng: -7.9811, flag: '🇲🇦', currency: 'Moroccan Dirham (MAD)', language: 'Arabic / Berber',
            landform: 'Atlas Mountains & Sahara Oasis', export: 'Argan Oil & Leather', food: 'Couscous & Lamb Tagine', greeting: 'Salam Alaikum',
            clues: {
                bank: "They exchanged cash into Moroccan Dirhams (MAD).",
                library: "They researched ancient mudbrick kasbahs in the shadow of the snow-capped Atlas Mountains.",
                airport: "Their flight featured a red flag displaying a green 5-pointed star emblem.",
                chef: "They ate slow-cooked lamb Tagine from a clay pot and said 'Salam Alaikum'!"
            }
        },
        {
            id: 'antananarivo', name: 'Antananarivo', country: 'Madagascar', continent: 'Africa',
            lat: -18.8792, lng: 47.5079, flag: '🇲🇬', currency: 'Malagasy Ariary (Ar)', language: 'Malagasy / French',
            landform: 'Baobab Avenue & Rainforest High Plateau', export: 'Vanilla Pods & Cloves', food: 'Ramazava Beef Stew', greeting: 'Salama',
            clues: {
                bank: "They asked for Malagasy Ariary (Ar) banknotes.",
                library: "They researched ring-tailed lemurs and giant ancient Baobab trees.",
                airport: "Their airplane bore a white, red, and green flag logo.",
                chef: "They ate savory Ramazava beef stew with greens and said 'Salama'!"
            }
        },
        {
            id: 'dakar', name: 'Dakar', country: 'Senegal', continent: 'Africa',
            lat: 14.7167, lng: -17.4677, flag: '🇸🇳', currency: 'West African CFA Franc (CFA)', language: 'French / Wolof',
            landform: 'Cap-Vert Peninsula & Atlantic Coast', export: 'Peanuts & Fish', food: 'Thieboudienne Fish Rice', greeting: 'Nanga Def',
            clues: {
                bank: "The suspect requested West African CFA Francs.",
                library: "They studied historic pink waters at Lake Retba on the Cap-Vert peninsula.",
                airport: "Their flight logo showed a green, yellow, and red tricolor with a green star.",
                chef: "They ate seasoned Thieboudienne fish and rice saying 'Nanga Def'!"
            }
        },
        {
            id: 'tunis', name: 'Tunis', country: 'Tunisia', continent: 'Africa',
            lat: 36.8065, lng: 10.1815, flag: '🇹🇳', currency: 'Tunisian Dinar (DT)', language: 'Arabic / French',
            landform: 'Gulf of Tunis & Carthage Ruins', export: 'Olive Oil & Dates', food: 'Couscous with Fish & Ojja', greeting: 'Aslaama',
            clues: {
                bank: "They converted currency into Tunisian Dinars (DT).",
                library: "They researched ancient Punic stone ruins at Roman Carthage.",
                airport: "Their flight ticket bore a red flag carrying a white circle crescent star.",
                chef: "They ate spicy Ojja egg and sausage stew saying 'Aslaama'!"
            }
        },

        // --- AMERICAS (12 Cities) ---
        {
            id: 'new_york', name: 'New York', country: 'United States', continent: 'North America',
            lat: 40.7128, lng: -74.0060, flag: '🇺🇸', currency: 'US Dollar ($)', language: 'English',
            landform: 'Hudson River & Atlantic Harbor', export: 'Software & Financial Trading', food: 'New York Pizza Slice & Bagel', greeting: 'Hey there',
            clues: {
                bank: "The suspect pulled out crisp US Dollar ($) bills.",
                library: "They studied copper oxidation on the Statue of Liberty torch in New York Harbor.",
                airport: "They boarded a flight bound for the East Coast of North America.",
                chef: "They ate a giant folded pepperoni pizza slice on the run."
            }
        },
        {
            id: 'mexico_city', name: 'Mexico City', country: 'Mexico', continent: 'North America',
            lat: 19.4326, lng: -99.1332, flag: '🇲🇽', currency: 'Mexican Peso ($)', language: 'Spanish',
            landform: 'Valley of Mexico & Popocatépetl Volcano', export: 'Avocados & Silver', food: 'Tacos al Pastor & Tamales', greeting: 'Hola',
            clues: {
                bank: "The thief exchanged cash into Mexican Pesos ($).",
                library: "They researched ancient Aztec stone pyramids at Teotihuacan.",
                airport: "Their flight banner featured a green, white, and red flag with an eagle devouring a snake.",
                chef: "They ate pork Tacos al Pastor with fresh salsa and shouted 'Hola'!"
            }
        },
        {
            id: 'toronto', name: 'Toronto', country: 'Canada', continent: 'North America',
            lat: 43.6532, lng: -79.3832, flag: '🇨🇦', currency: 'Canadian Dollar (C$)', language: 'English / French',
            landform: 'Lake Ontario & CN Tower', export: 'Maple Syrup & Timber', food: 'Poutine & Butter Tarts', greeting: 'Eh',
            clues: {
                bank: "They asked for red and green Canadian polymer Dollars (C$).",
                library: "They researched high-altitude observation decks at the CN Tower on Lake Ontario.",
                airport: "They boarded an airliner displaying a red maple leaf on its tail.",
                chef: "They ate crisp French fries topped with cheese curds and gravy Poutine!"
            }
        },
        {
            id: 'havana', name: 'Havana', country: 'Cuba', continent: 'North America',
            lat: 23.1136, lng: -82.3666, flag: '🇨🇺', currency: 'Cuban Peso (CUP)', language: 'Spanish',
            landform: 'Caribbean Sea & Malecón Bay', export: 'Cigars & Sugar', food: 'Ropa Vieja & Plantains', greeting: 'Qué bolá',
            clues: {
                bank: "The thief converted funds into Cuban Pesos (CUP).",
                library: "They studied classic 1950s vintage American cars along the Malecón sea wall.",
                airport: "Their boarding pass displayed red and white stripes with a single white star triangle.",
                chef: "They ate shredded beef Ropa Vieja with fried sweet plantains!"
            }
        },
        {
            id: 'rio', name: 'Rio de Janeiro', country: 'Brazil', continent: 'South America',
            lat: -22.9068, lng: -43.1729, flag: '🇧🇷', currency: 'Brazilian Real (R$)', language: 'Portuguese',
            landform: 'Sugarloaf Mountain & Copacabana', export: 'Coffee Beans & Acai', food: 'Feijoada & Acai Bowls', greeting: 'Olá',
            clues: {
                bank: "The suspect withdrew green Brazilian Reais (R$) from the counter.",
                library: "They were reading about Christ the Redeemer atop Mount Corcovado overlooking Guanabara Bay.",
                airport: "They boarded a flight displaying a green-and-yellow diamond tail emblem.",
                chef: "They sampled black bean Feijoada stew and waved saying 'Olá'!"
            }
        },
        {
            id: 'cusco', name: 'Cusco', country: 'Peru', continent: 'South America',
            lat: -13.5320, lng: -71.9675, flag: '🇵🇪', currency: 'Peruvian Sol (S/)', language: 'Spanish / Quechua',
            landform: 'Andes Mountains & Sacred Valley', export: 'Alpaca Wool & Copper', food: 'Ceviche & Quinoa Soup', greeting: 'Allianllachu',
            clues: {
                bank: "The thief requested Peruvian Soles (S/) currency notes.",
                library: "They looked up high-altitude Inca stone ruins at Machu Picchu in the cloud forest.",
                airport: "They flew into the high elevation peaks of the Andes range.",
                chef: "They sampled citrus-marinated raw fish ceviche."
            }
        },
        {
            id: 'buenos_aires', name: 'Buenos Aires', country: 'Argentina', continent: 'South America',
            lat: -34.6037, lng: -58.3816, flag: '🇦🇷', currency: 'Argentine Peso ($)', language: 'Spanish',
            landform: 'Río de la Plata Basin & Pampas Grasslands', export: 'Beef & Leather', food: 'Asado BBQ & Empanadas', greeting: 'Che',
            clues: {
                bank: "The suspect traded for Argentine Pesos ($).",
                library: "They studied classic Tango dance origins in the colorful La Boca neighborhood.",
                airport: "Their aircraft displayed a light blue and white flag featuring a golden Sun of May.",
                chef: "They ate grilled Asado steak with chimichurri sauce and said 'Che'!"
            }
        },
        {
            id: 'quito', name: 'Quito', country: 'Ecuador', continent: 'South America',
            lat: -0.1807, lng: -78.4678, flag: '🇪🇨', currency: 'US Dollar ($)', language: 'Spanish / Kichwa',
            landform: 'Equator Line & Pichincha Volcano', export: 'Bananas & Roses', food: 'Locro de Papa & Encocado', greeting: 'Buenas',
            clues: {
                bank: "They withdrew US Dollars stamped for local circulation in South America.",
                library: "They studied the exact Middle of the World zero-latitude Equator monument.",
                airport: "Their flight banner featured yellow, blue, and red horizontal stripes with a condor crest.",
                chef: "They ate warm potato and cheese soup Locro de Papa saying 'Buenas'!"
            }
        },
        {
            id: 'vancouver', name: 'Vancouver', country: 'Canada', continent: 'North America',
            lat: 49.2827, lng: -123.1207, flag: '🇨🇦', currency: 'Canadian Dollar (C$)', language: 'English',
            landform: 'Pacific Coast & Coast Mountains', export: 'Lumber & Salmon', food: 'Pacific Salmon & Bannock', greeting: 'Welcome',
            clues: {
                bank: "The suspect requested Canadian polymer Dollar bills.",
                library: "They studied coastal First Nations totem poles at Stanley Park along the Pacific shore.",
                airport: "Their flight ticket showed a red maple leaf emblem.",
                chef: "They ate fresh grilled Pacific salmon and said 'Welcome'!"
            }
        },
        {
            id: 'chicago', name: 'Chicago', country: 'United States', continent: 'North America',
            lat: 41.8781, lng: -87.6298, flag: '🇺🇸', currency: 'US Dollar ($)', language: 'English',
            landform: 'Lake Michigan & Windy City Basin', export: 'Steel & Architectural Engineering', food: 'Deep Dish Pizza & Hot Dog', greeting: 'Howdy',
            clues: {
                bank: "They withdrew US Dollar bills from a downtown loop bank.",
                library: "They researched early skyscraper architecture and the Cloud Gate 'Bean' sculpture.",
                airport: "They boarded a flight departing Lake Michigan towards the Midwest plains.",
                chef: "They ate a 2-inch thick Chicago deep dish cheese pizza slice!"
            }
        },
        {
            id: 'santiago', name: 'Santiago', country: 'Chile', continent: 'South America',
            lat: -33.4489, lng: -70.6693, flag: '🇨🇱', currency: 'Chilean Peso ($)', language: 'Spanish',
            landform: 'Andes Cordillera & Atacama Desert Border', export: 'Copper & Wine', food: 'Empanada de Pino & Pastel de Choclo', greeting: 'Hola',
            clues: {
                bank: "The thief requested Chilean Pesos ($).",
                library: "They studied high-altitude telescope observatories in the dry Atacama Desert.",
                airport: "Their flight carried a blue square flag with a white star and red bar.",
                chef: "They ate a baked beef and onion Empanada de Pino saying 'Hola'!"
            }
        },
        {
            id: 'bogota', name: 'Bogota', country: 'Colombia', continent: 'South America',
            lat: 4.7110, lng: -74.0721, flag: '🇨🇴', currency: 'Colombian Peso ($)', language: 'Spanish',
            landform: 'Andean High Plateau & Monserrate Peak', export: 'Coffee Beans & Emeralds', food: 'Ajiaco Chicken Soup & Arepas', greeting: 'Buenas',
            clues: {
                bank: "They exchanged currency into Colombian Pesos ($).",
                library: "They studied ancient golden artifacts at the Gold Museum (Museo del Oro).",
                airport: "Their plane displayed yellow, blue, and red horizontal tail stripes.",
                chef: "They ate hot corn cake Arepas topped with butter and cheese!"
            }
        },

        // --- OCEANIA & PACIFIC (6 Cities) ---
        {
            id: 'sydney', name: 'Sydney', country: 'Australia', continent: 'Oceania',
            lat: -33.8688, lng: 151.2093, flag: '🇦🇺', currency: 'Australian Dollar (A$)', language: 'English',
            landform: 'Sydney Harbour & Blue Mountains', export: 'Opal Gemstones & Wool', food: 'Vegemite Toast & Meat Pie', greeting: 'G\'day',
            clues: {
                bank: "They asked for waterproof Australian polymer Dollar (A$) notes.",
                library: "They studied the sail-shaped roof shells of the Sydney Opera House along the Pacific harbor.",
                airport: "Their luggage tags indicated a flight towards the Southern Cross constellation and Great Barrier Reef.",
                chef: "They ate a hot savory meat pie and gave a cheerful 'G\'day'!"
            }
        },
        {
            id: 'auckland', name: 'Auckland', country: 'New Zealand', continent: 'Oceania',
            lat: -36.8485, lng: 174.7633, flag: '🇳🇿', currency: 'New Zealand Dollar (NZ$)', language: 'English / Māori',
            landform: 'Hauraki Gulf & Volcanic Cone Fields', export: 'Kiwi Fruit & Dairy', food: 'Pavlova & Hāngī', greeting: 'Kia Ora',
            clues: {
                bank: "The suspect requested New Zealand Dollars (NZ$) depicting Sir Edmund Hillary.",
                library: "They researched Maori geothermal legends and Sky Tower observation deck.",
                airport: "Their aircraft displayed a blue ensign carrying 4 red Southern Cross stars.",
                chef: "They enjoyed sweet Pavlova meringue with kiwi fruit and said 'Kia Ora'!"
            }
        },
        {
            id: 'suva', name: 'Suva', country: 'Fiji', continent: 'Oceania',
            lat: -18.1416, lng: 178.4419, flag: '🇫🇯', currency: 'Fijian Dollar (FJ$)', language: 'Fijian / English',
            landform: 'Viti Levu Island & Coral Lagoons', export: 'Sugar & Pure Water', food: 'Kokoda Fish Salad', greeting: 'Bula',
            clues: {
                bank: "They exchanged cash into Fijian Dollars (FJ$) depicting colorful reef fish.",
                library: "They studied Pacific island coral reef ecosystems in the South Pacific.",
                airport: "Their flight logo displayed a light blue flag with a Union Jack and Fijian shield.",
                chef: "They ate raw fish coconut salad Kokoda and shouted 'Bula'!"
            }
        },
        {
            id: 'honolulu', name: 'Honolulu', country: 'United States (Hawaii)', continent: 'Oceania',
            lat: 21.3069, lng: -157.8583, flag: '🌺', currency: 'US Dollar ($)', language: 'English / Hawaiian',
            landform: 'Diamond Head Crater & Waikiki Beach', export: 'Pineapples & Macadamia Nuts', food: 'Poke Bowl & Loco Moco', greeting: 'Aloha',
            clues: {
                bank: "The suspect requested US Dollars for spending in the Hawaiian islands.",
                library: "They studied volcanic basalt formations at Diamond Head crater.",
                airport: "Their plane was headed into the central North Pacific ocean.",
                chef: "They ate fresh tuna Poke with soy sauce and greeted us with 'Aloha'!"
            }
        },
        {
            id: 'tahiti', name: 'Papeete (Tahiti)', country: 'French Polynesia', continent: 'Oceania',
            lat: -17.5516, lng: -149.5584, flag: '🇵🇫', currency: 'CFP Franc (XPF)', language: 'Tahitian / French',
            landform: 'Bora Bora Coral Atolls & Volcanic Peaks', export: 'Black Cultured Pearls & Vanilla', food: 'Poisson Cru (Coconut Raw Fish)', greeting: 'Ia Orana',
            clues: {
                bank: "The thief requested Pacific CFP Francs (XPF).",
                library: "They researched black cultured pearls harvested in tropical atoll lagoons.",
                airport: "Their plane displayed a red and white flag depicting a double-outrigger canoe.",
                chef: "They ate fresh lime coconut Poisson Cru and said 'Ia Orana'!"
            }
        },
        {
            id: 'perth', name: 'Perth', country: 'Australia', continent: 'Oceania',
            lat: -31.9505, lng: 115.8605, flag: '🇦🇺', currency: 'Australian Dollar (A$)', language: 'English',
            landform: 'Swan River & Indian Ocean Coast', export: 'Iron Ore & Gold', food: 'Lamington Cake & Barramundi', greeting: 'G\'day mate',
            clues: {
                bank: "They converted cash into Australian polymer Dollars (A$).",
                library: "They studied ancient weathered limestone pillars at the Pinnacles Desert.",
                airport: "Their flight ticket showed an Australian flag heading towards the Indian Ocean coast.",
                chef: "They ate chocolate coconut Lamington sponge cake saying 'G\'day mate'!"
            }
        }
    ],

    // -------------------------------------------------------------------------
    // 2. OVERLAPPING SUSPECT MATRIX (24 Criminals - Requires 3+ Clues for Warrant)
    // -------------------------------------------------------------------------
    suspects: [
        // RED HAIR GROUP (4)
        { id: 'carmen_shadow', name: 'Carmen Shadow', gender: 'Female', hair: 'Red', vehicle: 'Convertible', food: 'Croissants', hobby: 'Fencing', feature: 'Crimson fedora hat', eyewear: 'Sunglasses', bio: 'Mastermind of the VILE shadow network.' },
        { id: 'ruby_rodericks', name: 'Ruby Rodericks', gender: 'Female', hair: 'Red', vehicle: 'Jetpack', food: 'Ramen', hobby: 'Astronomy', feature: 'Ruby necklace', eyewear: 'Goggles', bio: 'High-tech sky burglar.' },
        { id: 'scarlet_sam', name: 'Scarlet Sam', gender: 'Male', hair: 'Red', vehicle: 'Helicopter', food: 'Pizza', hobby: 'Chess', feature: 'Red leather gloves', eyewear: 'Monocle', bio: 'Tactical aviator who loves chess openings.' },
        { id: 'rust_renegade', name: 'Rust Renegade', gender: 'Male', hair: 'Red', vehicle: 'Speedboat', food: 'Sushi', hobby: 'Scuba Diving', feature: 'Rusted compass tattoo', eyewear: 'None', bio: 'Deep water salvage expert.' },

        // BLONDE HAIR GROUP (5)
        { id: 'lady_emerald', name: 'Lady Emerald', gender: 'Female', hair: 'Blonde', vehicle: 'Speedboat', food: 'Sushi', hobby: 'Scuba Diving', feature: 'Emerald ring', eyewear: 'Sunglasses', bio: 'Specialist in maritime jewel heists.' },
        { id: 'blonde_baron', name: 'Baron Von Blonde', gender: 'Male', hair: 'Blonde', vehicle: 'Convertible', food: 'Croissants', hobby: 'Fencing', feature: 'Gold signet ring', eyewear: 'Monocle', bio: 'Aristocratic car thief.' },
        { id: 'blitz_blake', name: 'Blitz Blake', gender: 'Male', hair: 'Blonde', vehicle: 'Jetpack', food: 'Pizza', hobby: 'Rock Climbing', feature: 'Lightning pin', eyewear: 'Goggles', bio: 'Agile cliff climber.' },
        { id: 'amber_aurora', name: 'Amber Aurora', gender: 'Female', hair: 'Blonde', vehicle: 'Helicopter', food: 'Koshary', hobby: 'Chess', feature: 'Amber pendant', eyewear: 'None', bio: 'Desert chopper pilot.' },
        { id: 'golden_gideon', name: 'Golden Gideon', gender: 'Male', hair: 'Blonde', vehicle: 'Submarine', food: 'Ramen', hobby: 'Sailing', feature: 'Gold pocket watch', eyewear: 'Monocle', bio: 'Nautical collector.' },

        // BLACK HAIR GROUP (5)
        { id: 'baron_vulture', name: 'Baron Von Vulture', gender: 'Male', hair: 'Black', vehicle: 'Helicopter', food: 'Pizza', hobby: 'Chess', feature: 'Monocle and coat', eyewear: 'Monocle', bio: 'Strategic mastermind.' },
        { id: 'scarlet_viper', name: 'Scarlet Viper', gender: 'Female', hair: 'Black', vehicle: 'Motorcycle', food: 'Koshary', hobby: 'Rock Climbing', feature: 'Snake tattoo', eyewear: 'Sunglasses', bio: 'Skyscraper climber.' },
        { id: 'black_blade', name: 'Black Blade', gender: 'Male', hair: 'Black', vehicle: 'Convertible', food: 'Sushi', hobby: 'Fencing', feature: 'Obsidian ring', eyewear: 'None', bio: 'Duelist burglar.' },
        { id: 'shadow_selena', name: 'Shadow Selena', gender: 'Female', hair: 'Black', vehicle: 'Jetpack', food: 'Ramen', hobby: 'Astronomy', feature: 'Moonstone brooch', eyewear: 'Goggles', bio: 'Stargazing cat burglar.' },
        { id: 'midnight_max', name: 'Midnight Max', gender: 'Male', hair: 'Black', vehicle: 'Speedboat', food: 'Croissants', hobby: 'Sailing', feature: 'Black captain cap', eyewear: 'Sunglasses', bio: 'Harbor speed runner.' },

        // SILVER / GREY HAIR GROUP (5)
        { id: 'dr_quantum', name: 'Dr. Quantum', gender: 'Male', hair: 'Silver', vehicle: 'Jetpack', food: 'Ramen', hobby: 'Astronomy', feature: 'Glowing lab coat', eyewear: 'Goggles', bio: 'Rogue scientist.' },
        { id: 'silver_siren', name: 'Silver Siren', gender: 'Female', hair: 'Silver', vehicle: 'Speedboat', food: 'Sushi', hobby: 'Scuba Diving', feature: 'Silver tiara', eyewear: 'Sunglasses', bio: 'Ocean vault cracker.' },
        { id: 'grey_ghost', name: 'Grey Ghost', gender: 'Male', hair: 'Silver', vehicle: 'Convertible', food: 'Pizza', hobby: 'Chess', feature: 'Ghost mask', eyewear: 'Monocle', bio: 'Infiltrator.' },
        { id: 'sterling_steve', name: 'Sterling Steve', gender: 'Male', hair: 'Silver', vehicle: 'Helicopter', food: 'Croissants', hobby: 'Fencing', feature: 'Sterling watch', eyewear: 'None', bio: 'High-altitude thief.' },
        { id: 'platinum_paula', name: 'Platinum Paula', gender: 'Female', hair: 'Silver', vehicle: 'Motorcycle', food: 'Koshary', hobby: 'Rock Climbing', feature: 'Platinum chain', eyewear: 'Goggles', bio: 'Speedway racer.' },

        // BROWN HAIR GROUP (5)
        { id: 'captain_barnaby', name: 'Captain Barnaby', gender: 'Male', hair: 'Brown', vehicle: 'Submarine', food: 'Fish & Chips', hobby: 'Sailing', feature: 'Sailor cap', eyewear: 'None', bio: 'Ex-naval officer turned relic smuggler.' },
        { id: 'bronze_brunhilda', name: 'Bronze Brunhilda', gender: 'Female', hair: 'Brown', vehicle: 'Convertible', food: 'Croissants', hobby: 'Fencing', feature: 'Bronze shield pin', eyewear: 'Sunglasses', bio: 'Highway speedster and blade expert.' },
        { id: 'burl_benny', name: 'Burl Benny', gender: 'Male', hair: 'Brown', vehicle: 'Helicopter', food: 'Pizza', hobby: 'Chess', feature: 'Leather jacket', eyewear: 'Monocle', bio: 'Airborne chess grandmaster.' },
        { id: 'bella_bambina', name: 'Bella Bambina', gender: 'Female', hair: 'Brown', vehicle: 'Speedboat', food: 'Sushi', hobby: 'Scuba Diving', feature: 'Pearl necklace', eyewear: 'Sunglasses', bio: 'Coral reef vault raider.' },
        { id: 'brown_buster', name: 'Brown Buster', gender: 'Male', hair: 'Brown', vehicle: 'Jetpack', food: 'Ramen', hobby: 'Rock Climbing', feature: 'Climbing carabiner', eyewear: 'Goggles', bio: 'Mountain leap specialist.' },

        // WHITE HAIR GROUP — 3 new suspects (includes Non-binary)
        { id: 'frost_phoenix', name: 'Frost Phoenix', gender: 'Non-binary', hair: 'White', vehicle: 'Hovercraft', food: 'Dim Sum', hobby: 'Origami', feature: 'Frost-blue cape', eyewear: 'Sunglasses', bio: 'Arctic heist phantom with a taste for paper arts.' },
        { id: 'ivory_iris', name: 'Ivory Iris', gender: 'Female', hair: 'White', vehicle: 'Glider', food: 'Pho', hobby: 'Calligraphy', feature: 'Ivory brooch', eyewear: 'None', bio: 'Silent glider thief inspired by East Asian art.' },
        { id: 'blanche_cipher', name: 'Blanche Cipher', gender: 'Male', hair: 'White', vehicle: 'Submarine', food: 'Dim Sum', hobby: 'Cryptography', feature: 'Cipher tattoo on wrist', eyewear: 'Goggles', bio: 'Code-breaker who vanishes beneath the waves.' },

        // AUBURN HAIR GROUP — 3 new suspects (includes Non-binary)
        { id: 'vale_vortex', name: 'Vale Vortex', gender: 'Non-binary', hair: 'Auburn', vehicle: 'Glider', food: 'Pho', hobby: 'Parkour', feature: 'Iridescent scarf', eyewear: 'Goggles', bio: 'Free-runner who leaps rooftops across three continents.' },
        { id: 'copperton_claire', name: 'Copperton Claire', gender: 'Female', hair: 'Auburn', vehicle: 'Motorcycle', food: 'Tacos', hobby: 'Origami', feature: 'Copper ring', eyewear: 'Sunglasses', bio: 'Speedway origami artist, wanted on five continents.' },
        { id: 'rex_russet', name: 'Rex Russet', gender: 'Male', hair: 'Auburn', vehicle: 'Hovercraft', food: 'Tacos', hobby: 'Parkour', feature: 'Russet trench coat', eyewear: 'None', bio: 'Hovercraft chase specialist.' }
    ],

    // 25 Stolen Landmark Artifacts
    stolenArtifacts: [
        'The Eiffel Tower\'s Top Beacon Light',
        'The Great Pyramid\'s Golden Capstone',
        'The Crown Jewels of Great Britain',
        'Mount Fuji\'s Ancient Shogun Scroll',
        'The Statue of Liberty\'s Golden Torch',
        'Machu Picchu\'s Inca Solar Calendar Wheel',
        'The Colosseum\'s Emperor Marble Throne',
        'The Taj Mahal\'s Ruby Inlay Rose Window',
        'The Parthenon\'s Marble Frieze Carving',
        'The Sydney Opera House\'s Silver Microphone',
        'Christ the Redeemer\'s Golden Halo Crest',
        'The Great Wall\'s Signal Flare Beacon',
        'The Grand Palace\'s Emerald Buddha Statue',
        'The Hagia Sophia\'s Byzantine Mosaic Tile',
        'The Brandenburg Gate\'s Quadriga Chariot Reins',
        'The Table Mountain Golden Compass',
        'The Blue Lagoon Volcanic Crystal Sphere',
        'The Big Ben Clockwork Diamond Gear',
        'The Teotihuacan Obsidian Sun Mask',
        'The Merlion\'s Pearl Crown',
        'The Baobab Tree Golden Seedpod',
        'The Statue of King Kamehameha Feather Cloak',
        'The Charles Bridge Bronze Gargoyle',
        'The CN Tower\'s High Frequency Crystal',
        'The Sacred Valley Inca Sun Disk'
    ]
};
