var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/src/services/digital-twin-page-git/landing-page-config.util.ts
var landing_page_config_util_exports = {};
__export(landing_page_config_util_exports, {
  LANDING_PAGE_ICON_KEYS: () => LANDING_PAGE_ICON_KEYS,
  createDefaultLandingPageConfig: () => createDefaultLandingPageConfig,
  getLandingPageRevision: () => getLandingPageRevision,
  validateLandingPageConfig: () => validateLandingPageConfig
});
module.exports = __toCommonJS(landing_page_config_util_exports);

// server/skills/landing-page-builder/references/chakri-scrap-copy-schema.json
var chakri_scrap_copy_schema_default = {
  roots: [
    "markets",
    "labels",
    "features",
    "steps",
    "controls",
    "plans",
    "faqs",
    "global",
    "business"
  ],
  labels: [
    "home",
    "retail",
    "by",
    "try",
    "how",
    "hood",
    "business",
    "faq",
    "talk",
    "bookDemo",
    "login",
    "country",
    "mode",
    "heroKicker",
    "heroAction",
    "heroTrust",
    "whatsapp",
    "sampleRates",
    "sampleCoverage",
    "demo",
    "slip",
    "pickupId",
    "estimated",
    "slot",
    "collector",
    "collectorValue",
    "quoteStatus",
    "bookedStatus",
    "weighedStatus",
    "approvedStatus",
    "paidStatus",
    "slipFoot",
    "figure",
    "tilt",
    "storyKicker",
    "storyTitle",
    "storyIntro",
    "storyEnd",
    "storyPaper",
    "storyCpu",
    "storyIron",
    "builderKicker",
    "builderTitle",
    "retailBuilderTitle",
    "builderBody",
    "sampleTitle",
    "samplePaper",
    "sampleBoxes",
    "sampleAc",
    "sampleWire",
    "upload",
    "uploadNotice",
    "analysing",
    "categories",
    "iron",
    "steel",
    "cardboard",
    "plastic",
    "cpu",
    "monitor",
    "ac",
    "unit",
    "kg",
    "areaYes",
    "areaNo",
    "areaHint",
    "day",
    "time",
    "today",
    "tomorrow",
    "dayAfter",
    "morning",
    "afternoon",
    "evening",
    "payout",
    "cash",
    "bookPickup",
    "reset",
    "demoBooked",
    "reviewFirst",
    "chatTitle",
    "chatQuote",
    "noMaterials",
    "featureKicker",
    "featureTitle",
    "draft",
    "demoRecord",
    "review",
    "approve",
    "hold",
    "demoApproved",
    "demoHeld",
    "estimateWeight",
    "actualWeight",
    "reminder",
    "rateTitle",
    "sampleSignup",
    "processKicker",
    "processTitle",
    "processNotice",
    "behind",
    "next",
    "calculatorKicker",
    "calculatorTitle",
    "requests",
    "minutes",
    "hours",
    "days",
    "calculatorNote",
    "quoting",
    "scheduling",
    "followUps",
    "reconciliation",
    "payouts",
    "controlsKicker",
    "controlsTitle",
    "simulate",
    "verify",
    "approval",
    "execute",
    "principle",
    "plansKicker",
    "plansTitle",
    "pricing",
    "popular",
    "faqKicker",
    "faqTitle",
    "stuck",
    "human",
    "call",
    "closingBody",
    "walkthrough",
    "nextSlip",
    "probably",
    "secondary",
    "societyCommand",
    "recurringCommand",
    "certificateCommand",
    "legal",
    "allPersonas",
    "about",
    "contact",
    "privacy",
    "terms",
    "top",
    "materialNotice"
  ],
  markets: [
    "IN",
    "NL",
    "GB",
    "FR",
    "ES",
    "US"
  ],
  marketFields: [
    "label",
    "city",
    "addressLabel",
    "addressExample",
    "payment",
    "languages",
    "paper",
    "aluminium",
    "copper",
    "ewaste",
    "society",
    "certificate",
    "eyebrow",
    "headline",
    "body",
    "closing",
    "opening",
    "acknowledgement",
    "retailEyebrow",
    "retailHeadline",
    "retailBody",
    "retailClosing"
  ],
  arrays: {
    features: {
      count: 6,
      fields: [
        "title",
        "body"
      ]
    },
    steps: {
      count: 4,
      fields: [
        "title",
        "body",
        "log"
      ]
    },
    controls: {
      count: 3,
      fields: [
        "title",
        "body"
      ]
    },
    plans: {
      count: 3,
      fields: [
        "title",
        "body",
        "cta",
        "tag"
      ]
    },
    faqs: {
      count: 7,
      fields: [
        "question",
        "answer"
      ]
    }
  },
  business: {
    roots: [
      "labels",
      "sections",
      "materials",
      "controls",
      "plans",
      "faqs",
      "demo",
      "defaultSelected"
    ],
    labels: [
      "tab",
      "heroKicker",
      "heroTitle",
      "heroBody",
      "heroAction",
      "sampleAction",
      "heroTrust",
      "talk",
      "chatOpening",
      "chatCaption",
      "sampleNotice",
      "globalNotice",
      "marketNotice",
      "inventory",
      "lotNotice",
      "selected",
      "quantity",
      "kg",
      "unit",
      "grade",
      "dry",
      "mixed",
      "wet",
      "uncertain",
      "contamination",
      "clean",
      "lowContamination",
      "highContamination",
      "location",
      "locationDefault",
      "available",
      "storage",
      "covered",
      "outdoor",
      "pickupLimit",
      "oneDay",
      "threeDays",
      "fiveDays",
      "analyse",
      "analysing",
      "reset",
      "empty",
      "analysisTitle",
      "valueRange",
      "eligibility",
      "reviewNeeded",
      "feasible",
      "waiting",
      "selectLot",
      "buyer",
      "processor",
      "recycler",
      "mill",
      "metalProcessor",
      "metalRecycler",
      "industrial",
      "authorised",
      "rate",
      "minimum",
      "transport",
      "included",
      "pickup",
      "days",
      "distance",
      "requirements",
      "flexibleGrade",
      "mixedGrade",
      "sortedGrade",
      "deductions",
      "fees",
      "net",
      "ineligible",
      "issueMinimum",
      "issueGrade",
      "issueContamination",
      "issueTiming",
      "issueRegulated",
      "issueQuantity",
      "recommended",
      "recommendation",
      "noBuyer",
      "noRisk",
      "choose",
      "chosen",
      "approveSale",
      "holdSale",
      "held",
      "approved",
      "locked",
      "formula",
      "routeNotice",
      "photo",
      "sheet",
      "voice",
      "measured",
      "intakeNotice",
      "intakeExample",
      "collectedBy",
      "matching",
      "buyerOptions",
      "awaitingApproval",
      "booked",
      "assigned",
      "collectedStatus",
      "delivered",
      "verified",
      "settlementReady",
      "paid",
      "destination",
      "vehicle",
      "vehicleValue",
      "pickupWindow",
      "contact",
      "contactValue",
      "reference",
      "dispatch",
      "assignDriver",
      "collectLoad",
      "deliverLoad",
      "transportNotice",
      "declared",
      "collected",
      "accepted",
      "difference",
      "threshold",
      "reason",
      "moistureReason",
      "sortingReason",
      "unknownReason",
      "discrepancy",
      "withinThreshold",
      "invalidWeights",
      "verifyWeights",
      "reviewWeights",
      "weightNotice",
      "finalRate",
      "gross",
      "adjustments",
      "netProceeds",
      "transaction",
      "paymentStatus",
      "estimated",
      "offerAccepted",
      "received",
      "prepareSettlement",
      "approveSettlement",
      "settlementNotice",
      "settledNotice",
      "receipt",
      "inventoryRemaining",
      "tonnes",
      "loads",
      "avgPrice",
      "buyerMinutes",
      "transportCost",
      "awaitingSale",
      "enquiries",
      "hours",
      "transportPotential",
      "resaleTime",
      "materialValue",
      "valueNotice",
      "homeLoop",
      "businessLoop",
      "household",
      "collector",
      "downstream",
      "production",
      "returnLoop",
      "closingTitle",
      "closingBody",
      "trySample",
      "bookPilot",
      "pricing",
      "navTry",
      "navOffers",
      "navTransport",
      "navValue",
      "navFaq",
      "approvalLoop",
      "statusLabel",
      "tonnesUnit",
      "timestamp",
      "buyerCount",
      "suitableCount",
      "rateUnit",
      "noSale",
      "settled",
      "tomorrow",
      "clearRecord",
      "routePaper",
      "routeCopper",
      "routeIron",
      "routeElectronics",
      "routeReusable",
      "reusable",
      "electronics",
      "paper",
      "loadRecord",
      "availableNow",
      "regulatedNotice",
      "newBuyer",
      "outgoing",
      "sampleCollector",
      "preview",
      "reviewPending",
      "thresholdUnit",
      "noOffersForMaterial",
      "scaleNote"
    ],
    sections: [
      "demo",
      "intake",
      "routes",
      "offers",
      "transport",
      "verify",
      "settlement",
      "value",
      "controls",
      "loop",
      "plans",
      "faq"
    ],
    sectionFields: [
      "kicker",
      "title",
      "body"
    ],
    materials: [
      "cardboard",
      "iron",
      "aluminium",
      "copper",
      "ac_unit"
    ],
    materialFields: [
      "name",
      "condition",
      "route"
    ],
    arrays: {
      controls: {
        count: 4,
        fields: [
          "title",
          "body"
        ]
      },
      plans: {
        count: 3,
        fields: [
          "title",
          "body",
          "cta",
          "tag"
        ]
      },
      faqs: {
        count: 5,
        fields: [
          "question",
          "answer"
        ]
      }
    },
    demoFields: [
      "weightReviewThresholdPercent",
      "maxPickupDays"
    ]
  },
  optionalMarkets: [
    "AU",
    "DE",
    "CA",
    "SG",
    "JP"
  ]
};

// server/src/services/chakri-landing-validation.ts
function validateChakriLandingContent(content) {
  const issues = [];
  const base = "landingPage.scrapOperations";
  const record2 = (value, path, keys) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      issues.push({ path, message: "Provide the complete Chakri content object." });
      return false;
    }
    for (const key of Object.keys(value)) if (!keys.includes(key)) issues.push({ path: `${path}.${key}`, message: "Only registered Chakri copy fields are allowed." });
    return true;
  };
  const text2 = (value, path) => {
    if (typeof value !== "string" || !value.trim() || value.length > 700) issues.push({ path, message: "Provide non-empty copy up to 700 characters." });
  };
  if (!record2(content, base, chakri_scrap_copy_schema_default.roots)) return issues;
  if (record2(content.labels, `${base}.labels`, chakri_scrap_copy_schema_default.labels)) for (const key of chakri_scrap_copy_schema_default.labels) text2(content.labels[key], `${base}.labels.${key}`);
  const marketCodes = [...chakri_scrap_copy_schema_default.markets, ...chakri_scrap_copy_schema_default.optionalMarkets];
  if (record2(content.markets, `${base}.markets`, marketCodes)) for (const code of marketCodes.filter((code2) => chakri_scrap_copy_schema_default.markets.includes(code2) || Object.prototype.hasOwnProperty.call(content.markets, code2))) {
    const market = content.markets[code];
    if (record2(market, `${base}.markets.${code}`, chakri_scrap_copy_schema_default.marketFields)) for (const key of chakri_scrap_copy_schema_default.marketFields) text2(market[key], `${base}.markets.${code}.${key}`);
  }
  if (content.global !== void 0 && record2(content.global, `${base}.global`, chakri_scrap_copy_schema_default.marketFields)) for (const key of chakri_scrap_copy_schema_default.marketFields) text2(content.global[key], `${base}.global.${key}`);
  for (const [key, contract] of Object.entries(chakri_scrap_copy_schema_default.arrays)) {
    const values = content[key];
    if (!Array.isArray(values) || values.length !== contract.count) {
      issues.push({ path: `${base}.${key}`, message: `Provide exactly ${contract.count} entries.` });
      continue;
    }
    values.forEach((value, index) => {
      const path = `${base}.${key}[${index}]`;
      if (record2(value, path, contract.fields)) for (const field of contract.fields) text2(value[field], `${path}.${field}`);
    });
  }
  if (content.business !== void 0) {
    const business = content.business;
    const path = `${base}.business`;
    const contract = chakri_scrap_copy_schema_default.business;
    if (record2(business, path, contract.roots)) {
      if (business.defaultSelected !== void 0 && typeof business.defaultSelected !== "boolean") issues.push({ path: `${path}.defaultSelected`, message: "Choose whether this audience defaults to Business." });
      if (record2(business.labels, `${path}.labels`, contract.labels)) for (const key of contract.labels) text2(business.labels[key], `${path}.labels.${key}`);
      for (const [group, keys, fields] of [["sections", contract.sections, contract.sectionFields], ["materials", contract.materials, contract.materialFields]]) {
        const values = business[group];
        if (record2(values, `${path}.${group}`, [...keys])) for (const key of keys) {
          const value = values[key];
          if (record2(value, `${path}.${group}.${key}`, [...fields])) for (const field of fields) text2(value[field], `${path}.${group}.${key}.${field}`);
        }
      }
      for (const [key, entry] of Object.entries(contract.arrays)) {
        const values = business[key];
        if (!Array.isArray(values) || values.length !== entry.count) {
          issues.push({ path: `${path}.${key}`, message: `Provide exactly ${entry.count} entries.` });
          continue;
        }
        values.forEach((value, index) => {
          const p = `${path}.${key}[${index}]`;
          if (record2(value, p, entry.fields)) for (const field of entry.fields) text2(value[field], `${p}.${field}`);
        });
      }
      if (record2(business.demo, `${path}.demo`, contract.demoFields)) {
        const threshold = business.demo.weightReviewThresholdPercent;
        if (typeof threshold !== "number" || !Number.isFinite(threshold) || threshold < 0 || threshold > 100) issues.push({ path: `${path}.demo.weightReviewThresholdPercent`, message: "Provide a review threshold from 0 to 100 percent." });
        if (![1, 3, 5].includes(business.demo.maxPickupDays)) issues.push({ path: `${path}.demo.maxPickupDays`, message: "Choose a sample pickup window of 1, 3 or 5 days." });
      }
    }
  }
  return issues;
}

// server/src/shared/mirav-copy-keys.json
var mirav_copy_keys_default = [
  "4FamilyPlacesLeft",
  "800M",
  "800MAwayInYourCircle",
  "aClearOfferForPartners",
  "aClearProgrammeForTeachersAndParents",
  "aClearViewAtHome",
  "aDesktopWorkspaceForOrganizersAMobileApp",
  "aFewNewParentFriends",
  "aLittleAboutYourSchool",
  "aLittleClarityBeforeYouSayHello",
  "aLittleHelpFromMiravAPlanMade",
  "aLittleIdeaForSaturday",
  "aMODELTHATWORKSFORTHEWHOLECOMMUNITY",
  "aNewPossibility",
  "aPALETTEOFPOSSIBILITIES",
  "aParentPlanAFewNewFamiliesAnd",
  "aParentSummaryOfDatesAgeGroupsLearning",
  "aPlanForEveryGroup",
  "aQuestionAboutAnActivity",
  "aSchoolCommunityInsideItsSavedCircle",
  "aSchoolDayWith",
  "aSchoolIdeaAProgrammeToReview",
  "aSchoolLedSessionForDifferentGroupsParents",
  "aSolutionRequestStartsAConversationYourSchool",
  "aSustainableSchoolProgramme",
  "aTeacherKnowsTheChildrenAndChoosesThe",
  "aWholeWorldOfPossibilities",
  "aWorkshopMixAndDeliveryPlan",
  "activities",
  "activity",
  "activityDraftForYourReview",
  "activitySummary",
  "addToProgramme",
  "ageGroup",
  "ages610",
  "ages610WithAParent",
  "anActivityToExplore",
  "appPreviewExampleAIConversation",
  "appPreviewSampleActivities",
  "askMirav",
  "askMiravAboutAnActivity",
  "askMiravAboutThisSession",
  "askMiravIfThisFitsOurFamily",
  "askMiravToDraftMyProgramme",
  "bigPlansAtSchool",
  "bringChildrenFromDifferentGroupsTogetherThroughSports",
  "bringsSchoolsMunicipalitiesAndLocalPartnersTogetherAround",
  "buildASolutionForMySchool",
  "buildMySchoolSolution",
  "canYouHelpUsFindFamilyActivitiesNearby",
  "cannotDetermineWhetherAChildParticipates",
  "chatWithMirav",
  "chooseTheThemesAndGroupsMiravHelpsDraft",
  "chooseYourCommunity",
  "chooseYourRadiusKeepItLocal",
  "cityAndCountry",
  "closeMenu",
  "coachesMusiciansArtistsAndTechnologyEducatorsCanOffer",
  "couldBeRightAroundTheCorner",
  "createAnActivity",
  "createAnotherBrief",
  "cultuureducatieMetKwaliteit",
  "draftAProgrammeWithMirav",
  "draftedWithMirav",
  "everyoneBringsSomething",
  "example",
  "exampleWorkspace",
  "examplesFromTheNetherlands",
  "explainAnActivity",
  "explore",
  "exploreNearbyActivities",
  "exploreSchoolActivities",
  "exploreSchoolBudgetsLocalSponsorsCulturalPartnersAnd",
  "exploreWithMiravInYourCircle",
  "familyActivities",
  "familyActivitiesAroundYou",
  "faq",
  "findActivitiesWithMirav",
  "findFamilyActivities",
  "findTheRightSession",
  "forEverySchoolDay",
  "forParentsForKidsRightAroundYou",
  "forSchoolFamilies",
  "forSchools",
  "forSchoolsTeachersLocalExperts",
  "fri1530",
  "fromALittleIdea",
  "fromAnIdeaWithMirav",
  "fundingApproach",
  "fundingThatFitsYourLocation",
  "groupsFamilies",
  "groupsToDiscuss",
  "happyKids",
  "heyIMMiravTellMeYourKids",
  "heyIMMiravWhatWouldYouLove",
  "howAboutParkPlayAndParentCoffeeHere",
  "howItWorks",
  "iCanExplainTheTimeAgeGroupAnd",
  "illustrationOfANeighborhoodSearchCircle",
  "illustrationOfANeighborhoodWithASchoolPark",
  "inviteAnotherParentToCoHost",
  "isAnotherRouteToLocalCulturalPartnershipsFor",
  "joinFamilyActivity",
  "kidsPlayParentsConnectANeighborhoodFeelsA",
  "letLookAtYourSchoolSessionsThenCompare",
  "letMiravHelpWithTheActivityIdeaThe",
  "letSJOININ",
  "littleAdventures",
  "localExpertise",
  "localPartners",
  "localTalent",
  "mapleSchool",
  "mapleSchoolCommunity",
  "mapleSchoolFamilies",
  "meetMirav",
  "messageMirav",
  "miravForMapleSchool",
  "miravHelpsDraftTheProgrammeYourSchoolShapes",
  "miravHelpsExplainThePlan",
  "miravHome",
  "miravIsAIAndCanMakeMistakesPlease",
  "miravIsAIYouReviewThePlan",
  "miravMobileNavigation",
  "miravNeighborhoodMobileAppPreview",
  "miravProgrammeSuggestion",
  "miravSHAPEDFORYOURSCHOOL",
  "miravSchoolDesktopWorkspacePreview",
  "miravSchoolsMobileAppPreview",
  "miravSections",
  "miravSmilesWithHisArmsFoldedLookingToward",
  "mixMatch",
  "mixedSchoolGroups",
  "moreChildrenMorePossibilities",
  "moreToDiscover",
  "myKidsAre6And9CouldWe",
  "neighborhood",
  "newActivity",
  "newParentFriends",
  "officialSchoolWebsite",
  "oneCOMMUNITYDIFFERENTROLES",
  "onePlaceForDatesVenuesAndLearningGoals",
  "oneSchool",
  "onlyYourSchoolCommunity",
  "openAskMiravPreview",
  "openMenu",
  "organizersDraftTheProgrammeWithMiravInTheir",
  "ourCommunity",
  "parentHostedFamiliesNearby",
  "parentOrganizedFamiliesNearby",
  "parentsFamilies",
  "parentsInTheLoop",
  "parentsManageFamilyParticipation",
  "parkPlayParentCoffee",
  "pickALittlePossibility",
  "planAnActivity",
  "planAnActivityWithMirav",
  "planONTHEWEBPARTICIPATEONTHEPHONE",
  "planProviderFeesAlongsideVenueMaterialsAndCoordination",
  "planReady",
  "planWithMiravShapeItWithYourSchool",
  "previewActivity",
  "profile",
  "programme",
  "programmeFormat",
  "providerAndBudgetReviewWithTheSchool",
  "readyToShare",
  "realLifeStartsWithAHello",
  "registerMySchoolSolution",
  "registerYourInterestInASchoolProgrammeBuilt",
  "requestToParticipate",
  "reviewANewActivityInPreview",
  "reviewActivityDraft",
  "reviewProvider",
  "reviewTheDetailsYouChooseWhenToShare",
  "sameSchoolWithin2Km",
  "saturday1000",
  "saved",
  "sayHelloToMirav",
  "school",
  "schoolActivities",
  "schoolCouldBecome",
  "schoolLedPlans",
  "schoolName",
  "schoolOmgevingProgramme",
  "schoolOrWorkEmail",
  "schoolSolution",
  "schoolWorkspacePreviewExampleProgramme",
  "schools",
  "schoolsTeachers",
  "seeTheScheduleMeetingPlaceAgeGroupAnd",
  "seeYouAround",
  "sendMessageToMirav",
  "sending",
  "setLearningGoalsCombineGroupsChooseAVenue",
  "sharedValue",
  "showActivityMapInPreview",
  "showSchoolActivityInPreview",
  "smallCirclesBiggerPossibilities",
  "sourcesChecked10October2026EachSchoolConfirms",
  "startWithAWorkshopBriefAFeeOr",
  "startWithActivitiesInsideYourSaved2Km",
  "teacherReview",
  "teacherSelectedGroupsAndAgeRanges",
  "teachersChooseTheGroupsAndAdaptTheSession",
  "teachersShapeTheFinalActivity",
  "tellMiravWhatYourKidsLoveShapeAn",
  "tellUsWhatYour",
  "the",
  "theGroupsInterestsAndKindOfLearningYou",
  "thePark",
  "theSchoolLeads",
  "themes",
  "thisWeekTogether",
  "toALittleParentCircle",
  "toASchoolWideProgramme",
  "tue1530",
  "useAdultContactDetailsOnlyWeLlUse",
  "viewSampleActivity",
  "viewSchoolActivity",
  "voluntaryParentContributions",
  "weLlReviewTheBriefAndFollowUp",
  "wed1400",
  "whatShouldIKnowBeforeMyChildJoins",
  "whatWillWeTryNext",
  "whatWouldYouLikeToMakePossible",
  "when",
  "where",
  "whichGroupsWillLearnTogether",
  "whichSchoolActivitiesCouldSuitMyChild",
  "willowPark",
  "withAParent",
  "workshopPalette",
  "workshopPartners",
  "years34Years56",
  "years56Years78",
  "you",
  "yourAIActivityHelper",
  "yourAISchoolGuide",
  "yourCircle",
  "yourIdea",
  "yourIdeaALittleHelpWithThePlan",
  "yourIdeaAnActivityDraftNearbyFamilyConnections",
  "yourName",
  "yourNextFamilyAfternoon",
  "yourRequestCouldNotBeSentPleaseTry",
  "yourRole",
  "yourSCHOOLYOURPROGRAMME",
  "yourSavedCircle2Km",
  "yourSchoolActivityPlan",
  "yourSchoolGroupsAndGoals",
  "yourSchoolRequestIsIn",
  "yourWORKSPACE"
];

