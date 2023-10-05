import Divider from '@/components/Divider'
import { useEffect, useState } from 'react'
import { PropagateLoader } from 'react-spinners'

export default function Home() {
  const [windowSize, setWindowSize] = useState<number>(0)
  const [adviceCount, setAdviceCount] = useState(0)
  const [advice, setAdvice] = useState('')
  const [roll, setRoll] = useState(false)
  const [showedAdvice, setShowedAdvice] = useState<number[]>([])
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    // Set initial screen width on component mount
    setWindowSize(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  const getAdvice = async () => {
    setRoll(true)
    const response = await fetch("/api/advice")
    if (!response.ok) {
      throw new Error('Failed to fetch advice');
    }
    await response.json()
      .then((data) => {
        if (showedAdvice.includes(data.slip.id)) { //Will check if the random advice have been showned then it will call again the function
          return getAdvice()
        }
        else {
          setTimeout(() => {
            const count = adviceCount + 1
            setAdvice(data.slip.advice)
            setAdviceCount(count)
            setShowedAdvice((prev) => [...prev, data.slip.id])
            setRoll(false)
          }, 2000)
        }
      })
  }
  return (
    <div className='h-screen flex items-center justify-center px-5'>
      <div className='bg-gray-700 h-[300px] w-full max-w-[500px] rounded-lg flex flex-col items-center  py-8 px-5 sm:px-12 shadow-2xl relative'>
        <div className='flex flex-col items-center h-full w-full my-2 relative'>
          <h1 className={`${advice === '' ? "opacity-0" : "opacity-100"} text-emerald-400 text-sm sm:text-md font-manrope tracking-[4px]`}>{`ADVICE # ${adviceCount}`}</h1>
          <div className='w-full border-black h-[140px] flex items-center justify-center my-2'>
            {
              advice === '' ?
                <p className={`text-xl ${roll ? "hidden" : "block"} text-md sm:text-2xl  font-semibold text-green-200 text-center font-manrope`}>{`ROLL THE DICE TO GET RANDOM ADVICE`}</p>
                :
                <p className={`text-xl ${roll ? "hidden" : "block"} ] text-md sm:text-2xl tracking-wide font-semibold text-gray-300 text-center font-manrope`}>{`"${advice}"`}</p>
            }

            <PropagateLoader size={15} loading={roll} color='#10b981' cssOverride={{ position: "relative", left: "-6px" }} />

          </div>
          <Divider />
        </div>

        <button onClick={() => getAdvice()} className='w-full flex justify-center absolute top-[270px] h-auto cursor-pointer'>
          <div className={`absolute ${roll ? "bg-emerald-300 shadow-shine shadow-emerald-300" : "hover:shadow-shine hover:shadow-emerald-200 bg-emerald-400"}  transition duration-200 hover:bg-emerald-300 rounded-full w-16 h-16  flex items-center justify-center`}>
            <svg width="24" className={`${roll ? "animate-spin" : ""} duration-300`} height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733" /></svg>
          </div>
        </button>

      </div>
    </div>
  )
}
