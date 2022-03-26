import React,{useState} from 'react'
import axios from '../../config/axios'

function AddActor({setShowModalActor}) {

  const [actorName, setActorName] = useState("")
  const [actorImg, setActorImg] = useState("")

  const addActor = async () => {
    try{
      await axios.post('/actors', {actorName,actorImg})
      setActorName("")
      setActorImg("")
    } catch(err) {
      console.log(err)
    } 
  }
  const handleSubmitForm = async e => {
    e.preventDefault();
    addActor()
  }

  return (
    <div >
      <div className="z-50 fixed w-full flex justify-center inset-0  ">
        <div 
        onClick={() => setShowModalActor(false)}
        className="w-full h-full  z-0 absolute inset-0" />
        <div className="mx-auto container">
          <div className="flex items-center justify-center h-full w-full">
            <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
              <div className="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                <p className="text-base font-semibold">Create New Actor</p>
                <button onClick={() => setShowModalActor(false)} className="focus:outline-none">
                  <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 7L7 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 7L21 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="px-4 md:px-10 pt-6 md:pt-12 md:pb-4 pb-7">

                <form className="">
                  <div className=" items-center ">

                    <input placeholder="Actor Name" className="w-full focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200" value={actorName} onChange={e=>setActorName(e.target.value)} />

                    <input placeholder="Actor Image" className="mt-4 w-full focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200" value={actorImg} onChange={e=>setActorImg(e.target.value)} />

                  </div>

                </form>
                <div className="flex items-center justify-between mt-9">
                  <button onClick={() => setShowModalActor(false)} className="px-6 py-3 bg-gray-400 hover:bg-gray-500 shadow rounded text-sm text-white">
                    Cancel
                  </button>
                  <button className="px-6 py-3 bg-indigo-700 hover:bg-opacity-80 shadow rounded text-sm text-white" onClick={handleSubmitForm}>Add Actor</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddActor