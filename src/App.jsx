import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";

const navItems = [
  ["Work", "#work"],
  ["Impact", "#impact"],
  ["About", "#about"],
  ["Academic", "#academic"],
];

const experience = [
  {
    period: "2025-Now",
    company: "Baidu AI Cloud Group",
    role: "Senior Large Language Model Algorithm Engineer",
    logo: "images/baidu-logo.webp",
  },
  {
    period: "2021-2022",
    company: "JITRI",
    role: "Research Scientist",
    logo: "images/jitri.webp",
  },
  {
    period: "2018",
    company: "DJI",
    role: "Software Engineer Intern",
    logo: "images/dji.webp",
  },
  {
    period: "2017-2018",
    company: "Deloitte",
    role: "Software Engineer Intern",
    logo: "images/deloitte.webp",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  media = false,
}) {
  const reduceMotion = useReducedMotion();
  const offset = direction === "left"
    ? { x: -34, y: 0 }
    : direction === "right"
      ? { x: 34, y: 0 }
      : { x: 0, y: 28 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : {
        opacity: 0,
        scale: media ? 1.028 : 0.992,
        ...offset,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: media ? 1.02 : 0.78,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function useCinematicSectionMotion(sectionRef) {
  const reduceMotion = useReducedMotion();
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, {
    stiffness: 82,
    damping: 26,
    mass: 0.5,
  });
  const pointerY = useSpring(rawPointerY, {
    stiffness: 82,
    damping: 26,
    mass: 0.5,
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const handlePointerMove = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rawPointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    rawPointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    rawPointerX.set(0);
    rawPointerY.set(0);
  };

  return {
    reduceMotion,
    pointerX,
    pointerY,
    scrollYProgress,
    handlePointerMove,
    handlePointerLeave,
  };
}

function ImpactBackdrop({ pointerX, pointerY, scrollProgress, reduceMotion }) {
  const farX = useTransform(pointerX, [-1, 1], [-10, 10]);
  const farY = useTransform(pointerY, [-1, 1], [-6, 6]);
  const nearX = useTransform(pointerX, [-1, 1], [-24, 24]);
  const nearY = useTransform(pointerY, [-1, 1], [-13, 13]);
  const nearRotate = useTransform(pointerX, [-1, 1], [-1.1, 1.1]);
  const sceneY = useTransform(scrollProgress, [0, 0.5, 1], [-56, 0, 56]);

  return (
    <motion.div
      className="impact-scene"
      style={reduceMotion ? undefined : { y: sceneY }}
      aria-hidden="true"
    >
      <div className="impact-scene__sky" />
      <motion.div
        className="impact-scene__layer impact-scene__layer--far"
        style={reduceMotion ? undefined : { x: farX, y: farY }}
      >
        <div className="impact-scene__ceiling" />
        <div className="impact-scene__slab" />
        <div className="impact-scene__mist" />
        <span className="impact-scene__terrace impact-scene__terrace--one" />
        <span className="impact-scene__terrace impact-scene__terrace--two" />
        <span className="impact-scene__terrace impact-scene__terrace--three" />
      </motion.div>
      <motion.div
        className="impact-scene__layer impact-scene__layer--near"
        style={reduceMotion ? undefined : { x: nearX, y: nearY, rotate: nearRotate }}
      >
        <span className="impact-scene__light impact-scene__light--one" />
        <span className="impact-scene__light impact-scene__light--two" />
        <span className="impact-scene__light impact-scene__light--three" />
        <div className="impact-scene__caustics">
          <span />
          <span />
          <span />
          <span />
        </div>
      </motion.div>
      <div className="impact-scene__horizon"><span /></div>
      <div className="impact-scene__signal" />
      <div className="impact-scene__veil" />
    </motion.div>
  );
}

function AcademicBackdrop({ pointerX, pointerY, scrollProgress, reduceMotion }) {
  const farX = useTransform(pointerX, [-1, 1], [9, -9]);
  const farY = useTransform(pointerY, [-1, 1], [-5, 5]);
  const nearX = useTransform(pointerX, [-1, 1], [-19, 19]);
  const nearY = useTransform(pointerY, [-1, 1], [-11, 11]);
  const nearRotate = useTransform(pointerX, [-1, 1], [0.65, -0.65]);
  const sceneY = useTransform(scrollProgress, [0, 0.5, 1], [-46, 0, 46]);

  return (
    <motion.div
      className="academic-scene"
      style={reduceMotion ? undefined : { y: sceneY }}
      aria-hidden="true"
    >
      <div className="academic-scene__sky" />
      <motion.div
        className="academic-scene__layer academic-scene__layer--far"
        style={reduceMotion ? undefined : { x: farX, y: farY }}
      >
        <div className="academic-scene__canopy" />
        <div className="academic-scene__distance" />
        <span className="academic-scene__terrace academic-scene__terrace--one" />
        <span className="academic-scene__terrace academic-scene__terrace--two" />
        <span className="academic-scene__terrace academic-scene__terrace--three" />
      </motion.div>
      <motion.div
        className="academic-scene__layer academic-scene__layer--near"
        style={reduceMotion ? undefined : { x: nearX, y: nearY, rotate: nearRotate }}
      >
        <span className="academic-scene__fog academic-scene__fog--one" />
        <span className="academic-scene__fog academic-scene__fog--two" />
        <span className="academic-scene__fog academic-scene__fog--three" />
        <span className="academic-scene__sweep academic-scene__sweep--one" />
        <span className="academic-scene__sweep academic-scene__sweep--two" />
      </motion.div>
      <div className="academic-scene__signal"><span /></div>
      <div className="academic-scene__veil" />
    </motion.div>
  );
}

function CinematicBackdrop({ pointerX, pointerY, scrollProgress, reduceMotion }) {
  const farX = useTransform(pointerX, [-1, 1], [-7, 7]);
  const farY = useTransform(pointerY, [-1, 1], [-4, 4]);
  const nearX = useTransform(pointerX, [-1, 1], [-15, 15]);
  const nearY = useTransform(pointerY, [-1, 1], [-8, 8]);
  const sceneY = useTransform(scrollProgress, [0, 1], [0, 72]);
  const sceneScale = useTransform(scrollProgress, [0, 1], [1, 1.035]);
  const sceneOpacity = useTransform(scrollProgress, [0, 0.9], [1, 0.42]);

  const staticStyle = reduceMotion ? undefined : {
    y: sceneY,
    scale: sceneScale,
    opacity: sceneOpacity,
  };

  return (
    <motion.div className="hero-scene" style={staticStyle} aria-hidden="true">
      <div className="hero-scene__sky" />
      <div className="hero-scene__atmosphere hero-scene__atmosphere--high" />
      <div className="hero-scene__atmosphere hero-scene__atmosphere--low" />

      <motion.div
        className="hero-scene__layer hero-scene__layer--far"
        style={reduceMotion ? undefined : { x: farX, y: farY }}
      >
        <div className="hero-scene__mass hero-scene__mass--far" />
        <div className="hero-scene__tower hero-scene__tower--one" />
        <div className="hero-scene__tower hero-scene__tower--two" />
        <div className="hero-scene__tower hero-scene__tower--three" />
      </motion.div>

      <motion.div
        className="hero-scene__layer hero-scene__layer--near"
        style={reduceMotion ? undefined : { x: nearX, y: nearY }}
      >
        <div className="hero-scene__mass hero-scene__mass--near" />
        <div className="hero-scene__aperture">
          <span className="hero-scene__aperture-side hero-scene__aperture-side--left" />
          <span className="hero-scene__aperture-side hero-scene__aperture-side--right" />
          <span className="hero-scene__aperture-roof" />
        </div>
      </motion.div>

      <div className="hero-scene__horizon"><span /></div>
      <div className="hero-scene__lightwell" />
      <div className="hero-scene__beam" />
      <div className="hero-scene__signal"><span /></div>
      <div className="hero-scene__veil" />
    </motion.div>
  );
}

function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
    </a>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <header className="nav-shell">
      <div className="nav container">
        <a className="nav__brand" href="#top" aria-label="Fengze Li, home">
          Fengze Li
        </a>

        <nav className="nav__links" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <ExternalLink
          className="nav__contact"
          href="https://www.linkedin.com/in/fengze-li-089b581b3/"
        >
          LinkedIn
        </ExternalLink>

        <button
          className="nav__menu"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav className="nav-mobile" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <ExternalLink href="https://www.linkedin.com/in/fengze-li-089b581b3/">
            LinkedIn
          </ExternalLink>
        </nav>
      )}

      <motion.div
        className="nav-progress"
        style={reduceMotion ? undefined : { scaleX: scrollYProgress }}
        aria-hidden="true"
      />
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  });
  const pointerY = useSpring(rawPointerY, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0.28]);

  const handlePointerMove = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rawPointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    rawPointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    rawPointerX.set(0);
    rawPointerY.set(0);
  };

  return (
    <section
      className="hero"
      id="top"
      ref={heroRef}
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <CinematicBackdrop
        pointerX={pointerX}
        pointerY={pointerY}
        scrollProgress={scrollYProgress}
        reduceMotion={reduceMotion}
      />
      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.09, delayChildren: 0.08 },
            },
          }}
        >
          <motion.h1
            id="hero-title"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Fengze Li
          </motion.h1>
          <motion.p
            className="hero__role"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Senior Large Language Model Algorithm Engineer at Baidu AI Cloud
            Group (ACG)
          </motion.p>
          <motion.p
            className="hero__summary"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Building production AI through algorithm development, applied
            research, and forward-deployed delivery.
          </motion.p>
          <motion.div
            className="hero__actions"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ExternalLink
              className="button button--primary"
              href="https://www.linkedin.com/in/fengze-li-089b581b3/"
            >
              LinkedIn
            </ExternalLink>
            <ExternalLink
              className="button button--secondary"
              href="https://scholar.google.com/citations?hl=en&user=mVTixYYAAAAJ"
            >
              Scholar
            </ExternalLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CurrentWork() {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="container work__grid">
        <Reveal className="section-intro" direction="left">
          <h2 id="work-title">Research translated into production systems.</h2>
          <p>
            I work across model algorithms, agent systems, and enterprise
            delivery, keeping research quality connected to operational
            constraints.
          </p>
        </Reveal>

        <div className="work__map">
          <Reveal className="work__primary" delay={0.06} direction="right">
            <p className="work__type">Core focus</p>
            <h3>LLM and Agent algorithm development</h3>
            <p>
              Training, post-training, evaluation, retrieval, orchestration,
              and inference design for systems that must work beyond a demo.
            </p>
          </Reveal>

          <div className="work__secondary">
            <Reveal className="work__item" delay={0.1}>
              <h3>Forward-deployed delivery</h3>
              <p>
                Working with customers inside real data, infrastructure,
                latency, and governance constraints.
              </p>
            </Reveal>
            <Reveal className="work__item" delay={0.14}>
              <h3>Applied research</h3>
              <p>
                Research across 3D vision, medical imaging, photovoltaics,
                robotics, and industrial intelligence.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const sectionRef = useRef(null);
  const sectionMotion = useCinematicSectionMotion(sectionRef);

  return (
    <section
      className="section impact section--blue"
      id="impact"
      ref={sectionRef}
      aria-labelledby="impact-title"
      onPointerMove={sectionMotion.handlePointerMove}
      onPointerLeave={sectionMotion.handlePointerLeave}
    >
      <ImpactBackdrop
        pointerX={sectionMotion.pointerX}
        pointerY={sectionMotion.pointerY}
        scrollProgress={sectionMotion.scrollYProgress}
        reduceMotion={sectionMotion.reduceMotion}
      />
      <div className="container impact__grid">
        <Reveal className="media media--impact" direction="left" media>
          <img
            src="images/profile1-impact.webp"
            alt="Fengze Li speaking at the APEC AI Sub-Forum"
            width="1800"
            height="1198"
            loading="lazy"
          />
        </Reveal>

        <Reveal className="impact__content" delay={0.08} direction="right">
          <p className="section-label section-label--red">Applied impact</p>
          <h2 id="impact-title">AI systems, delivered where they matter.</h2>
          <p className="impact__lead">
            From international keynotes to customer environments, the work
            combines technical depth with direct delivery.
          </p>

          <div className="impact__facts">
            <div>
              <h3>APEC AI Sub-Forum</h3>
              <p>
                Keynote on production LLM and Agent deployment on behalf of
                Baidu ACG.
              </p>
            </div>
            <div>
              <h3>Enterprise and public sector</h3>
              <p>
                Technical programs spanning regulated organizations and
                operational teams across more than 10 countries.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__content" direction="left">
          <h2 id="about-title">Close to the research. Close to the problem.</h2>
          <p>
            I work at the point where research becomes a deployed system. That
            means moving between algorithms, architecture, evaluation, and the
            details that appear only in a customer environment.
          </p>
          <p>
            My background spans LLMs, agents, 3D vision, medical imaging, and
            industrial intelligence. The common thread is building technology
            that remains useful under real constraints.
          </p>
        </Reveal>

        <Reveal
          className="media media--portrait"
          delay={0.08}
          direction="right"
          media
        >
          <img
            src="images/profile2-about.webp"
            alt="Fengze Li in a relaxed portrait"
            width="1000"
            height="1333"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Academic() {
  const sectionRef = useRef(null);
  const sectionMotion = useCinematicSectionMotion(sectionRef);
  const photoX = useTransform(sectionMotion.pointerX, [-1, 1], [7, -7]);
  const photoY = useTransform(sectionMotion.pointerY, [-1, 1], [5, -5]);

  return (
    <section
      className="section academic section--academic"
      id="academic"
      ref={sectionRef}
      aria-labelledby="academic-title"
      onPointerMove={sectionMotion.handlePointerMove}
      onPointerLeave={sectionMotion.handlePointerLeave}
    >
      <AcademicBackdrop
        pointerX={sectionMotion.pointerX}
        pointerY={sectionMotion.pointerY}
        scrollProgress={sectionMotion.scrollYProgress}
        reduceMotion={sectionMotion.reduceMotion}
      />
      <div className="container">
        <Reveal className="academic__header">
          <p className="section-label">Academic foundation</p>
          <h2 id="academic-title">University of Liverpool.</h2>
          <p>
            Ph.D. in Computer Science, with research connecting machine
            learning, 3D vision, and industrial applications.
          </p>
        </Reveal>

        <Reveal className="media media--academic" delay={0.06} media>
          <motion.div
            className="academic-still"
            style={
              sectionMotion.reduceMotion
                ? undefined
                : { x: photoX, y: photoY }
            }
          >
            <img
              src="images/IMG_2937-academic.webp"
              alt="Fengze Li at the University of Liverpool graduation ceremony"
              width="1800"
              height="1013"
              loading="lazy"
            />
          </motion.div>
        </Reveal>

        <div className="academic__details">
          <Reveal>
            <h3>Ph.D. in Computer Science</h3>
            <p>University of Liverpool, 2021-2025</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h3>M.Sc. in Computer Science</h3>
            <p>University of Southampton, 2019-2020</p>
          </Reveal>
        </div>

        <Reveal className="research-link" delay={0.08}>
          <div>
            <p className="research-link__title">Research archive</p>
            <p>
              Publications across 3D vision, LLMs, medical imaging, and
              industrial intelligence.
            </p>
          </div>
          <ExternalLink
            href="https://scholar.google.com/citations?hl=en&user=mVTixYYAAAAJ"
          >
            Google Scholar
          </ExternalLink>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section experience" aria-labelledby="experience-title">
      <div className="container experience__grid">
        <Reveal className="section-intro" direction="left">
          <h2 id="experience-title">A path through research and industry.</h2>
        </Reveal>

        <div className="experience__list">
          {experience.map((item, index) => (
            <Reveal
              key={item.company}
              delay={index * 0.04}
              direction="right"
            >
              <article className="experience__row">
                <p className="experience__period">{item.period}</p>
                <div className="experience__logo">
                  <img src={item.logo} alt="" loading="lazy" />
                </div>
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__name">Fengze Li</p>
          <p className="footer__role">
            Senior Large Language Model Algorithm Engineer
            <br />
            Baidu AI Cloud Group (ACG)
          </p>
        </div>
        <div className="footer__links">
          <ExternalLink href="https://www.linkedin.com/in/fengze-li-089b581b3/">
            LinkedIn
          </ExternalLink>
          <ExternalLink href="https://scholar.google.com/citations?hl=en&user=mVTixYYAAAAJ">
            Google Scholar
          </ExternalLink>
        </div>
      </div>
      <div className="container footer__bottom">Fengze Li, 2026.</div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <CurrentWork />
        <Impact />
        <About />
        <Academic />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