// server/src/shared/mirav-landing-copy.ts
var record = (value) => !!value && typeof value === "object" && !Array.isArray(value);
var text = (value) => typeof value === "string" && !!value.trim() && value.length <= 4e3;
var isMiravPreviewIconPath = (path) => /^landingPage\.mirav\.(?:activities\.(?:neighborhood|schools)|workshops)(?:\[\d+\]|\.\d+)\.icon$/.test(path);
function validateMiravLandingCopy(value) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const issues = [];
  const fail = (path) => issues.push({ path: `landingPage.mirav.${path}`, message: "Provide the complete authored Mirav presentation field." });
  if (!record(value) || value.schemaVersion !== 1) {
    fail("schemaVersion");
    return issues;
  }
  if (!record(value.brand) || !text(value.brand.name)) fail("brand.name");
  if (!record(value.ui) || Object.keys(value.ui).length > 500) fail("ui");
  else for (const key of mirav_copy_keys_default) if (!text(value.ui[key])) fail(`ui.${key}`);
  if (!record(value.media) || !text(value.media.portraitImage) || !/^https:\/\/[^\s]+\.(png|webp|jpe?g)(\?[^\s]*)?$/i.test(value.media.portraitImage)) fail("media.portraitImage");
  for (const field of ["logoImage", "mapImage"]) if (!text((_a = value.media) == null ? void 0 : _a[field]) || !/^https:\/\/[^\s]+\.(png|webp|jpe?g|svg)(\?[^\s]*)?$/i.test(value.media[field])) fail(`media.${field}`);
  const rows = (input, path, fields, min = 1, max = 12) => {
    if (!Array.isArray(input) || input.length < min || input.length > max) {
      fail(path);
      return;
    }
    const ids = /* @__PURE__ */ new Set();
    input.forEach((item, i) => {
      if (!record(item)) {
        fail(`${path}.${i}`);
        return;
      }
      for (const field of fields) if (!text(item[field])) fail(`${path}.${i}.${field}`);
      if ("id" in item) {
        if (ids.has(item.id)) fail(`${path}.${i}.id`);
        ids.add(item.id);
      }
    });
  };
  for (const audience of ["neighborhood", "schools"]) {
    const activities = (_b = value.activities) == null ? void 0 : _b[audience];
    rows(activities, `activities.${audience}`, ["id", "icon", "title", "interest", "timeLabel", "venue", "people", "age"]);
    if (Array.isArray(activities)) activities.forEach((item, i) => {
      if (!record(item)) return;
      if (typeof item.icon !== "string" || [...item.icon].length > 8) fail(`activities.${audience}.${i}.icon`);
      for (const coordinate of ["x", "y"]) if (!Number.isFinite(item[coordinate]) || item[coordinate] < 0 || item[coordinate] > 100) fail(`activities.${audience}.${i}.${coordinate}`);
    });
    const steps = (_c = value.process) == null ? void 0 : _c[audience];
    rows(steps, `process.${audience}`, ["id", "body"], 3, 3);
    if (Array.isArray(steps)) steps.forEach((step, i) => {
      if (!Array.isArray(step == null ? void 0 : step.headingLines) || !step.headingLines.length || step.headingLines.some((line) => !text(line))) fail(`process.${audience}.${i}.headingLines`);
    });
  }
  rows(value.workshops, "workshops", ["id", "icon", "title", "body", "color", "outcome"]);
  if (Array.isArray(value.workshops)) value.workshops.forEach((item, i) => {
    if (typeof (item == null ? void 0 : item.icon) !== "string" || [...item.icon].length > 8) fail(`workshops.${i}.icon`);
  });
  for (const [path, choices] of [["cohorts", value.cohorts], ["form.roles", (_d = value.form) == null ? void 0 : _d.roles], ["form.delivery", (_e = value.form) == null ? void 0 : _e.delivery], ["form.funding", (_f = value.form) == null ? void 0 : _f.funding]]) {
    rows(choices, path, ["id", "label"]);
    if (!Array.isArray(choices) || !choices.some((item) => (item == null ? void 0 : item.selected) === true)) fail(`${path}.selected`);
  }
  for (const key of ["neighborhoodPlan", "neighborhoodFind", "schoolPlan", "schoolProgramme", "schoolSolution"]) if (!text((_h = (_g = value.actions) == null ? void 0 : _g[key]) == null ? void 0 : _h.command)) fail(`actions.${key}.command`);
  rows(value.previewPeople, "previewPeople", ["id", "code"], 3, 3);
  rows(value.schoolsFaqs, "schoolsFaqs", ["question", "answer"], 1, 12);
  rows(value.fundingSources, "fundingSources", ["id", "url"], 3, 3);
  if (Array.isArray(value.fundingSources)) value.fundingSources.forEach((source, i) => {
    if (!/^https:\/\/[^\s]+$/.test((source == null ? void 0 : source.url) || "")) fail(`fundingSources.${i}.url`);
  });
  rows(value.metrics, "metrics", ["id", "label"], 3, 3);
  if (Array.isArray(value.metrics)) value.metrics.forEach((metric, i) => {
    if (!Number.isFinite(metric == null ? void 0 : metric.value) || metric.value < 0) fail(`metrics.${i}.value`);
  });
  if (!text((_i = value.schoolAccount) == null ? void 0 : _i.code)) fail("schoolAccount.code");
  if (!text((_j = value.form) == null ? void 0 : _j.websitePlaceholder)) fail("form.websitePlaceholder");
  if (!text(value.deviceTimeLabel)) fail("deviceTimeLabel");
  return issues;
}

// server/src/services/digital-twin-page-git/landing-page-config.util.ts
var import_crypto = require("crypto");

// server/src/services/public-landing-translation-settings.ts
function validatePublicLandingTranslationSettings(settings) {
  const issues = [];
  if (settings.model !== void 0 && (typeof settings.model !== "string" || !/^gemini-[a-z0-9][a-z0-9.-]{0,100}$/.test(settings.model) || /(?:live|image|audio|tts)/.test(settings.model))) {
    issues.push({ field: "model", message: "Choose a Gemini text model for translation." });
  }
  if (settings.geminiProviderId !== void 0 && (typeof settings.geminiProviderId !== "string" || !/^[A-Za-z0-9_-]{1,128}$/.test(settings.geminiProviderId))) {
    issues.push({ field: "geminiProviderId", message: "Choose a saved Gemini credential or the system default." });
  }
  return issues;
}

// server/src/config/languages.config.ts
var getLanguageEmoji = (langId) => {
  const emojiMap = {
    "en": "\u{1F1FA}\u{1F1F8}",
    "de": "\u{1F1E9}\u{1F1EA}",
    "fr": "\u{1F1EB}\u{1F1F7}",
    "es": "\u{1F1EA}\u{1F1F8}",
    "it": "\u{1F1EE}\u{1F1F9}",
    "nl": "\u{1F1F3}\u{1F1F1}",
    "pt": "\u{1F1F5}\u{1F1F9}",
    "ar": "\u{1F1F8}\u{1F1E6}",
    "zh": "\u{1F1E8}\u{1F1F3}",
    "ja": "\u{1F1EF}\u{1F1F5}",
    "ko": "\u{1F1F0}\u{1F1F7}",
    "ru": "\u{1F1F7}\u{1F1FA}",
    "hi": "\u{1F1EE}\u{1F1F3}",
    "tr": "\u{1F1F9}\u{1F1F7}",
    "pl": "\u{1F1F5}\u{1F1F1}",
    "sv": "\u{1F1F8}\u{1F1EA}",
    "da": "\u{1F1E9}\u{1F1F0}",
    "no": "\u{1F1F3}\u{1F1F4}",
    "fi": "\u{1F1EB}\u{1F1EE}",
    "cs": "\u{1F1E8}\u{1F1FF}",
    "sk": "\u{1F1F8}\u{1F1F0}",
    "hu": "\u{1F1ED}\u{1F1FA}",
    "ro": "\u{1F1F7}\u{1F1F4}",
    "bg": "\u{1F1E7}\u{1F1EC}",
    "hr": "\u{1F1ED}\u{1F1F7}",
    "sl": "\u{1F1F8}\u{1F1EE}",
    "et": "\u{1F1EA}\u{1F1EA}",
    "lv": "\u{1F1F1}\u{1F1FB}",
    "lt": "\u{1F1F1}\u{1F1F9}",
    "uk": "\u{1F1FA}\u{1F1E6}",
    "el": "\u{1F1EC}\u{1F1F7}",
    "he": "\u{1F1EE}\u{1F1F1}",
    "th": "\u{1F1F9}\u{1F1ED}",
    "vi": "\u{1F1FB}\u{1F1F3}",
    "id": "\u{1F1EE}\u{1F1E9}",
    "ms": "\u{1F1F2}\u{1F1FE}",
    "bn": "\u{1F1E7}\u{1F1E9}",
    "ta": "\u{1F1F1}\u{1F1F0}",
    "te": "\u{1F1EE}\u{1F1F3}",
    "ml": "\u{1F1EE}\u{1F1F3}",
    "kn": "\u{1F1EE}\u{1F1F3}",
    "gu": "\u{1F1EE}\u{1F1F3}",
    "pa": "\u{1F1EE}\u{1F1F3}",
    "ur": "\u{1F1F5}\u{1F1F0}",
    "fa": "\u{1F1EE}\u{1F1F7}",
    "sw": "\u{1F1F0}\u{1F1EA}",
    "am": "\u{1F1EA}\u{1F1F9}",
    "yo": "\u{1F1F3}\u{1F1EC}",
    "ig": "\u{1F1F3}\u{1F1EC}",
    "ha": "\u{1F1F3}\u{1F1EC}",
    "zu": "\u{1F1FF}\u{1F1E6}",
    "af": "\u{1F1FF}\u{1F1E6}",
    "mt": "\u{1F1F2}\u{1F1F9}",
    "ga": "\u{1F1EE}\u{1F1EA}",
    "cy": "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}",
    "eu": "\u{1F1EA}\u{1F1F8}",
    "ca": "\u{1F1EA}\u{1F1F8}",
    "gl": "\u{1F1EA}\u{1F1F8}",
    "is": "\u{1F1EE}\u{1F1F8}",
    "fo": "\u{1F1EB}\u{1F1F4}",
    "lb": "\u{1F1F1}\u{1F1FA}"
  };
  return emojiMap[langId] || "\u{1F310}";
};
var languages = [
  { id: "aa", name: "Afar", emoji: getLanguageEmoji("aa") },
  { id: "ab", name: "Abkhazian", emoji: getLanguageEmoji("ab") },
  { id: "ae", name: "Avestan", emoji: getLanguageEmoji("ae") },
  { id: "af", name: "Afrikaans", emoji: getLanguageEmoji("af") },
  { id: "ak", name: "Akan", emoji: getLanguageEmoji("ak") },
  { id: "am", name: "Amharic", emoji: getLanguageEmoji("am") },
  { id: "an", name: "Aragonese", emoji: getLanguageEmoji("an") },
  { id: "ar", name: "Arabic", emoji: getLanguageEmoji("ar") },
  { id: "as", name: "Assamese", emoji: getLanguageEmoji("as") },
  { id: "av", name: "Avaric", emoji: getLanguageEmoji("av") },
  { id: "ay", name: "Aymara", emoji: getLanguageEmoji("ay") },
  { id: "az", name: "Azerbaijani", emoji: getLanguageEmoji("az") },
  { id: "ba", name: "Bashkir", emoji: getLanguageEmoji("ba") },
  { id: "be", name: "Belarusian", emoji: getLanguageEmoji("be") },
  { id: "bg", name: "Bulgarian", emoji: getLanguageEmoji("bg") },
  { id: "bh", name: "Bihari", emoji: getLanguageEmoji("bh") },
  { id: "bi", name: "Bislama", emoji: getLanguageEmoji("bi") },
  { id: "bm", name: "Bambara", emoji: getLanguageEmoji("bm") },
  { id: "bn", name: "Bengali", emoji: getLanguageEmoji("bn") },
  { id: "bo", name: "Tibetan", emoji: getLanguageEmoji("bo") },
  { id: "br", name: "Breton", emoji: getLanguageEmoji("br") },
  { id: "bs", name: "Bosnian", emoji: getLanguageEmoji("bs") },
  { id: "ca", name: "Catalan", emoji: getLanguageEmoji("ca") },
  { id: "ce", name: "Chechen", emoji: getLanguageEmoji("ce") },
  { id: "ch", name: "Chamorro", emoji: getLanguageEmoji("ch") },
  { id: "co", name: "Corsican", emoji: getLanguageEmoji("co") },
  { id: "cr", name: "Cree", emoji: getLanguageEmoji("cr") },
  { id: "cs", name: "Czech", emoji: getLanguageEmoji("cs") },
  { id: "cu", name: "Old Church Slavonic", emoji: getLanguageEmoji("cu") },
  { id: "cv", name: "Chuvash", emoji: getLanguageEmoji("cv") },
  { id: "cy", name: "Welsh", emoji: getLanguageEmoji("cy") },
  { id: "da", name: "Danish", emoji: getLanguageEmoji("da") },
  { id: "de", name: "German", emoji: getLanguageEmoji("de") },
  { id: "dv", name: "Divehi", emoji: getLanguageEmoji("dv") },
  { id: "dz", name: "Dzongkha", emoji: getLanguageEmoji("dz") },
  { id: "ee", name: "Ewe", emoji: getLanguageEmoji("ee") },
  { id: "el", name: "Greek", emoji: getLanguageEmoji("el") },
  { id: "en", name: "English", emoji: getLanguageEmoji("en") },
  { id: "eo", name: "Esperanto", emoji: getLanguageEmoji("eo") },
  { id: "es", name: "Spanish", emoji: getLanguageEmoji("es") },
  { id: "et", name: "Estonian", emoji: getLanguageEmoji("et") },
  { id: "eu", name: "Basque", emoji: getLanguageEmoji("eu") },
  { id: "fa", name: "Persian", emoji: getLanguageEmoji("fa") },
  { id: "ff", name: "Fula", emoji: getLanguageEmoji("ff") },
  { id: "fi", name: "Finnish", emoji: getLanguageEmoji("fi") },
  { id: "fj", name: "Fijian", emoji: getLanguageEmoji("fj") },
  { id: "fo", name: "Faroese", emoji: getLanguageEmoji("fo") },
  { id: "fr", name: "French", emoji: getLanguageEmoji("fr") },
  { id: "fy", name: "Western Frisian", emoji: getLanguageEmoji("fy") },
  { id: "ga", name: "Irish", emoji: getLanguageEmoji("ga") },
  { id: "gd", name: "Scottish Gaelic", emoji: getLanguageEmoji("gd") },
  { id: "gl", name: "Galician", emoji: getLanguageEmoji("gl") },
  { id: "gn", name: "Guarani", emoji: getLanguageEmoji("gn") },
  { id: "gu", name: "Gujarati", emoji: getLanguageEmoji("gu") },
  { id: "gv", name: "Manx", emoji: getLanguageEmoji("gv") },
  { id: "ha", name: "Hausa", emoji: getLanguageEmoji("ha") },
  { id: "he", name: "Hebrew", emoji: getLanguageEmoji("he") },
  { id: "hi", name: "Hindi", emoji: getLanguageEmoji("hi") },
  { id: "ho", name: "Hiri Motu", emoji: getLanguageEmoji("ho") },
  { id: "hr", name: "Croatian", emoji: getLanguageEmoji("hr") },
  { id: "ht", name: "Haitian Creole", emoji: getLanguageEmoji("ht") },
  { id: "hu", name: "Hungarian", emoji: getLanguageEmoji("hu") },
  { id: "hy", name: "Armenian", emoji: getLanguageEmoji("hy") },
  { id: "hz", name: "Herero", emoji: getLanguageEmoji("hz") },
  { id: "ia", name: "Interlingua", emoji: getLanguageEmoji("ia") },
  { id: "id", name: "Indonesian", emoji: getLanguageEmoji("id") },
  { id: "ie", name: "Interlingue", emoji: getLanguageEmoji("ie") },
  { id: "ig", name: "Igbo", emoji: getLanguageEmoji("ig") },
  { id: "ii", name: "Sichuan Yi", emoji: getLanguageEmoji("ii") },
  { id: "ik", name: "Inupiak", emoji: getLanguageEmoji("ik") },
  { id: "io", name: "Ido", emoji: getLanguageEmoji("io") },
  { id: "is", name: "Icelandic", emoji: getLanguageEmoji("is") },
  { id: "it", name: "Italian", emoji: getLanguageEmoji("it") },
  { id: "iu", name: "Inuktitut", emoji: getLanguageEmoji("iu") },
  { id: "ja", name: "Japanese", emoji: getLanguageEmoji("ja") },
  { id: "jv", name: "Javanese", emoji: getLanguageEmoji("jv") },
  { id: "ka", name: "Georgian", emoji: getLanguageEmoji("ka") },
  { id: "kg", name: "Kongo", emoji: getLanguageEmoji("kg") },
  { id: "ki", name: "Kikuyu", emoji: getLanguageEmoji("ki") },
  { id: "kj", name: "Kwanyama", emoji: getLanguageEmoji("kj") },
  { id: "kk", name: "Kazakh", emoji: getLanguageEmoji("kk") },
  { id: "kl", name: "Greenlandic", emoji: getLanguageEmoji("kl") },
  { id: "km", name: "Khmer", emoji: getLanguageEmoji("km") },
  { id: "kn", name: "Kannada", emoji: getLanguageEmoji("kn") },
  { id: "ko", name: "Korean", emoji: getLanguageEmoji("ko") },
  { id: "kr", name: "Kanuri", emoji: getLanguageEmoji("kr") },
  { id: "ks", name: "Kashmiri", emoji: getLanguageEmoji("ks") },
  { id: "ku", name: "Kurdish", emoji: getLanguageEmoji("ku") },
  { id: "kv", name: "Komi", emoji: getLanguageEmoji("kv") },
  { id: "kw", name: "Cornish", emoji: getLanguageEmoji("kw") },
  { id: "ky", name: "Kyrgyz", emoji: getLanguageEmoji("ky") },
  { id: "la", name: "Latin", emoji: getLanguageEmoji("la") },
  { id: "lb", name: "Luxembourgish", emoji: getLanguageEmoji("lb") },
  { id: "lg", name: "Luganda", emoji: getLanguageEmoji("lg") },
  { id: "li", name: "Limburgish", emoji: getLanguageEmoji("li") },
  { id: "ln", name: "Lingala", emoji: getLanguageEmoji("ln") },
  { id: "lo", name: "Lao", emoji: getLanguageEmoji("lo") },
  { id: "lt", name: "Lithuanian", emoji: getLanguageEmoji("lt") },
  { id: "lu", name: "Luba-Katanga", emoji: getLanguageEmoji("lu") },
  { id: "lv", name: "Latvian", emoji: getLanguageEmoji("lv") },
  { id: "mg", name: "Malagasy", emoji: getLanguageEmoji("mg") },
  { id: "mh", name: "Marshallese", emoji: getLanguageEmoji("mh") },
  { id: "mi", name: "Maori", emoji: getLanguageEmoji("mi") },
  { id: "mk", name: "Macedonian", emoji: getLanguageEmoji("mk") },
  { id: "ml", name: "Malayalam", emoji: getLanguageEmoji("ml") },
  { id: "mn", name: "Mongolian", emoji: getLanguageEmoji("mn") },
  { id: "mr", name: "Marathi", emoji: getLanguageEmoji("mr") },
  { id: "ms", name: "Malay", emoji: getLanguageEmoji("ms") },
  { id: "mt", name: "Maltese", emoji: getLanguageEmoji("mt") },
  { id: "my", name: "Burmese", emoji: getLanguageEmoji("my") },
  { id: "na", name: "Nauru", emoji: getLanguageEmoji("na") },
  { id: "nb", name: "Norwegian Bokm\xE5l", emoji: getLanguageEmoji("nb") },
  { id: "nd", name: "Northern Ndebele", emoji: getLanguageEmoji("nd") },
  { id: "ne", name: "Nepali", emoji: getLanguageEmoji("ne") },
  { id: "ng", name: "Ndonga", emoji: getLanguageEmoji("ng") },
  { id: "nl", name: "Dutch", emoji: getLanguageEmoji("nl") },
  { id: "nn", name: "Norwegian Nynorsk", emoji: getLanguageEmoji("nn") },
  { id: "no", name: "Norwegian", emoji: getLanguageEmoji("no") },
  { id: "nr", name: "Southern Ndebele", emoji: getLanguageEmoji("nr") },
  { id: "nv", name: "Navajo", emoji: getLanguageEmoji("nv") },
  { id: "ny", name: "Chichewa", emoji: getLanguageEmoji("ny") },
  { id: "oc", name: "Occitan", emoji: getLanguageEmoji("oc") },
  { id: "oj", name: "Ojibwe", emoji: getLanguageEmoji("oj") },
  { id: "om", name: "Oromo", emoji: getLanguageEmoji("om") },
  { id: "or", name: "Oriya", emoji: getLanguageEmoji("or") },
  { id: "os", name: "Ossetian", emoji: getLanguageEmoji("os") },
  { id: "pa", name: "Punjabi", emoji: getLanguageEmoji("pa") },
  { id: "pi", name: "Pali", emoji: getLanguageEmoji("pi") },
  { id: "pl", name: "Polish", emoji: getLanguageEmoji("pl") },
  { id: "ps", name: "Pashto", emoji: getLanguageEmoji("ps") },
  { id: "pt", name: "Portuguese", emoji: getLanguageEmoji("pt") },
  { id: "qu", name: "Quechua", emoji: getLanguageEmoji("qu") },
  { id: "rm", name: "Romansh", emoji: getLanguageEmoji("rm") },
  { id: "rn", name: "Kirundi", emoji: getLanguageEmoji("rn") },
  { id: "ro", name: "Romanian", emoji: getLanguageEmoji("ro") },
  { id: "ru", name: "Russian", emoji: getLanguageEmoji("ru") },
  { id: "rw", name: "Kinyarwanda", emoji: getLanguageEmoji("rw") },
  { id: "sa", name: "Sanskrit", emoji: getLanguageEmoji("sa") },
  { id: "sc", name: "Sardinian", emoji: getLanguageEmoji("sc") },
  { id: "sd", name: "Sindhi", emoji: getLanguageEmoji("sd") },
  { id: "se", name: "Northern Sami", emoji: getLanguageEmoji("se") },
  { id: "sg", name: "Sango", emoji: getLanguageEmoji("sg") },
  { id: "sh", name: "Serbo-Croatian", emoji: getLanguageEmoji("sh") },
  { id: "si", name: "Sinhala", emoji: getLanguageEmoji("si") },
  { id: "sk", name: "Slovak", emoji: getLanguageEmoji("sk") },
  { id: "sl", name: "Slovenian", emoji: getLanguageEmoji("sl") },
  { id: "sm", name: "Samoan", emoji: getLanguageEmoji("sm") },
  { id: "sn", name: "Shona", emoji: getLanguageEmoji("sn") },
  { id: "so", name: "Somali", emoji: getLanguageEmoji("so") },
  { id: "sq", name: "Albanian", emoji: getLanguageEmoji("sq") },
  { id: "sr", name: "Serbian", emoji: getLanguageEmoji("sr") },
  { id: "ss", name: "Swati", emoji: getLanguageEmoji("ss") },
  { id: "st", name: "Southern Sotho", emoji: getLanguageEmoji("st") },
  { id: "su", name: "Sundanese", emoji: getLanguageEmoji("su") },
  { id: "sv", name: "Swedish", emoji: getLanguageEmoji("sv") },
  { id: "sw", name: "Swahili", emoji: getLanguageEmoji("sw") },
  { id: "ta", name: "Tamil", emoji: getLanguageEmoji("ta") },
  { id: "te", name: "Telugu", emoji: getLanguageEmoji("te") },
  { id: "tg", name: "Tajik", emoji: getLanguageEmoji("tg") },
  { id: "th", name: "Thai", emoji: getLanguageEmoji("th") },
  { id: "ti", name: "Tigrinya", emoji: getLanguageEmoji("ti") },
  { id: "tk", name: "Turkmen", emoji: getLanguageEmoji("tk") },
  { id: "tl", name: "Tagalog", emoji: getLanguageEmoji("tl") },
  { id: "tn", name: "Tswana", emoji: getLanguageEmoji("tn") },
  { id: "to", name: "Tongan", emoji: getLanguageEmoji("to") },
  { id: "tr", name: "Turkish", emoji: getLanguageEmoji("tr") },
  { id: "ts", name: "Tsonga", emoji: getLanguageEmoji("ts") },
  { id: "tt", name: "Tatar", emoji: getLanguageEmoji("tt") },
  { id: "tw", name: "Twi", emoji: getLanguageEmoji("tw") },
  { id: "ty", name: "Tahitian", emoji: getLanguageEmoji("ty") },
  { id: "ug", name: "Uyghur", emoji: getLanguageEmoji("ug") },
  { id: "uk", name: "Ukrainian", emoji: getLanguageEmoji("uk") },
  { id: "ur", name: "Urdu", emoji: getLanguageEmoji("ur") },
  { id: "uz", name: "Uzbek", emoji: getLanguageEmoji("uz") },
  { id: "ve", name: "Venda", emoji: getLanguageEmoji("ve") },
  { id: "vi", name: "Vietnamese", emoji: getLanguageEmoji("vi") },
  { id: "vo", name: "Volap\xFCk", emoji: getLanguageEmoji("vo") },
  { id: "wa", name: "Walloon", emoji: getLanguageEmoji("wa") },
  { id: "wo", name: "Wolof", emoji: getLanguageEmoji("wo") },
  { id: "xh", name: "Xhosa", emoji: getLanguageEmoji("xh") },
  { id: "yi", name: "Yiddish", emoji: getLanguageEmoji("yi") },
  { id: "yo", name: "Yoruba", emoji: getLanguageEmoji("yo") },
  { id: "za", name: "Zhuang", emoji: getLanguageEmoji("za") },
  { id: "zh", name: "Chinese", emoji: getLanguageEmoji("zh") },
  { id: "zh-Hans", name: "Chinese (Simplified)", emoji: getLanguageEmoji("zh-Hans") },
  { id: "zh-Hant", name: "Chinese (Traditional)", emoji: getLanguageEmoji("zh-Hant") },
  { id: "zu", name: "Zulu", emoji: getLanguageEmoji("zu") }
];

// server/src/services/landing-page-translation-asset.util.ts
var REGION_KEY = /^[a-z0-9][a-z0-9-]{0,63}$/;
var LANGUAGE_ID = /^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/;
var SOURCE_REVISION = /^[a-f0-9]{64}$/;
var isRecord = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
var normalizeLanguageForFile = (language) => {
  const normalized = language.trim().toLowerCase();
  if (!LANGUAGE_ID.test(normalized)) throw new Error(`Invalid landing-page translation language: ${language}`);
  return normalized;
};
function getLandingPageTranslationAssetPath({
  language,
  regionKey,
  marketScoped = false
}) {
  const normalizedLanguage = normalizeLanguageForFile(language);
  const normalizedRegion = typeof regionKey === "string" && regionKey.trim() ? regionKey.trim() : null;
  if (normalizedRegion && !REGION_KEY.test(normalizedRegion)) {
    throw new Error(`Invalid landing-page translation region: ${regionKey}`);
  }
  if (marketScoped) {
    if (!normalizedRegion) throw new Error("Market-scoped landing-page translations require a region key.");
    return `assets/markets/${normalizedRegion}/landing-page.${normalizedLanguage}.json`;
  }
  return `assets/landing-page${normalizedRegion ? `.${normalizedRegion}` : ""}.${normalizedLanguage}.json`;
}
function isLandingPageTranslationManifestEntry(value) {
  if (!isRecord(value)) return false;
  const language = typeof value.language === "string" ? value.language : "";
  const regionKey = typeof value.regionKey === "string" ? value.regionKey : null;
  if (!LANGUAGE_ID.test(language) || !SOURCE_REVISION.test(String(value.sourceRevision || ""))) return false;
  if (value.assetSchemaVersion !== void 0 && value.assetSchemaVersion !== 2) return false;
  if (value.regionKey !== void 0 && value.regionKey !== null && !REGION_KEY.test(regionKey || "")) return false;
  try {
    const marketScoped = typeof value.translationContextRevision === "string";
    if (value.translationContextRevision !== void 0 && !SOURCE_REVISION.test(String(value.translationContextRevision))) return false;
    const expected = getLandingPageTranslationAssetPath({ language, regionKey, marketScoped });
    const legacyRegional = getLandingPageTranslationAssetPath({ language, regionKey });
    return value.assetPath === expected || value.assetPath === legacyRegional;
  } catch {
    return false;
  }
}

// server/src/services/digital-twin-page-git/business-impact.ts
var IMPACT_OUTCOMES = ["cash", "higher_value", "throughput", "hiring", "error", "risk", "cycle_time"];
var IMPACT_FIELDS = {
  volume: [0, 1e6, 1],
  people: [1, 8, 1],
  accepted_rate: [0, 100, 1],
  attendance_rate: [0, 100, 1],
  minutes: [0, 1e4, 1],
  automation: [0, 100, 1],
  review: [0, 1e4, 1],
  correction_rate_before: [0, 100, 0.1],
  correction_rate_after: [0, 100, 0.1],
  correction_minutes_before: [0, 1e4, 0.1],
  correction_minutes_after: [0, 1e4, 0.1],
  cycles_per_unit: [1, 1e3, 1],
  purchases_per_store: [1e4, 5e5, 5e3],
  tokens_per_output: [0, 1e7, 100],
  budget: [0, 1e8, 1],
  model_cost: [0, 1e8, 1],
  tools_cost: [0, 1e8, 1],
  infrastructure_cost: [0, 1e8, 1],
  platform_cost: [0, 1e8, 1],
  review_rate: [0, 1e4, 1],
  customer_price: [0, 1e8, 0.01],
  personal_value_per_hour: [0, 1e6, 0.01],
  capacity_value_per_hour: [0, 1e6, 0.01],
  included_volume: [0, 1e6, 1],
  overage_price: [0, 1e6, 0.01],
  setup_fee: [0, 1e8, 0.01],
  contract_months: [1, 120, 1],
  cash_hours: [0, 1e8, 0.5],
  cash_avoided: [0, 1e8, 1],
  cash_baseline: [0, 1e8, 1],
  higher_value_hours: [0, 1e8, 0.5],
  contribution_rate: [0, 1e6, 1],
  throughput_hours: [0, 1e8, 0.5],
  extra_minutes: [0.1, 1e4, 0.1],
  demand: [0, 1e6, 1],
  unit_margin: [0, 1e6, 1],
  hiring_hours: [0, 1e8, 0.5],
  planned_hours: [0.5, 1e4, 0.5],
  hire_cost: [0, 1e7, 1],
  hire_months: [1, 12, 1],
  incidents: [0, 1e6, 0.1],
  incident_cost: [0, 1e8, 1],
  probability_before: [0, 100, 0.1],
  probability_after: [0, 100, 0.1],
  loss: [0, 1e8, 1],
  days_before: [0, 3650, 0.1],
  days_after: [0, 3650, 0.1]
};
var HOUSEHOLD_SIZE_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8"];
var HOUSEHOLD_INPUT_RANGES = { volume: [1, 12, 1], minutes: [10, 90, 5], people: [1, 8, 1] };
var HOUSEHOLD_STARTING_VALUES = { volume: 4, minutes: 45, people: 2 };
var HOUSEHOLD_PEOPLE_DEFAULT = HOUSEHOLD_STARTING_VALUES.people;
var HOUSEHOLD_INPUT_FIELDS = ["volume", "minutes", "people"];
function isCopyTemplate(text2, tokens) {
  let rest = text2;
  for (const token of tokens) {
    const parts = rest.split(`{${token}}`);
    if (parts.length !== 2) return false;
    rest = parts.join("");
  }
  return !/[{}]/.test(rest);
}
var HOUSEHOLD_COPY = {
  // Whole-sentence templates: translating "About" or "back a month" as separate fragments produced wrong copy.
  timeBackMonthly: "About {duration} back a month",
  timeBackYearly: "About {duration} back a year",
  // A published average shown beside the price for comparison, never described as a saving.
  wasteLabel: "Food your household throws away",
  wasteNote: "Dutch average for a household your size (Voedingscentrum, 2025 measurement).",
  wasteMonthly: "about {amount} a month",
  wasteYearly: "about {amount} a year",
  smartLabel: "Smarter shopping, when offers and price checks are on",
  // Consumer law: whenever this line shows, it carries its "potential estimate ... depends on" wording.
  smartNote: "A potential estimate. It depends on the offers available and on following KAI's suggestions.",
  smartMonthly: "about {amount} a month",
  smartYearly: "about {amount} a year",
  priceLabel: "KAI",
  priceMonthly: "{amount} a month",
  priceYearly: "{amount} a year",
  kaiNote: "KAI helps you cook from what is already in the fridge, so less of it ends up in the bin.",
  fixedAssumptionsHeading: "Fixed assumptions, not inputs",
  estimatesNote: "The shares and checking minutes are working estimates until KAI measures them with real households.",
  offloadRateLabel: "Share of planning time KAI takes on",
  reviewMinutesLabel: "Minutes still spent checking each session",
  foodWasteReferenceLabel: "Food wasted per person each year",
  smartShareLabel: "Saving on food spend with offers and price checks",
  smartShareNote: "Used only when offers and price checks are live, and only if you follow KAI's suggestions.",
  smartOffNote: "Smarter shopping is not included yet. It is added once offers and price checks are live.",
  spendHeading: "Monthly food spend by household size",
  householdSize: "Household of {people}",
  tiersHeading: "KAI price by planning sessions a month",
  tierRange: "{from} to {to} sessions",
  sourceLabel: "Source",
  timeBackFormula: "Time back = sessions \xD7 planning minutes \xD7 the share KAI takes on, minus sessions \xD7 checking minutes, never below zero.",
  wasteFormula: "Food your household throws away = food wasted per person each year \xF7 12 \xD7 people in your household, shown to one decimal below \u20AC10.",
  smartFormula: "Smarter shopping = monthly food spend for your household size \xD7 the offers saving \xD7 sessions \xF7 4.",
  priceNote: "Prices include VAT. The KAI price depends only on how many sessions you plan each month; minutes and household size never change it.",
  yearlyNote: "The yearly view is twelve times the monthly figures."
};
var HOUSEHOLD_COPY_TEMPLATES = {
  timeBackMonthly: ["duration"],
  timeBackYearly: ["duration"],
  wasteMonthly: ["amount"],
  wasteYearly: ["amount"],
  smartMonthly: ["amount"],
  smartYearly: ["amount"],
  priceMonthly: ["amount"],
  priceYearly: ["amount"],
  householdSize: ["people"],
  tierRange: ["from", "to"]
};
var STORE_OPS_INPUT_FIELDS = ["volume", "cycles_per_unit", "minutes", "purchases_per_store"];
var STORE_OPS_COPY = {
  lossLabelOne: "Food your {stores} store loses to expiry and spoilage",
  lossLabelOther: "Food your {stores} stores lose to expiry and spoilage",
  lossInfo: "Average for Dutch supermarkets: about 1.2% of food bought is lost, mostly to expiry and loss of freshness (Wageningen University & Research, 2024 data). Your own write-offs may be higher or lower.",
  lossMonthly: "about {amount} a month",
  lossYearly: "about {amount} a year",
  priceLabelOne: "KAI for {stores} store",
  priceLabelOther: "KAI for {stores} stores",
  priceMonthly: "{amount} a month ({perStore} per store)",
  priceYearly: "{amount} a year ({perStore} per store a month)",
  breakEven: "KAI pays for itself if it prevents about {percent} of that loss.",
  breakEvenOver: "At this purchase volume, KAI costs more than the average food loss.",
  hoursMonthly: "About {duration} of ordering work back a month",
  hoursYearly: "About {duration} of ordering work back a year",
  noTimeSaved: "No net time saved at this prep time: review takes about as long as KAI saves.",
  fixedAssumptionsHeading: "Fixed assumptions, not inputs",
  shareHandledLabel: "Share of order preparation KAI handles",
  reviewMinutesLabel: "Review minutes per store per cycle",
  lossRateLabel: "Food lost as a share of purchases",
  pricePerStoreLabel: "KAI price per store per month",
  sourceLabel: "Source",
  hoursFormula: "Hours back = stores \xD7 cycles per store \xD7 (preparation minutes \xD7 share KAI handles \u2212 review minutes) \xF7 60, rounded.",
  lossFormula: "Food loss = stores \xD7 monthly food purchases per store \xD7 loss rate, rounded to whole euros.",
  priceFormula: "KAI price = stores \xD7 price per store.",
  breakEvenFormula: "Break-even share = KAI price \xF7 food loss \xD7 100, rounded.",
  yearlyNote: "The yearly view multiplies hours, food loss and price by 12. The break-even share stays the same.",
  lossRateNote: "The loss rate is measured by weight at participating chains and used here as a share of spend."
};
var STORE_OPS_COPY_TEMPLATES = {
  lossLabelOne: ["stores"],
  lossLabelOther: ["stores"],
  lossMonthly: ["amount"],
  lossYearly: ["amount"],
  priceLabelOne: ["stores"],
  priceLabelOther: ["stores"],
  priceMonthly: ["amount", "perStore"],
  priceYearly: ["amount", "perStore"],
  breakEven: ["percent"],
  hoursMonthly: ["duration"],
  hoursYearly: ["duration"]
};
var INTERNAL_COST_FIELDS = ["tokens_per_output", "platform_cost", "model_cost", "tools_cost", "infrastructure_cost", "budget", "review_rate"];
var ROI_CURRENCY_COPY = {
  native: "Amounts in {currency}.",
  loading: "Checking the local currency. Amounts remain in {currency} until a rate is available.",
  unavailable: "A current local exchange rate is unavailable. Amounts remain in {currency}.",
  converted: "Amounts converted from {base} to {currency} using the reference rate dated {date}.",
  basis: "Currency conversion is not local cost research. Enter your own local costs and contribution assumptions. Language changes do not change amounts."
};
var ROI_COST_COPY = {
  breakdown: "How the all-in AI cost is built",
  perUnit: "{amount} per work unit (average)",
  budgetOnly: "This is your total budget. Switch to Cost breakdown to itemize it; no split has been assumed.",
  benefitNotice: "Modeled benefits, not charges. Crossed-out amounts are spending you expect to avoid, not discounts on the AI bill.",
  remainder: "Other included operating costs",
  allocation: "Returned hours are capacity, not automatic savings. Only the portions you assign to actual spending reductions or additional contribution receive a monetary value."
};
function validateRoiCurrencyCopy(value, path) {
  return validateRoiNoticeCopy(value, path, ROI_CURRENCY_COPY);
}
function validateRoiCostCopy(value, path) {
  return validateRoiNoticeCopy(value, path, ROI_COST_COPY);
}
function validateRoiNoticeCopy(value, path, defaults) {
  if (value === void 0) return [];
  if (!value || typeof value !== "object" || Array.isArray(value)) return [{ path, message: "Expected localized currency notices." }];
  const record2 = value;
  const issues = [];
  for (const key of /* @__PURE__ */ new Set([...Object.keys(record2), ...Object.keys(defaults)])) {
    const text2 = record2[key];
    const original = defaults[key];
    if (!original || typeof text2 !== "string" || !text2.trim() || text2.length > 900) issues.push({ path: `${path}.${key}`, message: "Use bounded localized currency notice copy." });
    else if (JSON.stringify((text2.match(/\{[a-z]+\}/g) || []).sort()) !== JSON.stringify((original.match(/\{[a-z]+\}/g) || []).sort())) issues.push({ path: `${path}.${key}`, message: "Preserve the currency notice placeholders." });
  }
  return issues;
}
var IMPACT_COPY = {
  navLabel: "ROI",
  workloadStep: "Your workload",
  costStep: "Token usage",
  valueStep: "What you get",
  workloadIntro: "Start with a typical month of work this persona would run. Adjust the illustrative defaults to your team.",
  costIntro: "Typical token consumption and the platform fee are prefilled for an average user. Edit them if your usage differs.",
  valueIntro: "This is the modeled output and capacity for that typical usage. Edit the assumptions if they do not match your work.",
  sampleNotice: "Typical usage \xB7 not observed results",
  monthly: "Monthly",
  yearly: "Yearly",
  next: "Continue",
  back: "Back",
  reset: "Reset assumptions",
  summary: "Your modeled impact",
  volume: "Work units modeled",
  grossHours: "Repetitive work reduced",
  capacity: "Net capacity returned",
  retained: "Capacity kept available",
  hours: "hours",
  days: "days",
  percent: "%",
  minutes: "minutes",
  tokens: "tokens",
  monthlyTokens: "Monthly tokens",
  tokenCost: "Token usage",
  packageLabel: "Usage package",
  packageBase: "Base",
  packageMedium: "Medium",
  packageCustom: "Custom",
  reviewMode: "Who handles the review?",
  teamReview: "Existing team",
  paidReview: "Additional paid reviewer",
  reviewNote: "Existing-team review uses returned capacity. Additional paid review is included in operating cost, not deducted again from team capacity.",
  totalMode: "Monthly budget",
  itemizedMode: "Cost breakdown",
  budgetNote: "The budget must include models/media, tools, infrastructure, Gabriel fees and additional paid review. Do not include unchanged payroll as new spending.",
  itemizedNote: "Token usage is calculated from volume \xD7 tokens per output. Extra media, tools and infrastructure stay at zero unless they apply. Additional paid review is calculated from review hours and its rate.",
  paidReviewCost: "Additional paid review cost",
  allInCost: "Operating cost",
  missing: "Add your assumptions",
  currentPreparation: "Current preparation hours",
  reviewHours: "Human review hours",
  reworkHours: "Avoided or added rework hours",
  capacityValue: "Modeled capacity value",
  acceptedUnits: "Accepted units",
  attendedUnits: "Attended units",
  costPerAttended: "Cost per attended unit",
  cashValue: "Cash spending avoided",
  contribution: "Expected contribution",
  expectedLoss: "Expected loss reduction",
  riskValue: "Uncertain risk value included",
  economicValue: "Modeled economic value",
  netBenefit: "Net modeled benefit",
  multiple: "Economic return multiple",
  customerBenefit: "Modeled customer benefit",
  customerRoi: "Customer ROI",
  benefitCost: "Benefit-cost multiple",
  firstYearCost: "First-year cost",
  firstYearRoi: "First-year ROI",
  payback: "Setup-fee payback",
  paybackOutsideTerm: "Not recovered within the modeled term",
  months: "months",
  notApplicable: "Not applicable",
  annual: "Annual view",
  annualNote: "The same monthly assumptions, without growth or compounding. Hiring savings last only for the entered period.",
  method: "How this is calculated",
  burdenHeading: "Repetitive work reduced",
  opportunityHeading: "Capacity for higher-value work",
  methodBody: "Operating burden removed (negative productivity) returns capacity. Higher-value work (potential positive productivity) creates economic value only if that capacity is used. Hours alone are not cash savings. Token cost uses a modeled input/output mix, not a provider quote.",
  formulaLabel: "Economic value \xF7 operating cost = economic return multiple. Net benefit subtracts operating cost once.",
  allocationNote: "Each hour can be allocated once. Unallocated hours remain capacity, with no monetary value.",
  overlapLabel: "These benefits are distinct; I have excluded costs and losses already counted elsewhere.",
  overlapNote: "Error and risk estimates exclude labor savings and the same incident must not appear in both categories. Contribution excludes AI costs, which are deducted separately.",
  hiringLabel: "This hire was genuinely planned and the allocated capacity can cover the work.",
  reviewedLabel: "I have reviewed my outcomes; unselected outcomes have no financial value in this estimate.",
  cycleResult: "Cycle-time improvement",
  throughputResult: "Additional work supported by capacity and demand",
  assumptionsIncomplete: "Complete the selected assumptions to calculate financial value.",
  allocationError: "Allocated hours exceed the net capacity available. Reduce the allocations.",
  reviewError: "Review takes more time than the work reduced. No positive capacity is available at these assumptions.",
  cashError: "Avoided spending cannot exceed current spending or have positive value with no hours allocated.",
  hiringError: "Allocated capacity must cover the planned hire hours. Confirm the planned hire and its duration.",
  riskError: "The after probability cannot exceed the before probability for a loss-reduction estimate.",
  overlapError: "Confirm the benefits do not overlap before including them in the financial result.",
  boundsError: "Use values within the displayed limits.",
  rangeLabel: "Adjust value",
  noCurrencyChange: "Language changes formatting, not your currency or assumptions."
};
var HOUSEHOLD_IMPACT_COPY_KEYS = [
  "summary",
  "reset",
  "monthly",
  "yearly",
  "annual",
  "rangeLabel",
  "missing",
  "method",
  "methodBody",
  "burdenHeading",
  "opportunityHeading",
  "noCurrencyChange",
  "reviewError"
];
var STORE_OPS_IMPACT_COPY_KEYS = [
  "summary",
  "reset",
  "monthly",
  "yearly",
  "annual",
  "rangeLabel",
  "missing",
  "method",
  "methodBody",
  "burdenHeading",
  "opportunityHeading",
  "noCurrencyChange"
];
var PACKAGE_VALUE_KEYS = ["cycles_per_unit", "customer_price", "personal_value_per_hour", "capacity_value_per_hour", "included_volume", "overage_price", "setup_fee", "contract_months", "minutes", "automation", "review", "correction_rate_before", "correction_rate_after", "correction_minutes_before", "correction_minutes_after", "model_cost", "tools_cost", "infrastructure_cost", "higher_value_hours", "contribution_rate", "cash_hours", "cash_baseline", "cash_avoided", "incidents", "incident_cost", "probability_before", "probability_after", "loss"];
var finiteNumber = (value) => typeof value === "number" && Number.isFinite(value);
function validateBusinessImpact(value, path = "landingPage.roiCalculator") {
  const issues = [];
  const fail = (p, message) => issues.push({ path: p, message });
  const record2 = (v) => !!v && typeof v === "object" && !Array.isArray(v);
  const keys = (v, allowed, p) => Object.keys(v).forEach((k) => {
    if (!allowed.includes(k)) fail(`${p}.${k}`, "Unsupported business-impact field.");
  });
  const text2 = (v, p, max = 600) => {
    if (typeof v !== "string" || !v.trim() || v.length > max) fail(p, `Use non-empty text up to ${max} characters.`);
  };
  const numberInRange = (n, field, p) => {
    if (typeof n !== "number" || !Number.isFinite(n) || n < IMPACT_FIELDS[field][0] || n > IMPACT_FIELDS[field][1]) fail(p, "Value is outside the supported range.");
  };
  if (!record2(value)) return [{ path, message: "Expected a calculator object." }];
  keys(value, ["methodologyVersion", "enabled", "heading", "subheading", "kicker", "disclaimer", "currency", "currencyCopy", "costCopy", "locale", "periodToggle", "inputs", "metrics", "businessImpact", "cta"], path);
  issues.push(...validateRoiCurrencyCopy(value.currencyCopy, `${path}.currencyCopy`));
  issues.push(...validateRoiCostCopy(value.costCopy, `${path}.costCopy`));
  if (value.methodologyVersion !== 2) fail(`${path}.methodologyVersion`, "Supported methodology version is 2.");
  if (value.enabled !== void 0 && typeof value.enabled !== "boolean") fail(`${path}.enabled`, "Expected a boolean.");
  ["heading", "disclaimer"].forEach((k) => text2(value[k], `${path}.${k}`));
  ["subheading", "kicker"].forEach((k) => {
    if (value[k] !== void 0) text2(value[k], `${path}.${k}`);
  });
  if (typeof value.currency !== "string" || !/^[A-Z]{3}$/.test(value.currency)) fail(`${path}.currency`, "Use an ISO currency code.");
  if (value.locale !== void 0) {
    try {
      if (typeof value.locale !== "string") throw new Error();
      new Intl.Locale(value.locale);
    } catch {
      fail(`${path}.locale`, "Use a valid locale.");
    }
  }
  ["inputs", "metrics"].forEach((k) => {
    if (!Array.isArray(value[k]) || value[k].length) fail(`${path}.${k}`, "Version 2 uses platform calculations; keep this compatibility array empty.");
  });
  if (value.cta !== void 0) {
    if (!record2(value.cta)) fail(`${path}.cta`, "Expected CTA copy.");
    else {
      keys(value.cta, ["primaryLabel", "primaryTarget", "secondaryLabel", "secondaryTarget", "privacyNote"], `${path}.cta`);
      text2(value.cta.primaryLabel, `${path}.cta.primaryLabel`);
      ["secondaryLabel", "privacyNote"].forEach((k) => {
        if (value.cta && record2(value.cta) && value.cta[k] !== void 0) text2(value.cta[k], `${path}.cta.${k}`);
      });
      for (const key of ["primaryTarget", ...value.cta.secondaryLabel !== void 0 ? ["secondaryTarget"] : []]) {
        if (typeof value.cta[key] !== "string" || !/^[a-z][a-z-]{0,60}$/.test(value.cta[key])) fail(`${path}.cta.${key}`, "Use a section target, never a URL.");
      }
    }
  }
  const b = value.businessImpact;
  if (!record2(b)) return [...issues, { path: `${path}.businessImpact`, message: "Business impact content is required." }];
  const bp = `${path}.businessImpact`;
  keys(b, ["defaults", "fixedAssumptions", "householdCopy", "storeOpsAssumptions", "storeOpsCopy", "copy", "fields", "outcomes", "burden", "opportunity", "usagePackages", "tabs", "hero", "selected", "reviewMode", "costMode", "confirmations", "defaultPackage", "workloadMultiplierField", "pricing", "presentation"], bp);
  const household = b.fixedAssumptions !== void 0;
  const storeOps = b.storeOpsAssumptions !== void 0;
  const estimator = household || storeOps;
  if (household && storeOps) fail(`${bp}.storeOpsAssumptions`, "Use either household or store-ops fixed assumptions, not both.");
  if (!record2(b.defaults)) fail(`${bp}.defaults`, "Add workload defaults.");
  else {
    const defaults = b.defaults;
    keys(defaults, Object.keys(IMPACT_FIELDS), `${bp}.defaults`);
    for (const k of ["volume", "minutes", "automation", "review"]) {
      if (defaults[k] !== null) numberInRange(defaults[k], k, `${bp}.defaults.${k}`);
    }
    Object.keys(defaults).forEach((k) => {
      if (IMPACT_FIELDS[k] && !["volume", "minutes", "automation", "review"].includes(k) && !(household && k === "people") && defaults[k] !== null) numberInRange(defaults[k], k, `${bp}.defaults.${k}`);
    });
    if (!household && defaults.people != null && !Number.isInteger(defaults.people)) fail(`${bp}.defaults.people`, "Use a whole number of people.");
  }
  const estimatorDefaults = record2(b.defaults) ? b.defaults : {};
  const oneInputPanel = (inputFields, label) => {
    if (!Array.isArray(b.tabs) || b.tabs.length !== 1) return fail(`${bp}.tabs`, "Use exactly one input panel.");
    if (!record2(b.tabs[0])) return;
    const tab = b.tabs[0];
    const fields = Array.isArray(tab.fields) ? tab.fields : [];
    const exposed = fields.filter((field) => !inputFields.includes(field));
    if (exposed.length) fail(`${bp}.tabs[0].fields`, `Fixed assumptions, cost and money-comparison fields cannot be public inputs: ${exposed.join(", ")}.`);
    else if (fields.length !== inputFields.length || inputFields.some((field) => !fields.includes(field))) fail(`${bp}.tabs[0].fields`, `Show exactly ${label}.`);
    ["showReview", "showOutcomes", "showPackage"].forEach((flag) => {
      if (tab[flag]) fail(`${bp}.tabs[0].${flag}`, "Estimators show only their input panel.");
    });
  };
  const templatedCopy = (key, english, templates) => {
    const cp = `${bp}.${key}`;
    const copy = b[key];
    if (!record2(copy)) return fail(cp, "Add the result copy.");
    keys(copy, Object.keys(english), cp);
    Object.keys(english).forEach((k) => {
      text2(copy[k], `${cp}.${k}`);
      if (typeof copy[k] !== "string") return;
      const tokens = templates[k];
      if (tokens && !isCopyTemplate(copy[k], tokens)) fail(`${cp}.${k}`, `Include ${tokens.map((token) => `{${token}}`).join(" and ")} exactly once and no other template fields.`);
      else if (!tokens && /[{}]/.test(copy[k])) fail(`${cp}.${k}`, "Only the result sentences can contain a template field.");
    });
  };
  if (estimator) {
    INTERNAL_COST_FIELDS.forEach((field) => {
      if (estimatorDefaults[field] != null) fail(`${bp}.defaults.${field}`, "Internal cost values cannot be part of a public estimator.");
    });
    if (b.usagePackages !== void 0 || b.defaultPackage !== void 0) fail(`${bp}.usagePackages`, "Usage packages would change the estimator price.");
    if (Array.isArray(b.selected) && b.selected.length) fail(`${bp}.selected`, "Estimators have no money-comparison outcomes.");
  }
  if (household) {
    const fp = `${bp}.fixedAssumptions`;
    const fixed = b.fixedAssumptions;
    const defaults = estimatorDefaults;
    const share = (value2, p, example) => {
      if (!finiteNumber(value2) || value2 <= 0 || value2 > 1) fail(p, `Use a share above 0 and at most 1 (${example}).`);
    };
    if (!record2(fixed)) fail(fp, "Expected fixed assumptions.");
    else {
      keys(fixed, ["offloadRate", "reviewMinutes", "foodWastePerPersonYear", "foodWasteSource", "smartShopping", "smartShare", "spendBySize", "spendSource", "userEditable"], fp);
      const { offloadRate, reviewMinutes, foodWastePerPersonYear, spendBySize } = fixed;
      share(offloadRate, `${fp}.offloadRate`, "0.5 means 50%");
      if (finiteNumber(offloadRate) && offloadRate > 0 && offloadRate <= 1 && defaults.automation !== Math.round(offloadRate * 1e4) / 100) fail(`${bp}.defaults.automation`, "Keep automation equal to the fixed offload rate as a percentage.");
      numberInRange(reviewMinutes, "review", `${fp}.reviewMinutes`);
      if (finiteNumber(reviewMinutes) && defaults.review !== reviewMinutes) fail(`${bp}.defaults.review`, "Keep review equal to the fixed review minutes.");
      if (!finiteNumber(foodWastePerPersonYear) || foodWastePerPersonYear < 0 || foodWastePerPersonYear > 1e5) fail(`${fp}.foodWastePerPersonYear`, "Use a non-negative yearly amount per person.");
      text2(fixed.foodWasteSource, `${fp}.foodWasteSource`);
      if (typeof fixed.smartShopping !== "boolean") fail(`${fp}.smartShopping`, "Set smartShopping to false until offers and price checks are verified live.");
      share(fixed.smartShare, `${fp}.smartShare`, "0.03 means 3%");
      if (!record2(spendBySize)) fail(`${fp}.spendBySize`, "Add monthly food spend for households of 1 to 8 people.");
      else {
        keys(spendBySize, HOUSEHOLD_SIZE_KEYS, `${fp}.spendBySize`);
        HOUSEHOLD_SIZE_KEYS.forEach((size) => {
          const v = spendBySize[size];
          if (!finiteNumber(v) || v < 0 || v > 1e5) fail(`${fp}.spendBySize.${size}`, "Use a non-negative monthly amount.");
        });
      }
      text2(fixed.spendSource, `${fp}.spendSource`);
      if (fixed.userEditable !== false) fail(`${fp}.userEditable`, "Set userEditable to false. Visitors can never change fixed assumptions.");
    }
    const startingValue = (field, message) => {
      const value2 = defaults[field];
      const [min, max] = HOUSEHOLD_INPUT_RANGES[field];
      if (!finiteNumber(value2) || value2 < min || value2 > max || field !== "minutes" && !Number.isInteger(value2)) fail(`${bp}.defaults.${field}`, message);
    };
    startingValue("volume", "Use a whole number of planning sessions from 1 to 12.");
    startingValue("minutes", "Use planning minutes from 10 to 90.");
    startingValue("people", "Use a whole household size from 1 to 8.");
    if (defaults.customer_price != null) fail(`${bp}.defaults.customer_price`, "Household prices come from pricing.tiers. Remove customer_price.");
    if (!record2(b.pricing) || b.pricing.basis !== "tiered") fail(`${bp}.pricing.basis`, "Household estimates price by planning sessions; only the session count changes the price.");
    else {
      const tiers = b.pricing.tiers;
      if (!Array.isArray(tiers) || !tiers.length || tiers.length > 6) fail(`${bp}.pricing.tiers`, "Add one to six session tiers.");
      else {
        let previous = 0;
        tiers.forEach((tier, i) => {
          const tp = `${bp}.pricing.tiers[${i}]`;
          if (!record2(tier)) return fail(tp, "Expected a session tier.");
          keys(tier, ["upTo", "price"], tp);
          if (!Number.isInteger(tier.upTo) || tier.upTo <= previous) fail(`${tp}.upTo`, "Use whole session limits that increase from tier to tier.");
          else previous = tier.upTo;
          if (!finiteNumber(tier.price) || tier.price < 0 || tier.price > 1e5) fail(`${tp}.price`, "Use a non-negative monthly price including VAT.");
        });
        if (previous !== HOUSEHOLD_INPUT_RANGES.volume[1]) fail(`${bp}.pricing.tiers`, `The last tier must end at ${HOUSEHOLD_INPUT_RANGES.volume[1]} sessions so every session count has a price.`);
      }
      if (b.pricing.annualPrice !== void 0) fail(`${bp}.pricing.annualPrice`, "The yearly price is the monthly price \xD7 12. Add an annual price only as a genuine separate offer.");
      if (b.pricing.minimumMargin !== void 0) fail(`${bp}.pricing.minimumMargin`, "Household pricing has no usage margin.");
    }
    oneInputPanel(HOUSEHOLD_INPUT_FIELDS, "sessions, minutes and people");
    templatedCopy("householdCopy", HOUSEHOLD_COPY, HOUSEHOLD_COPY_TEMPLATES);
  } else if (b.householdCopy !== void 0) fail(`${bp}.householdCopy`, "Household copy requires fixed assumptions.");
  if (storeOps) {
    const sp = `${bp}.storeOpsAssumptions`;
    const fixed = b.storeOpsAssumptions;
    const defaults = estimatorDefaults;
    if (!record2(fixed)) fail(sp, "Expected store-ops fixed assumptions.");
    else {
      keys(fixed, ["shareHandled", "reviewMinutesPerStoreCycle", "lossRate", "lossRateSource", "userEditable"], sp);
      const { shareHandled, reviewMinutesPerStoreCycle, lossRate } = fixed;
      if (!finiteNumber(shareHandled) || shareHandled <= 0 || shareHandled > 1) fail(`${sp}.shareHandled`, "Use a share above 0 and at most 1 (0.5 means 50%).");
      else if (defaults.automation !== Math.round(shareHandled * 1e4) / 100) fail(`${bp}.defaults.automation`, "Keep automation equal to the fixed share handled as a percentage.");
      numberInRange(reviewMinutesPerStoreCycle, "review", `${sp}.reviewMinutesPerStoreCycle`);
      if (finiteNumber(reviewMinutesPerStoreCycle) && defaults.review !== reviewMinutesPerStoreCycle) fail(`${bp}.defaults.review`, "Keep review equal to the fixed review minutes per store cycle.");
      if (!finiteNumber(lossRate) || lossRate <= 0 || lossRate >= 1) fail(`${sp}.lossRate`, "Use a share above 0 and below 1 (0.0121 means 1.21%).");
      text2(fixed.lossRateSource, `${sp}.lossRateSource`);
      if (fixed.userEditable !== false) fail(`${sp}.userEditable`, "Set userEditable to false. Visitors can never change fixed assumptions.");
    }
    const { volume: stores, customer_price: price } = defaults;
    if (!finiteNumber(stores) || !Number.isInteger(stores) || stores < 1) fail(`${bp}.defaults.volume`, "Use a whole number of stores, at least 1.");
    ["cycles_per_unit", "minutes", "purchases_per_store"].forEach((k) => {
      if (defaults[k] == null) fail(`${bp}.defaults.${k}`, "Add a starting value.");
    });
    if (!finiteNumber(price) || price < 0) fail(`${bp}.defaults.customer_price`, "Add the fixed price per store per month.");
    if (!record2(b.pricing) || b.pricing.basis !== "per_volume") fail(`${bp}.pricing.basis`, "Store-ops estimates price per store; only the store count changes the price.");
    else {
      if (b.pricing.annualPrice !== void 0) fail(`${bp}.pricing.annualPrice`, "The yearly price is the monthly price \xD7 12.");
      if (b.pricing.minimumMargin !== void 0) fail(`${bp}.pricing.minimumMargin`, "Store-ops pricing has no usage margin.");
    }
    oneInputPanel(STORE_OPS_INPUT_FIELDS, "stores, cycles per store, preparation minutes and food purchases per store");
    templatedCopy("storeOpsCopy", STORE_OPS_COPY, STORE_OPS_COPY_TEMPLATES);
  } else if (b.storeOpsCopy !== void 0) fail(`${bp}.storeOpsCopy`, "Store-ops copy requires store-ops fixed assumptions.");
  if (!record2(b.copy)) fail(`${bp}.copy`, "Localized interface copy is required.");
  else {
    const copy = b.copy;
    keys(copy, Object.keys(IMPACT_COPY), `${bp}.copy`);
    const required = household ? [...HOUSEHOLD_IMPACT_COPY_KEYS] : storeOps ? [...STORE_OPS_IMPACT_COPY_KEYS] : Object.keys(IMPACT_COPY);
    Object.keys(IMPACT_COPY).forEach((k) => {
      if (required.includes(k) || copy[k] !== void 0) text2(copy[k], `${bp}.copy.${k}`);
    });
  }
  if (!record2(b.fields)) fail(`${bp}.fields`, "Authored input labels and help are required.");
  else {
    keys(b.fields, Object.keys(IMPACT_FIELDS), `${bp}.fields`);
    for (const k of Object.keys(b.fields)) {
      const f = b.fields[k];
      if (!IMPACT_FIELDS[k]) fail(`${bp}.fields.${k}`, "Use a supported input field.");
      else if (!record2(f)) fail(`${bp}.fields.${k}`, "Add label and help.");
      else {
        keys(f, ["label", "help"], `${bp}.fields.${k}`);
        text2(f.label, `${bp}.fields.${k}.label`, 160);
        text2(f.help, `${bp}.fields.${k}.help`);
      }
    }
  }
  const seen = /* @__PURE__ */ new Set();
  if (!Array.isArray(b.outcomes) || b.outcomes.length > 7 || !b.outcomes.length && !estimator) fail(`${bp}.outcomes`, "Use one to seven supported outcomes.");
  else b.outcomes.forEach((o, i) => {
    if (!record2(o)) return fail(`${bp}.outcomes[${i}]`, "Expected an outcome.");
    keys(o, ["id", "label", "help"], `${bp}.outcomes[${i}]`);
    if (!IMPACT_OUTCOMES.includes(o.id) || seen.has(o.id)) fail(`${bp}.outcomes[${i}].id`, "Use a unique supported outcome.");
    seen.add(o.id);
    text2(o.label, `${bp}.outcomes[${i}].label`, 160);
    text2(o.help, `${bp}.outcomes[${i}].help`);
  });
  ["burden", "opportunity"].forEach((k) => {
    const list = b[k];
    if (!Array.isArray(list) || !list.length || list.length > 4) fail(`${bp}.${k}`, "Use one to four concise examples.");
    else list.forEach((v, i) => text2(v, `${bp}.${k}[${i}]`, 240));
  });
  if (b.selected !== void 0) {
    if (!Array.isArray(b.selected) || b.selected.some((id) => !seen.has(id))) fail(`${bp}.selected`, "Preselected outcomes must be included in outcomes.");
  }
  if (b.reviewMode !== void 0 && b.reviewMode !== "team" && b.reviewMode !== "paid") fail(`${bp}.reviewMode`, "Use team or paid review.");
  if (b.costMode !== void 0 && b.costMode !== "total" && b.costMode !== "itemized") fail(`${bp}.costMode`, "Use total or itemized cost.");
  if (b.defaultPackage !== void 0 && b.defaultPackage !== "base" && b.defaultPackage !== "medium") fail(`${bp}.defaultPackage`, "Use base or medium.");
  if (b.confirmations !== void 0) {
    if (!record2(b.confirmations)) fail(`${bp}.confirmations`, "Expected confirmation flags.");
    else {
      keys(b.confirmations, ["overlap", "hiring", "outcomes", "hide"], `${bp}.confirmations`);
      for (const key of ["overlap", "hiring", "outcomes", "hide"]) {
        if (b.confirmations[key] !== void 0 && typeof b.confirmations[key] !== "boolean") fail(`${bp}.confirmations.${key}`, "Expected a boolean.");
      }
    }
  }
  if (b.hero !== void 0) {
    if (!record2(b.hero)) fail(`${bp}.hero`, "Expected a hero metric.");
    else {
      keys(b.hero, ["kind", "label"], `${bp}.hero`);
      if (b.hero.kind !== "volume" && b.hero.kind !== "capacity" && b.hero.kind !== "money") fail(`${bp}.hero.kind`, "Use volume, capacity or money.");
      text2(b.hero.label, `${bp}.hero.label`, 160);
    }
  }
  if (b.tabs !== void 0) {
    if (!Array.isArray(b.tabs) || !b.tabs.length || b.tabs.length > 4) fail(`${bp}.tabs`, "Use one to four tabs.");
    else b.tabs.forEach((tab, i) => {
      if (!record2(tab)) return fail(`${bp}.tabs[${i}]`, "Expected a tab.");
      keys(tab, ["id", "label", "intro", "fields", "showReview", "showOutcomes", "showPackage"], `${bp}.tabs[${i}]`);
      if (typeof tab.id !== "string" || !/^[a-z][a-z0-9-]{0,40}$/.test(tab.id)) fail(`${bp}.tabs[${i}].id`, "Use a compact tab id.");
      text2(tab.label, `${bp}.tabs[${i}].label`, 80);
      text2(tab.intro, `${bp}.tabs[${i}].intro`);
      if (!Array.isArray(tab.fields) || tab.fields.some((field) => !IMPACT_FIELDS[field])) fail(`${bp}.tabs[${i}].fields`, "Use supported input fields.");
      for (const flag of ["showReview", "showOutcomes", "showPackage"]) {
        if (tab[flag] !== void 0 && typeof tab[flag] !== "boolean") fail(`${bp}.tabs[${i}].${flag}`, "Expected a boolean.");
      }
    });
  }
  if (b.usagePackages !== void 0) {
    if (!record2(b.usagePackages)) fail(`${bp}.usagePackages`, "Expected base and medium packages.");
    else {
      keys(b.usagePackages, ["base", "medium"], `${bp}.usagePackages`);
      for (const name of ["base", "medium"]) {
        const pack = b.usagePackages[name];
        const pp = `${bp}.usagePackages.${name}`;
        if (!record2(pack)) fail(pp, "Expected a usage package.");
        else {
          keys(pack, ["volume", "tokensPerOutput", "platform_cost", ...PACKAGE_VALUE_KEYS], pp);
          numberInRange(pack.volume, "volume", `${pp}.volume`);
          numberInRange(pack.tokensPerOutput, "tokens_per_output", `${pp}.tokensPerOutput`);
          numberInRange(pack.platform_cost, "platform_cost", `${pp}.platform_cost`);
          for (const key of PACKAGE_VALUE_KEYS) {
            if (pack[key] !== void 0) numberInRange(pack[key], key, `${pp}.${key}`);
          }
        }
      }
    }
  }
  if (b.workloadMultiplierField !== void 0 && b.workloadMultiplierField !== "cycles_per_unit") fail(`${bp}.workloadMultiplierField`, "Use cycles_per_unit when configuring recurring workload cycles.");
  if (b.pricing !== void 0) {
    if (!record2(b.pricing)) fail(`${bp}.pricing`, "Expected pricing metadata.");
    else {
      keys(b.pricing, ["basis", "annualPrice", "tiers", "minimumMargin", "label", "help"], `${bp}.pricing`);
      if (!["fixed", "per_volume", "usage", "tiered"].includes(b.pricing.basis)) fail(`${bp}.pricing.basis`, "Use fixed, per_volume, usage or tiered.");
      if (b.pricing.tiers !== void 0 && !household) fail(`${bp}.pricing.tiers`, "Session price tiers are only for household estimators.");
      text2(b.pricing.label, `${bp}.pricing.label`, 160);
      text2(b.pricing.help, `${bp}.pricing.help`);
      if (b.pricing.annualPrice !== void 0) numberInRange(b.pricing.annualPrice, "customer_price", `${bp}.pricing.annualPrice`);
      if (b.pricing.basis === "usage" || b.pricing.minimumMargin !== void 0) {
        if (typeof b.pricing.minimumMargin !== "number" || !Number.isFinite(b.pricing.minimumMargin) || b.pricing.minimumMargin < 0 || b.pricing.minimumMargin >= 1) fail(`${bp}.pricing.minimumMargin`, "Use a margin from 0 (inclusive) to 1 (exclusive).");
      }
    }
  }
  if (b.presentation !== void 0) {
    if (!record2(b.presentation)) fail(`${bp}.presentation`, "Expected presentation metadata.");
    else {
      keys(b.presentation, ["financial", "showCustomerEconomics", "hideEconomicMultiple", "costFocus", "showTokenUsage", "showInternalCost"], `${bp}.presentation`);
      if (!["capacity_only", "optional", "required"].includes(b.presentation.financial)) fail(`${bp}.presentation.financial`, "Use capacity_only, optional or required.");
      if (b.presentation.showCustomerEconomics !== void 0 && typeof b.presentation.showCustomerEconomics !== "boolean") fail(`${bp}.presentation.showCustomerEconomics`, "Expected a boolean.");
      if (b.presentation.hideEconomicMultiple !== void 0 && typeof b.presentation.hideEconomicMultiple !== "boolean") fail(`${bp}.presentation.hideEconomicMultiple`, "Expected a boolean.");
      if (b.presentation.costFocus !== void 0 && !["delivery", "customer"].includes(b.presentation.costFocus)) fail(`${bp}.presentation.costFocus`, "Use delivery or customer.");
      if (b.presentation.showTokenUsage !== void 0 && typeof b.presentation.showTokenUsage !== "boolean") fail(`${bp}.presentation.showTokenUsage`, "Expected a boolean.");
      if (b.presentation.showInternalCost !== void 0 && typeof b.presentation.showInternalCost !== "boolean") fail(`${bp}.presentation.showInternalCost`, "Expected a boolean.");
    }
  }
  return issues;
}

// server/src/services/digital-twin-page-git/landing-page-roi.util.ts
var ROI_IDENTIFIER_PATTERN = /^[a-z][a-z0-9_]{0,47}$/;
var ROI_CURRENCY_PATTERN = /^[A-Z]{3}$/;
var ROI_BUILTIN_IDS = ["scenario", "period_months", "weeks_per_month"];
var WEEKS_PER_MONTH = 52 / 12;
var ROI_MAX_FORMULA_LENGTH = 500;
var ROI_MAX_INPUTS = 24;
var ROI_MAX_METRICS = 32;
var ROI_MAX_SCENARIOS = 6;
var ROI_MAX_PRODUCES = 12;
var ROI_INPUT_GROUPS = ["profile", "workload", "economics", "allocation"];
var ROI_METRIC_LAYERS = ["economics", "operations", "value"];
var ROI_VALUE_CLASSES = [
  "cost-elimination",
  "capacity-creation",
  "revenue-productivity",
  "error-avoidance",
  "risk-reduction",
  "throughput",
  "hiring-avoidance",
  "cycle-time"
];
var ROI_PRODUCTIVITY = ["negative", "positive"];
var INPUT_TYPES = /* @__PURE__ */ new Set(["slider", "number", "select"]);
var VALUE_FORMATS = /* @__PURE__ */ new Set(["number", "integer", "currency", "hours", "percent", "multiplier", "tokens"]);
var INPUT_GROUPS = new Set(ROI_INPUT_GROUPS);
var METRIC_LAYERS = new Set(ROI_METRIC_LAYERS);
var VALUE_CLASSES = new Set(ROI_VALUE_CLASSES);
var PRODUCTIVITY = new Set(ROI_PRODUCTIVITY);
var METRIC_KINDS = /* @__PURE__ */ new Set([
  "card",
  "breakdown-benefit",
  "breakdown-cost",
  "summary-cost",
  "summary-roi",
  "summary-benefit",
  "hidden"
]);
var PERIODS = /* @__PURE__ */ new Set(["monthly", "yearly"]);
var BUILTIN_SET = new Set(ROI_BUILTIN_IDS);
var isRecord2 = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
var finiteNumber2 = (value) => typeof value === "number" && Number.isFinite(value);
function tokenize({ formula }) {
  const tokens = [];
  let index = 0;
  while (index < formula.length) {
    const character = formula[index];
    if (/\s/.test(character)) {
      index += 1;
      continue;
    }
    if (character === "+") {
      tokens.push({ type: "plus", value: character, index });
      index += 1;
      continue;
    }
    if (character === "-") {
      tokens.push({ type: "minus", value: character, index });
      index += 1;
      continue;
    }
    if (character === "*") {
      tokens.push({ type: "star", value: character, index });
      index += 1;
      continue;
    }
    if (character === "/") {
      tokens.push({ type: "slash", value: character, index });
      index += 1;
      continue;
    }
    if (character === "(") {
      tokens.push({ type: "lparen", value: character, index });
      index += 1;
      continue;
    }
    if (character === ")") {
      tokens.push({ type: "rparen", value: character, index });
      index += 1;
      continue;
    }
    if (/[0-9.]/.test(character)) {
      const start = index;
      let dots = 0;
      while (index < formula.length && /[0-9.]/.test(formula[index])) {
        if (formula[index] === ".") dots += 1;
        index += 1;
      }
      const value = formula.slice(start, index);
      if (!value || dots > 1 || value === ".") {
        throw new Error(`Invalid number at position ${start + 1}.`);
      }
      tokens.push({ type: "number", value, index: start });
      continue;
    }
    if (/[a-zA-Z_]/.test(character)) {
      const start = index;
      index += 1;
      while (index < formula.length && /[a-zA-Z0-9_]/.test(formula[index])) index += 1;
      tokens.push({ type: "ident", value: formula.slice(start, index), index: start });
      continue;
    }
    throw new Error(`Unexpected character "${character}" at position ${index + 1}.`);
  }
  tokens.push({ type: "eof", value: "", index: formula.length });
  return tokens;
}
function parseFormulaAst({ formula }) {
  const tokens = tokenize({ formula });
  let current = 0;
  const identifiers = [];
  const peek = () => tokens[current];
  const consume = (type) => {
    const token = tokens[current];
    if (type && token.type !== type) {
      throw new Error(token.type === "eof" ? "Unexpected end of formula." : `Unexpected token "${token.value}".`);
    }
    current += 1;
    return token;
  };
  const parseExpression = () => parseAdd();
  const parseAdd = () => {
    parseMul();
    while (peek().type === "plus" || peek().type === "minus") {
      consume();
      parseMul();
    }
  };
  const parseMul = () => {
    parseUnary();
    while (peek().type === "star" || peek().type === "slash") {
      consume();
      parseUnary();
    }
  };
  const parseUnary = () => {
    if (peek().type === "minus") {
      consume();
      parseUnary();
      return;
    }
    parsePrimary();
  };
  const parsePrimary = () => {
    const token = peek();
    if (token.type === "number") {
      consume();
      return;
    }
    if (token.type === "ident") {
      if (!ROI_IDENTIFIER_PATTERN.test(token.value)) {
        throw new Error(`"${token.value}" is not a valid formula identifier.`);
      }
      identifiers.push(token.value);
      consume();
      return;
    }
    if (token.type === "lparen") {
      consume();
      parseExpression();
      consume("rparen");
      return;
    }
    throw new Error(token.type === "eof" ? "Unexpected end of formula." : `Unexpected token "${token.value}".`);
  };
  parseExpression();
  if (peek().type !== "eof") throw new Error(`Unexpected token "${peek().value}".`);
  return { identifiers: [...new Set(identifiers)] };
}
function parseRoiFormula({ formula }) {
  const trimmed = formula.trim();
  if (!trimmed) throw new Error("Formula is required.");
  if (trimmed.length > ROI_MAX_FORMULA_LENGTH) throw new Error(`Keep formulas to ${ROI_MAX_FORMULA_LENGTH} characters or fewer.`);
  return parseFormulaAst({ formula: trimmed });
}
function topologicalMetricOrder({
  metrics
}) {
  const ids = new Set(metrics.map((metric) => metric.id));
  const dependencies = /* @__PURE__ */ new Map();
  metrics.forEach((metric) => {
    let refs = [];
    try {
      refs = parseRoiFormula({ formula: metric.formula }).identifiers.filter((id) => ids.has(id) && id !== metric.id);
    } catch {
      refs = [];
    }
    dependencies.set(metric.id, refs);
  });
  const visiting = /* @__PURE__ */ new Set();
  const visited = /* @__PURE__ */ new Set();
  const order = [];
  const cycles = [];
  const visit = ({ id }) => {
    if (visited.has(id)) return true;
    if (visiting.has(id)) {
      cycles.push(id);
      return false;
    }
    visiting.add(id);
    const refs = dependencies.get(id) || [];
    const acyclic = refs.every((ref) => visit({ id: ref }));
    visiting.delete(id);
    visited.add(id);
    order.push(id);
    return acyclic;
  };
  metrics.forEach((metric) => visit({ id: metric.id }));
  return { order, cycles: [...new Set(cycles)] };
}
function validateIdentifier({
  value,
  path,
  issues,
  used
}) {
  if (typeof value !== "string" || !ROI_IDENTIFIER_PATTERN.test(value)) {
    issues.push({ path, message: "Use a lowercase identifier starting with a letter." });
    return null;
  }
  if (BUILTIN_SET.has(value)) {
    issues.push({ path, message: `"${value}" is reserved by the calculator.` });
    return null;
  }
  if (used.has(value)) {
    issues.push({ path, message: "Keep identifiers unique across inputs and metrics." });
    return null;
  }
  used.add(value);
  return value;
}
function validateRoiCalculator({
  roiCalculator,
  pathPrefix = "landingPage.roiCalculator"
}) {
  if (roiCalculator === void 0) return [];
  if (isRecord2(roiCalculator) && roiCalculator.methodologyVersion !== void 0) return validateBusinessImpact(roiCalculator, pathPrefix);
  if (!isRecord2(roiCalculator)) {
    return [{ path: pathPrefix, message: "ROI calculator must be an object." }];
  }
  const issues = validateRoiCurrencyCopy(roiCalculator.currencyCopy, `${pathPrefix}.currencyCopy`);
  issues.push(...validateRoiCostCopy(roiCalculator.costCopy, `${pathPrefix}.costCopy`));
  const requiredStrings = ["heading", "disclaimer", "currency"];
  requiredStrings.forEach((key) => {
    const value = roiCalculator[key];
    if (typeof value !== "string" || !value.trim()) {
      issues.push({ path: `${pathPrefix}.${key}`, message: "This ROI field is required." });
    }
  });
  if (typeof roiCalculator.currency === "string" && roiCalculator.currency && !ROI_CURRENCY_PATTERN.test(roiCalculator.currency)) {
    issues.push({ path: `${pathPrefix}.currency`, message: "Use a 3-letter ISO currency code such as EUR or USD." });
  }
  if (roiCalculator.locale !== void 0) {
    try {
      if (typeof roiCalculator.locale !== "string" || new Intl.Locale(roiCalculator.locale).toString() !== roiCalculator.locale) {
        throw new Error();
      }
    } catch {
      issues.push({ path: `${pathPrefix}.locale`, message: "Use a canonical BCP-47 locale such as en-GB." });
    }
  }
  if (roiCalculator.enabled !== void 0 && typeof roiCalculator.enabled !== "boolean") {
    issues.push({ path: `${pathPrefix}.enabled`, message: "Enablement must be true or false." });
  }
  if (roiCalculator.periodToggle !== void 0 && typeof roiCalculator.periodToggle !== "boolean") {
    issues.push({ path: `${pathPrefix}.periodToggle`, message: "Period toggle must be true or false." });
  }
  if (roiCalculator.defaultPeriod !== void 0 && (typeof roiCalculator.defaultPeriod !== "string" || !PERIODS.has(roiCalculator.defaultPeriod))) {
    issues.push({ path: `${pathPrefix}.defaultPeriod`, message: "Choose monthly or yearly." });
  }
  if (roiCalculator.headingAccent && typeof roiCalculator.heading === "string" && !roiCalculator.heading.includes(String(roiCalculator.headingAccent))) {
    issues.push({ path: `${pathPrefix}.headingAccent`, message: "Accent text must be an exact substring of the heading." });
  }
  const usedIds = /* @__PURE__ */ new Set();
  const inputIds = /* @__PURE__ */ new Set();
  if (!Array.isArray(roiCalculator.inputs) || roiCalculator.inputs.length === 0) {
    issues.push({ path: `${pathPrefix}.inputs`, message: "Add at least one ROI input." });
  } else if (roiCalculator.inputs.length > ROI_MAX_INPUTS) {
    issues.push({ path: `${pathPrefix}.inputs`, message: `Use at most ${ROI_MAX_INPUTS} inputs.` });
  } else {
    roiCalculator.inputs.forEach((input, index) => {
      const inputPath = `${pathPrefix}.inputs[${index}]`;
      if (!isRecord2(input)) {
        issues.push({ path: inputPath, message: "Each input must be an object." });
        return;
      }
      const id = validateIdentifier({ value: input.id, path: `${inputPath}.id`, issues, used: usedIds });
      if (id) inputIds.add(id);
      if (typeof input.label !== "string" || !input.label.trim()) issues.push({ path: `${inputPath}.label`, message: "Add an input label." });
      if (typeof input.type !== "string" || !INPUT_TYPES.has(input.type)) {
        issues.push({ path: `${inputPath}.type`, message: "Choose slider, number, or select." });
      }
      if (input.format !== void 0 && (typeof input.format !== "string" || !VALUE_FORMATS.has(input.format))) {
        issues.push({ path: `${inputPath}.format`, message: "Choose a supported value format." });
      }
      if (input.group !== void 0 && (typeof input.group !== "string" || !INPUT_GROUPS.has(input.group))) {
        issues.push({ path: `${inputPath}.group`, message: "Choose profile, workload, economics, or allocation." });
      }
      if (!finiteNumber2(input.defaultValue)) issues.push({ path: `${inputPath}.defaultValue`, message: "Set a numeric default." });
      ["min", "max", "step"].forEach((key) => {
        if (input[key] !== void 0 && !finiteNumber2(input[key])) issues.push({ path: `${inputPath}.${key}`, message: "Use a finite number." });
      });
      if (finiteNumber2(input.min) && finiteNumber2(input.max) && input.min > input.max) {
        issues.push({ path: `${inputPath}.max`, message: "Maximum must be greater than or equal to minimum." });
      }
      if (finiteNumber2(input.defaultValue) && finiteNumber2(input.min) && input.defaultValue < input.min) {
        issues.push({ path: `${inputPath}.defaultValue`, message: "Default must be within the input range." });
      }
      if (finiteNumber2(input.defaultValue) && finiteNumber2(input.max) && input.defaultValue > input.max) {
        issues.push({ path: `${inputPath}.defaultValue`, message: "Default must be within the input range." });
      }
      if (input.type === "select") {
        if (!Array.isArray(input.options) || input.options.length === 0) {
          issues.push({ path: `${inputPath}.options`, message: "Select inputs need at least one option." });
        } else {
          const optionValues = /* @__PURE__ */ new Set();
          input.options.forEach((option, optionIndex) => {
            const optionPath = `${inputPath}.options[${optionIndex}]`;
            if (!isRecord2(option)) {
              issues.push({ path: optionPath, message: "Each option must be an object." });
              return;
            }
            if (!finiteNumber2(option.value)) issues.push({ path: `${optionPath}.value`, message: "Option values must be numbers." });
            if (typeof option.label !== "string" || !option.label.trim()) issues.push({ path: `${optionPath}.label`, message: "Add an option label." });
            if (finiteNumber2(option.value)) {
              if (optionValues.has(option.value)) issues.push({ path: `${optionPath}.value`, message: "Keep option values unique." });
              optionValues.add(option.value);
            }
          });
          if (finiteNumber2(input.defaultValue) && !optionValues.has(input.defaultValue)) {
            issues.push({ path: `${inputPath}.defaultValue`, message: "Default must match one of the option values." });
          }
        }
      }
    });
  }
  const scenarioIds = /* @__PURE__ */ new Set();
  if (roiCalculator.scenarios !== void 0) {
    if (!Array.isArray(roiCalculator.scenarios)) {
      issues.push({ path: `${pathPrefix}.scenarios`, message: "Scenarios must be an array." });
    } else if (roiCalculator.scenarios.length > ROI_MAX_SCENARIOS) {
      issues.push({ path: `${pathPrefix}.scenarios`, message: `Use at most ${ROI_MAX_SCENARIOS} scenarios.` });
    } else {
      roiCalculator.scenarios.forEach((scenario, index) => {
        const scenarioPath = `${pathPrefix}.scenarios[${index}]`;
        if (!isRecord2(scenario)) {
          issues.push({ path: scenarioPath, message: "Each scenario must be an object." });
          return;
        }
        if (typeof scenario.id !== "string" || !ROI_IDENTIFIER_PATTERN.test(scenario.id)) {
          issues.push({ path: `${scenarioPath}.id`, message: "Use a lowercase scenario identifier." });
        } else if (scenarioIds.has(scenario.id)) {
          issues.push({ path: `${scenarioPath}.id`, message: "Keep scenario identifiers unique." });
        } else {
          scenarioIds.add(scenario.id);
        }
        if (typeof scenario.label !== "string" || !scenario.label.trim()) issues.push({ path: `${scenarioPath}.label`, message: "Add a scenario label." });
        if (!finiteNumber2(scenario.multiplier) || scenario.multiplier <= 0) {
          issues.push({ path: `${scenarioPath}.multiplier`, message: "Use a positive scenario multiplier." });
        }
      });
    }
  }
  if (roiCalculator.defaultScenarioId !== void 0) {
    if (typeof roiCalculator.defaultScenarioId !== "string" || scenarioIds.size > 0 && !scenarioIds.has(roiCalculator.defaultScenarioId)) {
      issues.push({ path: `${pathPrefix}.defaultScenarioId`, message: "Default scenario must match a configured scenario." });
    }
  }
  const metricIds = /* @__PURE__ */ new Set();
  const metricsForGraph = [];
  if (!Array.isArray(roiCalculator.metrics) || roiCalculator.metrics.length === 0) {
    issues.push({ path: `${pathPrefix}.metrics`, message: "Add at least one calculated metric." });
  } else if (roiCalculator.metrics.length > ROI_MAX_METRICS) {
    issues.push({ path: `${pathPrefix}.metrics`, message: `Use at most ${ROI_MAX_METRICS} metrics.` });
  } else {
    const allowedRefs = /* @__PURE__ */ new Set([...inputIds, ...BUILTIN_SET]);
    roiCalculator.metrics.forEach((metric, index) => {
      const metricPath = `${pathPrefix}.metrics[${index}]`;
      if (!isRecord2(metric)) {
        issues.push({ path: metricPath, message: "Each metric must be an object." });
        return;
      }
      const id = validateIdentifier({ value: metric.id, path: `${metricPath}.id`, issues, used: usedIds });
      if (id) {
        metricIds.add(id);
        allowedRefs.add(id);
      }
      if (typeof metric.label !== "string" || !metric.label.trim()) issues.push({ path: `${metricPath}.label`, message: "Add a metric label." });
      if (typeof metric.format !== "string" || !VALUE_FORMATS.has(metric.format)) {
        issues.push({ path: `${metricPath}.format`, message: "Choose a supported value format." });
      }
      if (typeof metric.kind !== "string" || !METRIC_KINDS.has(metric.kind)) {
        issues.push({ path: `${metricPath}.kind`, message: "Choose a supported metric kind." });
      }
      if (metric.layer !== void 0 && (typeof metric.layer !== "string" || !METRIC_LAYERS.has(metric.layer))) {
        issues.push({ path: `${metricPath}.layer`, message: "Choose economics, operations, or value." });
      }
      if (metric.valueClass !== void 0 && (typeof metric.valueClass !== "string" || !VALUE_CLASSES.has(metric.valueClass))) {
        issues.push({ path: `${metricPath}.valueClass`, message: "Choose a supported economic-value class." });
      }
      if (metric.productivity !== void 0 && (typeof metric.productivity !== "string" || !PRODUCTIVITY.has(metric.productivity))) {
        issues.push({ path: `${metricPath}.productivity`, message: "Choose negative or positive productivity." });
      }
      if (metric.scalesWithPeriod !== void 0 && typeof metric.scalesWithPeriod !== "boolean") {
        issues.push({ path: `${metricPath}.scalesWithPeriod`, message: "Period scaling must be true or false." });
      }
      if (metric.scalesWithScenario !== void 0 && typeof metric.scalesWithScenario !== "boolean") {
        issues.push({ path: `${metricPath}.scalesWithScenario`, message: "Scenario scaling must be true or false." });
      }
      if (typeof metric.formula !== "string" || !metric.formula.trim()) {
        issues.push({ path: `${metricPath}.formula`, message: "Add an arithmetic formula." });
      } else if (id) {
        metricsForGraph.push({ id, formula: metric.formula });
        try {
          const parsed = parseRoiFormula({ formula: metric.formula });
          parsed.identifiers.forEach((ref) => {
            if (!allowedRefs.has(ref) && !metricIds.has(ref) && !inputIds.has(ref) && !BUILTIN_SET.has(ref)) {
              issues.push({ path: `${metricPath}.formula`, message: `Unknown formula reference "${ref}".` });
            }
          });
        } catch (error) {
          issues.push({
            path: `${metricPath}.formula`,
            message: error instanceof Error ? error.message : "Formula could not be parsed."
          });
        }
      }
    });
    const forwardRefs = /* @__PURE__ */ new Set([...inputIds, ...BUILTIN_SET]);
    roiCalculator.metrics.forEach((metric, index) => {
      if (!isRecord2(metric) || typeof metric.formula !== "string" || typeof metric.id !== "string") return;
      try {
        const parsed = parseRoiFormula({ formula: metric.formula });
        parsed.identifiers.forEach((ref) => {
          if (ref === metric.id) {
            issues.push({ path: `${pathPrefix}.metrics[${index}].formula`, message: "A metric cannot reference itself." });
          } else if (!forwardRefs.has(ref) && metricIds.has(ref)) {
          } else if (!forwardRefs.has(ref) && !metricIds.has(ref) && !BUILTIN_SET.has(ref)) {
            issues.push({ path: `${pathPrefix}.metrics[${index}].formula`, message: `Unknown formula reference "${ref}".` });
          }
        });
      } catch {
        return;
      }
      if (typeof metric.id === "string") forwardRefs.add(metric.id);
    });
  }
  const { cycles } = topologicalMetricOrder({ metrics: metricsForGraph });
  if (cycles.length > 0) {
    issues.push({
      path: `${pathPrefix}.metrics`,
      message: `Formulas contain a cycle involving ${cycles.join(", ")}.`
    });
  }
  if (roiCalculator.produces !== void 0) {
    if (!Array.isArray(roiCalculator.produces)) {
      issues.push({ path: `${pathPrefix}.produces`, message: "Produces must be an array of strings." });
    } else if (roiCalculator.produces.length > ROI_MAX_PRODUCES) {
      issues.push({ path: `${pathPrefix}.produces`, message: `Use at most ${ROI_MAX_PRODUCES} produced outputs.` });
    } else {
      roiCalculator.produces.forEach((item, index) => {
        if (typeof item !== "string" || !item.trim()) {
          issues.push({ path: `${pathPrefix}.produces[${index}]`, message: "Each produced output must be a non-empty string." });
        }
      });
    }
  }
  if (roiCalculator.projection !== void 0) {
    if (!isRecord2(roiCalculator.projection)) {
      issues.push({ path: `${pathPrefix}.projection`, message: "Projection must be an object." });
    } else {
      const months = roiCalculator.projection.months;
      if (!finiteNumber2(months) || months < 1 || months > 36 || !Number.isInteger(months)) {
        issues.push({ path: `${pathPrefix}.projection.months`, message: "Projection months must be a whole number from 1 to 36." });
      }
      ["costMetricId", "benefitMetricId"].forEach((key) => {
        const value = isRecord2(roiCalculator.projection) ? roiCalculator.projection[key] : void 0;
        if (typeof value !== "string" || !metricIds.has(value)) {
          issues.push({ path: `${pathPrefix}.projection.${key}`, message: "Projection metrics must reference a configured metric." });
        }
      });
    }
  }
  if (roiCalculator.cta !== void 0) {
    if (!isRecord2(roiCalculator.cta)) {
      issues.push({ path: `${pathPrefix}.cta`, message: "CTA must be an object." });
    } else if (typeof roiCalculator.cta.primaryLabel !== "string" || !roiCalculator.cta.primaryLabel.trim()) {
      issues.push({ path: `${pathPrefix}.cta.primaryLabel`, message: "Add a primary CTA label." });
    }
  }
  const allocationDefaults = Array.isArray(roiCalculator.inputs) ? roiCalculator.inputs.filter((input) => isRecord2(input) && input.group === "allocation" && input.format === "percent" && finiteNumber2(input.defaultValue)) : [];
  const allocationTotal = allocationDefaults.reduce((sum, input) => sum + Number(input.defaultValue), 0);
  if (allocationTotal > 100.0001) {
    issues.push({ path: `${pathPrefix}.inputs`, message: "Allocation percentages must add up to 100 or less. The remainder is unused capacity." });
  }
  const validateFramework = ({ value, path }) => {
    if (value === void 0) return;
    if (!isRecord2(value)) {
      issues.push({ path, message: "Productivity framework must be an object." });
      return;
    }
    if (value.items !== void 0) {
      if (!Array.isArray(value.items)) issues.push({ path: `${path}.items`, message: "Framework items must be an array of strings." });
      else value.items.forEach((item, index) => {
        if (typeof item !== "string" || !item.trim()) issues.push({ path: `${path}.items[${index}]`, message: "Each framework item must be a non-empty string." });
      });
    }
  };
  validateFramework({ value: roiCalculator.negativeProductivity, path: `${pathPrefix}.negativeProductivity` });
  validateFramework({ value: roiCalculator.positiveProductivity, path: `${pathPrefix}.positiveProductivity` });
  return issues;
}

// server/skills/landing-page-builder/references/boli-learning-copy-schema.json
var boli_learning_copy_schema_default = {
  required: [
    "dashboardWorld",
    "dashboardCourses",
    "dashboardAchievements",
    "dashboardAdventures",
    "dashboardMotto",
    "dashboardGreeting",
    "dashboardQuestion",
    "dashboardStreak",
    "dashboardExplore",
    "dashboardCaption",
    "diagramInput",
    "diagramPrediction",
    "diagramMotion",
    "diagramLife",
    "mentorNote",
    "meetNav",
    "parentsTab",
    "schoolsTab",
    "audienceLabel",
    "navLabel",
    "benefitsNav",
    "howNav",
    "coursesNav",
    "assessmentNav",
    "faqNav",
    "modeLabel",
    "createButton",
    "createHeroButton",
    "exploreButton",
    "heroFootnote",
    "playbookLabel",
    "exampleLabel",
    "playbookBrief",
    "playbookBriefDetail",
    "playbookReview",
    "playbookReviewDetail",
    "playbookExplore",
    "playbookExploreDetail",
    "playbookEvidence",
    "playbookEvidenceDetail",
    "startFlagship",
    "chatLabel",
    "chatPlaceholder",
    "sendLabel",
    "sampleData",
    "worldKicker",
    "worldTitle",
    "worldDescription",
    "worldLabel",
    "worldImageAlt",
    "worldIntroKicker",
    "worldIntroTitle",
    "worldIntroBody",
    "worldJoin",
    "worldMentor",
    "worldExplore",
    "timeLabel",
    "pauseLabel",
    "playLabel",
    "pause",
    "play",
    "dawn",
    "day",
    "noon",
    "dusk",
    "night",
    "subjects",
    "benefitsKicker",
    "benefitsTitle",
    "benefitsBody",
    "benefitOneTitle",
    "benefitOneBody",
    "benefitTwoTitle",
    "benefitTwoBody",
    "benefitThreeTitle",
    "benefitThreeBody",
    "coursesKicker",
    "coursesTitle",
    "coursesBody",
    "agesLabel",
    "curiousLabel",
    "agesPrefix",
    "mysteriesLabel",
    "courseExplore",
    "courseNote",
    "mentorKicker",
    "mentorTitle",
    "mentorBody",
    "mentorPointOne",
    "mentorPointTwo",
    "mentorPointThree",
    "mentorButton",
    "mentorImageAlt",
    "mentorLabelOne",
    "mentorLabelTwo",
    "howKicker",
    "howTitle",
    "howBody",
    "stepOneTitle",
    "stepOneBody",
    "stepOneButton",
    "stepTwoTitle",
    "stepTwoBody",
    "stepTwoButton",
    "stepThreeTitle",
    "stepThreeBody",
    "stepThreeButton",
    "assessmentKicker",
    "assessmentTitle",
    "assessmentAccent",
    "assessmentBody",
    "assessmentThink",
    "assessmentSee",
    "assessmentExplain",
    "assessmentButton",
    "assessmentNote",
    "assessmentLab",
    "assessmentMicro",
    "assessmentQuestion",
    "answerA",
    "answerB",
    "answerC",
    "assessmentHint",
    "assessmentCorrect",
    "assessmentRetry",
    "assessmentBottom",
    "assessmentContinue",
    "faqKicker",
    "faqTitle",
    "faqBody",
    "closingKicker",
    "closingTitle",
    "closingBody",
    "closingButton",
    "closingIsland",
    "footerLine",
    "footerDisclosure",
    "closeLabel",
    "coursePreviewKicker",
    "courseStart",
    "approvalTitle",
    "approvalBody",
    "plannerKicker",
    "plannerTitle",
    "plannerBody",
    "plannerAge",
    "plannerSubject",
    "plannerGoal",
    "plannerGoalPlaceholder",
    "plannerSubjectAI",
    "plannerSubjectPhysics",
    "plannerSubjectBiology",
    "plannerSubmit",
    "plannerNotice",
    "loginNotice",
    "pendingNotice",
    "signedInLabel"
  ],
  optional: [
    "stepFourTitle",
    "stepFourBody",
    "stepFourButton",
    "stepFiveTitle",
    "stepFiveBody",
    "stepFiveButton",
    "parentWorkflow",
    "schoolWorkflow",
    "scanLabel",
    "storyboardLabel",
    "plannerSubjectEnergy",
    "plannerSubjectCreative",
    "plannerSubjectCommerce",
    "plannerSubjectLife",
    "plannerSubjectProfession",
    "schoolWhyNav",
    "schoolDashboardNav",
    "schoolLocalNav",
    "schoolPilotNav",
    "schoolPilotCta",
    "schoolSeeHow",
    "schoolHeroFootnote",
    "schoolProofLabel",
    "schoolProofWhiteLabel",
    "schoolProofPath",
    "schoolProofDashboard",
    "schoolProofLocal",
    "schoolOverviewAlt",
    "schoolOverviewCaption",
    "schoolOverviewCaptionBody",
    "schoolOverviewEyebrow",
    "schoolOverviewTitle",
    "schoolOverviewBody",
    "schoolFeature1Title",
    "schoolFeature1Body",
    "schoolFeature2Title",
    "schoolFeature2Body",
    "schoolFeature3Title",
    "schoolFeature3Body",
    "schoolFeature4Title",
    "schoolFeature4Body",
    "schoolStepsEyebrow",
    "schoolStepsTitle",
    "schoolStepsBody",
    "schoolStep1Title",
    "schoolStep1Body",
    "schoolStep1Alt",
    "schoolStep2Title",
    "schoolStep2Body",
    "schoolStep2Alt",
    "schoolStep3Title",
    "schoolStep3Body",
    "schoolStep3Alt",
    "schoolStep4Title",
    "schoolStep4Body",
    "schoolStep4Alt",
    "schoolStep5Title",
    "schoolStep5Body",
    "schoolStep5Alt",
    "schoolStepsAsideTitle",
    "schoolStepsAsideBody",
    "schoolDashEyebrow",
    "schoolDashTitle",
    "schoolDashBody",
    "schoolDashClass",
    "schoolDashLibrary",
    "schoolDashEvidence",
    "schoolDashSettings",
    "schoolDashRunning",
    "schoolDashDevice",
    "schoolDashCohort",
    "schoolDashGreeting",
    "schoolDashActive",
    "schoolKpiProgress",
    "schoolKpiEvidence",
    "schoolKpiCertificates",
    "schoolTableLearner",
    "schoolTableCourse",
    "schoolTableProgress",
    "schoolTableNext",
    "schoolLearner1Course",
    "schoolLearner1Next",
    "schoolLearner2Course",
    "schoolLearner2Next",
    "schoolLearner3Course",
    "schoolLearner3Next",
    "schoolLearner4Course",
    "schoolLearner4Next",
    "schoolLocalEyebrow",
    "schoolLocalTitle",
    "schoolLocalBody",
    "schoolLocalPoint1",
    "schoolLocalPoint2",
    "schoolLocalPoint3",
    "schoolLocalPoint4",
    "schoolLocalDiagramLabel",
    "schoolLocalDeviceKicker",
    "schoolLocalDeviceTitle",
    "schoolLocalDeviceBody",
    "schoolLocalNetwork",
    "schoolLocalTeacher",
    "schoolLocalLaptops",
    "schoolLocalTablets",
    "schoolLocalNote",
    "schoolPilotEyebrow",
    "schoolPilotTitle",
    "schoolPilotBody",
    "schoolPilotStep1",
    "schoolPilotStep2",
    "schoolPilotStep3",
    "schoolPilotStep4",
    "schoolPilotSuccessKicker",
    "schoolPilotSuccessTitle",
    "schoolPilotSuccessAgain",
    "schoolFormKicker",
    "schoolFormTitle",
    "schoolFormName",
    "schoolFormNamePlaceholder",
    "schoolFormRole",
    "schoolFormRolePlaceholder",
    "schoolFormSchool",
    "schoolFormSchoolPlaceholder",
    "schoolFormEmail",
    "schoolFormEmailPlaceholder",
    "schoolFormSize",
    "schoolFormSizeLabel",
    "schoolSize1",
    "schoolSize2",
    "schoolSize3",
    "schoolSize4",
    "schoolFormDeployment",
    "schoolFormDeploymentLabel",
    "schoolDeploy1",
    "schoolDeploy2",
    "schoolDeploy3",
    "schoolDeploy4",
    "schoolFormGoal",
    "schoolFormGoalPlaceholder",
    "schoolFormError",
    "schoolFormSending",
    "schoolFormSubmit",
    "schoolFormNote",
    "schoolFaqEyebrow",
    "schoolFaqTitle",
    "schoolFaqBody",
    "schoolFaq1Question",
    "schoolFaq1Answer",
    "schoolFaq2Question",
    "schoolFaq2Answer",
    "schoolFaq3Question",
    "schoolFaq3Answer",
    "schoolFaq4Question",
    "schoolFaq4Answer",
    "schoolFaq5Question",
    "schoolFaq5Answer",
    "schoolFooterNavLabel",
    "schoolFooterDashboard",
    "schoolFooterNote",
    "menuOpenLabel",
    "menuCloseLabel",
    "chatGuideStatus",
    "chatModeGuided",
    "chatModeIsland",
    "chatProgressTitle",
    "chatProgressStep",
    "chatProgressLabel",
    "chatQuestClassroom",
    "chatQuestCurious",
    "chatGreeting",
    "chatPromptLead",
    "chatPromptTeacherTail",
    "chatPromptParentTail",
    "chatFullScreenTitle",
    "chatAgeLabel",
    "chatAgeAria",
    "chatReviewTeacher",
    "chatReviewParent",
    "chatReviewStage",
    "chatTalk",
    "chatDisclaimer",
    "chatJoinIsland",
    "chatBuildSample",
    "diagramMatterAtoms",
    "diagramLivingEnergy",
    "diagramElectricityPath",
    "mentorVoxelImageAlt",
    "assessmentProgressHeading",
    "assessmentExplainModel",
    "assessmentInspectEvidence",
    "assessmentSolveMystery",
    "assessmentInspectPrompt",
    "assessmentMysteryPrompt",
    "courseStartPrompt",
    "puzzlePathTitle",
    "puzzlePathPrompt",
    "puzzlePathDistractor",
    "puzzlePathHint",
    "puzzlePathUnlock",
    "puzzleEvidenceTitle",
    "puzzleEvidencePrompt",
    "puzzleEvidenceChoiceA",
    "puzzleEvidenceChoiceB",
    "puzzleEvidenceChoiceC",
    "puzzleEvidenceHint",
    "puzzleEvidenceUnlock",
    "questionStoryboardLabel",
    "frameCountLabel",
    "questionImageLabel",
    "courseVisualLabel",
    "puzzleStartFeedback",
    "puzzlesUnlockedFeedback",
    "questionUnlockedFeedback",
    "puzzlePreviewAlt",
    "puzzleProgressLabel",
    "puzzleLabel",
    "coursePathUnlocked",
    "coursePathComplete",
    "missionWalkIntro",
    "missionBlockReached",
    "missionMoving",
    "missionIslandSecured",
    "missionCrystalSecured",
    "missionAccessibleLabel",
    "missionCanvasAlt",
    "missionMysteryBlock",
    "missionCrystalLabel",
    "missionLookLeft",
    "missionLookRight",
    "missionWalkMine",
    "missionSecureToStart",
    "guidedSolveToStart",
    "gameExploreIntro",
    "gameBlockReached",
    "gameBlocksRemaining",
    "gameIslandSecured",
    "gameMysterySolved",
    "gameTryAgain",
    "gamePredictionIsland",
    "gameMysteriesLabel",
    "gameCanvasAlt",
    "gameExploreLabel",
    "gameWalkForward",
    "gameStepBack",
    "gameHintLabel",
    "gameRecordEvidence",
    "gameAccessibleInstructions",
    "gameChallenge1Title",
    "gameChallenge1Prompt",
    "gameChallenge1ChoiceA",
    "gameChallenge1ChoiceB",
    "gameChallenge1Hint",
    "gameChallenge2Title",
    "gameChallenge2Prompt",
    "gameChallenge2ChoiceA",
    "gameChallenge2ChoiceB",
    "gameChallenge2Hint",
    "gameChallenge3Title",
    "gameChallenge3Prompt",
    "gameChallenge3ChoiceA",
    "gameChallenge3ChoiceB",
    "gameChallenge3Hint",
    "agentsTryLabel",
    "characterRotateLabel",
    "characterRotateTitle",
    "assessmentRequestParent",
    "assessmentRequestTeacher",
    "copiedLabel",
    "copyCommandLabel",
    "copyActionLabel",
    "codingAgentsLabel",
    "parentStep1Alt",
    "parentStep2Alt",
    "parentStep3Alt",
    "parentStep4Alt",
    "parentStep5Alt"
  ]
};

// server/skills/landing-page-builder/references/wardrobe-twin-copy-schema.json
var wardrobe_twin_copy_schema_default = {
  required: [
    "header.editionLabel",
    "header.subtitle",
    "header.secondaryEditionLabel",
    "header.primaryCtaLabel",
    "hero.eyebrow",
    "hero.heading",
    "hero.body",
    "hero.primaryCtaLabel",
    "hero.secondaryCtaLabel",
    "hero.characterImage",
    "hero.characterAlt",
    "hero.chat.statusLabel",
    "hero.chat.openingMessage",
    "hero.chat.inputPlaceholder",
    "process.kicker",
    "process.heading",
    "process.body",
    "capabilities.kicker",
    "capabilities.heading",
    "capabilities.body",
    "tryOn.kicker",
    "tryOn.heading",
    "tryOn.body",
    "tryOn.beforeImage",
    "tryOn.beforeAlt",
    "tryOn.afterImage",
    "tryOn.afterAlt",
    "tryOn.note",
    "exchange.kicker",
    "exchange.heading",
    "exchange.body",
    "exchange.characterImage",
    "exchange.characterAlt",
    "exchange.approvalTitle",
    "exchange.approvalBody",
    "marketplace.kicker",
    "marketplace.heading",
    "marketplace.body",
    "marketplace.ctaLabel",
    "about.kicker",
    "about.heading",
    "about.body",
    "closing.kicker",
    "closing.heading",
    "closing.body",
    "closing.ctaLabel",
    "footer.tagline",
    "retail.hero.eyebrow",
    "retail.hero.heading",
    "retail.hero.body",
    "retail.hero.primaryCtaLabel",
    "retail.hero.secondaryCtaLabel",
    "retail.cms.kicker",
    "retail.cms.heading",
    "retail.cms.body",
    "retail.terminology.kicker",
    "retail.terminology.heading",
    "retail.terminology.body",
    "retail.personalization.kicker",
    "retail.personalization.heading",
    "retail.personalization.body",
    "retail.closing.kicker",
    "retail.closing.heading",
    "retail.closing.body",
    "retail.closing.ctaLabel"
  ],
  optional: [
    "hero.closingLine",
    "hero.agentsLabel",
    "hero.chat.upload.buildTitle",
    "hero.chat.upload.reviewTitle",
    "hero.chat.upload.stepOne",
    "hero.chat.upload.stepTwo",
    "hero.chat.upload.progressAria",
    "hero.chat.upload.readyMessage",
    "hero.chat.upload.chooseTitle",
    "hero.chat.upload.readyTitle",
    "hero.chat.upload.hint",
    "hero.chat.upload.imageFallback",
    "hero.chat.upload.readyDetail",
    "hero.chat.upload.choosePhoto",
    "hero.chat.upload.takePhoto",
    "hero.chat.upload.replacePhoto",
    "hero.chat.upload.takeAnother",
    "hero.chat.upload.reviewAction",
    "hero.chat.upload.resetAria",
    "statement.ariaLabel",
    "statement.own",
    "statement.tryOn",
    "statement.dress",
    "retail.menu.brandSubtitle",
    "retail.menu.editionsAria",
    "retail.menu.sectionsAria",
    "retail.menu.howItWorks",
    "retail.menu.markets",
    "retail.menu.personalization",
    "retail.menu.pilot",
    "retail.menu.requestPilot",
    "retail.menu.menuAria",
    "retail.markets.kicker",
    "retail.markets.heading",
    "retail.markets.body",
    "retail.markets.imageAlt",
    "retail.markets.catalogEyebrow",
    "retail.markets.catalogHeading",
    "retail.markets.marketLabel",
    "retail.markets.noteTitle",
    "retail.markets.noteBody",
    "retail.surface.carouselAria",
    "retail.surface.railAria",
    "retail.surface.playAria",
    "retail.surface.pauseAria",
    "retail.surface.statementAria",
    "retail.surface.translateLabel",
    "retail.surface.localizeLabel",
    "retail.surface.personalizeLabel",
    "retail.surface.systemKicker",
    "retail.surface.systemHeading",
    "retail.surface.systemBody",
    "retail.surface.stagesAria",
    "retail.surface.liveFromCms",
    "retail.surface.productAlt",
    "retail.surface.signalLanguage",
    "retail.surface.signalMarket",
    "retail.surface.signalIntent",
    "retail.surface.cmsCaption",
    "retail.surface.cmsImageAlt",
    "retail.surface.mockReturning",
    "retail.surface.mockOuterwear",
    "retail.surface.mockRelevant",
    "retail.surface.mockApproved",
    "retail.surface.rolloutCta",
    "retail.surface.pilotKicker",
    "retail.surface.pilotHeading",
    "retail.surface.pilotBody",
    "retail.surface.pilotCta",
    "retail.surface.pilotScope",
    "retail.surface.pilotStorefront",
    "retail.surface.pilotApprover",
    "retail.surface.pilotSource",
    "retail.surface.pilotOutcomeEyebrow",
    "retail.surface.pilotOutcomeBody",
    "retail.surface.pilotImageAlt",
    "retail.surface.footerTagline",
    "retail.surface.footerHome",
    "retail.surface.privacyLabel",
    "retail.surface.privacyNote",
    "retail.form.eyebrow",
    "retail.form.heading",
    "retail.form.body",
    "retail.form.promiseScope",
    "retail.form.promiseStorefront",
    "retail.form.promiseApprover",
    "retail.form.formEyebrow",
    "retail.form.formHeading",
    "retail.form.nameLabel",
    "retail.form.namePlaceholder",
    "retail.form.roleLabel",
    "retail.form.rolePlaceholder",
    "retail.form.companyLabel",
    "retail.form.companyPlaceholder",
    "retail.form.platformLabel",
    "retail.form.platformPlaceholder",
    "retail.form.marketLabel",
    "retail.form.marketPlaceholder",
    "retail.form.contactLabel",
    "retail.form.contactPlaceholder",
    "retail.form.priorityLabel",
    "retail.form.priorityPlaceholder",
    "retail.form.submitLabel",
    "retail.form.submittingLabel",
    "retail.form.note",
    "retail.form.error",
    "retail.form.successEyebrow",
    "retail.form.successHeading",
    "retail.form.successAction"
  ],
  optionalObjects: [
    "hero.chat.upload",
    "statement",
    "retail.menu",
    "retail.markets",
    "retail.surface",
    "retail.form"
  ],
  requiredArrays: {
    "header.navItems": 3,
    "hero.trustItems": 3,
    "hero.chat.suggestions": 3,
    "process.items": 3,
    "exchange.steps": 4,
    "capabilities.items": 4,
    "marketplace.offers": 3,
    "retail.stages": 3,
    "retail.cms.steps": 3,
    "retail.terminology.items": 4,
    "retail.personalization.items": 3
  },
  optionalArrays: {
    "retail.markets.experiences": 4,
    "retail.surface.proofItems": 3
  }
};

// server/src/services/digital-twin-page-git/landing-page-config.util.ts
var LANDING_PAGE_ICON_KEYS = [
  "heart",
  "shield-check",
  "sparkles",
  "chat",
  "users",
  "lock",
  "check",
  "star",
  "search",
  "lightbulb",
  "user-plus",
  "calendar",
  "question-mark",
  "envelope"
];
var ICON_KEYS = new Set(LANDING_PAGE_ICON_KEYS);
var NAV_TARGETS = /* @__PURE__ */ new Set(["meet", "about", "capabilities", "use-cases", "trust", "how-it-works", "stories", "faq", "contact", "roi-calculator"]);
var GROCERY_TARGETS = /* @__PURE__ */ new Set(["top", "product", "mobile", "stories", "features", "about", "contact", "hero-chat", "roi-calculator"]);
var WARDROBE_TARGETS = /* @__PURE__ */ new Set(["top", "how-it-works", "try-on", "exchange", "capabilities", "marketplace", "about", "hero-chat"]);
var EVENT_INTRODUCTION_TARGETS = /* @__PURE__ */ new Set(["top", "about", "how-it-works", "pairings", "faqs", "waitlist", "closing", "hero-chat", "roi-calculator"]);
var HOME_INTRODUCTION_TARGETS = /* @__PURE__ */ new Set(["top", "audience", "privacy", "how-it-works", "proposals", "meet", "hero-chat", "roi-calculator"]);
var LOGISTICS_PORTAL_TARGETS = /* @__PURE__ */ new Set(["top", "edge", "control", "workflows", "pilot", "simulation", "roi-calculator"]);
var CINEMATIC_CAMPAIGN_TARGETS = /* @__PURE__ */ new Set(["workflow", "delivery", "showcase", "features", "tracker", "meet-archer", "fit", "pilot", "hero-intake", "contact", "roi-calculator"]);
var RECRUITING_OPERATIONS_TARGETS = /* @__PURE__ */ new Set(["workflow", "use-cases", "why-lina", "faq", "roi-calculator"]);
var DESIGN_VARIANTS = /* @__PURE__ */ new Set(["industrial-production", "default", "signature", "banking", "form-operations", "logistics-portal", "cinematic-campaigns", "recruiting-operations", "grocery-twin", "wardrobe-twin", "boli-learning", "event-introductions", "home-introductions", "chakri-scrap", "klok", "community-connections"]);
var THEME_PALETTES = /* @__PURE__ */ new Set(["coral", "ocean", "forest", "purple", "slate", "research", "maroon", "stone", "emerald", "custom"]);
var THEME_COLORS = /* @__PURE__ */ new Set(["purple", "indigo", "blue", "green", "orange", "pink", "red", "teal", "gray", "slate", "maroon", "stone", "emerald"]);
var THEME_MODES = /* @__PURE__ */ new Set(["light", "dark"]);
var EMOJI_PATTERN = new RegExp("\\p{Extended_Pictographic}", "u");
var IMAGE_EXTENSION = /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#]|$)/i;
var SAFE_APP_IMAGE_PATH = /^\/(?:assets|landing-pages)\/[a-z0-9][a-z0-9/_-]*\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#]|$)/i;
var VIDEO_EXTENSION = /\.(?:m4v|mov|mp4|webm)(?:[?#]|$)/i;
var SAFE_APP_VIDEO_PATH = /^\/(?:(?:assets|landing-pages)\/[a-z0-9][a-z0-9/_-]*|persona-course-media\/[a-z0-9][a-z0-9-]*\/[a-z0-9][a-z0-9._-]*)\.(?:m4v|mov|mp4|webm)(?:[?#]|$)/i;
var REGION_KEY2 = /^[a-z0-9][a-z0-9-]{0,63}$/;
var COUNTRY_CODE = /^[A-Z]{2}$/;
var SOURCE_REVISION2 = /^[a-f0-9]{64}$/;
var SUPPORTED_LANGUAGES = new Set(languages.map((language) => language.id));
var isRecord3 = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
var isDirectImageSource = (value) => typeof value === "string" && IMAGE_EXTENSION.test(value) && (/^https:\/\//i.test(value) || SAFE_APP_IMAGE_PATH.test(value));
var isDirectVideoSource = (value) => typeof value === "string" && VIDEO_EXTENSION.test(value) && (/^https:\/\//i.test(value) || SAFE_APP_VIDEO_PATH.test(value));
function validateBoliLearningContent(content) {
  const issues = [];
  const prefix = "landingPage.boliLearning";
  const issue = (path, message) => {
    issues.push({ path: `${prefix}${path ? `.${path}` : ""}`, message });
  };
  const record2 = (value, path, keys) => {
    if (!isRecord3(value)) {
      issue(path, "Provide the complete BOLI Learning content object.");
      return false;
    }
    for (const key of Object.keys(value)) if (!keys.includes(key)) issue(path ? `${path}.${key}` : key, "Only registered BOLI Learning content fields are allowed.");
    return true;
  };
  const text2 = (value, path, max = 600) => {
    if (typeof value !== "string" || !value.trim() || value.length > max) issue(path, `Provide text between 1 and ${max} characters.`);
  };
  const strings = (value, path, count) => {
    if (!Array.isArray(value) || value.length !== count) {
      issue(path, `Provide exactly ${count} entries.`);
      return;
    }
    value.forEach((item, index) => text2(item, `${path}[${index}]`));
  };
  if (!record2(content, "", ["contentVersion", "brandName", "tagline", "mascotImage", "avatarImage", "minecraftMascotImage", "minecraftAvatarImage", "logoImage", "islandsImage", "parents", "schools", "copy", "courses", "faq"])) return issues;
  if (content.contentVersion !== void 0 && (!Number.isInteger(content.contentVersion) || Number(content.contentVersion) < 1)) issue("contentVersion", "Use a positive integer content version.");
  text2(content.brandName, "brandName", 80);
  text2(content.tagline, "tagline");
  for (const key of ["mascotImage", "islandsImage"]) if (!isDirectImageSource(content[key])) issue(key, "Use a direct HTTPS or bundled application image URL.");
  for (const key of ["avatarImage", "minecraftMascotImage", "minecraftAvatarImage", "logoImage"]) if (content[key] !== void 0 && !isDirectImageSource(content[key])) issue(key, "Use a direct HTTPS or bundled application image URL.");
  const optionalCopyKeys = boli_learning_copy_schema_default.optional;
  const copyKeys = boli_learning_copy_schema_default.required;
  if (record2(content.copy, "copy", [...copyKeys, ...optionalCopyKeys])) {
    for (const key of copyKeys) text2(content.copy[key], `copy.${key}`);
    for (const key of optionalCopyKeys) if (content.copy[key] !== void 0) text2(content.copy[key], `copy.${key}`);
  }
  const editionKeys = ["eyebrow", "headline", "description", "flagshipQuestion", "flagshipDescription", "learnerLabel", "approvalLabel", "chatQuestion", "chatAnswer", "chartTitle", "chartNote", "createPrompt", "startPrompt"];
  for (const name of ["parents", "schools"]) {
    const edition = content[name];
    if (!record2(edition, name, [...editionKeys, "chartLabels"])) continue;
    for (const key of editionKeys) text2(edition[key], `${name}.${key}`, key.endsWith("Prompt") ? 2e3 : 600);
    strings(edition.chartLabels, `${name}.chartLabels`, 3);
  }
  const courseIds = /* @__PURE__ */ new Set();
  const registeredCourseIds = Number(content.contentVersion || 0) >= 3 ? ["neural", "motion", "living", "electricity"] : ["neural", "motion", "living"];
  if (!Array.isArray(content.courses) || content.courses.length !== registeredCourseIds.length) issue("courses", `Provide the ${registeredCourseIds.length} registered course islands.`);
  else content.courses.forEach((course, index) => {
    const path = `courses[${index}]`;
    if (!record2(course, path, ["id", "title", "island", "subject", "goal", "descriptions", "lessons", "symbol", "color", "ageContent"])) return;
    const id = String(course.id || "");
    if (!registeredCourseIds.includes(id) || courseIds.has(id)) issue(`${path}.id`, `Use ${registeredCourseIds.join(", ")} exactly once.`);
    courseIds.add(id);
    if (!["lavender", "peach", "green", "sky"].includes(String(course.color))) issue(`${path}.color`, "Choose lavender, peach, green, or sky.");
    for (const key of ["title", "island", "subject", "goal"]) text2(course[key], `${path}.${key}`);
    text2(course.symbol, `${path}.symbol`, 8);
    const ages = ["9\u201311", "12\u201314", "15\u201318"];
    if (record2(course.descriptions, `${path}.descriptions`, ages)) for (const age of ages) text2(course.descriptions[age], `${path}.descriptions.${age}`);
    if (!Array.isArray(course.lessons) || course.lessons.length < 1 || course.lessons.length > 6) issue(`${path}.lessons`, "Provide between 1 and 6 lessons.");
    else course.lessons.forEach((lesson, lessonIndex) => text2(lesson, `${path}.lessons[${lessonIndex}]`));
    if (course.ageContent !== void 0 && record2(course.ageContent, `${path}.ageContent`, ages)) {
      for (const age of ages) {
        const entry = course.ageContent[age];
        if (entry === void 0 || !record2(entry, `${path}.ageContent.${age}`, ["title", "island", "subject", "goal", "description", "lessons", "puzzle", "gameTitle", "storyboardImage", "storyboardAlt", "pathImage", "evidenceImage", "introVideo"])) continue;
        for (const key of ["title", "island", "subject", "goal", "description", "gameTitle", "storyboardAlt"]) text2(entry[key], `${path}.ageContent.${age}.${key}`);
        if (!isDirectImageSource(entry.storyboardImage)) issue(`${path}.ageContent.${age}.storyboardImage`, "Use a direct HTTPS or bundled application image URL.");
        if (entry.pathImage !== void 0 && !isDirectImageSource(entry.pathImage)) issue(`${path}.ageContent.${age}.pathImage`, "Use a direct HTTPS or bundled application image URL.");
        if (entry.evidenceImage !== void 0 && !isDirectImageSource(entry.evidenceImage)) issue(`${path}.ageContent.${age}.evidenceImage`, "Use a direct HTTPS or bundled application image URL.");
        if (entry.introVideo !== void 0 && !isDirectVideoSource(entry.introVideo)) issue(`${path}.ageContent.${age}.introVideo`, "Use a direct HTTPS or bundled application video URL.");
        if (!Array.isArray(entry.lessons) || entry.lessons.length < 1 || entry.lessons.length > 6) issue(`${path}.ageContent.${age}.lessons`, "Provide between 1 and 6 lessons.");
        else entry.lessons.forEach((lesson, lessonIndex) => text2(lesson, `${path}.ageContent.${age}.lessons[${lessonIndex}]`));
        if (record2(entry.puzzle, `${path}.ageContent.${age}.puzzle`, ["title", "prompt", "choices", "correct", "hint", "unlockQuestion"])) {
          for (const key of ["title", "prompt", "hint", "unlockQuestion"]) text2(entry.puzzle[key], `${path}.ageContent.${age}.puzzle.${key}`);
          strings(entry.puzzle.choices, `${path}.ageContent.${age}.puzzle.choices`, 3);
          if (!Number.isInteger(entry.puzzle.correct) || Number(entry.puzzle.correct) < 0 || Number(entry.puzzle.correct) > 2) issue(`${path}.ageContent.${age}.puzzle.correct`, "Choose a zero-based answer index from 0 to 2.");
        }
      }
    }
  });
  if (!Array.isArray(content.faq) || content.faq.length < 1 || content.faq.length > 8) issue("faq", "Provide between 1 and 8 questions.");
  else content.faq.forEach((item, index) => {
    const path = `faq[${index}]`;
    if (!record2(item, path, ["question", "answer"])) return;
    text2(item.question, `${path}.question`);
    text2(item.answer, `${path}.answer`, 2e3);
  });
  return issues;
}
var stableValue = (value) => {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!isRecord3(value)) return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, stableValue(value[key])])
  );
};
var getLandingPageRevision = (landingPage) => (0, import_crypto.createHash)("sha256").update(JSON.stringify(stableValue(landingPage ?? null))).digest("hex");
var walkStrings = (value, path, visit) => {
  if (typeof value === "string") {
    visit(value, path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkStrings(item, `${path}[${index}]`, visit));
    return;
  }
  if (isRecord3(value)) {
    Object.entries(value).forEach(([key, item]) => walkStrings(item, path ? `${path}.${key}` : key, visit));
  }
};
var validateAccent = (issues, value, headingKey, accentKey, path) => {
  const heading = value[headingKey];
  const accent = value[accentKey];
  if (typeof accent === "string" && accent && (typeof heading !== "string" || !heading.includes(accent))) {
    issues.push({
      path: `${path}.${accentKey}`,
      message: `Must be an exact substring of ${headingKey}.`
    });
  }
};
var validateLandingPageConfig = (landingPage) => {
  const issues = [];
  if (!isRecord3(landingPage)) {
    return [{ path: "landingPage", message: "Landing page must be an object." }];
  }
  const capability = landingPage.capabilityPreview;
  if (capability !== void 0 && (!isRecord3(capability) || Object.keys(capability).some((key) => !["enabled", "commandId", "presentation"].includes(key)) || typeof capability.enabled !== "boolean" || !/^[a-z][a-z0-9-]{0,63}$/.test(String(capability.commandId || "")) || capability.presentation !== void 0 && !["journey", "surface"].includes(String(capability.presentation)))) {
    issues.push({ path: "landingPage.capabilityPreview", message: "Use enabled, a stable registered commandId, and an optional supported presentation. Triggers, journey code, copy, providers and URLs belong to the command package." });
  }
  const cinematic = isRecord3(landingPage.cinematicCampaigns) ? landingPage.cinematicCampaigns : {};
  const hero = isRecord3(cinematic.hero) ? cinematic.hero : {};
  const campaign = isRecord3(hero.instagramCampaign) ? hero.instagramCampaign : {};
  if (campaign.sourceReview !== void 0) {
    const path = "landingPage.cinematicCampaigns.hero.instagramCampaign.sourceReview";
    const review = isRecord3(campaign.sourceReview) ? campaign.sourceReview : {};
    const keys = ["heading", "body", "identityLabel", "permissionLabel", "permissionQuestion", "changeAccountLabel", "selectionLabel", "logoLabel", "thumbnailLabel", "originalLabel", "profileLabel", "captionLabel", "altTextLabel", "limitedHeading", "noOfferLabel", "languageNotice"];
    if (!isRecord3(campaign.sourceReview) || Object.keys(review).some((key) => ![...keys, "limitations"].includes(key))) issues.push({ path, message: "Use bounded source-review copy only." });
    for (const key of keys) if (typeof review[key] !== "string" || !String(review[key]).trim() || String(review[key]).length > 600) issues.push({ path: `${path}.${key}`, message: "Provide a label of at most 600 characters." });
    if (typeof review.permissionQuestion !== "string" || review.permissionQuestion.split("{accountName}").length !== 2 || /[{}]/.test(review.permissionQuestion.replace("{accountName}", ""))) issues.push({ path: `${path}.permissionQuestion`, message: "Include exactly one literal {accountName} token." });
    const limitations = isRecord3(review.limitations) ? review.limitations : {};
    const codes = ["login_wall", "private_content", "captcha", "thumbnails_only", "captions_unavailable", "media_unavailable", "time_limit"];
    if (Object.keys(limitations).some((code) => !codes.includes(code))) issues.push({ path: `${path}.limitations`, message: "Use only platform limitation codes." });
    for (const code of codes) if (typeof limitations[code] !== "string" || !String(limitations[code]).trim() || String(limitations[code]).length > 600) issues.push({ path: `${path}.limitations.${code}`, message: "Provide a limitation notice of at most 600 characters." });
  }
  if (typeof landingPage.headline !== "string" || !landingPage.headline.trim()) {
    issues.push({ path: "landingPage.headline", message: "Headline is required." });
  }
  const localization = landingPage.localization;
  if (localization !== void 0 && !isRecord3(localization)) {
    issues.push({ path: "landingPage.localization", message: "Localization must be an object." });
  } else if (isRecord3(localization)) {
    const translation = localization.translation;
    if (translation !== void 0 && !isRecord3(translation)) {
      issues.push({ path: "landingPage.localization.translation", message: "Translation settings must be an object." });
    } else if (isRecord3(translation)) {
      validatePublicLandingTranslationSettings(translation).forEach(({ field, message }) => {
        issues.push({ path: `landingPage.localization.translation.${field}`, message });
      });
      if (typeof translation.enabled !== "boolean") issues.push({ path: "landingPage.localization.translation.enabled", message: "Choose whether dynamic translation is enabled." });
      if (!SUPPORTED_LANGUAGES.has(String(translation.sourceLanguage || ""))) issues.push({ path: "landingPage.localization.translation.sourceLanguage", message: "Choose a supported authored language." });
      if (!SUPPORTED_LANGUAGES.has(String(translation.defaultLanguage || ""))) issues.push({ path: "landingPage.localization.translation.defaultLanguage", message: "Choose a supported default language." });
      if (translation.autoDetectCountryLanguage !== void 0 && typeof translation.autoDetectCountryLanguage !== "boolean") {
        issues.push({ path: "landingPage.localization.translation.autoDetectCountryLanguage", message: "Country-language detection must be enabled or disabled." });
      }
      if (translation.generatedTranslations !== void 0 && !Array.isArray(translation.generatedTranslations)) {
        issues.push({ path: "landingPage.localization.translation.generatedTranslations", message: "Generated translations must be an array." });
      } else if (Array.isArray(translation.generatedTranslations)) {
        const generatedKeys = /* @__PURE__ */ new Set();
        translation.generatedTranslations.forEach((generated, generatedIndex) => {
          const generatedPath = `landingPage.localization.translation.generatedTranslations[${generatedIndex}]`;
          if (!isRecord3(generated)) {
            issues.push({ path: generatedPath, message: "Generated translation must be an object." });
            return;
          }
          const language = typeof generated.language === "string" ? generated.language : "";
          const regionKey = typeof generated.regionKey === "string" ? generated.regionKey : "";
          const uniqueKey = `${regionKey}:${language}`;
          if (!SUPPORTED_LANGUAGES.has(language)) issues.push({ path: `${generatedPath}.language`, message: "Choose a supported generated language." });
          if (generated.regionKey !== void 0 && generated.regionKey !== null && !REGION_KEY2.test(regionKey)) issues.push({ path: `${generatedPath}.regionKey`, message: "Use a valid regional page key or null for the default page." });
          if (generatedKeys.has(uniqueKey)) issues.push({ path: generatedPath, message: "Keep only one generated translation per page region and language." });
          generatedKeys.add(uniqueKey);
          if (!SOURCE_REVISION2.test(String(generated.sourceRevision || ""))) issues.push({ path: `${generatedPath}.sourceRevision`, message: "Generated translations require a source SHA-256 revision." });
          const inlinePage = isRecord3(generated.page) ? generated.page : null;
          const hasInlinePage = Boolean(inlinePage);
          const hasAssetPath = generated.assetPath !== void 0;
          if (hasInlinePage && hasAssetPath) {
            issues.push({ path: generatedPath, message: "Generated translation must use either an inline legacy page or one language asset, not both." });
          } else if (hasAssetPath && !isLandingPageTranslationManifestEntry(generated)) {
            issues.push({ path: `${generatedPath}.assetPath`, message: "Use the generated language filename for this language and region." });
          } else if (!hasInlinePage && !hasAssetPath) {
            issues.push({ path: generatedPath, message: "Generated translation requires a language asset path." });
          } else if (inlinePage) {
            if (inlinePage.localization !== void 0) issues.push({ path: `${generatedPath}.page.localization`, message: "Generated pages cannot contain nested localization." });
            const { localization: _nestedLocalization, ...generatedPage } = inlinePage;
            validateLandingPageConfig(generatedPage).forEach((issue) => {
              issues.push({ ...issue, path: issue.path.replace(/^landingPage/, `${generatedPath}.page`) });
            });
          }
          if (generated.chatEmbedConfig !== void 0 && !isRecord3(generated.chatEmbedConfig)) issues.push({ path: `${generatedPath}.chatEmbedConfig`, message: "Generated embed copy must be an object." });
          if (generated.generatedAt !== void 0 && (typeof generated.generatedAt !== "string" || Number.isNaN(Date.parse(generated.generatedAt)))) issues.push({ path: `${generatedPath}.generatedAt`, message: "Generated timestamp must be an ISO date string." });
        });
      }
    }
    const regionAdaptation = localization.regionAdaptation;
    if (regionAdaptation !== void 0) {
      if (!isRecord3(regionAdaptation) || typeof regionAdaptation.enabled !== "boolean") {
        issues.push({ path: "landingPage.localization.regionAdaptation.enabled", message: "Choose whether per-section region adaptation is enabled." });
      } else if (regionAdaptation.enabled && Array.isArray(localization.regionalPages) && localization.regionalPages.length > 0) {
        issues.push({ path: "landingPage.localization.regionalPages", message: "Use per-section region adaptation or complete regional pages, not both." });
      }
    }
    const regionalPages = localization.regionalPages;
    if (regionalPages !== void 0 && !Array.isArray(regionalPages)) {
      issues.push({ path: "landingPage.localization.regionalPages", message: "Regional pages must be an array." });
    } else if (Array.isArray(regionalPages)) {
      const seenRegionKeys = /* @__PURE__ */ new Set();
      const seenCountryCodes = /* @__PURE__ */ new Set();
      regionalPages.forEach((region, regionIndex) => {
        const regionPath = `landingPage.localization.regionalPages[${regionIndex}]`;
        if (!isRecord3(region)) {
          issues.push({ path: regionPath, message: "Regional page entry must be an object." });
          return;
        }
        const key = typeof region.key === "string" ? region.key : "";
        if (!REGION_KEY2.test(key) || seenRegionKeys.has(key)) issues.push({ path: `${regionPath}.key`, message: "Use a unique lowercase key containing letters, numbers, and hyphens." });
        seenRegionKeys.add(key);
        if (typeof region.label !== "string" || !region.label.trim()) issues.push({ path: `${regionPath}.label`, message: "Add a region label." });
        if (!Array.isArray(region.countryCodes) || region.countryCodes.length === 0) {
          issues.push({ path: `${regionPath}.countryCodes`, message: "Choose at least one country." });
        } else {
          const localCountries = /* @__PURE__ */ new Set();
          region.countryCodes.forEach((countryCode, countryIndex) => {
            if (typeof countryCode !== "string" || !COUNTRY_CODE.test(countryCode) || localCountries.has(countryCode) || seenCountryCodes.has(countryCode)) {
              issues.push({ path: `${regionPath}.countryCodes[${countryIndex}]`, message: "Use each uppercase ISO country code in exactly one region." });
            }
            if (typeof countryCode === "string") {
              localCountries.add(countryCode);
              seenCountryCodes.add(countryCode);
            }
          });
        }
        if (!SUPPORTED_LANGUAGES.has(String(region.defaultLanguage || ""))) issues.push({ path: `${regionPath}.defaultLanguage`, message: "Choose a supported regional default language." });
        if (region.sourceLanguage !== void 0 && !SUPPORTED_LANGUAGES.has(String(region.sourceLanguage || ""))) {
          issues.push({ path: `${regionPath}.sourceLanguage`, message: "Choose a supported regional source language." });
        }
        if (region.marketContext !== void 0) {
          if (!isRecord3(region.marketContext)) {
            issues.push({ path: `${regionPath}.marketContext`, message: "Market context must be an object." });
          } else {
            const market = region.marketContext;
            try {
              if (typeof market.locale !== "string" || new Intl.Locale(market.locale).toString() !== market.locale) throw new Error();
            } catch {
              issues.push({ path: `${regionPath}.marketContext.locale`, message: "Use a canonical BCP-47 market locale." });
            }
            const expectedSourcePath = `assets/markets/${key}/landing-page.json`;
            if (market.sourceAssetPath !== expectedSourcePath) {
              issues.push({ path: `${regionPath}.marketContext.sourceAssetPath`, message: `Use ${expectedSourcePath} for this market.` });
            }
            if (!SOURCE_REVISION2.test(String(market.contextRevision || ""))) {
              issues.push({ path: `${regionPath}.marketContext.contextRevision`, message: "Market context requires a SHA-256 revision." });
            }
            if (!Array.isArray(market.protectedTerms) || !market.protectedTerms.every((term) => typeof term === "string" && term.trim())) {
              issues.push({ path: `${regionPath}.marketContext.protectedTerms`, message: "Protected market terms must be non-empty strings." });
            } else if (new Set(market.protectedTerms).size !== market.protectedTerms.length) {
              issues.push({ path: `${regionPath}.marketContext.protectedTerms`, message: "Protected market terms must be unique." });
            }
            if (market.evidence !== void 0 && (!Array.isArray(market.evidence) || !market.evidence.every((item) => isRecord3(item) && typeof item.title === "string" && Boolean(item.title.trim()) && typeof item.url === "string" && /^https:\/\//i.test(item.url)))) {
              issues.push({ path: `${regionPath}.marketContext.evidence`, message: "Market evidence requires a title and HTTPS URL." });
            }
          }
        }
        if (!isRecord3(region.page)) {
          issues.push({ path: `${regionPath}.page`, message: "Add a complete regional landing page." });
          return;
        }
        if (region.page.localization !== void 0) issues.push({ path: `${regionPath}.page.localization`, message: "Regional landing pages cannot contain nested localization." });
        const { localization: _nestedLocalization, ...regionalPage } = region.page;
        validateLandingPageConfig(regionalPage).forEach((issue) => {
          issues.push({ ...issue, path: issue.path.replace(/^landingPage/, `${regionPath}.page`) });
        });
      });
      if (isRecord3(translation) && Array.isArray(translation.generatedTranslations)) {
        translation.generatedTranslations.forEach((generated, generatedIndex) => {
          if (isRecord3(generated) && typeof generated.regionKey === "string" && !seenRegionKeys.has(generated.regionKey)) {
            issues.push({
              path: `landingPage.localization.translation.generatedTranslations[${generatedIndex}].regionKey`,
              message: "Generated translation region must reference an existing regional page."
            });
          }
        });
      }
    }
  }
  if (landingPage.backgroundImage && landingPage.backgroundVideo) {
    issues.push({ path: "landingPage.backgroundImage", message: "Choose a background image or a background video, not both." });
    issues.push({ path: "landingPage.backgroundVideo", message: "Choose a background image or a background video, not both." });
  }
  if (isRecord3(landingPage.seoImage)) {
    const seoImageSrc = landingPage.seoImage.src;
    if (typeof seoImageSrc !== "string" || !seoImageSrc.trim()) {
      issues.push({ path: "landingPage.seoImage.src", message: "Add a share image URL, or remove the SEO image." });
    }
  } else if (landingPage.seoImage !== void 0) {
    issues.push({ path: "landingPage.seoImage", message: "SEO image must be an object with a src URL." });
  }
  if (isRecord3(landingPage.design) && landingPage.design.variant === "chakri-scrap" || landingPage.scrapOperations !== void 0) issues.push(...validateChakriLandingContent(landingPage.scrapOperations));
  if (isRecord3(landingPage.design) && landingPage.design.variant === "community-connections" || landingPage.mirav !== void 0) issues.push(...validateMiravLandingCopy(landingPage.mirav));
  if (isRecord3(landingPage.design) && landingPage.design.variant === "boli-learning" || landingPage.boliLearning !== void 0) issues.push(...validateBoliLearningContent(landingPage.boliLearning));
  const { localization: _localization, ...landingPageWithoutLocalization } = landingPage;
  walkStrings(landingPageWithoutLocalization, "landingPage", (value, path) => {
    if (isMiravPreviewIconPath(path)) return;
    if (EMOJI_PATTERN.test(value.replace(/↔/g, "")) && !path.endsWith(".footer.copyright")) {
      issues.push({ path, message: "Use a supported icon instead of an emoji." });
    }
    const key = path.split(".").pop() || "";
    if ((key === "icon" || key.endsWith(".icon")) && !ICON_KEYS.has(value)) {
      issues.push({ path, message: "Select an icon from the supported icon library." });
    }
    const groceryHeader = isRecord3(landingPage.design) && landingPage.design.variant === "grocery-twin" && path.startsWith("landingPage.header.");
    const wardrobeHeader = isRecord3(landingPage.design) && landingPage.design.variant === "wardrobe-twin" && path.startsWith("landingPage.header.");
    const targets = path.includes(".cinematicCampaigns.") ? CINEMATIC_CAMPAIGN_TARGETS : path.includes(".recruitingOperations.") ? RECRUITING_OPERATIONS_TARGETS : path.includes(".logisticsPortal.") ? LOGISTICS_PORTAL_TARGETS : path.includes(".eventIntroductions.") ? EVENT_INTRODUCTION_TARGETS : path.includes(".homeIntroductions.") ? HOME_INTRODUCTION_TARGETS : path.includes(".wardrobeTwin.") || wardrobeHeader ? WARDROBE_TARGETS : path.includes(".groceryTwin.") || groceryHeader ? GROCERY_TARGETS : NAV_TARGETS;
    if (key === "target" && !targets.has(value)) {
      issues.push({ path, message: "Select a supported landing-page navigation target." });
    }
    if (key === "variant" && !DESIGN_VARIANTS.has(value)) {
      issues.push({ path, message: "Select a supported landing-page variant." });
    }
    if (key === "palette" && !THEME_PALETTES.has(value)) {
      issues.push({ path, message: "Select a supported theme palette." });
    }
    if (key === "defaultThemeMode" && !THEME_MODES.has(value)) {
      issues.push({ path, message: "Select light or dark as the default landing-page theme mode." });
    }
    if (key.endsWith("Color") && !THEME_COLORS.has(value)) {
      issues.push({ path, message: "Select a supported theme color." });
    }
    const isImageField = path === "landingPage.heroCharacterImage" || path.endsWith(".image") || path.endsWith(".poster") || path === "landingPage.backgroundImage.src" || path === "landingPage.seoImage.src";
    if (isImageField && VIDEO_EXTENSION.test(value)) {
      issues.push({ path, message: "Choose an image-compatible asset for this field." });
    }
    if (path === "landingPage.backgroundVideo.src" && IMAGE_EXTENSION.test(value)) {
      issues.push({ path, message: "Choose a video-compatible asset for this field." });
    }
  });
  validateAccent(issues, landingPage, "headline", "headlineAccent", "landingPage");
  for (const sectionKey of ["gallery", "howItWorks", "matchPreview"]) {
    const section = landingPage[sectionKey];
    if (isRecord3(section)) validateAccent(issues, section, "heading", "headingAccent", `landingPage.${sectionKey}`);
  }
  const demo = landingPage.demoConversation;
  if (Array.isArray(demo)) {
    demo.forEach((item, index) => {
      if (!isRecord3(item) || item.role !== "user" && item.role !== "assistant") {
        issues.push({ path: `landingPage.demoConversation[${index}].role`, message: "Role must be user or assistant." });
      }
    });
  }
  const matchPreview = landingPage.matchPreview;
  if (isRecord3(matchPreview) && (!Array.isArray(matchPreview.people) || matchPreview.people.length !== 2)) {
    issues.push({ path: "landingPage.matchPreview.people", message: "Match preview requires exactly two people." });
  }
  const howItWorks = landingPage.howItWorks;
  if (isRecord3(howItWorks) && Array.isArray(howItWorks.steps)) {
    howItWorks.steps.forEach((step, index) => {
      if (!isRecord3(step)) return;
      if (typeof step.image === "string" && step.image.trim() && (typeof step.alt !== "string" || !step.alt.trim())) {
        issues.push({
          path: `landingPage.howItWorks.steps[${index}].alt`,
          message: "Add descriptive alt text for this step image."
        });
      }
    });
  }
  if (isRecord3(landingPage.design) && landingPage.design.variant === "grocery-twin") {
    const grocery = landingPage.groceryTwin;
    if (!isRecord3(grocery)) {
      issues.push({ path: "landingPage.groceryTwin", message: "Complete Grocery Twin content is required for this variant." });
    } else {
      const valueAt = (path) => path.split(".").reduce((value, key) => isRecord3(value) ? value[key] : void 0, grocery);
      for (const [path, count] of [
        ["header.navItems", 5],
        ["hero.trustItems", 4],
        ["hero.chat.suggestions", 3],
        ["product.capabilityLabels", 6],
        ["product.cards", 3],
        ["mobile.items", 4],
        ["features.items", 3],
        ["stories.testimonials", 6],
        ["stories.articles", 3],
        ["about.capabilities", 9],
        ["footer.groups", 2]
      ]) {
        const value = valueAt(path);
        if (!Array.isArray(value) || value.length !== count) issues.push({ path: `landingPage.groceryTwin.${path}`, message: `Use exactly ${count} items for the pinned KAI layout.` });
      }
      const demo2 = valueAt("hero.restockDemo");
      if (!isRecord3(demo2) || demo2.enabled !== true || typeof demo2.commandTrigger !== "string" || !/^\/?[a-z0-9][a-z0-9-]{0,63}$/.test(demo2.commandTrigger)) {
        issues.push({ path: "landingPage.groceryTwin.hero.restockDemo", message: "Configure the enabled registered /restock demonstration." });
      }
      const characterImage = valueAt("hero.characterImage");
      if (typeof characterImage !== "string" || !/^https:\/\//i.test(characterImage) || !IMAGE_EXTENSION.test(characterImage)) {
        issues.push({ path: "landingPage.groceryTwin.hero.characterImage", message: "Use a direct HTTPS character image." });
      }
    }
  }
  if (isRecord3(landingPage.design) && landingPage.design.variant === "wardrobe-twin") {
    const wardrobe = landingPage.wardrobeTwin;
    if (!isRecord3(wardrobe)) {
      issues.push({ path: "landingPage.wardrobeTwin", message: "Complete Wardrobe Twin content is required for this variant." });
    } else {
      const valueAt = (path) => path.split(".").reduce((value, key) => isRecord3(value) ? value[key] : void 0, wardrobe);
      for (const path of [...wardrobe_twin_copy_schema_default.required, ...wardrobe_twin_copy_schema_default.optional]) {
        const value = valueAt(path);
        if (value === void 0 && wardrobe_twin_copy_schema_default.optional.includes(path)) continue;
        if (typeof value !== "string" || !value.trim()) issues.push({ path: `landingPage.wardrobeTwin.${path}`, message: "Provide non-empty Wardrobe Twin copy." });
      }
      for (const path of wardrobe_twin_copy_schema_default.optionalObjects) {
        const value = valueAt(path);
        if (value !== void 0 && !isRecord3(value)) issues.push({ path: `landingPage.wardrobeTwin.${path}`, message: "Provide a Wardrobe Twin content object." });
      }
      for (const [path, count] of Object.entries({ ...wardrobe_twin_copy_schema_default.requiredArrays, ...wardrobe_twin_copy_schema_default.optionalArrays })) {
        const value = valueAt(path);
        if (value === void 0 && Object.prototype.hasOwnProperty.call(wardrobe_twin_copy_schema_default.optionalArrays, path)) continue;
        if (!Array.isArray(value) || value.length !== count) issues.push({ path: `landingPage.wardrobeTwin.${path}`, message: `Use exactly ${count} items for the pinned Cole layout.` });
      }
      const navItems = valueAt("header.navItems");
      if (Array.isArray(navItems)) navItems.forEach((item, index) => {
        if (!isRecord3(item) || !WARDROBE_TARGETS.has(String(item.target || ""))) issues.push({ path: `landingPage.wardrobeTwin.header.navItems[${index}].target`, message: "Choose a registered Wardrobe Twin section." });
      });
      const stages = valueAt("retail.stages");
      if (Array.isArray(stages)) {
        const ids = new Set(stages.map((stage) => isRecord3(stage) ? stage.id : void 0));
        if (ids.size !== 3 || !["language", "region", "person"].every((id) => ids.has(id))) issues.push({ path: "landingPage.wardrobeTwin.retail.stages", message: "Configure language, region, and person exactly once." });
        stages.forEach((stage, index) => {
          if (!isRecord3(stage) || !Array.isArray(stage.bullets) || stage.bullets.length !== 3) issues.push({ path: `landingPage.wardrobeTwin.retail.stages[${index}].bullets`, message: "Use exactly 3 stage benefits." });
        });
      }
      const experiences = valueAt("retail.markets.experiences");
      if (Array.isArray(experiences)) experiences.forEach((experience, index) => {
        if (!isRecord3(experience) || !["NL", "FR", "UK", "IN"].includes(String(experience.code || ""))) issues.push({ path: `landingPage.wardrobeTwin.retail.markets.experiences[${index}].code`, message: "Keep the market code as NL, FR, UK, or IN." });
        if (!isRecord3(experience) || !Array.isArray(experience.details) || experience.details.length !== 3) issues.push({ path: `landingPage.wardrobeTwin.retail.markets.experiences[${index}].details`, message: "Use exactly 3 market details." });
      });
      const characterImage = valueAt("hero.characterImage");
      if (!isDirectImageSource(characterImage)) issues.push({ path: "landingPage.wardrobeTwin.hero.characterImage", message: "Use a direct HTTPS or approved application image URL." });
      const processItems = valueAt("process.items");
      if (Array.isArray(processItems)) processItems.forEach((item, index) => {
        if (!isRecord3(item) || !isRecord3(item.visualVariants)) return;
        for (const variant of ["woman", "man"]) {
          const media = item.visualVariants[variant];
          if (!isRecord3(media) || !isDirectImageSource(media.image)) issues.push({ path: `landingPage.wardrobeTwin.process.items[${index}].visualVariants.${variant}.image`, message: "Use a direct HTTPS or approved application image URL." });
          if (!isRecord3(media) || typeof media.alt !== "string" || !media.alt.trim()) issues.push({ path: `landingPage.wardrobeTwin.process.items[${index}].visualVariants.${variant}.alt`, message: "Describe the modeled visual for assistive technology." });
        }
      });
      const exchangeSteps = valueAt("exchange.steps");
      if (Array.isArray(exchangeSteps)) exchangeSteps.forEach((step, index) => {
        if (!isRecord3(step) || !isRecord3(step.media)) return;
        if (!isDirectImageSource(step.media.image)) issues.push({ path: `landingPage.wardrobeTwin.exchange.steps[${index}].media.image`, message: "Use a direct HTTPS or approved application image URL." });
        if (typeof step.media.alt !== "string" || !step.media.alt.trim()) issues.push({ path: `landingPage.wardrobeTwin.exchange.steps[${index}].media.alt`, message: "Describe the modeled visual for assistive technology." });
      });
    }
  }
  if (isRecord3(landingPage.design) && landingPage.design.variant === "logistics-portal") {
    const logistics = landingPage.logisticsPortal;
    if (!isRecord3(logistics)) {
      issues.push({ path: "landingPage.logisticsPortal", message: "Complete Logistics Portal content is required for this variant." });
    } else {
      const valueAt = (path) => path.split(".").reduce((value, key) => isRecord3(value) ? value[key] : void 0, logistics);
      for (const path of [
        "header.brandLabel",
        "header.brandSuffix",
        "header.logoImage",
        "header.ctaLabel",
        "hero.eyebrow",
        "hero.heading",
        "hero.accentHeading",
        "hero.body",
        "hero.characterImage",
        "hero.rehearsal.commandTrigger",
        "hero.rehearsal.loginNotice",
        "edge.heading",
        "edge.body",
        "platform.heading",
        "platform.body",
        "process.heading",
        "process.body",
        "workflows.heading",
        "workflows.body",
        "pilot.heading",
        "pilot.body",
        "pilot.email",
        "footer.tagline",
        "footer.copyright"
      ]) {
        const value = valueAt(path);
        if (typeof value !== "string" || !value.trim()) {
          issues.push({ path: `landingPage.logisticsPortal.${path}`, message: "Complete this required Logistics Portal field." });
        }
      }
      for (const [path, count] of [
        ["header.navItems", 3],
        ["hero.proofItems", 3],
        ["hero.chat.suggestions", 3],
        ["hero.rehearsal.workflowTabs", 2],
        ["hero.rehearsal.samples", 2],
        ["hero.rehearsal.intakeSteps", 4],
        ["hero.rehearsal.approvedChecks", 3],
        ["edge.governedSystems", 4],
        ["edge.portals", 2],
        ["edge.comparison", 2],
        ["edge.capabilities", 4],
        ["platform.fields", 3],
        ["platform.points", 4],
        ["process.steps", 6],
        ["workflows.primary", 2],
        ["workflows.more", 4],
        ["pilot.steps", 3]
      ]) {
        const value = valueAt(path);
        if (!Array.isArray(value) || value.length !== count) {
          issues.push({ path: `landingPage.logisticsPortal.${path}`, message: `Use exactly ${count} items for the pinned Emil layout.` });
        }
      }
      const demo2 = valueAt("hero.rehearsal");
      if (!isRecord3(demo2) || demo2.enabled !== true || typeof demo2.commandTrigger !== "string" || !/^\/?[a-z0-9][a-z0-9-]{0,63}$/.test(demo2.commandTrigger)) {
        issues.push({ path: "landingPage.logisticsPortal.hero.rehearsal", message: "Configure the enabled registered customs-filing rehearsal." });
      }
      const samples = valueAt("hero.rehearsal.samples");
      if (Array.isArray(samples)) {
        samples.forEach((sample, index) => {
          if (!isRecord3(sample)) return;
          for (const key of ["runReference", "title", "lane", "source", "destination", "mapped", "receipt"]) {
            if (typeof sample[key] !== "string" || !sample[key].trim()) {
              issues.push({ path: `landingPage.logisticsPortal.hero.rehearsal.samples[${index}].${key}`, message: "Complete this pinned sample-shipment field." });
            }
          }
          if (sample.fields !== void 0) {
            if (!Array.isArray(sample.fields) || sample.fields.length !== 5) {
              issues.push({ path: `landingPage.logisticsPortal.hero.rehearsal.samples[${index}].fields`, message: "Use exactly 5 mapped portal fields." });
            } else {
              sample.fields.forEach((field, fieldIndex) => {
                if (!isRecord3(field) || typeof field.label !== "string" || !field.label.trim() || typeof field.value !== "string" || !field.value.trim()) {
                  issues.push({ path: `landingPage.logisticsPortal.hero.rehearsal.samples[${index}].fields[${fieldIndex}]`, message: "Complete the mapped field label and value." });
                } else if (!["verified", "review"].includes(String(field.state))) {
                  issues.push({ path: `landingPage.logisticsPortal.hero.rehearsal.samples[${index}].fields[${fieldIndex}].state`, message: "Choose verified or review." });
                }
              });
            }
          }
        });
      }
      for (const [path, image] of [
        ["header.logoImage", valueAt("header.logoImage")],
        ["hero.characterImage", valueAt("hero.characterImage")],
        ["hero.portraitImage", valueAt("hero.portraitImage")]
      ]) {
        if (path === "hero.portraitImage" && image === void 0) continue;
        if (!isDirectImageSource(image)) {
          issues.push({ path: `landingPage.logisticsPortal.${path}`, message: "Use a direct HTTPS or bundled application image URL." });
        }
      }
    }
  }
  if (isRecord3(landingPage.design) && landingPage.design.variant === "event-introductions") {
    const eventIntroductions = landingPage.eventIntroductions;
    if (!isRecord3(eventIntroductions)) {
      issues.push({ path: "landingPage.eventIntroductions", message: "Complete Event Introductions content is required for this variant." });
    } else {
      const valueAt = (path) => path.split(".").reduce((value, key) => isRecord3(value) ? value[key] : void 0, eventIntroductions);
      for (const [path, count] of [
        ["header.navItems", 4],
        ["tracks", 3],
        ["hero.chat.suggestedPrompts", 3],
        ["hero.briefDemo.fields", 9],
        ["about.images", 3],
        ["about.principles", 3],
        ["process.steps", 4],
        ["pairing.images", 2],
        ["pairing.criteria", 3],
        ["pairing.cards", 3],
        ["faq.items", 6],
        ["footer.groups", 2]
      ]) {
        const value = valueAt(path);
        if (!Array.isArray(value) || value.length !== count) issues.push({ path: `landingPage.eventIntroductions.${path}`, message: `Use exactly ${count} items for the pinned Lane layout.` });
      }
      const demo2 = valueAt("hero.briefDemo");
      if (!isRecord3(demo2) || demo2.enabled !== true || typeof demo2.commandTrigger !== "string" || !/^\/?[a-z0-9][a-z0-9-]{0,63}$/.test(demo2.commandTrigger)) {
        issues.push({ path: "landingPage.eventIntroductions.hero.briefDemo", message: "Configure the enabled registered introduction brief demonstration." });
      }
      for (const path of ["hero.characterImage", "faq.characterImage", "closing.characterImage"]) {
        const image = valueAt(path);
        if (typeof image !== "string" || !/^https:\/\//i.test(image) || !IMAGE_EXTENSION.test(image)) issues.push({ path: `landingPage.eventIntroductions.${path}`, message: "Use a direct HTTPS character image." });
      }
    }
  }
  if (isRecord3(landingPage.design) && landingPage.design.variant === "home-introductions") {
    const homeIntroductions = landingPage.homeIntroductions;
    if (!isRecord3(homeIntroductions)) {
      issues.push({ path: "landingPage.homeIntroductions", message: "Complete Home Introductions content is required for this variant." });
    } else {
      const valueAt = (path) => path.split(".").reduce((value, key) => isRecord3(value) ? value[key] : void 0, homeIntroductions);
      for (const [path, count] of [
        ["header.navItems", 3],
        ["service.configurations", 2],
        ["tracks", 2],
        ["hero.headingLines", 3],
        ["audience.forItems", 2],
        ["audience.notForItems", 3],
        ["privacy.stages", 3],
        ["proposals.cards", 2],
        ["meet.principles", 3],
        ["footer.groups", 2]
      ]) {
        const value = valueAt(path);
        if (!Array.isArray(value) || value.length !== count) {
          issues.push({ path: `landingPage.homeIntroductions.${path}`, message: `Use exactly ${count} items for the pinned Nest layout.` });
        }
      }
      const demo2 = valueAt("hero.briefDemo");
      if (!isRecord3(demo2) || demo2.enabled !== true || typeof demo2.commandTrigger !== "string" || !/^\/?[a-z0-9][a-z0-9-]{0,63}$/.test(demo2.commandTrigger)) {
        issues.push({ path: "landingPage.homeIntroductions.hero.briefDemo", message: "Configure the enabled registered /request-introduction demonstration." });
      }
      const configurations = valueAt("service.configurations");
      const modes = Array.isArray(configurations) ? configurations.map((item) => isRecord3(item) ? item.mode : void 0) : [];
      if (modes.length !== 2 || new Set(modes).size !== 2 || !modes.includes("event") || !modes.includes("city")) {
        issues.push({ path: "landingPage.homeIntroductions.service.configurations", message: "Configure event and city exactly once." });
      }
      const tracks = valueAt("tracks");
      const trackIds = Array.isArray(tracks) ? tracks.map((item) => isRecord3(item) ? item.id : void 0) : [];
      if (trackIds.length !== 2 || new Set(trackIds).size !== 2 || !trackIds.includes("buying") || !trackIds.includes("selling")) {
        issues.push({ path: "landingPage.homeIntroductions.tracks", message: "Configure buying and selling exactly once." });
      }
      if (Array.isArray(tracks)) {
        tracks.forEach((track, trackIndex) => {
          if (!isRecord3(track) || typeof track.responseMessage !== "string" || !track.responseMessage.trim()) {
            issues.push({ path: `landingPage.homeIntroductions.tracks[${trackIndex}].responseMessage`, message: "Add the progressive chat response for this track." });
          }
          if (!isRecord3(track) || !Array.isArray(track.processSteps) || track.processSteps.length !== 3) {
            issues.push({ path: `landingPage.homeIntroductions.tracks[${trackIndex}].processSteps`, message: "Use exactly three character-led process steps." });
            return;
          }
          track.processSteps.forEach((step, stepIndex) => {
            if (!isRecord3(step)) {
              issues.push({ path: `landingPage.homeIntroductions.tracks[${trackIndex}].processSteps[${stepIndex}]`, message: "Complete this character-led process step." });
              return;
            }
            for (const key of ["number", "title", "body", "alt"]) {
              if (typeof step[key] !== "string" || !step[key].trim()) issues.push({ path: `landingPage.homeIntroductions.tracks[${trackIndex}].processSteps[${stepIndex}].${key}`, message: "Complete this character-led process step." });
            }
            if (!isDirectImageSource(step.image)) issues.push({ path: `landingPage.homeIntroductions.tracks[${trackIndex}].processSteps[${stepIndex}].image`, message: "Use a direct HTTPS or bundled application character image." });
          });
          issues.push(...validateRoiCalculator({
            roiCalculator: track.roiCalculator,
            pathPrefix: `landingPage.homeIntroductions.tracks[${trackIndex}].roiCalculator`
          }));
        });
      }
      for (const path of ["hero.backgroundImage", "hero.characterImage", "meet.characterImage"]) {
        const image = valueAt(path);
        if (!isDirectImageSource(image)) {
          issues.push({ path: `landingPage.homeIntroductions.${path}`, message: "Use a direct HTTPS or bundled application image URL with a supported extension." });
        }
      }
      const legal = [valueAt("service.disclaimer"), valueAt("footer.disclaimer")].filter((value) => typeof value === "string").join(" ").toLowerCase();
      for (const [label, alternatives] of [
        ["brokerage", ["not a broker", "not a licensed brokerage"]],
        ["representation", ["not a real estate agent", "does not represent"]],
        ["valuation", ["not a valuer", "does not value", "does not provide valuation", "value your home"]],
        ["negotiation", ["not a negotiator", "does not negotiate", ", negotiate"]]
      ]) {
        if (!alternatives.some((copy) => legal.includes(copy))) {
          issues.push({ path: "landingPage.homeIntroductions.footer.disclaimer", message: `Required real-estate ${label} boundary is missing.` });
        }
      }
    }
  }
  issues.push(...validateRoiCalculator({ roiCalculator: landingPage.roiCalculator }));
  issues.push(...validateRoiCalculator({ roiCalculator: isRecord3(landingPage.groceryTwin) ? landingPage.groceryTwin.homeRoiCalculator : void 0, pathPrefix: "landingPage.groceryTwin.homeRoiCalculator" }));
  return issues;
};
var createDefaultLandingPageConfig = ({
  pageName,
  brandImageUrl
}) => ({
  design: {
    variant: "default",
    defaultThemeMode: "light",
    theme: { palette: "emerald", primaryColor: "emerald", secondaryColor: "green", accentColor: "teal" }
  },
  localization: {
    translation: {
      enabled: true,
      sourceLanguage: "en",
      defaultLanguage: "en",
      autoDetectCountryLanguage: true,
      generatedTranslations: []
    },
    regionalPages: []
  },
  header: {
    brandMark: brandImageUrl ? "image" : "initial",
    navItems: [
      { label: "About", target: "about" },
      { label: "How it works", target: "how-it-works" },
      { label: "FAQs", target: "faq" }
    ],
    ctaLabel: `Meet ${pageName}`
  },
  badge: "Meet your AI guide",
  headline: `Meet ${pageName}`,
  subheadline: `Talk with ${pageName} and get thoughtful, personalized help.`,
  ctaLabel: `Talk to ${pageName}`,
  secondaryCtaLabel: "See how it works",
  featureTags: ["Private by design", "Available anytime"],
  demoConversation: [{ role: "assistant", text: `Hi, I'm ${pageName}. How can I help?` }],
  heroChat: {
    statusLabel: "Online",
    inputPlaceholder: `Ask ${pageName} anything...`,
    suggestedPrompts: ["How does this work?", "Help me get started"]
  },
  features: [
    { icon: "chat", title: "Start with a conversation", body: "Share what matters in your own words." },
    { icon: "sparkles", title: "Get thoughtful guidance", body: "Receive a focused next step based on your needs." },
    { icon: "shield-check", title: "Stay in control", body: "Your choices and privacy remain yours." }
  ],
  howItWorks: {
    icon: "sparkles",
    kicker: "How it works",
    heading: "A simple path forward",
    steps: [
      { icon: "chat", title: "Talk", body: "Tell us what you need." },
      { icon: "search", title: "Explore", body: "Review a relevant, thoughtful response." },
      { icon: "check", title: "Choose", body: "Continue only when it feels right." }
    ]
  },
  faqs: [
    { question: "How do I get started?", answer: `Use the chat to talk with ${pageName}.` },
    { question: "Is my information private?", answer: "Your information is handled according to the platform privacy policy." }
  ],
  faqIntro: { icon: "question-mark", kicker: "FAQs", heading: "Questions, answered" },
  closing: {
    kicker: "Ready when you are",
    heading: `Start a conversation with ${pageName}`,
    ctaLabel: `Talk to ${pageName}`
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LANDING_PAGE_ICON_KEYS,
  createDefaultLandingPageConfig,
  getLandingPageRevision,
  validateLandingPageConfig
});
