import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sun,
  Volume2,
  X,
} from 'lucide-react'

const creativeMedia = {
  profile: new URL('../assets/profile.jpg', import.meta.url).href,
  image1: new URL('../assets/1.jpg', import.meta.url).href,
  image2: new URL('../assets/2.jpg', import.meta.url).href,
  image3: new URL('../assets/3.jpg', import.meta.url).href,
  video1: new URL('../assets/VideoAsset1.mp4', import.meta.url).href,
  video2: new URL('../assets/VideoAsset2.mp4', import.meta.url).href,
  video3: new URL('../assets/VideoAsset3.mp4', import.meta.url).href,
  video4: new URL('../assets/VideoAsset4.mp4', import.meta.url).href,
}

type SkillGroup = {
  title: string
  icon: typeof Database
  skills: string[]
}

type CreativeItem = {
  category: string
  title: string
  description: string
  style: string
  mediaType: 'image' | 'video'
  media: string
}

const navigation = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Education', '#education'],
  ['Contact', '#contact'],
] as const

const skillGroups: SkillGroup[] = [
  {
    title: 'Database & Data',
    icon: Database,
    skills: ['SQL', 'MySQL', 'Database Design', 'Relational Database Concepts', 'Data Management'],
  },
  {
    title: 'Development',
    icon: Code2,
    skills: ['PHP / Laravel', 'JavaScript', 'HTML / CSS', 'Python', 'jQuery', 'Git / GitHub'],
  },
  {
    title: 'IT & Technical Support',
    icon: Check,
    skills: ['PC Maintenance', 'Hardware Troubleshooting', 'Basic Technical Support', 'System Analysis', 'Software Troubleshooting'],
  },
  {
    title: 'Creative & Digital',
    icon: ArrowDownRight,
    skills: ['Graphic Design', 'Logo Design', 'Content Creation', 'Social Media Content', 'Video Editing', 'Canva', 'CapCut', 'Filmora'],
  },
]

const projectFeatures = [
  'Item management',
  'Supplier management',
  'Request & release transactions',
  'Availability monitoring',
  'Reports & transaction history',
  'Audit records & notifications',
  'Dashboard analytics',
  'Search functionality',
]

const creativeItems: CreativeItem[] = [
  {
    category: 'Creative Work',
    title: 'Creative work 01',
    description: 'A selected image from the creative work collection.',
    style: 'graphic',
    mediaType: 'image',
    media: creativeMedia.image1,
  },
  {
    category: 'Creative Work',
    title: 'Creative work 02',
    description: 'A selected image from the creative work collection.',
    style: 'logo',
    mediaType: 'image',
    media: creativeMedia.image2,
  },
  {
    category: 'Creative Work',
    title: 'Creative work 03',
    description: 'A selected image from the creative work collection.',
    style: 'social',
    mediaType: 'image',
    media: creativeMedia.image3,
  },
  {
    category: 'Video Editing',
    title: 'Video 01',
    description: 'A selected video from the creative work collection.',
    style: 'video',
    mediaType: 'video',
    media: creativeMedia.video1,
  },
  {
    category: 'Video Editing',
    title: 'Video 02',
    description: 'A selected video from the creative work collection.',
    style: 'video',
    mediaType: 'video',
    media: creativeMedia.video2,
  },
  {
    category: 'Video Editing',
    title: 'Video 03',
    description: 'A selected video from the creative work collection.',
    style: 'video',
    mediaType: 'video',
    media: creativeMedia.video3,
  },
  {
    category: 'Video Editing',
    title: 'Video 04',
    description: 'A selected video from the creative work collection.',
    style: 'video',
    mediaType: 'video',
    media: creativeMedia.video4,
  },
]

