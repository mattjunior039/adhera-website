import { useState, type ReactNode } from 'react'
import { ArrowUpRight, Bell, CalendarBlank, Camera, Check, Clock, Cpu, Eye, Fingerprint, ImageSquare, Pill, Scan, ShieldCheck, TextT, Users, Warning, WifiHigh, ArrowsClockwise, type Icon } from '@phosphor-icons/react'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { problem, howItWorks, features, privacy, comparison, prototype, story, team, community, contact, site } from '../content'
import './homepage.css'

const icons: Record<string, Icon> = { clock: Clock, pill: Pill, calendar: CalendarBlank, users: Users, eye: Eye, scan: Scan, warning: Warning, refill: ArrowsClockwise, text: TextT, bell: Bell, shield: ShieldCheck }
const number = (index: number) => String(index + 1).padStart(2, '0')

function Section({ id, label, children, className = '' }: { id: string; label: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`home-section ${className}`} aria-labelledby={`${id}-heading`}><div className="home-container"><div className="eyebrow">{label}</div>{children}</div></section>
}
function Heading({ id, children, sub }: { id: string; children: ReactNode; sub?: string }) {
  return <Reveal><h2 id={`${id}-heading`} className="section-heading">{children}</h2>{sub && <p className="section-intro">{sub}</p>}</Reveal>
}
function Tray({ detected = false }: { detected?: boolean }) {
  return <div className={`diagram-tray ${detected ? 'is-detected' : ''}`} aria-hidden="true"><div className="tray-days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <span key={i}>{day}</span>)}</div>{['AM', 'PM'].map((time, row) => <div className={`tray-row row-${row}`} key={time}>{Array.from({ length: 7 }, (_, i) => <span className={`tray-cell ${detected && i === 2 && row === 0 ? 'selected-cell' : ''}`} key={i}>{detected && i === 2 && row === 0 ? <Check size={18} /> : <i />}</span>)}<b>{time}</b></div>)}</div>
}

export function Problem() {
  return <Section id="problem" label="The everyday problem">
    <div className="problem-top"><Heading id="problem">{problem.heading}</Heading><div className="problem-stat"><strong>{problem.stat.value}</strong><p>{problem.stat.caption}</p><a href={problem.source.href} target="_blank" rel="noreferrer">{problem.source.label}<ArrowUpRight size={14} /></a></div></div>
    <div className="problem-reasons">{problem.cards.map((item) => { const Glyph = icons[item.icon]; return <article key={item.title}><Glyph size={28} weight="light" /><h3>{item.title}</h3><p>{item.body}</p></article> })}</div>
  </Section>
}

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const stepIcons = [Scan, CalendarBlank, Camera, Check, Eye, Bell]
  const ActiveIcon = stepIcons[active]
  return <Section id="how-it-works" label="How it works">
    <Heading id="how-it-works">{howItWorks.heading}</Heading>
    <div className="workflow-layout"><div className="workflow-steps">{howItWorks.steps.map((step, i) => <div className={`workflow-step ${i === active ? 'active' : ''}`} key={step.key}><h3><button type="button" aria-expanded={i === active} aria-controls={`step-${step.key}`} onClick={() => setActive(i)}><span>{number(i)}</span>{step.title}<span className="step-symbol">{i === active ? '−' : '+'}</span></button></h3><div id={`step-${step.key}`} hidden={i !== active}><p>{step.body}</p></div></div>)}</div>
    <div className="workflow-visual" role="img" aria-label={`Illustrative ${howItWorks.steps[active].label.toLowerCase()} diagram`}><div className="visual-meta"><span>ADHERA / {howItWorks.steps[active].label.toUpperCase()}</span><span>{number(active)} / 05</span></div><div className="workflow-art">
      {active === 0 ? <div className="scan-sheet"><Scan size={36} weight="light" /><span>Prescription</span><div className="scan-line" /><div className="scan-line short" /><div className="scan-line" /><div className="scan-line short" /><div className="scan-beam" /></div> : active === 4 ? <div className="notification-demo"><span className="notification-icon"><Bell size={28} weight="light" /></span><strong>{howItWorks.steps[active].title}</strong><div className="notification-people"><span>Patient</span><span>Caregiver</span></div></div> : <><div className="sensor-symbol"><ActiveIcon size={34} weight="light" /></div><div className="signal-line" /><Tray detected={active === 3} /></>}
    </div><div className="visual-caption"><ActiveIcon size={18} /><span>{howItWorks.steps[active].label}</span><span>Illustrative view</span></div></div></div>
  </Section>
}

export function Features() {
  return <Section id="features" label="Designed for the everyday">
    <Heading id="features">{features.heading}</Heading>
    <div className="feature-lead"><div className="vision-art"><div className="visual-meta"><span>COMPUTER VISION</span><span>ILLUSTRATION</span></div><Tray detected /><div className="vision-brackets" aria-hidden="true" /><span className="vision-label">Compartment isolation → pill detection</span></div><div className="feature-lead-copy"><Eye size={32} weight="light" /><h3>{features.items[0].title}</h3><p>{features.items[0].body}</p><div className="feature-metric"><strong>{features.items[0].metric?.value}</strong><span>{features.items[0].metric?.label}</span></div></div></div>
    <div className="feature-list">{features.items.slice(1).map((item, i) => { const Glyph = icons[item.icon]; return <article key={item.key}><span className="feature-number">{number(i + 1)}</span><Glyph size={25} weight="light" /><div><h3>{item.title}</h3><p>{item.body}</p></div></article> })}</div>
  </Section>
}

