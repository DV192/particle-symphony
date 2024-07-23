import Section from "./Section";

const AllSections = () => {
  return (
    <div className='w-full h-full relative'>
      <Section>
        <h1 className="text-white sm:text-[3.125rem] md:text-[3.75rem] text-[2.5rem]">
          A symphony of particles <br />
          dances before your eyes!
        </h1>
      </Section>

      <Section>
        <h1 className="text-white sm:text-[3.125rem] md:text-[3.75rem] text-[2.5rem]">
          From melodic notes <br />
          to cosmic clouds!
        </h1>
      </Section>

      <Section>
        <h1 className="text-white sm:text-[3.125rem] md:text-[3.75rem] text-[2.5rem]">
          Strummed chords become a <br />
          <span className="sm:text-[3.75rem] md:text-[5rem] text-[3.125rem] capitalize">Celestial Canvas!</span>
        </h1>
      </Section>

      <Section>
        <h1 className="text-white sm:text-[3.125rem] md:text-[3.75rem] text-[2.5rem]">
          A sonic explosion <br />
          paints the sky with <br />
          <span className="sm:text-[3.75rem] md:text-[5rem] text-[3.125rem] capitalize">Particles!</span>
        </h1>
      </Section>

      <Section>
        <h1 className="text-white sm:text-[3.125rem] md:text-[3.75rem] text-[2.5rem]">
          Capture the rhythm, <br />
          a particle-filled masterpiece!
        </h1>
      </Section>
    </div>
  )
}

export default AllSections