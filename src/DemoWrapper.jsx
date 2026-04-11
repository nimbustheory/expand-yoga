import { useState, useEffect } from "react";
import { Calendar, Flame, Heart, Users, CreditCard, Star, Bell, Shield, Sparkles, MapPin } from "lucide-react";
import config from "./demo.config.js";
import App from "./App.jsx";

const iconMap = {
  calendar: Calendar, flame: Flame, heart: Heart, users: Users,
  "credit-card": CreditCard, star: Star, bell: Bell, shield: Shield,
  sparkles: Sparkles, "map-pin": MapPin,
};

export default function DemoWrapper() {
  const ac = config.accentColor;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handler = (e) => setIsAdmin(e.detail.isAdmin);
    window.addEventListener("admin-mode-change", handler);
    return () => window.removeEventListener("admin-mode-change", handler);
  }, []);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh",
      background: isAdmin ? "#0e1020" : "#f5f4f1",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* LEFT SIDEBAR -- hidden in admin */}
      {!isAdmin && (
        <aside className="demo-sidebar demo-sidebar-left" style={{
          width: 320, flexShrink: 0, position: "sticky", top: 0, height: "100vh",
          overflowY: "auto", padding: "40px 32px", display: "flex", flexDirection: "column",
          borderRight: "1px solid #e8e6e1",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: ac, margin: "0 0 28px" }}>
            Prototype Demo
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            {config.logoUrl ? (
              <img src={config.logoUrl} alt={config.studioName} style={{ height: 40, width: "auto", objectFit: "contain", maxWidth: 40, borderRadius: 8 }} onError={e => e.target.style.display='none'} />
            ) : (
              <div style={{ width: 40, height: 40, borderRadius: 10, background: ac, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff" }}>{config.logoMark}</div>
            )}
            <div>
              <div style={{ fontFamily: "'Syne', serif", fontSize: 22, fontWeight: 700, color: "#1a1e2e", lineHeight: 1.1 }}>{config.studioShortName}</div>
              <div style={{ fontSize: 12, color: "#7a7a7a" }}>{config.studioSubtitle}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
            {config.features.map((f, i) => {
              const Icon = iconMap[f.icon] || Star;
              return (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Icon size={18} color={ac} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1e2e" }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: "#7a7a7a", lineHeight: 1.4 }}>{f.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#b0ada6", marginTop: 40 }}>
            Built by LUMI -- LumiClass.app
          </p>
        </aside>
      )}

      {/* CENTER: APP CONTAINER -- phone frame in consumer, full width in admin */}
      <div style={{
        width: isAdmin ? "100%" : 390,
        flexShrink: 0,
        position: "relative",
        boxShadow: isAdmin ? "none" : "0 8px 40px rgba(0,0,0,.12), 0 2px 12px rgba(0,0,0,.06)",
        borderRadius: 0,
        overflow: isAdmin ? "visible" : "hidden",
        height: isAdmin ? "auto" : "100vh",
        minHeight: isAdmin ? "100vh" : "auto",
        transform: isAdmin ? "none" : "translateZ(0)",
      }}>
        <div style={{
          height: isAdmin ? "auto" : "100%",
          overflow: isAdmin ? "visible" : "auto",
        }}>
          <App />
        </div>
      </div>

      {/* RIGHT SIDEBAR -- hidden in admin */}
      {!isAdmin && (
        <aside className="demo-sidebar demo-sidebar-right" style={{
          width: 340, flexShrink: 0, position: "sticky", top: 0, height: "100vh",
          overflowY: "auto", padding: "40px 32px", display: "flex", flexDirection: "column", gap: 20,
          borderLeft: "1px solid #e8e6e1",
        }}>
          {config.salesCards.map((card, i) => {
            const Icon = iconMap[card.icon] || Star;
            return (
              <div key={i} style={{
                background: "#fff", borderRadius: 14, padding: "24px 22px",
                border: "1px solid #e8e6e1",
              }}>
                <Icon size={28} color={ac} style={{ marginBottom: 12 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1e2e", margin: "0 0 8px", fontFamily: "'Syne', serif" }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: "#5a5a5a", lineHeight: 1.55, margin: 0 }}>{card.desc}</p>
              </div>
            );
          })}

          <div style={{
            background: "#1a1e2e", borderRadius: 14, padding: "24px 22px", color: "#fff",
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px", fontFamily: "'Syne', serif" }}>Ready to Launch?</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.55, margin: "0 0 16px" }}>
              Get a custom-branded loyalty app built for your studio -- designed, populated, and ready to deploy.
            </p>
            <a href="https://lumiclass.app" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", padding: "10px 24px", borderRadius: 8,
              background: ac, color: "#fff", fontWeight: 700, fontSize: 14,
              textDecoration: "none", fontFamily: "'Syne', serif",
              letterSpacing: "0.03em",
            }}>
              Learn More
            </a>
          </div>
        </aside>
      )}

      <style>{`
        .demo-sidebar {
          scrollbar-width: none;
        }
        .demo-sidebar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1100px) {
          .demo-sidebar { display: none !important; }
        }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>
    </div>
  );
}
