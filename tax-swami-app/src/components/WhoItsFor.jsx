import { IconBriefcase, IconLaptop, IconStore, IconUserPlus } from './icons.jsx'

const segments = [
  {
    icon: IconBriefcase,
    title: 'Salaried professionals',
    detail:
      'Filing on your own for the first time, or just tired of doing it yourself? We take the form-filling off your plate.',
  },
  {
    icon: IconLaptop,
    title: 'Freelancers & consultants',
    detail:
      "Multiple clients, irregular income, not sure what counts as a deduction? We sort it out and plan ahead.",
  },
  {
    icon: IconStore,
    title: 'Small business owners',
    detail:
      'GST, TDS, bookkeeping - we handle the compliance side so you can focus on running things.',
  },
  {
    icon: IconUserPlus,
    title: 'First-time taxpayers',
    detail: "New to filing? We'll walk you through it in plain language, step by step.",
  },
]

function WhoItsFor() {
  return (
    <section id="who-its-for" className="who">
      <div className="section__inner">
        <h2 className="section__title" data-reveal>
          Who we work with
        </h2>
        <p className="section__subtitle" data-reveal>
          If you&apos;re dealing with taxes and would rather not, you&apos;re in the right place.
        </p>
        <div className="who__grid">
          {segments.map((segment, index) => (
            <div
              className="who__card"
              key={segment.title}
              data-reveal
              data-reveal-delay={index % 2}
            >
              <div className="who__icon" aria-hidden="true">
                <segment.icon />
              </div>
              <h3>{segment.title}</h3>
              <p>{segment.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhoItsFor
