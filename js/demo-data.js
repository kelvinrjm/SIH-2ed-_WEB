/**
 * SL: Geospatial Land Intelligence Platform
 * SIH26013 - Automated Integration and Intelligent Harmonization of Multi-source Geospatial Data
 * Module: Demo Data Store (Offline-Ready & Resilient)
 */

window.SL_DEMO = (function() {
  'use strict';

  // Demo Parcels GeoJSON Collection (Fictional Madurai Urban Sector: Ward 12 & 13)
  const parcelsGeoJSON = {
    type: "FeatureCollection",
    name: "SL_Parcels_Madurai_Demo",
    features: [
      {
        type: "Feature",
        id: "TN-MDU-000124",
        properties: {
          id: "TN-MDU-000124",
          surveyNumber: "S-124/3",
          oldSurveyNumber: "124/3A",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1245.0,
          cadastralArea: 1200.0,
          municipalArea: 1175.0,
          gnssArea: 1245.0,
          landUse: "Residential",
          status: "Officer Verified",
          confidence: 94.6,
          owner: "R. Sundararaman & S. Meenakshi",
          taxAssessmentNo: "TX-2026-8841",
          roadAccess: "12m Tar Road (East)",
          utilities: ["Water Supply", "UGD Drainage", "TANGEDCO Electric", "Fiber Optic"],
          sourceLineage: {
            boundary: "Cadastral + GNSS Hybrid",
            area: "GNSS CORS Verified",
            landUse: "Municipal GIS Tax Register",
            building: "Drone ORI 2026 (5cm)",
            verification: "Ground Truth GT-2026-009"
          },
          history: [
            { date: "2024-02-11", event: "Legacy Cadastral digitization (1:2000)" },
            { date: "2025-08-19", event: "Municipal Tax Layer integration" },
            { date: "2026-01-14", event: "High-Res Drone ORI Survey (5cm GSD)" },
            { date: "2026-02-18", event: "AI Harmonization & Conflict Detection" },
            { date: "2026-03-02", event: "Field Ground-Truthing Completed (GT-2026-009)" },
            { date: "2026-03-05", event: "Officer Verification Approved by RDO Madurai" }
          ]
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1182, 9.9248], [78.1192, 9.9249], [78.1191, 9.9241], [78.1181, 9.9240], [78.1182, 9.9248]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000125",
        properties: {
          id: "TN-MDU-000125",
          surveyNumber: "S-124/4",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 980.0,
          cadastralArea: 960.0,
          municipalArea: 980.0,
          gnssArea: 980.0,
          landUse: "Commercial",
          status: "Verified",
          confidence: 92.1,
          owner: "V. K. Traders LLP",
          taxAssessmentNo: "TX-2026-8842",
          roadAccess: "18m Main Arterial Road",
          utilities: ["Commercial Power", "Water Supply", "UGD"],
          sourceLineage: {
            boundary: "Drone ORI + Cadastral",
            area: "Municipal GIS",
            landUse: "Municipal Survey",
            building: "Drone Footprint",
            verification: "Field Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1193, 9.9249], [78.1202, 9.9250], [78.1201, 9.9242], [78.1192, 9.9241], [78.1193, 9.9249]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000126",
        properties: {
          id: "TN-MDU-000126",
          surveyNumber: "S-124/5",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1420.0,
          cadastralArea: 1420.0,
          municipalArea: 1390.0,
          gnssArea: 1419.0,
          landUse: "Residential",
          status: "Conflict Detected",
          confidence: 78.4,
          owner: "P. M. Alagappan",
          taxAssessmentNo: "TX-2026-8843",
          roadAccess: "9m Cross Street",
          utilities: ["TANGEDCO Electric", "Water Supply"],
          sourceLineage: {
            boundary: "Cadastral Map",
            area: "Discrepancy (Cadastral vs Municipal)",
            landUse: "Residential",
            building: "Drone ORI",
            verification: "Pending Officer Review"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1203, 9.9250], [78.1214, 9.9251], [78.1213, 9.9243], [78.1202, 9.9242], [78.1203, 9.9250]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000127",
        properties: {
          id: "TN-MDU-000127",
          surveyNumber: "S-125/1",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1850.0,
          cadastralArea: 1850.0,
          municipalArea: 1850.0,
          gnssArea: 1850.0,
          landUse: "Public / Institutional",
          status: "Verified",
          confidence: 97.2,
          owner: "Madurai Municipal Corporation (Community Hall)",
          taxAssessmentNo: "TX-EXEMPT-004",
          roadAccess: "18m Main Road",
          utilities: ["All Municipal Services"],
          sourceLineage: {
            boundary: "Total Station Survey",
            area: "CORS Fixed",
            landUse: "Municipal Asset Register",
            building: "As-Built Certified",
            verification: "Town Planning Certified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1181, 9.9239], [78.1195, 9.9240], [78.1194, 9.9228], [78.1180, 9.9227], [78.1181, 9.9239]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000128",
        properties: {
          id: "TN-MDU-000128",
          surveyNumber: "S-125/2",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1150.0,
          cadastralArea: 1120.0,
          municipalArea: 1150.0,
          gnssArea: 1150.0,
          landUse: "Commercial",
          status: "Ground Truth Required",
          confidence: 81.3,
          owner: "K. Balakrishnan",
          taxAssessmentNo: "TX-2026-8846",
          roadAccess: "9m North Street",
          utilities: ["Electric", "Water Supply"],
          sourceLineage: {
            boundary: "Drone Boundary Extracted",
            area: "Unverified Edge",
            landUse: "Field Inspection Needed",
            building: "New Construction Detected 2026",
            verification: "Ground Truthing Assigned"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1196, 9.9240], [78.1205, 9.9241], [78.1204, 9.9229], [78.1195, 9.9228], [78.1196, 9.9240]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000129",
        properties: {
          id: "TN-MDU-000129",
          surveyNumber: "S-125/3",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 890.0,
          cadastralArea: 890.0,
          municipalArea: 890.0,
          gnssArea: 890.0,
          landUse: "Residential",
          status: "Verified",
          confidence: 95.8,
          owner: "G. Dhanalakshmi Ammal",
          taxAssessmentNo: "TX-2026-8847",
          roadAccess: "6m Internal Lane",
          utilities: ["Water Supply", "Electric"],
          sourceLineage: {
            boundary: "Cadastral + Revenue Harmonized",
            area: "Revenue Patta Record",
            landUse: "Residential",
            building: "Roof Footprint Verified",
            verification: "Officer Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1206, 9.9241], [78.1215, 9.9242], [78.1214, 9.9232], [78.1205, 9.9230], [78.1206, 9.9241]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000130",
        properties: {
          id: "TN-MDU-000130",
          surveyNumber: "S-126/1",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 2400.0,
          cadastralArea: 2400.0,
          municipalArea: 2350.0,
          gnssArea: 2400.0,
          landUse: "Commercial",
          status: "Officer Verified",
          confidence: 96.5,
          owner: "Sri Meenakshi Textiles Warehouse",
          taxAssessmentNo: "TX-2026-8848",
          roadAccess: "24m Ring Road Connector",
          utilities: ["HT Power", "Commercial Water", "UGD"],
          sourceLineage: {
            boundary: "Survey of India CORS Integrated",
            area: "DGPS Field Boundary",
            landUse: "Town Planning Commercial Zone",
            building: "LiDAR Building Footprint",
            verification: "Joint Committee Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1216, 9.9251], [78.1232, 9.9252], [78.1230, 9.9238], [78.1215, 9.9237], [78.1216, 9.9251]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000131",
        properties: {
          id: "TN-MDU-000131",
          surveyNumber: "S-126/2",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 760.0,
          cadastralArea: 760.0,
          municipalArea: 760.0,
          gnssArea: 760.0,
          landUse: "Residential",
          status: "Verified",
          confidence: 93.4,
          owner: "J. Mariappan",
          taxAssessmentNo: "TX-2026-8850",
          roadAccess: "6m Street",
          utilities: ["Water", "Drainage", "Electricity"],
          sourceLineage: {
            boundary: "Cadastral FMB",
            area: "Revenue Patta Record",
            landUse: "Residential",
            building: "Drone Footprint",
            verification: "Revenue Inspector Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1215, 9.9236], [78.1224, 9.9236], [78.1223, 9.9228], [78.1214, 9.9228], [78.1215, 9.9236]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000132",
        properties: {
          id: "TN-MDU-000132",
          surveyNumber: "S-126/3",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1100.0,
          cadastralArea: 1050.0,
          municipalArea: 1100.0,
          gnssArea: 1100.0,
          landUse: "Residential",
          status: "Conflict Detected",
          confidence: 76.5,
          owner: "N. Senthil Kumar",
          taxAssessmentNo: "TX-2026-8851",
          roadAccess: "6m Street",
          utilities: ["Water", "Electricity"],
          sourceLineage: {
            boundary: "Overlap with S-126/4",
            area: "Discrepancy (50 sq.m)",
            landUse: "Residential",
            building: "Encroachment Check Needed",
            verification: "In Conflict Queue"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1225, 9.9236], [78.1235, 9.9237], [78.1234, 9.9227], [78.1224, 9.9226], [78.1225, 9.9236]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000133",
        properties: {
          id: "TN-MDU-000133",
          surveyNumber: "S-127/1",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 3100.0,
          cadastralArea: 3100.0,
          municipalArea: 3100.0,
          gnssArea: 3100.0,
          landUse: "Agricultural / Peri-Urban",
          status: "Verified",
          confidence: 96.0,
          owner: "Chidambaram Pillai Heirs",
          taxAssessmentNo: "TX-AGRI-019",
          roadAccess: "Cart Track / Agricultural Canal Bund",
          utilities: ["Borewell Electricity"],
          sourceLineage: {
            boundary: "Revenue Cadastral Sheet 4",
            area: "Settlement Register Area",
            landUse: "Paddy Field / Coconut Grove",
            building: "None",
            verification: "Survey Dept Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1180, 9.9226], [78.1198, 9.9227], [78.1196, 9.9212], [78.1179, 9.9211], [78.1180, 9.9226]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000134",
        properties: {
          id: "TN-MDU-000134",
          surveyNumber: "S-127/2",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 2900.0,
          cadastralArea: 2900.0,
          municipalArea: 2900.0,
          gnssArea: 2900.0,
          landUse: "Public Park & Water Retention",
          status: "Verified",
          confidence: 98.2,
          owner: "Public Works Dept (Water Resources)",
          taxAssessmentNo: "TX-EXEMPT-009",
          roadAccess: "Bund Road",
          utilities: ["Rainwater Catchment", "Sluice Gate"],
          sourceLineage: {
            boundary: "Water Body Cadastral Delimitation",
            area: "Revenue Survey Fixed",
            landUse: "Poramboke (Water Course)",
            building: "None (Protected Zone)",
            verification: "PWD & Revenue Certified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1199, 9.9227], [78.1218, 9.9228], [78.1216, 9.9213], [78.1197, 9.9212], [78.1199, 9.9227]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000135",
        properties: {
          id: "TN-MDU-000135",
          surveyNumber: "S-127/3",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1650.0,
          cadastralArea: 1650.0,
          municipalArea: 1650.0,
          gnssArea: 1650.0,
          landUse: "Institutional",
          status: "Officer Verified",
          confidence: 95.1,
          owner: "Government Primary Health Centre",
          taxAssessmentNo: "TX-EXEMPT-012",
          roadAccess: "12m South Cross Road",
          utilities: ["Dedicated 3-Phase Power", "RO Water", "UGD"],
          sourceLineage: {
            boundary: "Municipal Health Cadastre",
            area: "TSLR Record",
            landUse: "Healthcare / Public",
            building: "PHC Ward & Quarters Footprint",
            verification: "Collectorate Land Branch Approved"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1219, 9.9228], [78.1234, 9.9229], [78.1232, 9.9215], [78.1217, 9.9214], [78.1219, 9.9228]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000136",
        properties: {
          id: "TN-MDU-000136",
          surveyNumber: "S-128/1",
          ward: "Ward 13",
          village: "Teppakulam East",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1320.0,
          cadastralArea: 1320.0,
          municipalArea: 1320.0,
          gnssArea: 1320.0,
          landUse: "Residential",
          status: "Verified",
          confidence: 94.0,
          owner: "M. Ramanathan & Family",
          taxAssessmentNo: "TX-2026-8901",
          roadAccess: "10m Avenue",
          utilities: ["All Municipal Connections"],
          sourceLineage: {
            boundary: "Town Survey Land Record (TSLR)",
            area: "TSLR Sheet 14",
            landUse: "Residential Layout",
            building: "Drone ORI Footprint",
            verification: "Surveyor Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1170, 9.9248], [78.1181, 9.9248], [78.1180, 9.9238], [78.1169, 9.9238], [78.1170, 9.9248]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000137",
        properties: {
          id: "TN-MDU-000137",
          surveyNumber: "S-128/2",
          ward: "Ward 13",
          village: "Teppakulam East",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1540.0,
          cadastralArea: 1490.0,
          municipalArea: 1540.0,
          gnssArea: 1540.0,
          landUse: "Commercial",
          status: "Officer Verified",
          confidence: 91.8,
          owner: "Madura Super Auto Spares",
          taxAssessmentNo: "TX-2026-8902",
          roadAccess: "18m Ring Road",
          utilities: ["Commercial Power", "Water", "Drainage"],
          sourceLineage: {
            boundary: "AI Spatial Match + GNSS",
            area: "Municipal Tax Record",
            landUse: "Automobile Commercial",
            building: "Steel Structure Footprint",
            verification: "Officer Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1169, 9.9237], [78.1180, 9.9237], [78.1179, 9.9226], [78.1168, 9.9226], [78.1169, 9.9237]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000138",
        properties: {
          id: "TN-MDU-000138",
          surveyNumber: "S-128/3",
          ward: "Ward 13",
          village: "Teppakulam East",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1780.0,
          cadastralArea: 1780.0,
          municipalArea: 1780.0,
          gnssArea: 1780.0,
          landUse: "Residential",
          status: "Verified",
          confidence: 96.1,
          owner: "S. Govindaraj & G. Revathi",
          taxAssessmentNo: "TX-2026-8903",
          roadAccess: "10m Avenue",
          utilities: ["Water Supply", "UGD Drainage", "Electricity"],
          sourceLineage: {
            boundary: "TSLR Sheet 14 + CORS",
            area: "Revenue Patta Verified",
            landUse: "Residential",
            building: "Independent House (G+1)",
            verification: "Officer Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1168, 9.9225], [78.1179, 9.9225], [78.1178, 9.9212], [78.1167, 9.9212], [78.1168, 9.9225]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000139",
        properties: {
          id: "TN-MDU-000139",
          surveyNumber: "S-129/1",
          ward: "Ward 13",
          village: "Teppakulam East",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1410.0,
          cadastralArea: 1410.0,
          municipalArea: 1410.0,
          gnssArea: 1410.0,
          landUse: "Residential",
          status: "Verified",
          confidence: 95.0,
          owner: "Dr. K. Annamalai",
          taxAssessmentNo: "TX-2026-8905",
          roadAccess: "12m Avenue",
          utilities: ["Water", "Electric", "Drainage"],
          sourceLineage: {
            boundary: "Cadastral + GNSS",
            area: "GNSS Verified",
            landUse: "Residential",
            building: "Villa Footprint",
            verification: "Survey Inspector Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1155, 9.9248], [78.1168, 9.9248], [78.1167, 9.9238], [78.1154, 9.9238], [78.1155, 9.9248]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000140",
        properties: {
          id: "TN-MDU-000140",
          surveyNumber: "S-129/2",
          ward: "Ward 13",
          village: "Teppakulam East",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1620.0,
          cadastralArea: 1620.0,
          municipalArea: 1620.0,
          gnssArea: 1620.0,
          landUse: "Commercial",
          status: "Verified",
          confidence: 94.3,
          owner: "Kavitha Poly Clinic & Diagnostics",
          taxAssessmentNo: "TX-2026-8906",
          roadAccess: "18m Main Road",
          utilities: ["All Municipal Utilities"],
          sourceLineage: {
            boundary: "Town Planning Cadastre",
            area: "CORS Verified",
            landUse: "Commercial Clinic",
            building: "G+3 Building Footprint",
            verification: "Officer Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1154, 9.9237], [78.1167, 9.9237], [78.1166, 9.9225], [78.1153, 9.9225], [78.1154, 9.9237]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000141",
        properties: {
          id: "TN-MDU-000141",
          surveyNumber: "S-130/1",
          ward: "Ward 13",
          village: "Teppakulam East",
          taluk: "Madurai South",
          district: "Madurai",
          area: 2150.0,
          cadastralArea: 2150.0,
          municipalArea: 2150.0,
          gnssArea: 2150.0,
          landUse: "Educational",
          status: "Verified",
          confidence: 97.5,
          owner: "St. Xavier Higher Secondary School Trust",
          taxAssessmentNo: "TX-EXEMPT-018",
          roadAccess: "18m Road Frontage",
          utilities: ["High Capacity Water", "Commercial Power", "Playground Area"],
          sourceLineage: {
            boundary: "Revenue FMB + CORS",
            area: "Registered Title Extent",
            landUse: "School Institution",
            building: "Institutional Blocks (A, B, C)",
            verification: "Joint Committee Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1153, 9.9224], [78.1166, 9.9224], [78.1165, 9.9210], [78.1152, 9.9210], [78.1153, 9.9224]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000142",
        properties: {
          id: "TN-MDU-000142",
          surveyNumber: "S-130/2",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1280.0,
          cadastralArea: 1280.0,
          municipalArea: 1280.0,
          gnssArea: 1280.0,
          landUse: "Residential",
          status: "Verified",
          confidence: 95.4,
          owner: "T. Muthuraman",
          taxAssessmentNo: "TX-2026-8910",
          roadAccess: "9m Road",
          utilities: ["Water", "Electric"],
          sourceLineage: {
            boundary: "Cadastral",
            area: "Revenue Patta",
            landUse: "Residential",
            building: "Drone ORI Footprint",
            verification: "Officer Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1233, 9.9252], [78.1245, 9.9252], [78.1244, 9.9242], [78.1232, 9.9242], [78.1233, 9.9252]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000143",
        properties: {
          id: "TN-MDU-000143",
          surveyNumber: "S-130/3",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1350.0,
          cadastralArea: 1350.0,
          municipalArea: 1350.0,
          gnssArea: 1350.0,
          landUse: "Residential",
          status: "Verified",
          confidence: 93.9,
          owner: "R. Kannan & Sons",
          taxAssessmentNo: "TX-2026-8912",
          roadAccess: "9m Road",
          utilities: ["Water", "Electric", "Drainage"],
          sourceLineage: {
            boundary: "Cadastral",
            area: "TSLR",
            landUse: "Residential",
            building: "Residential Footprint",
            verification: "Officer Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1232, 9.9241], [78.1244, 9.9241], [78.1243, 9.9230], [78.1231, 9.9230], [78.1232, 9.9241]]]
        }
      },
      {
        type: "Feature",
        id: "TN-MDU-000144",
        properties: {
          id: "TN-MDU-000144",
          surveyNumber: "S-130/4",
          ward: "Ward 12",
          village: "Anuppanadi",
          taluk: "Madurai South",
          district: "Madurai",
          area: 1980.0,
          cadastralArea: 1980.0,
          municipalArea: 1980.0,
          gnssArea: 1980.0,
          landUse: "Commercial",
          status: "Verified",
          confidence: 96.2,
          owner: "Pandian Cold Storage & Agro Logistics",
          taxAssessmentNo: "TX-2026-8915",
          roadAccess: "24m Ring Road",
          utilities: ["Commercial HT", "Water", "UGD"],
          sourceLineage: {
            boundary: "CORS Survey",
            area: "Title Deed Exact",
            landUse: "Commercial Agro Logistics",
            building: "Steel Shed & Processing Plant",
            verification: "Joint Inspection Verified"
          }
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1235, 9.9229], [78.1248, 9.9230], [78.1246, 9.9215], [78.1233, 9.9214], [78.1235, 9.9229]]]
        }
      }
    ]
  };

  // Building Footprints GeoJSON
  const buildingsGeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { id: "BLD-001", parcelId: "TN-MDU-000124", floors: 2, height: 7.2, type: "Residential Villa" },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1184, 9.9246], [78.1189, 9.9246], [78.1188, 9.9243], [78.1183, 9.9243], [78.1184, 9.9246]]]
        }
      },
      {
        type: "Feature",
        properties: { id: "BLD-002", parcelId: "TN-MDU-000125", floors: 3, height: 11.5, type: "Commercial Retail" },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1194, 9.9247], [78.1200, 9.9247], [78.1199, 9.9243], [78.1193, 9.9243], [78.1194, 9.9247]]]
        }
      },
      {
        type: "Feature",
        properties: { id: "BLD-003", parcelId: "TN-MDU-000127", floors: 1, height: 5.5, type: "Community Hall" },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1183, 9.9237], [78.1192, 9.9237], [78.1191, 9.9231], [78.1182, 9.9231], [78.1183, 9.9237]]]
        }
      },
      {
        type: "Feature",
        properties: { id: "BLD-004", parcelId: "TN-MDU-000128", floors: 2, height: 8.0, type: "New Commercial RCC (2026)" },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1198, 9.9238], [78.1203, 9.9238], [78.1202, 9.9232], [78.1197, 9.9232], [78.1198, 9.9238]]]
        }
      },
      {
        type: "Feature",
        properties: { id: "BLD-005", parcelId: "TN-MDU-000130", floors: 1, height: 6.8, type: "Textile Warehouse" },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1218, 9.9249], [78.1230, 9.9249], [78.1228, 9.9240], [78.1217, 9.9240], [78.1218, 9.9249]]]
        }
      },
      {
        type: "Feature",
        properties: { id: "BLD-006", parcelId: "TN-MDU-000135", floors: 2, height: 7.5, type: "PHC Hospital Building" },
        geometry: {
          type: "Polygon",
          coordinates: [[[78.1221, 9.9226], [78.1231, 9.9226], [78.1230, 9.9218], [78.1220, 9.9218], [78.1221, 9.9226]]]
        }
      }
    ]
  };

  // GNSS / CORS Station Points
  const gnssStations = [
    { id: "CORS-MDU-01", name: "Madurai Collectorate Geodetic Node", lat: 9.9258, lng: 78.1205, elevation: 134.2, accuracy: "±0.008m", status: "Active (RTK Online)", timestamp: "2026-03-22 13:45" },
    { id: "CORS-MDU-02", name: "Anuppanadi Municipal Water Tower Node", lat: 9.9228, lng: 78.1195, elevation: 138.6, accuracy: "±0.009m", status: "Active (RTK Online)", timestamp: "2026-03-22 13:45" },
    { id: "CORS-MDU-03", name: "Teppakulam Benchmark Station", lat: 9.9245, lng: 78.1165, elevation: 132.1, accuracy: "±0.007m", status: "Active (RTK Online)", timestamp: "2026-03-22 13:45" },
    { id: "CORS-MDU-04", name: "Ring Road Interchange CORS Point", lat: 9.9215, lng: 78.1240, elevation: 130.4, accuracy: "±0.010m", status: "Active (RTK Online)", timestamp: "2026-03-22 13:45" },
    { id: "CORS-MDU-05", name: "South Taluk Survey Monument", lat: 9.9262, lng: 78.1172, elevation: 135.0, accuracy: "±0.008m", status: "Active (RTK Online)", timestamp: "2026-03-22 13:45" }
  ];

  // Registered Government Datasets
  const datasets = [
    {
      id: "DS-2026-001",
      name: "Revenue Cadastral Map (FMB Digitize)",
      department: "Revenue Department",
      type: "Cadastral",
      format: "Shapefile ZIP",
      uploadDate: "2026-01-10",
      surveyDate: "2024-02-11",
      crs: "EPSG:32644 (UTM 44N)",
      featureCount: 4820,
      quality: 89.2,
      status: "Processed",
      fileSize: "14.2 MB",
      description: "Digitized Field Measurement Books (FMB) covering Madurai South Taluk Ward 12 & 13."
    },
    {
      id: "DS-2026-002",
      name: "High-Resolution Drone Orthomosaic (ORI)",
      department: "Survey Department",
      type: "Drone / ORI",
      format: "GeoTIFF",
      uploadDate: "2026-01-28",
      surveyDate: "2026-01-14",
      crs: "EPSG:32644 (UTM 44N)",
      featureCount: 6150,
      quality: 98.4,
      status: "Processed",
      fileSize: "412.5 MB",
      description: "5cm Ground Sampling Distance (GSD) drone orthomosaic imagery captured under urban survey modernization."
    },
    {
      id: "DS-2026-003",
      name: "Municipal GIS Property Tax Register Layer",
      department: "Municipal Administration",
      type: "Municipal GIS",
      format: "GeoJSON",
      uploadDate: "2026-02-04",
      surveyDate: "2025-08-19",
      crs: "EPSG:4326 (WGS84)",
      featureCount: 4238,
      quality: 93.0,
      status: "Processed",
      fileSize: "8.7 MB",
      description: "Property assessment polygons linked with municipal tax collection and utility meter connection IDs."
    },
    {
      id: "DS-2026-004",
      name: "GNSS / CORS Continuous Geodetic Network",
      department: "Survey Department",
      type: "GNSS / CORS",
      format: "CSV / GeoJSON",
      uploadDate: "2026-02-15",
      surveyDate: "2026-02-12",
      crs: "EPSG:4326 (WGS84)",
      featureCount: 840,
      quality: 99.1,
      status: "Processed",
      fileSize: "2.1 MB",
      description: "Real-time kinematic geodetic boundary benchmark points calibrated against Survey of India CORS network."
    },
    {
      id: "DS-2026-005",
      name: "Urban Building Footprints Extraction (AI)",
      department: "GIS Administration",
      type: "Building Footprints",
      format: "GeoJSON",
      uploadDate: "2026-02-20",
      surveyDate: "2026-01-20",
      crs: "EPSG:4326 (WGS84)",
      featureCount: 5890,
      quality: 94.7,
      status: "Processed",
      fileSize: "11.4 MB",
      description: "Rooftop boundary polygons extracted from Drone ORI via deep learning building segmentation model."
    },
    {
      id: "DS-2026-006",
      name: "LiDAR Digital Surface & Terrain Model (DSM/DTM)",
      department: "GIS Administration",
      type: "DSM / DTM",
      format: "GeoTIFF",
      uploadDate: "2026-02-25",
      surveyDate: "2026-01-18",
      crs: "EPSG:32644 (UTM 44N)",
      featureCount: 3200,
      quality: 96.5,
      status: "Processed",
      fileSize: "680.0 MB",
      description: "High-density airborne LiDAR point cloud derived digital elevation and surface heights for drainage modeling."
    },
    {
      id: "DS-2026-007",
      name: "Town Planning Master Plan 2035 Zoning",
      department: "Urban Planning",
      type: "Zoning Cadastre",
      format: "KML / KMZ",
      uploadDate: "2026-03-01",
      surveyDate: "2025-11-30",
      crs: "EPSG:4326 (WGS84)",
      featureCount: 210,
      quality: 95.0,
      status: "Processed",
      fileSize: "5.4 MB",
      description: "Master plan statutory land-use zoning classifications (Residential, Commercial, Mixed, Industrial, Open Space)."
    },
    {
      id: "DS-2026-008",
      name: "Underground Drainage & Water Utility Network",
      department: "Municipal Administration",
      type: "Utilities GIS",
      format: "GeoJSON",
      uploadDate: "2026-03-04",
      surveyDate: "2025-12-15",
      crs: "EPSG:4326 (WGS84)",
      featureCount: 1840,
      quality: 91.5,
      status: "Processed",
      fileSize: "4.8 MB",
      description: "Municipal pipeline corridors, manhole nodes, and water distribution mains with right-of-way buffers."
    },
    {
      id: "DS-2026-009",
      name: "Ground Truthing Field Campaign Batch 4",
      department: "Department of Land Resources",
      type: "Ground Truth",
      format: "GeoJSON",
      uploadDate: "2026-03-12",
      surveyDate: "2026-03-08",
      crs: "EPSG:4326 (WGS84)",
      featureCount: 156,
      quality: 97.8,
      status: "Processed",
      fileSize: "1.8 MB",
      description: "Tablet-assisted georeferenced field photo verifications and mobile survey submissions."
    },
    {
      id: "DS-2026-010",
      name: "Revenue Settlement 'A' Register Patta Ledger",
      department: "Revenue Department",
      type: "Revenue Ledger",
      format: "CSV",
      uploadDate: "2026-03-15",
      surveyDate: "2025-09-10",
      crs: "Tabular",
      featureCount: 12842,
      quality: 92.4,
      status: "Processed",
      fileSize: "3.5 MB",
      description: "Official Jamabandi revenue registry containing patta owner names, classification, and recorded land extent."
    }
  ];

  // Conflicts Catalog
  const conflicts = [
    {
      id: "CONF-2026-001",
      parcelId: "TN-MDU-000126",
      surveyNumber: "S-124/5",
      conflictType: "Area Discrepancy",
      severity: "Critical",
      datasetsInvolved: ["Revenue Cadastral", "Municipal GIS", "Drone ORI"],
      description: "Multi-source area discrepancy detected. Cadastral records 1,420 sq.m while Municipal Property Tax register records 1,390 sq.m (30 sq.m deviation).",
      cadastralValue: "1,420 sq.m",
      municipalValue: "1,390 sq.m",
      gnssValue: "1,418.5 sq.m (CORS)",
      droneValue: "1,419.0 sq.m (ORI)",
      aiRecommendation: "GNSS CORS and Drone ORI high-precision spatial boundary indicate 1,419 sq.m. Municipal assessment appears un-surveyed estimate. Recommend updating Municipal record to 1,419 sq.m upon officer verification.",
      spatialEvidence: "Boundary overlap on northern compound wall with road margin buffer.",
      confidence: 94.2,
      status: "Pending Review",
      assignedOfficer: "K. Meenakshi Sundaram (RDO)",
      createdAt: "2026-03-14"
    },
    {
      id: "CONF-2026-002",
      parcelId: "TN-MDU-000132",
      surveyNumber: "S-126/3",
      conflictType: "Boundary Overlap",
      severity: "Critical",
      datasetsInvolved: ["Cadastral FMB", "Town Planning Cadastre", "Drone ORI"],
      description: "Cadastral boundary overlaps parcel S-126/4 by 3.2 meters along eastern perimeter, affecting 48 sq.m.",
      cadastralValue: "Polygon bounds E: 78.1235",
      municipalValue: "Polygon bounds E: 78.1233",
      gnssValue: "Ground survey peg at 78.12338",
      droneValue: "Physical boundary wall at 78.12337",
      aiRecommendation: "Drone imagery clearly identifies physical compound wall constructed in 2021 matching GNSS marker. AI proposes boundary snapping to physical wall.",
      spatialEvidence: "Overlapping polygon strip between S-126/3 and S-126/4.",
      confidence: 91.5,
      status: "Pending Review",
      assignedOfficer: "S. Thangaraj (Tahsildar)",
      createdAt: "2026-03-16"
    },
    {
      id: "CONF-2026-003",
      parcelId: "TN-MDU-000128",
      surveyNumber: "S-125/2",
      conflictType: "Unapproved Construction / Land-Use Mismatch",
      severity: "High",
      datasetsInvolved: ["Town Planning Zoning", "Drone ORI", "Municipal GIS"],
      description: "Town Planning record designates parcel as Vacant Residential Plot, but 2026 Drone ORI reveals 2-storey commercial RCC building (420 sq.m footprint).",
      cadastralValue: "Vacant Land (Nil building)",
      municipalValue: "Residential (Old structure)",
      gnssValue: "G+2 Commercial Showroom",
      droneValue: "Active commercial retail occupancy",
      aiRecommendation: "Flagged for field ground-truthing to verify planning approval and commercial tax assessment classification.",
      spatialEvidence: "Rooftop commercial signage and HVAC units detected via computer vision.",
      confidence: 88.0,
      status: "Ground Truth Required",
      assignedOfficer: "M. Senthamizhan (City Planner)",
      createdAt: "2026-03-18"
    },
    {
      id: "CONF-2026-004",
      parcelId: "TN-MDU-000124",
      surveyNumber: "S-124/3",
      conflictType: "Road Encroachment Warning",
      severity: "Medium",
      datasetsInvolved: ["Municipal Road GIS", "Drone ORI"],
      description: "Frontage perimeter hedge encroaches 0.6m into the 12m Municipal Right-of-Way reservation line.",
      cadastralValue: "12m Road reservation clear",
      municipalValue: "0.6m Encroachment reported",
      gnssValue: "0.58m deviation at Gate Pillar",
      droneValue: "Perimeter green hedge over curb",
      aiRecommendation: "Hedge is removable garden barrier; official masonry structure remains within cadastral setback.",
      spatialEvidence: "Sub-meter buffer intersection on East road boundary.",
      confidence: 95.3,
      status: "Resolved",
      assignedOfficer: "K. Meenakshi Sundaram (RDO)",
      createdAt: "2026-03-02"
    },
    {
      id: "CONF-2026-005",
      parcelId: "TN-MDU-000137",
      surveyNumber: "S-128/2",
      conflictType: "Area Discrepancy",
      severity: "Medium",
      datasetsInvolved: ["Revenue Patta Ledger", "Municipal GIS"],
      description: "Patta record states 1,490 sq.m whereas Municipal Tax GIS mapped extent measures 1,540 sq.m (50 sq.m variance).",
      cadastralValue: "1,490 sq.m",
      municipalValue: "1,540 sq.m",
      gnssValue: "1,540 sq.m",
      droneValue: "1,538.5 sq.m",
      aiRecommendation: "Field expansion occurred after municipal road realignment in 2018. GNSS confirms 1,540 sq.m.",
      spatialEvidence: "Additional triangular strip incorporated from decommissioned canal bund.",
      confidence: 92.8,
      status: "Resolved",
      assignedOfficer: "S. Thangaraj (Tahsildar)",
      createdAt: "2026-03-10"
    },
    {
      id: "CONF-2026-006",
      parcelId: "TN-MDU-000130",
      surveyNumber: "S-126/1",
      conflictType: "Subdivision Identifier Mismatch",
      severity: "Low",
      datasetsInvolved: ["Jamabandi Ledger", "Survey Cadastre"],
      description: "Legacy record references subdivision as 'S-126/1A' while new spatial cadastre unifies it under 'S-126/1'.",
      cadastralValue: "S-126/1",
      municipalValue: "S-126/1A",
      gnssValue: "S-126/1",
      droneValue: "Single unified industrial compound",
      aiRecommendation: "Automated attribute alias mapping harmonizes S-126/1A into S-126/1.",
      spatialEvidence: "Single perimeter boundary with no internal demarcation walls.",
      confidence: 97.4,
      status: "Resolved",
      assignedOfficer: "R. Selvaraj (GIS Analyst)",
      createdAt: "2026-03-08"
    },
    {
      id: "CONF-2026-007",
      parcelId: "TN-MDU-000133",
      surveyNumber: "S-127/1",
      conflictType: "Zoning Transition / Peri-Urban Conversion",
      severity: "High",
      datasetsInvolved: ["Revenue Patta", "Town Planning Master Plan"],
      description: "Revenue record classifies land as Wet Agricultural (NanJai), while Master Plan classifies area as Mixed Residential Development Zone.",
      cadastralValue: "Wet Agricultural",
      municipalValue: "Un-assessed",
      gnssValue: "Inactive Agriculture",
      droneValue: "Plotted Layout Demarcation (Gravel roads laid)",
      aiRecommendation: "Requires layout conversion regularization certificate (NOC) from Directorate of Town and Country Planning (DTCP).",
      spatialEvidence: "Internal layout roads visible in Drone ORI.",
      confidence: 89.6,
      status: "Under Investigation",
      assignedOfficer: "M. Senthamizhan (City Planner)",
      createdAt: "2026-03-19"
    }
  ];

  // Ground Truthing Tasks
  const surveys = [
    {
      id: "GT-2026-009",
      parcelId: "TN-MDU-000124",
      surveyNumber: "S-124/3",
      status: "Verified",
      assignedOfficer: "K. Meenakshi Sundaram (RDO)",
      surveyDate: "2026-03-02",
      gpsCoords: { latitude: 9.92482, longitude: 78.11865, accuracy: 0.45 },
      observedBoundary: "Reinforced masonry boundary wall with compound gate. All physical pegs matched geodetic coordinates.",
      observedLandUse: "Residential (G+1 Villa)",
      photoUrl: "assets/images/survey_mdu_124.jpg",
      notes: "Field boundary confirmed with adjoining patta holders. Road margin respected.",
      syncStatus: "synced"
    },
    {
      id: "GT-2026-010",
      parcelId: "TN-MDU-000128",
      surveyNumber: "S-125/2",
      status: "In Progress",
      assignedOfficer: "S. Thangaraj (Tahsildar)",
      surveyDate: "2026-03-21",
      gpsCoords: { latitude: 9.92348, longitude: 78.12001, accuracy: 0.8 },
      observedBoundary: "Corner pillars located. Height verification in progress.",
      observedLandUse: "Commercial Multi-Storey Retail",
      photoUrl: "assets/images/survey_mdu_128.jpg",
      notes: "Planning permit verification ongoing with Municipal Corporation zonal office.",
      syncStatus: "synced"
    },
    {
      id: "GT-2026-011",
      parcelId: "TN-MDU-000132",
      surveyNumber: "S-126/3",
      status: "Pending",
      assignedOfficer: "R. Selvaraj (GIS Analyst)",
      surveyDate: "2026-03-23",
      gpsCoords: { latitude: 9.92315, longitude: 78.12295, accuracy: 1.2 },
      observedBoundary: "Pending physical site inspection for boundary overlap with S-126/4.",
      observedLandUse: "Residential",
      photoUrl: "",
      notes: "Joint inspection scheduled with Revenue Inspector and municipal surveyor.",
      syncStatus: "synced"
    },
    {
      id: "GT-2026-012",
      parcelId: "TN-MDU-000133",
      surveyNumber: "S-127/1",
      status: "Submitted",
      assignedOfficer: "M. Senthamizhan (City Planner)",
      surveyDate: "2026-03-20",
      gpsCoords: { latitude: 9.92190, longitude: 78.11885, accuracy: 0.6 },
      observedBoundary: "Unapproved layout stone pegs planted. Gravel roads formed.",
      observedLandUse: "Peri-Urban Plotted Layout (Under Regularization)",
      photoUrl: "assets/images/survey_mdu_133.jpg",
      notes: "Submitted to RDO for DTCP layout scrutiny and conversion fee assessment.",
      syncStatus: "synced"
    }
  ];

  // Citizen Requests
  const requests = [
    {
      id: "REQ-2026-0042",
      type: "Record Correction",
      parcelId: "TN-MDU-000124",
      surveyNumber: "S-124/3",
      description: "Request to update municipal tax assessment area from 1,175 sq.m to CORS GNSS verified area 1,245 sq.m.",
      applicant: "R. Sundararaman",
      mobile: "+91 98402 12345",
      email: "user@sl.demo",
      date: "2026-03-01",
      status: "Approved",
      history: [
        { step: "Submitted", date: "2026-03-01 10:15", done: true },
        { step: "Under Review", date: "2026-03-01 14:30", done: true },
        { step: "Field Verification", date: "2026-03-02 11:00", done: true },
        { step: "Approved", date: "2026-03-05 16:20", done: true }
      ]
    },
    {
      id: "REQ-2026-0043",
      type: "Boundary Verification",
      parcelId: "TN-MDU-000126",
      surveyNumber: "S-124/5",
      description: "Discrepancy in northern boundary fence with neighbor S-124/6. Requesting joint CORS demarcation.",
      applicant: "P. M. Alagappan",
      mobile: "+91 94431 55678",
      email: "alagappan@demo.org",
      date: "2026-03-15",
      status: "Under Review",
      history: [
        { step: "Submitted", date: "2026-03-15 09:40", done: true },
        { step: "Under Review", date: "2026-03-16 11:20", done: true },
        { step: "Field Verification", date: "Pending", done: false },
        { step: "Approved", date: "Pending", done: false }
      ]
    },
    {
      id: "REQ-2026-0044",
      type: "Land Information Request",
      parcelId: "TN-MDU-000129",
      surveyNumber: "S-125/3",
      description: "Certified copy of integrated GIS boundary map with CORS geodetic reference coordinates.",
      applicant: "G. Dhanalakshmi Ammal",
      mobile: "+91 98840 99881",
      email: "dhanalakshmi@demo.org",
      date: "2026-03-18",
      status: "Field Verification",
      history: [
        { step: "Submitted", date: "2026-03-18 14:10", done: true },
        { step: "Under Review", date: "2026-03-19 10:05", done: true },
        { step: "Field Verification", date: "2026-03-21 15:00", done: true },
        { step: "Approved", date: "Pending", done: false }
      ]
    }
  ];

  // Change Detection Records (2024 to 2026 Temporal Analysis)
  const changes = [
    {
      id: "CHG-2026-01",
      parcelId: "TN-MDU-000128",
      type: "New Building Construction",
      description: "Commercial multi-storey building (420 sq.m footprint, G+2) constructed between 2024 and 2026.",
      changeYear: "2026",
      baselineYear: "2024",
      areaDelta: "+420 sq.m (Built-up)",
      status: "Case Created",
      actionNeeded: "Verify Building Permit & Municipal Assessment"
    },
    {
      id: "CHG-2026-02",
      parcelId: "TN-MDU-000137",
      type: "Boundary Realignment",
      description: "Western perimeter expanded by 50 sq.m following canal bund decommission and arterial road straightening.",
      changeYear: "2025",
      baselineYear: "2024",
      areaDelta: "+50 sq.m (Parcel)",
      status: "Confirmed",
      actionNeeded: "Regularized under Town Survey Revision"
    },
    {
      id: "CHG-2026-03",
      parcelId: "TN-MDU-000133",
      type: "Land-Use Transition",
      description: "Agricultural paddy parcel transformed into plotted layout layout with gravel roads laid.",
      changeYear: "2026",
      baselineYear: "2024",
      areaDelta: "3,100 sq.m (Conversion)",
      status: "Under Review",
      actionNeeded: "Scrutinize DTCP Conversion Sanction"
    },
    {
      id: "CHG-2026-04",
      parcelId: "TN-MDU-000124",
      type: "Demolition & Reconstruction",
      description: "Old tiled roof shed replaced with RCC residential villa and solar rooftop panel installation.",
      changeYear: "2025",
      baselineYear: "2024",
      areaDelta: "+115 sq.m (Built-up)",
      status: "Confirmed",
      actionNeeded: "Building Footprint Updated in Drone ORI"
    }
  ];

  // System Notifications
  const notifications = [
    { id: "NOTIF-01", title: "Dataset processing completed", message: "High-Resolution Drone Orthomosaic (ORI) successfully integrated (6,150 features).", time: "10 mins ago", unread: true, target: "datasets" },
    { id: "NOTIF-02", title: "Critical Conflict detected", message: "Parcel TN-MDU-000126 has 30 sq.m area discrepancy between Cadastral and Municipal records.", time: "45 mins ago", unread: true, target: "conflicts" },
    { id: "NOTIF-03", title: "Ground Truthing survey submitted", message: "Field verification GT-2026-012 for S-127/1 submitted by Officer M. Senthamizhan.", time: "2 hours ago", unread: true, target: "surveys" },
    { id: "NOTIF-04", title: "Citizen request received", message: "New boundary verification request REQ-2026-0043 submitted for Ward 12.", time: "4 hours ago", unread: false, target: "review" },
    { id: "NOTIF-05", title: "Parcel verification approved", message: "Parcel TN-MDU-000124 successfully certified as Officer Verified.", time: "Yesterday", unread: false, target: "parcels" }
  ];

  // Audit Logs
  const auditLogs = [
    { id: "AUD-108", user: "officer@sl.gov.in", role: "GIS Officer", action: "Dataset uploaded", parcel: "-", dataset: "High-Resolution Drone Orthomosaic (ORI)", timestamp: "2026-03-22 10:30:15", status: "Success" },
    { id: "AUD-109", user: "officer@sl.gov.in", role: "GIS Officer", action: "AI processing completed", parcel: "-", dataset: "DS-2026-002", timestamp: "2026-03-22 10:35:48", status: "Success" },
    { id: "AUD-110", user: "officer@sl.gov.in", role: "GIS Officer", action: "Conflict reviewed & assigned", parcel: "TN-MDU-000126", dataset: "Cadastral / Municipal", timestamp: "2026-03-22 11:15:20", status: "In Progress" },
    { id: "AUD-111", user: "officer@sl.gov.in", role: "GIS Officer", action: "Parcel approved (Officer Verified)", parcel: "TN-MDU-000124", dataset: "Integrated Harmonized Record", timestamp: "2026-03-22 12:05:11", status: "Completed" },
    { id: "AUD-112", user: "user@sl.demo", role: "Citizen User", action: "Request submitted", parcel: "TN-MDU-000124", dataset: "Correction Request", timestamp: "2026-03-22 12:40:02", status: "Submitted" }
  ];

  // AI Harmonization Demo Attributes
  const attributeMappings = [
    { sourceField: "SURVEY_NO", targetField: "surveyNumber", confidence: 98.4, sampleValue: "S-124/3", status: "Approved" },
    { sourceField: "EXTENT_SQM", targetField: "area", confidence: 96.8, sampleValue: "1245.0", status: "Approved" },
    { sourceField: "PROP_ID", targetField: "id", confidence: 99.1, sampleValue: "TN-MDU-000124", status: "Approved" },
    { sourceField: "LAND_USE_DESC", targetField: "landUse", confidence: 94.2, sampleValue: "Residential", status: "Approved" },
    { sourceField: "PATTA_HOLDER", targetField: "owner", confidence: 92.5, sampleValue: "R. Sundararaman", status: "Approved" },
    { sourceField: "TAX_ASSESS_NO", targetField: "taxAssessmentNo", confidence: 95.0, sampleValue: "TX-2026-8841", status: "Pending" }
  ];

  // AI Topology Validation Issues
  const topologyIssues = [
    { id: "TOP-01", type: "Overlapping Parcels", parcelId: "TN-MDU-000132 & S-126/4", severity: "High", extent: "48.2 sq.m overlap", status: "Detected", autoFixable: true },
    { id: "TOP-02", type: "Boundary Gap / Sliver Polygon", parcelId: "TN-MDU-000125 & S-124/5", severity: "Medium", extent: "0.8m sliver gap along road margin", status: "Detected", autoFixable: true },
    { id: "TOP-03", type: "Self-Intersecting Geometry", parcelId: "TN-MDU-000128 (West Vertex)", severity: "Medium", extent: "Node 14 duplicate vertex", status: "Corrected", autoFixable: true },
    { id: "TOP-04", type: "Road Right-of-Way Buffer Encroachment", parcelId: "TN-MDU-000124", severity: "Low", extent: "0.6m perimeter fence setback", status: "Ignored", autoFixable: false }
  ];

  return {
    parcelsGeoJSON,
    buildingsGeoJSON,
    gnssStations,
    datasets,
    conflicts,
    surveys,
    requests,
    changes,
    notifications,
    auditLogs,
    attributeMappings,
    topologyIssues
  };
})();
