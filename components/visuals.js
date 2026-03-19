'use client';

import Image from 'next/image';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const growthData = [
  { year: 'Y1', portfolio: 12, revenue: 8 },
  { year: 'Y2', portfolio: 22, revenue: 15 },
  { year: 'Y3', portfolio: 35, revenue: 24 },
  { year: 'Y4', portfolio: 48, revenue: 34 },
  { year: 'Y5', portfolio: 66, revenue: 46 },
];

const timelineData = [
  { phase: 'Origination', value: 18 },
  { phase: 'Close', value: 33 },
  { phase: 'Integration', value: 57 },
  { phase: 'Optimization', value: 74 },
  { phase: 'Scale', value: 92 },
];

export function AmbientImageCard({ src, alt, eyebrow, title, body, tall = false }) {
  return (
    <div className={`image-card${tall ? ' image-card-tall' : ''}`}>
      <div className="image-card-media">
        <Image src={src} alt={alt} fill sizes="(max-width: 960px) 100vw, 40vw" />
      </div>
      <div className="image-card-overlay" />
      <div className="image-card-copy">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
}

export function GrowthChartCard() {
  return (
    <div className="chart-card card reveal-up">
      <div className="chart-copy">
        <span className="eyebrow">Illustrative portfolio growth</span>
        <h3>How value can compound with disciplined acquisitions</h3>
        <p>Sample data used for visual illustration only. The intent is to show the operating model: steady acquisitions, tighter systems, and expanding shared-services leverage over time.</p>
      </div>
      <div className="chart-shell">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={growthData} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b08a47" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#b08a47" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#415548" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#415548" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(22,33,43,0.08)" vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} stroke="#70808f" />
            <YAxis tickLine={false} axisLine={false} stroke="#70808f" />
            <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid rgba(22,33,43,0.08)', background: '#fffdf9' }} />
            <Area type="monotone" dataKey="portfolio" stroke="#b08a47" fillOpacity={1} fill="url(#portfolioFill)" strokeWidth={3} />
            <Area type="monotone" dataKey="revenue" stroke="#415548" fillOpacity={1} fill="url(#revenueFill)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TimelineChartCard() {
  return (
    <div className="chart-card card reveal-up">
      <div className="chart-copy">
        <span className="eyebrow">Illustrative returns timeline</span>
        <h3>Visibility from sourcing through scale</h3>
        <p>A premium firm website should communicate process, not just ambition. This view gives the brand a more tangible operating feel for investors and sellers.</p>
      </div>
      <div className="chart-shell">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={timelineData} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="rgba(22,33,43,0.08)" vertical={false} />
            <XAxis dataKey="phase" tickLine={false} axisLine={false} stroke="#70808f" />
            <YAxis tickLine={false} axisLine={false} stroke="#70808f" />
            <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid rgba(22,33,43,0.08)', background: '#fffdf9' }} />
            <Line type="monotone" dataKey="value" stroke="#16212B" strokeWidth={3.5} dot={{ r: 4, fill: '#b08a47' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
