const Section = ({ children }) => {
  return (
    <div className="w-full h-[100vh] px-[30px] flex flex-col text-center items-center justify-center">
      <div className="w-full flex justify-center items-center text-center">
        {children}
      </div>
    </div>
  )
}

export default Section