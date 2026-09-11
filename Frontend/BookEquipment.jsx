import React, { useMemo, useState } from "react";

const equipmentList = [
  {
    id: 1,
    name: "Mahindra 575 DI Tractor",
    category: "Tractors",
    location: "Kanchipuram",
    price: 850,
    unit: "hour",
    rating: 4.8,
    reviews: 124,
    owner: "Sri Agro Services",
    icon: "🚜",
    description:
      "55 HP tractor suitable for ploughing, cultivation, transportation and general farm work.",
    available: true,
  },
  {
    id: 2,
    name: "John Deere 5310",
    category: "Tractors",
    location: "Chengalpattu",
    price: 1100,
    unit: "hour",
    rating: 4.9,
    reviews: 98,
    owner: "Green Field Equipment",
    icon: "🚜",
    description:
      "Reliable 55 HP tractor suitable for heavy-duty agricultural operations.",
    available: true,
  },
  {
    id: 3,
    name: "Swaraj 744 FE",
    category: "Tractors",
    location: "Sriperumbudur",
    price: 950,
    unit: "hour",
    rating: 4.7,
    reviews: 87,
    owner: "Kisan Machinery",
    icon: "🚜",
    description:
      "Versatile tractor suitable for tilling, sowing, spraying and transportation.",
    available: true,
  },
  {
    id: 4,
    name: "6 Feet Rotavator",
    category: "Tillage",
    location: "Kanchipuram",
    price: 650,
    unit: "hour",
    rating: 4.7,
    reviews: 76,
    owner: "Tamil Nadu Farm Rentals",
    icon: "⚙️",
    description:
      "Heavy-duty rotavator designed for soil preparation and field cultivation.",
    available: true,
  },
  {
    id: 5,
    name: "Power Tiller",
    category: "Tillage",
    location: "Chengalpattu",
    price: 550,
    unit: "hour",
    rating: 4.6,
    reviews: 63,
    owner: "AgriTech Rentals",
    icon: "🔧",
    description:
      "Compact and efficient power tiller for small and medium-sized farms.",
    available: true,
  },
  {
    id: 6,
    name: "Paddy Transplanter",
    category: "Planting",
    location: "Sriperumbudur",
    price: 1800,
    unit: "day",
    rating: 4.6,
    reviews: 54,
    owner: "Modern Farm Solutions",
    icon: "🌾",
    description:
      "Mechanical paddy transplanter for quick and uniform rice planting.",
    available: true,
  },
  {
    id: 7,
    name: "Seed Drill",
    category: "Planting",
    location: "Chengalpattu",
    price: 900,
    unit: "day",
    rating: 4.6,
    reviews: 47,
    owner: "FarmPro Rentals",
    icon: "🌱",
    description:
      "Precision seed drill for uniform seed placement and efficient sowing.",
    available: true,
  },
  {
    id: 8,
    name: "Combine Harvester",
    category: "Harvesting",
    location: "Walajabad",
    price: 3500,
    unit: "day",
    rating: 4.9,
    reviews: 112,
    owner: "Kisan Machinery",
    icon: "🌾",
    description:
      "High-performance combine harvester suitable for paddy and wheat harvesting.",
    available: true,
  },
  {
    id: 9,
    name: "Mini Harvester",
    category: "Harvesting",
    location: "Kanchipuram",
    price: 2600,
    unit: "day",
    rating: 4.7,
    reviews: 39,
    owner: "Village Machinery",
    icon: "🌾",
    description:
      "Compact harvester suitable for small and medium agricultural fields.",
    available: true,
  },
  {
    id: 10,
    name: "Power Weeder",
    category: "Weeding",
    location: "Kanchipuram",
    price: 500,
    unit: "hour",
    rating: 4.5,
    reviews: 41,
    owner: "FarmPro Rentals",
    icon: "🔧",
    description:
      "Compact power weeder for vegetable crops, row crops and general field maintenance.",
    available: true,
  },
  {
    id: 11,
    name: "Mini Tractor",
    category: "Tractors",
    location: "Chennai",
    price: 700,
    unit: "hour",
    rating: 4.4,
    reviews: 31,
    owner: "Village Machinery",
    icon: "🚜",
    description:
      "Compact tractor suitable for small farms and narrow field operations.",
    available: false,
  },
];

const categories = [
  "All",
  "Tractors",
  "Tillage",
  "Planting",
  "Harvesting",
  "Weeding",
];

const locations = [
  "All locations",
  "Kanchipuram",
  "Chengalpattu",
  "Sriperumbudur",
  "Walajabad",
  "Chennai",
];

function formatPrice(price) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function BookEquipment() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All locations");

  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState(1);
  const [notes, setNotes] = useState("");

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filteredEquipment = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return equipmentList.filter((equipment) => {
      const matchesSearch =
        searchValue === "" ||
        equipment.name.toLowerCase().includes(searchValue) ||
        equipment.category.toLowerCase().includes(searchValue) ||
        equipment.location.toLowerCase().includes(searchValue) ||
        equipment.owner.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || equipment.category === category;

      const matchesLocation =
        location === "All locations" ||
        equipment.location === location;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [search, category, location]);

  const openBookingModal = (equipment) => {
    setSelectedEquipment(equipment);
    setBookingDate("");
    setStartTime("09:00");
    setDuration(1);
    setNotes("");
    setBookingConfirmed(false);
    setShowModal(true);
  };

  const closeBookingModal = () => {
    setShowModal(false);
    setSelectedEquipment(null);
    setBookingConfirmed(false);
  };

  const totalPrice = selectedEquipment
    ? selectedEquipment.price * Number(duration || 1)
    : 0;

  const handleBookingSubmit = (event) => {
    event.preventDefault();

    if (!bookingDate) {
      return;
    }

    setBookingConfirmed(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="book-equipment-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .book-equipment-page {
          min-height: 100vh;
          background: #f5f7f2;
          color: #17251b;
          font-family:
            Inter,
            "Segoe UI",
            Arial,
            sans-serif;
        }

        /* =========================
           HEADER
        ========================= */

        .be-header {
          background: #173f2a;
          color: #fff;
          min-height: 68px;
          display: flex;
          align-items: center;
        }

        .be-header-inner {
          width: min(1240px, calc(100% - 40px));
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .be-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #fff;
          text-decoration: none;
        }

        .be-logo {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #e6a52b;
          color: #173f2a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 20px;
        }

        .be-brand-name {
          font-size: 18px;
          font-weight: 800;
          line-height: 1.1;
        }

        .be-brand-subtitle {
          font-size: 10px;
          opacity: 0.75;
          margin-top: 3px;
        }

        .be-back {
          color: #fff;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 8px;
          padding: 9px 14px;
          font-size: 12px;
          font-weight: 700;
        }

        .be-back:hover {
          background: rgba(255,255,255,0.08);
        }

        /* =========================
           HERO
        ========================= */

        .be-hero {
          background:
            linear-gradient(
              120deg,
              #173f2a 0%,
              #1f6541 55%,
              #2e7d50 100%
            );
          color: #fff;
          padding: 42px 20px 75px;
        }

        .be-hero-inner {
          width: min(1240px, 100%);
          margin: 0 auto;
        }

        .be-badge {
          display: inline-flex;
          align-items: center;
          background: #e6a52b;
          color: #173f2a;
          border-radius: 30px;
          padding: 6px 11px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 13px;
        }

        .be-hero h1 {
          margin: 0;
          font-size: clamp(28px, 5vw, 42px);
          line-height: 1.12;
          font-weight: 850;
        }

        .be-hero p {
          max-width: 680px;
          margin: 12px 0 0;
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255,255,255,0.87);
        }

        /* =========================
           MAIN
        ========================= */

        .be-main {
          width: min(1240px, calc(100% - 40px));
          margin: -40px auto 0;
          position: relative;
          z-index: 2;
          padding-bottom: 60px;
        }

        /* =========================
           FILTERS
        ========================= */

        .be-filter-box {
          background: #fff;
          border: 1px solid #dce2d8;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 10px 30px rgba(20, 61, 40, 0.09);
        }

        .be-filter-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 220px;
          gap: 12px;
        }

        .be-search-wrap {
          position: relative;
        }

        .be-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          pointer-events: none;
        }

        .be-search {
          width: 100%;
          height: 46px;
          border: 1px solid #d7ddd3;
          border-radius: 9px;
          padding: 0 14px 0 42px;
          outline: none;
          font-size: 13px;
          color: #17251b;
          background: #fff;
        }

        .be-search:focus,
        .be-location:focus {
          border-color: #1f6541;
          box-shadow: 0 0 0 3px rgba(31,101,65,0.08);
        }

        .be-location {
          height: 46px;
          width: 100%;
          border: 1px solid #d7ddd3;
          border-radius: 9px;
          padding: 0 12px;
          background: #fff;
          outline: none;
          font-size: 13px;
          color: #17251b;
        }

        .be-categories {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-top: 14px;
          scrollbar-width: none;
        }

        .be-categories::-webkit-scrollbar {
          display: none;
        }

        .be-category {
          flex-shrink: 0;
          border: 1px solid #d7ddd3;
          background: #fff;
          color: #475448;
          border-radius: 30px;
          padding: 8px 15px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 750;
          transition: all 0.2s ease;
        }

        .be-category:hover {
          border-color: #1f6541;
          color: #1f6541;
        }

        .be-category.active {
          color: #fff;
          background: #1f6541;
          border-color: #1f6541;
        }

        /* =========================
           SECTION TITLE
        ========================= */

        .be-section-head {
          margin: 30px 0 16px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }

        .be-section-head h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 850;
        }

        .be-section-head p {
          margin: 5px 0 0;
          font-size: 12px;
          color: #596258;
        }

        .be-result-count {
          font-size: 12px;
          color: #596258;
          white-space: nowrap;
        }

        /* =========================
           EQUIPMENT CARDS
        ========================= */

        .be-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .be-card {
          background: #fff;
          border: 1px solid #dce2d8;
          border-radius: 13px;
          overflow: hidden;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
        }

        .be-card:hover {
          transform: translateY(-3px);
          border-color: #1f6541;
          box-shadow: 0 12px 28px rgba(20, 61, 40, 0.10);
        }

        .be-card-image {
          height: 160px;
          background:
            linear-gradient(
              135deg,
              #e7f0e5,
              #d2e3d1
            );
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .be-machine-icon {
          font-size: 65px;
          line-height: 1;
        }

        .be-status {
          position: absolute;
          right: 10px;
          top: 10px;
          border-radius: 6px;
          padding: 5px 8px;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.03em;
        }

        .be-status.available {
          background: #e6f4e8;
          color: #28713d;
        }

        .be-status.unavailable {
          background: #f9e6e6;
          color: #a62e2e;
        }

        .be-card-content {
          padding: 14px;
        }

        .be-card-category {
          font-size: 9px;
          font-weight: 900;
          color: #1f6541;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }

        .be-card-title {
          margin: 0;
          font-size: 14px;
          line-height: 1.35;
          font-weight: 850;
        }

        .be-card-description {
          margin-top: 7px;
          min-height: 48px;
          font-size: 11px;
          line-height: 1.45;
          color: #596258;
        }

        .be-card-location {
          margin-top: 10px;
          color: #4e594f;
          font-size: 11px;
        }

        .be-card-owner {
          margin-top: 4px;
          color: #6b746b;
          font-size: 10px;
        }

        .be-card-bottom {
          border-top: 1px solid #edf0eb;
          margin-top: 12px;
          padding-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .be-price {
          font-size: 15px;
          font-weight: 850;
        }

        .be-price small {
          color: #687168;
          font-size: 9px;
          font-weight: 500;
        }

        .be-rating {
          font-size: 10px;
          color: #596258;
        }

        .be-book-button {
          width: 100%;
          border: none;
          border-radius: 8px;
          margin-top: 12px;
          padding: 10px;
          background: #1f6541;
          color: #fff;
          font-size: 11px;
          font-weight: 850;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .be-book-button:hover {
          background: #173f2a;
        }

        .be-book-button:disabled {
          background: #d8ddd5;
          color: #777;
          cursor: not-allowed;
        }

        /* =========================
           EMPTY
        ========================= */

        .be-empty {
          background: #fff;
          border: 1px solid #dce2d8;
          border-radius: 13px;
          padding: 55px 20px;
          text-align: center;
        }

        .be-empty-icon {
          font-size: 46px;
          margin-bottom: 10px;
        }

        .be-empty h3 {
          margin: 0 0 6px;
          font-size: 17px;
        }

        .be-empty p {
          margin: 0;
          color: #596258;
          font-size: 12px;
        }

        /* =========================
           BENEFITS
        ========================= */

        .be-benefits {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 38px;
        }

        .be-benefit {
          background: #fff;
          border: 1px solid #dce2d8;
          border-radius: 12px;
          padding: 18px;
        }

        .be-benefit-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: #e7f0e5;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .be-benefit h3 {
          margin: 0 0 5px;
          font-size: 14px;
        }

        .be-benefit p {
          margin: 0;
          font-size: 11px;
          line-height: 1.5;
          color: #596258;
        }

        /* =========================
           MODAL
        ========================= */

        .be-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(10, 27, 17, 0.62);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .be-modal {
          width: 100%;
          max-width: 520px;
          max-height: 92vh;
          overflow-y: auto;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 25px 70px rgba(0,0,0,0.25);
        }

        .be-modal-header {
          padding: 17px 20px;
          border-bottom: 1px solid #e1e5df;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .be-modal-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 850;
        }

        .be-close {
          width: 32px;
          height: 32px;
          border: 1px solid #d8ddd5;
          background: #fff;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          color: #374137;
        }

        .be-modal-body {
          padding: 20px;
        }

        .be-selected {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f4f7f1;
          border: 1px solid #dce2d8;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 18px;
        }

        .be-selected-icon {
          width: 58px;
          height: 58px;
          flex-shrink: 0;
          border-radius: 9px;
          background: #e3eee1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 31px;
        }

        .be-selected h3 {
          margin: 0 0 4px;
          font-size: 14px;
        }

        .be-selected p {
          margin: 0;
          font-size: 10px;
          color: #596258;
        }

        .be-form-group {
          margin-bottom: 15px;
        }

        .be-form-group label {
          display: block;
          margin-bottom: 6px;
          font-size: 11px;
          font-weight: 800;
        }

        .be-form-input,
        .be-form-textarea {
          width: 100%;
          border: 1px solid #d7ddd3;
          border-radius: 8px;
          outline: none;
          font-family: inherit;
          font-size: 12px;
          color: #17251b;
          background: #fff;
        }

        .be-form-input {
          height: 42px;
          padding: 0 11px;
        }

        .be-form-textarea {
          padding: 10px 11px;
          min-height: 80px;
          resize: vertical;
        }

        .be-form-input:focus,
        .be-form-textarea:focus {
          border-color: #1f6541;
          box-shadow: 0 0 0 3px rgba(31,101,65,0.07);
        }

        .be-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .be-summary {
          background: #e8f1e6;
          border-radius: 9px;
          padding: 13px;
          margin: 18px 0;
        }

        .be-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          font-size: 11px;
          margin-bottom: 8px;
        }

        .be-summary-row:last-child {
          border-top: 1px solid rgba(31,101,65,0.15);
          padding-top: 9px;
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 850;
        }

        .be-confirm {
          width: 100%;
          height: 44px;
          border: none;
          border-radius: 8px;
          background: #1f6541;
          color: #fff;
          cursor: pointer;
          font-size: 12px;
          font-weight: 850;
        }

        .be-confirm:hover {
          background: #173f2a;
        }

        /* =========================
           SUCCESS
        ========================= */

        .be-success {
          text-align: center;
          padding: 20px 5px 10px;
        }

        .be-success-icon {
          width: 66px;
          height: 66px;
          margin: 0 auto 14px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e7f4e9;
          color: #28713d;
          font-size: 30px;
          font-weight: 900;
        }

        .be-success h2 {
          margin: 0 0 8px;
          font-size: 20px;
        }

        .be-success p {
          max-width: 370px;
          margin: 0 auto 18px;
          color: #596258;
          font-size: 12px;
          line-height: 1.55;
        }

        .be-done {
          border: 1px solid #1f6541;
          background: #fff;
          color: #1f6541;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 1050px) {
          .be-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 780px) {
          .be-header-inner,
          .be-main {
            width: min(100% - 28px, 1240px);
          }

          .be-hero {
            padding: 32px 14px 68px;
          }

          .be-filter-row {
            grid-template-columns: 1fr;
          }

          .be-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .be-benefits {
            grid-template-columns: 1fr;
          }

          .be-section-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }
        }

        @media (max-width: 500px) {
          .be-header-inner {
            min-height: 64px;
          }

          .be-brand-subtitle {
            display: none;
          }

          .be-brand-name {
            font-size: 15px;
          }

          .be-back {
            font-size: 10px;
            padding: 8px 10px;
          }

          .be-main {
            width: calc(100% - 20px);
          }

          .be-grid {
            grid-template-columns: 1fr;
          }

          .be-card-image {
            height: 150px;
          }

          .be-form-grid {
            grid-template-columns: 1fr;
          }

          .be-modal-overlay {
            padding: 10px;
          }

          .be-modal-body {
            padding: 16px;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="be-header">
        <div className="be-header-inner">
          <a href="/dashboard" className="be-brand">
            <div className="be-logo">A</div>

            <div>
              <div className="be-brand-name">AgriX Hub</div>
              <div className="be-brand-subtitle">
                Every farmer app, one place
              </div>
            </div>
          </a>

          <a href="/dashboard" className="be-back">
            ← Back to Dashboard
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="be-hero">
        <div className="be-hero-inner">
          <div className="be-badge">🚜 Farm Machinery</div>

          <h1>Book Equipment Near You</h1>

          <p>
            Find and rent tractors, harvesters, rotavators, seed drills and
            other farm machinery from equipment providers near your farm.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className="be-main">
        {/* FILTER BOX */}
        <section className="be-filter-box">
          <div className="be-filter-row">
            <div className="be-search-wrap">
              <span className="be-search-icon">🔍</span>

              <input
                className="be-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tractor, harvester, rotavator..."
              />
            </div>

            <select
              className="be-location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  📍 {item}
                </option>
              ))}
            </select>
          </div>

          <div className="be-categories">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`be-category ${
                  category === item ? "active" : ""
                }`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* TITLE */}
        <div className="be-section-head">
          <div>
            <h2>Available Equipment</h2>

            <p>
              Choose the machinery you need for your farm operation.
            </p>
          </div>

          <div className="be-result-count">
            {filteredEquipment.length} equipment found
          </div>
        </div>

        {/* EQUIPMENT */}
        {filteredEquipment.length > 0 ? (
          <div className="be-grid">
            {filteredEquipment.map((equipment) => (
              <article className="be-card" key={equipment.id}>
                <div className="be-card-image">
                  <span className="be-machine-icon">
                    {equipment.icon}
                  </span>

                  <span
                    className={`be-status ${
                      equipment.available
                        ? "available"
                        : "unavailable"
                    }`}
                  >
                    {equipment.available
                      ? "AVAILABLE"
                      : "UNAVAILABLE"}
                  </span>
                </div>

                <div className="be-card-content">
                  <div className="be-card-category">
                    {equipment.category}
                  </div>

                  <h3 className="be-card-title">
                    {equipment.name}
                  </h3>

                  <div className="be-card-description">
                    {equipment.description}
                  </div>

                  <div className="be-card-location">
                    📍 {equipment.location}
                  </div>

                  <div className="be-card-owner">
                    Provided by {equipment.owner}
                  </div>

                  <div className="be-card-bottom">
                    <div className="be-price">
                      {formatPrice(equipment.price)}
                      <small> / {equipment.unit}</small>
                    </div>

                    <div className="be-rating">
                      ⭐ {equipment.rating} ({equipment.reviews})
                    </div>
                  </div>

                  <button
                    type="button"
                    className="be-book-button"
                    disabled={!equipment.available}
                    onClick={() => openBookingModal(equipment)}
                  >
                    {equipment.available
                      ? "Book Equipment"
                      : "Currently Unavailable"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="be-empty">
            <div className="be-empty-icon">🚜</div>

            <h3>No equipment found</h3>

            <p>
              Try changing your search, category or location.
            </p>
          </div>
        )}

        {/* BENEFITS */}
        <section className="be-benefits">
          <div className="be-benefit">
            <div className="be-benefit-icon">✓</div>

            <h3>Verified Equipment</h3>

            <p>
              Find farm machinery from listed equipment providers with
              transparent information.
            </p>
          </div>

          <div className="be-benefit">
            <div className="be-benefit-icon">₹</div>

            <h3>Transparent Pricing</h3>

            <p>
              Check the rental price before submitting your equipment
              booking request.
            </p>
          </div>

          <div className="be-benefit">
            <div className="be-benefit-icon">📍</div>

            <h3>Near Your Farm</h3>

            <p>
              Filter equipment by location and find machinery close to
              your farming area.
            </p>
          </div>
        </section>
      </main>

      {/* BOOKING MODAL */}
      {showModal && selectedEquipment && (
        <div
          className="be-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeBookingModal();
            }
          }}
        >
          <div className="be-modal">
            <div className="be-modal-header">
              <h2>Book Equipment</h2>

              <button
                type="button"
                className="be-close"
                onClick={closeBookingModal}
                aria-label="Close booking window"
              >
                ×
              </button>
            </div>

            <div className="be-modal-body">
              {bookingConfirmed ? (
                <div className="be-success">
                  <div className="be-success-icon">✓</div>

                  <h2>Booking Request Sent!</h2>

                  <p>
                    Your booking request for{" "}
                    <strong>{selectedEquipment.name}</strong> has been
                    submitted successfully.
                  </p>

                  <button
                    type="button"
                    className="be-done"
                    onClick={closeBookingModal}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="be-selected">
                    <div className="be-selected-icon">
                      {selectedEquipment.icon}
                    </div>

                    <div>
                      <h3>{selectedEquipment.name}</h3>

                      <p>
                        📍 {selectedEquipment.location} ·{" "}
                        {formatPrice(selectedEquipment.price)} /{" "}
                        {selectedEquipment.unit}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit}>
                    <div className="be-form-grid">
                      <div className="be-form-group">
                        <label htmlFor="booking-date">
                          Booking Date
                        </label>

                        <input
                          id="booking-date"
                          className="be-form-input"
                          type="date"
                          min={today}
                          value={bookingDate}
                          onChange={(event) =>
                            setBookingDate(event.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="be-form-group">
                        <label htmlFor="start-time">
                          Start Time
                        </label>

                        <input
                          id="start-time"
                          className="be-form-input"
                          type="time"
                          value={startTime}
                          onChange={(event) =>
                            setStartTime(event.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="be-form-group">
                      <label htmlFor="duration">
                        Duration ({selectedEquipment.unit})
                      </label>

                      <input
                        id="duration"
                        className="be-form-input"
                        type="number"
                        min="1"
                        max="30"
                        value={duration}
                        onChange={(event) =>
                          setDuration(
                            Math.max(
                              1,
                              Number(event.target.value) || 1
                            )
                          )
                        }
                        required
                      />
                    </div>

                    <div className="be-form-group">
                      <label htmlFor="booking-notes">
                        Additional Requirements
                      </label>

                      <textarea
                        id="booking-notes"
                        className="be-form-textarea"
                        value={notes}
                        onChange={(event) =>
                          setNotes(event.target.value)
                        }
                        placeholder="Enter field location, crop details or any special requirements..."
                      />
                    </div>

                    <div className="be-summary">
                      <div className="be-summary-row">
                        <span>Equipment</span>

                        <strong>
                          {selectedEquipment.name}
                        </strong>
                      </div>

                      <div className="be-summary-row">
                        <span>Rate</span>

                        <span>
                          {formatPrice(selectedEquipment.price)} /{" "}
                          {selectedEquipment.unit}
                        </span>
                      </div>

                      <div className="be-summary-row">
                        <span>Duration</span>

                        <span>
                          {duration} {selectedEquipment.unit}
                          {Number(duration) > 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="be-summary-row">
                        <span>Estimated Total</span>

                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="be-confirm"
                    >
                      Confirm Booking Request
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