export function Privacy() {
  const flowIcons = [Camera, Check, WifiHigh, Cpu, Users]
  return <Section id="privacy" label="Privacy" className="privacy-section"><div className="privacy-heading"><Heading id="privacy" sub={privacy.sub}>{privacy.heading}</Heading><div className="privacy-seal"><Fingerprint size={72} weight="thin" aria-hidden="true" /><span>Local by design</span></div></div>
    <div className="privacy-boundary"><span className="boundary-label"><ShieldCheck size={16} /> YOUR HOME NETWORK</span><div className="privacy-flow">{privacy.flow.map((item, i) => { const Glyph = flowIcons[i]; return <div className="privacy-node" key={item.key}><div className="flow-symbol"><Glyph size={30} weight="light" /></div><span className="mono">{number(i)}</span><h3>{item.label}</h3><p>{item.detail}</p>{i < 3 && <span className="flow-connector" aria-hidden="true">→</span>}</div> })}</div></div>
    <ul className="privacy-promises">{privacy.contrast.map(text => <li key={text}><Check size={18} /><span>{text}</span></li>)}</ul>
  </Section>
}

export function Comparison() {
  return <Section id="comparison" label="The Adhera approach"><Heading id="comparison">{comparison.heading}</Heading><p className="table-hint">Compare approaches <span aria-hidden="true">↔</span></p><div className="comparison-scroll" role="region" aria-label="Product comparison, scroll horizontally on smaller screens" tabIndex={0}><table className="comparison-table"><caption className="sr-only">{comparison.heading}</caption><thead><tr><th scope="col">At a glance</th>{comparison.columns.map((column, i) => <th className={i === 2 ? 'adhera-column' : ''} scope="col" key={column}>{i === 2 && <span className="brand-dot" />}{column}</th>)}</tr></thead><tbody>{comparison.rows.map(row => <tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((value, i) => <td className={i === 2 ? 'adhera-column' : ''} key={i}>{value}</td>)}</tr>)}</tbody></table></div></Section>
}

export function Prototype() {
  return <Section id="prototype" label="Prototype journal"><Heading id="prototype" sub={prototype.sub}>{prototype.heading}</Heading><div className="prototype-gallery">{prototype.media.map((media, i) => <figure key={media.title} className={`prototype-item media-${media.span}`}>{media.src ? <img src={media.src} alt={media.title} loading="lazy" /> : <div className="media-placeholder"><div className="placeholder-index">FIG. {number(i)}</div>{i === 0 ? <Tray /> : <ImageSquare size={40} weight="thin" />}<span>{i === 0 ? 'Prototype photo placeholder' : 'Media placeholder'}</span></div>}<figcaption><h3>{media.title}</h3><p>{media.caption}</p></figcaption></figure>)}</div><div className="prototype-stats">{prototype.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></Section>
}


export function Story() {
  return <Section id="story" label="Our story" className="story-section"><div className="story-layout"><div><Heading id="story">{story.heading}</Heading><div className="story-mark" aria-hidden="true"><span /><span /></div></div><div className="story-prose">{story.paragraphs.map((paragraph, i) => <p className={i === 2 ? 'story-conclusion' : ''} key={paragraph}>{paragraph}</p>)}</div></div></Section>
}

export function Team() {
  return <Section id="team" label="People"><Heading id="team">{team.heading}</Heading><div className="team-grid">{team.members.map((member, i) => <article key={i}><div className="team-portrait">{member.photo ? <img src={member.photo} alt={member.name} loading="lazy" /> : <><Users size={46} weight="thin" /><span>Photo placeholder / {number(i)}</span></>}</div><h3>{member.name}</h3><span className="team-role">{member.role}</span><p>{member.expertise}</p></article>)}</div><div className="team-context"><p>{team.collective}</p><small>{team.disclaimer}</small></div></Section>
}


export function Contact() {
  const isPlaceholder = !site.contactEmail || site.contactEmail.endsWith('.example')
  return <Section id="contact" label="Community & Contact" className="contact-section"><div className="contact-layout"><Heading id="contact" sub={contact.sub}>{contact.heading}</Heading><div><div className="community-groups mb-12">{community.groups.map((group, i) => <a href={`mailto:${site.contactEmail}`} key={group}><span className="mono">{number(i)}</span><span>{group}</span><ArrowUpRight size={22} weight="light" /></a>)}</div><div className="contact-details">{isPlaceholder ? <><span className="contact-pending">{contact.partnershipCta.label}</span><p>Contact details coming soon.</p><span className="placeholder-email">{site.contactEmail || 'Email placeholder'}<small>Placeholder · not a monitored address</small></span></> : <Button href={`mailto:${site.contactEmail}`}>{contact.partnershipCta.label}</Button>}</div></div></div></Section>
}

export function Footer() {
  return <footer className="site-footer"><div className="home-container"><div className="footer-top"><a className="footer-brand" href="#product" aria-label="Adhera, back to top"><span className="brand-symbol"><img src={`${import.meta.env.BASE_URL}brand/adhera-logo.png`} alt="" /></span><span className="brand-name"><img src={`${import.meta.env.BASE_URL}brand/adhera-logo.png`} alt="" /></span></a><nav aria-label="Footer">{site.nav.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}<a href="#privacy">Privacy</a><a href="#contact">Contact</a></nav></div><div className="footer-logo" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}brand/adhera-logo.png`} alt="" /></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>Medication adherence, verified.</span><a href="#product">Back to top ↑</a></div></div></footer>
}
