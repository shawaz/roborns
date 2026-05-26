'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const INTERESTS = [
  'Rent a Server',
  'Buy Water',
  'Buy Minerals',
  'Infrastructure Franchise',
  'Technical partnership',
  'Press / Media',
  'Other',
];

const INTEREST_MAP: Record<string, string> = {
  server: 'Rent a Server',
  water: 'Buy Water',
  minerals: 'Buy Minerals',
  franchise: 'Infrastructure Franchise',
};

function ContactForm() {
  const params = useSearchParams();
  const paramInterest = params.get('interest');
  const defaultInterest = (paramInterest && INTEREST_MAP[paramInterest]) || 'Rent a Server';

  const defaultMessage = (() => {
    if (!paramInterest) return '';
    if (paramInterest === 'server') {
      const gpu = params.get('gpu') || 'h100';
      const count = params.get('count') || '64';
      const term = params.get('term') || '12';
      const gpuName = gpu === 'h100' ? 'NVIDIA H100' : gpu === 'h200' ? 'NVIDIA H200' : 'NVIDIA B200';
      return `Hi Roborns Team,\n\nI am interested in renting a GPU cluster with the following specifications:\n- Accelerator: ${gpuName}\n- Quantity: ${count} GPUs\n- Contract Duration: ${term} months\n\nPlease send us a formal proposal and availability schedule.`;
    }
    if (paramInterest === 'water') {
      const grade = params.get('grade') || 'potable';
      const volume = params.get('volume') || '25000';
      const term = params.get('term') || '1';
      const gradeName = grade === 'potable' ? 'Fresh Potable Water' : grade === 'industrial' ? 'High-Purity Industrial' : 'Remineralized Mineral Water';
      return `Hi Roborns Team,\n\nI would like to establish a water offtake contract with the following specifications:\n- Water Grade: ${gradeName}\n- Daily Volume: ${Number(volume).toLocaleString()} Litres/day\n- Contract Term: ${term} year(s)\n\nPlease contact us to discuss connection logistics and pricing options.`;
    }
    if (paramInterest === 'minerals') {
      const mineral = params.get('mineral') || 'nacl';
      const purity = params.get('purity') || 'industrial';
      const qty = params.get('qty') || '50';
      const mineralName = mineral === 'nacl' ? 'Sodium Chloride (NaCl)' : mineral === 'mgoh2' ? 'Magnesium Hydroxide' : mineral === 'kcl' ? 'Potassium Chloride' : 'Liquid Bromine';
      const purityName = purity === 'industrial' ? 'Industrial (98%)' : purity === 'food' ? 'Food Grade (99.5%)' : 'Pharma/Reagent (99.9%)';
      return `Hi Roborns Team,\n\nI would like to request a quote for mineral supply:\n- Mineral: ${mineralName}\n- Purity Level: ${purityName}\n- Quantity: ${qty} Metric Tons\n\nPlease let us know the delivery timelines, shipping details, and bulk pricing terms.`;
    }
    return '';
  })();

  const [name,     setName]     = useState('');
  const [company,  setCompany]  = useState('');
  const [email,    setEmail]    = useState('');
  const [interest, setInterest] = useState(defaultInterest);
  const [message,  setMessage]  = useState(defaultMessage);
  const [sent,     setSent]     = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subj = interest + (company ? ` — ${company}` : '');
    const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`;
    window.location.href = `mailto:hello@roborns.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="contact-form">
        <div style={{ padding: '2rem', border: '1px solid var(--accent)', background: 'rgba(93,202,165,0.04)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Opening email client</div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--off-white)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
            Or email us directly at{' '}
            <a href="mailto:hello@roborns.com" style={{ color: 'var(--accent)' }}>hello@roborns.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label className="form-label">Name</label>
        <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
      </div>
      <div className="form-group">
        <label className="form-label">Company</label>
        <input className="form-input" type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company or organisation" />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
      </div>
      <div className="form-group">
        <label className="form-label">I&apos;m interested in</label>
        <select className="form-select" value={interest} onChange={e => setInterest(e.target.value)}>
          {INTERESTS.map(i => <option key={i}>{i}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea className="form-textarea" rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="Be direct. What do you need?" required />
      </div>
      <button className="btn-primary" type="submit" style={{ alignSelf: 'flex-start' }}>
        Send message →
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <div className="page active">
      <div className="contact-hero">
        <div className="hero-tag">Inquire</div>
        <h1>
          Access the<br />
          <em>infrastructure.</em>
        </h1>
        <p className="contact-hero-body">
          Server rental, water offtake, mineral supply, or franchise licence —
          we respond to qualified inquiries within 48 hours.
        </p>
      </div>
      <div className="contact-body">
        <div>
          <div className="section-label" style={{ marginBottom: '2rem' }}>
            Send a message
          </div>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
        <div className="contact-info">
          <div className="section-label" style={{ marginBottom: '1.5rem' }}>
            Direct channels
          </div>
          <div className="contact-channels">
            <div className="channel-row">
              <span className="channel-name">Email</span>
              <span className="channel-val">hello@roborns.com</span>
            </div>
            <div className="channel-row">
              <span className="channel-name">Response time</span>
              <span className="channel-val">Within 48 hours</span>
            </div>
            <div className="channel-row">
              <span className="channel-name">Compute</span>
              <span className="channel-val">2 MW → 10 MW</span>
            </div>
            <div className="channel-row">
              <span className="channel-name">Water</span>
              <span className="channel-val">50,000 L/day</span>
            </div>
            <div className="channel-row">
              <span className="channel-name">Minerals</span>
              <span className="channel-val">NaCl · Mg(OH)₂ · KCl</span>
            </div>
          </div>
          <div className="contact-block" style={{ marginTop: '2rem' }}>
            <h4>Infrastructure franchise</h4>
            <p>
              Want to deploy the Roborns model at your coastal site? We provide
              the engineering design, vendor relationships, and operational
              playbook. You own the asset.{' '}
              <span style={{ color: 'var(--accent)' }}>
                This is the most efficient path to zero-waste compute infrastructure.
              </span>
            </p>
          </div>
          <div className="contact-block">
            <h4>Technical partnerships</h4>
            <p>
              If you work in thermal engineering, coastal infrastructure, or
              industrial desalination — we want to hear from you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
