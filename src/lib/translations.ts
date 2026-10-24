export type Language = "en" | "hi";

export interface Translations {
  siteTitle: string;
  tagline: string;
  taglineAlt: string;
  supportingMessage: string;
  nav: {
    home: string;
    project: string;
    map: string;
    impact: string;
    report: string;
    petition: string;
    documents: string;
    news: string;
    getInvolved: string;
    about: string;
    admin: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaMap: string;
    ctaPetition: string;
    ctaReport: string;
    disclaimer: string;
  };
  stats: {
    reportedAffected: string;
    reportedSubtitle: string;
    verifiedTrees: string;
    verifiedSubtitle: string;
    citizenReports: string;
    citizenSubtitle: string;
    supporters: string;
    supportersSubtitle: string;
    officialDocs: string;
    officialDocsSubtitle: string;
    pendingReview: string;
    pendingReviewSubtitle: string;
    awaitingVerification: string;
  };
  whyItMatters: {
    title: string;
    subtitle: string;
    urbanHeat: {
      title: string;
      desc: string;
    };
    biodiversity: {
      title: string;
      desc: string;
    };
    waterSoil: {
      title: string;
      desc: string;
    };
    publicHealth: {
      title: string;
      desc: string;
    };
  };
  badges: {
    verified: string;
    reported: string;
    pending: string;
    disputed: string;
    demo: string;
  };
  footer: {
    disclaimer: string;
    peacefulStance: string;
    rights: string;
    privacy: string;
    terms: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    siteTitle: "SAVE DHURWA TREES",
    tagline: "Development Without Destruction.",
    taglineAlt: "Let Ranchi Grow. Let Its Trees Live.",
    supportingMessage: "Better roads. Smarter planning. Living trees.",
    nav: {
      home: "Home",
      project: "The Dhurwa Project",
      map: "Tree Map",
      impact: "Environmental Impact",
      report: "Report a Tree",
      petition: "Public Petition",
      documents: "Documents & Transparency",
      news: "News & Updates",
      getInvolved: "Get Involved",
      about: "About",
      admin: "Admin",
    },
    hero: {
      headline: "Ranchi Needs Better Roads. It Also Needs Its Trees.",
      subheadline:
        "The proposed 10-lane road through Dhurwa has raised concerns about the potential loss of thousands of trees. We are building a public, evidence-based record to understand the impact, explore alternatives, and advocate for development that preserves Ranchi's green heritage.",
      ctaMap: "Explore the Tree Map",
      ctaPetition: "Support Tree Preservation",
      ctaReport: "Submit a Tree Record",
      disclaimer:
        "The reported figure of approximately 7,000 potentially affected trees requires verification against official survey and approval records.",
    },
    stats: {
      reportedAffected: "Reported Trees Affected",
      reportedSubtitle: "Unverified estimate (~7,000)",
      verifiedTrees: "Individually Verified Trees",
      verifiedSubtitle: "Field survey database count",
      citizenReports: "Citizen Tree Reports",
      citizenSubtitle: "Submitted by Ranchi residents",
      supporters: "Public Supporters",
      supportersSubtitle: "Verified citizen signatures",
      officialDocs: "Official Records Obtained",
      officialDocsSubtitle: "DPR, notices & RTI replies",
      pendingReview: "Tree Records Under Review",
      pendingReviewSubtitle: "Field verification in queue",
      awaitingVerification: "Awaiting official verification",
    },
    whyItMatters: {
      title: "Why Mature Urban Trees Matter to Ranchi",
      subtitle:
        "Established trees in Dhurwa represent decades of natural cooling, soil stabilization, and public health protection that saplings cannot replace immediately.",
      urbanHeat: {
        title: "Urban Heat Regulation",
        desc: "Mature canopy shade lowers ambient air temperatures by 2°C to 5°C and surface asphalt temperatures by up to 15°C, cushioning Ranchi's intensifying summer heatwaves.",
      },
      biodiversity: {
        title: "Biodiversity & Avian Nesting Habitats",
        desc: "Centennial Sal, Peepal, Banyan, and Mahua trees provide obligate nesting hollows and wild figs for native birds — including the Indian Grey Hornbill, Coppersmith Barbet, Spotted Owlet, Alexandrine Parakeet, Black-hooded Oriole, and colonial Indian Flying Foxes. Saplings cannot replicate these cavity habitats for 40+ years.",
      },
      waterSoil: {
        title: "Water Infiltration & Soil Retention",
        desc: "Extensive root networks absorb monsoon runoff, replenish the shallow aquifer around Dhurwa Dam, and shield red laterite soils from severe erosion during downpours.",
      },
      publicHealth: {
        title: "Public Health & Living Spaces",
        desc: "Lush roadside canopies filter particulate dust, buffer traffic noise, and preserve walkable shaded public spaces for school children, elders, and commuters.",
      },
    },
    badges: {
      verified: "Verified Official Record",
      reported: "Media / Unverified Report",
      pending: "Awaiting Verification",
      disputed: "Disputed / Superseded",
      demo: "Demonstration Data",
    },
    footer: {
      disclaimer:
        "Save Dhurwa Trees is an independent, fact-based academic research and civic documentation platform created by Ranchi citizens, urban researchers, and environmentalists. It is not an official government portal.",
      peacefulStance:
        "CIVIC CLARIFICATION: This platform is NOT an agitation, protest, or confrontational demonstration. We advocate strictly through lawful, transparent, and constructive democratic participation, right to information, and empirical ecological research to assist authorities in sustainable urban planning.",
      rights: "Open Civic Data Initiative. All public records subject to verification.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
    },
  },
  hi: {
    siteTitle: "धुर्वा के वृक्षों को बचाएं",
    tagline: "बिना विनाश के विकास।",
    taglineAlt: "रांची को बढ़ने दें। इसके पेड़ों को जीने दें।",
    supportingMessage: "बेहतर सड़कें। समझदार योजना। जीवित वृक्ष।",
    nav: {
      home: "मुख्य पृष्ठ",
      project: "धुर्वा सड़क परियोजना",
      map: "वृक्ष मानचित्र",
      impact: "पर्यावरण प्रभाव",
      report: "वृक्ष दर्ज करें",
      petition: "जन याचिका",
      documents: "दस्तावेज़ एवं पारदर्शिता",
      news: "समाचार एवं अपडेट",
      getInvolved: "जुड़ें",
      about: "हमारे बारे में",
      admin: "प्रशासन",
    },
    hero: {
      headline: "रांची को बेहतर सड़कों की आवश्यकता है। इसे अपने पेड़ों की भी ज़रूरत है।",
      subheadline:
        "धुर्वा से होकर गुजरने वाली प्रस्तावित 10-लेन सड़क से हजारों पुराने पेड़ों के संभावित नुकसान की चिंताएं सामने आई हैं। हम प्रभाव को समझने, तकनीकी विकल्पों की तलाश करने और रांची की हरित धरोहर को संरक्षित रखने के लिए एक सार्वजनिक, साक्ष्य-आधारित रिकॉर्ड तैयार कर रहे हैं।",
      ctaMap: "वृक्ष मानचित्र देखें",
      ctaPetition: "संरक्षण का समर्थन करें",
      ctaReport: "वृक्ष रिकॉर्ड सबमिट करें",
      disclaimer:
        "लगभग 7,000 संभावित प्रभावित पेड़ों की रिपोर्ट की गई संख्या को आधिकारिक सर्वेक्षण और अनुमोदन रिकॉर्ड के विरुद्ध सत्यापन की आवश्यकता है।",
    },
    stats: {
      reportedAffected: "रिपोर्ट किए गए प्रभावित वृक्ष",
      reportedSubtitle: "अपुष्ट अनुमान (~7,000)",
      verifiedTrees: "व्यक्तिगत रूप से सत्यापित वृक्ष",
      verifiedSubtitle: "क्षेत्रीय सर्वेक्षण डेटाबेस गणना",
      citizenReports: "नागरिक वृक्ष रिपोर्ट",
      citizenSubtitle: "रांची निवासियों द्वारा सबमिट",
      supporters: "सार्वजनिक समर्थक",
      supportersSubtitle: "सत्यापित नागरिक हस्ताक्षर",
      officialDocs: "प्राप्त आधिकारिक दस्तावेज़",
      officialDocsSubtitle: "डीपीआर, नोटिस एवं आरटीआई उत्तर",
      pendingReview: "समीक्षाधीन वृक्ष रिकॉर्ड",
      pendingReviewSubtitle: "सत्यापन कतार में",
      awaitingVerification: "आधिकारिक सत्यापन की प्रतीक्षा",
    },
    whyItMatters: {
      title: "रांची के लिए पुराने शहरी पेड़ क्यों महत्वपूर्ण हैं?",
      subtitle:
        "धुर्वा में दशकों पुराने पेड़ प्राकृतिक शीतलन, मिट्टी संरक्षण और सार्वजनिक स्वास्थ्य सुरक्षा का काम करते हैं जिसे केवल नए पौधे तुरंत प्रतिस्थापित नहीं कर सकते।",
      urbanHeat: {
        title: "शहरी तापमान नियंत्रण",
        desc: "घने कैनोपी वाले पेड़ परिवेशी वायु के तापमान को 2°C से 5°C तक कम करते हैं और डामर की सतह के तापमान को 15°C तक घटाकर गर्मी से राहत दिलाते हैं।",
      },
      biodiversity: {
        title: "जैव विविधता एवं पक्षी आवास (Avian Habitats)",
        desc: "पुराने साल, पीपल, बरगद और महुआ के पेड़ स्थानीय पक्षियों — जैसे भारतीय धूसर धनेश (हॉर्नबिल), ताम्रकार बसंता, चित्तीदार उल्लू, बड़ा तोता (राया तोता), पीलक और फलभक्षी चमगादड़ों — के लिए प्राकृतिक घोंसलों (tree hollows) का एकमात्र आश्रय हैं। नए पौधे कम से कम 40 वर्षों तक ऐसे खोह नहीं बना सकते।",
      },
      waterSoil: {
        title: "जल संचयन एवं मृदा संरक्षण",
        desc: "वृक्षों की जड़ें मानसून के पानी को सोखती हैं, धुर्वा बांध के निकट भूजल स्तर को सुधारती हैं और मिट्टी के कटाव को रोकती हैं।",
      },
      publicHealth: {
        title: "सार्वजनिक स्वास्थ्य एवं रहने योग्य स्थान",
        desc: "सड़क किनारे लगे छायादार पेड़ धूल कणों को छानते हैं, वाहनों के शोर को कम करते हैं और पैदल यात्रियों एवं स्कूली बच्चों को छाया प्रदान करते हैं।",
      },
    },
    badges: {
      verified: "सत्यापित आधिकारिक रिकॉर्ड",
      reported: "मीडिया / अपुष्ट रिपोर्ट",
      pending: "सत्यापन की प्रतीक्षा",
      disputed: "विवादित / संशोधित",
      demo: "डेमोंस्ट्रेशन डेटा",
    },
    footer: {
      disclaimer:
        "धुर्वा के वृक्षों को बचाएं रांची के नागरिकों, शोधकर्ताओं और पर्यावरणविदों द्वारा संचालित एक स्वतंत्र, साक्ष्य-आधारित वैज्ञानिक शोध व नागरिक दस्तावेज़ीकरण मंच है। यह कोई आधिकारिक सरकारी पोर्टल नहीं है।",
      peacefulStance:
        "नागरिक स्पष्टीकरण: यह पहल कोई विरोध प्रदर्शन (प्रोटेस्ट), धरना या आंदोलन नहीं है। हम कानूनसम्मत, शांतिपूर्ण, पारदर्शी और रचनात्मक जनसहभागिता तथा वैज्ञानिक डेटा के माध्यम से टिकाऊ शहरी विकास और हरित संरक्षण की वकालत करते हैं।",
      rights: "खुला नागरिक डेटा। सभी सार्वजनिक रिकॉर्ड सत्यापन के अधीन हैं।",
      privacy: "गोपनीयता नीति",
      terms: "उपयोग की शर्तें",
    },
  },
};