const interests = [
  'Database Systems',
  'Data Analytics',
  'Web Development',
  'IT Support',
  'System Analysis',
  'UI/UX',
  'Digital Marketing',
  'Emerging AI Technologies',
]

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeWork, setActiveWork] = useState<CreativeItem | null>(null)
  const [formStatus, setFormStatus] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoPlaybackError, setVideoPlaybackError] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // The theme still works when storage is unavailable.
    }
  }, [theme])

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (activeWork) dialogRef.current?.showModal()
  }, [activeWork])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function playVideoWithSound() {
    const video = videoRef.current
    if (!video) return

    video.muted = false
    video.volume = 1
    void video.play()
      .then(() => setVideoPlaybackError(''))
      .catch(() => setVideoPlaybackError('Playback could not start. Use the video controls to try again.'))
  }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const email = String(formData.get('email') ?? '')
    const message = String(formData.get('message') ?? '')
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:johnbenzh.cuy@gmail.com?subject=${subject}&body=${body}`
    setFormStatus('Opening your email app to send this message.')
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" onClick={closeMenu} aria-label="John Benzh P. Cuy, home">
            <img className="wordmark-mark wordmark-profile" src={creativeMedia.profile} alt="" />
            <span>John Benzh P. Cuy</span>
          </a>
          <nav id="main-navigation" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {navigation.map(([label, href]) => (
              <a key={label} href={href} onClick={closeMenu}>{label}</a>
            ))}
            <a className="nav-resume mobile-resume" href="https://drive.google.com/file/d/1e12ROG1Ypj4pnjUGT6aY_NihjUHbxfkC/view?usp=sharing" target="_blank" rel="noreferrer">
              Resume <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </nav>
          <div className="header-actions">
            <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a className="nav-resume desktop-resume" href="https://drive.google.com/file/d/1e12ROG1Ypj4pnjUGT6aY_NihjUHbxfkC/view?usp=sharing" target="_blank" rel="noreferrer">
              Resume <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <button className="icon-button menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero page-wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><span className="status-dot" /> IT GRADUATE <span className="eyebrow-divider">/</span> DATABASE SYSTEMS</p>
            <h1 id="hero-title">John Benzh<br /><span>P. Cuy</span></h1>
            <p className="hero-role">Creative IT Professional <span>&</span><br className="role-break" /> Database Systems Specialist</p>
            <p className="hero-intro">BS Information Technology graduate majoring in Database Systems and a Cum Laude graduate, with hands-on experience across databases, web technologies, technical support, and creative digital work.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View my work <ArrowDownRight size={16} /></a>
              <a className="button button-quiet" href="https://drive.google.com/file/d/1e12ROG1Ypj4pnjUGT6aY_NihjUHbxfkC/view?usp=sharing" target="_blank" rel="noreferrer">Download resume <ArrowDown size={15} /></a>
            </div>
            <div className="hero-meta"><span>MSU at Naawan</span><span className="meta-dot" /><span>Class of 2025</span><span className="meta-dot" /><span className="honor-text">Cum Laude</span></div>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="visual-topline"><span>SYS / 001</span><span>DATABASE SYSTEMS</span></div>
            <img className="hero-profile" src={creativeMedia.profile} alt="John Benzh P. Cuy in his graduation attire" />
            <div className="visual-bottomline"><span>STRUCTURED THINKING</span><span>BUILD / LEARN / IMPROVE</span></div>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>

        <section className="section section-about" id="about" aria-labelledby="about-title">
          <div className="page-wrap about-layout">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">01 / ABOUT</p>
              <h2 id="about-title">Curious by nature.<br /><span>Careful by design.</span></h2>
            </div>
            <div className="about-copy" data-reveal>
              <p className="about-lead">I’m a recent Information Technology graduate with a focus on Database Systems and a Cum Laude distinction.</p>
              <p>I like work that brings order to complexity, whether that means shaping a database, helping someone through a technical issue, or turning an idea into a clear digital experience. My studies and internship gave me room to explore both the analytical and creative sides of IT.</p>
              <p>I’m detail-oriented, open to feedback, and ready to keep learning as tools and technologies evolve. I’m looking for an entry-level team where I can contribute thoughtfully and grow through real work.</p>
              <a className="text-link" href="#contact">A little more about working together <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="section section-skills" id="skills" aria-labelledby="skills-title">
          <div className="page-wrap">
            <div className="section-intro" data-reveal>
              <div><p className="eyebrow">02 / CAPABILITIES</p><h2 id="skills-title">Tools I work with.</h2></div>
              <p>Technical foundations with room to keep growing. A mix of structured problem-solving and hands-on creative work.</p>
            </div>
            <div className="skills-grid">
              {skillGroups.map(({ title, icon: Icon, skills }, index) => (
                <article className="skill-group" key={title} data-reveal style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}>
                  <div className="skill-heading"><span className="skill-icon"><Icon size={17} strokeWidth={1.7} /></span><h3>{title}</h3><span className="skill-count">0{index + 1}</span></div>
                  <div className="skill-tags">{skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div>
                </article>
              ))}
            </div>
            <p className="skills-note"><span className="note-rule" /> Skills reflect study, project, and internship experience.</p>
          </div>
        </section>

        <section className="section section-projects" id="projects" aria-labelledby="projects-title">
          <div className="page-wrap">
            <div className="section-intro" data-reveal>
              <div><p className="eyebrow">03 / SELECTED PROJECT</p><h2 id="projects-title">Built to make work clearer.</h2></div>
              <p>A school supply office system focused on practical inventory workflows and accountable transactions.</p>
            </div>
            <article className="project-card" data-reveal>
              <div className="project-preview" aria-label="Illustrative interface preview of the Items Management System">
                <div className="preview-shell">
                  <div className="preview-sidebar"><span className="preview-brand"><Database size={14} /> IMS</span><span className="sidebar-active">Overview</span><span>Items</span><span>Requests</span><span>Suppliers</span><span>Reports</span><div className="sidebar-user"><span className="avatar-dot">LS</span><span>Supply Office</span></div></div>
                  <div className="preview-main">
                    <div className="preview-toolbar"><span>Overview</span><span className="preview-date">SUPPLY OFFICE / DASHBOARD</span></div>
                    <div className="preview-greeting"><span>Good morning</span><span>Inventory overview</span></div>
                    <div className="preview-stats"><div><span>ITEMS</span><strong>Inventory</strong><i>availability tracking</i></div><div><span>REQUESTS</span><strong>Transactions</strong><i>request & release</i></div><div><span>REPORTS</span><strong>Activity</strong><i>records & summaries</i></div></div>
                    <div className="preview-lower"><div className="preview-chart"><div className="chart-title">RECENT ACTIVITY <span>↗</span></div><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="preview-log"><div className="chart-title">SYSTEM LOG</div><span><i /> Inventory view</span><span><i /> Request review</span><span><i /> Report ready</span></div></div>
                  </div>
                </div>
                <span className="preview-caption">ILLUSTRATIVE INTERFACE PREVIEW</span>
              </div>
              <div className="project-details">
                <p className="project-index">CASE STUDY <span>01 / 01</span></p>
                <h3>Items Management<br />System <span>(IMS)</span></h3>
                <p className="project-place">Lugait Senior High School Supply Office</p>
                <p className="project-description">Developed to improve the management, monitoring, requesting, releasing, and reporting of school supply items. The system brings everyday inventory tasks into one organized workflow.</p>
                <div className="project-tech"><span>Laravel</span><span>PHP</span><span>MySQL</span><span>jQuery</span><span>XAMPP</span></div>
                <div className="feature-list" aria-label="Project features">{projectFeatures.map((feature) => <span key={feature}><Check size={13} />{feature}</span>)}</div>
                <div className="project-links"><a className="button button-outline" href="https://github.com/janbins212/IMSLUGAIT" target="_blank" rel="noreferrer"><Github size={15} /> View GitHub</a></div>
              </div>
            </article>
          </div>
        </section>

        <section className="section section-experience" id="experience" aria-labelledby="experience-title">
          <div className="page-wrap two-column-section">
            <div className="section-heading" data-reveal><p className="eyebrow">04 / EXPERIENCE</p><h2 id="experience-title">Learning through<br /><span>real work.</span></h2><p className="heading-note">An internship built around curiosity, contribution, and learning how technology shows up in a growing business.</p></div>
            <div className="experience-list">
              <article className="experience-entry" data-reveal>
                <div className="timeline-rail"><span /></div>
                <div className="experience-content">
                  <div className="experience-meta"><span>FEB 2025 — MAY 2025</span><span className="internship-tag">INTERNSHIP</span></div>
                  <h3>Creative IT Intern</h3><p className="company-name">ITech Media Logic</p><p className="experience-location"><MapPin size={14} /> El Salvador City, Misamis Oriental</p>
                  <p className="experience-description">A hands-on internship and learning experience supporting the team’s creative and technical activities.</p>
                  <ul className="responsibility-list">
                    <li>Created social media content and promotional materials for IT services.</li>
                    <li>Supported graphic design, logo design, and system branding work.</li>
                    <li>Assisted with basic technical support, PC maintenance, and hardware checks.</li>
                    <li>Contributed to digital marketing-related activities and content preparation.</li>
                  </ul>
                </div>
              </article>
              <article className="experience-entry" data-reveal>
                <div className="timeline-rail"><span /></div>
                <div className="experience-content">
                  <div className="experience-meta"><span>JUN 2025 — PRESENT</span><span className="internship-tag">INDEPENDENT</span></div>
                  <h3>Video Editor</h3>
                  <p className="experience-description">Provided video-editing services as a virtual assistant and for local businesses.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-education" id="education" aria-labelledby="education-title">
          <div className="page-wrap education-layout" data-reveal>
            <div className="section-heading"><p className="eyebrow">05 / EDUCATION</p><h2 id="education-title">The foundation.</h2></div>
            <article className="education-entry">
              <div className="education-years">2020 <span>—</span> 2025</div>
              <div><h3>Bachelor of Science in<br />Information Technology</h3><p className="education-major">Major in Database Systems</p><p className="education-school">Mindanao State University at Naawan</p></div>
              <span className="honors-badge"><span>✳</span> Cum Laude</span>
            </article>
          </div>
        </section>

        <section className="section section-creative" id="creative" aria-labelledby="creative-title">
          <div className="page-wrap">
            <div className="section-intro" data-reveal>
              <div><p className="eyebrow">06 / CREATIVE PRACTICE</p><h2 id="creative-title">A visual point of view.</h2></div>
              <p>Creative work is part of how I think about technology. A selection of design and video work.</p>
            </div>
            <div className="creative-grid">
              {creativeItems.map((item, index) => (
                <button className={`creative-tile tile-${item.style}`} key={item.title} type="button" onClick={() => setActiveWork(item)} data-reveal style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties} aria-label={`View ${item.title}`}>
                  <span className="tile-art" aria-hidden="true">
                    {item.mediaType === 'image'
                      ? <img className="tile-media" src={item.media} alt="" loading="lazy" />
                      : <video className="tile-media" src={item.media} muted playsInline autoPlay loop preload="metadata" aria-hidden="true" />}
                  </span>
                  <span className="tile-info"><span>{item.category}</span><ArrowUpRight size={15} /></span>
                </button>
              ))}
            </div>
            <p className="gallery-note">Select a video to open the full-screen player. Gallery previews are muted; use the player controls to play with sound.</p>
            <p className="gallery-disclaimer">Disclaimer: All work samples shown here belong to the owner and are for private portfolio presentation and creative practice only; they do not represent client-specific or commercial project deliverables.</p>
          </div>
        </section>

        <section className="section section-interests" id="interests" aria-labelledby="interests-title">
          <div className="page-wrap interests-layout" data-reveal>
            <div className="section-heading"><p className="eyebrow">07 / ALWAYS EXPLORING</p><h2 id="interests-title">Areas I’m drawn to.</h2></div>
            <div className="interest-list">{interests.map((interest, index) => <span key={interest}><span className="interest-number">0{index + 1}</span>{interest}<ArrowUpRight size={14} /></span>)}</div>
          </div>
        </section>

        <section className="section section-contact" id="contact" aria-labelledby="contact-title">
          <div className="page-wrap contact-layout">
            <div className="contact-copy" data-reveal><p className="eyebrow">08 / GET IN TOUCH</p><h2 id="contact-title">Let’s build<br /><span>something useful.</span></h2><p>I’m open to entry-level opportunities, internships, freelance projects, and collaborations in IT, databases, web development, technical support, data, and creative technology.</p><div className="contact-details"><a href="mailto:johnbenzh.cuy@gmail.com"><Mail size={16} /><span><small>EMAIL</small><strong>johnbenzh.cuy@gmail.com</strong></span><ArrowUpRight size={14} /></a><a href="https://github.com/janbins212" target="_blank" rel="noreferrer"><Github size={16} /><span><small>GITHUB</small><strong>github.com/janbins212</strong></span><ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/john-benzh-cuy-b248363a5/" target="_blank" rel="noreferrer"><Linkedin size={16} /><span><small>LINKEDIN</small><strong>linkedin.com/in/john-benzh-cuy-b248363a5</strong></span><ArrowUpRight size={14} /></a><div><MapPin size={16} /><span><small>LOCATION</small><strong>Philippines</strong></span></div></div></div>
            <form className="contact-form" onSubmit={handleContactSubmit} data-reveal>
              <div className="form-heading"><span>01</span><h3>Send a message</h3></div>
              <label htmlFor="contact-name">Name<input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
              <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
              <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" rows={4} placeholder="What would you like to talk about?" required /></label>
              <button className="button button-primary form-submit" type="submit">Send message <ArrowUpRight size={15} /></button>
              <p className="form-status" aria-live="polite">{formStatus}</p>
              <p className="form-note">Submitting opens your email app with the message ready to send.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="page-wrap footer-inner"><a className="wordmark" href="#home"><span className="wordmark-mark">JC</span><span>John Benzh P. Cuy</span></a><p>Technical <span>·</span> Creative <span>·</span> Always learning</p><a className="back-top" href="#home">Back to top <ArrowUpRight size={14} /></a><span className="footer-year">© {new Date().getFullYear()}</span></div></footer>

      <dialog className={`work-dialog${activeWork?.mediaType === 'video' ? ' work-dialog-video' : ''}`} ref={dialogRef} onClose={() => setActiveWork(null)}>
        {activeWork && <div className="dialog-inner"><button className="icon-button dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close preview"><X size={18} /></button>{activeWork.mediaType === 'video' && <button className="icon-button dialog-sound" type="button" onClick={playVideoWithSound} aria-label="Play video with sound" title="Play video with sound"><Volume2 size={18} /></button>}<div className={`dialog-media${activeWork.mediaType === 'video' ? ' dialog-video' : ''}`}>{activeWork.mediaType === 'image' ? <img src={activeWork.media} alt={activeWork.title} /> : <video ref={videoRef} src={activeWork.media} controls autoPlay muted={false} playsInline preload="auto" />}</div><p className="eyebrow">{activeWork.category.toUpperCase()}</p><h2>{activeWork.title}</h2><p>{activeWork.description}</p><p className="video-playback-status" aria-live="polite">{videoPlaybackError}</p></div>}
      </dialog>
    </>
  )
}

export default App
