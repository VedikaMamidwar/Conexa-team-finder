import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";

const SKILLS = [
    "Python", "Web Dev", "UI/UX", "ML / AI", "Data Analysis", "Mobile Dev",
    "Embedded / IoT", "Cloud / DevOps", "Research Writing", "Presentation", "Project Mgmt",
];
const SUPPLY = [210, 185, 64, 92, 118, 77, 41, 38, 96, 120, 59];
const DEMAND = [190, 170, 118, 140, 105, 98, 76, 64, 71, 52, 88];
const EDGES = [[0, 3, 9], [0, 4, 8], [1, 2, 10], [1, 5, 6], [2, 5, 7], [6, 0, 6], [6, 7, 3], [7, 1, 5], [8, 9, 6], [10, 9, 4], [10, 8, 3], [3, 4, 7], [2, 9, 4], [5, 0, 4]];
const TEAMS = [
    ["Smart Attendance", "4/4", 92, "2h ago", "good"],
    ["CampusCart App", "3/5", 58, "1d ago", "warn"],
    ["Crop Disease Detector", "4/4", 88, "5h ago", "good"],
    ["Study Buddy Bot", "2/4", 34, "6d ago", "bad"],
    ["IoT Lab Monitor", "3/4", 71, "3d ago", "warn"],
    ["Alumni Portal Redesign", "4/5", 80, "1d ago", "good"],
];
const LEADS = [["Aarav S.", 14, "#5b5bf0"], ["Priya K.", 12, "#14b8a6"], ["Rohan M.", 11, "#f59e0b"], ["Sneha D.", 9, "#ec4899"], ["Kabir J.", 8, "#8b5cf6"]];
const FUNNEL = [["Signed up", 100], ["Profile + skills added", 74], ["Sent / got a request", 52], ["Request accepted", 31], ["Team formed", 24], ["Project submitted", 19]];

function makeSeries(days) {
    let seed = days * 13 + 5;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const labels = [], signups = [], teams = [];
    const now = new Date(2026, 9, 9);
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now); d.setDate(now.getDate() - i);
        labels.push(d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }));
        const trend = 1 + ((days - i) / days) * 0.5;
        const weekday = [0, 6].includes(d.getDay()) ? 0.7 : 1;
        signups.push(Math.round((18 + rnd() * 14) * trend * weekday));
        teams.push(Math.round((5 + rnd() * 6) * trend * weekday));
    }
    return { labels, signups, teams };
}

export default function Analytics() {
    const [days, setDays] = useState(30);
    const [dark, setDark] = useState(false);
    const series = useMemo(() => makeSeries(days), [days]);
    const chartRefs = useRef({});
    const canvasRefs = {
        growth: useRef(null), skills: useRef(null), mix: useRef(null),
        comp: useRef(null), dead: useRef(null),
    };

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        setDark(media.matches);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.dataset.theme = dark ? "dark" : "light";
        const styles = getComputedStyle(root);
        const line = styles.getPropertyValue("--line").trim();
        const muted = styles.getPropertyValue("--muted").trim();
        const brand = styles.getPropertyValue("--brand").trim();
        const brand2 = styles.getPropertyValue("--brand2").trim();
        const warn = styles.getPropertyValue("--warn").trim();
        const good = styles.getPropertyValue("--good").trim();
        const bad = styles.getPropertyValue("--bad").trim();

        Chart.defaults.color = muted;
        Chart.defaults.borderColor = line;
        Chart.defaults.font.family = "system-ui";
        const base = {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { labels: { boxWidth: 10, usePointStyle: true } } },
            scales: { x: { grid: { display: false } }, y: { grid: { color: line } } },
        };
        const sum = (arr) => arr.reduce((a, b) => a + b, 0);
        const destroy = (key) => { if (chartRefs.current[key]) chartRefs.current[key].destroy(); };
        const create = (key, ref, config) => {
            destroy(key);
            if (ref.current) chartRefs.current[key] = new Chart(ref.current, config);
        };

        create("growth", canvasRefs.growth, {
            type: "line",
            data: {
                labels: series.labels, datasets: [
                    { label: "Signups", data: series.signups, borderColor: brand, backgroundColor: `${brand}22`, fill: true, tension: 0.35, pointRadius: 0 },
                    { label: "Teams formed", data: series.teams, borderColor: brand2, tension: 0.35, pointRadius: 0 },
                ]
            }, options: base,
        });
        create("skills", canvasRefs.skills, {
            type: "bar",
            data: {
                labels: SKILLS, datasets: [
                    { label: "Students with skill", data: SUPPLY, backgroundColor: brand, borderRadius: 5 },
                    { label: "Projects needing skill", data: DEMAND, backgroundColor: warn, borderRadius: 5 },
                ]
            },
            options: { ...base, indexAxis: "y", scales: { x: { grid: { color: line } }, y: { grid: { display: false } } } },
        });
        create("mix", canvasRefs.mix, {
            type: "doughnut",
            data: { labels: ["Same department", "Cross-department"], datasets: [{ data: [58, 42], backgroundColor: [brand, brand2], borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, cutout: "65%", plugins: { legend: { position: "right", labels: { boxWidth: 10, usePointStyle: true } } } },
        });
        create("comp", canvasRefs.comp, {
            type: "bar",
            data: { labels: ["0-20", "21-40", "41-60", "61-80", "81-100"], datasets: [{ label: "Teams", data: [4, 17, 46, 98, 62], backgroundColor: [bad, warn, "#9aa3b8", brand2, good], borderRadius: 6 }] },
            options: { ...base, plugins: { legend: { display: false } } },
        });
        create("dead", canvasRefs.dead, {
            type: "bar",
            data: { labels: ["0-3 days", "4-7", "8-14", "15-30", "30+"], datasets: [{ label: "Incomplete teams", data: [9, 14, 22, 31, 18], backgroundColor: [bad, warn, brand, brand, brand], borderRadius: 6 }] },
            options: { ...base, plugins: { legend: { display: false } } },
        });

        return () => Object.values(chartRefs.current).forEach((chart) => chart?.destroy());
    }, [dark, series]);

    const totalTeams = series.teams.reduce((a, b) => a + b, 0);
    const activeStudents = Math.round(420 + series.signups.reduce((a, b) => a + b, 0) * 1.6);
    const gaps = SKILLS.map((skill, i) => ({ skill, gap: DEMAND[i] - SUPPLY[i], demand: DEMAND[i], supply: SUPPLY[i] }))
        .sort((a, b) => b.gap - a.gap);
    const biggestGap = gaps[0];
    const atRisk = TEAMS.filter((team) => team[4] === "bad").length;

    const exportCsv = () => {
        const rows = [
            "date,signups,teams_formed",
            ...series.labels.map((label, i) => `${label},${series.signups[i]},${series.teams[i]}`),
        ];
        const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url; link.download = "connexa-analytics.csv"; link.click();
        URL.revokeObjectURL(url);
    };

    const heatCells = useMemo(() => {
        let seed = days * 17 + 9;
        const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
        return Array.from({ length: 7 }, (_, day) => Array.from({ length: 12 }, (_, block) => {
            const peak = Math.exp(-Math.pow(block - 10.3, 2) / 3.2) * (day === 6 ? 1.2 : day === 5 ? 0.9 : 0.8);
            return Math.min(1, peak + Math.exp(-Math.pow(block - 6.5, 2) / 6) * 0.25 + rnd() * 0.08);
        }));
    }, [days]);

    const network = useMemo(() => {
        const W = 520, H = 330, cx = W / 2, cy = H / 2, n = SKILLS.length;
        const positions = SKILLS.map((_, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            return [cx + Math.cos(angle) * (W / 2 - 95), cy + Math.sin(angle) * (H / 2 - 38)];
        });
        return { positions };
    }, []);

    return (
        <div className="analytics-page" data-theme={dark ? "dark" : "light"}>
            <style>{`
        .analytics-page{--bg:#f5f6fb;--card:#fff;--text:#1b1f2a;--muted:#6b7285;--line:#e6e8f0;--brand:#5b5bf0;--brand2:#14b8a6;--warn:#f59e0b;--bad:#ef4444;--good:#10b981;background:var(--bg);color:var(--text);min-height:100vh;padding:24px;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;transition:background .3s,color .3s}
        .analytics-page[data-theme="dark"]{--bg:#0d1017;--card:#161a24;--text:#e8eaf2;--muted:#8a91a6;--line:#262b38}
        .analytics-page *{box-sizing:border-box}
        .analytics-wrap{max-width:1200px;margin:0 auto}
        .analytics-header{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;margin-bottom:22px}
        .analytics-logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:20px}
        .analytics-logo-mark{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--brand),var(--brand2));display:grid;place-items:center;color:white;font-size:16px}
        .analytics-logo small{display:block;font-weight:400;font-size:12px;color:var(--muted)}
        .analytics-controls{display:flex;gap:8px;flex-wrap:wrap}
        .analytics-seg{display:flex;background:var(--card);border:1px solid var(--line);border-radius:10px;overflow:hidden}
        .analytics-seg button,.analytics-btn{border:0;background:transparent;color:var(--muted);padding:8px 14px;cursor:pointer;font:inherit;font-size:13px}
        .analytics-seg button.active{background:var(--brand);color:white}
        .analytics-btn{background:var(--card);border:1px solid var(--line);border-radius:10px;color:var(--text)}
        .analytics-btn:hover{border-color:var(--brand)}
        .analytics-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:16px}
        .analytics-card{min-width:0;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px;animation:analytics-in .5s both}
        @keyframes analytics-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .analytics-s3{grid-column:span 3}.analytics-s4{grid-column:span 4}.analytics-s5{grid-column:span 5}.analytics-s6{grid-column:span 6}.analytics-s7{grid-column:span 7}.analytics-s8{grid-column:span 8}.analytics-s12{grid-column:span 12}
        .analytics-card h2{font-size:15px;margin:0 0 2px;font-weight:700}.analytics-sub{font-size:12px;color:var(--muted);margin-bottom:14px}
        .analytics-kpi .value{font-size:28px;font-weight:700;margin:6px 0 2px}.analytics-kpi .label{font-size:12px;color:var(--muted)}
        .analytics-delta{font-size:12px;font-weight:600}.analytics-up{color:var(--good)}.analytics-down{color:var(--bad)}
        .analytics-chartbox{position:relative;height:250px}.analytics-chartbox.tall{height:320px}.analytics-chartbox.short{height:150px}.analytics-chartbox.compact{height:210px}
        .analytics-ring{display:grid;place-items:center;position:relative}.analytics-ring>div{position:absolute;text-align:center}.analytics-ring b{font-size:24px;display:block}
        .analytics-gap-row{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);font-size:13px}.analytics-gap-row:last-child{border:0}
        .analytics-chip{font-size:11px;padding:3px 9px;border-radius:20px;font-weight:600;white-space:nowrap}.analytics-c-bad{background:#ef444422;color:var(--bad)}.analytics-c-warn{background:#f59e0b22;color:var(--warn)}.analytics-c-good{background:#10b98122;color:var(--good)}
        .analytics-funnel-row{margin:6px 0;padding:9px 12px;border-radius:10px;color:white;font-size:13px;display:flex;justify-content:space-between;gap:10px;transition:width .6s}
        .analytics-heat{display:grid;grid-template-columns:34px repeat(12,minmax(0,1fr));gap:4px;font-size:10px;color:var(--muted)}.analytics-heat span{aspect-ratio:1.3;border-radius:5px;min-width:0}.analytics-heat em{font-style:normal;display:flex;align-items:center}.analytics-heat .hour{text-align:center;aspect-ratio:auto;justify-content:center}
        .analytics-table-wrap{overflow-x:auto}.analytics-table{width:100%;border-collapse:collapse;font-size:13px}.analytics-table th{text-align:left;color:var(--muted);font-weight:500;font-size:12px;padding:8px 6px;border-bottom:1px solid var(--line);white-space:nowrap}.analytics-table td{padding:10px 6px;border-bottom:1px solid var(--line);white-space:nowrap}.analytics-table tr:last-child td{border:0}
        .analytics-coverage{display:flex;align-items:center;gap:8px}.analytics-track{width:80px;height:10px;border-radius:6px;background:var(--line);position:relative;overflow:hidden;flex-shrink:0}.analytics-track b{position:absolute;left:0;top:0;bottom:0;border-radius:6px}
        .analytics-insight{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);font-size:13px;line-height:1.45}.analytics-insight:last-child{border:0}
        .analytics-tag{font-size:10px;background:var(--brand);color:white;border-radius:6px;padding:2px 6px;margin-left:6px;vertical-align:middle}
        .analytics-lead{display:flex;align-items:center;gap:10px;padding:8px 0;font-size:13px}.analytics-avatar{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:white;font-size:12px;font-weight:700;flex-shrink:0}
        .analytics-note{font-size:11px;color:var(--muted);text-align:center;margin-top:20px}
        @media(max-width:900px){.analytics-s3{grid-column:span 6}.analytics-s4,.analytics-s5,.analytics-s6,.analytics-s7,.analytics-s8{grid-column:span 12}.analytics-page{padding:14px}}
        @media(max-width:520px){.analytics-s3{grid-column:span 12}.analytics-controls{width:100%}.analytics-btn{flex:1}.analytics-card{padding:14px}.analytics-heat{gap:2px;grid-template-columns:29px repeat(12,minmax(0,1fr))}}
      `}</style>
            <div className="analytics-wrap">
                <header className="analytics-header">
                    <div className="analytics-logo"><span className="analytics-logo-mark">C</span><div>Connexa Analytics<small>Teammate matching · academic projects</small></div></div>
                    <div className="analytics-controls">
                        <div className="analytics-seg" aria-label="Date range">
                            {[7, 30, 90].map((range) => <button key={range} type="button" className={days === range ? "active" : ""} onClick={() => setDays(range)}>{range}D</button>)}
                        </div>
                        <button type="button" className="analytics-btn" onClick={exportCsv}>Export CSV</button>
                        <button type="button" className="analytics-btn" onClick={() => setDark((value) => !value)}>Dark / Light</button>
                    </div>
                </header>

                <div className="analytics-grid">
                    <section className="analytics-card analytics-kpi analytics-s3"><div className="label">Active students</div><div className="value">{activeStudents.toLocaleString()}</div><div className="analytics-delta analytics-up">▲ 11.2% vs previous</div></section>
                    <section className="analytics-card analytics-kpi analytics-s3"><div className="label">Teams formed</div><div className="value">{totalTeams}</div><div className="analytics-delta analytics-up">▲ 8.4% vs previous</div></section>
                    <section className="analytics-card analytics-kpi analytics-s3"><div className="label">Request accept rate</div><div className="value">37%</div><div className="analytics-delta analytics-up">▲ 2.8% vs previous</div></section>
                    <section className="analytics-card analytics-kpi analytics-s3"><div className="label">Avg. time to find a team</div><div className="value">3.4 days</div><div className="analytics-delta analytics-up">▼ 9.1% vs previous</div></section>

                    <section className="analytics-card analytics-s8"><h2>Growth</h2><div className="analytics-sub">New signups vs teams formed</div><div className="analytics-chartbox"><canvas ref={canvasRefs.growth} /></div></section>
                    <section className="analytics-card analytics-s4" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><h2 style={{ alignSelf: "flex-start" }}>Semester goal</h2><div className="analytics-sub" style={{ alignSelf: "flex-start" }}>Teams formed this semester</div><div className="analytics-ring"><svg width="170" height="170" viewBox="0 0 170 170" role="img" aria-label="312 of 500 semester team goal"><circle cx="85" cy="85" r="70" fill="none" stroke="var(--line)" strokeWidth="14" /><circle cx="85" cy="85" r="70" fill="none" stroke="var(--brand)" strokeWidth="14" strokeLinecap="round" transform="rotate(-90 85 85)" strokeDasharray="440" strokeDashoffset={440 * (1 - 312 / 500)} style={{ transition: "stroke-dashoffset 1s" }} /></svg><div><b>312</b><span className="analytics-sub">of 500 goal</span></div></div></section>

                    <section className="analytics-card analytics-s7"><h2>Skill supply vs demand <span className="analytics-tag">UNIQUE</span></h2><div className="analytics-sub">Skills students have vs skills projects are asking for</div><div className="analytics-chartbox tall"><canvas ref={canvasRefs.skills} /></div></section>
                    <section className="analytics-card analytics-s5"><h2>Skill gap alerts <span className="analytics-tag">UNIQUE</span></h2><div className="analytics-sub">Where projects are stuck looking for people</div>{gaps.slice(0, 5).map((item) => <div className="analytics-gap-row" key={item.skill}><div><b>{item.skill}</b><div className="analytics-sub" style={{ margin: 0 }}>{item.demand} projects need it · {item.supply} students have it</div></div><span className={`analytics-chip ${item.gap > 50 ? "analytics-c-bad" : item.gap > 20 ? "analytics-c-warn" : "analytics-c-good"}`}>{item.gap > 0 ? `-${item.gap} short` : "ok"}</span></div>)}</section>

                    <section className="analytics-card analytics-s7"><h2>Skill pairing network <span className="analytics-tag">UNIQUE</span></h2><div className="analytics-sub">Thicker line = skills that most often end up in the same successful team.</div><svg viewBox="0 0 520 330" width="100%" role="img" aria-label="Skill pairing network">
                        {EDGES.map(([a, b, w], i) => <line key={`edge-${i}`} x1={network.positions[a][0]} y1={network.positions[a][1]} x2={network.positions[b][0]} y2={network.positions[b][1]} stroke="var(--brand)" strokeOpacity=".45" strokeWidth={w / 2} />)}
                        {SKILLS.map((skill, i) => { const [x, y] = network.positions[i]; const r = 8 + SUPPLY[i] / 22; return <g key={skill}><title>{skill}</title><circle cx={x} cy={y} r={r} fill="var(--brand2)" fillOpacity=".85" /><text x={x} y={y + r + 13} textAnchor="middle" fill="var(--text)" fontSize="11">{skill}</text></g> })}
                    </svg></section>
                    <section className="analytics-card analytics-s5"><h2>Match funnel</h2><div className="analytics-sub">Where students drop off</div><div>{FUNNEL.map(([label, value], i) => <div key={label} className="analytics-funnel-row" style={{ width: `${value}%`, minWidth: 150, background: `color-mix(in srgb,var(--brand) ${100 - i * 13}%,var(--brand2))` }}><span>{label}</span><b>{value}%</b></div>)}</div><div style={{ marginTop: 18 }}><h2>Team type</h2><div className="analytics-sub">Same department vs cross-department</div><div className="analytics-chartbox short"><canvas ref={canvasRefs.mix} /></div></div></section>

                    <section className="analytics-card analytics-s6"><h2>Complementarity score <span className="analytics-tag">UNIQUE</span></h2><div className="analytics-sub">How well team members' skills cover what the project needs</div><div className="analytics-chartbox compact"><canvas ref={canvasRefs.comp} /></div></section>
                    <section className="analytics-card analytics-s6"><h2>Peak activity</h2><div className="analytics-sub">When students browse and send requests (2-hour blocks)</div><div className="analytics-heat"><em />{Array.from({ length: 12 }, (_, block) => <span className="hour" key={block}>{block * 2}</span>)}{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => <React.Fragment key={day}><em>{day}</em>{heatCells[i].map((value, block) => <span key={block} title={`${day} ${block * 2}:00 - ${(block + 1) * 2}:00`} style={{ background: `color-mix(in srgb,var(--brand) ${Math.round(value * 100)}%,var(--line))` }} />)}</React.Fragment>)}</div></section>

                    <section className="analytics-card analytics-s7"><h2>Team health</h2><div className="analytics-sub">Spot teams that are incomplete or stalled before deadlines</div><div className="analytics-table-wrap"><table className="analytics-table"><thead><tr><th>Team</th><th>Members</th><th>Skill coverage</th><th>Last active</th><th>Status</th></tr></thead><tbody>{TEAMS.map((team) => <tr key={team[0]}><td><b>{team[0]}</b></td><td>{team[1]}</td><td><div className="analytics-coverage"><div className="analytics-track"><b style={{ width: `${team[2]}%`, background: team[2] > 75 ? "var(--good)" : team[2] > 50 ? "var(--warn)" : "var(--bad)" }} /></div>{team[2]}%</div></td><td>{team[3]}</td><td><span className={`analytics-chip analytics-c-${team[4]}`}>{({ good: "On track", warn: "Needs skills", bad: "At risk" })[team[4]]}</span></td></tr>)}</tbody></table></div></section>
                    <section className="analytics-card analytics-s5"><h2>Insights <span className="analytics-tag">AI-ready</span></h2><div className="analytics-sub">Generated from the numbers on this page</div>
                        <div className="analytics-insight"><span>🎯</span><div><b>{biggestGap.skill}</b> is the biggest bottleneck: {biggestGap.demand} projects need it but only {biggestGap.supply} students list it. Prompt students with related skills to add it.</div></div>
                        <div className="analytics-insight"><span>🌙</span><div>Requests peak on Sunday evenings (8–10 PM). Send match suggestions and nudges then.</div></div>
                        <div className="analytics-insight"><span>⚠️</span><div>{atRisk} team{atRisk === 1 ? " is" : "s are"} at risk: low skill coverage and no activity for 6+ days.</div></div>
                        <div className="analytics-insight"><span>🔀</span><div>Cross-department teams score higher on complementarity. Consider suggesting them more often.</div></div>
                        <div className="analytics-insight"><span>📉</span><div>Biggest drop-off is between "request sent" and "accepted" (52% to 31%). Better profile previews could help.</div></div>
                    </section>

                    <section className="analytics-card analytics-s6"><h2>Top connectors</h2><div className="analytics-sub">Students who helped form the most teams</div>{LEADS.map((lead, i) => <div className="analytics-lead" key={lead[0]}><span className="analytics-avatar" style={{ background: lead[2] }}>{lead[0][0]}</span><span style={{ flex: 1 }}>{i + 1}. {lead[0]}</span><b>{lead[1]} teams</b></div>)}</section>
                    <section className="analytics-card analytics-s6"><h2>Deadline pressure</h2><div className="analytics-sub">Projects still without a full team, by days to deadline</div><div className="analytics-chartbox compact"><canvas ref={canvasRefs.dead} /></div></section>
                </div>
                <p className="analytics-note">Sample data. Replace the generated numbers with your real API/database values.</p>
            </div>
        </div>
    );
}
