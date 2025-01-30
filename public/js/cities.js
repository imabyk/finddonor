var state_arr = new Array("Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal");

var s_a = new Array();
s_a[0]="";
s_a[1]=" Nicobar | North and Middle Andaman | South Andaman ";
s_a[2]=" Anantapur | Chittoor | East Godavari | Guntur | Krishna | Kurnool | Prakasam | Srikakulam | Sri Potti Sriramulu Nellore | Visakhapatnam | Vizianagaram | West Godavari | YSR District, Kadapa (Cuddapah) ";
s_a[3]=" Anjaw | Changlang | Dibang Valley | East Kameng | East Siang | Kamle | Kra Daadi | Kurung Kumey | Lepa Rada | Lohit | Longding | Lower Dibang Valley | Lower Siang | Lower Subansiri | Namsai | Pakke Kessang | Papum Pare | Shi Yomi | Siang | Tawang | Tirap | Upper Siang | Upper Subansiri | West Kameng | West Siang ";
s_a[4]=" Baksa | Barpeta | Biswanath | Bongaigaon | Cachar | Charaideo | Chirang | Darrang | Dhemaji | Dhubri | Dibrugarh | Dima Hasao (North Cachar Hills) | Goalpara | Golaghat | Hailakandi | Hojai | Jorhat | Kamrup | Kamrup Metropolitan | Karbi Anglong | Karimganj | Kokrajhar | Lakhimpur | Majuli | Morigaon | Nagaon | Nalbari | Sivasagar | Sonitpur | South Salamara-Mankachar | Tinsukia | Udalgiri | West Karbi Anglong ";
s_a[5]=" Araria | Arwal | Aurangabad | Banka | Begusarai | Bhagalpur | Bhojpur | Buxar | Darbhanga | East Champaran (Motihari) | Gaya | Gopalganj | Jamui | Jehanabad | Kaimur (Bhabua) | Katihar | Khagaria | Kishanganj | Lakhisarai | Madhepura | Madhubani | Munger (Monghyr) | Muzaffarpur | Nalanda | Nawada | Patna | Purnia | Saharsa | Samastipur | Saran | Seikhpura | Sheohar | Sitamarhi | Siwan | Vaishali | West Champaran ";
s_a[6]=" Chandigarh ";
s_a[7]=" Balod | Balodabazar | Balrampur | Bastar | Bemetara | Bijapur | Bilaspur | Dantewada | Dhamtari | Durg | Gariyaband | Janjgir-Champa | Jashpur | Kabirdham-Kawardha | Kanker | Kondagaon | Korba | Korea | Mahasamund | Mungeli | Narayanpur | Raigarh | Raipur | Rajnandgaon | Sukma | Surajpur | Surguja";
s_a[8]=" Dadra & Nagar Haveli ";
s_a[9]=" Daman | Diu ";
s_a[10]=" Central Delhi | East Delhi | New Delhi | North Delhi | North East Delhi | North West Delhi | Shahdara | South Delhi | South East Delhi | South West Delhi | West Delhi ";
s_a[11]=" North Goa | South Goa ";
s_a[12]=" Ahmedabad | Amreli | Anand | Aravalli | Banaskantha | Bharuch | Bhavnagar | Botad | Chhota Udaipur | Dahod | Dangs(Ahwa) | Devbhoomi Dwarka | Gandhinagar | Gir Somnath | Jamnagar | Junagadh | Kachchh | Kheda | Mahisagar | Mehsana | Morbi | Narmada | Navasari | Panchmahal | Patan | Porbandar | Rajkot | Sabarkantha | Surat | Surendranagar | Tapi | Vadodara | Valsad ";
s_a[13]=" Ambala | Bhiwani | Charkhidadri | Faridabad | Fatehabad | Gurugram (Gurgaon) | Hisar | Jhajjar | Jind | Kaithal | Karnal | Kurukshetra | Mahendragarh | Nuh | Palwal | Panchkula | Panipat | Rewari | Rohtak | Sirsa | Sonipat | Yamunanagar ";
s_a[14]=" Bilaspur | Chamba | Hamirpur | Kangra | Kinnaur | Kullu | Lahaul & Spiti | Mandi | Shimla | Sirmaur | Solan | Una";
s_a[15]=" Anantnag | Bandipore | Baramulla | Budgam | Doda | Ganderbal | Jammu | Kargil | Kathua | Kishtwar | Kulgam | Kupwara | Leh | Poonch | Pulwama | Rajouri | Ramban | Reasi | Samba | Shopian | Srinagar | Udhampur ";
s_a[16]=" Bokaro | Chatra | Deoghar | Dhanbad | Dumka | East Singhbhum | Garhwa | Giridih | Godda | Gumla | Hazaribagh | Jamtara | Khunti | Koderma | Latehar | Lohardaga | Pakur | Palamu | Ramgarh | Ranchi | Sahibganj | Seraikela-Kharsawan | Simdega | West Singhbhum ";
s_a[17]=" Bagalkot | Ballari (Bellary) | Belagavi (Belgaum) | Bengaluru (Bangalore) Rural | Bengaluru (Bangalore) Urban | Chamrajnagar | Chikballapur | Chikkamagaluru (Chikmagalur) | Chitradurga | Dakshina Kannada | Davangere | Dharwad | Gadag | Hassan | Haveri | Kalaburagi (Gulbarga) | Kodagu | Kolar | Koppal | Mandya | Mysuru (Mysore) | Raichur | Ramanagara | Shivamogga(Shimoga) | Tumakuru (Tumkur) | Udupi | Uttara Kannada (Karwar) | Vijayapura (Bijapur) | Yadgir ";
s_a[18]=" Alappuzha | Ernakulam | Idukki | Kannur | Kasaragod | Kollam | Kottayam | Kozhikode | Malappuram | Palakkad | Pathanamthitta | Thiruvananthapuram | Thrissur | Wayanad ";
s_a[19]=" Lakshadweep ";
s_a[20]=" Agar Malwa | Alirajpur | Anuppur | Ashoknagar | Balaghat | Barwani | Betul | Bhind | Bhopal | Burhanpur | Chhatarpur | Chhindwara | Damoh | Datia | Dewas | Dhar | Dindori | Guna | Gwalior | Harda | Hoshangabad | Indore | Jabalpur | Jhabua | Katni | Khandwa | Khargone | Mandla | Mandsaur | Morena | Narsingarh | Neemuch | Panna | Raisen | Rajgarh | Ratlam | Rewa | Sagar | Satna | Sehore | Seoni | Shahdol | Shajapur | Sheopur | Shivpuri | Sidhi | Singrauli | Tikamgarh | Ujjain | Umaria | Vidisha ";
s_a[21]=" Ahmednagar | Akola | Amravati | Aurangabad | Beed | Bhandara | Buldhana | Chandrapur | Dhule | Gadchiroli | Gondia | Hingoli | Jalgaon | Jalna | Kolhapur | Latur  | Mumbai City | Mumbai Suburban | Nagpur | Nanded | Nandurbar | Nashik | Osmanabad | Palghar | Parbhani | Pune | Raigad | Ratnagiri | Sangli | Satara | Sindhudurg | Solapur | Thane | Wardha | Washim | Yavatmal ";
s_a[22]=" Bishnupur | ChakpikaroBishnupur | Chandel | Churachandpur | Imphal East | Imphal West | Jiribam | Kakching | Kamjong | Kangpokpi | Noney | Pherzawl | Senapati | Tamenglong | Tengnoupal | Thoubal | Ukhrul ";
s_a[23]=" East Garo Hills | East Jaintia Hills | East Khasi Hills | North Garo Hills | Ri Bhoi | South Garo Hills | South West Garo Hills | South West Khasi Hills | West Garo Hills | West Jaintia Hills | West Khasi Hills ";
s_a[24]=" Aizawl | Champhai | Kolasib | Lawngtlai | Lunglei | Mamit | Saiha | Serchhip ";
s_a[25]=" Dimapur | Kiphire | Kohima | Longleng | Mokokchung | Mon | Peren | Phek | Tuensang | Wokha | Zunheboto ";
s_a[26]=" Angul | Balangir | Balasore | Bargarh | Bhadrak | Boudh | Cuttack | Deogarh | Dhenkanal | Gajapati | Ganjam | Jagatsinghapur | Jajpur | Jharsuguda | Kalahandi | Kandhamal | Kendrapara | Kendujhar (Keonjhar) | Khordha | Koraput | Malkangiri | Mayurbhanj | Nabarangpur | Nayagarh | Nuapada | Puri | Rayagada | Sambalpur | Sonepur | Sundargarh ";
s_a[27]=" Karaikal | Mahe | Puducherry | Yanam ";
s_a[28]=" Amritsar | Barnala | Bathinda | Faridkot | Fatehgarh Sahib | Fazilka | Ferozepur | Gurdaspur | Hoshiarpur | Jalandhar | Kapurthala | Ludhiana | Mansa | Moga | Muktsar | Nawanshahr (Shahid Bhagat Singh Nagar) | Pathankot | Patiala | Rupnagar | Sahibzada Ajit Singh Nagar (Mohali) | Sangrur | Tarn Taran ";
s_a[29]=" Ajmer | Alwar | Banswara | Baran | Barmer | Bharatpur | Bhilwara | Bikaner | Bundi | Chittorgarh | Churu | Dausa | Dholpur | Dungarpur | Hanumangarh | Jaipur | Jaisalmer | Jalore | Jhalawar | Jhunjhunu | Jodhpur | Karauli | Kota | Nagaur | Pali | Pratapgarh | Rajsamand | Sawai Madhopur | Sikar | Sirohi | Sri Ganganagar | Tonk | Udaipur ";
s_a[30]=" East Sikkim | North Sikkim | South Sikkim | West Sikkim ";
s_a[31]=" Ariyalur | Chengalpattu | Chennai | Coimbatore | Cuddalore | Dharmapuri | Dindigul | Erode | Kallakurichi | Kanchipuram | Kanyakumari | Karur | Krishnagiri | Madurai | Nagapattinam | Namakkal | Nilgiris | Perambalur | Pudukkottai | Ramanathapuram | Ranipet | Salem | Sivaganga | Tenkasi | Thanjavur | Theni | Thoothukudi (Tuticorin) | Tiruchirappalli | Tirupathur | Tiruppur | Tiruvallur | Tiruvannamalai | Tiruvarur | Vellore | Viluppuram | Virudhunagar ";
s_a[32]=" Adilabad | Bhadradri Kothagudem | Hyderabad | Jagtial | Jangaon | Jayashankar Bhoopalpally | Jogulamba Gadwal | Kamareddy | Karimnagar | Khammam | Komaram Bheem Asifabad | Mahabubabad | Mahabubnagar | Mancherial | Medak | Medchal | Nagarkurnool | Nalgonda | Nirmal | Nizamabad | Peddapalli | Rajanna Sircilla | Rangareddy | Sangareddy | Siddipet | Suryapet | Vikarabad | Wanaparthy | Warangal (Rural) | Warangal (Urban) | Yadadri Bhuvanagiri";
s_a[33]=" Dhalai | Gomati | Khowai | North Tripura | Sepahijala | South Tripura | Unakoti | West Tripura";
s_a[34]=" Almora | Bageshwar | Chamoli | Champawat | Dehradun | Haridwar | Nainital | Pauri Garhwal | Pithoragarh | Rudraprayag | Tehri Garhwal | Udham Singh Nagar | Uttarkashi ";
s_a[35]=" Agra | Aligarh | Allahabad | Ambedkar Nagar | Amethi (Chatrapati Sahuji Mahraj Nagar) | Amroha (J.P. Nagar) | Auraiya | Azamgarh | Baghpat | Bahraich | Ballia | Balrampur | Banda | Barabanki | Bareilly | Basti | Bhadohi | Bijnor | Budaun | Bulandshahr | Chandauli | Chitrakoot | Deoria | Etah | Etawah | Faizabad | Farrukhabad | Fatehpur | Firozabad | Gautam Buddha Nagar | Ghaziabad | Ghazipur | Gonda | Gorakhpur | Hamirpur | Hapur (Panchsheel Nagar) | Hardoi | Hathras | Jalaun | Jaunpur | Jhansi | Kannauj | Kanpur Dehat | Kanpur Nagar | Kanshiram Nagar (Kasganj) | Kaushambi | Kushinagar (Padrauna) | Lakhimpur - Kheri | Lalitpur | Lucknow | Maharajganj | Mahoba | Mainpuri | Mathura | Mau | Meerut | Mirzapur | Moradabad | Muzaffarnagar | Pilibhit | Pratapgarh | RaeBareli | Rampur | Saharanpur | Sambhal (Bhim Nagar) | Sant Kabir Nagar | Shahjahanpur | Shamali (Prabuddh Nagar) | Shravasti | Siddharth Nagar | Sitapur | Sonbhadra | Sultanpur | Unnao | Varanasi";
s_a[36]=" Alipurduar | Bankura | Birbhum | Cooch Behar | Dakshin Dinajpur (South Dinajpur) | Darjeeling | Hooghly | Howrah | Jalpaiguri | Jhargram | Kalimpong | Kolkata | Malda | Murshidabad | Nadia | North 24 Parganas | Paschim Medinipur (West Medinipur) | Paschim (West) Burdwan (Bardhaman) | Purba Burdwan (Bardhaman) | Purba Medinipur (East Medinipur) | Purulia | South 24 Parganas | Uttar Dinajpur (North Dinajpur) ";

function print_state(state_id){
	var option_str = document.getElementById(state_id);
	option_str.length=0;
	option_str.options[0] = new Option('Select State','');
	option_str.selectedIndex = 0;
	for (var i=0; i<state_arr.length; i++) {
		option_str.options[option_str.length] = new Option(state_arr[i],state_arr[i]);
	}
}

function print_city(city_id, city_index){
	var option_str = document.getElementById(city_id);
	option_str.length=0;
	option_str.options[0] = new Option('Select District','');
	option_str.selectedIndex = 0;
	var city_arr = s_a[city_index].split("|");
	for (var i=0; i<city_arr.length; i++) {
		option_str.options[option_str.length] = new Option(city_arr[i],city_arr[i]);
	}
}