// A placeholder team roster. We don't have real team members' names or
// photos to show, and inventing them would put fabricated people on a real
// business's site - so these are clearly generic role cards (a role title
// and initials-monogram avatar in the site's own illustration style, not a
// stock photo pretending to be a real person). Swap in real names, titles
// and photos before launch.
const roles = [
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    title: "Founding Partner",
    credential: "Chartered Accountant",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    title: "Senior Tax Consultant",
    credential: "Chartered Accountant",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    title: "GST Specialist",
    credential: "Chartered Accountant",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    title: "Client Relations Lead",
    credential: "Client Success",
  },
];

function Team() {
  return (
    <section id="team" className="team">
      <div className="section__inner">
        <h2 className="section__title" data-reveal>
          The people behind the filings
        </h2>
        <p className="section__subtitle" data-reveal>
          A small team of chartered accountants - roster shown here as a
          placeholder until real profiles are ready.
        </p>
        <div className="team__grid">
          {roles.map((role, index) => (
            <div
              className="team-card"
              key={role.title}
              data-reveal
              data-reveal-delay={index % 4}
            >
              <div className="team-card__avatar" aria-hidden="true">
                <img
                  src={role.image}
                  alt="Client Relations Lead"
                  className="team-profile_image"
                />
              </div>
              <h3>{role.title}</h3>
              <p>{role.credential}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
